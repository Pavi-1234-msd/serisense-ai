import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { getDashboardSummary, getCurrentRisk } from '../services/api';
import './Dashboard.css';

function Dashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [summary, setSummary] = useState(null);
  const [riskData, setRiskData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch dashboard summary and authoritative risk evaluation in parallel
      const [summaryRes, riskRes] = await Promise.allSettled([
        getDashboardSummary(),
        getCurrentRisk()
      ]);

      if (summaryRes.status === 'fulfilled' && summaryRes.value?.success) {
        setSummary(summaryRes.value);
      } else if (summaryRes.status === 'rejected') {
        const status = summaryRes.reason?.response?.status;
        if (status === 401) {
          setError(t('dashboard_auth_error') || 'Authentication session expired. Please log in again.');
          return;
        } else if (status === 500) {
          setError(t('dashboard_server_error') || 'Server encountered an issue retrieving dashboard intelligence.');
        } else {
          setError(t('dashboard_network_error') || 'Network error connecting to backend service.');
        }
      }

      if (riskRes.status === 'fulfilled' && riskRes.value?.success) {
        setRiskData(riskRes.value);
      } else {
        console.warn('Risk engine endpoint unavailable or empty:', riskRes);
      }
    } catch (err) {
      console.error('Dashboard data fetch failed:', err);
      setError(t('dashboard_network_error') || 'Network error connecting to backend service.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stats = summary?.stats || { total_leaf_scans: 0, total_climate_checks: 0, total_silkworm_diagnoses: 0 };
  const recent = summary?.recent_activity || {};

  // Resolve latest assessment details from riskData or summary fallback
  const latestAssessments = riskData?.latest_assessments || {};
  const leafData = latestAssessments.leaf || (recent.leaf ? {
    disease: recent.leaf.disease,
    confidence: recent.leaf.confidence,
    created_at: recent.leaf.createdAtIso || recent.leaf.createdAt || recent.leaf.created_at
  } : null);

  const climateData = latestAssessments.climate || (recent.climate ? {
    stage: recent.climate.stage,
    temperature: recent.climate.temperature,
    humidity: recent.climate.humidity,
    status: recent.climate.status,
    created_at: recent.climate.createdAtIso || recent.climate.createdAt || recent.climate.created_at
  } : null);

  const silkwormData = latestAssessments.silkworm || (recent.silkworm ? {
    predicted_disease: recent.silkworm.predictedDisease || recent.silkworm.predicted_disease || recent.silkworm.disease || recent.silkworm.top_match?.name,
    match_percentage: recent.silkworm.matchPercentage || recent.silkworm.match_percentage || recent.silkworm.confidence || recent.silkworm.top_match?.match_percentage,
    created_at: recent.silkworm.createdAtIso || recent.silkworm.createdAt || recent.silkworm.created_at
  } : null);

  const formatDate = (dateVal) => {
    if (!dateVal) return null;
    try {
      const d = new Date(dateVal);
      if (isNaN(d.getTime())) return String(dateVal);
      return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    } catch (e) {
      return String(dateVal);
    }
  };

  // Check Risk Engine evaluation status
  const isInsufficient = !riskData || riskData.status === 'INSUFFICIENT_DATA';
  const riskLevel = riskData?.risk_level || 'UNKNOWN';
  const riskScore = typeof riskData?.risk_score === 'number' ? riskData.risk_score : null;
  const riskExplanation = riskData?.explanation;
  const factors = riskData?.factors || [];
  const priorityActions = riskData?.priority_actions || [];
  const currentContext = riskData?.current_context || {
    leaf_available: Boolean(leafData),
    climate_available: Boolean(climateData),
    silkworm_available: Boolean(silkwormData),
    historical_events_analyzed: 0
  };

  // Compile genuine chronological activity timeline
  const activityList = [];
  if (recent.leaf) {
    activityList.push({
      module: 'Leaf Health',
      icon: '🌿',
      title: recent.leaf.disease || 'Leaf Foliage Check',
      sub: recent.leaf.confidence ? `${recent.leaf.confidence}% match` : 'Evaluated',
      date: recent.leaf.createdAtIso || recent.leaf.createdAt || recent.leaf.created_at,
      link: '/history?tab=leaf'
    });
  }
  if (recent.climate) {
    activityList.push({
      module: 'Climate Advisory',
      icon: '🌡️',
      title: `${recent.climate.stage || 'Rearing'} • ${recent.climate.status || 'Checked'}`,
      sub: `${recent.climate.temperature}°C / ${recent.climate.humidity}% RH`,
      date: recent.climate.createdAtIso || recent.climate.createdAt || recent.climate.created_at,
      link: '/history?tab=climate'
    });
  }
  if (recent.silkworm) {
    activityList.push({
      module: 'Silkworm Health',
      icon: '🐛',
      title: recent.silkworm.predictedDisease || recent.silkworm.predicted_disease || recent.silkworm.top_match?.name || 'Symptom Assessment',
      sub: `${recent.silkworm.matchPercentage || recent.silkworm.match_percentage || 0}% symptom match`,
      date: recent.silkworm.createdAtIso || recent.silkworm.createdAt || recent.silkworm.created_at,
      link: '/history?tab=silkworm'
    });
  }
  // Sort descending by timestamp
  activityList.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

  return (
    <div className="dashboard-container">
      {/* 1. Welcome & Primary Navigation */}
      <div className="welcome-banner">
        <div className="welcome-text">
          <span className="app-subtitle-pill">{t('dashboard_subtitle', 'Integrated Decision Support · Real-Time Cross-Module Assessment')}</span>
          <h1>{t('welcome_back', 'Welcome back')}, {user?.full_name || t('farmer_fallback', 'Farmer')}! 👋</h1>
          <p className="farm-info">
            {user?.farm_name ? `🏡 ${user.farm_name}` : t('decision_support_system', 'SeriSense Farm Decision Support')}
            {user?.district ? ` • 📍 ${user.district}, ${user.state}` : ''}
          </p>
        </div>
        <div className="quick-actions-bar">
          <button onClick={() => navigate('/leaf-disease')} className="action-btn leaf-btn">
            {t('btn_run_leaf_assessment', '🌿 Run Leaf Assessment')}
          </button>
          <button onClick={() => navigate('/climate')} className="action-btn climate-btn">
            {t('btn_check_climate_conditions', '🌡️ Check Climate Conditions')}
          </button>
          <button onClick={() => navigate('/silkworm')} className="action-btn silkworm-btn">
            {t('btn_run_silkworm_assessment', '🐛 Run Silkworm Assessment')}
          </button>
        </div>
      </div>

      {loading && (
        <div className="dashboard-loading-box">
          <div className="dashboard-spinner"></div>
          <p>{t('dashboard_loading') || 'Loading Farm Intelligence Dashboard...'}</p>
        </div>
      )}

      {error && !loading && (
        <div className="dashboard-error-box">
          <span className="error-icon">⚠️</span>
          <div className="error-text">
            <h4>Assessment Service Notice</h4>
            <p>{error}</p>
          </div>
          <button onClick={fetchDashboardData} className="retry-btn">
            {t('retry_dashboard') || '🔄 Retry'}
          </button>
        </div>
      )}

      {!loading && (
        <>
          {/* 2. Farm Health Overview (Risk Engine Authoritative Section) */}
          <div className="dashboard-section farm-overview-section">
            <div className="section-head">
              <h2>🌐 {t('farm_health_overview', 'Farm Health Overview')}</h2>
              <span className="source-tag">SeriSense Risk Assessment</span>
            </div>

            {isInsufficient ? (
              <div className="insufficient-card">
                <div className="insufficient-header">
                  <span className="insufficient-icon">⚠️</span>
                  <div>
                    <h3>{t('insufficient_farm_data_title', 'Insufficient Farm Data')}</h3>
                    <p>{t('insufficient_farm_data_desc', 'Complete at least one assessment to begin farm-level decision support.')}</p>
                  </div>
                </div>
                <div className="missing-context-bar">
                  <span>{t('missing_modules_notice', 'Missing farm observation data for:')}</span>
                  <div className="context-pills-row">
                    {!currentContext.leaf_available && <span className="ctx-pill missing">🌿 {t('snapshot_leaf_title', 'Leaf Health')}</span>}
                    {!currentContext.climate_available && <span className="ctx-pill missing">🌡️ {t('snapshot_climate_title', 'Climate Conditions')}</span>}
                    {!currentContext.silkworm_available && <span className="ctx-pill missing">🐛 {t('snapshot_silkworm_title', 'Silkworm Health')}</span>}
                  </div>
                </div>
              </div>
            ) : (
              <div className="farm-risk-card">
                <div className="risk-overview-grid">
                  <div className="risk-score-display">
                    <span className="score-label">{t('decision_support_index', 'Farm Health Score')}</span>
                    <div className="score-value-row">
                      <span className="score-number">{riskScore}</span>
                      <span className="score-max">/ 100</span>
                    </div>
                    <span className="not-prob-disclaimer">({t('not_a_probability', 'This score indicates management priority; it is not a probability.')})</span>
                  </div>

                  <div className="risk-level-display">
                    <span className="score-label">{t('management_priority_label', 'Management Priority')}</span>
                    <span className={`risk-badge badge-${riskLevel.toLowerCase()}`}>
                      {riskLevel}
                    </span>
                    <p className="risk-explanation">{riskExplanation}</p>
                  </div>
                </div>

                {/* Cross-Module Context Indicators */}
                <div className="cross-module-context-panel">
                  <span className="ctx-panel-title">📋 {t('cross_module_context_title', 'Cross-Module Summary')}:</span>
                  <div className="context-pills-row">
                    <span className={`ctx-pill ${currentContext.leaf_available ? 'active' : 'inactive'}`}>
                      🌿 {t('leaf_module_status', 'Leaf Health Status')}: {currentContext.leaf_available ? t('available_label', 'Available') : t('unavailable_label', 'Not Available')}
                    </span>
                    <span className={`ctx-pill ${currentContext.climate_available ? 'active' : 'inactive'}`}>
                      🌡️ {t('climate_module_status', 'Climate Status')}: {currentContext.climate_available ? t('available_label', 'Available') : t('unavailable_label', 'Not Available')}
                    </span>
                    <span className={`ctx-pill ${currentContext.silkworm_available ? 'active' : 'inactive'}`}>
                      🐛 {t('silkworm_module_status', 'Silkworm Health Status')}: {currentContext.silkworm_available ? t('available_label', 'Available') : t('unavailable_label', 'Not Available')}
                    </span>
                    <span className="ctx-pill neutral">
                      📊 {t('history_records_analyzed', 'Records Analysed')}: {currentContext.historical_events_analyzed || 0}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 3. Three Module Snapshots */}
          <div className="dashboard-section">
            <div className="section-head">
              <h2>📊 {t('module_snapshots_title', 'Module Snapshots')}</h2>
            </div>

            <div className="snapshots-grid">
              {/* Snapshot A: Leaf Health */}
              <div className="snapshot-card">
                <div className="card-top">
                  <div className="card-title-wrap">
                    <span className="module-icon">🌿</span>
                    <div>
                      <h3>{t('snapshot_leaf_title', 'Leaf Health')}</h3>
                      <span className="freshness-tag">
                        {leafData?.created_at ? formatDate(leafData.created_at) : t('data_freshness_none', 'No records yet')}
                      </span>
                    </div>
                  </div>
                </div>

                {leafData && leafData.disease ? (
                  <div className="snapshot-body">
                    <div className="primary-stat-row">
                      <span className="stat-title">{leafData.disease}</span>
                      {leafData.confidence != null && (
                        <span className="match-pill">{leafData.confidence}% match</span>
                      )}
                    </div>
                    <p className="snapshot-desc">
                      {leafData.disease === 'Healthy' 
                        ? 'Mulberry leaf foliage exhibits no fungal pustules or visible lesions.'
                        : 'Foliage observation detected symptomatic fungal leaf pathology.'}
                    </p>
                    <button onClick={() => navigate('/leaf-disease')} className="snapshot-action-btn">
                      {t('btn_run_leaf_assessment', '🌿 Run Leaf Assessment')} →
                    </button>
                  </div>
                ) : (
                  <div className="snapshot-body empty">
                    <p>{t('no_leaf_scans_yet', 'No leaf scans performed yet.')}</p>
                    <button onClick={() => navigate('/leaf-disease')} className="btn-small">
                      {t('scan_now', 'Scan Now')}
                    </button>
                  </div>
                )}
              </div>

              {/* Snapshot B: Environment */}
              <div className="snapshot-card">
                <div className="card-top">
                  <div className="card-title-wrap">
                    <span className="module-icon">🌡️</span>
                    <div>
                      <h3>{t('snapshot_climate_title', 'Climate Conditions')}</h3>
                      <span className="freshness-tag">
                        {climateData?.created_at ? formatDate(climateData.created_at) : t('data_freshness_none', 'No records yet')}
                      </span>
                    </div>
                  </div>
                </div>

                {climateData && climateData.stage ? (
                  <div className="snapshot-body">
                    <div className="primary-stat-row">
                      <span className="stat-title">{climateData.stage}</span>
                      <span className={`status-pill ${(climateData.status || '').toLowerCase()}`}>
                        {climateData.status}
                      </span>
                    </div>
                    <div className="env-metrics-line">
                      <span>🌡️ {climateData.temperature}°C</span>
                      <span className="divider">•</span>
                      <span>💧 {climateData.humidity}% RH</span>
                    </div>
                    <p className="snapshot-desc">
                      {climateData.status === 'SAFE' 
                        ? 'Thermal & moisture levels are within species developmental envelope.'
                        : 'Microclimate deviation requires rearing room ventilation or insulation.'}
                    </p>
                    <button onClick={() => navigate('/climate')} className="snapshot-action-btn">
                      {t('btn_check_climate_conditions', '🌡️ Check Climate Conditions')} →
                    </button>
                  </div>
                ) : (
                  <div className="snapshot-body empty">
                    <p>{t('no_climate_checks_yet', 'No climate checks performed yet.')}</p>
                    <button onClick={() => navigate('/climate')} className="btn-small">
                      {t('check_climate', 'Check Climate')}
                    </button>
                  </div>
                )}
              </div>

              {/* Snapshot C: Silkworm Health */}
              <div className="snapshot-card">
                <div className="card-top">
                  <div className="card-title-wrap">
                    <span className="module-icon">🐛</span>
                    <div>
                      <h3>{t('snapshot_silkworm_title', 'Silkworm Health')}</h3>
                      <span className="freshness-tag">
                        {silkwormData?.created_at ? formatDate(silkwormData.created_at) : t('data_freshness_none', 'No records yet')}
                      </span>
                    </div>
                  </div>
                </div>

                {silkwormData && silkwormData.predicted_disease ? (
                  <div className="snapshot-body">
                    <div className="primary-stat-row">
                      <span className="stat-title">{silkwormData.predicted_disease}</span>
                      {silkwormData.match_percentage != null && (
                        <span className="match-pill">{silkwormData.match_percentage}% match</span>
                      )}
                    </div>
                    <span className="preliminary-subtag">Preliminary Symptom-Based Assessment</span>
                    <p className="snapshot-desc">
                      Pattern derived from observed rearing bed signs & Central Silk Board criteria.
                    </p>
                    <button onClick={() => navigate('/silkworm')} className="snapshot-action-btn">
                      {t('btn_run_silkworm_assessment', '🐛 Run Silkworm Assessment')} →
                    </button>
                  </div>
                ) : (
                  <div className="snapshot-body empty">
                    <p>{t('no_silkworm_diagnoses_yet', 'No silkworm diagnoses performed yet.')}</p>
                    <button onClick={() => navigate('/silkworm')} className="btn-small">
                      {t('diagnose_now', 'Diagnose Now')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 4. Explainability & Recommended Priority Actions */}
          {!isInsufficient && (factors.length > 0 || priorityActions.length > 0) && (
            <div className="dashboard-grid-two-col">
              {/* Why This Priority? */}
              {factors.length > 0 && (
                <div className="info-panel factors-panel">
                  <div className="panel-header">
                    <span className="panel-icon">🔍</span>
                    <h3>{t('why_priority_title', 'Why This Needs Attention')}</h3>
                  </div>
                  <p className="panel-sub">{t('priority_factors_title', 'Key Risk Factors')}:</p>
                  <ul className="factors-list">
                    {factors.map((factor, idx) => (
                      <li key={idx} className="factor-item">
                        <span className="factor-bullet">•</span>
                        <span>{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Priority Actions */}
              {priorityActions.length > 0 && (
                <div className="info-panel actions-panel">
                  <div className="panel-header">
                    <span className="panel-icon">⚡</span>
                    <h3>{t('priority_actions_title', 'Recommended Actions')}</h3>
                  </div>
                  <p className="panel-sub">Authoritative operations sequence from Risk Engine:</p>
                  <ul className="actions-list">
                    {priorityActions.map((action, idx) => (
                      <li key={idx} className="action-item">
                        <span className="action-bullet">☑</span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="priority-actions-advisory">
                    <span className="advisory-icon">ℹ️</span>
                    <p className="advisory-text">
                      {t('priority_actions_safety_advisory', 'Safety Advice: Bed disinfectant formulations and dusting dosages reflect standard Central Silk Board package of practices. Always verify with your local sericulture extension officer before applying chemical bed treatments.')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 5. Statistics Overview */}
          <div className="stats-grid">
            <div className="stat-card" onClick={() => navigate('/history?tab=leaf')}>
              <div className="stat-icon">🍃</div>
              <div className="stat-details">
                <h3>{stats.total_leaf_scans}</h3>
                <p>{t('stat_leaf_scans', 'Leaf Scans')}</p>
              </div>
            </div>
            <div className="stat-card" onClick={() => navigate('/history?tab=climate')}>
              <div className="stat-icon">🌡️</div>
              <div className="stat-details">
                <h3>{stats.total_climate_checks}</h3>
                <p>{t('stat_climate_checks', 'Climate Checks')}</p>
              </div>
            </div>
            <div className="stat-card" onClick={() => navigate('/history?tab=silkworm')}>
              <div className="stat-icon">🐛</div>
              <div className="stat-details">
                <h3>{stats.total_silkworm_diagnoses}</h3>
                <p>{t('stat_silkworm_diagnoses', 'Silkworm Assessments')}</p>
              </div>
            </div>
            <div className="stat-card" onClick={() => navigate('/history')}>
              <div className="stat-icon">📋</div>
              <div className="stat-details">
                <h3>{stats.total_activities || (stats.total_leaf_scans + stats.total_climate_checks + stats.total_silkworm_diagnoses)}</h3>
                <p>{t('stat_total_records', 'Total Records')}</p>
              </div>
            </div>
          </div>

          {/* 6. Recent Farm Activity Timeline */}
          <div className="dashboard-section activity-timeline-section">
            <div className="section-head">
              <h2>📜 {t('recent_activity_title', 'Recent Activity')}</h2>
              <button onClick={() => navigate('/history')} className="text-link-btn">
                {t('btn_view_full_history', 'View Full History')} →
              </button>
            </div>

            {activityList.length > 0 ? (
              <div className="activity-timeline-list">
                {activityList.map((item, idx) => (
                  <div key={idx} className="timeline-item" onClick={() => navigate(item.link)}>
                    <div className="timeline-left">
                      <span className="timeline-module-icon">{item.icon}</span>
                      <div>
                        <span className="timeline-module-name">{item.module}</span>
                        <h4 className="timeline-title">{item.title}</h4>
                      </div>
                    </div>
                    <div className="timeline-right">
                      <span className="timeline-sub">{item.sub}</span>
                      <span className="timeline-date">{formatDate(item.date)}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-timeline-card">
                <p>{t('data_freshness_none', 'No records yet')}</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
