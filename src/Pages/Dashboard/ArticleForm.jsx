import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc, collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import ImageUploader from '../../components/ImageUploader';

const ArticleForm = () => {
  const { id } = useParams(); // Get article ID from URL for edit mode
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({}); // New state for validation errors

  const [article, setArticle] = useState({
    id: '', // This will be the Firestore doc ID for existing articles, or a placeholder for new ones
    category: 'General',
    subtopic: 'Beginner',
    contentEn: {
      title: '',
      snippet: '',
      body: [], // Array of { type: 'paragraph', text: '' } or { type: 'image', url: '', alt: '' }
    },
    contentSi: {
      title: '',
      snippet: '',
      body: [],
    },
    imageUrl: '', // Thumbnail URL
    createdAt: null,
  });

  const categories = ['General', 'Male', 'Female', 'Child'];
  const subtopics = ['Beginner', 'Intermediate', 'Advanced']; // Example subtopics

  useEffect(() => {
    if (id) {
      const fetchArticle = async () => {
        setLoading(true);
        try {
          const docRef = doc(db, 'articles', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const fetchedArticle = { id: docSnap.id, ...docSnap.data() };
            setArticle(fetchedArticle);
            console.log('ArticleForm: Fetched article for edit:', fetchedArticle);
          } else {
            setError('Article not found.');
          }
        } catch (err) {
          console.error("Error fetching article:", err);
          setError('Failed to load article for editing.');
        } finally {
          setLoading(false);
        }
      };
      fetchArticle();
    } else {
      setLoading(false);
      // For new articles, set a placeholder ID or handle it in submission
      setArticle(prev => ({ ...prev, id: Date.now().toString() })); // Simple unique ID for new articles
      console.log('ArticleForm: New article mode.');
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArticle(prev => ({
      ...prev,
      [name]: value,
    }));
    setValidationErrors(prev => ({ ...prev, [name]: undefined })); // Clear validation error on change
  };

  const handleContentChange = (lang, field, value) => {
    setArticle(prev => ({
      ...prev,
      [`content${lang}`]: {
        ...prev[`content${lang}`],
        [field]: value,
      },
    }));
    setValidationErrors(prev => ({ ...prev, [`content${lang}.${field}`]: undefined })); // Clear validation error on change
  };

  const handleBodyItemChange = (lang, index, field, value) => {
    const newBody = [...article[`content${lang}`].body];
    newBody[index][field] = value;
    setArticle(prev => ({
      ...prev,
      [`content${lang}`]: {
        ...prev[`content${lang}`],
        body: newBody,
      },
    }));
    setValidationErrors(prev => ({ ...prev, [`content${lang}.body`]: undefined })); // Clear validation error on change
  };

  const addBodyItem = (lang, type) => {
    setArticle(prev => ({
      ...prev,
      [`content${lang}`]: {
        ...prev[`content${lang}`],
        body: [...prev[`content${lang}`].body, type === 'paragraph' ? { type: 'paragraph', text: '' } : { type: 'image', url: '', alt: '' }],
      },
    }));
    setValidationErrors(prev => ({ ...prev, [`content${lang}.body`]: undefined })); // Clear validation error on change
  };

  const removeBodyItem = (lang, index) => {
    setArticle(prev => ({
      ...prev,
      [`content${lang}`]: {
        ...prev[`content${lang}`],
        body: prev[`content${lang}`].body.filter((_, i) => i !== index),
      },
    }));
    setValidationErrors(prev => ({ ...prev, [`content${lang}.body`]: undefined })); // Clear validation error on change
  };

  const handleThumbnailUploadSuccess = (url) => {
    console.log('ArticleForm: Thumbnail upload success, URL:', url);
    setArticle(prev => ({ ...prev, imageUrl: url }));
    setValidationErrors(prev => ({ ...prev, imageUrl: undefined })); // Clear validation error on change
  };

  const handleBodyImageUploadSuccess = (lang, index, url) => {
    console.log(`ArticleForm: Body image upload success (${lang}, index ${index}), URL:`, url);
    handleBodyItemChange(lang, index, 'url', url);
  };

  const validateForm = () => {
    const errors = {};

    if (!article.contentEn.title.trim()) {
      errors.contentEn_title = 'English Title is required.';
    }
    if (!article.contentEn.snippet.trim()) {
      errors.contentEn_snippet = 'English Snippet is required.';
    }
    if (article.contentEn.body.length === 0) {
      errors.contentEn_body = 'English Article Body cannot be empty. Add at least one paragraph or image.';
    }

    if (!article.contentSi.title.trim()) {
      errors.contentSi_title = 'Sinhala Title is required.';
    }
    if (!article.contentSi.snippet.trim()) {
      errors.contentSi_snippet = 'Sinhala Snippet is required.';
    }
    if (article.contentSi.body.length === 0) {
      errors.contentSi_body = 'Sinhala Article Body cannot be empty. Add at least one paragraph or image.';
    }

    // Optional: Validate image URLs within body if needed
    // article.contentEn.body.forEach((item, index) => {
    //   if (item.type === 'image' && !item.url) {
    //     errors[`contentEn_body_image_${index}`] = 'Image URL is required for English body image.';
    //   }
    // });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const articleToSave = { ...article };
      // Remove the temporary 'id' if it's a new article and we're letting Firestore generate one
      if (!id) {
        delete articleToSave.id;
        articleToSave.createdAt = new Date(); // Set createdAt for new articles
        const docRef = await addDoc(collection(db, 'articles'), articleToSave);
        alert('Article created successfully!');
        navigate(`/dashboard/articles/edit/${docRef.id}`); // Redirect to edit page of new article
      } else {
        // For existing articles, use setDoc with merge: true to update
        await setDoc(doc(db, 'articles', id), articleToSave, { merge: true });
        alert('Article updated successfully!');
        navigate('/dashboard/articles'); // Redirect to list after update
      }
    } catch (err) {
      console.error("Error saving article:", err);
      setError('Failed to save article: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading article...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{id ? 'Edit Article' : 'Create New Article'}</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        {/* Basic Article Details */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category:</label>
          <select
            id="category"
            name="category"
            value={article.category}
            onChange={handleInputChange}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="subtopic" className="block text-gray-700 text-sm font-bold mb-2">Subtopic:</label>
          <select
            id="subtopic"
            name="subtopic"
            value={article.subtopic}
            onChange={handleInputChange}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            {subtopics.map(sub => <option key={sub} value={sub}>{sub}</option>)}
          </select>
        </div>

        {/* Thumbnail Image Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Thumbnail Image:</label>
          {article.imageUrl && (
            <div className="mb-2 p-2 border rounded-md bg-gray-100 flex items-center">
              <img src={article.imageUrl} alt="Current Thumbnail" className="max-w-[100px] h-auto rounded-md mr-4" />
              <div>
                <p className="text-sm text-gray-600 font-semibold">Existing Thumbnail:</p>
                <p className="text-xs text-gray-500 break-all">{article.imageUrl}</p>
              </div>
            </div>
          )}
          <ImageUploader onUploadSuccess={handleThumbnailUploadSuccess} folderPath="article_thumbnails/" />
          {validationErrors.imageUrl && <p className="text-red-500 text-xs italic mt-1">{validationErrors.imageUrl}</p>}
        </div>

        {/* English Content */}
        <div className="mb-6 p-4 border rounded-md bg-blue-50">
          <h3 className="text-xl font-semibold mb-4">English Content (EN)</h3>
          <div className="mb-4">
            <label htmlFor="titleEn" className="block text-gray-700 text-sm font-bold mb-2">Title (EN):</label>
            <input
              type="text"
              id="titleEn"
              value={article.contentEn.title}
              onChange={(e) => handleContentChange('En', 'title', e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            {validationErrors.contentEn_title && <p className="text-red-500 text-xs italic mt-1">{validationErrors.contentEn_title}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="snippetEn" className="block text-gray-700 text-sm font-bold mb-2">Snippet (EN):</label>
            <textarea
              id="snippetEn"
              value={article.contentEn.snippet}
              onChange={(e) => handleContentChange('En', 'snippet', e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="3"
              required
            ></textarea>
            {validationErrors.contentEn_snippet && <p className="text-red-500 text-xs italic mt-1">{validationErrors.contentEn_snippet}</p>}
          </div>

          {/* English Body Content */}
          <h4 className="text-lg font-semibold mb-2">Body (EN):</h4>
          {article.contentEn.body.map((item, index) => (
            <div key={index} className="mb-4 p-3 border rounded-md bg-white relative">
              <button
                type="button"
                onClick={() => removeBodyItem('En', index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
              >
                X
              </button>
              {item.type === 'paragraph' ? (
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Paragraph:</label>
                  <textarea
                    value={item.text}
                    onChange={(e) => handleBodyItemChange('En', index, 'text', e.target.value)}
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    rows="4"
                  ></textarea>
                </div>
              ) : (
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Image URL:</label>
                  {item.url && (
                    <div className="mb-2 p-2 border rounded-md bg-gray-100 flex items-center">
                      <img src={item.url} alt="Existing Body Content Image" className="max-w-[100px] h-auto rounded-md mr-4" />
                      <div>
                        <p className="text-sm text-gray-600 font-semibold">Existing Image:</p>
                        <p className="text-xs text-gray-500 break-all">{item.url}</p>
                      </div>
                    </div>
                  )}
                  <ImageUploader onUploadSuccess={(url) => handleBodyImageUploadSuccess('En', index, url)} folderPath="article_body_images/" />
                  <label className="block text-gray-700 text-sm font-bold mb-2 mt-2">Image Alt Text:</label>
                  <input
                    type="text"
                    value={item.alt}
                    onChange={(e) => handleBodyItemChange('En', index, 'alt', e.target.value)}
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              )}
            </div>
          ))}
          <div className="flex gap-2 mt-4">
            <button type="button" onClick={() => addBodyItem('En', 'paragraph')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
              Add Paragraph
            </button>
            <button type="button" onClick={() => addBodyItem('En', 'image')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
              Add Image
            </button>
          </div>
          {validationErrors.contentEn_body && <p className="text-red-500 text-xs italic mt-1">{validationErrors.contentEn_body}</p>}
        </div>

        {/* Sinhala Content */}
        <div className="mb-6 p-4 border rounded-md bg-green-50">
          <h3 className="text-xl font-semibold mb-4">Sinhala Content (SI)</h3>
          <div className="mb-4">
            <label htmlFor="titleSi" className="block text-gray-700 text-sm font-bold mb-2">Title (SI):</label>
            <input
              type="text"
              id="titleSi"
              value={article.contentSi.title}
              onChange={(e) => handleContentChange('Si', 'title', e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            {validationErrors.contentSi_title && <p className="text-red-500 text-xs italic mt-1">{validationErrors.contentSi_title}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="snippetSi" className="block text-gray-700 text-sm font-bold mb-2">Snippet (SI):</label>
            <textarea
              id="snippetSi"
              value={article.contentSi.snippet}
              onChange={(e) => handleContentChange('Si', 'snippet', e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="3"
              required
            ></textarea>
            {validationErrors.contentSi_snippet && <p className="text-red-500 text-xs italic mt-1">{validationErrors.contentSi_snippet}</p>}
          </div>

          {/* Sinhala Body Content */}
          <h4 className="text-lg font-semibold mb-2">Body (SI):</h4>
          {article.contentSi.body.map((item, index) => (
            <div key={index} className="mb-4 p-3 border rounded-md bg-white relative">
              <button
                type="button"
                onClick={() => removeBodyItem('Si', index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
              >
                X
              </button>
              {item.type === 'paragraph' ? (
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Paragraph:</label>
                  <textarea
                    value={item.text}
                    onChange={(e) => handleBodyItemChange('Si', index, 'text', e.target.value)}
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    rows="4"
                  ></textarea>
                </div>
              ) : (
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Image URL:</label>
                  {item.url && (
                    <div className="mb-2 p-2 border rounded-md bg-gray-100 flex items-center">
                      <img src={item.url} alt="Existing Body Content Image" className="max-w-[100px] h-auto rounded-md mr-4" />
                      <div>
                        <p className="text-sm text-gray-600 font-semibold">Existing Image:</p>
                        <p className="text-xs text-gray-500 break-all">{item.url}</p>
                      </div>
                    </div>
                  )}
                  <ImageUploader onUploadSuccess={(url) => handleBodyImageUploadSuccess('Si', index, url)} folderPath="article_body_images/" />
                  <label className="block text-gray-700 text-sm font-bold mb-2 mt-2">Image Alt Text:</label>
                  <input
                    type="text"
                    value={item.alt}
                    onChange={(e) => handleBodyItemChange('Si', index, 'alt', e.target.value)}
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              )}
            </div>
          ))}
          <div className="flex gap-2 mt-4">
            <button type="button" onClick={() => addBodyItem('Si', 'paragraph')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
              Add Paragraph
            </button>
            <button type="button" onClick={() => addBodyItem('Si', 'image')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
              Add Image
            </button>
          </div>
          {validationErrors.contentSi_body && <p className="text-red-500 text-xs italic mt-1">{validationErrors.contentSi_body}</p>}
        </div>

        <div className="flex items-center justify-between mt-6">
          <button
            type="submit"
            disabled={submitting}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {submitting ? 'Saving...' : (id ? 'Update Article' : 'Create Article')}
          </button>
          <button
            type="button"
            onClick={() => navigate('/dashboard/articles')}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default ArticleForm;
