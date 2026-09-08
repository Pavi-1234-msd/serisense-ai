import React, { useState, useEffect } from 'react';
import { getAdminStats, getModelMetrics } from '../services/api';
import './Admin.css';

function Admin() {
  const [stats, setStats] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [statsRes, metricsRes] = await Promise.all([
          getAdminStats().catch(err => ({ success: false, message: err.response?.data?.message || err.message })),
          getModelMetrics().catch(err => ({ success: false, message: err.response?.data?.message || err.message }))
        ]);
        if (statsRes.success) {
          setStats(statsRes);
        } else {
          setError(statsRes.message || 'Failed to load administrative analytics.');
        }
        if (metricsRes.success) setMetrics(metricsRes.metrics);
      } catch (err) {
        console.error("Admin fetch error:", err);
        setError("Error connecting to administration service.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>🛡️ Admin Dashboard & AI Model Monitoring</h1>
        <p>Technical evaluation metrics for BE CSE project assessment & platform management.</p>
      </div>

      {loading ? (
        <div className="loading-spinner">Loading platform analytics and ML model stats...</div>
      ) : (
        <>
          {error && (
            <div style={{ background: '#fee2e2', border: '1px solid #ef4444', color: '#b91c1c', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px' }}>
              ⚠️ {error}
            </div>
          )}

          {/* Platform Summary Metrics */}
          {stats && (
            <div className="admin-stats-grid">
              <div className="admin-stat-card">
                <h3>{stats.stats.total_farmers}</h3>
                <p>Registered Farmers</p>
              </div>
              <div className="admin-stat-card">
                <h3>{stats.stats.total_leaf_predictions}</h3>
                <p>Total Leaf Scans</p>
              </div>
              <div className="admin-stat-card">
                <h3>{stats.stats.total_climate_checks}</h3>
                <p>Climate Checks</p>
              </div>
              <div className="admin-stat-card">
                <h3>{stats.stats.total_silkworm_diagnoses}</h3>
                <p>Silkworm Diagnoses</p>
              </div>
            </div>
          )}

          {/* Model Monitoring & BE CSE Technical Details */}
          {metrics && (
            <div className="model-monitoring-section">
              <h2>🧠 MobileNetV2 Model Performance & Metrics</h2>
              
              <div className="metrics-detail-grid">
                <div className="metric-box">
                  <h4>Model Architecture</h4>
                  <p><strong>{metrics.model_name}</strong></p>
                  <p className="sub-text">{metrics.architecture}</p>
                </div>
                <div className="metric-box">
                  <h4>Validation Accuracy</h4>
                  <p className="large-stat">{metrics.performance.accuracy}%</p>
                  <p className="sub-text">Fine-tuned top 30 layers with Adam Optimizer</p>
                </div>
                <div className="metric-box">
                  <h4>Precision / Recall / F1</h4>
                  <p>Precision: <strong>{metrics.performance.precision}%</strong></p>
                  <p>Recall: <strong>{metrics.performance.recall}%</strong></p>
                  <p>F1 Score: <strong>{metrics.performance.f1_score}%</strong></p>
                </div>
                <div className="metric-box">
                  <h4>Dataset Distribution</h4>
                  <p>Total Images: <strong>1,091</strong></p>
                  <p className="sub-text">
                    Disease Free: {metrics.dataset_breakdown['Disease Free']} | 
                    Rust: {metrics.dataset_breakdown['Leaf Rust']} | 
                    Spot: {metrics.dataset_breakdown['Leaf Spot']}
                  </p>
                </div>
              </div>

              {/* Confusion Matrix Table */}
              <div className="confusion-matrix-box">
                <h3>Confusion Matrix</h3>
                <table className="cm-table">
                  <thead>
                    <tr>
                      <th>Actual \ Predicted</th>
                      {metrics.confusion_matrix.labels.map(l => <th key={l}>{l}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {metrics.confusion_matrix.matrix.map((row, i) => (
                      <tr key={i}>
                        <th>{metrics.confusion_matrix.labels[i]}</th>
                        {row.map((cell, j) => (
                          <td key={j} className={i === j ? 'diagonal-match' : 'off-diagonal'}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Admin;
