import React, { useState } from 'react';
import { collection, query, where, getDocs, doc, deleteDoc, orderBy } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';

const UserSpecificNotifications = () => {
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setUser(null);
    setNotifications([]);

    try {
      // 1. Find user by email
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError('User not found.');
        setLoading(false);
        return;
      }

      // 2. Get user UID and fetch their notifications
      const userDoc = querySnapshot.docs[0];
      const userData = { id: userDoc.id, ...userDoc.data() };
      setUser(userData);

      const notificationsRef = collection(db, 'users', userData.id, 'notifications');
      const notificationsQuery = query(notificationsRef, orderBy('createdAt', 'desc'));
      const notificationsSnapshot = await getDocs(notificationsQuery);
      
      const notificationsData = notificationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNotifications(notificationsData);

    } catch (err) {
      setError('Failed to search for user or fetch notifications.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (notificationId) => {
    if (!user) return;
    if (window.confirm('Are you sure you want to delete this notification?')) {
      try {
        const notifDocRef = doc(db, 'users', user.id, 'notifications', notificationId);
        await deleteDoc(notifDocRef);
        // Refresh list
        setNotifications(prev => prev.filter(n => n.id !== notificationId));
      } catch (err) {
        setError('Failed to delete notification.');
        console.error(err);
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Search Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Find User Notifications</h3>
        <form onSubmit={handleSearch} className="flex space-x-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter user email"
            className="flex-grow p-2 border rounded"
            required
          />
          <button type="submit" disabled={loading} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50">
            {loading ? 'Searching...' : 'Find User'}
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {/* User's Notifications List */}
      {user && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Notifications for {user.email}</h3>
          {notifications.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4">Title</th>
                    <th className="text-left py-2 px-4">Body</th>
                    <th className="text-left py-2 px-4">Image</th>
                    <th className="text-left py-2 px-4">Date</th>
                    <th className="text-left py-2 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {notifications.map(n => (
                    <tr key={n.id} className="border-b">
                      <td className="py-2 px-4">{n.title}</td>
                      <td className="py-2 px-4">{n.body}</td>
                      <td className="py-2 px-4">{n.imageUrl && <img src={n.imageUrl} alt={n.title} className="w-16 h-16 object-cover rounded" />}</td>
                      <td className="py-2 px-4">{n.createdAt?.toDate().toLocaleDateString()}</td>
                      <td className="py-2 px-4">
                        <button onClick={() => handleDelete(n.id)} className="text-red-600 hover:underline">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No notifications found for this user.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserSpecificNotifications;
