import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getLeafHistory, getClimateHistory, getSilkwormHistory } from '../services/api';
import './History.css';

function History() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'leaf';

  const [activeTab, setActiveTab] = useState(initialTab);
  const [leafHistory, setLeafHistory] = useState([]);
  const [climateHistory, setClimateHistory] = useState([]);
  const [silkwormHistory, setSilkwormHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAllHistory = async () => {
      setLoading(true);
      try {
        const [leafRes, climateRes, silkwormRes] = await Promise.all([
          getLeafHistory(),
          getClimateHistory(),
          getSilkwormHistory()
        ]);

        if (leafRes.success) setLeafHistory(leafRes.history || []);
        if (climateRes.success) setClimateHistory(climateRes.history || []);
        if (silkwormRes.success) setSilkwormHistory(silkwormRes.history || []);
      } catch (err) {
        console.error("Error fetching history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllHistory();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const filterData = (list, textFields) => {
    if (!searchTerm.trim()) return list;
    const term = searchTerm.toLowerCase();
    return list.filter(item => 
      textFields.some(field => String(item[field] || '').toLowerCase().includes(term))
    );
  };

  const formatDate = (dateVal) => {
    if (!dateVal) return 'Recently';
    try {
      return new Date(dateVal).toLocaleString();
    } catch (e) {
      return String(dateVal);
    }
  };

  return (
    <div className="history-container">
      <div className="history-header">
        <h1>📜 Activity & Prediction History</h1>
        <p>All recorded scans, climate checks, and silkworm diagnoses saved in your Cloud Firestore account database.</p>
      </div>

      {/* Tabs & Search Header */}
      <div className="history-controls">
        <div className="tab-buttons">
          <button 
            className={`tab-btn ${activeTab === 'leaf' ? 'active' : ''}`}
            onClick={() => handleTabChange('leaf')}
          >
            🌿 Leaf Scans ({leafHistory.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'climate' ? 'active' : ''}`}
            onClick={() => handleTabChange('climate')}
          >
            🌡️ Climate Checks ({climateHistory.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'silkworm' ? 'active' : ''}`}
            onClick={() => handleTabChange('silkworm')}
          >
            🐛 Silkworm Diagnoses ({silkwormHistory.length})
          </button>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Content Area */}
      {loading ? (
        <div className="loading-state">Loading history records from Firestore...</div>
      ) : (
        <div className="tab-content">
          {/* Leaf Predictions Tab */}
          {activeTab === 'leaf' && (
            <div className="records-grid">
              {filterData(leafHistory, ['disease']).length === 0 ? (
                <div className="empty-history">No leaf prediction history found.</div>
              ) : (
                filterData(leafHistory, ['disease']).map((item, idx) => (
                  <div key={item.id || item.predictionId || idx} className="history-card">
                    <div className="card-top">
                      <span className="disease-badge">{item.disease}</span>
                      <span className="confidence-badge">{item.confidence}% Match</span>
                    </div>
                    <p className="record-date">📅 {formatDate(item.createdAt || item.created_at)}</p>
                    {item.report?.chemical && (
                      <div className="report-snippet">
                        <p><strong>Treatment Guidance:</strong></p>
                        <p>{item.report.chemical} — {item.report.dosage}</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* Climate Checks Tab */}
          {activeTab === 'climate' && (
            <div className="records-grid">
              {filterData(climateHistory, ['stage', 'status']).length === 0 ? (
                <div className="empty-history">No climate check records found.</div>
              ) : (
                filterData(climateHistory, ['stage', 'status']).map((item, idx) => (
                  <div key={item.id || item.checkId || idx} className="history-card">
                    <div className="card-top">
                      <span className="stage-badge">{item.stage}</span>
                      <span className={`status-badge ${(item.status || '').toLowerCase()}`}>{item.status}</span>
                    </div>
                    <p className="record-date">📅 {formatDate(item.createdAt || item.created_at)}</p>
                    <div className="climate-metrics">
                      <span>🌡️ Temp: <strong>{item.temperature}°C</strong></span>
                      <span>💧 Humidity: <strong>{item.humidity}%</strong></span>
                    </div>
                    {(item.temperature_correction || item.temp_correction) && (
                      <p className="action-step">
                        <strong>Action:</strong> {item.temperature_correction || item.temp_correction}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* Silkworm Diagnoses Tab */}
          {activeTab === 'silkworm' && (
            <div className="records-grid">
              {filterData(silkwormHistory, ['predicted_disease', 'disease', 'top_match_name']).length === 0 ? (
                <div className="empty-history">No silkworm diagnosis records found.</div>
              ) : (
                filterData(silkwormHistory, ['predicted_disease', 'disease', 'top_match_name']).map((item, idx) => {
                  const diseaseName = item.predicted_disease || item.disease || item.top_match?.name || 'Unknown';
                  const matchPct = item.match_percentage || item.confidence || item.top_match?.match_percentage || 0;
                  const symCount = item.selected_symptoms?.length || item.selectedSymptoms?.length || 0;
                  return (
                    <div key={item.id || item.diagnosisId || idx} className="history-card">
                      <div className="card-top">
                        <span className="disease-badge">{diseaseName}</span>
                        <span className="confidence-badge">{matchPct}% Match</span>
                      </div>
                      <p className="record-date">📅 {formatDate(item.createdAt || item.created_at)}</p>
                      <p><strong>Symptoms Matched:</strong> {symCount}</p>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default History;

