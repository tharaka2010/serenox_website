import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import ToastNotification from '../../../components/ToastNotification';

const ReplyFormatSettings = () => {
  const [header, setHeader] = useState('');
  const [footer, setFooter] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const settingsDocRef = doc(db, 'settings', 'feedbackFormat');

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const docSnap = await getDoc(settingsDocRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setHeader(data.header || '');
          setFooter(data.footer || '');
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
        setToastMessage('Failed to load settings.');
        setShowToast(true);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(settingsDocRef, { header, footer });
      setToastMessage('Reply format saved successfully!');
      setShowToast(true);
    } catch (error) {
      console.error("Error saving settings:", error);
      setToastMessage('Failed to save settings.');
      setShowToast(true);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading settings...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Reply Format Settings</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <label htmlFor="header" className="block text-gray-700 text-lg font-bold mb-2">
            Reply Header
          </label>
          <p className="text-sm text-gray-600 mb-2">This text will appear at the beginning of every reply.</p>
          <textarea
            id="header"
            value={header}
            onChange={(e) => setHeader(e.target.value)}
            className="w-full p-2 border rounded-md h-24"
            placeholder="e.g., Dear User,"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="footer" className="block text-gray-700 text-lg font-bold mb-2">
            Reply Footer
          </label>
          <p className="text-sm text-gray-600 mb-2">This text will appear at the end of every reply.</p>
          <textarea
            id="footer"
            value={footer}
            onChange={(e) => setFooter(e.target.value)}
            className="w-full p-2 border rounded-md h-24"
            placeholder="e.g., Sincerely,&#10;The Serenox Team"
          />
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {saving ? 'Saving...' : 'Save Format'}
        </button>
      </div>
      <ToastNotification message={toastMessage} show={showToast} onClose={() => setShowToast(false)} />
    </div>
  );
};

export default ReplyFormatSettings;
