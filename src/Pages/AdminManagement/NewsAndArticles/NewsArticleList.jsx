import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy, deleteDoc, doc, getDoc as getFirestoreDoc } from 'firebase/firestore';
import { db, storage } from '../../../firebaseConfig';
import { ref, deleteObject } from 'firebase/storage';
import ToastNotification from '../../../components/ToastNotification';

const NewsArticleList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [deletingId, setDeletingId] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const types = ['All', 'News', 'Article'];

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const q = query(collection(db, 'newsAndArticles'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const itemsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setItems(itemsData);
      } catch (err) {
        console.error("Error fetching items:", err);
        setError('Could not load items.');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleDelete = async (item) => {
    if (window.confirm(`Are you sure you want to delete this ${item.type}?`)) {
      setDeletingId(item.id);
      try {
        const itemDocRef = doc(db, 'newsAndArticles', item.id);
        const itemDocSnap = await getFirestoreDoc(itemDocRef);

        if (itemDocSnap.exists()) {
          const itemData = itemDocSnap.data();
          const imageUrlsToDelete = [];

          if (itemData.thumbnailUrl) {
            imageUrlsToDelete.push(itemData.thumbnailUrl);
          }
          if (itemData.body) {
            itemData.body.forEach(bodyItem => {
              if (bodyItem.type === 'image' && bodyItem.url) {
                imageUrlsToDelete.push(bodyItem.url);
              }
            });
          }

          for (const url of imageUrlsToDelete) {
            try {
              const imageRef = ref(storage, url);
              await deleteObject(imageRef);
            } catch (storageErr) {
              console.warn(`Failed to delete image ${url}:`, storageErr);
            }
          }
        }

        await deleteDoc(itemDocRef);
        setItems(prevItems => prevItems.filter(i => i.id !== item.id));
        setToastMessage(`${item.type} deleted successfully!`);
        setShowToast(true);
      } catch (err) {
        console.error("Error deleting item:", err);
        setError(`Failed to delete ${item.type}.`);
      } finally {
        setDeletingId(null);
      }
    }
  };

  const filteredItems = items.filter(item => {
    const matchesType = filterType === 'All' || item.type === filterType;
    const matchesSearch = searchTerm === '' ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.snippet.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  if (loading) return <div className="text-center py-8">Loading content...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">News & Articles Management</h1>

      <div className="flex justify-between items-center mb-6">
        <Link to="/admin/dashboard/news/new" className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create New
        </Link>
      </div>

      <div className="mb-6 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="flex-grow p-2 border rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-2 border rounded-md"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          {types.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Views</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{item.title}</td>
                <td className="py-3 px-4">{item.type}</td>
                <td className="py-3 px-4">{item.viewCount || 0}</td>
                <td className="py-3 px-4">
                  <Link to={`/admin/dashboard/news/edit/${item.id}`} className="text-blue-600 hover:underline mr-4">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item)}
                    className="text-red-600 hover:underline"
                    disabled={deletingId === item.id}
                  >
                    {deletingId === item.id ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastNotification message={toastMessage} show={showToast} onClose={() => setShowToast(false)} />
    </div>
  );
};

export default NewsArticleList;
