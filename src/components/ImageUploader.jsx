import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig';
import imageCompression from 'browser-image-compression';

const ImageUploader = ({ onUploadSuccess, folderPath = 'images/' }) => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false); // New state for success message

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
      setUploadSuccess(false); // Reset success message on new file selection
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first.');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const options = {
        maxSizeMB: 1, // (max file size in MB)
        maxWidthOrHeight: 1920, // (max width or height in pixels)
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);

      const storageRef = ref(storage, folderPath + compressedFile.name);
      const uploadTask = uploadBytesResumable(storageRef, compressedFile);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (err) => {
          setError('Upload failed: ' + err.message);
          setIsUploading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('ImageUploader: Download URL obtained:', downloadURL);
            onUploadSuccess(downloadURL);
            setIsUploading(false);
            setFile(null); // Clear file input after successful upload
            setUploadProgress(0);
            setUploadSuccess(true); // Set success state
            setTimeout(() => setUploadSuccess(false), 3000); // Hide success message after 3 seconds
          });
        }
      );
    } catch (err) {
      console.error("Image compression error:", err);
      setError('Image processing failed: ' + err.message);
      setIsUploading(false);
    }
  };

  return (
    <div className="mb-4 p-4 border rounded-md bg-gray-50">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Image Upload:
      </label>
      <input
        type="file"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />
      {file && <p className="text-sm text-gray-600 mt-2">Selected file: {file.name}</p>}
      <button
        onClick={handleUpload}
        disabled={!file || isUploading}
        className={`mt-3 py-2 px-4 rounded-md text-white font-semibold ${!file || isUploading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'}`}
      >
        {isUploading ? `Uploading (${uploadProgress.toFixed(0)}%)` : 'Upload Image'}
      </button>
      {uploadSuccess && <p className="text-green-600 text-sm mt-2">Upload successful!</p>}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {isUploading && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
