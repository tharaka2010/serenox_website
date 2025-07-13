import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, deleteDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import ToastNotification from '../../../components/ToastNotification';

const FeedbackDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [settings, setSettings] = useState({ header: '', footer: '' });
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const fetchFeedbackAndSettings = async () => {
      setLoading(true);
      try {
        // Fetch feedback item
        const feedbackDocRef = doc(db, 'feedback', id);
        const feedbackDocSnap = await getDoc(feedbackDocRef);
        if (feedbackDocSnap.exists()) {
          setFeedback({ id: feedbackDocSnap.id, ...feedbackDocSnap.data() });
        }

        // Fetch reply settings
        const settingsDocRef = doc(db, 'settings', 'feedbackFormat');
        const settingsDocSnap = await getDoc(settingsDocRef);
        if (settingsDocSnap.exists()) {
          setSettings(settingsDocSnap.data());
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setToastMessage('Failed to load data.');
        setShowToast(true);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbackAndSettings();
  }, [id]);

  const getFullReply = () => {
    const originalMessage = `On ${feedback.createdAt?.toDate().toLocaleDateString()},\nyou wrote:\n> ${feedback.message.replace(/\n/g, '\n> ')}`;
    return `${settings.header}\n\n${replyText}\n\n${settings.footer}\n\n---\n${originalMessage}`;
  };

  const handleSendReply = async () => {
    setSending(true);
    try {
      const fullReply = getFullReply();
      
      // 1. Update the feedback document
      const feedbackDocRef = doc(db, 'feedback', id);
      await updateDoc(feedbackDocRef, {
        reply: fullReply,
        status: 'Replied',
        repliedAt: serverTimestamp(),
      });

      // 2. Send notification to the user
      const userNotificationsRef = collection(db, 'users', feedback.userId, 'notifications');
      await addDoc(userNotificationsRef, {
        title: 'A Reply to Your Recent Feedback',
        body: fullReply,
        createdAt: serverTimestamp(),
        isRead: false,
      });

      setToastMessage('Reply sent successfully!');
      setShowToast(true);
      setTimeout(() => navigate('/admin/dashboard/feedback'), 2000);
    } catch (error) {
      console.error("Error sending reply:", error);
      setToastMessage('Failed to send reply.');
      setShowToast(true);
    } finally {
      setSending(false);
      setShowPreview(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this feedback? This action cannot be undone.')) {
      try {
        await deleteDoc(doc(db, 'feedback', id));
        setToastMessage('Feedback deleted.');
        setShowToast(true);
        setTimeout(() => navigate('/admin/dashboard/feedback'), 2000);
      } catch (error) {
        console.error("Error deleting feedback:", error);
        setToastMessage('Failed to delete feedback.');
        setShowToast(true);
      }
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!feedback) return <div className="text-center py-8 text-red-500">Feedback not found.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Feedback Detail</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <p className="text-sm text-gray-500">From: {feedback.userEmail}</p>
        <p className="text-sm text-gray-500 mb-4">Received: {feedback.createdAt?.toDate().toLocaleString()}</p>
        <p className="text-gray-800 whitespace-pre-wrap">{feedback.message}</p>
      </div>

      {feedback.status === 'Replied' ? (
        <div className="bg-blue-100 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2 text-blue-800">You have already replied to this feedback.</h3>
          <p className="text-sm text-gray-500 mb-4">Sent: {feedback.repliedAt?.toDate().toLocaleString()}</p>
          <p className="text-gray-800 whitespace-pre-wrap">{feedback.reply}</p>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Your Reply</h3>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="w-full p-2 border rounded-md h-32"
            placeholder="Type your core reply here..."
          />
          <div className="mt-4 flex items-center gap-4">
            <button
              onClick={() => setShowPreview(true)}
              disabled={!replyText.trim()}
              className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Preview & Send
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete Feedback
            </button>
          </div>
        </div>
      )}

      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Reply Preview</h2>
            <div className="border p-4 rounded-md bg-gray-50 whitespace-pre-wrap mb-6">
              {getFullReply()}
            </div>
            <div className="flex justify-end gap-4">
              <button onClick={() => setShowPreview(false)} className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
                Cancel
              </button>
              <button onClick={handleSendReply} disabled={sending} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                {sending ? 'Sending...' : 'Confirm & Send'}
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastNotification message={toastMessage} show={showToast} onClose={() => setShowToast(false)} />
    </div>
  );
};

export default FeedbackDetail;
