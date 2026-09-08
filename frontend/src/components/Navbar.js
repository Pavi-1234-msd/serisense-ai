import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { checkApiHealth } from '../services/api';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { lang, changeLanguage, t, languages } = useLanguage();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isApiLive, setIsApiLive] = useState(null); // null = checking, true = live, false = offline

  // Check backend health periodically
  useEffect(() => {
    let isMounted = true;

    const verifyBackend = async () => {
      try {
        const res = await checkApiHealth();
        if (isMounted) {
          setIsApiLive(res && res.status === 'healthy');
        }
      } catch (err) {
        if (isMounted) {
          setIsApiLive(false);
        }
      }
    };

    verifyBackend();
    const interval = setInterval(verifyBackend, 20000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const links = [
    { path: '/dashboard', label: '📊 Dashboard' },
    { path: '/leaf-disease', label: t('nav_leaf') || '🌿 Leaf Disease' },
    { path: '/climate', label: t('nav_climate') || '🌡️ Climate' },
    { path: '/silkworm', label: t('nav_silkworm') || '🐛 Silkworm' },
    { path: '/history', label: '📜 History' },
    { path: '/profile', label: '👤 Profile' },
  ];

  if (user && user.role === 'ADMIN') {
    links.push({ path: '/admin', label: '🛡️ Admin' });
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left: Brand Logo & Title */}
        <div className="navbar-left">
          <Link to={user ? "/dashboard" : "/"} className="navbar-brand">
            <span className="brand-logo">🌿</span>
            <span className="brand-name">SeriSense AI</span>
          </Link>
        </div>

        {/* Center / Collapsible Links & Controls */}
        <div className={`navbar-collapse ${mobileMenuOpen ? 'active' : ''}`}>
          {/* Main Navigation Links */}
          <div className="navbar-nav-links">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
              🏠 Home
            </Link>

            {user && (
              links.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))
            )}
          </div>

          {/* Right Action Utilities */}
          <div className="navbar-actions">
            {/* User Badge / Auth Button */}
            {user ? (
              <div className="user-profile-badge">
                <span className="farmer-badge-info" title={user.email}>
                  👨‍🌾 {user.full_name || user.email.split('@')[0]}
                </span>
                <button onClick={handleLogout} className="btn-logout-nav" title="Log out">
                  Logout
                </button>
              </div>
            ) : (
              <button onClick={() => { setMobileMenuOpen(false); navigate('/login'); }} className="btn-farmer-login">
                🔑 Login / Register
              </button>
            )}

            {/* Language Selector */}
            <div className="lang-selector-wrapper">
              <span className="lang-icon">🌐</span>
              <select
                className="lang-select"
                value={lang}
                onChange={(e) => changeLanguage(e.target.value)}
                title="Select Regional Language"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Dynamic Live / Offline Status Pill */}
            <div
              className={`demo-mode-pill ${isApiLive ? 'api-live' : 'api-offline'}`}
              title={isApiLive ? "Connected to live Render cloud backend" : "Backend waking up / using offline mode"}
            >
              <span className="demo-dot">{isApiLive ? '🟢' : '🟡'}</span>
              <span className="demo-text">{isApiLive ? 'Live API' : 'Offline'}</span>
            </div>
          </div>
        </div>

        {/* Mobile Toggle Hamburger */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? '✖' : '☰'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;