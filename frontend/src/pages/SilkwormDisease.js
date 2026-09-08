import React, { useState, useEffect } from 'react';
import { 
  diagnoseSilkwormDisease, 
  getSilkwormSymptoms, 
  getSilkwormHistory, 
  getCurrentRisk 
} from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { getTranslatedSilkwormDisease } from '../i18n/diseaseContent';
import './SilkwormDisease.css';

// Structured symptom categorization mapping (using exact existing symptom IDs)
const SYMPTOM_CATEGORIES = [
  {
    id: 'behavior',
    titleKey: 'cat_behavior',
    defaultTitle: 'Larval Behavior & Movement',
    icon: '🐛',
    symptomIds: ['larvae_sluggish', 'stop_feeding', 'worms_climb_walls', 'head_tilted', 'sluggish_moulting']
  },
  {
    id: 'body',
    titleKey: 'cat_body',
    defaultTitle: 'Body Integrity & Appearance',
    icon: '🔍',
    symptomIds: ['body_swollen', 'skin_fragile', 'intersegmental_swelling', 'body_soft', 'dark_pepper_spots', 'uneven_growth']
  },
  {
    id: 'fluid',
    titleKey: 'cat_fluid',
    defaultTitle: 'Fluid Leakage & Digestive Signs',
    icon: '💧',
    symptomIds: ['milky_white_fluid', 'vomiting_fluid', 'bad_smell', 'diarrhea']
  },
  {
    id: 'corpse',
    titleKey: 'cat_bed',
    defaultTitle: 'Rearing Bed & Corpse Appearance',
    icon: '🍂',
    symptomIds: ['blackening_body', 'white_fungal_growth', 'body_hard_chalky', 'stiff_corpse', 'reddish_pink_spots', 'wrinkled_skin', 'high_moult_failure', 'undersized_worms']
  }
];

function SilkwormDisease() {
  const { t, lang } = useLanguage();

  // Raw symptoms list loaded from authoritative backend
  const [symptomList, setSymptomList] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  // Structured Context States
  const [rearingStage, setRearingStage] = useState('Instar 4');
  const [rearingBed, setRearingBed] = useState('');
  const [observedSeverity, setObservedSeverity] = useState('Moderate');
  const [onsetTimeline, setOnsetTimeline] = useState('1–2 days ago');
  const [affectedRatio, setAffectedRatio] = useState('Several worms');
  const [feedingBehavior, setFeedingBehavior] = useState('Reduced');
  const [larvalActivity, setLarvalActivity] = useState('Sluggish');
  
  // Optional Environmental Context
  const [tempInput, setTempInput] = useState('');
  const [humidityInput, setHumidityInput] = useState('');
  const [bedCondition, setBedCondition] = useState('Normal');
  const [ventilation, setVentilation] = useState('Moderate');

  // Execution & Assessment States
  const [loading, setLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState(null);
  const [error, setError] = useState(null);

  // Cross-Module Risk Context & History Intelligence
  const [farmRisk, setFarmRisk] = useState(null);
  const [recentAssessments, setRecentAssessments] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  // Load Symptom Definitions & Historical Intelligence on Mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const symRes = await getSilkwormSymptoms();
        if (symRes.success && symRes.symptoms) {
          setSymptomList(symRes.symptoms);
        }
      } catch (err) {
        console.warn("Could not load backend symptoms list:", err);
      }

      try {
        setHistoryLoading(true);
        const histRes = await getSilkwormHistory();
        if (histRes.success && histRes.history) {
          setRecentAssessments(histRes.history.slice(0, 4));
        }
      } catch (err) {
        console.warn("Could not load silkworm history:", err);
      } finally {
        setHistoryLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Symptom Selection Handler
  const handleToggleSymptom = (id) => {
    setError(null);
    if (selectedSymptoms.includes(id)) {
      setSelectedSymptoms(selectedSymptoms.filter((item) => item !== id));
    } else {
      setSelectedSymptoms([...selectedSymptoms, id]);
    }
  };

  // Run Health Assessment
  const handleRunAssessment = async (e) => {
    if (e) e.preventDefault();

    if (selectedSymptoms.length === 0) {
      setError(t('insufficient_symptoms_error') || 'Please select at least 1 observed symptom to evaluate.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const payload = {
        symptoms: selectedSymptoms,
        stage: rearingStage,
        rearing_bed: rearingBed,
        observed_severity: observedSeverity,
        onset_timeline: onsetTimeline,
        affected_ratio: affectedRatio,
        feeding_behavior: feedingBehavior,
        larval_activity: larvalActivity,
        temperature: tempInput ? parseFloat(tempInput) : null,
        humidity: humidityInput ? parseFloat(humidityInput) : null,
        bed_condition: bedCondition,
        ventilation: ventilation
      };

      const res = await diagnoseSilkwormDisease(payload);

      if (res.success && res.data) {
        const top = res.data.top_match;
        setDiagnosis({
          disease: top.name,
          category: top.type,
          match_percentage: top.match_percentage,
          matched_count: top.matched_count,
          total_symptoms: top.total_symptoms,
          matched_symptoms: top.matched_symptoms || [],
          unmatched_symptoms: top.unmatched_symptoms || [],
          cause: top.cause,
          treatment: top.treatment,
          prevention: top.prevention,
          silkworm_impact: top.silkworm_impact,
          all_matches: res.data.all_matches || [],
          context: res.data.context || payload
        });

        // Query authoritative Farm Risk Context from /api/risk/current
        try {
          const riskRes = await getCurrentRisk();
          if (riskRes && riskRes.success) {
            setFarmRisk(riskRes);
          }
        } catch (riskErr) {
          console.warn("Could not retrieve farm risk context:", riskErr);
        }

        // Refresh recent assessments list
        try {
          const updatedHist = await getSilkwormHistory();
          if (updatedHist.success && updatedHist.history) {
            setRecentAssessments(updatedHist.history.slice(0, 4));
          }
        } catch (histErr) {
          console.warn("History refresh skipped:", histErr);
        }

      } else {
        setError(res.message || 'Assessment could not be completed.');
      }
    } catch (err) {
      console.error("Silkworm assessment error:", err);
      const status = err.response ? err.response.status : null;
      if (status === 401) {
        setError("Authentication session expired. Please log in again.");
      } else if (status === 400) {
        setError(err.response?.data?.message || "Invalid assessment parameters submitted.");
      } else if (status === 500) {
        setError("Server-side evaluation error. Please try again or verify database connectivity.");
      } else {
        setError("Network error connecting to backend service. Please check your internet connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedSymptoms([]);
    setDiagnosis(null);
    setError(null);
  };

  // Lookup helper for human-readable symptom labels
  const getSymptomLabel = (id) => {
    const found = symptomList.find(s => s.id === id);
    return found ? found.label : id.replace(/_/g, ' ');
  };

  const activeDiagnosis = getTranslatedSilkwormDisease(diagnosis, lang) || diagnosis;

  return (
    <div className="silkworm-disease-container">
      {/* Header Banner */}
      <div className="page-header">
        <div className="header-icon">🐛</div>
        <div className="header-main-text">
          <h1 className="header-title">{t('silkworm_title') || 'Silkworm Health Assessment'}</h1>
          <p className="header-subtitle">
            {t('silkworm_subtitle') || 'Evaluate observed rearing-bed symptoms and receive a preliminary, explainable decision-support assessment.'}
          </p>
        </div>
        <div className="header-badge">
          <span className="badge-chip purple">
            {t('silkworm_badge_preliminary') || 'Preliminary Assessment'}
          </span>
        </div>
      </div>

      <div className="assessment-layout-grid">
        {/* Left Column: Structured Assessment Form */}
        <div className="assessment-form-card">
          <form onSubmit={handleRunAssessment}>
            {/* Section 1: Rearing Stage & Bed Context */}
            <div className="form-section">
              <div className="section-title-wrap">
                <span className="sec-number">1</span>
                <div>
                  <h3 className="section-title">{t('sec_rearing_context') || 'Rearing Stage & Bed Context'}</h3>
                  <p className="section-desc">{t('sec_rearing_context_desc') || 'Select the developmental instar and rearing batch parameters.'}</p>
                </div>
              </div>

              <div className="form-row-grid">
                <div className="field-group">
                  <label className="field-label">Developmental Stage *</label>
                  <select 
                    className="field-select" 
                    value={rearingStage} 
                    onChange={(e) => setRearingStage(e.target.value)}
                  >
                    <option value="Egg">Egg / Incubation</option>
                    <option value="Instar 1">Instar 1 (Chawki)</option>
                    <option value="Instar 2">Instar 2 (Chawki)</option>
                    <option value="Instar 3">Instar 3 (Transition)</option>
                    <option value="Instar 4">Instar 4 (Late Age)</option>
                    <option value="Instar 5">Instar 5 (Spinning Age)</option>
                    <option value="Not sure">Not sure</option>
                  </select>
                </div>

                <div className="field-group">
                  <label className="field-label">Rearing Tray / Bed ID</label>
                  <input 
                    type="text" 
                    className="field-input" 
                    placeholder="e.g. Tray 4B or Batch A" 
                    value={rearingBed} 
                    onChange={(e) => setRearingBed(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Observed Signs & Symptoms (Organized by Categories) */}
            <div className="form-section">
              <div className="section-title-wrap">
                <span className="sec-number">2</span>
                <div className="title-with-actions">
                  <div>
                    <h3 className="section-title">{t('sec_observed_symptoms') || 'Observed Signs & Symptoms'}</h3>
                    <p className="section-desc">{t('sec_observed_symptoms_desc') || 'Select physical and behavioral signs visible on rearing beds.'}</p>
                  </div>
                  {selectedSymptoms.length > 0 && (
                    <button type="button" className="btn-clear-link" onClick={handleReset}>
                      {t('btn_clear_assessment') || 'Reset Selection'}
                    </button>
                  )}
                </div>
              </div>

              <div className="symptom-category-blocks">
                {SYMPTOM_CATEGORIES.map((cat) => {
                  const availableInCat = symptomList.filter(s => cat.symptomIds.includes(s.id));
                  if (availableInCat.length === 0) return null;

                  return (
                    <div key={cat.id} className="category-group-box">
                      <div className="category-header">
                        <span className="cat-icon">{cat.icon}</span>
                        <h4 className="cat-title">{t(cat.titleKey) || cat.defaultTitle}</h4>
                      </div>
                      <div className="chips-grid">
                        {availableInCat.map((s) => {
                          const isSelected = selectedSymptoms.includes(s.id);
                          return (
                            <div 
                              key={s.id} 
                              className={`symptom-chip ${isSelected ? 'selected' : ''}`}
                              onClick={() => handleToggleSymptom(s.id)}
                            >
                              <span className="chip-indicator">{isSelected ? '✓' : '+'}</span>
                              <span className="chip-text">{s.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section 3: Onset Timeline & Severity */}
            <div className="form-section">
              <div className="section-title-wrap">
                <span className="sec-number">3</span>
                <div>
                  <h3 className="section-title">{t('sec_severity_timeline') || 'Onset Timeline & Severity'}</h3>
                </div>
              </div>

              <div className="form-row-grid tri-col">
                <div className="field-group">
                  <label className="field-label">When were symptoms noticed?</label>
                  <select 
                    className="field-select" 
                    value={onsetTimeline} 
                    onChange={(e) => setOnsetTimeline(e.target.value)}
                  >
                    <option value="Today">Today (within 24 hrs)</option>
                    <option value="1–2 days ago">1–2 days ago</option>
                    <option value="3–5 days ago">3–5 days ago</option>
                    <option value="More than 5 days ago">More than 5 days ago</option>
                  </select>
                </div>

                <div className="field-group">
                  <label className="field-label">Observed Severity</label>
                  <select 
                    className="field-select" 
                    value={observedSeverity} 
                    onChange={(e) => setObservedSeverity(e.target.value)}
                  >
                    <option value="Mild">Mild (Isolated signs)</option>
                    <option value="Moderate">Moderate (Multiple trays affected)</option>
                    <option value="Severe">Severe (Widespread mortality)</option>
                  </select>
                </div>

                <div className="field-group">
                  <label className="field-label">Affected Worms</label>
                  <select 
                    className="field-select" 
                    value={affectedRatio} 
                    onChange={(e) => setAffectedRatio(e.target.value)}
                  >
                    <option value="Few worms">Few isolated worms (&lt;5%)</option>
                    <option value="Several worms">Several worms (5–15%)</option>
                    <option value="Many worms">Many worms (15–40%)</option>
                    <option value="Widespread">Widespread outbreak (&gt;40%)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 4: Feeding & Larval Activity */}
            <div className="form-section">
              <div className="section-title-wrap">
                <span className="sec-number">4</span>
                <div>
                  <h3 className="section-title">{t('sec_feeding_activity') || 'Feeding & Larval Activity'}</h3>
                </div>
              </div>

              <div className="form-row-grid">
                <div className="field-group">
                  <label className="field-label">Feeding Behavior</label>
                  <select 
                    className="field-select" 
                    value={feedingBehavior} 
                    onChange={(e) => setFeedingBehavior(e.target.value)}
                  >
                    <option value="Normal">Normal Feeding</option>
                    <option value="Reduced">Reduced Leaf Appetite</option>
                    <option value="Stopped">Stopped Feeding Completely</option>
                    <option value="Unsure">Unsure</option>
                  </select>
                </div>

                <div className="field-group">
                  <label className="field-label">Larval Locomotion</label>
                  <select 
                    className="field-select" 
                    value={larvalActivity} 
                    onChange={(e) => setLarvalActivity(e.target.value)}
                  >
                    <option value="Normal">Normal Crawling</option>
                    <option value="Sluggish">Sluggish / Slow Moving</option>
                    <option value="Restless">Restless Rim Crawling</option>
                    <option value="Very Inactive">Limp / Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 5: Optional Environmental Observations */}
            <div className="form-section">
              <div className="section-title-wrap">
                <span className="sec-number">5</span>
                <div>
                  <h3 className="section-title">{t('sec_environmental_obs') || 'Environmental & Bed Observations'} (Optional)</h3>
                </div>
              </div>

              <div className="form-row-grid tri-col">
                <div className="field-group">
                  <label className="field-label">Room Temperature (°C)</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    className="field-input" 
                    placeholder="e.g. 26.5" 
                    value={tempInput} 
                    onChange={(e) => setTempInput(e.target.value)}
                  />
                </div>

                <div className="field-group">
                  <label className="field-label">Room Humidity (%)</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    className="field-input" 
                    placeholder="e.g. 82.0" 
                    value={humidityInput} 
                    onChange={(e) => setHumidityInput(e.target.value)}
                  />
                </div>

                <div className="field-group">
                  <label className="field-label">Rearing Bed Condition</label>
                  <select 
                    className="field-select" 
                    value={bedCondition} 
                    onChange={(e) => setBedCondition(e.target.value)}
                  >
                    <option value="Dry">Dry Bed</option>
                    <option value="Normal">Normal Bed Moisture</option>
                    <option value="Damp">Damp / Excess Leaves</option>
                    <option value="Very Damp">Very Damp / High Litter Moisture</option>
                  </select>
                </div>

                <div className="field-group">
                  <label className="field-label">Ventilation Status</label>
                  <select 
                    className="field-select" 
                    value={ventilation} 
                    onChange={(e) => setVentilation(e.target.value)}
                  >
                    <option value="Good">Good Cross-Ventilation</option>
                    <option value="Moderate">Moderate Airflow</option>
                    <option value="Poor">Poor / Stagnant Air</option>
                    <option value="Unsure">Unsure</option>
                  </select>
                </div>
              </div>
            </div>

            {error && <div className="error-alert">⚠️ {error}</div>}

            {/* Action Submit */}
            <div className="submit-bar">
              <button 
                type="submit" 
                className="btn-submit purple-btn" 
                disabled={loading || selectedSymptoms.length === 0}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span> {t('evaluating_symptoms') || 'Evaluating Observations...'}
                  </>
                ) : (
                  `${t('btn_run_assessment') || '⚡ Run Health Assessment'} (${selectedSymptoms.length} Symptoms Selected)`
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Explainable Decision-Support Assessment Report */}
        <div className="assessment-report-card">
          {!activeDiagnosis && !loading && (
            <div className="empty-state">
              <div className="empty-icon">🩺</div>
              <h3>Silkworm Assessment Engine Ready</h3>
              <p>
                Complete the context fields, select observed signs from the left panel, and run the assessment to receive a structured, explainable health evaluation.
              </p>

              {/* Historical Intelligence Preview if Available */}
              {historyLoading ? (
                <div className="recent-assessments-box">
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>⏳ Loading farm assessment history...</p>
                </div>
              ) : recentAssessments.length > 0 && (
                <div className="recent-assessments-box">
                  <h4>{t('recent_assessments_title') || 'Recent Farm Assessments on Record'}</h4>
                  <ul className="recent-list">
                    {recentAssessments.map((item, idx) => (
                      <li key={idx} className="recent-item">
                        <span className="recent-disease">{item.predictedDisease || 'General Check'}</span>
                        <span className="recent-pct">{item.matchPercentage || 0}% match</span>
                        <span className="recent-date">
                          {item.createdAtIso ? new Date(item.createdAtIso).toLocaleDateString() : 'Previous'}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {loading && (
            <div className="loading-state">
              <div className="loading-spinner purple-spin"></div>
              <h3>Analyzing Observed Signs...</h3>
              <p className="loading-sub">Matching symptom vectors against Central Silk Board pathological profiles...</p>
            </div>
          )}

          {activeDiagnosis && !loading && (
            <div className="diagnosis-report">
              {/* Primary Evaluation Banner */}
              <div className="disease-banner">
                <div className="banner-info">
                  <span className="banner-status-badge">PRELIMINARY SYMPTOM-BASED ASSESSMENT</span>
                  <h2 className="banner-name">{activeDiagnosis.disease}</h2>
                  <span className="banner-category">Pathogen Classification: {activeDiagnosis.category}</span>
                </div>
                <div className="match-pill">
                  <span className="match-num">{activeDiagnosis.match_percentage}%</span>
                  <span className="match-lbl">Pattern Match</span>
                </div>
              </div>

              {/* Notice Banner */}
              <div className="preliminary-disclaimer">
                ℹ️ <strong>Decision-Support Notice:</strong> {t('disclaimer_preliminary') || 'This report provides preliminary decision support based on observed signs. It does not replace microscopic or laboratory confirmation.'}
              </div>

              {/* Explainability Section: Why This Assessment? */}
              <div className="report-card explainability-card">
                <div className="card-header">
                  <span className="card-icon">🔍</span>
                  <h4>{t('why_assessment_title') || 'Explainability: Why This Assessment?'}</h4>
                </div>
                
                <p className="explainability-summary">
                  {activeDiagnosis.matched_count} of {activeDiagnosis.total_symptoms} recognized disease indicators were noted in your rearing bed.
                </p>

                {activeDiagnosis.matched_symptoms && activeDiagnosis.matched_symptoms.length > 0 && (
                  <div className="symptom-match-list matched">
                    <span className="match-sub-title">✓ {t('matched_symptoms_title') || 'Matched Observed Indicators'}:</span>
                    <ul>
                      {activeDiagnosis.matched_symptoms.map((sId, idx) => (
                        <li key={idx} className="match-item matched">
                          <span className="icon">✓</span>
                          <span>{getSymptomLabel(sId)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeDiagnosis.unmatched_symptoms && activeDiagnosis.unmatched_symptoms.length > 0 && (
                  <div className="symptom-match-list unmatched">
                    <span className="match-sub-title">✕ {t('unmatched_symptoms_title') || 'Key Disease Signs Not Observed'}:</span>
                    <ul>
                      {activeDiagnosis.unmatched_symptoms.slice(0, 4).map((sId, idx) => (
                        <li key={idx} className="match-item unmatched">
                          <span className="icon">✕</span>
                          <span>{getSymptomLabel(sId)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Differential Pattern Ranking */}
              {activeDiagnosis.all_matches && activeDiagnosis.all_matches.length > 1 && (
                <div className="report-card differential-card">
                  <div className="card-header">
                    <span className="card-icon">📊</span>
                    <h4>{t('alternative_patterns_title') || 'Differential Pattern Ranking'}</h4>
                  </div>
                  <div className="differential-list">
                    {activeDiagnosis.all_matches.map((match, idx) => (
                      <div key={idx} className="differential-item">
                        <div className="diff-header">
                          <span className="diff-name">{idx + 1}. {match.name}</span>
                          <span className="diff-pct">{match.match_percentage}% Match</span>
                        </div>
                        <div className="diff-bar-wrap">
                          <div 
                            className="diff-bar-fill" 
                            style={{ width: `${Math.min(100, Math.max(5, match.match_percentage))}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Immediate Farm Actions & Sanitization Protocol */}
              {activeDiagnosis.treatment && (
                <div className="report-card action-card">
                  <div className="card-header">
                    <span className="card-icon">🛠️</span>
                    <h4>Recommended Immediate Actions</h4>
                  </div>
                  <p className="action-text">{activeDiagnosis.treatment}</p>
                </div>
              )}

              {/* Prevention Rules & Bed Disinfection */}
              {activeDiagnosis.prevention && activeDiagnosis.prevention.length > 0 && (
                <div className="report-card prevention-card">
                  <div className="card-header">
                    <span className="card-icon">🛡️</span>
                    <h4>Batch Prevention & Disinfection SOP</h4>
                  </div>
                  <ul className="prevention-list">
                    {activeDiagnosis.prevention.map((step, idx) => (
                      <li key={idx}>
                        <span className="check-bullet">☑</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Farm Risk Intelligence Card (Connected to /api/risk/current) */}
              {farmRisk && farmRisk.status === 'EVALUATED' && (
                <div className="report-card risk-context-card">
                  <div className="card-header">
                    <span className="card-icon">🌐</span>
                    <h4>{t('farm_risk_context_title') || 'Integrated Farm Risk Context'}</h4>
                  </div>
                  <div className="risk-score-badge-row">
                    <span className={`risk-priority-tag tag-${farmRisk.risk_level.toLowerCase()}`}>
                      Management Priority: {farmRisk.risk_level}
                    </span>
                    <span className="risk-index-num">
                      Decision-Support Priority Index: {farmRisk.risk_score} / 100
                    </span>
                  </div>
                  <p className="risk-explanation-text">{farmRisk.explanation}</p>
                  {farmRisk.factors && farmRisk.factors.length > 0 && (
                    <ul className="risk-factors-list">
                      {farmRisk.factors.map((f, i) => (
                        <li key={i}>• {f}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* History Confirmation Footer */}
              <div className="assessment-history-footer">
                <span>✅ Assessment recorded in Cloud Firestore Farm History</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SilkwormDisease;