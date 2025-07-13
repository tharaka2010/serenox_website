import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../../../firebaseConfig';
import ImageUploader from '../../../components/ImageUploader';

const GeneralNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [editingNotification, setEditingNotification] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    imageUrl: '',
    targetAudienceType: 'All Users',
    gender: 'Male',
    minAge: '',
    maxAge: '',
    language: 'English',
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'notifications'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const notificationsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNotifications(notificationsData);
    } catch (err) {
      setError('Failed to fetch notifications.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUploadSuccess = (url, file) => {
    setFormData(prev => ({ ...prev, imageUrl: url }));
    setImageFile(file);
  };

  const clearForm = () => {
    setEditingNotification(null);
    setFormData({
      title: '',
      body: '',
      imageUrl: '',
      targetAudienceType: 'All Users',
      gender: 'Male',
      minAge: '',
      maxAge: '',
      language: 'English',
    });
    setImageFile(null);
  };

  const handleEdit = (notification) => {
    setEditingNotification(notification);
    setFormData({
      title: notification.title,
      body: notification.body,
      imageUrl: notification.imageUrl || '',
      targetAudienceType: notification.targetAudience === 'all' ? 'All Users' : 'Filtered Audience',
      gender: notification.targetAudience?.gender || 'Male',
      minAge: notification.targetAudience?.age_min || '',
      maxAge: notification.targetAudience?.age_max || '',
      language: notification.targetAudience?.language || 'English',
    });
  };

  const handleDelete = async (id, imageUrl) => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      try {
        // Delete image from storage
        if (imageUrl) {
          const imageRef = ref(storage, imageUrl);
          await deleteObject(imageRef);
        }
        // Delete document from firestore
        await deleteDoc(doc(db, 'notifications', id));
        fetchNotifications(); // Refresh list
      } catch (err) {
        setError('Failed to delete notification.');
        console.error(err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    let finalImageUrl = formData.imageUrl;

    try {
      // Upload image if a new one is selected
      if (imageFile) {
        const storageRef = ref(storage, `notification_images/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(storageRef, imageFile);
        finalImageUrl = await getDownloadURL(snapshot.ref);
      }

      const notificationData = {
        title: formData.title,
        body: formData.body,
        imageUrl: finalImageUrl,
        targetAudience: formData.targetAudienceType === 'All Users' ? 'all' : {
          gender: formData.gender,
          age_min: Number(formData.minAge) || null,
          age_max: Number(formData.maxAge) || null,
          language: formData.language,
        },
        createdAt: serverTimestamp(),
      };

      if (editingNotification) {
        // Update
        const docRef = doc(db, 'notifications', editingNotification.id);
        await updateDoc(docRef, notificationData);
      } else {
        // Create
        await addDoc(collection(db, 'notifications'), notificationData);
      }

      clearForm();
      fetchNotifications();
    } catch (err) {
      setError('Failed to save notification.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Form Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">{editingNotification ? 'Edit Notification' : 'Create Notification'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Title" className="w-full p-2 border rounded" required />
          <textarea name="body" value={formData.body} onChange={handleInputChange} placeholder="Body" className="w-full p-2 border rounded" required />
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <ImageUploader onUploadSuccess={handleImageUploadSuccess} folderPath="notification_images/" />
            {formData.imageUrl && <img src={formData.imageUrl} alt="Preview" className="w-32 h-32 mt-2 object-cover rounded" />}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Target Audience</label>
            <div className="flex items-center space-x-4">
              <label><input type="radio" name="targetAudienceType" value="All Users" checked={formData.targetAudienceType === 'All Users'} onChange={handleInputChange} /> All Users</label>
              <label><input type="radio" name="targetAudienceType" value="Filtered Audience" checked={formData.targetAudienceType === 'Filtered Audience'} onChange={handleInputChange} /> Filtered Audience</label>
            </div>
          </div>

          {formData.targetAudienceType === 'Filtered Audience' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-md">
              <select name="gender" value={formData.gender} onChange={handleInputChange} className="p-2 border rounded">
                <option>Male</option>
                <option>Female</option>
              </select>
              <input type="number" name="minAge" value={formData.minAge} onChange={handleInputChange} placeholder="Min Age" className="p-2 border rounded" />
              <input type="number" name="maxAge" value={formData.maxAge} onChange={handleInputChange} placeholder="Max Age" className="p-2 border rounded" />
              <select name="language" value={formData.language} onChange={handleInputChange} className="p-2 border rounded">
                <option>English</option>
                <option>Sinhala</option>
              </select>
            </div>
          )}

          <div className="flex space-x-4">
            <button type="submit" disabled={isSubmitting} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50">
              {isSubmitting ? 'Saving...' : (editingNotification ? 'Update Notification' : 'Save Notification')}
            </button>
            <button type="button" onClick={clearForm} className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400">
              Clear
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>

      {/* List Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Sent General Notifications</h3>
        {loading ? <p>Loading...</p> : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4">Title</th>
                  <th className="text-left py-2 px-4">Body</th>
                  <th className="text-left py-2 px-4">Image</th>
                  <th className="text-left py-2 px-4">Target</th>
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
                    <td className="py-2 px-4">{typeof n.targetAudience === 'string' ? n.targetAudience : 'Filtered'}</td>
                    <td className="py-2 px-4">{n.createdAt?.toDate().toLocaleDateString()}</td>
                    <td className="py-2 px-4">
                      <button onClick={() => handleEdit(n)} className="text-blue-600 hover:underline mr-4">Edit</button>
                      <button onClick={() => handleDelete(n.id, n.imageUrl)} className="text-red-600 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneralNotifications;
