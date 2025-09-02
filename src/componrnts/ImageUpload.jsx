// final_project_-frontend/src/App.js

import React, { useState } from 'react';
import axios from 'axios'; // HTTP requests (Node.js backend එකට) යැවීමට
import '../style/ImageClassifier.css';

function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null); // තෝරාගත් image file එක
  const [processedData, setProcessedData] = useState(null); // Python API එකෙන් ලැබෙන ප්‍රතිඵල
  const [loading, setLoading] = useState(false); // Request යන විට loading state එක පෙන්වීමට
  const [error, setError] = useState(null); // Errors පෙන්වීමට

  // File input එක වෙනස් වන විට
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); // තෝරාගත් පළමු file එක save කරගන්න
    setProcessedData(null); // අලුත් file එකක් තෝරන විට කලින් ප්‍රතිඵල clear කරන්න
    setError(null); // error එකක් තිබුණා නම් clear කරන්න
  };

  // Upload බොත්තම click කරන විට
  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select an image file first.');
      return;
    }

    setLoading(true); // Loading state එක true කරන්න
    setError(null); // කලින් තිබූ error clear කරන්න

    const formData = new FormData();
    formData.append('image', selectedFile); // 'image' යනු Node.js backend එක බලාපොරොත්තු වන field name එකයි.

    try {
      // Node.js backend එකේ image processing endpoint එක
      const NODE_JS_BACKEND_URL = 'http://localhost:5001/api/process-image';

      const response = await axios.post(NODE_JS_BACKEND_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // File uploads සඳහා අවශ්‍ය header එක
        },
      });

      setProcessedData(response.data); // ලැබුණු ප්‍රතිඵල state එකේ save කරන්න
      console.log('Processed Data from Backend:', response.data);

    } catch (err) {
      console.error('Error uploading image to backend:', err);
      if (err.response) {
        // Backend එකෙන් error response එකක් ආවොත්
        setError(err.response.data.error || 'Failed to process image through backend.');
      } else if (err.request) {
        // Request එක යැව්වා, නමුත් response එකක් ලැබුණේ නැහැ (Backend එක run වෙන්නේ නැතිව ඇති)
        setError('No response from Node.js backend. Make sure it is running.');
      } else {
        // වෙනත් error එකක්
        setError('An unexpected error occurred during upload.');
      }
    } finally {
      setLoading(false); // Loading state එක false කරන්න
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Image Processor Frontend</h1>

        <div className="input-section">
          <input type="file" onChange={handleFileChange} accept="image/*" />
          <button onClick={handleUpload} disabled={!selectedFile || loading}>
            {loading ? 'Processing...' : 'Process Image'}
          </button>
        </div>

        {error && <p className="error-message" style={{ color: 'red' }}>Error: {error}</p>}

        {selectedFile && (
          <div className="image-preview">
            <h3>Selected Image:</h3>
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Selected Preview"
              style={{ maxWidth: '300px', maxHeight: '300px', border: '1px solid #ccc', margin: '10px 0' }}
            />
            <p>File Name: {selectedFile.name}</p>
            <p>File Size: {(selectedFile.size / 1024).toFixed(2)} KB</p>
          </div>
        )}

        {processedData && (
          <div className="results-section">
            <h2>Processing Result:</h2>
            <pre style={{ textAlign: 'left', background: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
              {JSON.stringify(processedData, null, 2)}
            </pre>
            {/* මෙතනට ඔබගේ model එකෙන් ලැබෙන සැබෑ ප්‍රතිඵල Display කිරීමට logic එකක් එකතු කරන්න පුළුවන් */}
            {processedData.message && <p>Status: {processedData.message}</p>}
            {processedData.width && <p>Detected Width: {processedData.width}px</p>}
            {processedData.height && <p>Detected Height: {processedData.height}px</p>}
            {/* ඔබට අවශ්‍ය පරිදි ප්‍රතිඵල දර්ශනය කරන්න */}
          </div>
        )}
      </header>
    </div>
  );
}

export default ImageUpload;