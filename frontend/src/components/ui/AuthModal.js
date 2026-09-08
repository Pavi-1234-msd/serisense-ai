import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import './AuthModal.css';

export function AuthModal() {
  const {
    authModalOpen,
    closeAuthModal,
    requestOtp,
    verifyOtp
  } = useAuth();
  const { t } = useLanguage();

  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [phoneInput, setPhoneInput] = useState('');
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const [demoCode, setDemoCode] = useState('');
  const [resendTimer, setResendTimer] = useState(30);

  const otpInputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!authModalOpen) {
      setStep('phone');
      setPhoneInput('');
      setOtpDigits(['', '', '', '', '', '']);
      setError('');
      setInfoMsg('');
      setDemoCode('');
      setLoading(false);
    }
  }, [authModalOpen]);

  // Resend timer countdown
  useEffect(() => {
    let interval = null;
    if (step === 'otp' && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  if (!authModalOpen) return null;

  // Step 1: Submit Phone Number
  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setInfoMsg('');

    const cleaned = phoneInput.replace(/\D/g, '');
    if (cleaned.length !== 10) {
      setError(t('auth_err_phone_length') || 'Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);
    try {
      const res = await requestOtp(cleaned);
      setStep('otp');
      setDemoCode(res.otpCode);
      setInfoMsg(res.message);
      setResendTimer(30);
      setTimeout(() => otpInputRefs[0].current?.focus(), 200);
    } catch (err) {
      setError(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Handle OTP input changes
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newDigits = [...otpDigits];
    newDigits[index] = value.slice(-1);
    setOtpDigits(newDigits);

    // Auto advance focus
    if (value && index < 5) {
      otpInputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs[index - 1].current?.focus();
    }
  };

  // 1-Click Auto Fill Demo OTP
  const handleAutoFillDemo = (codeToFill) => {
    const code = codeToFill || demoCode || '482931';
    const digits = code.split('').slice(0, 6);
    setOtpDigits(digits);
    setError('');
  };

  // Step 2: Verify OTP Submit
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const otpCode = otpDigits.join('');

    if (otpCode.length < 6) {
      setError(t('auth_err_otp_incomplete') || 'Please enter full 6-digit OTP code.');
      return;
    }

    setLoading(true);
    try {
      await verifyOtp(otpCode);
    } catch (err) {
      setError(err.message || 'Invalid OTP. Please check and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (resendTimer > 0) return;
    setError('');
    setLoading(true);
    try {
      const res = await requestOtp(phoneInput);
      setDemoCode(res.otpCode);
      setInfoMsg(res.message);
      setResendTimer(30);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal-backdrop" onClick={closeAuthModal}>
      <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="auth-modal-header">
          <div className="auth-header-title-group">
            <span className="auth-header-icon">👨‍🌾</span>
            <div>
              <h3>{step === 'phone' ? (t('auth_title_phone') || 'Farmer Mobile Login') : (t('auth_title_otp') || 'Enter OTP Verification')}</h3>
              <p className="auth-header-sub">
                {step === 'phone'
                  ? (t('auth_subtitle_phone') || 'No password needed — log in with your 10-digit mobile number')
                  : `${t('auth_subtitle_otp') || 'SMS OTP sent to'} +91 ${phoneInput}`}
              </p>
            </div>
          </div>
          <button className="auth-close-btn" onClick={closeAuthModal} title="Close">✕</button>
        </div>

        {/* Modal Body */}
        <div className="auth-modal-body">
          {error && <div className="auth-alert error">⚠️ {error}</div>}
          {infoMsg && <div className="auth-alert info">💬 {infoMsg}</div>}

          {step === 'phone' ? (
            <form onSubmit={handlePhoneSubmit}>
              <div className="auth-input-group">
                <label className="auth-label">{t('auth_mobile_lbl') || 'Mobile Number (10 digits)'}</label>
                <div className="phone-input-wrapper">
                  <span className="country-prefix">🇮🇳 +91</span>
                  <input
                    type="tel"
                    className="auth-phone-input"
                    placeholder="9876543210"
                    maxLength={10}
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value.replace(/\D/g, ''))}
                    autoFocus
                    required
                  />
                </div>
                <p className="auth-field-hint">
                  {t('auth_phone_hint') || 'We will send a 6-digit OTP via SMS for instant verification.'}
                </p>
              </div>

              {/* Quick Preset Buttons for Demo */}
              <div className="demo-presets-row">
                <span className="demo-preset-lbl">{t('auth_demo_fill') || 'Quick Demo Number:'}</span>
                <button
                  type="button"
                  className="demo-preset-btn"
                  onClick={() => setPhoneInput('9876543210')}
                >
                  9876543210
                </button>
              </div>

              <div className="auth-action-box">
                <button type="submit" className="auth-btn-primary" disabled={loading}>
                  {loading ? '⏳ Sending OTP...' : (t('auth_btn_send_otp') || 'Get OTP via SMS 📩')}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit}>
              <div className="otp-boxes-wrapper">
                <label className="auth-label">{t('auth_otp_lbl') || 'Enter 6-Digit Verification Code'}</label>
                <div className="otp-inputs-row">
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={otpInputRefs[idx]}
                      type="text"
                      inputMode="numeric"
                      className="otp-digit-box"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                    />
                  ))}
                </div>
              </div>

              {/* Demo Auto-fill Helper Banner */}
              <div className="demo-otp-banner">
                <span className="demo-otp-tag">⚡ Demo OTP Engine</span>
                <span className="demo-otp-code">{demoCode || '482931'}</span>
                <button
                  type="button"
                  className="btn-autofill-otp"
                  onClick={() => handleAutoFillDemo(demoCode || '482931')}
                >
                  Auto-fill OTP
                </button>
              </div>

              <div className="otp-resend-row">
                <button
                  type="button"
                  className="btn-resend-otp"
                  disabled={resendTimer > 0 || loading}
                  onClick={handleResendOtp}
                >
                  {resendTimer > 0
                    ? `Resend SMS in ${resendTimer}s`
                    : '🔄 Resend OTP Code'}
                </button>
                <button
                  type="button"
                  className="btn-change-number"
                  onClick={() => setStep('phone')}
                >
                  ✏️ Change Number
                </button>
              </div>

              <div className="auth-action-box">
                <button type="submit" className="auth-btn-primary" disabled={loading}>
                  {loading ? '⏳ Verifying...' : (t('auth_btn_verify') || 'Verify OTP & Log In ✅')}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Modal Footer */}
        <div className="auth-modal-footer">
          <span className="secure-badge">🔒 100% Free & Secure Rural Auth</span>
        </div>
      </div>
    </div>
  );
}
export default AuthModal;
