import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { predictLeafDisease } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { getLeafDiseaseAdvisory, getConfidenceAssessment } from '../services/leafAdvisories';
import { validateIsLeafImage } from '../utils/imageValidator';
import './LeafDisease.css';

function LeafDisease() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [invalidImageInfo, setInvalidImageInfo] = useState(null);

  // Handle File Selection with Immediate Foliar Validation
  const handleFileChange = async (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (JPG, PNG, JPEG).');
      return;
    }
    setError(null);
    setResult(null);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));

    // Immediate validation check
    const valCheck = await validateIsLeafImage(file);
    if (!valCheck.isLeaf) {
      setInvalidImageInfo(valCheck);
    } else {
      setInvalidImageInfo(null);
    }
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
    setInvalidImageInfo(null);
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
    setInvalidImageInfo(null);

    try {
      // Validate image before sending to backend
      if (selectedFile) {
        const valCheck = await validateIsLeafImage(selectedFile);
        if (!valCheck.isLeaf) {
          setInvalidImageInfo(valCheck);
          setLoading(false);
          return;
        }
      }

      const res = await predictLeafDisease(selectedFile);
      if (res.success && res.data) {
        setResult({
          class: res.data.disease,
          confidence: res.data.confidence,
          probabilities: res.data.predictions,
          backendReport: res.data.report || {}
        });
      } else {
        setError(res.message || 'Failed to classify leaf image.');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to analyze leaf image. Please verify backend API connectivity.');
    } finally {
      setLoading(false);
    }
  };

  // Build the structured advisory and confidence assessment from backend prediction
  const advisory = result ? getLeafDiseaseAdvisory(result.class, lang) : null;
  const confidenceAssessment = result ? getConfidenceAssessment(result.confidence, lang) : null;

  // Concern level badge helper
  const getConcernBadge = (level) => {
    if (level === 'low_concern') {
      return {
        text: t('advisory_low_concern') || 'Low Concern · Healthy Foliage',
        className: 'badge-low-concern'
      };
    } else if (level === 'moderate_concern') {
      return {
        text: t('advisory_moderate_concern') || 'Moderate Concern · Early Intervention',
        className: 'badge-moderate-concern'
      };
    } else {
      return {
        text: t('advisory_requires_attention') || 'Requires Attention · Urgent Field Action',
        className: 'badge-attention'
      };
    }
  };

  // WhatsApp Share Function for Mulberry Leaf Diagnosis
  const handleWhatsAppShare = () => {
    if (!result || !advisory) return;

    const chemicalInfo = result.backendReport?.chemical_control
      ? (typeof result.backendReport.chemical_control === 'object'
          ? `${result.backendReport.chemical_control.name || 'Recommended fungicide'} (${result.backendReport.chemical_control.dosage || 'Standard dosage'})`
          : result.backendReport.chemical_control)
      : (advisory.management?.[0] || 'Observe sanitary field measures');

    const message =
`🌿 *SeriSense AI — Mulberry Leaf Diagnosis Report*
━━━━━━━━━━━━━━━━━━━━━━
📋 *Assessment:* ${advisory.title || result.class}
📊 *Confidence:* ${result.confidence}%
⚠️ *Advisory Level:* ${getConcernBadge(advisory.severityLevel).text}
━━━━━━━━━━━━━━━━━━━━━━
🔍 *Observation:*
${advisory.shortExplanation || 'Foliar pathology analysis'}

🐛 *Silkworm Feeding Safety:*
${advisory.silkwormSafety === 'safe' ? '✅ SAFE TO FEED' : '🛑 UNSAFE FOR FEEDING — High risk to silkworm health'}
${result.backendReport?.silkworm_impact ? `(${result.backendReport.silkworm_impact})` : ''}

📌 *Immediate Field Actions:*
${Array.isArray(advisory.immediateActions)
  ? advisory.immediateActions.slice(0, 3).map((a, i) => `${i + 1}. ${a}`).join('\n')
  : 'See app for complete protocol'}

🌱 *Recommended Treatment:*
${chemicalInfo}

🛡️ *What NOT to Do:*
${Array.isArray(advisory.avoid)
  ? advisory.avoid.slice(0, 2).map((av, i) => `✕ ${av}`).join('\n')
  : 'Follow sericultural SOP'}
━━━━━━━━━━━━━━━━━━━━━━
🤖 _Generated by SeriSense AI_
_AI-Powered Sericulture Advisory_
_Sri Krishna College of Technology_`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="leaf-disease-container">
      {/* Header */}
      <div className="page-header">
        <div className="header-icon">🌿</div>
        <div>
          <h1 className="header-title">{t('leaf_title') || 'Mulberry Leaf Disease Detection'}</h1>
          <p className="header-subtitle">{t('leaf_subtitle') || 'AI-assisted crop protection and decision-support system for sericulture farmers'}</p>
        </div>
        <div className="header-badge">
          <span className="badge-chip">MobileNetV2 CNN</span>
        </div>
      </div>

      <div className="content-grid">
        {/* Left Column: Upload Box */}
        <div className="upload-card">
          <h3 className="card-title">{t('upload_title') || '1. Upload Leaf Photo'}</h3>
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
              <span className="sample-label">{t('sample_label') || 'Quick Test Samples:'}</span>
              <div className="sample-buttons">
                <button
                  type="button"
                  className="sample-btn rust"
                  onClick={() => handleSampleSelect('rust')}
                >
                  {t('sample_rust') || '🍂 Leaf Rust'}
                </button>
                <button
                  type="button"
                  className="sample-btn spot"
                  onClick={() => handleSampleSelect('spot')}
                >
                  {t('sample_spot') || '🟤 Leaf Spot'}
                </button>
                <button
                  type="button"
                  className="sample-btn healthy"
                  onClick={() => handleSampleSelect('healthy')}
                >
                  {t('sample_healthy') || '🍃 Healthy Leaf'}
                </button>
              </div>
            </div>

            {error && <div className="error-alert">⚠️ {error}</div>}

            {invalidImageInfo && (
              <div className="error-alert" style={{ background: '#fff3cd', color: '#856404', borderColor: '#ffeeba' }}>
                ⚠️ <strong>Non-Leaf Image:</strong> {invalidImageInfo.reason}
              </div>
            )}

            <button
              type="submit"
              className="btn-submit"
              disabled={loading || (!selectedFile && !previewUrl) || Boolean(invalidImageInfo)}
              style={invalidImageInfo ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
            >
              {loading ? (
                <>
                  <span className="spinner"></span> {t('analyzing_leaf') || 'Analyzing Leaf with AI...'}
                </>
              ) : invalidImageInfo ? (
                '🚫 Please Upload a Valid Mulberry Leaf'
              ) : (
                t('btn_run_ai') || '🔬 Analyze Leaf with AI'
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Prediction Results & Decision Support */}
        <div className="result-card">
          {/* Invalid Image Fallback */}
          {invalidImageInfo && !loading && (
            <div className="invalid-image-card">
              <div className="invalid-icon">⚠️</div>
              <h3 className="invalid-title">{t('invalid_image_title') || 'Not a Mulberry Leaf / Invalid Image'}</h3>
              <p className="invalid-desc">{invalidImageInfo.reason || (t('invalid_image_desc') || 'The uploaded photo does not appear to contain a clear mulberry leaf.')}</p>
              <div className="invalid-tips">
                <h4>{t('invalid_image_tips_header') || '💡 Tips for Accurate AI Diagnosis:'}</h4>
                <ul>
                  <li>✓ {t('invalid_image_tip_1') || 'Ensure the photo shows a clear, close-up mulberry leaf.'}</li>
                  <li>✓ {t('invalid_image_tip_2') || 'Avoid uploading screenshots, charts, documents, or unrelated objects.'}</li>
                  <li>✓ {t('invalid_image_tip_3') || 'Take photos under bright, natural daylight with leaf filling the frame.'}</li>
                </ul>
              </div>
              <button
                type="button"
                className="btn-retry"
                onClick={() => document.getElementById('leafFileInput').click()}
              >
                📷 {t('btn_change_photo') || 'Upload Another Photo'}
              </button>
            </div>
          )}

          {/* Empty State */}
          {!result && !loading && !invalidImageInfo && (
            <div className="empty-state">
              <div className="empty-icon">🔬</div>
              <h3>{t('no_prediction') || 'AI Decision Support Ready'}</h3>
              <p>{t('no_prediction_desc') || 'Upload a clear photograph of a mulberry leaf to run instant classification and receive structured field recommendations.'}</p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <h3>{t('analyzing_leaf') || 'Analyzing Mulberry Leaf...'}</h3>
              <p>{t('analyzing_sub') || 'Extracting deep feature vectors through MobileNetV2 CNN layers'}</p>
            </div>
          )}

          {/* Structured Agricultural Decision-Support Report */}
          {result && advisory && !loading && (
            <div className="prediction-report decision-support-report">
              {/* Top Banner: Preliminary Notice */}
              <div className="assessment-preliminary-header">
                <span className="badge-assessment-tag">
                  {t('ai_leaf_assessment_badge') || 'AI LEAF ASSESSMENT'}
                </span>
                <span className="text-preliminary-disclaimer">
                  ℹ️ {t('preliminary_assessment_notice') || 'AI-based preliminary assessment · Not a certified laboratory diagnosis'}
                </span>
              </div>

              {/* Disease Name & Confidence Card */}
              <div className={`report-header ${advisory.severityLevel === 'low_concern' ? 'status-healthy' : 'status-diseased'}`}>
                <div className="result-main">
                  <span className="result-label">{advisory.statusHuman}</span>
                  <h2 className="result-disease">{advisory.title}</h2>
                </div>
                <div className="result-confidence">
                  <span className="conf-value">{result.confidence}%</span>
                  <span className="conf-label">{t('confidence') || 'Confidence'}</span>
                </div>
              </div>

              {/* Status & Qualitative Risk Row */}
              <div className="assessment-meta-row">
                <div className="meta-item">
                  <span className="meta-item-label">{t('advisory_concern_label') || 'Advisory Risk Level'}</span>
                  <span className={`meta-concern-badge ${getConcernBadge(advisory.severityLevel).className}`}>
                    {getConcernBadge(advisory.severityLevel).text}
                  </span>
                </div>
                <div className="meta-item">
                  <span className="meta-item-label">{t('confidence') || 'Confidence Level'}</span>
                  <span className={`meta-conf-badge conf-${confidenceAssessment.level}`}>
                    {confidenceAssessment.label}
                  </span>
                </div>
              </div>

              {/* Low Confidence Advisory Alert if confidence < 65% */}
              {confidenceAssessment.isLow && (
                <div className="low-confidence-alert">
                  <span className="alert-icon">⚠️</span>
                  <div className="alert-body">
                    <strong>{confidenceAssessment.label}</strong>
                    <p>{confidenceAssessment.lowAdvice}</p>
                  </div>
                </div>
              )}

              {/* Short Clinical Explanation */}
              <div className="explanation-card">
                <p className="explanation-text">{advisory.shortExplanation}</p>
              </div>

              {/* Section 1: What To Do Now (Prominent Numbered Action Plan) */}
              <div className="advisory-section section-immediate">
                <div className="section-header">
                  <span className="section-icon">⚡</span>
                  <h4>{t('section_what_to_do_now') || 'What to Do Now (Immediate Field Actions)'}</h4>
                </div>
                <ol className="action-steps-list">
                  {advisory.immediateActions.map((action, idx) => (
                    <li key={idx} className="action-step-item">
                      <span className="step-number">{idx + 1}</span>
                      <span className="step-text">{action}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Section 2: Management Protocol */}
              <div className="advisory-section section-management">
                <div className="section-header">
                  <span className="section-icon">🌱</span>
                  <h4>{t('section_management') || 'Recommended Crop & Plot Management'}</h4>
                </div>
                <ul className="guidance-bullet-list">
                  {advisory.management.map((item, idx) => (
                    <li key={idx}>
                      <span className="bullet-dot">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Section 3: What To Avoid */}
              <div className="advisory-section section-avoid">
                <div className="section-header">
                  <span className="section-icon">⚠️</span>
                  <h4>{t('section_what_to_avoid') || 'What NOT to Do (Safety & Best Practices)'}</h4>
                </div>
                <ul className="guidance-bullet-list avoid-list">
                  {advisory.avoid.map((item, idx) => (
                    <li key={idx}>
                      <span className="avoid-x">✕</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Section 4: Crop Monitoring Plan */}
              <div className="advisory-section section-monitoring">
                <div className="section-header">
                  <span className="section-icon">🔍</span>
                  <h4>{t('section_monitoring_plan') || 'Crop Monitoring Plan & Follow-Up'}</h4>
                </div>
                <ul className="guidance-bullet-list">
                  {advisory.monitoring.map((item, idx) => (
                    <li key={idx}>
                      <span className="bullet-dot">🔎</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Section 5: When to Seek Agricultural Expert Help */}
              <div className="advisory-section section-expert">
                <div className="section-header">
                  <span className="section-icon">👨‍🌾</span>
                  <h4>{t('section_when_expert_help') || 'When to Seek Agricultural Expert Help'}</h4>
                </div>
                <p className="expert-text">{advisory.expertHelp}</p>
              </div>

              {/* Section 6: Silkworm Batch Safety Card */}
              <div className={`silkworm-safety-card ${advisory.silkwormSafety === 'safe' ? 'safety-safe' : 'safety-unsafe'}`}>
                <div className="safety-card-header">
                  <span className="safety-icon">{advisory.silkwormSafety === 'safe' ? '✅' : '🛑'}</span>
                  <h4>{t('section_silkworm_safety_title') || 'Silkworm Batch Feeding Safety'}</h4>
                </div>
                <p className="safety-summary">
                  {advisory.silkwormSafety === 'safe' 
                    ? (t('safe_to_feed') || 'Safe to Feed: Healthy leaf foliar profile supports optimal silkworm nutrition.')
                    : (t('unsafe_to_feed') || 'UNSAFE FOR FEEDING: High risk of silkworm nutritional distress, digestive disorder, and cocoon quality loss.')}
                </p>
                {result.backendReport?.silkworm_impact && (
                  <p className="safety-details">{result.backendReport.silkworm_impact}</p>
                )}
              </div>

              {/* Chemical Disclaimer Footer */}
              <div className="chemical-regulatory-disclaimer">
                <span className="disclaimer-icon">📋</span>
                <p>
                  {t('chemical_disclaimer_notice') || 'Agricultural chemicals must follow locally approved sericultural package of practices. Always observe mandatory waiting safety periods before feeding harvested leaves to silkworms.'}
                </p>
              </div>

              {/* WhatsApp Share Button */}
              <div className="whatsapp-share-bar" style={{ margin: '14px 0 10px' }}>
                <button
                  type="button"
                  onClick={handleWhatsAppShare}
                  style={{
                    width: '100%',
                    padding: '12px 18px',
                    borderRadius: '12px',
                    fontWeight: '700',
                    fontSize: '0.98rem',
                    border: 'none',
                    cursor: 'pointer',
                    background: 'linear-gradient(135deg, #25D366, #128C7E)',
                    color: '#ffffff',
                    boxShadow: '0 4px 14px rgba(37, 211, 102, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 18px rgba(37, 211, 102, 0.4)';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(37, 211, 102, 0.3)';
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>📲</span>
                  {t('btn_share_whatsapp') || 'Share Diagnosis Report on WhatsApp'}
                </button>
              </div>

              {/* History Confirmation & Navigation */}
              <div className="history-link-footer">
                <span className="history-saved-indicator">
                  ✅ Saved to Cloud Firestore History
                </span>
                <button
                  type="button"
                  className="btn-history-nav"
                  onClick={() => navigate('/history?tab=leaf')}
                >
                  {t('btn_view_history_log') || '📜 View Scan in History'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LeafDisease;