import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import ImageUploader from '../../../components/ImageUploader';
import NewsArticlePreview from './NewsArticlePreview';

const NewsArticleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [item, setItem] = useState({
    type: 'News',
    title: '',
    snippet: '',
    thumbnailUrl: '',
    body: [], // { type: 'paragraph', text: '' } or { type: 'image', url: '', alt: '' }
    createdAt: null,
    viewCount: 0,
  });

  const types = ['News', 'Article'];

  useEffect(() => {
    if (id) {
      const fetchItem = async () => {
        setLoading(true);
        try {
          const docRef = doc(db, 'newsAndArticles', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setItem({ id: docSnap.id, ...docSnap.data() });
          } else {
            setError('Item not found.');
          }
        } catch (err) {
          setError('Failed to load item.');
        } finally {
          setLoading(false);
        }
      };
      fetchItem();
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem(prev => ({ ...prev, [name]: value }));
  };

  const handleBodyItemChange = (index, field, value) => {
    const newBody = [...item.body];
    newBody[index][field] = value;
    setItem(prev => ({ ...prev, body: newBody }));
  };

  const addBodyItem = (type) => {
    setItem(prev => ({
      ...prev,
      body: [...prev.body, type === 'paragraph' ? { type: 'paragraph', text: '' } : { type: 'image', url: '', alt: '' }],
    }));
  };

  const removeBodyItem = (index) => {
    setItem(prev => ({
      ...prev,
      body: prev.body.filter((_, i) => i !== index),
    }));
  };

  const handleThumbnailUploadSuccess = (url) => {
    setItem(prev => ({ ...prev, thumbnailUrl: url }));
  };

  const handleBodyImageUploadSuccess = (index, url) => {
    handleBodyItemChange(index, 'url', url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const itemToSave = { ...item };
      if (id) {
        await setDoc(doc(db, 'newsAndArticles', id), itemToSave, { merge: true });
        alert('Item updated successfully!');
        navigate('/admin/dashboard/news');
      } else {
        itemToSave.createdAt = serverTimestamp();
        await addDoc(collection(db, 'newsAndArticles'), itemToSave);
        alert('Item created successfully!');
        navigate('/admin/dashboard/news');
      }
    } catch (err) {
      setError('Failed to save item: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{id ? 'Edit' : 'Create'} News/Article</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Type:</label>
              <select name="type" value={item.type} onChange={handleInputChange} className="w-full p-2 border rounded">
                {types.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Title:</label>
              <input type="text" name="title" value={item.title} onChange={handleInputChange} className="w-full p-2 border rounded" required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Snippet:</label>
              <textarea name="snippet" value={item.snippet} onChange={handleInputChange} className="w-full p-2 border rounded" rows="3" required></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Thumbnail Image:</label>
              {item.thumbnailUrl && <img src={item.thumbnailUrl} alt="Thumbnail" className="w-32 h-auto rounded-md mb-2" />}
              <ImageUploader onUploadSuccess={handleThumbnailUploadSuccess} folderPath="news_thumbnails/" />
            </div>

            <h3 className="text-xl font-semibold my-4">Content Body</h3>
            {item.body.map((bodyItem, index) => (
              <div key={index} className="mb-4 p-3 border rounded-md relative">
                <button type="button" onClick={() => removeBodyItem(index)} className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6">X</button>
                {bodyItem.type === 'paragraph' ? (
                  <textarea value={bodyItem.text} onChange={(e) => handleBodyItemChange(index, 'text', e.target.value)} className="w-full p-2 border rounded" rows="4"></textarea>
                ) : (
                  <div>
                    {bodyItem.url && <img src={bodyItem.url} alt="Body content" className="w-32 h-auto rounded-md mb-2" />}
                    <ImageUploader onUploadSuccess={(url) => handleBodyImageUploadSuccess(index, url)} folderPath="news_body_images/" />
                    <input type="text" value={bodyItem.alt} onChange={(e) => handleBodyItemChange(index, 'alt', e.target.value)} placeholder="Image alt text" className="w-full p-2 mt-2 border rounded" />
                  </div>
                )}
              </div>
            ))}
            <button type="button" onClick={() => addBodyItem('paragraph')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded mr-2">Add Paragraph</button>
            <button type="button" onClick={() => addBodyItem('image')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">Add Image</button>

            <div className="mt-6">
              <button type="submit" disabled={submitting} className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                {submitting ? 'Saving...' : (id ? 'Update' : 'Create')}
              </button>
              <button type="button" onClick={() => navigate('/admin/dashboard/news')} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-4">
                Cancel
              </button>
            </div>
          </form>
        </div>
        <div className="w-full md:w-1/3">
          <NewsArticlePreview item={item} />
        </div>
      </div>
    </div>
  );
};

export default NewsArticleForm;
