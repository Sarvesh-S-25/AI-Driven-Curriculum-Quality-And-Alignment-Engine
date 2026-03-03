import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(''); // Tracks success/error messages
  const [isLoading, setIsLoading] = useState(false); // Tracks the loading state

  // Handle Drag Events
  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      setUploadStatus(''); // Reset status on new file
      e.dataTransfer.clearData();
    }
  };

  // Handle regular Click & Select
  const onFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setUploadStatus(''); // Reset status on new file
    }
  };

  // The function that sends the file to the Python Backend
  const handleUpload = async () => {
    if (!file) return;

    setIsLoading(true);
    setUploadStatus('');

    // FormData is required for sending files via HTTP POST
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Sending the request to our FastAPI server
      const response = await axios.post('http://localhost:8000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("Server response:", response.data);
      setUploadStatus(`✅ Success! Backend received: ${response.data.filename} (${response.data.size_kb} KB)`);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadStatus('❌ Error uploading file. Ensure your Python backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-6">
      <div 
        className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
        }`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => document.getElementById('file-upload').click()}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg className={`w-12 h-12 mb-4 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
          </svg>
          <p className="mb-2 text-sm text-gray-500"><span className="font-semibold text-blue-600">Click to upload</span> or drag and drop</p>
          <p className="text-xs text-gray-500">PDF or DOCX (Max 10MB)</p>
        </div>
        <input id="file-upload" type="file" className="hidden" accept=".pdf,.docx" onChange={onFileChange} />
      </div>

      {/* File Details & Upload Button */}
      {file && (
        <div className="mt-6 p-4 bg-white border border-gray-200 rounded-lg shadow-sm animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <div>
                <p className="text-sm font-medium text-gray-900 truncate max-w-xs">{file.name}</p>
                <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <button 
              onClick={handleUpload}
              disabled={isLoading}
              className={`px-5 py-2.5 text-sm font-medium text-white rounded-lg transition-colors focus:ring-4 focus:ring-blue-300 ${
                isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-slate-900 hover:bg-blue-600'
              }`}
            >
              {isLoading ? 'Analyzing...' : 'Analyze Syllabus'}
            </button>
          </div>
          
          {/* Status Message Display */}
          {uploadStatus && (
            <div className={`mt-4 p-3 rounded text-sm ${uploadStatus.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
              {uploadStatus}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;