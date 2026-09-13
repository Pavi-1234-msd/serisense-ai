import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import LeafDisease from './pages/LeafDisease';
import ClimateAdvisory from './pages/ClimateAdvisory';
import SilkwormDisease from './pages/SilkwormDisease';
import History from './pages/History';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import { VoiceMicButton } from './components/ui/VoiceMicButton';
import { PwaInstallBanner } from './components/ui/PwaInstallBanner';
import './App.css';

function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <p style={{ fontSize: '1.1rem', color: '#16a34a', fontWeight: '500' }}>⌛ Verifying authentication session...</p>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function RequireAdmin({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <p style={{ fontSize: '1.1rem', color: '#16a34a', fontWeight: '500' }}>⌛ Verifying admin credentials...</p>
      </div>
    );
  }
  if (!user || user.role !== 'ADMIN') {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />

              {/* Protected Farmer Routes */}
              <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
              <Route path="/leaf-disease" element={<RequireAuth><LeafDisease /></RequireAuth>} />
              <Route path="/climate" element={<RequireAuth><ClimateAdvisory /></RequireAuth>} />
              <Route path="/silkworm" element={<RequireAuth><SilkwormDisease /></RequireAuth>} />
              <Route path="/history" element={<RequireAuth><History /></RequireAuth>} />
              <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />

              {/* Admin Route */}
              <Route path="/admin" element={<RequireAdmin><Admin /></RequireAdmin>} />
            </Routes>
          </main>
          <Footer />
          <VoiceMicButton />
          <PwaInstallBanner />
        </div>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;