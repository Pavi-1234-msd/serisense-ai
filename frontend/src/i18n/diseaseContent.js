// src/i18n/diseaseContent.js
// Full translated diagnosis content, looked up by disease/climate/symptom KEY + current language.

export const SEVERITY_LABELS = {
    en: { None: 'None', Moderate: 'Moderate', High: 'High', Unknown: 'Uncertain' },
    ta: { None: 'இல்லை', Moderate: 'மிதமான', High: 'அதிக', Unknown: 'நிச்சயமற்றது' },
    kn: { None: 'ಇಲ್ಲ', Moderate: 'ಮಧ್ಯಮ', High: 'ಹೆಚ್ಚು', Unknown: 'ಅನಿಶ್ಚಿತ' },
    te: { None: 'లేదు', Moderate: 'మధ్యస్థం', High: 'అధికం', Unknown: 'అనిశ్చితం' },
    hi: { None: 'कोई नहीं', Moderate: 'मध्यम', High: 'उच्च', Unknown: 'अनिश्चित' }
};

export const DISEASE_CONTENT = {
    'Leaf Rust': {
        en: {
            symptoms: 'Small red-brown to dark orange rusty pustules on the lower leaf surface. Upper surface shows yellowish spots.',
            cause: 'Fungal infection caused by Cerotelium fici. Favored by high humidity (>80%) and 25–30°C temperature.',
            chemical: { name: 'Hexaconazole 5% EC (Contaf)', dosage: '2 mL per litre of water', frequency: 'Spray twice at 15-day intervals.' },
            immediate_actions: [
                'Remove and burn heavily infected leaves immediately.',
                'Do not harvest leaves from infected plants for feeding.',
                'Spray fungicide covering both leaf surfaces.'
            ],
            prevention: [
                'Plant rust-resistant mulberry varieties (S-36, V-1).',
                'Maintain proper spacing for air circulation.',
                'Apply preventive fungicide spray during monsoon.'
            ],
            silkworm_impact: 'DO NOT FEED rust-infected leaves. Reduces nutrition by 40–60%, causes digestive disorders and poor cocoon quality.'
        },
        ta: {
            symptoms: 'இலையின் அடிப்பகுதியில் சிவப்பு-பழுப்பு முதல் கருஞ்சிவப்பு துரு புள்ளிகள். மேற்பரப்பில் மஞ்சள் நிற புள்ளிகள் தோன்றும்.',
            cause: 'Cerotelium fici எனும் பூஞ்சையால் ஏற்படும் நோய். அதிக ஈரப்பதம் (>80%) மற்றும் 25–30°C வெப்பநிலையில் அதிகரிக்கும்.',
            chemical: { name: 'ஹெக்ஸாகோனசோல் 5% EC (Contaf)', dosage: '1 லிட்டர் தண்ணீருக்கு 2 மி.லி.', frequency: '15 நாட்களுக்கு ஒருமுறை, 2 முறை தெளிக்கவும்.' },
            immediate_actions: [
                'கடுமையாக பாதிக்கப்பட்ட இலைகளை உடனடியாக அகற்றி எரிக்கவும்.',
                'பாதிக்கப்பட்ட செடிகளிலிருந்து இலைகளை பட்டுப்புழு உணவுக்கு பறிக்க வேண்டாம்.',
                'இலையின் இரு பக்கங்களிலும் பூஞ்சைக்கொல்லியை தெளிக்கவும்.'
            ],
            prevention: [
                'துரு எதிர்ப்பு மல்பெரி ரகங்களை (S-36, V-1) பயிரிடவும்.',
                'காற்றோட்டத்திற்கு போதிய இடைவெளியை பராமரிக்கவும்.',
                'மழைக்காலத்தில் தடுப்பு பூஞ்சைக்கொல்லியை தெளிக்கவும்.'
            ],
            silkworm_impact: 'துரு பாதிப்புள்ள இலைகளை உணவாக கொடுக்க வேண்டாம். ஊட்டச்சத்தை 40–60% குறைக்கும், செரிமான கோளாறுகள் மற்றும் மோசமான கூடு தரத்தை ஏற்படுத்தும்.'
        },
        kn: {
            symptoms: 'ಎಲೆಯ ಕೆಳಭಾಗದಲ್ಲಿ ಕೆಂಪು-ಕಂದು ಬಣ್ಣದ ತುಕ್ಕು ಕಲೆಗಳು. ಮೇಲ್ಭಾಗದಲ್ಲಿ ಹಳದಿ ಚುಕ್ಕೆಗಳು ಕಾಣಿಸುತ್ತವೆ.',
            cause: 'Cerotelium fici ಶಿಲೀಂಧ್ರದಿಂದ ಉಂಟಾಗುವ ಸೋಂಕು. ಹೆಚ್ಚಿನ ಆರ್ದ್ರತೆ (>80%) ಮತ್ತು 25–30°C ತಾಪಮಾನದಲ್ಲಿ ಹೆಚ್ಚಾಗುತ್ತದೆ.',
            chemical: { name: 'ಹೆಕ್ಸಾಕೊನಜೋಲ್ 5% EC (Contaf)', dosage: '1 ಲೀಟರ್ ನೀರಿಗೆ 2 ಮಿ.ಲೀ', frequency: '15 ದಿನಗಳಿಗೊಮ್ಮೆ, 2 ಬಾರಿ ಸಿಂಪಡಿಸಿ.' },
            immediate_actions: [
                'ತೀವ್ರವಾಗಿ ಸೋಂಕಿತ ಎಲೆಗಳನ್ನು ತಕ್ಷಣ ತೆಗೆದು ಸುಡಿ.',
                'ಸೋಂಕಿತ ಗಿಡಗಳಿಂದ ಎಲೆಗಳನ್ನು ಆಹಾರಕ್ಕಾಗಿ ಕೊಯ್ಯಬೇಡಿ.',
                'ಎಲೆಯ ಎರಡೂ ಬದಿಗಳಲ್ಲಿ ಶಿಲೀಂಧ್ರನಾಶಕ ಸಿಂಪಡಿಸಿ.'
            ],
            prevention: [
                'ತುಕ್ಕು-ನಿರೋಧಕ ಹಿಪ್ಪುನೇರಳೆ ತಳಿಗಳನ್ನು (S-36, V-1) ಬೆಳೆಸಿ.',
                'ಗಾಳಿ ಸಂಚಾರಕ್ಕೆ ಸೂಕ್ತ ಅಂತರ ಕಾಪಾಡಿ.',
                'ಮಳೆಗಾಲದಲ್ಲಿ ತಡೆಗಟ್ಟುವ ಶಿಲೀಂಧ್ರನಾಶಕ ಸಿಂಪಡಿಸಿ.'
            ],
            silkworm_impact: 'ತುಕ್ಕು ಸೋಂಕಿತ ಎಲೆಗಳನ್ನು ಆಹಾರವಾಗಿ ನೀಡಬೇಡಿ. ಪೌಷ್ಟಿಕಾಂಶವನ್ನು 40–60% ಕಡಿಮೆ ಮಾಡುತ್ತದೆ, ಜೀರ್ಣಕ್ರಿಯೆ ಸಮಸ್ಯೆ ಮತ್ತು ಕಳಪೆ ಗೂಡು ಗುಣಮಟ್ಟಕ್ಕೆ ಕಾರಣವಾಗುತ್ತದೆ.'
        },
        te: {
            symptoms: 'ఆకు దిగువ భాగంలో ఎర్రటి-గోధుమ నుండి ముదురు నారింజ రంగు తుప్పు మచ్చలు. పై భాగంలో పసుపు మచ్చలు కనిపిస్తాయి.',
            cause: 'Cerotelium fici అనే శిలీంధ్రం వల్ల కలిగే వ్యాధి. అధిక తేమ (>80%) మరియు 25–30°C ఉష్ణోగ్రతలో వ్యాప్తి చెందుతుంది.',
            chemical: { name: 'హెక్సాకోనజోల్ 5% EC (Contaf)', dosage: 'లీటరు నీటికి 2 మి.లీ', frequency: '15 రోజులకు ఒకసారి, 2 సార్లు పిచికారీ చేయండి.' },
            immediate_actions: [
                'తీవ్రంగా వ్యాధి సోకిన ఆకులను వెంటనే తొలగించి కాల్చండి.',
                'వ్యాధి సోకిన మొక్కల నుండి ఆకులను మేతకు కోయవద్దు.',
                'ఆకు రెండు వైపులా శిలీంధ్ర నాశినిని పిచికారీ చేయండి.'
            ],
            prevention: [
                'తుప్పు-నిరోధక మల్బరీ రకాలను (S-36, V-1) పెంచండి.',
                'గాలి ప్రసరణ కోసం సరైన అంతరం ఉంచండి.',
                'వర్షాకాలంలో నివారణ శిలీంధ్ర నాశినిని పిచికారీ చేయండి.'
            ],
            silkworm_impact: 'తుప్పు సోకిన ఆకులను మేతగా ఇవ్వవద్దు. పోషకాలను 40–60% తగ్గిస్తుంది, జీర్ణ సమస్యలు మరియు నాణ్యత లేని గూళ్లకు కారణమవుతుంది.'
        },
        hi: {
            symptoms: 'पत्ती के निचले हिस्से पर लाल-भूरे से गहरे नारंगी रंग के जंग जैसे धब्बे। ऊपरी सतह पर पीले धब्बे दिखाई देते हैं।',
            cause: 'Cerotelium fici फफूंद के कारण होने वाला संक्रमण। उच्च आर्द्रता (>80%) और 25–30°C तापमान में बढ़ता है।',
            chemical: { name: 'हेक्साकोनाज़ोल 5% EC (Contaf)', dosage: '2 मिली प्रति लीटर पानी', frequency: '15 दिनों के अंतराल पर 2 बार छिड़काव करें।' },
            immediate_actions: [
                'गंभीर रूप से संक्रमित पत्तियों को तुरंत हटाकर जला दें।',
                'संक्रमित पौधों से पत्तियां रेशम कीट के चारे के लिए न तोड़ें।',
                'पत्ती की दोनों सतहों पर फफूंदनाशक का छिड़काव करें।'
            ],
            prevention: [
                'जंग प्रतिरोधी शहतूत किस्में (S-36, V-1) लगाएं।',
                'हवा के संचार के लिए उचित दूरी बनाए रखें।',
                'मानसून के दौरान निवारक फफूंदनाशक छिड़काव करें।'
            ],
            silkworm_impact: 'जंग-संक्रमित पत्तियां न खिलाएं। पोषण को 40–60% कम करता है, पाचन संबंधी समस्याएं और खराब कोकून गुणवत्ता का कारण बनता है।'
        }
    },

    'Leaf spot': {
        en: {
            symptoms: 'Circular to irregular dark brown spots with yellowish borders. Leaves turn yellow prematurely and drop.',
            cause: 'Fungal pathogen Cercospora moricola. Thrives during rainy and humid seasons.',
            chemical: { name: 'Carbendazim 50% WP (Bavistin)', dosage: '1 gram per litre of water', frequency: 'Spray 2–3 times at 10-day intervals.' },
            immediate_actions: [
                'Remove and destroy severely spotted leaves.',
                'Spray fungicide thoroughly on all plant parts.',
                'Avoid wetting leaves during irrigation.'
            ],
            prevention: [
                'Use disease-free planting material.',
                'Apply Bordeaux mixture before monsoon onset.',
                'Maintain field sanitation — remove fallen leaves.'
            ],
            silkworm_impact: 'Heavily spotted leaves should NOT be fed — causes gut inflammation, reduced feeding, and higher Flacherie risk.'
        },
        ta: {
            symptoms: 'மஞ்சள் நிற விளிம்புகளுடன் வட்ட முதல் ஒழுங்கற்ற கருஞ்சிவப்பு புள்ளிகள். இலைகள் முன்கூட்டியே மஞ்சளாகி உதிரும்.',
            cause: 'Cercospora moricola எனும் பூஞ்சையால் ஏற்படும் நோய். மழைக்காலம் மற்றும் ஈரப்பதம் அதிகமான காலங்களில் அதிகரிக்கும்.',
            chemical: { name: 'கார்பென்டசிம் 50% WP (Bavistin)', dosage: '1 லிட்டர் தண்ணீருக்கு 1 கிராம்', frequency: '10 நாட்களுக்கு ஒருமுறை, 2–3 முறை தெளிக்கவும்.' },
            immediate_actions: [
                'கடுமையாக புள்ளி பாதிப்புள்ள இலைகளை அகற்றி அழிக்கவும்.',
                'செடியின் அனைத்து பாகங்களிலும் பூஞ்சைக்கொல்லியை நன்கு தெளிக்கவும்.',
                'நீர்ப்பாசனத்தின் போது இலைகள் நனையாமல் பார்த்துக் கொள்ளவும்.'
            ],
            prevention: [
                'நோய் இல்லாத நடவு பொருட்களை பயன்படுத்தவும்.',
                'மழைக்காலம் தொடங்குவதற்கு முன் போர்டோ கலவையை தெளிக்கவும்.',
                'வயல் சுத்தத்தை பராமரிக்கவும் — உதிர்ந்த இலைகளை அகற்றவும்.'
            ],
            silkworm_impact: 'அதிக புள்ளி பாதிப்புள்ள இலைகளை உணவாக கொடுக்க வேண்டாம் — குடல் அழற்சி, குறைந்த உணவு உட்கொள்ளல் மற்றும் Flacherie ஆபத்தை அதிகரிக்கும்.'
        },
        kn: {
            symptoms: 'ಹಳದಿ ಅಂಚುಗಳೊಂದಿಗೆ ವೃತ್ತಾಕಾರದ ಅಥವಾ ಅನಿಯಮಿತ ಕಂದು ಬಣ್ಣದ ಚುಕ್ಕೆಗಳು. ಎಲೆಗಳು ಮುಂಚಿತವಾಗಿ ಹಳದಿಯಾಗಿ ಉದುರುತ್ತವೆ.',
            cause: 'Cercospora moricola ಶಿಲೀಂಧ್ರದಿಂದ ಉಂಟಾಗುತ್ತದೆ. ಮಳೆಗಾಲ ಮತ್ತು ಆರ್ದ್ರ ಋತುಗಳಲ್ಲಿ ಹೆಚ್ಚಾಗುತ್ತದೆ.',
            chemical: { name: 'ಕಾರ್ಬೆಂಡಜಿಮ್ 50% WP (Bavistin)', dosage: '1 ಲೀಟರ್ ನೀರಿಗೆ 1 ಗ್ರಾಂ', frequency: '10 ದಿನಗಳಿಗೊಮ್ಮೆ, 2–3 ಬಾರಿ ಸಿಂಪಡಿಸಿ.' },
            immediate_actions: [
                'ತೀವ್ರವಾಗಿ ಚುಕ್ಕೆ ಬಿದ್ದ ಎಲೆಗಳನ್ನು ತೆಗೆದು ನಾಶಪಡಿಸಿ.',
                'ಗಿಡದ ಎಲ್ಲಾ ಭಾಗಗಳಲ್ಲಿ ಶಿಲೀಂಧ್ರನಾಶಕ ಸಿಂಪಡಿಸಿ.',
                'ನೀರಾವರಿ ಸಮಯದಲ್ಲಿ ಎಲೆಗಳು ಒದ್ದೆಯಾಗದಂತೆ ನೋಡಿಕೊಳ್ಳಿ.'
            ],
            prevention: [
                'ರೋಗ ಮುಕ್ತ ನಾಟಿ ಸಾಮಗ್ರಿಗಳನ್ನು ಬಳಸಿ.',
                'ಮಳೆಗಾಲದ ಮೊದಲು ಬೋರ್ಡೋ ಮಿಶ್ರಣ ಸಿಂಪಡಿಸಿ.',
                'ಹೊಲದ ಸ್ವಚ್ಛತೆ ಕಾಪಾಡಿ — ಉದುರಿದ ಎಲೆಗಳನ್ನು ತೆಗೆಯಿರಿ.'
            ],
            silkworm_impact: 'ಹೆಚ್ಚು ಚುಕ್ಕೆ ಬಿದ್ದ ಎಲೆಗಳನ್ನು ಆಹಾರವಾಗಿ ನೀಡಬೇಡಿ — ಕರುಳಿನ ಉರಿಯೂತ, ಕಡಿಮೆ ಆಹಾರ ಸೇವನೆ ಮತ್ತು Flacherie ಅಪಾಯ ಹೆಚ್ಚಿಸುತ್ತದೆ.'
        },
        te: {
            symptoms: 'పసుపు అంచులతో వృత్తాకార లేదా అసమాన ముదురు గోధుమ రంగు మచ్చలు. ఆకులు ముందుగానే పసుపు రంగులోకి మారి రాలిపోతాయి.',
            cause: 'Cercospora moricola శిలీంధ్రం వల్ల కలుగుతుంది. వర్షాకాలం మరియు తేమతో కూడిన కాలాల్లో వ్యాప్తి చెందుతుంది.',
            chemical: { name: 'కార్బెండజిమ్ 50% WP (Bavistin)', dosage: 'లీటరు నీటికి 1 గ్రాము', frequency: '10 రోజులకు ఒకసారి, 2–3 సార్లు పిచికారీ చేయండి.' },
            immediate_actions: [
                'తీవ్రంగా మచ్చలు పడిన ఆకులను తొలగించి నాశనం చేయండి.',
                'మొక్క యొక్క అన్ని భాగాలపై శిలీంధ్ర నాశినిని పిచికారీ చేయండి.',
                'నీటిపారుదల సమయంలో ఆకులు తడవకుండా చూసుకోండి.'
            ],
            prevention: [
                'వ్యాధి రహిత నాటడం సామగ్రిని ఉపయోగించండి.',
                'వర్షాకాలం ప్రారంభానికి ముందు బోర్డో మిశ్రమాన్ని పిచికారీ చేయండి.',
                'పొలం పరిశుభ్రతను కాపాడండి — రాలిన ఆకులను తొలగించండి.'
            ],
            silkworm_impact: 'ఎక్కువగా మచ్చలు పడిన ఆకులను మేతగా ఇవ్వవద్దు — పేగు వాపు, తక్కువ మేత తినడం మరియు Flacherie ప్రమాదాన్ని పెంచుతుంది.'
        },
        hi: {
            symptoms: 'पीले किनारों के साथ गोलाकार से अनियमित गहरे भूरे धब्बे। पत्तियां समय से पहले पीली होकर गिर जाती हैं।',
            cause: 'Cercospora moricola फफूंद के कारण। बरसात और नम मौसम में बढ़ता है।',
            chemical: { name: 'कार्बेन्डाज़िम 50% WP (Bavistin)', dosage: '1 ग्राम प्रति लीटर पानी', frequency: '10 दिनों के अंतराल पर 2–3 बार छिड़काव करें।' },
            immediate_actions: [
                'गंभीर रूप से धब्बेदार पत्तियों को हटाकर नष्ट करें।',
                'पौधे के सभी हिस्सों पर फफूंदनाशक का अच्छी तरह छिड़काव करें।',
                'सिंचाई के दौरान पत्तियों को गीला होने से बचाएं।'
            ],
            prevention: [
                'रोग-मुक्त रोपण सामग्री का उपयोग करें।',
                'मानसून शुरू होने से पहले बोर्डो मिश्रण लगाएं।',
                'खेत की स्वच्छता बनाए रखें — गिरी हुई पत्तियां हटाएं।'
            ],
            silkworm_impact: 'अत्यधिक धब्बेदार पत्तियां न खिलाएं — आंत में सूजन, कम भोजन ग्रहण और Flacherie का खतरा बढ़ाता है।'
        }
    },

    'Disease Free leaves': {
        en: {
            symptoms: 'Vibrant green, crisp, smooth leaves with no spots, rust, or discoloration.',
            cause: 'Healthy plant with optimal nutrients and care.',
            chemical: { name: 'No chemical treatment needed', dosage: 'N/A', frequency: 'N/A' },
            immediate_actions: ['Harvest fresh leaves in early morning or late evening.', 'Preserve harvested leaves under damp cloth.'],
            prevention: ['Continue regular watering and composting.', 'Monitor leaves weekly for early disease signs.'],
            silkworm_impact: 'SAFE: Excellent quality leaves! High moisture and protein content, optimal for silkworm growth and top-quality silk.'
        },
        ta: {
            symptoms: 'புள்ளிகள், துரு அல்லது நிறமாற்றம் இல்லாத பளபளப்பான பச்சை நிற இலைகள்.',
            cause: 'சரியான ஊட்டச்சத்து மற்றும் பராமரிப்புடன் ஆரோக்கியமான செடி.',
            chemical: { name: 'இரசாயன சிகிச்சை தேவையில்லை', dosage: 'இல்லை', frequency: 'இல்லை' },
            immediate_actions: ['அதிகாலை அல்லது மாலையில் புதிய இலைகளை அறுவடை செய்யவும்.', 'அறுவடை செய்த இலைகளை ஈரமான துணியின் கீழ் வைத்திருக்கவும்.'],
            prevention: ['தொடர்ந்து நீர்ப்பாசனம் மற்றும் உரமிடுதலை தொடரவும்.', 'ஒவ்வொரு வாரமும் இலைகளை ஆய்வு செய்யவும்.'],
            silkworm_impact: 'பாதுகாப்பானது: சிறந்த தரமான இலைகள்! அதிக ஈரப்பதம் மற்றும் புரதம், பட்டுப்புழு வளர்ச்சிக்கும் உயர்தர பட்டுக்கும் ஏற்றது.'
        },
        kn: {
            symptoms: 'ಚುಕ್ಕೆಗಳು, ತುಕ್ಕು ಅಥವಾ ಬಣ್ಣ ಬದಲಾವಣೆ ಇಲ್ಲದ ಹೊಳಪುಳ್ಳ ಹಸಿರು ಎಲೆಗಳು.',
            cause: 'ಸೂಕ್ತ ಪೋಷಕಾಂಶ ಮತ್ತು ಆರೈಕೆಯೊಂದಿಗೆ ಆರೋಗ್ಯಕರ ಗಿಡ.',
            chemical: { name: 'ರಾಸಾಯನಿಕ ಚಿಕಿತ್ಸೆ ಅಗತ್ಯವಿಲ್ಲ', dosage: 'ಇಲ್ಲ', frequency: 'ಇಲ್ಲ' },
            immediate_actions: ['ಮುಂಜಾನೆ ಅಥವಾ ಸಂಜೆ ತಾಜಾ ಎಲೆಗಳನ್ನು ಕೊಯ್ಯಿರಿ.', 'ಕೊಯ್ದ ಎಲೆಗಳನ್ನು ಒದ್ದೆ ಬಟ್ಟೆಯಡಿ ಇಡಿ.'],
            prevention: ['ನಿಯಮಿತ ನೀರಾವರಿ ಮತ್ತು ಗೊಬ್ಬರ ಮುಂದುವರಿಸಿ.', 'ಪ್ರತಿ ವಾರ ಎಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.'],
            silkworm_impact: 'ಸುರಕ್ಷಿತ: ಅತ್ಯುತ್ತಮ ಗುಣಮಟ್ಟದ ಎಲೆಗಳು! ಹೆಚ್ಚಿನ ತೇವಾಂಶ ಮತ್ತು ಪ್ರೋಟೀನ್, ರೇಷ್ಮೆ ಹುಳುಗಳ ಬೆಳವಣಿಗೆಗೆ ಸೂಕ್ತ.'
        },
        te: {
            symptoms: 'మచ్చలు, తుప్పు లేదా రంగు మార్పు లేని మెరిసే ఆకుపచ్చ ఆకులు.',
            cause: 'సరైన పోషకాలు మరియు సంరక్షణతో ఆరోగ్యకరమైన మొక్క.',
            chemical: { name: 'రసాయన చికిత్స అవసరం లేదు', dosage: 'లేదు', frequency: 'లేదు' },
            immediate_actions: ['ఉదయం లేదా సాయంత్రం తాజా ఆకులను కోయండి.', 'కోసిన ఆకులను తడి గుడ్డ కింద ఉంచండి.'],
            prevention: ['నిరంతర నీటిపారుదల మరియు ఎరువు వేయడం కొనసాగించండి.', 'ప్రతి వారం ఆకులను పరిశీలించండి.'],
            silkworm_impact: 'సురక్షితం: అద్భుతమైన నాణ్యత ఆకులు! అధిక తేమ మరియు ప్రోటీన్, పట్టుపురుగుల పెరుగుదలకు అనువైనది.'
        },
        hi: {
            symptoms: 'बिना धब्बे, जंग या रंग परिवर्तन के चमकदार हरी पत्तियां।',
            cause: 'उचित पोषक तत्वों और देखभाल के साथ स्वस्थ पौधा।',
            chemical: { name: 'किसी रासायनिक उपचार की आवश्यकता नहीं', dosage: 'लागू नहीं', frequency: 'लागू नहीं' },
            immediate_actions: ['सुबह या शाम को ताजी पत्तियां तोड़ें।', 'तोड़ी गई पत्तियों को नम कपड़े के नीचे रखें।'],
            prevention: ['नियमित सिंचाई और खाद देना जारी रखें।', 'हर सप्ताह पत्तियों की जांच करें।'],
            silkworm_impact: 'सुरक्षित: उत्कृष्ट गुणवत्ता वाली पत्तियां! उच्च नमी और प्रोटीन, रेशम कीट की वृद्धि के लिए उत्तम।'
        }
    }
};

// SILKWORM DISEASES MULTI-LANGUAGE DB
export const SILKWORM_DISEASE_TRANSLATIONS = {
    'Grasserie': {
        en: {
            disease: 'Grasserie (Jaundice)',
            category: 'Viral Disease (BmNPV)',
            mortality_risk: 'High (30% - 80% crop loss)',
            description: 'Caused by BmNPV virus. Swollen body segments, milky fluid leakage, worms restless before death.',
            treatment: [
                'Remove and burn infected larvae immediately using pincers.',
                'Dust Vijetha / Resham Jyothi or Sanjeevini powder over worms after molting.',
                'Maintain adequate ventilation in the rearing room.'
            ],
            prevention: [
                'Disinfect rearing room with 2% Formalin or 5% Bleaching powder solution.',
                'Avoid high temperatures (>28°C) combined with high humidity during late instars.',
                'Feed good quality, non-diseased mulberry leaves.'
            ]
        },
        ta: {
            disease: 'கிராஸரி (மஞ்சள் நோய் / Grasserie)',
            category: 'வைரஸ் நோய் (BmNPV)',
            mortality_risk: 'அதிகம் (30% - 80% மகசூல் இழப்பு)',
            description: 'BmNPV வைரஸால் ஏற்படுகிறது. உடலின் கணுக்கள் வீங்கி, பால் போன்ற திரவம் கசியும். புழுக்கள் பதற்றத்துடன் நகரும்.',
            treatment: [
                'பாதிக்கப்பட்ட புழுக்களை இடுக்கிகளால் பிடித்து உடனடியாக எரிக்கவும்.',
                'தோலுரித்த பிறகு விஜேதா / ரேஷம் ஜோதி / சஞ்சீவினி பொடியைத் தூவவும்.',
                'வளர்ப்பு அறையில் காற்றோட்டத்தை அதிகரிக்கவும்.'
            ],
            prevention: [
                'வளர்ப்பு அறையை 2% பார்மலின் அல்லது 5% பிளீச்சிங் பவுடர் கரைசலால் கிருமி நீக்கம் செய்யவும்.',
                'கடைசி நிலைகளில் அதிக வெப்பநிலை (>28°C) மற்றும் ஈரப்பதத்தைத் தவிர்க்கவும்.',
                'தரமான, நோய் இல்லாத மல்பெரி இலைகளை உணவாகக் கொடுக்கவும்.'
            ]
        },
        kn: {
            disease: 'ಗ್ರಾಸರಿ (ಕಾಮಾಲೆ ರೋಗ / Grasserie)',
            category: 'ವೈರಲ್ ರೋಗ (BmNPV)',
            mortality_risk: 'ಹೆಚ್ಚು (30% - 80% ನಷ್ಟ)',
            description: 'BmNPV ವೈರಸ್‌ನಿಂದ ಉಂಟಾಗುತ್ತದೆ. ದೇಹದ ಭಾಗಗಳು ಉಬ್ಬುತ್ತವೆ ಮತ್ತು ಹಾಲಿನಂತಹ ಬಿಳಿ ದ್ರವ ಸೋರುತ್ತದೆ.',
            treatment: [
                'ಸೋಂಕಿತ ಹುಳುಗಳನ್ನು ತಕ್ಷಣವೇ ಸುಟ್ಟುಹಾಕಿ.',
                'ಕೋಶ ವಿಸರ್ಜನೆ ನಂತರ ವಿಜೇತಾ/ಸಂಜೀವಿನಿ ಪುಡಿ ಸಿಂಪಡಿಸಿ.',
                'ಸಾಕಾಣಿಕೆ ಕೊಠಡಿಯಲ್ಲಿ ಗಾಳಿ ಸಂಚಾರ ಹೆಚ್ಚಿಸಿ.'
            ],
            prevention: [
                '೨% ಫಾರ್ಮಾಲಿನ್ ಅಥವಾ ೫% ಬ್ಲೀಚಿಂಗ್ ಪೌಡರ್‌ನಿಂದ ಕೊಠಡಿ ಸೋಂಕುರಹಿತಗೊಳಿಸಿ.',
                'ಹೆಚ್ಚಿನ ತಾಪಮಾನ ಮತ್ತು ಆರ್ದ್ರತೆ ತಡೆಯಿರಿ.',
                'ಉತ್ತಮ ಗುಣಮಟ್ಟದ ಹಿಪ್ಪುನೇರಳೆ ಎಲೆಗಳನ್ನು ನೀಡಿ.'
            ]
        },
        te: {
            disease: 'గ్రాసరీ (పచ్చకామెర్లు / Grasserie)',
            category: 'వైరస్ వ్యాధి (BmNPV)',
            mortality_risk: 'అధికం (30% - 80% నష్టం)',
            description: 'BmNPV వైరస్ వల్ల వస్తుంది. శరీరం వాచి, తెల్లటి పాలు వంటి ద్రవం కారుతుంది.',
            treatment: [
                'వ్యాధి సోకిన పురుగులను వెంటనే వేరు చేసి కాల్చండి.',
                'చర్మం విసర్జించిన తర్వాత విజేతా పొడి చల్లండి.',
                'పెరటి గదిలో గాలి ప్రసరణను పెంచండి.'
            ],
            prevention: [
                '2% ఫార్మాలిన్ ద్రావణంతో గదిని క్రిమిసంహారక చేయండి.',
                'అధిక ఉష్ణోగ్రత మరియు తేమను నివారించండి.',
                'మంచి నాణ్యమైన ఆకులను మేతగా ఇవ్వండి.'
            ]
        },
        hi: {
            disease: 'ग्रासरी (पीलिया रोग / Grasserie)',
            category: 'वायरस जनित (BmNPV)',
            mortality_risk: 'उच्च (30% - 80% फसल नुकसान)',
            description: 'BmNPV वायरस के कारण होता है। शरीर सूज जाता है और दूधिया सफेद तरल बहने लगता है।',
            treatment: [
                'संक्रमित कीड़ों को तुरंत हटाकर जला दें।',
                'मोल्टिंग के बाद विजेथा/संजीवनी पाउडर छिड़कें।',
                'पालन कक्ष में वेंटिलेशन बढ़ाएं।'
            ],
            prevention: [
                '2% फॉर्मेलिन सॉल्यूशन से कमरे को कीटाणुरहित करें।',
                'उच्च तापमान और आर्द्रता से बचें।',
                'अच्छी गुणवत्ता वाली पत्तियां खिलाएं।'
            ]
        }
    },
    'Flacherie': {
        en: {
            disease: 'Flacherie (Gut Infection / Soft Sickness)',
            category: 'Bacterial & Infectious Virus',
            mortality_risk: 'Severe (40% - 90% crop loss)',
            description: 'Bacterial/viral gut infection leading to appetite loss, gut discoloration, foul odor, and body softening.',
            treatment: [
                'Pick out sluggish and soft larvae and dispose of them in 5% lime bath.',
                'Dust Bed Disinfectant (Labex / Vijetha) on rearing bed every morning.',
                'Reduce leaf feed volume slightly if worms show indigestion.'
            ],
            prevention: [
                'Avoid feeding wet, fermenting, or coarse over-aged leaves.',
                'Maintain strict thermal control: prevent rapid temperature fluctuation.',
                'Clean rearing beds regularly to avoid feces accumulation.'
            ]
        },
        ta: {
            disease: 'பிளாச்சேரி (குடல் நோய் / Flacherie)',
            category: 'பாக்டீரியா மற்றும் வைரஸ் நோய்',
            mortality_risk: 'மிக அதிகம் (40% - 90% மகசூல் இழப்பு)',
            description: 'குடல் தொற்று நோயால் பசியின்மை, உடல் தளர்ந்து போதல், துர்நாற்றம் மற்றும் உடல் கருமையாதல் ஏற்படும்.',
            treatment: [
                'சுறுசுறுப்பற்ற மற்றும் தளர்ந்த புழுக்களை 5% சுன்னாம்பு கரைசலில் போட்டு அழிக்கவும்.',
                'ஒவ்வொரு காலையிலும் வளர்ப்பு படுக்கையில் விஜேதா பவுடர் தூவவும்.',
                'செரிமானமின்மை இருந்தால் உணவளிக்கும் அளவை சற்று குறைக்கவும்.'
            ],
            prevention: [
                'ஈரமான, நொதித்த அல்லது முற்றிய இலைகளை உணவாகக் கொடுப்பதைத் தவிர்க்கவும்.',
                'அறை வெப்பநிலையில் திடீர் மாற்றங்கள் ஏற்படுவதைத் தடுக்கவும்.',
                'கழிவுகள் தேங்குவதைத் தவிர்க்க படுக்கையை தவறாமல் சுத்தம் செய்யவும்.'
            ]
        },
        kn: {
            disease: 'ಫ್ಲಾಚರಿ (ಕರುಳಿನ ರೋಗ / Flacherie)',
            category: 'ಬ್ಯಾಕ್ಟೀರಿಯಾ ಮತ್ತು ವೈರಸ್',
            mortality_risk: 'ತೀವ್ರ (40% - 90% ನಷ್ಟ)',
            description: 'ಹಸಿವು ನಾಶ, ದೇಹ ಮೆತ್ತಗಾಗುವುದು ಮತ್ತು ದುರ್ವಾಸನೆ ಉಂಟಾಗುತ್ತದೆ.',
            treatment: [
                'ಮೆತ್ತಗಾದ ಹುಳುಗಳನ್ನು ೫% ಸುಣ್ಣದ ನೀರಿನಲ್ಲಿ ಹಾಕಿ ನಾಶಪಡಿಸಿ.',
                'ಪ್ರತಿದಿನ ಬೆಳಿಗ್ಗೆ ವಿಜೇತಾ ಪುಡಿ ಸಿಂಪಡಿಸಿ.',
                'ಆಹಾರದ ಪ್ರಮಾಣವನ್ನು ಸ್ವಲ್ಪ ಕಡಿಮೆ ಮಾಡಿ.'
            ],
            prevention: [
                'ಒದ್ದೆಯಾದ ಅಥವಾ ಹಳೆಯ ಎಲೆಗಳನ್ನು ನೀಡಬೇಡಿ.',
                'ತಾಪಮಾನದ ಏರಿಳಿತ ತಡೆಯಿರಿ.',
                'ಸಾಕಾಣಿಕೆ ಹಾಸಿಗೆಯನ್ನು ಸ್ವಚ್ಛವಾಗಿಡಿ.'
            ]
        },
        te: {
            disease: 'ఫ్లాచేరీ (పేగు వ్యాధి / Flacherie)',
            category: 'బ్యాక్టీరియా మరియు వైరస్',
            mortality_risk: 'తీవ్రమైనది (40% - 90% నష్టం)',
            description: 'ఆకలి మందగించడం, శరీరం మెత్తబడటం మరియు దుర్వాసన రావడం జరుగుతుంది.',
            treatment: [
                'మెత్తబడిన పురుగులను 5% సున్నపు నీటిలో వేసి నాశనం చేయండి.',
                'ప్రతి ఉదయం పెంపకం బెడ్‌పై పొడి చల్లండి.',
                'మేత పరిమాణాన్ని కాస్త తగ్గించండి.'
            ],
            prevention: [
                'తడి లేదా ముదిరిన ఆకులను వేయవద్దు.',
                'ఉష్ణోగ్రత మార్పులను నివారించండి.',
                'బెడ్‌ను క్రమం తప్పకుండా శుభ్రం చేయండి.'
            ]
        },
        hi: {
            disease: 'फ्लेचरी (आंत का रोग / Flacherie)',
            category: 'जीवाणु और वायरस जनित',
            mortality_risk: 'गंभीर (40% - 90% फसल नुकसान)',
            description: 'भूख में कमी, शरीर का नरम होना और बदबू आना इसके मुख्य लक्षण हैं।',
            treatment: [
                'सुस्त कीड़ों को 5% चूने के पानी में डालकर नष्ट करें।',
                'रोज सुबह बेड पर विजेथा पाउडर छिड़कें।',
                'भोजन की मात्रा थोड़ी कम करें।'
            ],
            prevention: [
                'गीली या बासी पत्तियां न खिलाएं।',
                'तापमान में अचानक बदलाव से बचें।',
                'बेड की सफाई नियमित रूप से करें।'
            ]
        }
    },
    'Muscardine': {
        en: {
            disease: 'Muscardine (White Calcino)',
            category: 'Fungal Disease (Beauveria bassiana)',
            mortality_risk: 'Extreme (up to 100% loss)',
            description: 'Fungal infection causing body stiffening into a chalky-white mummy covered with white spores.',
            treatment: [
                'Dust Dithane M-45 (2%) mixed with lime powder on larvae after molting.',
                'Isolate affected trays and burn mummified corpses immediately.',
                'Keep humidity strictly below 70% during 4th and 5th instar.'
            ],
            prevention: [
                'Spray 2% Bleaching Powder in 0.3% Slaked Lime solution before rearing.',
                'Avoid damp environments and keep rearing beds dry.',
                'Ensure proper ventilation during rainy seasons.'
            ]
        },
        ta: {
            disease: 'மஸ்கார்டின் (சுண்ணாம்பு நோய் / Muscardine)',
            category: 'பூஞ்சை நோய் (Beauveria bassiana)',
            mortality_risk: 'மிகவும் ஆபத்தானது (100% இழப்பு அபாயம்)',
            description: 'பூஞ்சை தொற்றால் புழுவின் உடல் விறைத்து, சுண்ணாம்பு போன்ற வெள்ளைப் பொடியால் மூடப்பட்டு இறந்துவிடும்.',
            treatment: [
                'தோலுரித்த பிறகு புழுக்கள் மீது சுன்னாம்பு பொடியுடன் கலந்த டைத்தேன் M-45 தெளிக்கவும்.',
                'பாதிக்கப்பட்ட தட்டுகளை பிரித்து, இறந்து விறைத்த புழுக்களை உடனடியாக எரிக்கவும்.',
                '4 மற்றும் 5 ஆம் நிலைகளில் ஈரப்பதத்தை 70% க்கும் குறைவாக பராமரிக்கவும்.'
            ],
            prevention: [
                'வளர்ப்பிற்கு முன் 2% பிளீச்சிங் பவுடர் மற்றும் சுண்ணாம்பு கரைசலை சுவர்களில் தெளிக்கவும்.',
                'ஈரப்பதம் நிறைந்த சூழலைத் தவிர்த்து வளர்ப்பு படுக்கையை உலர்ந்ததாக வைக்கவும்.',
                'மழைக்காலத்தில் போதிய காற்றோட்டத்தை உறுதி செய்யவும்.'
            ]
        },
        kn: {
            disease: 'ಮಸ್ಕಾರ್ಡಿನ್ (ಸುಣ್ಣದ ರೋಗ / Muscardine)',
            category: 'ಶಿಲೀಂಧ್ರ ರೋಗ (Beauveria bassiana)',
            mortality_risk: 'ಅತ್ಯಂತ ತೀವ್ರ (100% ನಷ್ಟ)',
            description: 'ದೇಹ ಗಟ್ಟಿಯಾಗಿ ಸುಣ್ಣದಂತಹ ಬಿಳಿ ಪುಡಿಯಿಂದ ಮುಚ್ಚಲ್ಪಡುತ್ತದೆ.',
            treatment: [
                'ಸುಣ್ಣದ ಪುಡಿಯೊಂದಿಗೆ ಡೈಥೇನ್ M-45 ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ.',
                'ಸೋಂಕಿತ ಹುಳುಗಳನ್ನು ತಕ್ಷಣ ಸುಟ್ಟುಹಾಕಿ.',
                'ಆರ್ದ್ರತೆಯನ್ನು ೭೦% ಗಿಂತ ಕಡಿಮೆ ಇರಿಸಿ.'
            ],
            prevention: [
                '೨% ಬ್ಲೀಚಿಂಗ್ ಪೌಡರ್‌ನಿಂದ ಕೊಠಡಿ ಸಿಂಪಡಿಸಿ.',
                'ಸಾಕಾಣಿಕೆ ಹಾಸಿಗೆಯನ್ನು ಒಣಗಿಸಿಡಿ.',
                'ಮಳೆಗಾಲದಲ್ಲಿ ಗಾಳಿ ಸಂಚಾರ ಕಾಪಾಡಿ.'
            ]
        },
        te: {
            disease: 'మస్కార్డిన్ (సున్నపు వ్యాధి / Muscardine)',
            category: 'శిలీంధ్ర వ్యాధి (Beauveria bassiana)',
            mortality_risk: 'అత్యంత తీవ్రం (100% నష్టం)',
            description: 'శరీరం గట్టిపడి సున్నం వంటి తెల్లటి పొడితో కప్పబడి చనిపోతుంది.',
            treatment: [
                'సున్నపు పొడితో డైథేన్ M-45 కలిపి చల్లండి.',
                'చనిపోయిన పురుగులను వెంటనే కాల్చండి.',
                'తేమను 70% కంటే తక్కువగా ఉంచండి.'
            ],
            prevention: [
                '2% బ్లీచింగ్ పౌడర్‌తో గదిని స్ప్రే చేయండి.',
                'పెంపకం బెడ్‌ను పొడిగా ఉంచండి.',
                'వర్షాకాలంలో గాలి వెలుతురు ఉండేలా చూడండి.'
            ]
        },
        hi: {
            disease: 'मस्कार्डिन (चूना रोग / Muscardine)',
            category: 'फफूंद जनित (Beauveria bassiana)',
            mortality_risk: 'अत्यधिक गंभीर (100% तक नुकसान)',
            description: 'शरीर कड़ा हो जाता है और सफेद चूने जैसी पाउडर से ढक जाता है।',
            treatment: [
                'चूने के पाउडर के साथ डायथेन M-45 मिलाकर छिड़कें।',
                'मरे हुए कीड़ों को तुरंत जला दें।',
                'आर्द्रता 70% से कम रखें।'
            ],
            prevention: [
                '2% ब्लीचिंग पाउडर से कमरे का छिड़काव करें।',
                'बेड को सूखा रखें।',
                'उचित वेंटिलेशन सुनिश्चित करें।'
            ]
        }
    },
    'Pebrine': {
        en: {
            disease: 'Pebrine (Pepper Disease)',
            category: 'Protozoan Microsporidian',
            mortality_risk: 'Catastrophic (Transmissible through eggs)',
            description: 'Chronic protozoan disease causing irregular growth, pepper-like skin spots, and total crop failure.',
            treatment: [
                'No cure available; infected batch must be destroyed completely.',
                'Thoroughly burn all silkworms, litter, and cocoons of the infected lot.',
                'Fumigate rearing house with Formaldehyde gas for 24 hours.'
            ],
            prevention: [
                'Use strictly certified Disease-Free Layings (DFLs).',
                'Disinfect all rearing appliances in 2% Formalin solution.',
                'Wash hands with disinfectant before handling worms.'
            ]
        },
        ta: {
            disease: 'பெப்ரின் (மிளகு நோய் / Pebrine)',
            category: 'புரோட்டோசோவா நோய் (Nosema bombycis)',
            mortality_risk: 'முழுமையான பயிர் அழிவு (முட்டை வழியாக பரவும்)',
            description: 'உடலில் கருமிளகு போன்ற புள்ளிகள், சீரற்ற வளர்ச்சி மற்றும் முட்டை வழியாக பரவி பயிரை முழுமையாக அழிக்கும் நோய்.',
            treatment: [
                'சிகிச்சை இல்லை; பாதிக்கப்பட்ட புழுத் தொகுதியை முழுமையாக அழிக்க வேண்டும்.',
                'பாதிக்கப்பட்ட புழுக்கள், கழிவுகள் மற்றும் கூடுகளை எரிக்க வேண்டும்.',
                'வளர்ப்பு வீட்டை பார்மால்டிஹைட் வாயுவால் புகையூட்டம் செய்ய வேண்டும்.'
            ],
            prevention: [
                'சான்றளிக்கப்பட்ட நோய் இல்லாத முட்டைகளை (DFLs) மட்டுமே பயன்படுத்தவும்.',
                'அனைத்து உபகரணங்களையும் 2% பார்மலின் கரைசலில் கிருமி நீக்கம் செய்யவும்.',
                'புழுக்களைக் கையாளுவதற்கு முன் கைகளை கிருமி நாசினியால் கழுவவும்.'
            ]
        },
        kn: {
            disease: 'ಪೆಬ್ರಿನ್ (ಕಾಳುಮೆಣಸಿನ ರೋಗ / Pebrine)',
            category: 'ಪ್ರೋಟೋಜೋವಾ ರೋಗ',
            mortality_risk: 'ಸಂಪೂರ್ಣ ಬೆಳೆ ನಾಶ',
            description: 'ದೇಹದ ಮೇಲೆ ಕಪ್ಪು ಚುಕ್ಕೆಗಳು ಮತ್ತು ಅಸಮಾನ ಬೆಳವಣಿಗೆ ಉಂಟಾಗುತ್ತದೆ.',
            treatment: [
                'ಯಾವುದೇ ಚಿಕಿತ್ಸೆ ಇಲ್ಲ; ಸೋಂಕಿತ ಪಡೆಯನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ನಾಶಪಡಿಸಿ.',
                'ಎಲ್ಲಾ ಹುಳುಗಳು ಮತ್ತು ತ್ಯಾಜ್ಯವನ್ನು ಸುಟ್ಟುಹಾಕಿ.',
                'ಕೊಠಡಿಗೆ ಫಾರ್ಮಾಲ್ಡಿಹೈಡ್ ಅನಿಲ ಧೂಪನ ಮಾಡಿ.'
            ],
            prevention: [
                'ಪ್ರಮಾಣೀಕೃತ ರೋಗಮುಕ್ತ ತಟ್ಟೆಗಳನ್ನು (DFLs) ಬಳಸಿ.',
                'ಉಪಕರಣಗಳನ್ನು ೨% ಫಾರ್ಮಾಲಿನ್‌ನಲ್ಲಿ ಸೋಂಕುರಹಿತಗೊಳಿಸಿ.',
                'ಕೈಗಳನ್ನು ಸೋಂಕುನಿವಾರಕದಿಂದ ತೊಳೆಯಿರಿ.'
            ]
        },
        te: {
            disease: 'పెబ్రిన్ (మిరియాల వ్యాధి / Pebrine)',
            category: 'ప్రోటోజోవా వ్యాధి',
            mortality_risk: 'పూర్తి పంట నష్టం',
            description: 'చర్మంపై నల్లటి మచ్చలు మరియు అసమాన పెరుగుదల కనిపిస్తుంది.',
            treatment: [
                'చికిత్స లేదు; వ్యాధి సోకిన బ్యాచ్‌ను పూర్తిగా నాశనం చేయాలి.',
                'పురుగులు మరియు చెత్తను కాల్చివేయండి.',
                'గదికి ఫార్మాల్డిహైడ్ పొగ వేయండి.'
            ],
            prevention: [
                'సర్టిఫైడ్ వ్యాధి రహిత గ్రుడ్లను (DFLs) మాత్రమే వాడండి.',
                'పరికరాలను 2% ఫార్మాలిన్‌లో శుభ్రం చేయండి.',
                'చేతులను శుభ్రంగా కడుక్కోండి.'
            ]
        },
        hi: {
            disease: 'पेब्रिन (काली मिर्च रोग / Pebrine)',
            category: 'प्रोटोज़ोआ जनित',
            mortality_risk: 'पूर्ण फसल विनाश',
            description: 'शरीर पर काले धब्बे और असमान वृद्धि इसके लक्षण हैं।',
            treatment: [
                'कोई इलाज नहीं है; संक्रमित बैच को पूरी तरह नष्ट कर दें।',
                'सभी कीड़ों और कचरे को जला दें।',
                'कमरे में फॉर्मलाडेहाइड गैस का धुआं करें।'
            ],
            prevention: [
                'प्रमाणित रोग-मुक्त अंडों (DFLs) का ही उपयोग करें।',
                'उपकरणों को 2% फॉर्मेलिन में कीटाणुरहित करें।',
                'हाथों को अच्छी तरह धोएं।'
            ]
        }
    }
};

// SYMPTOMS TRANSLATIONS DB
export const SILKWORM_SYMPTOMS_TRANSLATIONS = [
    {
        id: 'body_swelling',
        disease: 'Grasserie',
        labels: {
            en: 'Body segments swollen and shiny (like bamboo knots)',
            ta: 'உடலின் கணுக்கள் வீங்கி பளபளப்பாக மாறுதல் (மூங்கில் கணுக்கள் போல)',
            kn: 'ದೇಹದ ಭಾಗಗಳು ಉಬ್ಬುವುದು ಮತ್ತು ಹೊಳೆಯುವುದು',
            te: 'శరీర భాగాలు వాచి మెరవడం',
            hi: 'शरीर के खंड सूजे हुए और चमकदार होना'
        }
    },
    {
        id: 'milky_fluid',
        disease: 'Grasserie',
        labels: {
            en: 'Tissues turn fragile & leak milky white hemolymph upon rupture',
            ta: 'தோல் மெலிந்து உடைந்து பால் போன்ற வெள்ளை திரவம் கசிதல்',
            kn: 'ದೇಹ ಒಡೆದು ಹಾಲಿನಂತಹ ಬಿಳಿ ದ್ರವ ಸೋರುವುದು',
            te: 'చర్మం పగిలి తెల్లటి పాలు వంటి ద్రవం కారడం',
            hi: 'त्वचा फटने पर दूधिया सफेद तरल बहना'
        }
    },
    {
        id: 'restless_crawling',
        disease: 'Grasserie',
        labels: {
            en: 'Worms crawl restlessly to rim of tray and hang head down',
            ta: 'புழுக்கள் பதற்றத்துடன் தட்டின் விளிம்பிற்கு ஊர்ந்து தலைகீழாக தொங்குதல்',
            kn: 'ಹುಳುಗಳು ತಟ್ಟೆಯ ಅಂಚಿಗೆ ತೆವಳಿ ತಲೆಕೆಳಗಾಗಿ ತೂಗಾಡುವುದು',
            te: 'పురుగులు ట్రే అంచుకు ప్రాకి తలక్రిందులుగా వేలాడటం',
            hi: 'कीड़ों का ट्रे के किनारे पर जाकर उलटा लटकना'
        }
    },
    {
        id: 'sluggish_loss_appetite',
        disease: 'Flacherie',
        labels: {
            en: 'Sluggish movement and complete loss of appetite',
            ta: 'சுறுசுறுப்பற்ற நகர்வு மற்றும் முற்றிலும் பசியின்மை',
            kn: 'ಮಂದ ಚಲನೆ ಮತ್ತು ಸಂಪೂರ್ಣ ಹಸಿವು ನಾಶ',
            te: 'మందకొడి కదలిక మరియు ఆకలి మందగించడం',
            hi: 'सुस्त चाल और भूख में पूरी कमी'
        }
    },
    {
        id: 'black_rectal_protrusion',
        disease: 'Flacherie',
        labels: {
            en: 'Soft body, translucent gut, black gut/rectal discharge',
            ta: 'மென்மையான உடல், ஒளிபுகும் குடல், கருப்பு திரவம் வெளியேறுதல்',
            kn: 'ಮೆತ್ತಗಿನ ದೇಹ, ಪಾರದರ್ಶಕ ಕರುಳು, ಕಪ್ಪು ಸ್ರಾವ ಹೊರಬರುವುದು',
            te: 'మెత్తటి శరీరం మరియు నల్లటి ద్రవం స్రవించడం',
            hi: 'कोमल शरीर और काला मल/तरल निकलना'
        }
    },
    {
        id: 'foul_odor_darkening',
        disease: 'Flacherie',
        labels: {
            en: 'Dead worms turn black/brown and emit foul odor',
            ta: 'இறந்த புழுக்கள் கருப்பாகி துர்நாற்றம் வீசுதல்',
            kn: 'ಸತ್ತ ಹುಳುಗಳು ಕಪ್ಪಾಗಿ ದುರ್ವಾಸನೆ ಬೀರುವುದು',
            te: 'చనిపోయిన పురుగులు నల్లబడి దుర్వాసన రావడం',
            hi: 'मरे हुए कीड़ों का काला पड़ना और बदबू आना'
        }
    },
    {
        id: 'chalky_white_mummy',
        disease: 'Muscardine',
        labels: {
            en: 'Body stiffens, turns hard, and becomes covered in white powdery efflorescence',
            ta: 'உடல் விறைத்து, கடினமாகி, வெள்ளை சுன்னாம்பு பொடியால் மூடப்படுதல்',
            kn: 'ದೇಹ ಗಟ್ಟಿಯಾಗಿ ಬಿಳಿ ಸುಣ್ಣದಂತಹ ಪುಡಿಯಿಂದ ಮುಚ್ಚಲ್ಪಡುವುದು',
            te: 'శరీరం గట్టిపడి తెల్లటి పొడితో కప్పబడటం',
            hi: 'शरीर का कड़ा होना और सफेद पाउडर से ढक जाना'
        }
    },
    {
        id: 'loss_elasticity',
        disease: 'Muscardine',
        labels: {
            en: 'Loss of body elasticity, reddish-pink spots on skin before death',
            ta: 'உடல் நெகிழ்வுத்தன்மை இழப்பு, இறப்பதற்கு முன் சிவப்பான புள்ளிகள்',
            kn: 'ದೇಹದ ನಮ್ಯತೆ ನಾಶ, ಸಾವಿಗೆ ಮುನ್ನ ಕೆಂಪು ಚುಕ್ಕೆಗಳು',
            te: 'శరీర స్థితిస్థాపకత కోల్పోవడం, ఎర్రటి మచ్చలు పడటం',
            hi: 'शरीर का लचीलापन खोना और लाल धब्बे पड़ना'
        }
    },
    {
        id: 'black_pebrine_spots',
        disease: 'Pebrine',
        labels: {
            en: 'Irregular dark brown / black pepper-like spots on body skin',
            ta: 'உடலில் ஒழுங்கற்ற கருமிளகு போன்ற புள்ளிகள் தோன்றுதல்',
            kn: 'ದೇಹದ ಮೇಲೆ ಕಪ್ಪು ಮೆಣಸಿನಂತಹ ಚುಕ್ಕೆಗಳು ಕಾಣಿಸಿಕೊಳ್ಳುವುದು',
            te: 'చర్మంపై నల్ల మిరియాల వంటి మచ్చలు పడటం',
            hi: 'शरीर पर काली मिर्च जैसे छोटे धब्बे दिखाई देना'
        }
    },
    {
        id: 'uneven_hatching_growth',
        disease: 'Pebrine',
        labels: {
            en: 'Uneven growth size in same batch, delayed molting, sluggishness',
            ta: 'ஒரே தொகுதியில் சீரற்ற வளர்ச்சி, தோலுரிப்பதில் தாமதம்',
            kn: 'ಒಂದೇ ತಂಡದಲ್ಲಿ ಅಸಮಾನ ಬೆಳವಣಿಗೆ ಮತ್ತು ತಡವಾದ ಕೋಶ ವಿಸರ್ಜನೆ',
            te: 'ఒకే బ్యాచ్‌లో అసమాన పెరుగుదల మరియు ఆలస్యం',
            hi: 'एक ही समूह में असमान वृद्धि और सुस्ती'
        }
    },
    {
        id: 'microscopic_corpuscles',
        disease: 'Pebrine',
        labels: {
            en: 'Egg or moth shows oval microscopic pebrine spores under 600x',
            ta: 'நுண்ணோக்கியில் பார்க்கும்போது முட்டை அல்லது பூச்சியில் பெப்ரின் வித்துக்கள் தெரிதல்',
            kn: 'ಸೂಕ್ಷ್ಮದರ್ಶಕದಡಿ ಪೆಬ್ರಿನ್ ಬೀಜಕಗಳು ಕಾಣಿಸುವುದು',
            te: 'మైక్రోస్కోప్ క్రింద బీజాంశాలు కనిపించడం',
            hi: 'माइक्रोस्कोप के नीचे स्पोर्स का दिखाई देना'
        }
    }
];

// Helper to safely fetch content, falling back to English if a language is incomplete
export const getDiseaseContent = (diseaseClass, lang) => {
    const entry = DISEASE_CONTENT[diseaseClass];
    if (!entry) return null;
    return entry[lang] || entry.en;
};

export const getSeverityLabel = (severityKey, lang) => {
    const map = SEVERITY_LABELS[lang] || SEVERITY_LABELS.en;
    return map[severityKey] || severityKey;
};

// Helper: Translate Leaf Disease Prediction Object
export const getTranslatedLeafDisease = (resultObj, lang) => {
    if (!resultObj) return null;
    if (resultObj.is_invalid || resultObj.is_leaf === false) return resultObj;
    if (!lang || lang === 'en') return resultObj;

    const key = resultObj.class || 'Disease Free leaves';
    const translatedInfo = getDiseaseContent(key, lang);
    if (!translatedInfo) return resultObj;

    return {
        ...resultObj,
        symptoms: translatedInfo.symptoms || resultObj.symptoms,
        cause: translatedInfo.cause || resultObj.cause,
        chemical: translatedInfo.chemical || resultObj.chemical,
        immediate_actions: translatedInfo.immediate_actions || resultObj.immediate_actions,
        prevention: translatedInfo.prevention || resultObj.prevention,
        silkworm_impact: translatedInfo.silkworm_impact || resultObj.silkworm_impact
    };
};

// Helper: Translate Silkworm Disease Result Object
export const getTranslatedSilkwormDisease = (diagnosisObj, lang) => {
    if (!diagnosisObj) return null;
    if (!lang || lang === 'en') return diagnosisObj;

    let diseaseKey = 'Grasserie';
    const rawDis = diagnosisObj.disease || '';
    if (rawDis.toLowerCase().includes('flacherie')) diseaseKey = 'Flacherie';
    else if (rawDis.toLowerCase().includes('muscardine')) diseaseKey = 'Muscardine';
    else if (rawDis.toLowerCase().includes('pebrine')) diseaseKey = 'Pebrine';
    else if (rawDis.toLowerCase().includes('grasserie')) diseaseKey = 'Grasserie';

    const info = SILKWORM_DISEASE_TRANSLATIONS[diseaseKey] && (SILKWORM_DISEASE_TRANSLATIONS[diseaseKey][lang] || SILKWORM_DISEASE_TRANSLATIONS[diseaseKey].en);

    if (!info) return diagnosisObj;

    return {
        ...diagnosisObj,
        disease: info.disease,
        category: info.category,
        mortality_risk: info.mortality_risk,
        description: info.description,
        treatment: info.treatment,
        prevention: info.prevention
    };
};

// Helper: Translate Climate Advisory Report
export const getTranslatedClimateReport = (reportObj, lang) => {
    if (!reportObj) return null;
    if (!lang || lang === 'en') return reportObj;

    const isSafe = reportObj.status === 'SAFE';
    const isWarning = reportObj.status === 'WARNING';

    let impactMsg = reportObj.impact_if_uncorrected;
    if (lang === 'ta') {
        impactMsg = isSafe
            ? 'உகந்த சுற்றுச்சூழல் அளவீடுகள்! பட்டுப்புழுக்கள் சுறுசுறுப்பாக உணவை உட்கொண்டு, சீரான வளர்ச்சி பெற்று உயர்தர பட்டுக்கூடுகளை உருவாக்கும்.'
            : isWarning
            ? 'சீரற்ற சுற்றுச்சூழல் நிலை. பட்டுப்புழுவின் உணவு உட்கொள்ளல் வேகம் குறையலாம், தோலுரிப்பது சீரற்றதாகலாம் மற்றும் வைரஸ் தொற்று அபாயம் அதிகரிக்கும்.'
            : 'ஆபத்து: தீவிர மாறுபட்ட சூழல்! அதிக வெப்பநிலை/ஈரப்பதம் கிராஸரி மற்றும் பிளாச்சேரி நோய்களை உண்டாக்கி அதிக இறப்பு விகிதத்தை ஏற்படுத்தும்.';
    } else if (lang === 'kn') {
        impactMsg = isSafe
            ? 'ಸೂಕ್ತ ವಾತಾವರಣದ ಮಿತಿಗಳು! ರೇಷ್ಮೆ ಹುಳುಗಳು ಸಕ್ರಿಯವಾಗಿ ಆಹಾರ ಸೇವಿಸಿ ಉತ್ತಮ ಗುಣಮಟ್ಟದ ಗೂಡುಗಳನ್ನು ಉತ್ಪಾದಿಸುತ್ತವೆ.'
            : isWarning
            ? 'ಸರಿಯಲ್ಲದ ವಾತಾವರಣ. ಹುಳುಗಳ ಆಹಾರ ಸೇವನೆ ಕಡಿಮೆಯಾಗಬಹುದು ಮತ್ತು ರೋಗದ ಅಪಾಯ ಹೆಚ್ಚಾಗಬಹುದು.'
            : 'ಅಪಾಯ: ತೀವ್ರ ವಾತಾವರಣ! ಹೆಚ್ಚಿನ ತಾಪಮಾನ/ಆರ್ದ್ರತೆ ರೋಗಗಳನ್ನು ಉಂಟುಮಾಡಿ ಹೆಚ್ಚಿನ ಮರಣಕ್ಕೆ ಕಾರಣವಾಗುತ್ತದೆ.';
    } else if (lang === 'te') {
        impactMsg = isSafe
            ? 'అనుకూలమైన వాతావరణ పరిమితులు! పట్టుపురుగులు చురుకుగా మేత తిని నాణ్యమైన గూళ్లను తయారు చేస్తాయి.'
            : isWarning
            ? 'అసమాన వాతావరణం. పురుగుల మేత తినే వేగం తగ్గి వ్యాధుల బారిన పడే అవకాశం ఉంది.'
            : 'ప్రమాదం: తీవ్రమైన వాతావరణం! అధిక ఉష్ణోగ్రత/తేమ వల్ల ఎక్కువ పురుగులు చనిపోయే ప్రమాదం ఉంది.';
    } else if (lang === 'hi') {
        impactMsg = isSafe
            ? 'उत्कृष्ट पर्यावरणीय स्थिति! रेशम कीट सक्रिय रूप से भोजन करेंगे और उच्च गुणवत्ता वाले कोकून का निर्माण करेंगे।'
            : isWarning
            ? 'असामान्य स्थिति। कीटों के भोजन ग्रहण की गति धीमी हो सकती है और बीमारी का खतरा बढ़ सकता है।'
            : 'खतरा: अत्यधिक प्रतिकूल वातावरण! उच्च तापमान/आर्द्रता से बीमारियां फैल सकती हैं और भारी नुकसान हो सकता है।';
    }

    return {
        ...reportObj,
        impact_if_uncorrected: impactMsg
    };
};

// Helper: Get Translated Symptom List
export const getTranslatedSymptomList = (lang) => {
    return SILKWORM_SYMPTOMS_TRANSLATIONS.map(item => ({
        id: item.id,
        disease: item.disease,
        label: (item.labels && item.labels[lang]) ? item.labels[lang] : item.labels.en
    }));
};