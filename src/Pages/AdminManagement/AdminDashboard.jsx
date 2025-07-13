import React from 'react';
import { Link } from 'react-router-dom';
import { FaBookOpen, FaNewspaper, FaComments, FaBell } from 'react-icons/fa';

const AdminDashboard = () => {
  const adminTasks = [
    {
      title: 'Sex Education Content',
      path: '/admin/dashboard/sex-ed',
      description: 'Manage educational articles and resources.',
      icon: <FaBookOpen size={40} className="text-blue-500" />,
    },
    {
      title: 'News & Articles',
      path: '/admin/dashboard/news',
      description: 'Create, edit, and publish news and articles.',
      icon: <FaNewspaper size={40} className="text-green-500" />,
    },
    {
      title: 'User Feedback',
      path: '/admin/dashboard/feedback',
      description: 'View and respond to user comments and feedback.',
      icon: <FaComments size={40} className="text-purple-500" />,
    },
    {
      title: 'Notification Management',
      path: '/admin/dashboard/notifications',
      description: 'Send announcements and notifications to users.',
      icon: <FaBell size={40} className="text-red-500" />,
    },
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-lg text-gray-600 mt-2">Select a task to manage your application content.</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {adminTasks.map((task, index) => (
          <Link
            to={task.path}
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="mb-4">{task.icon}</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{task.title}</h2>
            <p className="text-gray-600">{task.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
