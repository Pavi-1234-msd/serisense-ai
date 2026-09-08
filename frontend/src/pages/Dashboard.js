import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getDashboardSummary } from '../services/api';
import './Dashboard.css';

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        const res = await getDashboardSummary();
        if (res.success) {
          setSummary(res);
        } else {
          setError(res.message || 'Failed to load dashboard summary');
        }
      } catch (err) {
        setError(err.message || 'Network error connecting to backend');
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  const stats = summary?.stats || { total_leaf_scans: 0, total_climate_checks: 0, total_silkworm_diagnoses: 0 };
  const recent = summary?.recent_activity || {};
  const alert = summary?.current_alert;

  const formatDate = (dateVal) => {
    if (!dateVal) return '';
    try {
      return new Date(dateVal).toLocaleDateString();
    } catch (e) {
      return String(dateVal);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Welcome Header */}
      <div className="welcome-banner">
        <div className="welcome-text">
          <h1>Welcome back, {user?.full_name || 'Farmer'}! 👋</h1>
          <p className="farm-info">
            {user?.farm_name ? `🏡 ${user.farm_name}` : 'Sericulture Decision Support System'}
            {user?.district ? ` • 📍 ${user.district}, ${user.state}` : ''}
          </p>
        </div>
        <div className="quick-actions-bar">
          <button onClick={() => navigate('/leaf-disease')} className="action-btn leaf-btn">
            🌿 Detect Leaf Disease
          </button>
          <button onClick={() => navigate('/climate')} className="action-btn climate-btn">
            🌡️ Check Climate
          </button>
          <button onClick={() => navigate('/silkworm')} className="action-btn silkworm-btn">
            🐛 Silkworm Diagnosis
          </button>
        </div>
      </div>

      {/* Alert Banner if Critical / Warning */}
      {alert && alert.status && alert.status !== 'SAFE' && (
        <div className={`alert-banner ${(alert.status || '').toLowerCase()}`}>
          <div className="alert-icon">{alert.status === 'CRITICAL' ? '🚨' : '⚠️'}</div>
          <div className="alert-content">
            <h3>Climate Advisory Alert ({alert.stage})</h3>
            <p>{alert.message}</p>
            {alert.temp_correction && <p><strong>Temp Action:</strong> {alert.temp_correction}</p>}
            {alert.humidity_correction && <p><strong>Humidity Action:</strong> {alert.humidity_correction}</p>}
          </div>
        </div>
      )}

      {/* Statistics Grid */}
      <div className="stats-grid">
        <div className="stat-card" onClick={() => navigate('/history?tab=leaf')}>
          <div className="stat-icon">🍃</div>
          <div className="stat-details">
            <h3>{stats.total_leaf_scans}</h3>
            <p>Leaf Scans</p>
          </div>
        </div>
        <div className="stat-card" onClick={() => navigate('/history?tab=climate')}>
          <div className="stat-icon">🌡️</div>
          <div className="stat-details">
            <h3>{stats.total_climate_checks}</h3>
            <p>Climate Checks</p>
          </div>
        </div>
        <div className="stat-card" onClick={() => navigate('/history?tab=silkworm')}>
          <div className="stat-icon">🐛</div>
          <div className="stat-details">
            <h3>{stats.total_silkworm_diagnoses}</h3>
            <p>Silkworm Diagnoses</p>
          </div>
        </div>
        <div className="stat-card" onClick={() => navigate('/history')}>
          <div className="stat-icon">📋</div>
          <div className="stat-details">
            <h3>{stats.total_activities || (stats.total_leaf_scans + stats.total_climate_checks + stats.total_silkworm_diagnoses)}</h3>
            <p>Total Records</p>
          </div>
        </div>
      </div>

      {/* Recent Activity Cards */}
      <div className="recent-activity-section">
        <h2>Latest Activity Records</h2>
        
        {loading ? (
          <div className="loading-spinner">Loading activity history from Firestore...</div>
        ) : error ? (
          <div className="error-msg">{error}</div>
        ) : (
          <div className="activity-cards-grid">
            {/* Latest Leaf Scan */}
            <div className="activity-card">
              <div className="card-header">
                <h3>🌿 Recent Leaf Scan</h3>
                {recent.leaf && <span className="date-tag">{formatDate(recent.leaf.createdAt || recent.leaf.created_at)}</span>}
              </div>
              {recent.leaf ? (
                <div className="card-body">
                  <div className="result-main">
                    <span className="disease-title">{recent.leaf.disease}</span>
                    <span className="confidence-pill">{recent.leaf.confidence}% Match</span>
                  </div>
                  {recent.leaf.report?.chemical && (
                    <p className="treatment-preview">
                      <strong>Advice:</strong> {recent.leaf.report.chemical} ({recent.leaf.report.dosage})
                    </p>
                  )}
                  <button onClick={() => navigate('/history?tab=leaf')} className="view-link">View Details →</button>
                </div>
              ) : (
                <div className="card-body empty">
                  <p>No leaf scans performed yet.</p>
                  <button onClick={() => navigate('/leaf-disease')} className="btn-small">Scan Now</button>
                </div>
              )}
            </div>

            {/* Latest Climate Check */}
            <div className="activity-card">
              <div className="card-header">
                <h3>🌡️ Recent Climate Check</h3>
                {recent.climate && <span className="date-tag">{formatDate(recent.climate.createdAt || recent.climate.created_at)}</span>}
              </div>
              {recent.climate ? (
                <div className="card-body">
                  <div className="result-main">
                    <span className="disease-title">{recent.climate.stage}</span>
                    <span className={`status-pill ${(recent.climate.status || '').toLowerCase()}`}>{recent.climate.status}</span>
                  </div>
                  <p>Temp: {recent.climate.temperature}°C | Humidity: {recent.climate.humidity}%</p>
                  <button onClick={() => navigate('/history?tab=climate')} className="view-link">View Details →</button>
                </div>
              ) : (
                <div className="card-body empty">
                  <p>No climate checks performed yet.</p>
                  <button onClick={() => navigate('/climate')} className="btn-small">Check Climate</button>
                </div>
              )}
            </div>

            {/* Latest Silkworm Diagnosis */}
            <div className="activity-card">
              <div className="card-header">
                <h3>🐛 Recent Silkworm Diagnosis</h3>
                {recent.silkworm && <span className="date-tag">{formatDate(recent.silkworm.createdAt || recent.silkworm.created_at)}</span>}
              </div>
              {recent.silkworm ? (
                <div className="card-body">
                  <div className="result-main">
                    <span className="disease-title">
                      {recent.silkworm.predicted_disease || recent.silkworm.disease || recent.silkworm.top_match?.name}
                    </span>
                    <span className="confidence-pill">
                      {recent.silkworm.match_percentage || recent.silkworm.confidence || recent.silkworm.top_match?.match_percentage}% Match
                    </span>
                  </div>
                  <p>{recent.silkworm.selected_symptoms?.length || recent.silkworm.selectedSymptoms?.length || 0} Symptoms Selected</p>
                  <button onClick={() => navigate('/history?tab=silkworm')} className="view-link">View Details →</button>
                </div>
              ) : (
                <div className="card-body empty">
                  <p>No silkworm diagnoses performed yet.</p>
                  <button onClick={() => navigate('/silkworm')} className="btn-small">Diagnose Now</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

