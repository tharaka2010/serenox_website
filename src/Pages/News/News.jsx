import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { Link } from 'react-router-dom';

export const News = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, 'newsAndArticles'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const itemsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setItems(itemsData);
      } catch (err) {
        console.error("Error fetching content:", err);
        setError('Could not load content.');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-12 text-primary">News & Articles</h1>

        {items.length === 0 && !loading && (
          <p className="text-center text-gray-500">No news or articles have been posted yet.</p>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map(item => (
            <Link to={`/content/news/${item.id}`} key={item.id} className="group bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition duration-300 ease-in-out transform hover:-translate-y-2">
              <div className="h-48 overflow-hidden">
                <img 
                  src={item.thumbnailUrl || 'https://via.placeholder.com/400x200?text=News'} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-sm text-primary font-semibold mb-2">{item.type}</p>
                <h2 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-primary transition-colors duration-300">{item.title}</h2>
                <p className="text-gray-600 mb-4 flex-grow">{item.snippet}</p>
                <div className="mt-auto text-primary font-semibold">
                  Read More &rarr;
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
