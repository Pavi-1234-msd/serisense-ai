import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import './ScanHistoryModal.css';

export function ScanHistoryModal() {
  const {
    historyModalOpen,
    closeHistoryModal,
    userScans,
    userPhone,
    deleteScan,
    logout
  } = useAuth();
  const { t } = useLanguage();

  if (!historyModalOpen) return null;

  return (
    <div className="history-modal-backdrop" onClick={closeHistoryModal}>
      <div className="history-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="history-modal-header">
          <div className="history-header-title">
            <span className="history-icon">👨‍🌾</span>
            <div>
              <h3>{t('history_modal_title') || 'Farmer Scan History'}</h3>
              <p className="history-phone-badge">
                📱 Registered Mobile: <strong>+91 {userPhone}</strong>
              </p>
            </div>
          </div>
          <button className="history-close-btn" onClick={closeHistoryModal}>✕</button>
        </div>

        {/* Content */}
        <div className="history-modal-body">
          {userScans.length === 0 ? (
            <div className="history-empty-state">
              <div className="empty-icon">🍃</div>
              <h4>{t('history_empty_title') || 'No Saved Diagnosis Reports Yet'}</h4>
              <p>{t('history_empty_desc') || 'Your scanned leaf and silkworm disease reports will automatically be saved here.'}</p>
            </div>
          ) : (
            <div className="scans-list">
              {userScans.map((scan) => (
                <div key={scan.id} className="scan-card">
                  <div className="scan-card-header">
                    <div className="scan-type-tag">
                      {scan.type === 'silkworm' ? '🐛 Silkworm Scan' : '🌿 Leaf Scan'}
                    </div>
                    <span className="scan-time">{scan.savedAt}</span>
                  </div>

                  <div className="scan-card-body">
                    <div className="scan-info">
                      <h4 className="scan-disease-name">{scan.diseaseName || scan.predicted_class || 'Analysis Report'}</h4>
                      <div className="scan-meta-row">
                        {scan.confidence && (
                          <span className="confidence-pill">
                            🎯 Confidence: {(scan.confidence * (scan.confidence <= 1 ? 100 : 1)).toFixed(1)}%
                          </span>
                        )}
                        {scan.severity && (
                          <span className={`severity-pill ${scan.severity.toLowerCase()}`}>
                            ⚠️ Severity: {scan.severity}
                          </span>
                        )}
                      </div>

                      {scan.description && (
                        <p className="scan-desc-snippet">{scan.description}</p>
                      )}

                      {scan.recommended_actions && scan.recommended_actions.length > 0 && (
                        <div className="scan-actions-summary">
                          <strong>💡 Treatment Plan:</strong>
                          <ul>
                            {scan.recommended_actions.slice(0, 2).map((act, idx) => (
                              <li key={idx}>{act}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {scan.previewUrl && (
                      <div className="scan-thumb-container">
                        <img src={scan.previewUrl} alt="Diagnosis Scan" className="scan-thumb" />
                      </div>
                    )}
                  </div>

                  <div className="scan-card-footer">
                    <button
                      className="btn-delete-scan"
                      onClick={() => deleteScan(scan.id)}
                      title="Remove from history"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="history-modal-footer">
          <button
            className="btn-history-logout"
            onClick={() => {
              logout();
              closeHistoryModal();
            }}
          >
            🚪 Logout Mobile Session
          </button>
          <button className="btn-history-close" onClick={closeHistoryModal}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScanHistoryModal;
