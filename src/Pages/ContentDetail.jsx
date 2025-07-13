import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const ContentDetail = () => {
  const { type, id } = useParams(); // 'type' will be 'articles' or 'newsAndArticles'
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      try {
        const collectionName = type === 'news' ? 'newsAndArticles' : 'articles';
        const docRef = doc(db, collectionName, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setContent(docSnap.data());
          // Increment view count for news and articles
          if (type === 'news') {
            await updateDoc(docRef, {
              viewCount: increment(1)
            });
          }
        } else {
          setError('Content not found.');
        }
      } catch (err) {
        console.error("Error fetching content:", err);
        setError('Failed to load content.');
      } finally {
        setLoading(false);
      }
    };

    if (type && id) {
      fetchContent();
    }
  }, [type, id]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  if (!content) {
    return null;
  }

  // Adjust for different content structures if necessary
  const { title, snippet, body, imageUrl, thumbnailUrl } = content.contentEn || content;
  const displayImageUrl = thumbnailUrl || imageUrl;


  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto">
        {displayImageUrl && <img src={displayImageUrl} alt={title} className="w-full h-auto rounded-lg mb-4" />}
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <p className="text-lg text-gray-600 italic mb-4">{snippet}</p>
        <div className="prose max-w-none">
          {body.map((item, index) => {
            if (item.type === 'paragraph') {
              return <p key={index}>{item.text}</p>;
            }
            if (item.type === 'image') {
              return <img key={index} src={item.url} alt={item.alt || ''} className="my-4 rounded-lg" />;
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default ContentDetail;