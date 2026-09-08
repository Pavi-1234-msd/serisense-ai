import React, { useState, useEffect } from 'react';
import { checkClimateStatus } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { getTranslatedClimateReport } from '../i18n/diseaseContent';
import './ClimateAdvisory.css';

export const SILKWORM_CLIMATE_RULES = {
  'Egg': { desc: 'Egg / Incubation Stage', min_temp: 24, max_temp: 25, min_hum: 80, max_hum: 85 },
  'Instar 1': { desc: 'Chawki Rearing - 1st Stage', min_temp: 26, max_temp: 28, min_hum: 85, max_hum: 90 },
  'Instar 2': { desc: 'Chawki Rearing - 2nd Stage', min_temp: 26, max_temp: 28, min_hum: 85, max_hum: 90 },
  'Instar 3': { desc: 'Transition Stage', min_temp: 25, max_temp: 27, min_hum: 80, max_hum: 85 },
  'Instar 4': { desc: 'Late Stage - 4th Instar', min_temp: 23, max_temp: 26, min_hum: 70, max_hum: 80 },
  'Instar 5': { desc: 'Final Rearing & Spinning Stage', min_temp: 22, max_temp: 25, min_hum: 65, max_hum: 75 }
};

function ClimateAdvisory() {
  const { t, lang } = useLanguage();
  const [stage, setStage] = useState('Instar 1');
  const [temp, setTemp] = useState('27');
  const [humidity, setHumidity] = useState('88');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);

  const stagesList = Object.keys(SILKWORM_CLIMATE_RULES);

  const handleCheck = async (e) => {
    if (e) e.preventDefault();
    if (!temp || isNaN(temp) || parseFloat(temp) <= 0) {
      setError('Please enter a valid temperature value.');
      return;
    }
    if (!humidity || isNaN(humidity) || parseFloat(humidity) < 0 || parseFloat(humidity) > 100) {
      setError('Please enter a valid relative humidity percentage (0 - 100%).');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await checkClimateStatus({ stage, temperature: parseFloat(temp), humidity: parseFloat(humidity) });
      if (res.success && res.data) {
        setReport(res.data);
      } else {
        setError(res.message || 'Failed to calculate climate status.');
      }
    } catch (err) {
      setError('Failed to compute climate advisory. Please check server connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePreset = (presetStage, presetTemp, presetHum) => {
    setStage(presetStage);
    setTemp(presetTemp.toString());
    setHumidity(presetHum.toString());
  };

  const getStatusBadge = (status) => {
    if (status === 'SAFE') return { label: t('status_safe') || 'SAFE', class: 'status-safe', icon: '✅' };
    if (status === 'WARNING') return { label: t('status_warning') || 'WARNING', class: 'status-warning', icon: '⚠️' };
    return { label: t('status_critical') || 'CRITICAL', class: 'status-critical', icon: '🚨' };
  };

  const activeReport = getTranslatedClimateReport(report, lang) || report;

  return (
    <div className="climate-container">
      {/* Header */}
      <div className="page-header">
        <div className="header-icon">🌡️</div>
        <div>
          <h1 className="header-title">{t('climate_title') || 'Silkworm Climate Advisory'}</h1>
          <p className="header-subtitle">{t('climate_subtitle') || 'Real-time temperature and humidity rule-based expert system'}</p>
        </div>
        <div className="header-badge">
          <span className="badge-chip orange">Rule Based Engine</span>
        </div>
      </div>

      <div className="climate-grid">
        {/* Input Controls Card */}
        <div className="input-card">
          <h3 className="card-title">{t('enter_conditions') || 'Enter Climate Conditions'}</h3>
          <p className="card-desc">Select silkworm growth stage and measure room sensor readings</p>

          <form onSubmit={handleCheck}>
            {/* Stage Dropdown */}
            <div className="form-group">
              <label className="input-label">{t('instar_stage') || 'Instar Stage'}</label>
              <select
                className="form-control select-input"
                value={stage}
                onChange={(e) => setStage(e.target.value)}
              >
                {stagesList.map((s) => (
                  <option key={s} value={s}>
                    {s} — {SILKWORM_CLIMATE_RULES[s].desc}
                  </option>
                ))}
              </select>
            </div>

            {/* Target info box */}
            <div className="target-info-box">
              <div className="target-title">{t('target_params_for') || 'Ideal Parameters for'} {stage}:</div>
              <div className="target-values">
                <span>🌡️ Temp: <strong>{SILKWORM_CLIMATE_RULES[stage].min_temp} - {SILKWORM_CLIMATE_RULES[stage].max_temp} °C</strong></span>
                <span>💧 Humidity: <strong>{SILKWORM_CLIMATE_RULES[stage].min_hum} - {SILKWORM_CLIMATE_RULES[stage].max_hum} %</strong></span>
              </div>
            </div>

            {/* Temp & Humidity inputs */}
            <div className="inputs-row">
              <div className="form-group">
                <label className="input-label">{t('room_temp') || 'Room Temperature (°C)'}</label>
                <input
                  type="number"
                  step="0.1"
                  className="form-control"
                  placeholder="e.g. 27"
                  value={temp}
                  onChange={(e) => setTemp(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="input-label">{t('relative_humidity') || 'Relative Humidity (%)'}</label>
                <input
                  type="number"
                  step="0.1"
                  className="form-control"
                  placeholder="e.g. 88"
                  value={humidity}
                  onChange={(e) => setHumidity(e.target.value)}
                />
              </div>
            </div>

            {/* Quick Test Presets */}
            <div className="preset-selector">
              <span className="preset-label">Quick Test Scenarios:</span>
              <div className="preset-buttons">
                <button
                  type="button"
                  className="preset-btn safe"
                  onClick={() => handlePreset('Instar 1', 27, 88)}
                >
                  🟢 Ideal (Safe)
                </button>
                <button
                  type="button"
                  className="preset-btn warning"
                  onClick={() => handlePreset('Instar 3', 29, 82)}
                >
                  🟡 High Temp (Warning)
                </button>
                <button
                  type="button"
                  className="preset-btn critical"
                  onClick={() => handlePreset('Instar 5', 31, 90)}
                >
                  🔴 Severe Heat & Wet (Critical)
                </button>
              </div>
            </div>

            {error && <div className="error-alert">⚠️ {error}</div>}

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Evaluating...' : '🌡️ Check Climate Status'}
            </button>
          </form>
        </div>

        {/* Results Card */}
        <div className="result-card">
          {activeReport && (
            <div className="climate-report">
              <div className={`status-banner ${getStatusBadge(activeReport.status).class}`}>
                <div className="status-header">
                  <span className="status-icon">{getStatusBadge(activeReport.status).icon}</span>
                  <div>
                    <h2 className="status-title">{activeReport.status}</h2>
                    <p className="status-sub">For {activeReport.stage}</p>
                  </div>
                </div>
              </div>

              <div className="report-section">
                <h3>Recommended Corrections</h3>
                {activeReport.temperature_correction && (
                  <p><strong>Temperature:</strong> {activeReport.temperature_correction}</p>
                )}
                {activeReport.humidity_correction && (
                  <p><strong>Humidity:</strong> {activeReport.humidity_correction}</p>
                )}
              </div>

              {activeReport.impact_summary && (
                <div className="report-section impact-box">
                  <h3>Potential Impact on Silkworms</h3>
                  <p>{activeReport.impact_summary}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClimateAdvisory;