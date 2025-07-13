import React, { useState } from 'react';
import GeneralNotifications from './GeneralNotifications';
import UserSpecificNotifications from './UserSpecificNotifications';


const NotificationCenter = () => {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Notification Center</h1>

      <div className="flex border-b border-gray-300 mb-6">
        <button
          className={`py-2 px-4 text-lg font-medium ${
            activeTab === 'general'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('general')}
        >
          General Notifications
        </button>
        <button
          className={`py-2 px-4 text-lg font-medium ml-4 ${
            activeTab === 'user-specific'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('user-specific')}
        >
          User-Specific Notifications
        </button>
      </div>

      <div>
        {activeTab === 'general' && <GeneralNotifications />}
        {activeTab === 'user-specific' && <UserSpecificNotifications />}
      </div>
    </div>
  );
};

export default NotificationCenter;
