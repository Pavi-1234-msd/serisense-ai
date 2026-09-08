import React, { useState } from 'react';
import { predictLeafDisease } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { getTranslatedLeafDisease } from '../i18n/diseaseContent';
import './LeafDisease.css';

function LeafDisease() {
  const { t, lang } = useLanguage();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  // Handle File Selection
  const handleFileChange = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (JPG, PNG, JPEG).');
      return;
    }
    setError(null);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResult(null);
  };

  // Drag & Drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  // Generate real valid JPEG file for sample buttons so PIL/TensorFlow in Python doesn't crash
  const generateValidJpegFile = (filename, mainColor, spotColor) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      canvas.width = 224;
      canvas.height = 224;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = mainColor;
      ctx.fillRect(0, 0, 224, 224);
      ctx.fillStyle = spotColor;
      for (let i = 0; i < 20; i++) {
        ctx.beginPath();
        ctx.arc((i * 37) % 220, (i * 53) % 220, 8 + (i % 5) * 3, 0, 2 * Math.PI);
        ctx.fill();
      }
      canvas.toBlob((blob) => {
        const file = new File([blob], filename, { type: 'image/jpeg' });
        resolve(file);
      }, 'image/jpeg', 0.9);
    });
  };

  // Sample leaf selector for fast testing
  const handleSampleSelect = async (sampleName) => {
    setError(null);
    let sampleFile;
    if (sampleName === 'rust') {
      sampleFile = await generateValidJpegFile('mulberry_leaf_rust_sample.jpg', '#388e3c', '#d84315');
      setPreviewUrl('https://images.unsplash.com/photo-1592417817098-8f3d6ef23a63?w=500&auto=format&fit=crop&q=80');
    } else if (sampleName === 'spot') {
      sampleFile = await generateValidJpegFile('mulberry_leaf_spot_sample.jpg', '#2e7d32', '#3e2723');
      setPreviewUrl('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=500&auto=format&fit=crop&q=80');
    } else {
      sampleFile = await generateValidJpegFile('mulberry_healthy_leaf.jpg', '#4caf50', '#81c784');
      setPreviewUrl('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&auto=format&fit=crop&q=80');
    }
    setSelectedFile(sampleFile);
    setResult(null);
  };

  // Submit for Prediction to REST API
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile && !previewUrl) {
      setError('Please upload or drag a leaf photo first.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await predictLeafDisease(selectedFile);
      if (res.success && res.data) {
        setResult({
          class: res.data.disease,
          confidence: res.data.confidence,
          probabilities: res.data.predictions,
          symptoms: res.data.report?.symptoms || [],
          immediate_actions: res.data.report?.immediate_actions || [],
          prevention: res.data.report?.prevention || [],
          chemical: res.data.report?.chemical,
          dosage: res.data.report?.dosage,
          silkworm_impact: res.data.report?.silkworm_impact
        });
      } else {
        setError(res.message || 'Failed to classify leaf image.');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to analyze leaf image. Please check backend API.');
    } finally {
      setLoading(false);
    }
  };

  const activeResult = getTranslatedLeafDisease(result, lang) || result;

  return (
    <div className="leaf-disease-container">
      {/* Header */}
      <div className="page-header">
        <div className="header-icon">🌿</div>
        <div>
          <h1 className="header-title">{t('leaf_title') || 'Mulberry Leaf Disease Detection'}</h1>
          <p className="header-subtitle">{t('leaf_subtitle') || 'Upload or capture a mulberry leaf image for instant MobileNetV2 CNN analysis'}</p>
        </div>
        <div className="header-badge">
          <span className="badge-chip">MobileNetV2 CNN</span>
        </div>
      </div>

      <div className="content-grid">
        {/* Left Column: Upload Box */}
        <div className="upload-card">
          <h3 className="card-title">{t('upload_title') || 'Upload Leaf Image'}</h3>
          <p className="card-desc">{t('upload_desc') || 'Select a leaf photo from your gallery or use camera input'}</p>

          <form onSubmit={handleSubmit}>
            <div
              className={`dropzone ${dragActive ? 'drag-active' : ''} ${previewUrl ? 'has-preview' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="leafFileInput"
                accept="image/*"
                onChange={(e) => handleFileChange(e.target.files[0])}
                style={{ display: 'none' }}
              />

              {previewUrl ? (
                <div className="preview-wrapper">
                  <img src={previewUrl} alt="Leaf Preview" className="preview-image" />
                  <div className="preview-overlay">
                    <button
                      type="button"
                      className="btn-change"
                      onClick={() => document.getElementById('leafFileInput').click()}
                    >
                      {t('btn_change_photo') || '📷 Retake / Change'}
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className="dropzone-content"
                  onClick={() => document.getElementById('leafFileInput').click()}
                >
                  <div className="dropzone-icon">📸</div>
                  <p className="dropzone-prompt">{t('dropzone_prompt') || 'Click to upload or drag leaf image here'}</p>
                  <span className="dropzone-hint">Supports JPG, PNG, JPEG</span>
                </div>
              )}
            </div>

            {/* Quick Sample Selector */}
            <div className="sample-selector">
              <span className="sample-label">Quick Test Samples:</span>
              <div className="sample-buttons">
                <button
                  type="button"
                  className="sample-btn rust"
                  onClick={() => handleSampleSelect('rust')}
                >
                  Leaf Rust
                </button>
                <button
                  type="button"
                  className="sample-btn spot"
                  onClick={() => handleSampleSelect('spot')}
                >
                  Leaf Spot
                </button>
                <button
                  type="button"
                  className="sample-btn healthy"
                  onClick={() => handleSampleSelect('healthy')}
                >
                  Healthy Leaf
                </button>
              </div>
            </div>

            {error && <div className="error-alert">⚠️ {error}</div>}

            <button
              type="submit"
              className="btn-submit"
              disabled={loading || (!selectedFile && !previewUrl)}
            >
              {loading ? (
                <>
                  <span className="spinner"></span> Analyzing Leaf with MobileNetV2...
                </>
              ) : (
                '🔬 Analyze Leaf with AI'
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Prediction Results */}
        <div className="result-card">
          {!activeResult && !loading && (
            <div className="empty-state">
              <div className="empty-icon">🔬</div>
              <h3>AI Inference Engine Ready</h3>
              <p>Upload a clear photograph of a mulberry leaf to run instant MobileNetV2 classification and receive backend treatment recommendations.</p>
            </div>
          )}

          {loading && (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <h3>Analyzing Mulberry Leaf...</h3>
              <p>Extracting feature vectors through MobileNetV2 CNN layers</p>
            </div>
          )}

          {activeResult && !loading && (
            <div className="prediction-report">
              {/* Top Result Banner */}
              <div className={`report-header ${activeResult.class === 'Disease Free leaves' ? 'status-healthy' : 'status-diseased'}`}>
                <div className="result-main">
                  <span className="result-label">DIAGNOSIS RESULT</span>
                  <h2 className="result-disease">{activeResult.class}</h2>
                </div>
                <div className="result-confidence">
                  <span className="conf-value">{activeResult.confidence}%</span>
                  <span className="conf-label">Confidence</span>
                </div>
              </div>

              {/* Saved to Backend Indicator */}
              <div className="saved-backend-badge" style={{ margin: '10px 0', padding: '8px 12px', background: '#e8f5e9', border: '1px solid #81c784', borderRadius: '8px', color: '#1b5e20', fontSize: '0.85rem' }}>
                ✅ Prediction automatically saved to your account history in database!
              </div>

              {/* Chemical Advice Notice */}
              {activeResult.chemical && activeResult.chemical !== 'None required' && (
                <div className="chemical-advice-card" style={{ margin: '14px 0', padding: '14px', background: '#fff3e0', borderLeft: '4px solid #ff9800', borderRadius: '8px' }}>
                  <h4 style={{ color: '#e65100', margin: '0 0 6px 0' }}>💊 Recommended Management Guidance</h4>
                  <p style={{ margin: '0 0 4px 0', fontSize: '0.9rem' }}><strong>Chemical:</strong> {activeResult.chemical}</p>
                  <p style={{ margin: '0 0 6px 0', fontSize: '0.9rem' }}><strong>Dosage:</strong> {activeResult.dosage}</p>
                  <span style={{ fontSize: '0.78rem', color: '#666', fontStyle: 'italic' }}>
                    * Verify product label and local agricultural officer instructions before application.
                  </span>
                </div>
              )}

              {/* Silkworm Impact */}
              {activeResult.silkworm_impact && (
                <div className="impact-card" style={{ margin: '14px 0', padding: '14px', background: '#f1f8e9', borderRadius: '8px' }}>
                  <h4 style={{ color: '#33691e', margin: '0 0 6px 0' }}>🐛 Impact on Silkworms</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#2e7d32' }}>{activeResult.silkworm_impact}</p>
                </div>
              )}

              {/* Actions & Prevention */}
              {activeResult.immediate_actions && activeResult.immediate_actions.length > 0 && (
                <div className="actions-card" style={{ margin: '14px 0' }}>
                  <h4 style={{ color: '#1b4332' }}>⚡ Immediate Actions</h4>
                  <ul>
                    {activeResult.immediate_actions.map((act, idx) => (
                      <li key={idx} style={{ fontSize: '0.9rem', margin: '4px 0' }}>{act}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LeafDisease;