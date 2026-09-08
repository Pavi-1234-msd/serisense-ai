import React, { useState } from 'react';
import { Mic } from 'lucide-react';
import { VoiceAssistantModal } from './VoiceAssistantModal';
import './VoiceAssistant.css';

export const VoiceMicButton: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="voice-mic-floating-btn"
        title="Voice Assistant (Talk in your language)"
      >
        <Mic className="w-5 h-5 voice-mic-icon" />
        <span>🎙️ Voice Assistant</span>
      </button>

      <VoiceAssistantModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};
