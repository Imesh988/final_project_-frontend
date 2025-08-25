    import React, { useState } from 'react';
    import '../style/ImageClassifier.css'; 

    function ImageProcessor() {
      const [selectedFile, setSelectedFile] = useState(null);
      const [preview, setPreview] = useState(null);
      // processedImage වෙනුවට result කියලා state එකක් හදමු
      const [result, setResult] = useState(null); 
      const [isLoading, setIsLoading] = useState(false);
      const [error, setError] = useState('');

      const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setSelectedFile(file);
          setPreview(URL.createObjectURL(file));
          setResult(null); // Reset result
          setError('');
        }
      };

      const handleUpload = async () => {
        if (!selectedFile) {
          setError('Please select an image first.');
          return;
        }

        setIsLoading(true);
        setError('');
        setResult(null);

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
          // ඔබේ server එකේ IP address එක මෙතනට දාන්න
          const response = await fetch('http://10.63.210.207:5000/predict', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Prediction failed on the server.');
          }

          // දැන් එන්නේ image blob එකක් නෙමෙයි, JSON එකක්
          const data = await response.json();
          setResult(data); // { prediction: 'Damaged', confidence: '95.43%' } වගේ data එකක් save වෙනවා

        } catch (err) {
          console.error(err);
          setError(err.message || 'Failed to get a prediction. Please try again.');
        } finally {
          setIsLoading(false);
        }
      };

      return (
        <div className="image-processor-container">
          <h1>Suspension Fault Classifier</h1>
          <p>Upload an image to classify its condition</p>
          
          <div className="controls">
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={isLoading || !selectedFile}>
              {isLoading ? 'Classifying...' : 'Classify Image'}
            </button>
          </div>

          {error && <p className="error">{error}</p>}

          <div className="display-area">
            {preview && (
              <div className="image-box">
                <h2>Original Image</h2>
                <img src={preview} alt="Selected preview" />
              </div>
            )}
            
            {/* ප්‍රතිඵලය පෙන්නන කොටස වෙනස් කිරීම */}
            {result && (
              <div className="result-box">
                <h2>Classification Result</h2>
                <p className="prediction">Prediction: <span>{result.prediction}</span></p>
                <p className="confidence">Confidence: <span>{result.confidence}</span></p>
              </div>
            )}
          </div>
        </div>
      );
    }

    export default ImageProcessor;