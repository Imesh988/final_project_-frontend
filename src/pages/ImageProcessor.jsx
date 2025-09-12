import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../style/ImageClassifier.css';

function ImageProcessor() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setError('');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
        setResult(null);
        setError('');
      } else {
        setError('Please select an image file.');
      }
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
      const response = await fetch('http://10.63.210.207:5000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Prediction failed on the server.');
      }

      const data = await response.json();
      setResult(data);

    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to get a prediction. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 bg-light py-5">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          
          {/* Header with Animation */}
          <div className="text-center mb-5 animate__animated animate__fadeInDown">
            <h1 className="display-4 text-primary fw-bold mb-3">
              <i className="bi bi-camera me-3"></i>
              Suspension Fault Classifier
            </h1>
            <p className="lead text-muted">Upload an image to analyze and classify suspension system condition</p>
            <div className="border-bottom border-primary mx-auto" style={{width: '100px', paddingTop: '10px'}}></div>
          </div>

          {/* Upload Section */}
          <div className="card shadow-lg border-0 mb-5 animate__animated animate__fadeInUp">
            <div className="card-body p-5">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <h3 className="card-title mb-4">Upload Image</h3>
                  <p className="text-muted mb-4">
                    Select or drag an image of a suspension system to analyze its condition
                  </p>
                  
                  <div 
                    className={`drop-zone p-4 text-center border-2 rounded-3 mb-4 ${dragOver ? 'border-primary bg-light' : 'border-dashed'} ${preview ? 'border-success' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    style={{cursor: 'pointer', borderStyle: dragOver ? 'solid' : 'dashed'}}
                    onClick={() => document.getElementById('fileInput').click()}
                  >
                    <input
                      id="fileInput"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="d-none"
                    />
                    <div className="mb-3">
                      <i className={`bi ${preview ? 'bi-check-circle-fill text-success' : 'bi-cloud-upload'} display-4`}></i>
                    </div>
                    <p className="mb-0">
                      {preview ? 'Image selected' : (dragOver ? 'Drop image here' : 'Click or drag image to upload')}
                    </p>
                    {selectedFile && (
                      <small className="text-muted d-block mt-2">{selectedFile.name}</small>
                    )}
                  </div>

                  <button 
                    className={`btn btn-primary btn-lg w-100 ${isLoading ? 'disabled' : ''}`}
                    onClick={handleUpload}
                    disabled={isLoading || !selectedFile}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-gear-fill me-2"></i>
                        Analyze Image
                      </>
                    )}
                  </button>
                </div>

                <div className="col-md-6 text-center">
                  {preview ? (
                    <div className="image-preview-container">
                      <img 
                        src={preview} 
                        alt="Selected preview" 
                        className="img-fluid rounded shadow-sm"
                        style={{maxHeight: '250px'}}
                      />
                    </div>
                  ) : (
                    <div className="text-muted py-5">
                      <i className="bi bi-image display-1 opacity-25"></i>
                      <p className="mt-3">No image selected</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="alert alert-danger alert-dismissible fade show animate__animated animate__shakeX" role="alert">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
              <button type="button" className="btn-close" onClick={() => setError('')}></button>
            </div>
          )}

          {/* Results Section */}
          {result && (
            <div className="card border-0 shadow-lg mt-4 animate__animated animate__fadeInUp">
              <div className="card-header bg-primary text-white py-3">
                <h4 className="mb-0"><i className="bi bi-graph-up me-2"></i>Analysis Results</h4>
              </div>
              <div className="card-body p-4">
                <div className="row">
                  <div className="col-md-6">
                    <div className="d-flex align-items-center justify-content-center h-100">
                      <div className={`status-indicator ${result.prediction === 'Damaged' ? 'danger' : 'success'} rounded-circle p-4 mb-3`}>
                        <i className={`bi ${result.prediction === 'Damaged' ? 'bi-exclamation-triangle' : 'bi-check-circle'} display-4`}></i>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="results-detail">
                      <h5 className="border-bottom pb-2">Classification Details</h5>
                      <div className="mb-3">
                        <span className="fw-bold">Status: </span>
                        <span className={`badge ${result.prediction === 'Damaged' ? 'bg-danger' : 'bg-success'} ms-2`}>
                          {result.prediction}
                        </span>
                      </div>
                      <div className="mb-3">
                        <span className="fw-bold">Confidence Level: </span>
                        <span className="ms-2">{result.confidence}</span>
                      </div>
                      <div className="progress mb-4" style={{height: '20px'}}>
                        <div 
                          className={`progress-bar ${result.prediction === 'Damaged' ? 'bg-danger' : 'bg-success'}`}
                          role="progressbar"
                          style={{width: result.confidence}}
                          aria-valuenow={parseInt(result.confidence)}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          {result.confidence}
                        </div>
                      </div>
                      
                      {result.prediction === 'Damaged' ? (
                        <div className="alert alert-warning">
                          <i className="bi bi-info-circle me-2"></i>
                          This suspension system appears to need inspection by a professional.
                        </div>
                      ) : (
                        <div className="alert alert-success">
                          <i className="bi bi-check-circle me-2"></i>
                          This suspension system appears to be in good condition.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Features Section */}
          <div className="row mt-5 text-center">
            <div className="col-md-4 mb-4 animate__animated animate__fadeInUp">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <i className="bi bi-lightning-charge-fill text-warning display-6 mb-3"></i>
                  <h5>Fast Analysis</h5>
                  <p className="text-muted">Get instant results with our advanced AI classification system</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4 animate__animated animate__fadeInUp animate__delay-1s">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <i className="bi bi-shield-check-fill text-success display-6 mb-3"></i>
                  <h5>Accurate Results</h5>
                  <p className="text-muted">High precision detection of suspension system issues</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4 animate__animated animate__fadeInUp animate__delay-2s">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <i className="bi bi-graph-up-arrow-fill text-info display-6 mb-3"></i>
                  <h5>Confidence Metrics</h5>
                  <p className="text-muted">Detailed confidence scores for every analysis</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ImageProcessor;    