/**
 * Structured Agricultural Decision-Support Advisories for Leaf Disease Detection
 * Module: SeriSense AI Decision Support
 * 
 * Defines comprehensive, scientifically sound, localized agricultural guidance
 * for Mulberry leaf conditions:
 *  - "Disease Free leaves" (Healthy)
 *  - "Leaf Rust" (Cerotelium fici)
 *  - "Leaf Spot" (Cercospora moricola)
 *
 * Supports 5 regional languages: English ('en'), Tamil ('ta'), Kannada ('kn'), Telugu ('te'), Hindi ('hi')
 */

export const LEAF_DISEASE_ADVISORIES = {
  'Disease Free leaves': {
    severityLevel: 'low_concern', // 'low_concern' | 'moderate_concern' | 'requires_attention'
    silkwormSafety: 'safe',
    en: {
      title: 'Disease Free Mulberry Leaf',
      statusHuman: 'No Visible Target Disease Detected',
      shortExplanation: 'The leaf shows normal green pigmentation, uniform leaf lamina, and intact venation with no signs of fungal rust pustules or necrotic leaf spots.',
      immediateActions: [
        'Safe for immediate harvest and silkworm batch feeding.',
        'Harvest leaves preferably in the cool early morning (6:00 – 8:00 AM) or late evening to preserve natural foliar moisture (70–75%).',
        'Store freshly plucked leaves under clean, damp mullin or gunny cloth to retain leaf crispness and nutritional water content.',
        'Inspect surrounding leaves across the plot as a standard operational sanitation routine.'
      ],
      management: [
        'Maintain regular basal irrigation; avoid dry spells that weaken foliar resistance.',
        'Apply balanced organic compost (FYM) and NPK fertilization (recommended 100:50:50 kg/ha/year) to sustain high leaf protein levels.',
        'Ensure proper pruning and weeding around mulberry bushes to avoid micro-climatic humidity traps near the soil level.'
      ],
      avoid: [
        'Do not feed wilted, dusty, or fermented leaves to newly molted silkworms.',
        'Do not apply unnecessary chemical fungicides or pesticides on healthy crops.',
        'Do not store harvested leaves directly on damp ground or in sealed plastic bags where thermal sweating causes leaf decay.'
      ],
      monitoring: [
        'Conduct weekly visual foliage checks across all corners of your mulberry garden.',
        'Inspect the undersides of mature lower leaves where fungal spore activity typically initiates.',
        'Capture and scan another representative leaf if any unexplained yellowing or pinhead discolorations appear.',
        'Keep a steady log of batch harvest dates and field observations in your History.'
      ],
      expertHelp: 'Continue standard cultivation practices. If unexpected wilting, root decay, or unexplained leaf discoloration occurs despite normal appearance, consult your local sericulture extension officer (CSB / DoS).'
    },
    ta: {
      title: 'நோய் இல்லாத ஆரோக்கியமான மல்பெரி இலை',
      statusHuman: 'எந்தவொரு இலக்கு நோயின் அறிகுறிகளும் காணப்படவில்லை',
      shortExplanation: 'இலை சீரான பச்சை நிறத்துடனும், துரு அல்லது புள்ளி அடையாளங்கள் இன்றியும் காணப்படுகிறது. பட்டுப்புழுக்களுக்கு ஊட்டமளிக்க மிகவும் ஏற்றது.',
      immediateActions: [
        'பட்டுப்புழுக்களுக்கு உடனடியாக அறுவடை செய்து உணவளிக்க முற்றிலும் பாதுகாப்பானது.',
        'இலையின் ஈரப்பதத்தை (70–75%) பாதுகாக்க அதிகாலை (6:00 – 8:00 மணி) அல்லது மாலையில் அறுவடை செய்யவும்.',
        'அறுவடை செய்த இலைகளை ஈரமான சுத்தமான துணியில் மூடி பாதுகாப்பாக வைக்கவும்.',
        'தோட்டத்தில் உள்ள மற்ற செடிகளையும் தொடர்ந்து இயல்பான முறையில் கண்காணிக்கவும்.'
      ],
      management: [
        'வழக்கமான நீர்ப்பாசனம் மற்றும் சமச்சீர் இயற்கை உரம் (மக்கிய எரு) இடுவதைத் தொடரவும்.',
        'செடிகளுக்கு இடையே போதிய இடைவெளியை பராமரித்து நல்ல காற்றோட்டத்தை உறுதி செய்யவும்.',
        'தோட்டத்தில் உள்ள களைகளை அகற்றி தூய்மையாக பராமரிக்கவும்.'
      ],
      avoid: [
        'ஆரோக்கியமான இலைகளின் மேல் தேவையின்றி ரசாயன பூஞ்சைக்கொல்லிகளை தெளிக்க வேண்டாம்.',
        'வாடிய அல்லது தூசி படிந்த இலைகளை பட்டுப்புழுக்களுக்கு வழங்க வேண்டாம்.',
        'அறுவடை செய்த இலைகளை பிளாஸ்டிக் பைகளில் காற்று புகாமல் அடைத்து வைக்க வேண்டாம்.'
      ],
      monitoring: [
        'வாரம் ஒருமுறை முதிர்ந்த இலைகளின் அடிப்பகுதியை ஆய்வு செய்யவும்.',
        'புதிய புள்ளிகள் அல்லது நிறமாற்றங்கள் தோன்றினால் உடனடியாக மீண்டும் ஸ்கேன் செய்யவும்.',
        'வழக்கமான ஆய்வு வரலாற்றை தொடர்ந்து பதிவு செய்யவும்.'
      ],
      expertHelp: 'தற்போது உடனடி தலையீடு தேவையில்லை. செடிகளில் எதிர்பாராத வாடல் அல்லது வேர் அழுகல் தென்பட்டால் உள்ளூர் பட்டுவளர்ப்பு துறை அதிகாரியை அணுகவும்.'
    },
    kn: {
      title: 'ರೋಗ ಮುಕ್ತ ಆರೋಗ್ಯಕರ ಹಿಪ್ಪುನೇರಳೆ ಎಲೆ',
      statusHuman: 'ಯಾವುದೇ ರೋಗದ ಲಕ್ಷಣಗಳು ಕಂಡುಬಂದಿಲ್ಲ',
      shortExplanation: 'ಎಲೆಯು ಸಮೃದ್ಧ ಹಸಿರು ಬಣ್ಣ ಮತ್ತು ಆರೋಗ್ಯಕರ ನಾಳಗಳನ್ನು ಹೊಂದಿದೆ. ರೇಷ್ಮೆ ಹುಳುಗಳ ಆಹಾರಕ್ಕೆ ಅತ್ಯುತ್ತಮವಾಗಿದೆ.',
      immediateActions: [
        'ರೇಷ್ಮೆ ಹುಳುಗಳಿಗೆ ಆಹಾರವಾಗಿ ನೀಡಲು ಸಂಪೂರ್ಣ ಸುರಕ್ಷಿತವಾಗಿದೆ.',
        'ಎಲೆಯ ತೇವಾಂಶವನ್ನು ಕಾಪಾಡಿಕೊಳ್ಳಲು ಮುಂಜಾನೆ (6:00 – 8:00) ಅಥವಾ ಸಂಜೆ ಕೊಯ್ಯಿರಿ.',
        'ಕೊಯ್ದ ಎಲೆಗಳನ್ನು ಒದ್ದೆಯಾದ ಶುದ್ಧ ಬಟ್ಟೆಯ ಕೆಳಗೆ ತಂಪಾಗಿ ಇರಿಸಿ.',
        'ಸಾಮಾನ್ಯ ಮುನ್ನೆಚ್ಚರಿಕೆಯಾಗಿ ಸುತ್ತಮುತ್ತಲಿನ ಸಸ್ಯಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.'
      ],
      management: [
        'ನಿಯಮಿತ ನೀರಾವರಿ ಮತ್ತು ಸಮತೋಲಿತ ಸಾವಯವ ಗೊಬ್ಬರ ನೀಡುವುದನ್ನು ಮುಂದುವರಿಸಿ.',
        'ಗಿಡಗಳ ನಡುವೆ ಸರಿಯಾದ ಅಂತರ ಮತ್ತು ಗಾಳಿಯಾಡುವಿಕೆಯನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.',
        'ತೋಟದಲ್ಲಿ ಕಳೆಗಳನ್ನು ತೆಗೆದು ಸ್ವಚ್ಛತೆ ಕಾಪಾಡಿ.'
      ],
      avoid: [
        'ಆರೋಗ್ಯಕರ ಗಿಡಗಳ ಮೇಲೆ ಅನಗತ್ಯವಾಗಿ ರಾಸಾಯನಿಕ ಸಿಂಪಡಿಸಬೇಡಿ.',
        'ಬಾಡಿದ ಅಥವಾ ಧೂಳು ತುಂಬಿದ ಎಲೆಗಳನ್ನು ಹುಳುಗಳಿಗೆ ನೀಡಬೇಡಿ.',
        'ಎಲೆಗಳನ್ನು ಪ್ಲಾಸ್ಟಿಕ್ ಚೀಲಗಳಲ್ಲಿ ಮುಚ್ಚಿಡಬೇಡಿ.'
      ],
      monitoring: [
        'ಪ್ರತಿ ವಾರ ಎಲೆಯ ಕೆಳಭಾಗವನ್ನು ಸೂಕ್ಷ್ಮವಾಗಿ ಗಮನಿಸಿ.',
        'ಹೊಸದಾಗಿ ಯಾವುದೇ ಚುಕ್ಕೆಗಳು ಕಂಡುಬಂದರೆ ತಕ್ಷಣ ಮರುಪರಿಶೀಲಿಸಿ.',
        'ನಿಮ್ಮ ಸ್ಕ್ಯಾನ್ ಇತಿಹಾಸವನ್ನು ಗಮನಿಸುತ್ತಿರಿ.'
      ],
      expertHelp: 'ಸದ್ಯಕ್ಕೆ ಸಾಮಾನ್ಯ ನಿರ್ವಹಣೆ ಮುಂದುವರಿಸಿ. ಅನಿರೀಕ್ಷಿತ ಹಳದಿ ಅಥವಾ ಸೊರಗು ರೋಗ ಕಂಡರೆ ರೇಷ್ಮೆ ಕೃಷಿ ಅಧಿಕಾರಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ.'
    },
    te: {
      title: 'వ్యాధి రహిత ఆరోగ్యకరమైన మల్బరీ ఆకు',
      statusHuman: 'ఎటువంటి లక్ష్య వ్యాధి లక్షణాలు కనిపించలేదు',
      shortExplanation: 'ఆకు సహజమైన ఆకుపచ్చ రంగుతో ఆరోగ్యంగా ఉంది. పట్టుపురుగుల ఆహారానికి ఎంతో అనుకూలమైనది.',
      immediateActions: [
        'పట్టుపురుగులకు మేతగా వేయడానికి పూర్తిగా సురక్షితమైనది.',
        'ఆకులో తేమ శాతం తగ్గకుండా తెల్లవారుజామున లేదా సాయంత్రం వేళల్లో కోయండి.',
        'కోసిన ఆకులను తడి గుడ్డలో చల్లగా భద్రపరచండి.',
        'తోటలోని ఇతర మొక్కలను కూడా సాధారణంగా తనిఖీ చేయండి.'
      ],
      management: [
        'క్రమం తప్పకుండా నీటిపారుదల మరియు సమతుల్య ఎరువులను అందించండి.',
        'మొక్కల మధ్య సరైన గాలి ప్రసరణ ఉండేలా చూడండి.',
        'తోటలో కలుపు మొక్కలను తొలగించి పరిశుభ్రతను పాటించండి.'
      ],
      avoid: [
        'ఆరోగ్యకరమైన ఆకులపై అనవసరంగా రసాయన మందులు పిచికారీ చేయవద్దు.',
        'వాడిపోయిన లేదా దుమ్ముతో ఉన్న ఆకులను పురుగులకు వేయవద్దు.',
        'ఆకులను ప్లాస్టిక్ కవర్లలో గాలి ఆడకుండా ఉంచవద్దు.'
      ],
      monitoring: [
        'వారానికి ఒకసారి ముదిరిన ఆకుల అడుగు భాగాన్ని పరిశీలించండి.',
        'ఏవైనా మచ్చలు కనిపిస్తే వెంటనే ఫోటో తీసి మళ్లీ స్కాన్ చేయండి.',
        'స్కాన్ హిస్టరీని క్రమం తప్పకుండా నమోదు చేయండి.'
      ],
      expertHelp: 'ప్రస్తుతం నిపుణుల అవసరం లేదు. మొక్కలు అకస్మాత్తుగా వాడిపోతే స్థానిక పట్టు పరిశ్రమ అధికారిని సంప్రదించండి.'
    },
    hi: {
      title: 'रोग मुक्त स्वस्थ शहतूत पत्ती',
      statusHuman: 'कोई लक्षित रोग के लक्षण नहीं पाए गए',
      shortExplanation: 'पत्ती में सामान्य हरा रंग, एकसमान बनावट और स्वस्थ नसें हैं। रेशम कीटों के पोषण के लिए पूर्णतः उपयुक्त।',
      immediateActions: [
        'रेशम कीटों को खिलाने के लिए पूरी तरह सुरक्षित और पौष्टिक।',
        'पत्ती में नमी (70–75%) बनाए रखने के लिए सुबह जल्दी (6–8 बजे) या शाम को पत्तियां तोड़ें।',
        'तोड़ी गई पत्तियों को साफ, नम सूती कपड़े के नीचे रखें ताकि वे ताजा रहें।',
        'खेत की सामान्य स्वच्छता बनाए रखें।'
      ],
      management: [
        'नियमित सिंचाई और संतुलित जैविक खाद (गोबर की खाद) देना जारी रखें।',
        'पौधों के बीच उचित दूरी और हवा का संचार सुनिश्चित करें।',
        'खेत में खरपतवार न पनपने दें।'
      ],
      avoid: [
        'स्वस्थ फसल पर बिना कारण कोई रासायनिक कीटनाशक या फफूंदनाशक न छिड़कें।',
        'मुरझाई हुई या धूल भरी पत्तियां रेशम कीटों को न खिलाएं।',
        'पत्तियों को बंद प्लास्टिक की थैलियों में न रखें।'
      ],
      monitoring: [
        'सप्ताह में एक बार निचली पत्तियों की निचली सतह का निरीक्षण करें।',
        'यदि कोई धब्बा या पीलापन दिखे तो तुरंत दोबारा स्कैन करें।',
        'अपने इतिहास (History) में नियमित रिकॉर्ड रखें।'
      ],
      expertHelp: 'सामान्य देखभाल जारी रखें। यदि पत्तियां अचानक सूखने लगें तो अपने नजदीकी रेशम विकास अधिकारी से संपर्क करें।'
    }
  },

  'Leaf Rust': {
    severityLevel: 'moderate_concern',
    silkwormSafety: 'unsafe',
    en: {
      title: 'Mulberry Leaf Rust (Cerotelium fici)',
      statusHuman: 'Fungal Rust Infection Detected',
      shortExplanation: 'Caused by fungal pathogen Cerotelium fici. Characterized by powdery reddish-brown pustules on the lower epidermis and matching chlorotic lesions on the upper surface, severely degrading leaf moisture and protein.',
      immediateActions: [
        'DO NOT harvest or feed rusted leaves to silkworms — causes severe malnutrition, gut stress, and secondary bacterial infections.',
        'Immediately inspect surrounding mulberry plants within a 5-meter radius to assess disease spread.',
        'Carefully pluck and isolate visibly infected lower foliage; place in bags to avoid spore dispersal.',
        'Burn or deeply bury collected rusted leaves away from the rearing house and plantation.',
        'Ensure workers thoroughly wash hands and shears with soap before handling healthy mulberry shoots or silkworm trays.'
      ],
      management: [
        'Improve plantation ventilation and solar exposure by pruning overlapping branches and tall border weeds.',
        'Shift away from overhead sprinkler irrigation to ground-level furrow irrigation to prevent persistent leaf wetness.',
        'Consult locally approved sericultural package of practices regarding recommended fungicides (such as Chlorothalonil or Hexaconazole) and observe mandatory safe waiting periods (minimum 10–14 days) before leaf harvest.'
      ],
      avoid: [
        'Do not feed infected or chemically freshly sprayed leaves to silkworms under any circumstance.',
        'Do not shake or drag infected foliage across healthy crop rows, as dry rust spores are airborne.',
        'Do not exceed locally authorized fungicide doses or mix multiple chemical compounds without official agricultural guidance.',
        'Do not ignore early rust patches; high humidity can cause rapid field-wide dissemination.'
      ],
      monitoring: [
        'Re-inspect affected mulberry plots every 3 days during humid or cloudy periods.',
        'Monitor whether rust pustules are appearing on newly emerged middle-tier leaves.',
        'Capture another clear, close-up photograph of a representative leaf if symptoms accelerate or change color.',
        'Log recurring outbreaks in your History tab to evaluate seasonal rust patterns.'
      ],
      expertHelp: 'Consider consulting your local Sericulture Extension Officer (DoS) or Krishi Vigyan Kendra (KVK) if rust spreads to more than 20% of your plot or persists following basic sanitary pruning.'
    },
    ta: {
      title: 'மல்பெரி இலை துரு நோய் (Cerotelium fici)',
      statusHuman: 'பூஞ்சை துரு தொற்று கண்டறியப்பட்டது',
      shortExplanation: 'Cerotelium fici எனும் பூஞ்சையால் ஏற்படுகிறது. இலையின் அடியில் சிவப்பு-பழுப்பு நிற துரு துகள்களும் மேற்புறத்தில் மஞ்சள் புள்ளிகளும் தோன்றும். இலையின் ஊட்டச்சத்தை பெரிதும் குறைக்கும்.',
      immediateActions: [
        'துரு பாதித்த இலைகளை பட்டுப்புழுக்களுக்கு கண்டிப்பாக உணவாக கொடுக்க வேண்டாம் — செரிமான கோளாறுகளையும் நோய்களையும் உண்டாக்கும்.',
        'பாதிக்கப்பட்ட செடியைச் சுற்றியுள்ள 5 மீட்டர் சுற்றளவு பயிர்களை உடனடியாக ஆய்வு செய்யவும்.',
        'பாதிக்கப்பட்ட கீழ் இலைகளை கவனமாகப் பறித்து, காற்றில் துகள் பரவாமல் பைகளில் சேகரிக்கவும்.',
        'சேகரிக்கப்பட்ட இலைகளை தோட்டம் மற்றும் புழு வளர்ப்பு மனைக்கு அப்பால் கொண்டு சென்று எரிக்கவும் அல்லது புதைக்கவும்.',
        'ஆரோக்கியமான செடிகளைத் தொடுவதற்கு முன் கைகளை சோப்பால் நன்கு கழுவவும்.'
      ],
      management: [
        'செடிகளுக்கு இடையே நல்ல சூரிய ஒளியும் காற்றோட்டமும் கிடைக்க கவாத்து செய்யவும்.',
        'இலைகள் தொடர்ந்து நனைந்திருப்பதை தவிர்க்க தரைவழி பாசன முறையைப் பயன்படுத்தவும்.',
        'வேளாண் துறை பரிந்துரைத்த பூஞ்சைக்கொல்லியை பயன்படுத்தும்போது குறைந்தபட்சம் 10–14 நாட்கள் பாதுகாப்பு காத்திருப்பு காலத்தை கண்டிப்பாக கடைபிடிக்கவும்.'
      ],
      avoid: [
        'நோய் பாதித்த அல்லது மருந்து தெளித்த உடனேயே இலைகளை அறுவடை செய்ய வேண்டாம்.',
        'பாதிக்கப்பட்ட இலைகளை ஆரோக்கியமான செடிகளின் வழியே தரையில் இழுத்துச் செல்ல வேண்டாம்.',
        'விவசாய அதிகாரியின் வழிகாட்டுதல் இன்றி ரசாயனங்களை கண்மூடித்தனமாக கலக்க வேண்டாம்.',
        'ஆரம்ப நிலை அறிகுறிகளை அலட்சியப்படுத்த வேண்டாம்.'
      ],
      monitoring: [
        'மழை அல்லது ஈரப்பதமான நாட்களில் 3 நாட்களுக்கு ஒருமுறை தோட்டத்தில் ஆய்வு செய்யவும்.',
        'புதிய இலைகளுக்கு துரு பரவுகிறதா என்பதை உன்னிப்பாக கவனிக்கவும்.',
        'அறிகுறிகள் மாறினால் மீண்டும் புதிய தெளிவான புகைப்படத்தை எடுத்து ஸ்கேன் செய்யவும்.',
        'உங்கள் வரலாற்றுப் பக்கத்தில் பதிவுகளை கண்காணிக்கவும்.'
      ],
      expertHelp: 'துரு நோய் 20% க்கும் அதிகமான செடிகளுக்கு பரவினால் அல்லது அடிப்படை நடவடிக்கைகளுக்குப் பிறகும் குறையவில்லை என்றால் பட்டுவளர்ப்பு துறை ஆய்வாளர் அல்லது KVK நிபுணரை அணுகவும்.'
    },
    kn: {
      title: 'ಹಿಪ್ಪುನೇರಳೆ ಎಲೆ ತುಕ್ಕು ರೋಗ (Cerotelium fici)',
      statusHuman: 'ಶಿಲೀಂಧ್ರ ತುಕ್ಕು ಸೋಂಕು ಪತ್ತೆಯಾಗಿದೆ',
      shortExplanation: 'Cerotelium fici ಶಿಲೀಂಧ್ರದಿಂದ ಉಂಟಾಗುತ್ತದೆ. ಎಲೆಯ ಕೆಳಭಾಗದಲ್ಲಿ ಕೆಂಪು-ಕಂದು ಪುಡಿಯಂತಹ ಗುಳ್ಳೆಗಳು ಕಂಡುಬರುತ್ತವೆ. ಎಲೆಯ ತೇವಾಂಶ ಮತ್ತು ಪೌಷ್ಟಿಕತೆಯನ್ನು ಕುಂಠಿತಗೊಳಿಸುತ್ತದೆ.',
      immediateActions: [
        'ತುಕ್ಕು ಪೀಡಿತ ಎಲೆಗಳನ್ನು ರೇಷ್ಮೆ ಹುಳುಗಳಿಗೆ ಖಂಡಿತವಾಗಿಯೂ ನೀಡಬೇಡಿ — ಹುಳುಗಳಲ್ಲಿ ಜೀರ್ಣಾಂಗ ತೊಂದರೆ ಮತ್ತು ರೋಗಗಳನ್ನು ಉಂಟುಮಾಡುತ್ತದೆ.',
        'ಸೋಂಕಿತ ಗಿಡದ ಸುತ್ತಲಿನ 5 ಮೀಟರ್ ವ್ಯಾಪ್ತಿಯಲ್ಲಿ ಇತರೆ ಗಿಡಗಳನ್ನು ತಕ್ಷಣ ಪರಿಶೀಲಿಸಿ.',
        'ಸೋಂಕಿತ ಕೆಳಭಾಗದ ಎಲೆಗಳನ್ನು ಎಚ್ಚರಿಕೆಯಿಂದ ಕಿತ್ತು ಚೀಲಗಳಲ್ಲಿ ಸಂಗ್ರಹಿಸಿ.',
        'ಸಂಗ್ರಹಿಸಿದ ಎಲೆಗಳನ್ನು ರೇಷ್ಮೆ ಸಾಕಣೆ ಮನೆಯಿಂದ ದೂರವಿಟ್ಟು ಸುಟ್ಟುಹಾಕಿ ಅಥವಾ ಮಣ್ಣಿನಲ್ಲಿ ಹೂತುಹಾಕಿ.',
        'ಆರೋಗ್ಯಕರ ಗಿಡಗಳನ್ನು ಮುಟ್ಟುವ ಮೊದಲು ಕೈಗಳನ್ನು ಸಾಬೂನಿನಿಂದ ತೊಳೆದುಕೊಳ್ಳಿ.'
      ],
      management: [
        'ಗಿಡಗಳಿಗೆ ಉತ್ತಮ ಗಾಳಿ ಮತ್ತು ಬಿಸಿಲು ಸಿಗುವಂತೆ ಕತ್ತರಿಸುವಿಕೆ (ಪ್ರೂನಿಂಗ್) ಮಾಡಿ.',
        'ಎಲೆಗಳು ಸದಾ ತೇವವಾಗಿರದಂತೆ ಬುಡಕ್ಕೆ ಮಾತ್ರ ನೀರು ಹಾಯಿಸಿ.',
        'ಶಿಫಾರಸು ಮಾಡಿದ ಶಿಲೀಂಧ್ರನಾಶಕವನ್ನು ಬಳಸುವಾಗ ಕನಿಷ್ಠ 10–14 ದಿನಗಳ ಕಡ್ಡಾಯ ವಿಶ್ರಾಂತಿ ಅವಧಿಯನ್ನು ಪಾಲಿಸಿ.'
      ],
      avoid: [
        'ರೋಗಪೀಡಿತ ಅಥವಾ ಔಷಧ ಸಿಂಪಡಿಸಿದ ಎಲೆಗಳನ್ನು ತಕ್ಷಣ ಕೊಯ್ಯಬೇಡಿ.',
        'ಸೋಂಕಿತ ಎಲೆಗಳನ್ನು ಆರೋಗ್ಯಕರ ಗಿಡಗಳ ಸಾಲಿನಲ್ಲಿ ಎಳೆಯಬೇಡಿ.',
        'ಅಧಿಕಾರಿಗಳ ಸಲಹೆಯಿಲ್ಲದೆ ರಾಸಾಯನಿಕಗಳನ್ನು ಅತಿಯಾಗಿ ಬಳಸಬೇಡಿ.',
        'ಆರಂಭಿಕ ಹಂತದ ರೋಗ ಲಕ್ಷಣಗಳನ್ನು ನಿರ್ಲಕ್ಷಿಸಬೇಡಿ.'
      ],
      monitoring: [
        'ಆರ್ದ್ರ ವಾತಾವರಣದಲ್ಲಿ ಪ್ರತಿ 3 ದಿನಗಳಿಗೊಮ್ಮೆ ಗಿಡಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.',
        'ಹೊಸದಾಗಿ ಚಿಗುರಿದ ಎಲೆಗಳ ಮೇಲೆ ತುಕ್ಕು ಕಾಣಿಸುತ್ತಿದೆಯೇ ಗಮನಿಸಿ.',
        'ಲಕ್ಷಣಗಳು ಬದಲಾದರೆ ಮತ್ತೊಂದು ಸ್ಪಷ್ಟ ಫೋಟೋ ತೆಗೆದು ಪರೀಕ್ಷಿಸಿ.',
        'ನಿಮ್ಮ ಸ್ಕ್ಯಾನ್ ಹಿಸ್ಟರಿಯನ್ನು ನಿಯಮಿತವಾಗಿ ಪರಿಶೀಲಿಸಿ.'
      ],
      expertHelp: 'ತೋಟದಲ್ಲಿ ತುಕ್ಕು ರೋಗ ವ್ಯಾಪಕವಾಗಿ ಹರಡುತ್ತಿದ್ದರೆ ತಕ್ಷಣ ಸ್ಥಳೀಯ ರೇಷ್ಮೆ ಇಲಾಖಾ ಅಧಿಕಾರಿ ಅಥವಾ ಕೃಷಿ ವಿಜ್ಞಾನ ಕೇಂದ್ರವನ್ನು (KVK) ಸಂಪರ್ಕಿಸಿ.'
    },
    te: {
      title: 'మల్బరీ ఆకు తుప్పు తెగులు (Cerotelium fici)',
      statusHuman: 'శిలీంధ్ర తుప్పు తెగులు గుర్తించబడింది',
      shortExplanation: 'Cerotelium fici శిలీంధ్రం వల్ల వస్తుంది. ఆకు అడుగు భాగంలో ఎర్రటి-గోధుమ రంగు పొడి వంటి బుడిపెలు ఏర్పడతాయి. ఆకులోని తేమ, మాంసకృత్తులను నాశనం చేస్తుంది.',
      immediateActions: [
        'తుప్పు సోకిన ఆకులను పట్టుపురుగులకు అస్సలు మేతగా వేయవద్దు — జీర్ణ సమస్యలు మరియు మరణాలకు కారణమవుతుంది.',
        'సోకిన మొక్క చుట్టూ 5 మీటర్ల పరిధిలోని ఇతర మొక్కలను వెంటనే తనిఖీ చేయండి.',
        'తీవ్రంగా వ్యాధి సోకిన కింది ఆకులను జాగ్రత్తగా కోసి సంచులలో భద్రపరచండి.',
        'సేకరించిన ఆకులను తోటకు మరియు పెంపకం గదికి దూరంగా తీసుకెళ్లి కాల్చండి లేదా పూడ్చండి.',
        'మంచి ఆకులను తాకే ముందు చేతులను సబ్బుతో శుభ್ರంగా కడుక్కోండి.'
      ],
      management: [
        'మొక్కలకు మంచి ఎండ మరియు గాలి తగిలేలా అనవసర కొమ్మలను కత్తిరించండి.',
        'ఆకులు ఎల్లప్పుడూ తడిగా ఉండకుండా మొక్క మొదట్లో మాత్రమే నీరు పెట్టండి.',
        'సిఫార్సు చేసిన మందులను పిచికారీ చేసేటప్పుడు కనీసం 10–14 రోజుల నిరీక్షణ సమయాన్ని పాటించండి.'
      ],
      avoid: [
        'తెగులు సోకిన లేదా మందు పిచికారీ చేసిన ఆకులను వెంటనే కోయవద్దు.',
        'సోకిన ఆకులను మంచి తోట గుండా ఈడ్చుకుంటూ వెళ్లవద్దు.',
        'వ్యవసాయ అధికారుల సలహా లేకుండా ఇష్టానుసారంగా రసాయనాలు కలపవద్దు.',
        'ప్రారంభ దశ తెగులును నిర్లక్ష్యం చేయవద్దు.'
      ],
      monitoring: [
        'తేమతో కూడిన రోజుల్లో ప్రతి 3 రోజులకు ఒకసారి పరిశీలించండి.',
        'పై కొత్త ఆకులకు తెగులు వ్యాపిస్తుందో లేదో చూడండి.',
        'లక్షణాలు మారితే మళ్లీ స్పష్టమైన ఫోటో తీసి స్కాన్ చేయండి.',
        'హిస్టరీలో వివరాలను సరిచూసుకోండి.'
      ],
      expertHelp: 'తెగులు 20% కంటే ఎక్కువ తోటలో వ్యాపిస్తే స్థానిక పట్టు పరిశ్రమ అధికారిని లేదా KVK శాస్త్రవేత్తలను సంప్రదించండి.'
    },
    hi: {
      title: 'शहतूत पत्ती रस्ट / जंग रोग (Cerotelium fici)',
      statusHuman: 'फफूंद रस्ट संक्रमण का पता चला',
      shortExplanation: 'Cerotelium fici फफूंद के कारण होता है। पत्ती की निचली सतह पर लाल-भूरे रंग के दानेदार उभार बन जाते हैं, जिससे पत्ती की नमी और प्रोटीन नष्ट हो जाते हैं।',
      immediateActions: [
        'रस्ट से ग्रसित पत्तियों को रेशम कीटों को बिल्कुल न खिलाएं — इससे कीटों में गंभीर पाचन विकार और बीमारियां होती हैं।',
        'संक्रमित पौधे के आसपास 5 मीटर के दायरे में अन्य पौधों की तुरंत जांच करें।',
        'गंभीर रूप से प्रभावित निचली पत्तियों को सावधानीपूर्वक तोड़कर थैलों में इकट्ठा करें।',
        'एकत्रित पत्तियों को खेत और कीट पालन कक्ष से दूर ले जाकर जला दें या गड्ढे में दबा दें।',
        'स्वस्थ पौधों या ट्रे को छूने से पहले हाथों को साबुन से अच्छी तरह धोएं।'
      ],
      management: [
        'पौधों की छंटाई करें ताकि खेत में अच्छी धूप और हवा पहुंच सके।',
        'फव्वारा सिंचाई से बचें और सीधे पौधों की जड़ों में पानी दें ताकि पत्तियां गीली न रहें।',
        'स्थानीय कृषि या रेशम विभाग द्वारा अनुशंसित फफूंदनाशक का उपयोग करते समय कम से कम 10–14 दिन का प्रतीक्षा समय (Waiting Period) अवश्य रखें।'
      ],
      avoid: [
        'रोगग्रस्त या ताज़ा कीटनाशक छिड़की गई पत्तियां कीटों को कभी न खिलाएं।',
        'संक्रमित पत्तियों को खेत में इधर-उधर न फेंकें क्योंकि इसके बीजाणु हवा से फैलते हैं।',
        'बिना विशेषज्ञ सलाह के अनावश्यक या अधिक मात्रा में रसायन न मिलाएं।',
        'शुरुआती लक्षणों को अनदेखा न करें।'
      ],
      monitoring: [
        'नमी वाले मौसम में हर 3 दिन में खेत का मुआयना करें।',
        'देखें कि क्या नए पत्तों पर भी जंग के लक्षण दिखाई दे रहे हैं।',
        'यदि लक्षण बदलते हैं तो नई स्पष्ट तस्वीर लेकर पुनः स्कैन करें।',
        'हिस्ट्री (History) में नियमित रूप से निगरानी रिकॉर्ड दर्ज रखें।'
      ],
      expertHelp: 'यदि रस्ट रोग खेत के 20% से अधिक हिस्से में फैल जाए या बुनियादी सफाई के बाद भी न रुके, तो तुरंत स्थानीय रेशम विस्तार अधिकारी या KVK वैज्ञानिक से संपर्क करें।'
    }
  },

  'Leaf Spot': {
    severityLevel: 'requires_attention',
    silkwormSafety: 'unsafe',
    en: {
      title: 'Mulberry Leaf Spot (Cercospora moricola)',
      statusHuman: 'Fungal Necrotic Spot Disease Detected',
      shortExplanation: 'Caused by Cercospora moricola fungus. Marked by circular to irregular necrotic brown lesions with chlorotic halos, progressing to shot-hole symptoms and early leaf drop under humid conditions.',
      immediateActions: [
        'DO NOT feed heavily spotted leaves to rearing silkworms — high risk of digestive inflammation, poor appetite, and flacherie.',
        'Mark and isolate the affected plot section; avoid harvesting tender leaves from nearby rows.',
        'Collect all fallen spotted leaves beneath the bushes and dispose of them by burning or composting in covered deep pits.',
        'Sanitize pruning tools and wash hands thoroughly before touching healthy bushes or rearing trays.',
        'Ensure fresh, clean leaves from certified spot-free plots are used for current silkworm feedings.'
      ],
      management: [
        'Eliminate stagnant water and optimize field drainage to suppress spore germination.',
        'Prune bottom-most ground-hugging foliage to prevent soil-splash pathogen transmission during rain.',
        'Follow locally recommended integrated disease management (such as 0.1% Carbendazim or Bordeaux mixture where approved) with mandatory 10–12 days pre-harvest safety interval.'
      ],
      avoid: [
        'Do not irrigate crops during the evening or allow water to splash violently across leaf foliage.',
        'Do not apply chemical fungicides indiscriminately without verifying silkworm feeding safety periods.',
        'Do not leave infected shed leaves lying on the soil surface where fungal mycelium overwinters.',
        'Do not mix chemical fungicides with foliar micronutrient sprays without expert advice.'
      ],
      monitoring: [
        'Conduct field scouting every 2–4 days after rains or heavy morning dew.',
        'Check whether necrotic spots are enlarging or developing shot-holes (center falling out).',
        'Re-scan a representative upper leaf if spots begin spreading toward top shoot levels.',
        'Maintain a log of affected rows in your History to track containment effectiveness.'
      ],
      expertHelp: 'Seek immediate guidance from your district sericultural extension officer or agricultural university plant clinic if spots appear rapidly across more than 25% of your plot or cause widespread leaf drop.'
    },
    ta: {
      title: 'மல்பெரி இலை புள்ளி நோய் (Cercospora moricola)',
      statusHuman: 'பூஞ்சை இலை புள்ளி தொற்று கண்டறியப்பட்டது',
      shortExplanation: 'Cercospora moricola எனும் பூஞ்சையால் ஏற்படுகிறது. இலைகளில் மஞ்சள் வளையத்துடன் கூடிய கரும்பழுப்பு வட்ட புள்ளிகள் தோன்றி, இலைகள் முன்கூட்டியே உதிரும்.',
      immediateActions: [
        'புள்ளி பாதித்த இலைகளை பட்டுப்புழுக்களுக்கு கண்டிப்பாக உணவளிக்க வேண்டாம் — புழுக்களில் குடல் அழற்சி மற்றும் பிளாச்சேரி நோயை உண்டாக்கும்.',
        'பாதிக்கப்பட்ட பகுதியை உடனடியாக தனிமைப்படுத்தி, அங்கிருந்து இலைகளை அறுவடை செய்வதை தவிர்க்கவும்.',
        'மண்ணில் உதிர்ந்து கிடக்கும் புள்ளி பாதித்த அனைத்து இலைகளையும் கூட்டி அப்புறப்படுத்தி எரிக்கவும்.',
        'கவாத்து செய்யும் கருவிகளை கிருமிநாசினி கொண்டு சுத்தம் செய்யவும்.',
        'புழுக்களுக்கு நோய் தாக்காத ஆரோக்கியமான தோட்டப் பகுதியிலிருந்து மட்டுமே இலைகளைப் பறித்து ஊட்டவும்.'
      ],
      management: [
        'வயலில் நீர் தேங்காமல் வடிகால் வசதியை சீரமைக்கவும்.',
        'மழைத்துளிகள் மண்ணிலிருந்து இலைகளில் தெறிப்பதைத் தவிர்க்க தரை மட்டத்திலுள்ள இலைகளை கவாத்து செய்யவும்.',
        'பரிந்துரைக்கப்பட்ட பூஞ்சைக்கொல்லியை பயன்படுத்தும்போது குறைந்தபட்சம் 10–12 நாட்கள் பாதுகாப்பு காலத்தை கடைபிடிக்கவும்.'
      ],
      avoid: [
        'மாலையில் இலைகளில் தண்ணீர் தெறிக்கும் வகையில் நீர்ப்பாசனம் செய்ய வேண்டாம்.',
        'பாதுகாப்பு காத்திருப்பு காலத்தை அறியாமல் அவசரமாக மருந்து அடிக்க வேண்டாம்.',
        'உதிர்ந்த இலைகளை செடிகளின் அடியில் மக்காமல் அப்படியே விட்டுவிட வேண்டாம்.',
        'அனுமதிக்கப்படாத ரசாயனங்களை ஒன்றாக கலந்து அடிக்க வேண்டாம்.'
      ],
      monitoring: [
        'மழை பெய்த பிறகு அல்லது பனி அதிகமுள்ள நாட்களில் 2–4 நாட்களுக்கு ஒருமுறை வயலை ஆய்வு செய்யவும்.',
        'புள்ளிகள் பெரிதாகி இலைகளில் துளைகள் ஏற்படுகின்றனவா என்று கவனிக்கவும்.',
        'புள்ளிகள் மேல் இலைகளுக்கு பரவினால் உடனடியாக புதிய புகைப்படம் எடுத்து மீண்டும் ஸ்கேன் செய்யவும்.',
        'வரலாற்று பக்கத்தில் சிகிச்சை முடிவுகளை பதிவு செய்யவும்.'
      ],
      expertHelp: 'இலை புள்ளி நோய் 25% க்கும் மேற்பட்ட இலைகளில் தீவிரமாக பரவினாலோ அல்லது பெருமளவில் இலைகள் உதிர்ந்தாலோ உள்ளூர் பட்டுவளர்ப்பு துறை ஆய்வாளரை உடனடியாக தொடர்பு கொள்ளவும்.'
    },
    kn: {
      title: 'ಹಿಪ್ಪುನೇರಳೆ ಎಲೆ ಚುಕ್ಕೆ ರೋಗ (Cercospora moricola)',
      statusHuman: 'ಶಿಲೀಂಧ್ರ ಎಲೆ ಚುಕ್ಕೆ ಸೋಂಕು ಪತ್ತೆಯಾಗಿದೆ',
      shortExplanation: 'Cercospora moricola ಶಿಲೀಂಧ್ರದಿಂದ ಉಂಟಾಗುತ್ತದೆ. ಎಲೆಯ ಮೇಲೆ ಹಳದಿ ಅಂಚುಳ್ಳ ಕಂದು ಚುಕ್ಕೆಗಳು ಮೂಡಿ, ಎಲೆಗಳು ಅಕಾಲಿಕವಾಗಿ ಹಳದಿಯಾಗಿ ಉದುರುತ್ತವೆ.',
      immediateActions: [
        'ಚುಕ್ಕೆ ರೋಗ ಪೀಡಿತ ಎಲೆಗಳನ್ನು ರೇಷ್ಮೆ ಹುಳುಗಳಿಗೆ ಖಂಡಿತವಾಗಿಯೂ ನೀಡಬೇಡಿ — ಹುಳುಗಳಲ್ಲಿ ಜೀರ್ಣಾಂಗ ಉರಿಯೂತ ಮತ್ತು ಫ್ಲಾಚೇರಿ ರೋಗದ ಅಪಾಯ ಹೆಚ್ಚುತ್ತದೆ.',
        'ಸೋಂಕಿತ ಜಾಗವನ್ನು ಗುರುತಿಸಿ ಮತ್ತು ಅಲ್ಲಿಂದ ಎಲೆ ಕೀಳುವುದನ್ನು ತಕ್ಷಣ ನಿಲ್ಲಿಸಿ.',
        'ನೆಲಕ್ಕೆ ಉದುರಿದ ಎಲ್ಲಾ ಸೋಂಕಿತ ಎಲೆಗಳನ್ನು ಗುಡಿಸಿ ಸಂಗ್ರಹಿಸಿ ಸುಟ್ಟುಹಾಕಿ.',
        'ಕತ್ತರಿಸುವ ಉಪಕರಣಗಳನ್ನು ಸ್ವಚ್ಛಗೊಳಿಸಿ ಮತ್ತು ಕೈಗಳನ್ನು ಚೆನ್ನಾಗಿ ತೊಳೆಯಿರಿ.',
        'ಹುಳುಗಳಿಗೆ ರೋಗಮುಕ್ತ ತೋಟದ ಭಾಗದಿಂದ ಮಾತ್ರ ಶುದ್ಧ ಎಲೆಗಳನ್ನು ನೀಡಿ.'
      ],
      management: [
        'ತೋಟದಲ್ಲಿ ನೀರು ನಿಲ್ಲದಂತೆ ಸೂಕ್ತ ಕಾಲುವೆ ವ್ಯವಸ್ಥೆ ಮಾಡಿ.',
        'ಮಳೆಯ ನೀರಿನಿಂದ ಮಣ್ಣು ಎಲೆಗೆ ಚಿಮ್ಮದಂತೆ ಕೆಳಗಿನ ಎಲೆಗಳನ್ನು ತೆಗೆಯಿರಿ.',
        'ಶಿಫಾರಸು ಮಾಡಿದ ಶಿಲೀಂಧ್ರನಾಶಕವನ್ನು ಬಳಸುವಾಗ ಕನಿಷ್ಠ 10–12 ದಿನಗಳ ವಿಶ್ರಾಂತಿ ಅವಧಿಯನ್ನು ಪಾಲಿಸಿ.'
      ],
      avoid: [
        'ಸಂಜೆ ವೇಳೆ ಎಲೆಗಳ ಮೇಲೆ ನೀರು ಚಿಮ್ಮುವಂತೆ ನೀರಾವರಿ ಮಾಡಬೇಡಿ.',
        'ವಿಶ್ರಾಂತಿ ಅವಧಿ ತಿಳಿಯದೆ ರಾಸಾಯನಿಕ ಸಿಂಪಡಿಸಬೇಡಿ.',
        'ಬಿದ್ದ ರೋಗಪೀಡಿತ ಎಲೆಗಳನ್ನು ತೋಟದಲ್ಲೇ ಕೊಳೆಯಲು ಬಿಡಬೇಡಿ.',
        'ಅನಧಿಕೃತ ರಾಸಾಯನಿಕಗಳನ್ನು ಮಿಶ್ರಣ ಮಾಡಬೇಡಿ.'
      ],
      monitoring: [
        'ಮಳೆಗಾಲದಲ್ಲಿ ಪ್ರತಿ 2–4 ದಿನಗಳಿಗೊಮ್ಮೆ ಗಿಡಗಳನ್ನು ಸೂಕ್ಷ್ಮವಾಗಿ ಗಮನಿಸಿ.',
        'ಚುಕ್ಕೆಗಳು ದೊಡ್ಡದಾಗುತ್ತಿದ್ದಾವೆಯೇ ಅಥವಾ ಎಲೆಯಲ್ಲಿ ರಂಧ್ರಗಳಾಗುತ್ತಿದ್ದಾವೆಯೇ ನೋಡಿ.',
        'ರೋಗವು ಮೇಲಿನ ಎಲೆಗಳಿಗೆ ಹರಡಿದರೆ ಮತ್ತೊಮ್ಮೆ ಫೋಟೋ ತೆಗೆದು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ.',
        'ನಿಮ್ಮ ಹಿಸ್ಟರಿ ಟ್ಯಾಬ್‌ನಲ್ಲಿ ಹರಡುವಿಕೆಯ ಮಟ್ಟವನ್ನು ಗಮನಿಸಿ.'
      ],
      expertHelp: 'ತೋಟದಲ್ಲಿ 25% ಕ್ಕೂ ಹೆಚ್ಚು ಎಲೆಗಳು ಉದುರುತ್ತಿದ್ದರೆ ಅಥವಾ ರೋಗವು ನಿಯಂತ್ರಣಕ್ಕೆ ಬಾರದಿದ್ದರೆ ತಕ್ಷಣ ರೇಷ್ಮೆ ವಿಸ್ತರಣಾಧಿಕಾರಿಯನ್ನು ಭೇಟಿ ಮಾಡಿ.'
    },
    te: {
      title: 'మల్బరీ ఆకు మచ్చ తెగులు (Cercospora moricola)',
      statusHuman: 'శిలీంధ్ర ఆకు మచ్చ తెగులు గుర్తించబడింది',
      shortExplanation: 'Cercospora moricola శిలీంధ్రం వల్ల వస్తుంది. పసుపు రంగు అంచులతో ముదురు గోధుమ మచ్చలు ఏర్పడి, ఆకులు అకాలంగా రాలిపోతాయి.',
      immediateActions: [
        'మచ్చలు సోకిన ఆకులను పట్టుపురుగులకు మేతగా వేయవద్దు — ప్రేగు వాపు మరియు ఫ్లాచేరి వ్యాధి ముప్పు పెరుగుతుంది.',
        'వ్యాధి సోకిన ప్రాంతాన్ని వేరుచేసి, అక్కడ ఆకులను కోయడం ఆపండి.',
        'నేలపై రాలిన తెగులు సోకిన ఆకులన్నింటినీ సేకరించి కాల్చివేయండి.',
        'కత్తిరింపు పరికరాలను శుభ్రం చేసి, చేతులను సబ్బుతో కడగాలి.',
        'పురుగుల పెంపకానికి తెగులు లేని ఆరోగ్యకరమైన ఆకులను మాత్రమే ఉపయోగించండి.'
      ],
      management: [
        'తోటలో నీరు నిలవకుండా డ్రైనేజీ సదుపాయం కల్పించండి.',
        'వర్షపు నీరు మట్టి నుండి ఆకులకు ఎగసిపడకుండా అడుగున ఉన్న ఆకులను కత్తిరించండి.',
        'సిఫార్సు చేసిన మందులను పిచికారీ చేసేటప్పుడు కనీసం 10–12 రోజుల నిరీక్షణ సమయం పాటించండి.'
      ],
      avoid: [
        'సాయంత్రం వేళల్లో ఆకులపై నీరు పడేలా తడపవద్దు.',
        'సేఫ్టీ పీరియడ్ తెలుసుకోకుండా రసాయనాలు వాడవద్దు.',
        'రాలిన ఆకులను తోటలోనే వదిలేయవద్దు.',
        'ఇష్టానుసారంగా రసాయనాలను కలపవద్దు.'
      ],
      monitoring: [
        'వర్షాలు పడిన తర్వాత ప్రతి 2–4 రోజులకు ఒకసారి తోటను తనిఖీ చేయండి.',
        'మచ్చలు పెద్దవవుతున్నాయో లేదా రంధ్రాలు పడుతున్నాయో పరిశీలించండి.',
        'కొత్త ఆకులకు మచ్చలు వస్తే వెంటనే మరో స్పష్టమైన ఫోటో తీసి స్కాన్ చేయండి.',
        'హిస్టరీలో నమోదైన రికార్డులను గమనించండి.'
      ],
      expertHelp: 'తోటలో 25% కంటే ఎక్కువ ఆకులు రాలిపోతుంటే వెంటనే స్థానిక పట్టు పరిశ్రమ అధికారిని లేదా పరిశోధనా కేంద్రాన్ని సంప్రదించండి.'
    },
    hi: {
      title: 'शहतूत पत्ती धब्बा रोग (Cercospora moricola)',
      statusHuman: 'फफूंद पत्ती धब्बा संक्रमण का पता चला',
      shortExplanation: 'Cercospora moricola फफूंद के कारण होता है। पत्तियों पर पीले घेरे वाले भूरे धब्बे बनते हैं, जिससे पत्तियां समय से पहले पीली होकर गिरने लगती हैं।',
      immediateActions: [
        'धब्बेदार पत्तियों को रेशम कीटों को बिल्कुल न खिलाएं — कीटों में आंतों की सूजन और फ्लेचरी रोग का खतरा बढ़ जाता है।',
        'प्रभावित हिस्से को चिन्हित कर अलग करें और वहां से पत्तियां तोड़ना तुरंत बंद करें।',
        'जमीन पर गिरी हुई सभी संक्रमित पत्तियों को इकट्ठा करके जला दें।',
        'छंटाई के औजारों को साफ करें और स्वस्थ पौधों को छूने से पहले हाथ धोएं।',
        'कीटों को केवल प्रमाणित रोग-मुक्त पौधों की ताजी पत्तियां ही खिलाएं।'
      ],
      management: [
        'खेत में जलभराव न होने दें और जल निकासी दुरुस्त रखें।',
        'जमीन से सटती निचली पत्तियों की छंटाई करें ताकि मिट्टी के छींटों से फफूंद न फैले।',
        'अनुशंसित फफूंदनाशक का उपयोग करते समय न्यूनतम 10–12 दिनों का प्रतीक्षा समय (Safe Period) अवश्य रखें।'
      ],
      avoid: [
        'शाम के समय पत्तियों पर पानी का तेज छिड़काव न करें।',
        'सुरक्षा अवधि की पुष्टि किए बिना जल्दबाजी में रसायन न छिड़कें।',
        'गिरी हुई रोगी पत्तियों को पौधों के नीचे सड़ने के लिए न छोड़ें।',
        'बिना अनुमति के विभिन्न रसायनों को आपस में न मिलाएं।'
      ],
      monitoring: [
        'बारिश या भारी ओस के बाद हर 2–4 दिन में फसल का मुआयना करें।',
        'जांचें कि क्या धब्बे बड़े होकर पत्तियों में छेद बना रहे हैं।',
        'यदि नए पत्तों पर भी धब्बे दिखें तो तुरंत नई स्पष्ट फोटो लेकर पुनः स्कैन करें।',
        'हिस्ट्री (History) में फसल सुधार का रिकॉर्ड देखें।'
      ],
      expertHelp: 'यदि धब्बा रोग खेत के 25% से अधिक हिस्से में फैल जाए या पत्तियां तेजी से गिरने लगें, तो तुरंत नजदीकी रेशम विशेषज्ञ या कृषि विज्ञान केंद्र (KVK) से संपर्क करें।'
    }
  }
};

/**
 * Helper to select the exact structured advisory for a classified leaf disease.
 * @param {string} diseaseClass The disease name returned by the backend (e.g. 'Leaf Rust', 'Leaf Spot', 'Disease Free leaves')
 * @param {string} lang Language code ('en' | 'ta' | 'kn' | 'te' | 'hi')
 * @returns {object} Structured advisory content
 */
export function getLeafDiseaseAdvisory(diseaseClass, lang = 'en') {
  const normalizedClass = normalizeDiseaseKey(diseaseClass);
  const diseaseEntry = LEAF_DISEASE_ADVISORIES[normalizedClass] || LEAF_DISEASE_ADVISORIES['Disease Free leaves'];
  
  const content = diseaseEntry[lang] || diseaseEntry.en;
  
  return {
    diseaseKey: normalizedClass,
    severityLevel: diseaseEntry.severityLevel,
    silkwormSafety: diseaseEntry.silkwormSafety,
    ...content
  };
}

/**
 * Normalizes variations in backend returned class strings
 */
export function normalizeDiseaseKey(rawName) {
  if (!rawName) return 'Disease Free leaves';
  const lower = String(rawName).toLowerCase().trim();
  if (lower.includes('rust')) return 'Leaf Rust';
  if (lower.includes('spot')) return 'Leaf Spot';
  return 'Disease Free leaves';
}

/**
 * Qualitative Confidence Helper
 * Accurately translates numerical ML confidence without fabricating certainty
 */
export function getConfidenceAssessment(confidenceScore, lang = 'en') {
  const score = parseFloat(confidenceScore) || 0;
  
  const LABELS = {
    en: {
      high: 'High AI Confidence',
      moderate: 'Moderate AI Confidence',
      lower: 'Lower AI Confidence (Verification Recommended)',
      lowAdvice: 'The model confidence is relatively low. Please verify image clarity, ensure the leaf fills the frame without blur, or consider uploading another photo / consulting an agriculture officer.'
    },
    ta: {
      high: 'அதிக AI நம்பிக்கை நிலை',
      moderate: 'மிதமான AI நம்பிக்கை நிலை',
      lower: 'குறைந்த AI நம்பிக்கை நிலை (மறுசரிபார்ப்பு பரிந்துரைக்கப்படுகிறது)',
      lowAdvice: 'AI மாடல் நம்பிக்கை அளவு குறைவாக உள்ளது. தெளிவான வெளிச்சத்தில் மீண்டும் புகைப்படம் எடுத்து உறுதிப்படுத்தவும் அல்லது வேளாண் அதிகாரியை அணுகவும்.'
    },
    kn: {
      high: 'ಹೆಚ್ಚಿನ AI ನಿಖರತೆ ಮಟ್ಟ',
      moderate: 'ಮಧ್ಯಮ AI ನಿಖರತೆ ಮಟ್ಟ',
      lower: 'ಕಡಿಮೆ AI ನಿಖರತೆ ಮಟ್ಟ (ಮರುಪರಿಶೀಲನೆ ಅಗತ್ಯ)',
      lowAdvice: 'AI ಮಾದರಿಯ ನಿಖರತೆಯು ಕಡಿಮೆಯಿದೆ. ದಯವಿಟ್ಟು ಉತ್ತಮ ಬೆಳಕಿನಲ್ಲಿ ಮತ್ತೊಂದು ಸ್ಪಷ್ಟ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ಕೃಷಿ ಅಧಿಕಾರಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ.'
    },
    te: {
      high: 'అధిక AI విశ్వాస స్థాయి',
      moderate: 'మధ్యస్థ AI విశ్వాస స్థాయి',
      lower: 'తక్కువ AI విశ్వాస స్థాయి (ధృవీకరణ అవసరం)',
      lowAdvice: 'AI మోడల్ విశ్వాస స్థాయి తక్కువగా ఉంది. దయచేసి స్పష్టమైన వెలుతురులో మరొక ఫోటో తీసి మళ్లీ స్కాన్ చేయండి లేదా వ్యవసాయ అధికారిని సంప్రదించండి.'
    },
    hi: {
      high: 'उच्च AI विश्वास स्तर',
      moderate: 'मध्यम AI विश्वास स्तर',
      lower: 'कम AI विश्वास स्तर (पुनः सत्यापन अनुशंसित)',
      lowAdvice: 'मॉडल का विश्वास स्तर अपेक्षाकृत कम है। कृपया अच्छी रोशनी में स्पष्ट तस्वीर दोबारा अपलोड करें या कृषि विशेषज्ञ से परामर्श लें।'
    }
  };

  const text = LABELS[lang] || LABELS.en;

  if (score >= 85) {
    return { level: 'high', score, label: text.high, isLow: false, lowAdvice: null };
  } else if (score >= 65) {
    return { level: 'moderate', score, label: text.moderate, isLow: false, lowAdvice: null };
  } else {
    return { level: 'lower', score, label: text.lower, isLow: true, lowAdvice: text.lowAdvice };
  }
}
