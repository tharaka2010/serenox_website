import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy, deleteDoc, doc, getDoc as getFirestoreDoc } from 'firebase/firestore';
import { db, storage } from '../../firebaseConfig';
import { ref, deleteObject } from 'firebase/storage';
import ToastNotification from '../../components/ToastNotification';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterLanguage, setFilterLanguage] = useState('All');
  const [deletingId, setDeletingId] = useState(null); // New state for tracking deletion
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const categories = ['All', 'General', 'Male', 'Female', 'Child'];
  const languages = ['All', 'en', 'si'];

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      setShowToast(false); // Hide any previous toast
      setToastMessage('');
      try {
        let q = collection(db, 'articles');

        if (filterCategory !== 'All') {
          q = query(q, where('category', '==', filterCategory));
        }

        if (filterLanguage !== 'All') {
          // Assuming 'contentEn' and 'contentSi' are top-level fields
          // and you want to filter based on the presence of content for that language.
          // If you have a specific field like 'language' in your document, use that instead.
          if (filterLanguage === 'en') {
            q = query(q, where('contentEn', '!=', null));
          } else if (filterLanguage === 'si') {
            q = query(q, where('contentSi', '!=', null));
          }
        }

        // Note: Firestore queries can only have one orderBy clause unless you create an index.
        // For search, we'll filter client-side after fetching.
        q = query(q, orderBy('id', 'asc'));

        const querySnapshot = await getDocs(q);
        const articlesData = querySnapshot.docs.map(doc => ({
          id: doc.id, // Use Firestore document ID as the unique ID
          ...doc.data()
        }));

        setArticles(articlesData);

        if (articlesData.length === 0 && !loading) { // Check after setting articles
          setToastMessage("No articles found in this category.");
          setShowToast(true);
        }

      } catch (err) {
        console.error("Error fetching articles:", err);
        setError('Could not load articles.'); // More user-friendly message
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [filterCategory, filterLanguage, searchTerm]);

  const handleDelete = async (articleId) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      setDeletingId(articleId); // Set deleting state
      try {
        // Get article data to find image URLs
        const articleDocRef = doc(db, 'articles', articleId);
        const articleDocSnap = await getFirestoreDoc(articleDocRef);

        if (articleDocSnap.exists()) {
          const articleData = articleDocSnap.data();
          const imageUrlsToDelete = [];

          // Add thumbnail URL if it exists
          if (articleData.imageUrl) {
            imageUrlsToDelete.push(articleData.imageUrl);
          }

          // Add English body image URLs
          if (articleData.contentEn && articleData.contentEn.body) {
            articleData.contentEn.body.forEach(item => {
              if (item.type === 'image' && item.url) {
                imageUrlsToDelete.push(item.url);
              }
            });
          }

          // Add Sinhala body image URLs
          if (articleData.contentSi && articleData.contentSi.body) {
            articleData.contentSi.body.forEach(item => {
              if (item.type === 'image' && item.url) {
                imageUrlsToDelete.push(item.url);
              }
            });
          }

          // Delete images from Firebase Storage
          for (const url of imageUrlsToDelete) {
            try {
              const imageRef = ref(storage, url);
              await deleteObject(imageRef);
              console.log(`Deleted image: ${url}`);
            } catch (storageErr) {
              console.warn(`Failed to delete image ${url}:`, storageErr);
              // Continue with Firestore deletion even if image deletion fails
            }
          }
        }

        // Delete article from Firestore
        await deleteDoc(articleDocRef);
        setArticles(articles.filter(article => article.id !== articleId));
        alert('Article and associated images deleted successfully!');
      } catch (err) {
        console.error("Error deleting article or images:", err);
        alert('Failed to delete article or some associated images.');
      } finally {
        setDeletingId(null); // Clear deleting state
      }
    }
  };

  const filteredAndSearchedArticles = articles.filter(article => {
    const matchesSearch = (
      article.contentEn.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.contentEn.snippet.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.contentSi.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.contentSi.snippet.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const matchesLanguage = filterLanguage === 'All' || 
                            (filterLanguage === 'en' && article.contentEn) || 
                            (filterLanguage === 'si' && article.contentSi);

    const matchesCategory = filterCategory === 'All' || article.category === filterCategory;

    return matchesSearch && matchesLanguage && matchesCategory;
  });

  if (loading) {
    return <div className="text-center py-8">Loading articles...</div>;
  }

  // Prioritize "No articles found" if the filtered list is empty
  if (filteredAndSearchedArticles.length === 0 && !loading) {
    // This block will be empty, as the message will be shown via alert
  }

  // Only show a general error if there are articles AND an error occurred (unlikely scenario)
  // Or if the error is truly critical and prevents any articles from being displayed.
  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Article Management</h1>

      <div className="flex justify-between items-center mb-6">
        <Link to="/dashboard/articles/new" className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create New Article
        </Link>
      </div>

      <div className="mb-6 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search articles..."
          className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          value={filterLanguage}
          onChange={(e) => setFilterLanguage(e.target.value)}
        >
          {languages.map(lang => (
            <option key={lang} value={lang}>{lang === 'en' ? 'English' : lang === 'si' ? 'Sinhala' : 'All'}</option>
          ))}
        </select>
      </div>

      {filteredAndSearchedArticles.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">ID</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Title (EN)</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Category</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSearchedArticles.map((article) => (
                <tr key={article.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-800">{article.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{article.contentEn.title}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{article.category}</td>
                  <td className="py-3 px-4 text-sm">
                    <Link to={`/dashboard/articles/edit/${article.id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="text-red-600 hover:text-red-900"
                      disabled={deletingId === article.id} // Disable button during deletion
                    >
                      {deletingId === article.id ? 'Deleting...' : 'Delete'} {/* Show deleting state */}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null /* Render nothing if no articles and not loading */}

      <ToastNotification
        message={toastMessage}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};

export default ArticleList;
