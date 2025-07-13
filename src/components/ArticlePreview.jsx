import React, { useState } from 'react';

const ArticlePreview = ({ article }) => {
  const [previewLang, setPreviewLang] = useState('En'); // 'En' or 'Si'

  if (!article) {
    return (
      <div className="sticky top-4 h-full">
        <div className="border-8 border-gray-800 rounded-3xl shadow-2xl overflow-hidden w-[320px] h-[640px] bg-white mx-auto">
          <div className="p-4">
            <p className="text-gray-500">Start typing to see a preview...</p>
          </div>
        </div>
      </div>
    );
  }

  // Determine which content to display based on the selected language
  const content = previewLang === 'En' ? article.contentEn : article.contentSi;
  const { title, snippet, body } = content || { title: '', snippet: '', body: [] };
  const { imageUrl } = article;

  return (
    <div className="sticky top-4 h-full">
      <div className="border-8 border-gray-800 rounded-3xl shadow-2xl overflow-hidden w-[320px] h-[640px] bg-white mx-auto flex flex-col">
        {/* Status bar */}
        <div className="bg-gray-800 p-2 flex justify-between items-center flex-shrink-0">
          <span className="text-white text-xs">9:41 AM</span>
          <span className="text-white text-xs">4G</span>
        </div>

        {/* Language Switcher */}
        <div className="p-2 bg-gray-200 flex justify-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={() => setPreviewLang('En')}
            className={`px-4 py-1 text-sm rounded-md ${previewLang === 'En' ? 'bg-primary text-white' : 'bg-white'}`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => setPreviewLang('Si')}
            className={`px-4 py-1 text-sm rounded-md ${previewLang === 'Si' ? 'bg-primary text-white' : 'bg-white'}`}
          >
            Sinhala
          </button>
        </div>

        {/* Article Content */}
        <div className="p-4 overflow-y-auto flex-grow">
          {imageUrl && (
            <img src={imageUrl} alt="Article Thumbnail" className="w-full h-40 object-cover rounded-lg mb-4" />
          )}
          <h1 className="text-2xl font-bold mb-2 break-words">{title || 'Article Title'}</h1>
          <p className="text-gray-600 italic mb-4 break-words">{snippet || 'Article snippet...'}</p>
          
          <div className="space-y-4">
            {body && body.length > 0 ? body.map((item, index) => {
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
            }) : (
                <p className="text-gray-400">Article body will appear here.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePreview;