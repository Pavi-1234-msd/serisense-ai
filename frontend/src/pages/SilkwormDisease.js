import React, { useState, useEffect } from 'react';
import { diagnoseSilkwormDisease, getSilkwormSymptoms } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { getTranslatedSilkwormDisease } from '../i18n/diseaseContent';
import './SilkwormDisease.css';

function SilkwormDisease() {
  const { t, lang } = useLanguage();
  const [symptomList, setSymptomList] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState(null);
  const [error, setError] = useState(null);

  // Fetch symptom list from backend REST API
  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const res = await getSilkwormSymptoms();
        if (res.success && res.symptoms) {
          setSymptomList(res.symptoms);
        }
      } catch (err) {
        console.error("Failed to load symptoms list:", err);
      }
    };
    fetchSymptoms();
  }, []);

  // Toggle symptom selection
  const handleToggleSymptom = (id) => {
    if (selectedSymptoms.includes(id)) {
      setSelectedSymptoms(selectedSymptoms.filter((item) => item !== id));
    } else {
      setSelectedSymptoms([...selectedSymptoms, id]);
    }
  };

  // Run diagnosis via REST API
  const handleDiagnose = async (e) => {
    if (e) e.preventDefault();
    if (selectedSymptoms.length === 0) {
      setError('Please select at least one symptom observed in your silkworms.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await diagnoseSilkwormDisease(selectedSymptoms);
      if (res.success && res.data) {
        const top = res.data.top_match;
        setDiagnosis({
          disease: top.name,
          category: top.type,
          match_percentage: top.match_percentage,
          cause: top.cause,
          treatment: top.treatment,
          prevention: top.prevention,
          silkworm_impact: top.silkworm_impact,
          all_matches: res.data.all_matches
        });
      } else {
        setError(res.message || 'Diagnosis failed');
      }
    } catch (err) {
      setError('Failed to diagnose silkworm disease. Please check backend server.');
    } finally {
      setLoading(false);
    }
  };

  const handleClearAll = () => {
    setSelectedSymptoms([]);
    setDiagnosis(null);
    setError(null);
  };

  const activeDiagnosis = getTranslatedSilkwormDisease(diagnosis, lang) || diagnosis;

  return (
    <div className="silkworm-disease-container">
      {/* Header */}
      <div className="page-header">
        <div className="header-icon">🐛</div>
        <div>
          <h1 className="header-title">{t('silkworm_title') || 'Silkworm Disease Diagnosis'}</h1>
          <p className="header-subtitle">{t('silkworm_subtitle') || 'Symptom-based preliminary expert diagnosis'}</p>
        </div>
        <div className="header-badge">
          <span className="badge-chip purple">{t('major_pathogens') || 'Symptom Match Engine'}</span>
        </div>
      </div>

      <div className="disease-grid">
        {/* Left Column: Symptom Checkbox Grid */}
        <div className="symptoms-card">
          <div className="symptoms-header">
            <div>
              <h3 className="card-title">{t('select_symptoms') || 'Select Observed Symptoms'}</h3>
              <p className="card-desc">{t('check_all_signs') || 'Check all physical or behavioral signs seen on larvae'}</p>
            </div>
            <button type="button" className="btn-clear" onClick={handleClearAll}>
              {t('clear_all') || 'Clear All'}
            </button>
          </div>

          {/* Checkboxes List */}
          <div className="symptoms-list">
            {symptomList.map((sym) => {
              const isChecked = selectedSymptoms.includes(sym.id);
              return (
                <div
                  key={sym.id}
                  className={`symptom-item ${isChecked ? 'selected' : ''}`}
                  onClick={() => handleToggleSymptom(sym.id)}
                >
                  <input
                    type="checkbox"
                    id={sym.id}
                    checked={isChecked}
                    onChange={() => {}}
                    className="symptom-checkbox"
                  />
                  <label htmlFor={sym.id} className="symptom-label">
                    {sym.label}
                  </label>
                </div>
              );
            })}
          </div>

          {error && <div className="error-alert">⚠️ {error}</div>}

          <button
            type="button"
            className="btn-submit purple-btn"
            onClick={handleDiagnose}
            disabled={loading || selectedSymptoms.length === 0}
          >
            {loading ? (
              <span className="spinner"></span>
            ) : (
              `🐛 Diagnose Disease (${selectedSymptoms.length} Selected)`
            )}
          </button>
        </div>

        {/* Right Column: Diagnosis Results */}
        <div className="diagnosis-card">
          {!activeDiagnosis && !loading && (
            <div className="empty-state">
              <div className="empty-icon">🩺</div>
              <h3>Diagnostic Engine Ready</h3>
              <p>Select symptoms from the left panel and click diagnose to run weighted rule-matching against Grasserie, Flacherie, Muscardine, and Pebrine.</p>
            </div>
          )}

          {loading && (
            <div className="loading-state">
              <div className="loading-spinner purple-spin"></div>
              <h3>Evaluating Pathogen Symptom Vectors...</h3>
            </div>
          )}

          {activeDiagnosis && !loading && (
            <div className="diagnosis-report">
              {/* Header Banner */}
              <div className="disease-banner">
                <div className="banner-info">
                  <span className="banner-category">{activeDiagnosis.category}</span>
                  <h2 className="banner-name">{activeDiagnosis.disease}</h2>
                </div>
                <div className="match-pill">
                  <span className="match-num">{activeDiagnosis.match_percentage}%</span>
                  <span className="match-lbl">Match</span>
                </div>
              </div>

              <div className="saved-backend-badge" style={{ margin: '10px 0', padding: '8px 12px', background: '#f3e5f5', border: '1px solid #ce93d8', borderRadius: '8px', color: '#4a148c', fontSize: '0.85rem' }}>
                ✅ Preliminary diagnosis saved to database history!
              </div>

              {/* Cause & Impact */}
              {activeDiagnosis.cause && (
                <div className="diag-block">
                  <h4 className="diag-title">🔬 Pathogen / Cause</h4>
                  <p className="diag-text">{activeDiagnosis.cause}</p>
                </div>
              )}

              {/* Treatment */}
              {activeDiagnosis.treatment && (
                <div className="diag-block treatment">
                  <h4 className="diag-title">💊 Recommended Management / Treatment</h4>
                  <p className="diag-text">{activeDiagnosis.treatment}</p>
                </div>
              )}

              {/* Prevention Rules */}
              {activeDiagnosis.prevention && activeDiagnosis.prevention.length > 0 && (
                <div className="diag-block prevention">
                  <h4 className="diag-title">🛡️ Prevention & Disinfection Rules</h4>
                  <ul className="diag-list">
                    {activeDiagnosis.prevention.map((step, i) => (
                      <li key={i}>✓ {step}</li>
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

export default SilkwormDisease;