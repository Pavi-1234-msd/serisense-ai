import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

function Profile() {
  const { user, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    full_name: user?.full_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    preferred_language: user?.preferred_language || 'en',
    farm_name: user?.farm_name || '',
    village: user?.village || '',
    district: user?.district || '',
    state: user?.state || '',
    password: ''
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        full_name: user.full_name || prev.full_name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
        preferred_language: user.preferred_language || prev.preferred_language,
        farm_name: user.farm_name || prev.farm_name,
        village: user.village || prev.village,
        district: user.district || prev.district,
        state: user.state || prev.state
      }));
    }
  }, [user]);

  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg({ type: '', text: '' });

    try {
      const res = await updateProfile(formData);
      if (res.success) {
        setMsg({ type: 'success', text: 'Farmer profile updated successfully in Firestore!' });
      } else {
        setMsg({ type: 'error', text: res.message || 'Failed to update profile' });
      }
    } catch (err) {
      setMsg({ type: 'error', text: err.message || 'Error updating profile' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>👨‍🌾 Farmer Account & Farm Profile</h1>
        <p>Update your personal details, regional preferences, and farm information.</p>
      </div>

      <div className="profile-card">
        {msg.text && (
          <div className={`status-alert ${msg.type}`}>
            {msg.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-section">
            <h3>Personal Information</h3>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  title="Email cannot be changed"
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. 9876543210"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Farm & Location Details</h3>
            <div className="form-group">
              <label>Farm Name</label>
              <input
                type="text"
                name="farm_name"
                value={formData.farm_name}
                onChange={handleChange}
                placeholder="e.g. Sri Lakshmi Mulberry Plantation"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Village / Locality</label>
                <input
                  type="text"
                  name="village"
                  value={formData.village}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>District</label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Preferences & Security</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Preferred Language</label>
                <select
                  name="preferred_language"
                  value={formData.preferred_language}
                  onChange={handleChange}
                >
                  <option value="en">English</option>
                  <option value="ta">தமிழ் (Tamil)</option>
                  <option value="kn">ಕನ್ನಡ (Kannada)</option>
                  <option value="te">తెలుగు (Telugu)</option>
                  <option value="hi">हिंदी (Hindi)</option>
                </select>
              </div>
              <div className="form-group">
                <label>New Password (Optional)</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Leave blank to keep current"
                />
              </div>
            </div>
          </div>

          <button type="submit" className="btn-save-profile" disabled={saving}>
            {saving ? 'Saving to Database...' : '💾 Save Profile Updates'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
