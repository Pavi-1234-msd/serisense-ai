/**
 * Structured Sericulture Microclimate Intelligence & Decision-Support System
 * Module: SeriSense AI Climate Operations Engine
 * 
 * Provides deterministic, stage-calibrated sericulture microclimate advisory
 * based on Central Silk Board (CSB) and Directorate of Sericulture protocols.
 * 
 * Supports 5 regional languages: en, ta, kn, te, hi
 */

export const INSTAR_CLIMATE_KNOWLEDGE = {
  'Egg': {
    ideal_temp_min: 24.0,
    ideal_temp_max: 25.0,
    ideal_hum_min: 80.0,
    ideal_hum_max: 85.0,
    en: {
      stage_title: 'Egg / Incubation Stage',
      biological_context: 'During embryonic development, precise thermal regulation ensures synchronized organogenesis and uniform batch emergence.',
      pathogen_risks: 'Excessive humidity (>85%) encourages Aspergillus and Penicillium fungal molds over egg sheets, asphyxiating developing embryos.',
      room_interventions: [
        'Place egg cards on incubation frames with 5 cm clearance between sheets for gentle airflow.',
        'If humidity is below 80%, place water-filled enamel trays with paraffin paper covers beneath incubation racks.',
        'If temperature is below 24°C, use indirect room heating with reflective charcoal stoves (with exhaust chimlet) or room convector.'
      ],
      monitoring_checklist: [
        'Check thermometer twice daily at 8:00 AM and 4:00 PM.',
        'Inspect egg color progression from greenish-yellow to pinhead/blue egg stage.',
        'Keep incubation room dark until 48 hours prior to anticipated brushing, followed by sudden light exposure (photoperiodic synchronization).'
      ]
    },
    ta: {
      stage_title: 'முட்டை / அடைகாக்கும் நிலை',
      biological_context: 'கரு வளர்ச்சியின் போது துல்லியமான வெப்பநிலை ஒழுங்குமுறை சீரான குஞ்சு பொரித்தலை உறுதி செய்கிறது.',
      pathogen_risks: 'அதிக ஈரப்பதம் (>85%) முட்டை அட்டைகளில் ஆஸ்பெர்கில்லஸ் பூஞ்சை தொற்று உருவாகி கரு மூச்சுத்திணறி இறக்க வழிவகுக்கும்.',
      room_interventions: [
        'முட்டை அட்டைகளுக்கு இடையே 5 செ.மீ இடைவெளி விட்டு காற்றோட்டமாக வைக்கவும்.',
        'ஈரப்பதம் 80% க்குக் குறைவாக இருந்தால் தண்ணீர் தட்டுகளை வைத்து ஈரப்பதத்தை உயர்த்தவும்.',
        'வெப்பநிலை 24°C க்குக் குறைவாக இருந்தால் அறை சூடாக்கியைப் பயன்படுத்தவும்.'
      ],
      monitoring_checklist: [
        'காலை 8:00 மற்றும் மாலை 4:00 மணிக்கு வெப்பநிலை மற்றும் ஈரப்பதத்தை சரிபார்க்கவும்.',
        'முட்டை நிற மாற்றங்களை உன்னிப்பாகக் கவனிக்கவும்.',
        'குஞ்சு பொரிப்பதற்கு 48 மணி நேரத்திற்கு முன் இருட்டு அறையில் வைத்து பின் திடீர் வெளிச்சம் காட்டவும்.'
      ]
    },
    kn: {
      stage_title: 'ಮೊಟ್ಟೆ / ಕಾವು ಕೊಡುವ ಹಂತ',
      biological_context: 'ಭ್ರೂಣದ ಬೆಳವಣಿಗೆಯ ಸಮಯದಲ್ಲಿ ನಿಖರ ತಾಪಮಾನ ನಿಯಂತ್ರಣವು ಎಲ್ಲಾ ಮೊಟ್ಟೆಗಳು ಏಕಕಾಲದಲ್ಲಿ ಒಡೆಯುವುದನ್ನು ಖಚಿತಪಡಿಸುತ್ತದೆ.',
      pathogen_risks: 'ಹೆಚ್ಚಿನ ಆರ್ದ್ರತೆ (>85%) ಮೊಟ್ಟೆಯ ಶೀಟ್‌ಗಳ ಮೇಲೆ ಶಿಲೀಂಧ್ರ ಬೆಳೆಯಲು ಕಾರಣವಾಗುತ್ತದೆ.',
      room_interventions: [
        'ಮೊಟ್ಟೆಯ ಕಾರ್ಡ್‌ಗಳ ನಡುವೆ 5 ಸೆಂ.ಮೀ ಅಂತರವಿಟ್ಟು ಗಾಳಿಯಾಡಲು ಬಿಡಿ.',
        'ಆರ್ದ್ರತೆ 80% ಕ್ಕಿಂತ ಕಡಿಮೆಯಿದ್ದರೆ ನೀರಿನ ಟ್ರೇಗಳನ್ನು ಇರಿಸಿ.',
        'ತಾಪಮಾನ 24°C ಗಿಂತ ಕಡಿಮೆಯಿದ್ದರೆ ಕೋಣೆಯನ್ನು ಬೆಚ್ಚಗಿರಿಸಿ.'
      ],
      monitoring_checklist: [
        'ದಿನಕ್ಕೆ ಎರಡು ಬಾರಿ ತಾಪಮಾನ ಮಾಪಕವನ್ನು ಪರಿಶೀಲಿಸಿ.',
        'ಮೊಟ್ಟೆಯ ಬಣ್ಣ ಬದಲಾವಣೆಯನ್ನು ಗಮನಿಸಿ.',
        'ಮೊಟ್ಟೆ ಒಡೆಯುವ ಮುನ್ನ ಕತ್ತಲೆಯಲ್ಲಿರಿಸಿ ನಂತರ ಬೆಳಕಿಗೆ ತನ್ನಿ.'
      ]
    },
    te: {
      stage_title: 'గుడ్డు / పొదిగే దశ',
      biological_context: 'పిండం అభివృద్ధి సమయంలో సరైన ఉష్ణోగ్రత పట్టుపురుగులు ఏకరీతిగా బయటకు రావడానికి సహాయపడుతుంది.',
      pathogen_risks: 'అధిక తేమ (>85%) గుడ్ల కాగితాలపై బూజు పట్టడానికి దారితీస్తుంది.',
      room_interventions: [
        'గుడ్ల కార్డుల మధ్య 5 సెం.మీ దూరం ఉండేలా అమర్చండి.',
        'తేమ 80% కంటే తక్కువగా ఉంటే నీటి ట్రేలను అమర్చండి.',
        'ఉష్ణోగ్రత 24°C కంటే తక్కువగా ఉంటే గదిని వెచ్చగా ఉంచండి.'
      ],
      monitoring_checklist: [
        'ఉదయం మరియు సాయంత్రం ఉష్ణోగ్రతను నమోదు చేయండి.',
        'గుడ్డు రంగు మార్పులను నిశితంగా పరిశీలించండి.',
        'పొదగడానికి ముందు చీకటి గదిలో ఉంచి తరువాత వెలుతురు ఇవ్వండి.'
      ]
    },
    hi: {
      stage_title: 'अंडा / सेने की अवस्था',
      biological_context: 'भ्रूण विकास के दौरान सटीक तापमान सभी अंडों से एक समान कीट निकलने को सुनिश्चित करता है।',
      pathogen_risks: 'अत्यधिक नमी (>85%) से अंडों पर फफूंद जमने का खतरा रहता है।',
      room_interventions: [
        'अंडा कार्डों के बीच 5 सेमी की दूरी बनाए रखें।',
        'यदि नमी 80% से कम हो तो पानी से भरे ट्रे रखें।',
        'यदि तापमान 24°C से कम हो तो हीटर का उपयोग करें।'
      ],
      monitoring_checklist: [
        'दिन में दो बार तापमान और आर्द्रता नोट करें।',
        'अंडे के रंग परिवर्तन की निगरानी करें।',
        'कीट निकलने से पहले अंधेरे कमरे में रखें फिर प्रकाश दें।'
      ]
    }
  },

  'Instar 1': {
    ideal_temp_min: 26.0,
    ideal_temp_max: 28.0,
    ideal_hum_min: 85.0,
    ideal_hum_max: 90.0,
    en: {
      stage_title: 'Instar 1 (Chawki Rearing - 1st Stage)',
      biological_context: 'Tender newly hatched larvae have delicate cuticles and high surface area-to-volume ratio, making them acutely vulnerable to rapid desiccation.',
      pathogen_risks: 'Low humidity causes finely chopped mulberry leaves to dry into inedible flakes in < 30 minutes, resulting in larval starvation and uncoordinated first moult.',
      room_interventions: [
        'Enclose rearing beds with paraffin paper and wet foam rubber strips around tray borders to lock in 85–90% humidity.',
        'Feed exclusively tender, succulent top leaves (2nd & 3rd leaf from shoot tip) chopped to 0.5 cm size.',
        'If ambient temperature exceeds 28°C, place wet gunny screens over rearing room windows and sprinkle floor with water.'
      ],
      monitoring_checklist: [
        'Feed 3 to 4 times daily at equal 6-hour intervals.',
        'Inspect larval appetite and head-raising movement indicating onset of 1st moult.',
        'Stop feeding completely once 90% of larvae enter moult; remove paraffin covers to let bed dry out during skin shedding.'
      ]
    },
    ta: {
      stage_title: 'நிலை 1 (சாக்கி வளர்ப்பு - முதல் நிலை)',
      biological_context: 'இளம்புழுக்களின் தோல் மிகவும் மென்மையானது. வறண்ட காற்று பட்டால் புழுக்கள் விரைவாக நீரிழந்து பலவீனமடையும்.',
      pathogen_risks: 'குறைந்த ஈரப்பதம் நறுக்கிய மல்பெரி இலைகளை 30 நிமிடங்களில் உலர வைத்து புழுக்களுக்கு பட்டினியை ஏற்படுத்தும்.',
      room_interventions: [
        'வளர்ப்பு தட்டுகளை பாராஃபின் காகிதம் மற்றும் ஈரப்பஞ்சுகளால் மூடி 85-90% ஈரப்பதத்தை பராமரிக்கவும்.',
        'செடியின் நுனியில் உள்ள 2-வது மற்றும் 3-வது மென்மையான இலைகளை 0.5 செ.மீ அளவில் நறுக்கி ஊட்டவும்.',
        'வெப்பநிலை 28°C க்கு மேல் உயர்ந்தால் சணல் சாக்குகளை ஜன்னல்களில் நனைத்து தொங்கவிடவும்.'
      ],
      monitoring_checklist: [
        'தினமும் 3 அல்லது 4 முறை குறிப்பிட்ட இடைவெளியில் உணவளிக்கவும்.',
        'புழுக்கள் தலை உயர்த்தி முதல் தோலுரிப்புக்கு செல்வதை கவனிக்கவும்.',
        '90% புழுக்கள் தோலுரிப்புக்கு சென்றதும் உணவளிப்பதை நிறுத்தி மேலட்டையை நீக்கவும்.'
      ]
    },
    kn: {
      stage_title: 'ಹಂತ 1 (ಚಾಕಿ ಸಾಕಣೆ - ಮೊದಲ ಹಂತ)',
      biological_context: 'ಎಳೆಯ ಹುಳುಗಳ ಚರ್ಮವು ಸೂಕ್ಷ್ಮವಾಗಿದ್ದು, ಒಣ ಹವೆಯಲ್ಲಿ ತಕ್ಷಣ ನಿರ್ಜಲೀಕರಣಗೊಳ್ಳುತ್ತವೆ.',
      pathogen_risks: 'ಕಡಿಮೆ ತೇವಾಂಶವು ಎಲೆಗಳನ್ನು ಬೇಗನೆ ಒಣಗಿಸಿ ಹುಳುಗಳ ಹಸಿವಿಗೆ ಕಾರಣವಾಗುತ್ತದೆ.',
      room_interventions: [
        'ಪ್ಯಾರಾಫಿನ್ ಪೇಪರ್ ಮತ್ತು ಒದ್ದೆ ಸ್ಪಾಂಜ್ ಬಳಸಿ 85-90% ಆರ್ದ್ರತೆಯನ್ನು ಕಾಪಾಡಿ.',
        'ತುದಿಯ 2 ಮತ್ತು 3ನೇ ಎಳೆಯ ಎಲೆಗಳನ್ನು ಮಾತ್ರ ಸಣ್ಣದಾಗಿ ಕತ್ತರಿಸಿ ನೀಡಿ.',
        'ತಾಪಮಾನ 28°C ಮೀರಿದರೆ ಕಿಟಕಿಗಳಿಗೆ ಒದ್ದೆ ಗೋಣಿಚೀಲಗಳನ್ನು ನೇತುಹಾಕಿ.'
      ],
      monitoring_checklist: [
        'ದಿನಕ್ಕೆ 3 ರಿಂದ 4 ಬಾರಿ ನಿಯಮಿತವಾಗಿ ಆಹಾರ ನೀಡಿ.',
        'ಹುಳುಗಳು ಮೊದಲ ಪೊರೆ ಕಳಚುವುದನ್ನು (ಮೋಲ್ಟ್) ಗಮನಿಸಿ.',
        'ಹುಳುಗಳು ಪೊರೆ ಕಳಚಲು ಆರಂಭಿಸಿದಾಗ ಆಹಾರ ನಿಲ್ಲಿಸಿ ಕಾಗದವನ್ನು ತೆಗೆಯಿರಿ.'
      ]
    },
    te: {
      stage_title: 'దశ 1 (చాకీ పెంపకం - మొదటి దశ)',
      biological_context: 'చిన్న పురుగులు చాలా సున్నితంగా ఉండి పొడి వాతావరణంలో త్వరగా డీహైడ్రేట్ అవుతాయి.',
      pathogen_risks: 'తక్కువ తేమ వల్ల చిన్నగా తరిగిన ఆకులు త్వరగా ఎండిపోయి పురుగులు ఆకలితో అలమటిస్తాయి.',
      room_interventions: [
        'పారాఫిన్ కాగితం మరియు తడి స్పాంజ్ ముక్కలతో 85-90% తేమను కాపాడండి.',
        'కొమ్మ చివర ఉండే లేత 2 మరియు 3వ ఆకులను మాత్రమే తరిగి వేయండి.',
        'ఉష్ణోగ్రత 28°C కంటే పెరిగితే కిటికీలకు తడి గోనె సంచులను కట్టండి.'
      ],
      monitoring_checklist: [
        'రోజుకు 3 నుండి 4 సార్లు వేళకు మేత వేయండి.',
        'పురుగులు తల పైకెత్తి మొదటి కుబుసం విడువడాన్ని గమనించండి.',
        'కుబుసం దశలోకి వెళ్లినప్పుడు మేత ఆపివేసి పై కవరును తొలగించండి.'
      ]
    },
    hi: {
      stage_title: 'चरण 1 (चाकी कीट पालन - प्रथम अवस्था)',
      biological_context: 'नन्हे रेशम कीटों की त्वचा अत्यंत कोमल होती है और वे शुष्क हवा में जल्दी निर्जलित हो जाते हैं।',
      pathogen_risks: 'कम नमी से कटी हुई पत्तियां 30 मिनट में सूख जाती हैं जिससे कीट भूखे रह जाते हैं।',
      room_interventions: [
        'ट्रे को पैराफिन पेपर और नम स्पंज से ढककर 85-90% नमी बनाए रखें।',
        'शीर्ष की कोमल पत्तियों को 0.5 सेमी आकार में काटकर खिलाएं।',
        'तापमान 28°C से ऊपर जाने पर खिड़कियों पर गीली बोरियां लटकाएं।'
      ],
      monitoring_checklist: [
        'दिन में 3 से 4 बार नियमित अंतराल पर भोजन दें।',
        'कीटों द्वारा पहली केंचुल (Moult) उतारने के समय पर नजर रखें।',
        'केंचुल पर जाने पर भोजन देना पूरी तरह बंद कर दें और ट्रे खोल दें।'
      ]
    }
  },

  'Instar 2': {
    ideal_temp_min: 26.0,
    ideal_temp_max: 28.0,
    ideal_hum_min: 85.0,
    ideal_hum_max: 90.0,
    en: {
      stage_title: 'Instar 2 (Chawki Rearing - 2nd Stage)',
      biological_context: 'Rapid tissue growth following the first moult; appetite doubles, and larvae synthesize significant lipid reserves.',
      pathogen_risks: 'High temperature combined with stagnant high humidity creates anaerobic micro-pockets in tray litter, fostering secondary viral flacherie.',
      room_interventions: [
        'Expand bed area by 2.5x to prevent larval crowding and thermal hotspots within the bed.',
        'Feed freshly cut 1.0 cm chopped nutritious mulberry leaves twice daily under semi-covered paraffin sheets.',
        'Ventilate the rearing room for 15 minutes prior to each feeding session to refresh oxygen levels.'
      ],
      monitoring_checklist: [
        'Check bed temperature; ensure bed litter does not ferment.',
        'Observe appetite uniformity across rearing trays.',
        'Prepare bed cleaning nets for scheduled litter removal at 2nd moult entrance.'
      ]
    },
    ta: {
      stage_title: 'நிலை 2 (சாக்கி வளர்ப்பு - இரண்டாம் நிலை)',
      biological_context: 'முதல் தோலுரிப்புக்குப் பிறகு தீவிர வளர்ச்சி நிலை. உணவு உட்கொள்ளும் திறன் இருமடங்காக அதிகரிக்கும்.',
      pathogen_risks: 'அதிக வெப்பமும் தேங்கிய ஈரப்பதமும் தட்டுகளுக்குள் பாக்டீரியா பரவி பிளாச்சேரி நோயை உண்டாக்கும்.',
      room_interventions: [
        'புழுக்கள் நெரிசலாக இருப்பதைத் தவிர்க்க தட்டின் பரப்பளவை 2.5 மடங்கு அதிகரிக்கவும்.',
        '1.0 செ.மீ அளவில் நறுக்கிய தரமான இலைகளை வழங்கவும்.',
        'உணவளிப்பதற்கு 15 நிமிடங்களுக்கு முன் அறையில் காற்றோட்டத்தை ஏற்படுத்தவும்.'
      ],
      monitoring_checklist: [
        'தட்டுகளில் ஈரமான கழிவுகள் தேங்காமல் பார்த்துக் கொள்ளவும்.',
        'அனைத்து புழுக்களும் சீராக உண்கிறதா என்பதை கண்காணிக்கவும்.',
        'இரண்டாம் தோலுரிப்பின் போது கழிவு நீக்கும் வலைகளைப் பயன்படுத்தவும்.'
      ]
    },
    kn: {
      stage_title: 'ಹಂತ 2 (ಚಾಕಿ ಸಾಕಣೆ - ಎರಡನೇ ಹಂತ)',
      biological_context: 'ಮೊದಲ ಪೊರೆ ಕಳಚಿದ ನಂತರ ತ್ವರಿತ ಬೆಳವಣಿಗೆ. ಆಹಾರ ಸೇವನೆ ದ್ವಿಗುಣಗೊಳ್ಳುತ್ತದೆ.',
      pathogen_risks: 'ಹೆಚ್ಚಿನ ತಾಪಮಾನ ಮತ್ತು ಆರ್ದ್ರತೆ ಒಟ್ಟಿಗೆ ಸೇರಿದರೆ ಕಸದಲ್ಲಿ ರೋಗಾಣುಗಳು ಬೆಳೆಯುತ್ತವೆ.',
      room_interventions: [
        'ಹುಳುಗಳ ದಟ್ಟಣೆ ತಪ್ಪಿಸಲು ಟ್ರೇ ಜಾಗವನ್ನು 2.5 ಪಟ್ಟು ಹೆಚ್ಚಿಸಿ.',
        '1.0 ಸೆಂ.ಮೀ ಗಾತ್ರದ ತಾಜಾ ಕತ್ತರಿಸಿದ ಎಲೆಗಳನ್ನು ನೀಡಿ.',
        'ಆಹಾರ ನೀಡುವ ಮುನ್ನ ಕೋಣೆಯಲ್ಲಿ 15 ನಿಮಿಷ ಗಾಳಿಯಾಡಲು ಬಿಡಿ.'
      ],
      monitoring_checklist: [
        'ಟ್ರೇನಲ್ಲಿ ಉಷ್ಣತೆ ಹೆಚ್ಚಾಗದಂತೆ ಗಮನಿಸಿ.',
        'ಎಲ್ಲಾ ಹುಳುಗಳು ಸಮನಾಗಿ ಬೆಳೆಯುತ್ತಿವೆಯೇ ನೋಡಿ.',
        'ಎರಡನೇ ಮೋಲ್ಟ್ ಸಮಯದಲ್ಲಿ ಹಾಸಿಗೆ ಸ್ವಚ್ಛಗೊಳಿಸುವ ಬಲೆಗಳನ್ನು ಬಳಸಿ.'
      ]
    },
    te: {
      stage_title: 'దశ 2 (చాకీ పెంపకం - రెండవ దశ)',
      biological_context: 'మొదటి కుబుసం తర్వాత వేగంగా బరువు పెరుగుతాయి. మేత వినియోగం రెట్టింపు అవుతుంది.',
      pathogen_risks: 'అధిక వేడి మరియు తేమ వల్ల పురుగుల మలంలో బ్యాక్టీరియా పెరిగి రోగాలు వస్తాయి.',
      room_interventions: [
        'పురుగులు ఇరుకుగా ఉండకుండా బెడ్ స్థలాన్ని 2.5 రెట్లు పెంచండి.',
        '1.0 సెం.మీ పరిమాణంలో తరిగిన నాణ్యమైన ఆకులను వేయండి.',
        'మేత వేయడానికి 15 నిమిషాల ముందు గది కిటికీలు తెరవండి.'
      ],
      monitoring_checklist: [
        'బెడ్‌లో ఉష్ణోగ్రత పెరగకుండా చూడండి.',
        'పురుగుల ఎదుగుదల సమానంగా ఉందో లేదో గమనించండి.',
        'రెండవ కుబుసం సమయంలో వ్యర్థాలను తొలగించడానికి నెట్లను సిద్ధం చేయండి.'
      ]
    },
    hi: {
      stage_title: 'चरण 2 (चाकी कीट पालन - द्वितीय अवस्था)',
      biological_context: 'पहली केंचुल के बाद तेजी से विकास होता है और कीटों की भूख दोगुनी हो जाती है।',
      pathogen_risks: 'अधिक गर्मी और स्थिर नमी से ट्रे में बैक्टीरिया पनपने से फ्लेचरी का खतरा बढ़ता है।',
      room_interventions: [
        'कीटों की भीड़ रोकने के लिए बेड का क्षेत्र 2.5 गुना बढ़ाएं।',
        '1.0 सेमी आकार में कटी हुई ताजी पत्तियां दें।',
        'भोजन देने से 15 मिनट पहले कमरे में ताजी हवा आने दें।'
      ],
      monitoring_checklist: [
        'ट्रे के तापमान और कचरे की स्थिति पर ध्यान दें।',
        'कीटों के समान विकास का निरीक्षण करें।',
        'दूसरी केंचुल के समय कचरा साफ करने के लिए जाल तैयार रखें।'
      ]
    }
  },

  'Instar 3': {
    ideal_temp_min: 25.0,
    ideal_temp_max: 27.0,
    ideal_hum_min: 80.0,
    ideal_hum_max: 85.0,
    en: {
      stage_title: 'Instar 3 (Transition Stage)',
      biological_context: 'Critical transition gate between sensitive chawki (young age) and robust late-age rearing. Silk glands initiate accelerated cellular differentiation.',
      pathogen_risks: 'Excess bed humidity (>85%) combined with high temperature creates the exact trigger for latent cytoplasmic and nuclear polyhedrosis (Grasserie).',
      room_interventions: [
        'Dust dry slaked lime powder (50g/m²) lightly over the bed before feeding to absorb litter wetness.',
        'Transition from finely chopped leaf to whole leaf / shoot feeding.',
        'Remove paraffin paper completely; maintain open-tray rearing with good ambient circulation.'
      ],
      monitoring_checklist: [
        'Inspect bed litter daily; clean beds once after resuming feeding from 2nd moult.',
        'Screen for uneven growth or sluggish larvae.',
        'Maintain strictly 25–27°C; excessive heat (>28°C) now causes permanent cocoon filament defects.'
      ]
    },
    ta: {
      stage_title: 'நிலை 3 (மாற்ற நிலை / இடைநிலை)',
      biological_context: 'இளம்புழு நிலையிலிருந்து முதிர்ந்த புழு நிலைக்கு மாறும் மிக முக்கியமான கட்டம். பட்டு சுரப்பிகள் வளரத் தொடங்குகின்றன.',
      pathogen_risks: 'அதிக ஈரப்பதம் (>85%) மற்றும் வெப்பம் கிராஸரி (மஞ்சள் நோய்) மற்றும் வைரஸ் தொற்றைத் தூண்டும்.',
      room_interventions: [
        'தட்டுகளில் ஈரப்பதத்தை உறிஞ்ச உலர்ந்த நீற்று சுண்ணாம்புப் பொடியை (50 கிராம்/ச.மீ) தூவவும்.',
        'நறுக்கிய இலைகளிலிருந்து முழு இலை அல்லது தண்டு உணவளிப்பு முறைக்கு மாறவும்.',
        'பாராஃபின் காகிதத்தை முழுமையாக நீக்கி திறந்த தட்டு முறையில் காற்றோட்டத்தை அதிகரிக்கவும்.'
      ],
      monitoring_checklist: [
        'தினமும் கழிவுகளை ஆய்வு செய்து ஒருமுறை படுக்கையை சுத்தம் செய்யவும்.',
        'மந்தமாக உள்ள புழுக்களை தனிமைப்படுத்தவும்.',
        'வெப்பநிலையை 25–27°C க்குள் கண்டிப்பாக பராமரிக்கவும்.'
      ]
    },
    kn: {
      stage_title: 'ಹಂತ 3 (ಪರಿವರ್ತನಾ ಹಂತ)',
      biological_context: 'ಚಾಕಿ ಹಂತದಿಂದ ದೊಡ್ಡ ಹುಳುವಿನ ಹಂತಕ್ಕೆ ಬದಲಾಗುವ ಪ್ರಮುಖ ಹಂತ. ರೇಷ್ಮೆ ಗ್ರಂಥಿಗಳ ಬೆಳವಣಿಗೆ ಆರಂಭವಾಗುತ್ತದೆ.',
      pathogen_risks: 'ಹೆಚ್ಚಿನ ಆರ್ದ್ರತೆಯು ಗ್ರ್ಯಾಸರಿ (ಹಳದಿ ರೋಗ) ಉಲ್ಬಣಕ್ಕೆ ಪ್ರಮುಖ ಕಾರಣವಾಗುತ್ತದೆ.',
      room_interventions: [
        'ತೇವಾಂಶ ಹೀರಿಕೊಳ್ಳಲು ಹಾಸಿಗೆಯ ಮೇಲೆ ಸುಣ್ಣದ ಪುಡಿಯನ್ನು (50 ಗ್ರಾಂ/ಚ.ಮೀ) ಸಿಂಪಡಿಸಿ.',
        'ಕತ್ತರಿಸಿದ ಎಲೆಗಳ ಬದಲಿಗೆ ಸಂಪೂರ್ಣ ಎಲೆ ಅಥವಾ ರೆಂಬೆ ಸಮೇತ ಆಹಾರ ನೀಡಲು ಪ್ರಾರಂಭಿಸಿ.',
        'ಪ್ಯಾರಾಫಿನ್ ಪೇಪರ್ ತೆಗೆದು ಮುಕ್ತವಾಗಿ ಗಾಳಿಯಾಡಲು ಬಿಡಿ.'
      ],
      monitoring_checklist: [
        'ಕಸವನ್ನು ಪ್ರತಿದಿನ ಪರೀಕ್ಷಿಸಿ ಸ್ವಚ್ಛಗೊಳಿಸಿ.',
        'ಚಲನವಲನ ಕಡಿಮೆಯಿರುವ ಹುಳುಗಳನ್ನು ಗಮನಿಸಿ.',
        'ತಾಪಮಾನವನ್ನು 25–27°C ಒಳಗೆ ಕಟ್ಟುನಿಟ್ಟಾಗಿ ಕಾಪಾಡಿ.'
      ]
    },
    te: {
      stage_title: 'దశ 3 (పరివర్తన దశ)',
      biological_context: 'చిన్న పురుగుల నుండి పెద్ద పురుగులుగా మారే కీలకమైన దశ. పట్టు గ్రంథులు వేగంగా వృద్ధి చెందుతాయి.',
      pathogen_risks: 'అధిక తేమ (>85%) వల్ల గ్రాసరీ (పసుపు రోగం) మరియు వైరస్ వ్యాప్తి చెందుతుంది.',
      room_interventions: [
        'తేమను పీల్చుకోవడానికి బెడ్‌పై పొడి సున్నం పొడిని (50 గ్రా/చ.మీ) చల్లండి.',
        'తరిగిన ఆకుల నుండి పూర్తి ఆకు లేదా కొమ్మలతో మేత వేసే పద్ధతికి మారండి.',
        'పై కవర్లను తీసివేసి మంచి గాలి ప్రసరణ కల్పించండి.'
      ],
      monitoring_checklist: [
        'బెడ్‌ను రోజూ పరిశీలించి శుభ್ರం చేయండి.',
        'బలహీనంగా ఉన్న పురుగులను వేరు చేయండి.',
        'ఉష్ణోగ్రతను 25–27°C మధ్యలోనే స్థిరంగా ఉంచండి.'
      ]
    },
    hi: {
      stage_title: 'चरण 3 (संक्रमणकालीन अवस्था)',
      biological_context: 'चाकी से बड़ी अवस्था में बदलने का महत्वपूर्ण चरण। रेशम ग्रंथियों का तेजी से विकास होता है।',
      pathogen_risks: 'अधिक नमी (>85%) और गर्मी से ग्रासरी (पीलिया रोग) फैलने का भारी खतरा होता है।',
      room_interventions: [
        'नमी सोखने के लिए ट्रे पर बुझा हुआ चूना पाउडर (50 ग्राम/वर्ग मीटर) छिड़कें।',
        'कटी पत्तियों के बजाय पूरी पत्तियां या शाखाएं खिलाना शुरू करें।',
        'पैराफिन पेपर पूरी तरह हटा दें और कमरे में अच्छा वेंटिलेशन रखें।'
      ],
      monitoring_checklist: [
        'कचरे का प्रतिदिन निरीक्षण करें और ट्रे साफ करें।',
        'सुस्त कीटों को तुरंत अलग करें।',
        'तापमान को 25–27°C पर बनाए रखें।'
      ]
    }
  },

  'Instar 4': {
    ideal_temp_min: 23.0,
    ideal_temp_max: 26.0,
    ideal_hum_min: 70.0,
    ideal_hum_max: 80.0,
    en: {
      stage_title: 'Instar 4 (Late Stage - 4th Instar)',
      biological_context: 'High-intake growth period; silkworms consume ~15% of their total lifetime mulberry intake. Body mass increases exponentially.',
      pathogen_risks: 'High temperature (>27°C) causes heavy respiration and moisture excretion, generating thermal greenhouse pockets in crowded trays.',
      room_interventions: [
        'Double tray spacing; keep minimum 15 cm vertical gap between stacked rearing shelves.',
        'Dust bed disinfectant (Vijetha / Resham Jyothi) once after 4th moult resumption.',
        'Increase room exhaust ventilation to evacuate heavy carbon dioxide and moisture build-up.'
      ],
      monitoring_checklist: [
        'Clean bed litter every alternate day in the morning.',
        'Feed mature, non-dusty succulent leaves 3 times per day.',
        'Look out for flaccid, translucent larvae indicating early digestive infection.'
      ]
    },
    ta: {
      stage_title: 'நிலை 4 (முதிர்ந்த புழு - நான்காம் நிலை)',
      biological_context: 'அதிக உணவு உட்கொள்ளும் காலம். வாழ்நாளின் 15% மல்பெரி இலைகளை இந்த நிலையில் உட்கொள்ளும்.',
      pathogen_risks: 'அதிக வெப்பம் (>27°C) புழுக்களின் மூச்சுத்திணறல் மற்றும் கழிவுகளால் தட்டுகளுக்குள் வெப்பத்தை அதிகரிக்கும்.',
      room_interventions: [
        'தட்டுகளுக்கு இடையே உள்ள இடைவெளியை இரட்டிப்பாக்கவும் (குறைந்தபட்சம் 15 செ.மீ).',
        'தோலுரித்த பிறகு விஜேதா / ரேஷம் ஜோதி கிருமிநாசினி பொடியைத் தூவவும்.',
        'கரியமில வாயுவை வெளியேற்ற காற்றோட்ட விசிறிகளைப் பயன்படுத்தவும்.'
      ],
      monitoring_checklist: [
        'ஒரு நாள் விட்டு ஒரு நாள் காலையில் தட்டுகளை சுத்தம் செய்யவும்.',
        'முதிர்ந்த தரமான இலைகளை தினமும் 3 முறை வழங்கவும்.',
        'மந்தமான அல்லது நிறம் மாறிய புழுக்களை உடனே அகற்றவும்.'
      ]
    },
    kn: {
      stage_title: 'ಹಂತ 4 (ದೊಡ್ಡ ಹುಳು - 4ನೇ ಹಂತ)',
      biological_context: 'ತೀವ್ರ ಆಹಾರ ಸೇವನೆಯ ಹಂತ. ಜೀವಿತಾವಧಿಯ ಶೇಕಡಾ 15 ರಷ್ಟು ಎಲೆಗಳನ್ನು ಈ ಹಂತದಲ್ಲಿ ತಿನ್ನುತ್ತವೆ.',
      pathogen_risks: 'ಹೆಚ್ಚಿನ ತಾಪಮಾನವು ಹುಳುಗಳಲ್ಲಿ ಉಸಿರಾಟದ ತೊಂದರೆ ಮತ್ತು ಶಾಖದ ಒತ್ತಡವನ್ನು ಉಂಟುಮಾಡುತ್ತದೆ.',
      room_interventions: [
        'ಟ್ರೇಗಳ ನಡುವಿನ ಅಂತರವನ್ನು ಕನಿಷ್ಠ 15 ಸೆಂ.ಮೀ ಹೆಚ್ಚಿಸಿ.',
        'ವಿಜೇತಾ ಅಥವಾ ರೇಷಂ ಜ್ಯೋತಿ ಪುಡಿಯನ್ನು ಸಿಂಪಡಿಸಿ.',
        'ಕೋಣೆಯಿಂದ ಇಂಗಾಲದ ಡೈಆಕ್ಸೈಡ್ ಹೊರಹಾಕಲು ಎಕ್ಸಾಸ್ಟ್ ಫ್ಯಾನ್ ಬಳಸಿ.'
      ],
      monitoring_checklist: [
        'ದಿನಬಿಟ್ಟು ದಿನ ಬೆಳಿಗ್ಗೆ ಕಸ ಸ್ವಚ್ಛಗೊಳಿಸಿ.',
        'ದಿನಕ್ಕೆ 3 ಬಾರಿ ಉತ್ತಮ ಗುಣಮಟ್ಟದ ಎಲೆಗಳನ್ನು ನೀಡಿ.',
        'ಅಸ್ವಸ್ಥವಾಗಿರುವ ಹುಳುಗಳನ್ನು ತಕ್ಷಣ ತೆಗೆದುಹಾಕಿ.'
      ]
    },
    te: {
      stage_title: 'దశ 4 (పెద్ద పురుగులు - 4వ దశ)',
      biological_context: 'ఎక్కువ మేత తినే సమయం. జీవితకాలంలో 15% ఆకులను ఈ దశలోనే తింటాయి.',
      pathogen_risks: 'అధిక వేడిమి (>27°C) వల్ల పురుగులకు ఆయాసం వచ్చి బరువు తగ్గుతాయి.',
      room_interventions: [
        'ట్రేల మధ్య కనీసం 15 సెం.మీ ఖాళీ స్థలాన్ని ఉంచండి.',
        'కుబుసం విడిచిన తర్వాత విజేత లేదా రేషమ్ జ్యోతి పౌడర్ చల్లండి.',
        'గాలి వెలుతురు కోసం ఎగ్జాస్ట్ ఫ్యాన్లు వాడండి.'
      ],
      monitoring_checklist: [
        'రోజు విడిచి రోజు ఉదయం వ్యర్థాలను తొలగించండి.',
        'రోజుకు 3 సార్లు తాజా ఆకులను మేతగా వేయండి.',
        'నీరసంగా ఉన్న పురుగులను వెంటనే వేరు చేయండి.'
      ]
    },
    hi: {
      stage_title: 'चरण 4 (बड़ी अवस्था - चतुर्थ अवस्था)',
      biological_context: 'अधिक भोजन खाने का समय। अपने जीवनकाल का 15% शहतूत पत्तियां इसी चरण में खाती हैं।',
      pathogen_risks: 'अधिक तापमान (>27°C) से कीटों में अत्यधिक गर्मी और तनाव पैदा होता है।',
      room_interventions: [
        'ट्रे के बीच कम से कम 15 सेमी की जगह रखें।',
        'केंचुल के बाद विजेता या रेशम ज्योति पाउडर छिड़कें।',
        'कमरे में एग्जॉस्ट पंखा चलाकर ताजी हवा सुनिश्चित करें।'
      ],
      monitoring_checklist: [
        'एक दिन छोड़कर सुबह ट्रे साफ करें।',
        'प्रतिदिन 3 बार अच्छी गुणवत्ता वाली पत्तियां दें।',
        'सुस्त या कमजोर कीटों को तुरंत हटा दें।'
      ]
    }
  },

  'Instar 5': {
    ideal_temp_min: 22.0,
    ideal_temp_max: 25.0,
    ideal_hum_min: 65.0,
    ideal_hum_max: 75.0,
    en: {
      stage_title: 'Instar 5 (Final Voracious & Spinning Stage)',
      biological_context: 'Peak metabolic phase; silkworms consume 80–85% of total foliage, synthesize pure fibroin protein, and empty gut prior to mounting.',
      pathogen_risks: 'High humidity (>75%) during cocoon spinning traps urine and moisture inside the cocoon, staining silk shell (urinated cocoons) and causing pupal rot.',
      room_interventions: [
        'Open all doors, windows, and roof ventilators to enforce continuous convective cooling toward 22–24°C.',
        'Dust slaked lime powder (100g/m²) every morning to reduce litter humidity below 75%.',
        'Mount ripe, translucent golden worms onto rotary or bamboo chandrike mountages at optimal density (40–45 worms/sq.ft).'
      ],
      monitoring_checklist: [
        'Monitor worms raising thoracic segments and seeking upward mounting spaces.',
        'Ensure rearing room has dry, moving air during first 48 hours of cocoon spinning.',
        'Never allow direct harsh sunlight to hit spinning chandrikes.'
      ]
    },
    ta: {
      stage_title: 'நிலை 5 (இறுதி வளர்ச்சி & கூடு கட்டும் நிலை)',
      biological_context: 'உச்சக்கட்ட உணவு உட்கொள்ளும் நிலை. மொத்த உணவில் 80–85% இலைகளை இந்த நிலையிலேயே உண்டு பட்டுப் புரதத்தை உருவாக்கும்.',
      pathogen_risks: 'கூடு கட்டும் போது அதிக ஈரப்பதம் (>75%) இருந்தால் புழுவின் சிறுநீர் பட்டுக்கூட்டில் படிந்து கறைபட்டு தரத்தை அழிக்கும்.',
      room_interventions: [
        'அறை வெப்பநிலையை 22–24°C ஆக குறைக்க அனைத்து கதவு ஜன்னல்களையும் திறந்து வைக்கவும்.',
        'ஈரப்பதத்தை 75% க்குள் குறைக்க தினமும் காலையில் நீற்று சுண்ணாம்புப் பொடியைத் தூவவும்.',
        'பழுத்த கண்ணாடி போன்ற புழுக்களை சந்திரிகைகளில் சரியான அடர்த்தியில் ஏற்றவும்.'
      ],
      monitoring_checklist: [
        'புழுக்கள் தலை உயர்த்தி கூடு கட்ட இடம் தேடுவதை கவனிக்கவும்.',
        'கூடு கட்டும் முதல் 48 மணி நேரம் வறண்ட இதமான காற்றோட்டம் இருப்பதை உறுதி செய்யவும்.',
        'சந்திரிகைகள் மீது நேரடி வெயில் படாமல் பாதுகாக்கவும்.'
      ]
    },
    kn: {
      stage_title: 'ಹಂತ 5 (ಅಂತಿಮ ಹಂತ ಮತ್ತು ಗೂಡು ಕಟ್ಟುವ ಹಂತ)',
      biological_context: 'ಗರಿಷ್ಠ ಆಹಾರ ಸೇವನೆಯ ಹಂತ. ಒಟ್ಟು ಆಹಾರದ 80-85% ಭಾಗವನ್ನು ಸೇವಿಸಿ ರೇಷ್ಮೆ ಪ್ರೋಟೀನ್ ಉತ್ಪಾದಿಸುತ್ತದೆ.',
      pathogen_risks: 'ಗೂಡು ಕಟ್ಟುವಾಗ ಹೆಚ್ಚಿನ ಆರ್ದ್ರತೆ (>75%) ರೇಷ್ಮೆ ಗೂಡಿನ ಮೇಲೆ ಮೂತ್ರದ ಕಲೆಗಳನ್ನು ಉಂಟುಮಾಡಿ ಗುಣಮಟ್ಟ ಹಾಳುಮಾಡುತ್ತದೆ.',
      room_interventions: [
        'ತಾಪಮಾನವನ್ನು 22–24°C ಗೆ ಇಳಿಸಲು ಕಿಟಕಿ ಮತ್ತು ವೆಂಟಿಲೇಟರ್‌ಗಳನ್ನು ತೆರೆಯಿರಿ.',
        'ಪ್ರತಿದಿನ ಬೆಳಿಗ್ಗೆ ಸುಣ್ಣದ ಪುಡಿ ಸಿಂಪಡಿಸಿ ತೇವಾಂಶ 75% ಕ್ಕಿಂತ ಕಡಿಮೆ ಮಾಡಿ.',
        'ಮಾಗಿದ ಹೊಳೆಯುವ ಹುಳುಗಳನ್ನು ಚಂದ್ರಿಕೆಗಳಲ್ಲಿ ಸರಿಯಾದ ಸಾಂದ್ರತೆಯಲ್ಲಿ ಇರಿಸಿ.'
      ],
      monitoring_checklist: [
        'ಹುಳುಗಳು ಗೂಡು ಕಟ್ಟಲು ಮೇಲ್ಮುಖವಾಗಿ ಚಲಿಸುವುದನ್ನು ಗಮನಿಸಿ.',
        'ಗೂಡು ಕಟ್ಟುವ ಮೊದಲ 48 ಗಂಟೆಗಳ ಕಾಲ ಒಣ ಗಾಳಿ ಇರುವಂತೆ ನೋಡಿಕೊಳ್ಳಿ.',
        'ಚಂದ್ರಿಕೆಗಳ ಮೇಲೆ ನೇರ ಸೂರ್ಯನ ಬಿಸಿಲು ಬೀಳದಂತೆ ರಕ್ಷಿಸಿ.'
      ]
    },
    te: {
      stage_title: 'దశ 5 (చివరి దశ మరియు గూడు కట్టే దశ)',
      biological_context: 'అత్యధిక మేత తినే దశ. మొత్తం జీవితకాలంలో 80–85% ఆకులను తిని పట్టు దారాన్ని తయారు చేసుకుంటుంది.',
      pathogen_risks: 'గూడు కట్టే సమయంలో ఎక్కువ తేమ (>75%) ఉంటే పురుగు మూత్రం గూళ్లకు అంటుకుని రంగు మారి నాణ్యత దెబ్బతింటుంది.',
      room_interventions: [
        'ఉష్ణోగ్రతను 22–24°C కి తగ్గించడానికి కిటికీలు మరియు తలుపులు తెరవండి.',
        'తేమను 75% లోపు ఉంచడానికి రోజూ ఉదయం సున్నం పొడి చల్లండి.',
        'పండిన పారదర్శక పురుగులను చంద్రికలపై సరైన పద్ధతిలో ఎక్కించండి.'
      ],
      monitoring_checklist: [
        'పురుగులు తల పైకెత్తి గూడు కట్టడానికి స్థలం వెతుకుతుంటే గుర్తించండి.',
        'గూడు కట్టే మొదటి 48 గంటలు గదిలో పొడి గాలి ఆడేలా చూడండి.',
        'చంద్రికలపై నేరుగా ఎండ పడకుండా చూసుకోండి.'
      ]
    },
    hi: {
      stage_title: 'चरण 5 (अंतिम अवस्था एवं कोकून निर्माण)',
      biological_context: 'अधिकतम भोजन का चरण। जीवन के कुल भोजन का 80–85% खाकर रेशम प्रोटीन का संश्लेषण करती हैं।',
      pathogen_risks: 'कोकून कताई के दौरान अधिक नमी (>75%) से कोकून पर दाग पड़ जाते हैं और रेशम की गुणवत्ता घट जाती है।',
      room_interventions: [
        'तापमान को 22–24°C तक लाने के लिए कमरे के सभी दरवाजे और खिड़कियां खोलें।',
        'नमी को 75% से नीचे रखने के लिए रोज सुबह बुझा हुआ चूना छिड़कें।',
        'पके हुए पारदर्शी कीटों को चंद्रिका (Mountage) पर सही दूरी पर चढ़ाएं।'
      ],
      monitoring_checklist: [
        'कीटों द्वारा कोकून बनाने के लिए ऊपर चढ़ने के व्यवहार पर नजर रखें।',
        'कोकून कताई के पहले 48 घंटों में कमरे में सूखी और ताजी हवा सुनिश्चित करें।',
        'चंद्रिका पर सीधी तेज धूप न पड़ने दें।'
      ]
    }
  }
};

/**
 * Calculates deterministic variance analysis
 */
export function analyzeClimateVariance(stageKey, currentTemp, currentHumidity) {
  const rules = INSTAR_CLIMATE_KNOWLEDGE[stageKey] || INSTAR_CLIMATE_KNOWLEDGE['Instar 3'];
  const t = parseFloat(currentTemp) || 0;
  const h = parseFloat(currentHumidity) || 0;

  // Temperature variance
  let tempDelta = 0;
  let tempStatus = 'optimal'; // 'low' | 'optimal' | 'high'
  if (t < rules.ideal_temp_min) {
    tempDelta = +(t - rules.ideal_temp_min).toFixed(1);
    tempStatus = 'low';
  } else if (t > rules.ideal_temp_max) {
    tempDelta = +(t - rules.ideal_temp_max).toFixed(1);
    tempStatus = 'high';
  }

  // Humidity variance
  let humDelta = 0;
  let humStatus = 'optimal'; // 'low' | 'optimal' | 'high'
  if (h < rules.ideal_hum_min) {
    humDelta = +(h - rules.ideal_hum_min).toFixed(1);
    humStatus = 'low';
  } else if (h > rules.ideal_hum_max) {
    humDelta = +(h - rules.ideal_hum_max).toFixed(1);
    humStatus = 'high';
  }

  // Overall Severity
  let overallStatus = 'SAFE';
  if (Math.abs(tempDelta) >= 3.0 || Math.abs(humDelta) >= 8.0) {
    overallStatus = 'CRITICAL';
  } else if (tempDelta !== 0 || humDelta !== 0) {
    overallStatus = 'WARNING';
  }

  return {
    ideal_temp_min: rules.ideal_temp_min,
    ideal_temp_max: rules.ideal_temp_max,
    ideal_hum_min: rules.ideal_hum_min,
    ideal_hum_max: rules.ideal_hum_max,
    currentTemp: t,
    currentHumidity: h,
    tempDelta,
    tempStatus,
    humDelta,
    humStatus,
    overallStatus
  };
}

/**
 * Helper to fetch localized advisory data
 */
export function getInstarAdvisory(stageKey, lang = 'en') {
  const entry = INSTAR_CLIMATE_KNOWLEDGE[stageKey] || INSTAR_CLIMATE_KNOWLEDGE['Instar 3'];
  return entry[lang] || entry.en;
}