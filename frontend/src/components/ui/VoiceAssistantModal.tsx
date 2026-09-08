import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, X, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { createSpeechRecognizer, speakText, stopSpeech, parseVoiceQuery } from '../../utils/voiceAssistant';
import './VoiceAssistant.css';

interface VoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceAssistantModal: React.FC<VoiceModalProps> = ({ isOpen, onClose }) => {
  const { lang, currentLanguage, changeLanguage, t } = useLanguage();
  const activeLang = currentLanguage || lang || 'en';
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [result, setResult] = useState<any>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setIsListening(false);
      stopSpeech();
      setIsSpeaking(false);
    }
  }, [isOpen]);

  const handleStartListening = () => {
    setErrorMessage(null);
    setTranscript('');
    setResult(null);
    stopSpeech();
    setIsSpeaking(false);

    const recognizer = createSpeechRecognizer(activeLang);
    if (!recognizer) {
      setErrorMessage('Speech recognition is not supported on this browser. Try Chrome or Edge.');
      return;
    }

    recognizer.onstart = () => {
      setIsListening(true);
    };

    recognizer.onresult = (event: any) => {
      let currentTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      setTranscript(currentTranscript);

      if (event.results[0].isFinal) {
        const parsed = parseVoiceQuery(currentTranscript, activeLang);
        setResult(parsed);
        setIsListening(false);
        // Auto read response
        speakText(parsed.response, activeLang);
        setIsSpeaking(true);
      }
    };

    recognizer.onerror = (event: any) => {
      setIsListening(false);
      setErrorMessage(`Voice input error: ${event.error || 'Please speak clearly'}`);
    };

    recognizer.onend = () => {
      setIsListening(false);
    };

    try {
      recognizer.start();
    } catch (err) {
      setIsListening(false);
    }
  };

  const handleSpeakResponse = () => {
    if (result && result.response) {
      speakText(result.response, activeLang);
      setIsSpeaking(true);
    }
  };

  const handleStopSpeaking = () => {
    stopSpeech();
    setIsSpeaking(false);
  };

  if (!isOpen) return null;

  return (
    <div className="voice-modal-backdrop" onClick={onClose}>
      <div className="voice-modal-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="voice-modal-header">
          <div className="voice-modal-title-group">
            <div className="voice-modal-avatar">
              🎙️
            </div>
            <div className="voice-modal-titles">
              <div className="voice-modal-title-row">
                <h3 className="voice-modal-h3">{t('voice_title')}</h3>
                <select
                  value={activeLang}
                  onChange={(e) => changeLanguage(e.target.value)}
                  className="voice-lang-select"
                  title="Switch Voice Assistant Language"
                >
                  <option value="en">🇬🇧 English</option>
                  <option value="ta">🇮🇳 தமிழ் (Tamil)</option>
                  <option value="kn">🇮🇳 ಕನ್ನಡ (Kannada)</option>
                  <option value="te">🇮🇳 తెలుగు (Telugu)</option>
                  <option value="hi">🇮🇳 हिंदी (Hindi)</option>
                </select>
              </div>
              <p className="voice-modal-sub">{t('voice_sub')}</p>
            </div>
          </div>

          <button
            onClick={() => {
              stopSpeech();
              onClose();
            }}
            className="voice-modal-close-btn"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mic Pulse Center Stage */}
        <div className="voice-mic-stage">
          <button
            onClick={isListening ? () => setIsListening(false) : handleStartListening}
            className={`voice-mic-pulse-btn ${isListening ? 'listening' : 'idle'}`}
          >
            {isListening ? (
              <MicOff className="w-10 h-10" />
            ) : (
              <Mic className="w-10 h-10" />
            )}
          </button>

          <span className="voice-mic-stage-label">
            {isListening ? t('voice_listening') : t('voice_tap_mic')}
          </span>
        </div>

        {/* Transcript Box */}
        {transcript && (
          <div className="voice-transcript-box">
            <span className="voice-transcript-label">{t('voice_transcript')}</span>
            "{transcript}"
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="voice-error-box">
            <AlertCircle className="w-4 h-4 inline mr-1" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Advisory Response Result Card */}
        {result && (
          <div className="voice-advisory-card">
            <div className="voice-advisory-header">
              <span className="voice-advisory-topic">{result.topic}</span>
              {isSpeaking ? (
                <button
                  onClick={handleStopSpeaking}
                  className="voice-audio-btn stop"
                >
                  <VolumeX className="w-3.5 h-3.5" /> {t('voice_stop_audio')}
                </button>
              ) : (
                <button
                  onClick={handleSpeakResponse}
                  className="voice-audio-btn"
                >
                  <Volume2 className="w-3.5 h-3.5" /> {t('voice_listen_audio')}
                </button>
              )}
            </div>

            <h4 className="voice-advisory-title">{result.title}</h4>
            <p className="voice-advisory-desc">{result.response}</p>

            <div className="voice-advisory-action">
              📌 <strong>{t('voice_action')}</strong> {result.action}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
