import React from 'react';

const NewsArticlePreview = ({ item }) => {
  if (!item) {
    return (
      <div className="sticky top-4 h-full">
        <div className="border-8 border-gray-800 rounded-3xl shadow-2xl overflow-hidden w-[320px] h-[640px] bg-white mx-auto">
          <div className="p-4">
            <p className="text-gray-500">Preview will appear here...</p>
          </div>
        </div>
      </div>
    );
  }

  const { title, snippet, body, thumbnailUrl } = item;

  return (
    <div className="sticky top-4 h-full">
      <div className="border-8 border-gray-800 rounded-3xl shadow-2xl overflow-hidden w-[320px] h-[640px] bg-white mx-auto flex flex-col">
        <div className="bg-gray-800 p-2 flex justify-between items-center flex-shrink-0">
          <span className="text-white text-xs">9:41 AM</span>
          <span className="text-white text-xs">5G</span>
        </div>

        <div className="p-4 overflow-y-auto flex-grow">
          {thumbnailUrl && (
            <img src={thumbnailUrl} alt="Thumbnail" className="w-full h-40 object-cover rounded-lg mb-4" />
          )}
          <h1 className="text-2xl font-bold mb-2 break-words">{title || 'Title'}</h1>
          <p className="text-gray-600 italic mb-4 break-words">{snippet || 'Snippet...'}</p>
          
          <div className="space-y-4">
            {body && body.length > 0 ? body.map((bodyItem, index) => {
              if (bodyItem.type === 'paragraph') {
                return <p key={index} className="text-gray-700 text-base leading-relaxed break-words">{bodyItem.text || ''}</p>;
              }
              if (bodyItem.type === 'image') {
                return (
                  <div key={index} className="my-4">
                    {bodyItem.url ? (
                      <img src={bodyItem.url} alt={bodyItem.alt || 'Content Image'} className="w-full rounded-lg" />
                    ) : (
                      <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                        <p className="text-gray-500">Image</p>
                      </div>
                    )}
                    {bodyItem.alt && <p className="text-center text-sm text-gray-500 mt-1 italic">{bodyItem.alt}</p>}
                  </div>
                );
              }
              return null;
            }) : (
                <p className="text-gray-400">Content body will appear here.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsArticlePreview;
