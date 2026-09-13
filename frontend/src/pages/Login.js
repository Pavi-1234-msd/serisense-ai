import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const { user, login, register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [preferredLang, setPreferredLang] = useState('en');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      if (isSignUp) {
        const res = await register({
          full_name: fullName,
          email,
          phone,
          password,
          preferred_language: preferredLang
        });
        if (res.success) {
          setMessage('Account created successfully! Redirecting to dashboard...');
          setTimeout(() => navigate('/dashboard'), 1000);
        } else {
          setError(res.message || 'Registration failed');
        }
      } else {
        const res = await login({ email, password });
        if (res.success) {
          setMessage('Login successful! Redirecting...');
          setTimeout(() => navigate('/dashboard'), 800);
        } else {
          setError(res.message || 'Invalid email or password');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Authentication error');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setLoading(true);
    setError('');
    try {
      let res = await login({ email: demoEmail, password: demoPassword });
      if (res.success) {
        navigate('/dashboard');
      } else {
        // Attempt creating demo account if it doesn't exist in Firebase Auth yet
        const regRes = await register({
          email: demoEmail,
          password: demoPassword,
          full_name: demoEmail.includes('admin') ? 'Admin User' : 'Demo Farmer'
        });
        if (regRes.success) {
          navigate('/dashboard');
        } else {
          setError(regRes.message || 'Demo authentication failed');
        }
      }
    } catch (err) {
      setError('Demo login failed: ' + (err.message || 'Unable to authenticate'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="seri-login-container">
      {/* Background ambient glow effects */}
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>

      <div className="seri-login-wrapper">
        {/* Left Hero Panel */}
        <div className="seri-hero-panel">
          <div>
            <div className="hero-brand">
              <span className="hero-logo-icon">🌿</span>
              <span className="hero-brand-name">SeriSense AI</span>
            </div>

            <div className="hero-content">
              <span className="hero-badge">AI Sericulture Platform</span>
              <h2>Intelligent Support for Modern Sericulture</h2>
              <p>
                Detect leaf diseases with MobileNetV2 CNN, monitor microclimate
                instar conditions, and diagnose silkworm pathogens instantly.
              </p>

              <div className="hero-features">
                <div className="feature-item">
                  <span className="feature-icon">🌿</span>
                  <div>
                    <h4>90.3% Evaluation Benchmark</h4>
                    <p>Mulberry leaf disease classification powered by fine-tuned MobileNetV2 CNN</p>
                  </div>
                </div>

                <div className="feature-item">
                  <span className="feature-icon">🌡️</span>
                  <div>
                    <h4>Smart Climate Rules</h4>
                    <p>Real-time temperature and humidity tracking tailored for all 6 instar stages</p>
                  </div>
                </div>

                <div className="feature-item">
                  <span className="feature-icon">🐛</span>
                  <div>
                    <h4>Silkworm Diagnosis</h4>
                    <p>Rule-based diagnostic system for Grasserie, Flacherie, Muscardine, and Pebrine</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-footer-stat">
            <div className="stat-pill">
              <span className="stat-num">90.3%</span>
              <span className="stat-lbl">Evaluation Accuracy</span>
            </div>
            <div className="stat-pill">
              <span className="stat-num">6 Stages</span>
              <span className="stat-lbl">Instar Rearing Support</span>
            </div>
          </div>
        </div>

        {/* Right Auth Card */}
        <div className="seri-auth-card">
          <div className="card-header">
            <h3>{isSignUp ? 'Create Farmer Account' : 'Welcome Back'}</h3>
            <p>
              {isSignUp
                ? 'Join thousands of sericulture farmers optimizing crop yield'
                : 'Enter your credentials to access your farm dashboard'}
            </p>
          </div>

          {/* Mode Switch Tabs */}
          <div className="auth-tabs">
            <button
              type="button"
              className={`tab-btn ${!isSignUp ? 'active' : ''}`}
              onClick={() => { setIsSignUp(false); setError(''); setMessage(''); }}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`tab-btn ${isSignUp ? 'active' : ''}`}
              onClick={() => { setIsSignUp(true); setError(''); setMessage(''); }}
            >
              Create Account
            </button>
          </div>

          {error && <div className="alert alert-danger">⚠️ {error}</div>}
          {message && <div className="alert alert-success">✅ {message}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            {isSignUp && (
              <>
                <div className="input-wrapper">
                  <label className="input-label">Full Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Pavithran Ramasamy"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                <div className="input-wrapper">
                  <label className="input-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="e.g. 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="input-wrapper">
                  <label className="input-label">Preferred Regional Language</label>
                  <select
                    className="form-input"
                    value={preferredLang}
                    onChange={(e) => setPreferredLang(e.target.value)}
                  >
                    <option value="en">English</option>
                    <option value="ta">தமிழ் (Tamil)</option>
                    <option value="kn">ಕನ್ನಡ (Kannada)</option>
                    <option value="te">తెలుగు (Telugu)</option>
                    <option value="hi">हिंदी (Hindi)</option>
                  </select>
                </div>
              </>
            )}

            <div className="input-wrapper">
              <label className="input-label">Email Address *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. farmer@serisense.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-wrapper">
              <div className="label-row">
                <label className="input-label">Password *</label>
              </div>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-primary-action" disabled={loading}>
              {loading ? 'Processing...' : (isSignUp ? '🔑 Create Farmer Account' : '🚀 Sign In')}
            </button>
          </form>

          <div className="auth-toggle-row">
            <span>{isSignUp ? 'Already registered?' : "Don't have an account?"}</span>
            <button
              type="button"
              className="toggle-auth-mode-btn"
              onClick={() => { setIsSignUp(!isSignUp); setError(''); setMessage(''); }}
            >
              {isSignUp ? 'Sign in here' : 'Register new farmer'}
            </button>
          </div>

          {/* Quick Demo Access for Final Year Defense */}
          <div className="demo-accounts-box">
            <p className="demo-title">⚡ Quick Demo Accounts (Final Year Defense)</p>
            <div className="demo-buttons">
              <button
                type="button"
                className="btn-demo-acc"
                onClick={() => handleDemoLogin('farmer@serisense.com', 'farmer123')}
              >
                👨‍🌾 Farmer Demo
              </button>
              <button
                type="button"
                className="btn-demo-acc admin"
                onClick={() => handleDemoLogin('admin@serisense.com', 'admin123')}
              >
                🛡️ Admin Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;