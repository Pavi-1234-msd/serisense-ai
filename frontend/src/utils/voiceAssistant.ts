/**
 * Regional Voice Assistant Utility for SeriSense AI (TypeScript)
 * Multilingual Speech Recognition & Text-To-Speech Synthesis Engine
 * Languages: English (en-US), Kannada (kn-IN), Tamil (ta-IN), Telugu (te-IN), Hindi (hi-IN)
 */

export const LANG_SPEECH_CODES: Record<string, string> = {
  en: 'en-US',
  kn: 'kn-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  hi: 'hi-IN'
};

// 1. Initialize Speech Recognition
export const createSpeechRecognizer = (langCode = 'en') => {
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!SpeechRecognition) {
    return null;
  }

  const recognizer = new SpeechRecognition();
  recognizer.continuous = false;
  recognizer.interimResults = true;
  recognizer.lang = LANG_SPEECH_CODES[langCode] || 'en-US';
  return recognizer;
};

// 2. Text-To-Speech Engine
export const speakText = (text: string, langCode = 'en') => {
  if (!('speechSynthesis' in window)) return;

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = LANG_SPEECH_CODES[langCode] || 'en-US';
  utterance.rate = 0.95;
  utterance.pitch = 1.0;

  // Try to find native voice match if available
  const voices = window.speechSynthesis.getVoices();
  const targetLang = LANG_SPEECH_CODES[langCode] || 'en-US';
  const matchingVoice = voices.find(v => v.lang === targetLang || v.lang.startsWith(langCode));
  if (matchingVoice) {
    utterance.voice = matchingVoice;
  }

  window.speechSynthesis.speak(utterance);
};

export const stopSpeech = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

// 3. Intelligent Multilingual Query Parser for Sericulture Questions
export const parseVoiceQuery = (transcript: string, langCode = 'en') => {
  const query = (transcript || '').toLowerCase();

  // A. Mulberry Leaf Feeding & Quality Queries
  if (
    query.includes('mulberry') || query.includes('feed') || query.includes('how to feed') || query.includes('harvest') || query.includes('preserve') ||
    query.includes('ಹಿಪ್ಪುನೇರಳೆ') || query.includes('ಮೇವು') || query.includes('மல்பெரி') || query.includes('உணவு') || query.includes('మల్బరీ') || query.includes('మేత') || query.includes('शहतूत') || query.includes('खिलाना')
  ) {
    return {
      topic: 'Mulberry Leaf Feeding & Quality',
      title: '🌿 Mulberry Leaf Feeding Guidelines',
      response: 'Feed tender, succulent leaves to Chawki silkworms (Instars 1-2). Feed mature, dark green leaves to late instars (Instars 4-5). Harvest early morning or evening and preserve under damp gunny cloth. Do not feed wet, fermenting, or diseased leaves.',
      action: 'Preserve harvested leaves under damp gunny cloth at 20-22°C.'
    };
  }

  // B. Rust Disease Queries
  if (
    query.includes('rust') || query.includes('orange') || query.includes('red spot') || query.includes('pustule') ||
    query.includes('ತುಕ್ಕು') || query.includes('துரு') || query.includes('తుప్పు') || query.includes('रस्ट') || query.includes('लाल')
  ) {
    return {
      topic: 'Leaf Rust Disease',
      title: '🍂 Mulberry Leaf Rust Management',
      response: 'Leaf Rust produces reddish-orange pustules on lower leaf surfaces. Spray Bavistin 50% WP (2 grams per liter of water). Pluck and burn infected leaves. Observe a 15-day safe waiting period before harvesting leaves for silkworms.',
      action: 'Spray Bavistin 50% WP (2g/L) & observe 15-day safe harvest interval.'
    };
  }

  // C. Leaf Spot Disease Queries
  if (
    query.includes('spot') || query.includes('black') || query.includes('brown spot') || query.includes('cercospora') ||
    query.includes('ಚುಕ್ಕೆ') || query.includes('புள்ளி') || query.includes('మచ్చ') || query.includes('धब्बा') || query.includes('काला')
  ) {
    return {
      topic: 'Leaf Spot Disease',
      title: '🟤 Mulberry Leaf Spot Management',
      response: 'Leaf Spot is caused by Cercospora fungus forming circular brown/black spots. Recommended chemical spray is Indofil M-45 (2.5 grams per liter of water). Collect and burn fallen diseased leaves to prevent fungal spore recirculation.',
      action: 'Spray Indofil M-45 (2.5g/L) & burn fallen diseased leaves.'
    };
  }

  // D. Silkworm Grasserie Queries
  if (
    query.includes('grasserie') || query.includes('jaundice') || query.includes('milky') || query.includes('swollen') ||
    query.includes('ಹಾಲಿನ') || query.includes('பாலின') || query.includes('పాలు') || query.includes('ग्रासरी')
  ) {
    return {
      topic: 'Silkworm Grasserie',
      title: '🐛 Grasserie (BmNPV Virus) Advisory',
      response: 'Grasserie causes body segment swelling and milky hemolymph leakage. Remove infected larvae immediately using pincers and dip in 5% lime bath. Dust Vijetha or Resham Jyothi bed disinfectant powder after molting.',
      action: 'Isolate infected worms & dust Vijetha disinfectant powder on rearing bed.'
    };
  }

  // E. Silkworm Flacherie & Gut Diseases
  if (
    query.includes('flacherie') || query.includes('soft') || query.includes('gut') || query.includes('diarrhea') || query.includes('foul') ||
    query.includes('ಮೆತ್ತಗೆ') || query.includes('மெல்லிய') || query.includes('ఫ్లాచేరీ') || query.includes('फ्लेचरी')
  ) {
    return {
      topic: 'Silkworm Flacherie',
      title: '🐛 Flacherie Bacterial & Gut Infection Advisory',
      response: 'Flacherie causes sluggishness, translucent gut, and foul-smelling soft bodies. Avoid feeding wet or over-aged leaves. Dust bed disinfectant every morning and maintain room temperature at 24-25°C.',
      action: 'Feed dry, fresh leaves & keep rearing bed clean and ventilated.'
    };
  }

  // F. Silkworm Muscardine Fungal Disease
  if (
    query.includes('muscardine') || query.includes('white') || query.includes('powder') || query.includes('chalk') || query.includes('calcino') ||
    query.includes('ಬಿಳಿ') || query.includes('வெள்ளை') || query.includes('తెల్ల') || query.includes('सफेद')
  ) {
    return {
      topic: 'Silkworm Muscardine',
      title: '🐛 Muscardine (White Calcino Fungus) Advisory',
      response: 'Muscardine turns silkworm corpses stiff like chalk covered in white powdery spores. Dust Dithane M-45 (2%) mixed with lime powder over larvae after molting. Keep humidity below 70%.',
      action: 'Dust Dithane M-45 (2%) + Lime powder & burn mummified corpses.'
    };
  }

  // G. Temperature & Rearing Climate Queries
  if (
    query.includes('temp') || query.includes('heat') || query.includes('humidity') || query.includes('weather') || query.includes('climate') || query.includes('room') ||
    query.includes('ತಾಪಮಾನ') || query.includes('ವೆಪ್ಪನಿಲೈ') || query.includes('ಉಷ್ಣೋಗ್ರತ') || query.includes('तापमान')
  ) {
    return {
      topic: 'Climate Advisory',
      title: '🌡️ Silkworm Rearing Climate Rules',
      response: 'Chawki stages (Instars 1-2) require 26-28°C temperature and 85-90% humidity. Late instars (4-5) require cooler air (23-25°C) and lower humidity (65-75%). Hang wet gunny bags on walls if humidity is low.',
      action: 'Maintain proper room ventilation & adjust wet gunny bags for humidity.'
    };
  }

  // H. Disinfection & General Hygiene
  if (
    query.includes('disinfect') || query.includes('bleaching') || query.includes('formalin') || query.includes('clean') || query.includes('wash') ||
    query.includes('ಸೋಂಕು') || query.includes('கிருமி') || query.includes('శుభ్రం') || query.includes('सफाई')
  ) {
    return {
      topic: 'Rearing House Disinfection',
      title: '🛡️ Rearing House Disinfection Protocol',
      response: 'Disinfect the rearing room and appliances with 2% Formalin or 5% Bleaching Powder in 0.3% Slaked Lime solution 3 days before starting a new batch. Keep room sealed for 24 hours after spraying.',
      action: 'Spray 5% Bleaching powder solution & seal rearing room for 24h.'
    };
  }

  // Default Fallback matching specific keywords in transcript if present
  return {
    topic: 'SeriSense AI Assistant',
    title: '🌿 SeriSense Sericulture Advisory',
    response: `Thank you for asking: "${transcript}". I can provide detailed guidance on Mulberry leaf feeding, Leaf Rust, Leaf Spot, Silkworm Diseases (Grasserie, Flacherie, Muscardine, Pebrine), and Instar Climate rules.`,
    action: 'Select a module above or ask specifically about leaf rust, climate, or silkworm disease.'
  };
};
