import React, { useState } from 'react';

const ArticlePreview = ({ article }) => {
  const [previewLang, setPreviewLang] = useState('En'); // 'En' or 'Si'

  if (!article) {
    return (
      <div className="w-full md:w-1/3 lg:w-1/4 p-4">
        <div className="border-4 border-gray-800 rounded-3xl shadow-lg overflow-hidden h-[600px] bg-white">
          <div className="p-4">
            <p className="text-gray-500">Start typing to see a preview...</p>
          </div>
        </div>
      </div>
    );
  }

  const content = article[`content${previewLang}`] || article.contentEn;

  return (
    <div className="sticky top-4 h-full">
      <div className="border-8 border-gray-800 rounded-3xl shadow-2xl overflow-hidden w-[320px] h-[640px] bg-white mx-auto">
        {/* Status bar */}
        <div className="bg-gray-800 p-2 flex justify-between items-center">
          <span className="text-white text-xs">9:41 AM</span>
          <span className="text-white text-xs">4G</span>
        </div>

        {/* Language Toggle */}
        <div className="p-2 bg-gray-100 border-b border-gray-200 text-center">
          <button
            onClick={() => setPreviewLang('En')}
            className={`px-3 py-1 text-sm rounded-md mr-2 ${previewLang === 'En' ? 'bg-primary text-white' : 'bg-gray-300'}`}
          >
            English
          </button>
          <button
            onClick={() => setPreviewLang('Si')}
            className={`px-3 py-1 text-sm rounded-md ${previewLang === 'Si' ? 'bg-primary text-white' : 'bg-gray-300'}`}
          >
            Sinhala
          </button>
        </div>

        {/* Article Content */}
        <div className="p-4 overflow-y-auto h-[calc(100%-80px)]">
          {article.imageUrl && (
            <img src={article.imageUrl} alt="Article Thumbnail" className="w-full h-40 object-cover rounded-lg mb-4" />
          )}
          <h1 className="text-2xl font-bold mb-2">{content.title || 'Article Title'}</h1>
          <p className="text-gray-600 italic mb-4">{content.snippet || 'Article snippet...'}</p>
          
          <div className="space-y-4">
            {content.body && content.body.map((item, index) => {
              if (item.type === 'paragraph') {
                return <p key={index} className="text-gray-700 text-base leading-relaxed break-words">{item.text || 'Paragraph text...'}</p>;
              }
              if (item.type === 'image') {
                return (
                  <div key={index} className="my-4">
                    {item.url ? (
                      <img src={item.url} alt={item.alt || 'Article Body'} className="w-full rounded-lg" />
                    ) : (
                      <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                        <p className="text-gray-500">Image Placeholder</p>
                      </div>
                    )}
                    {item.alt && <p className="text-center text-sm text-gray-500 mt-1 italic">{item.alt}</p>}
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePreview;
