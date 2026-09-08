import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { lang, changeLanguage, t, languages } = useLanguage();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        <Link to={user ? "/dashboard" : "/"} className="navbar-brand">
          <span className="brand-logo">🌿</span>
          <span className="brand-name">SeriSense AI</span>
        </Link>

        {/* Desktop Links */}
        <div className={`navbar-links ${mobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
            🏠 Home
          </Link>

          {user ? (
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
          ) : (
            null
          )}

          {/* User Badge / Auth Button */}
          {user ? (
            <div className="user-profile-badge">
              <span className="farmer-badge-info" title={user.email}>
                👨‍🌾 {user.full_name || user.email.split('@')[0]}
              </span>
              <button onClick={handleLogout} className="btn-logout-nav">
                Logout
              </button>
            </div>
          ) : (
            <button onClick={() => navigate('/login')} className="btn-farmer-login">
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

          {/* Offline / Demo Mode Status Pill */}
          <div className="demo-mode-pill" title="System running in production demo mode">
            <span className="demo-dot">🟡</span>
            <span>Offline / Demo Mode</span>
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