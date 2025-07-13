import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { Link } from 'react-router-dom';

export const News = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsItems = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, 'articles'), where('category', '==', 'News'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const newsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setNewsItems(newsData);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError('Could not load news items.');
      } finally {
        setLoading(false);
      }
    };

    fetchNewsItems();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading news...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4">
      <div className="max-w-[1340px] mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-12 text-primary">News</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map(item => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col transition duration-300 ease-in-out transform hover:scale-105">
              <h2 className="text-2xl font-bold mb-3 text-gray-800">{item.title}</h2>
              <p className="text-gray-600 mb-4 flex-grow">{item.snippet}</p>
              <Link to={`/content/${item.id}`} className="bg-primary text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 mt-auto text-center">
                Read More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};