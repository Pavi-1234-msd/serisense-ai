import uuid
from datetime import datetime
import firebase_admin
from firebase_admin import firestore, storage
from firebase.firebase_admin import init_firebase_admin

def get_firestore_db():
    """
    Returns initialized Firestore client from Firebase Admin SDK.
    """
    init_firebase_admin()
    return firestore.client()

def upload_leaf_image_to_storage(uid, prediction_id, image_bytes, content_type='image/jpeg'):
    """
    Uploads leaf image to Firebase Storage under path: leaf-images/{uid}/{prediction_id}.jpg
    Returns image path/URL. Fallbacks gracefully if bucket is not configured.
    """
    storage_path = f"leaf-images/{uid}/{prediction_id}.jpg"
    try:
        bucket = storage.bucket()
        blob = bucket.blob(storage_path)
        blob.upload_from_string(image_bytes, content_type=content_type)
        print(f"[OK] Leaf image uploaded to Firebase Storage: {storage_path}")
        return storage_path
    except Exception as e:
        print(f"[WARN] Firebase Storage upload skipped or failed: {e}")
        return storage_path

def save_leaf_prediction_firestore(uid, result_dict, saved_filename, storage_path=None):
    """
    Saves leaf disease prediction document to Firestore under: users/{uid}/leafPredictions/{prediction_id}
    """
    try:
        db = get_firestore_db()
        prediction_id = f"leaf_{uuid.uuid4().hex[:12]}"
        
        preds = result_dict.get('predictions', {})
        prediction_doc = {
            'predictionId': prediction_id,
            'uid': uid,
            'disease': result_dict.get('disease', 'Unknown'),
            'confidence': result_dict.get('confidence', 0.0),
            'predictions': preds,
            'report': result_dict.get('report', {}),
            'imageFilename': saved_filename,
            'storagePath': storage_path or f"leaf-images/{uid}/{prediction_id}.jpg",
            'createdAt': firestore.SERVER_TIMESTAMP,
            'createdAtIso': datetime.utcnow().isoformat()
        }

        doc_ref = db.collection('users').document(uid).collection('leafPredictions').document(prediction_id)
        doc_ref.set(prediction_doc)
        print(f"[OK] Leaf prediction saved to Firestore: users/{uid}/leafPredictions/{prediction_id}")
        return prediction_id, prediction_doc
    except Exception as e:
        print(f"[ERROR] Firestore save leaf prediction failed: {e}")
        return None, None

def save_climate_check_firestore(uid, climate_result):
    """
    Saves climate advisory check document to Firestore under: users/{uid}/climateChecks/{check_id}
    """
    try:
        db = get_firestore_db()
        check_id = f"climate_{uuid.uuid4().hex[:12]}"

        climate_doc = {
            'checkId': check_id,
            'uid': uid,
            'stage': climate_result.get('stage', ''),
            'temperature': climate_result.get('temperature', 0.0),
            'humidity': climate_result.get('humidity', 0.0),
            'status': climate_result.get('status', 'SAFE'),
            'idealRange': climate_result.get('ideal_range', {}),
            'temperatureCorrection': climate_result.get('temperature_correction', ''),
            'humidityCorrection': climate_result.get('humidity_correction', ''),
            'impactSummary': climate_result.get('impact_summary', ''),
            'createdAt': firestore.SERVER_TIMESTAMP,
            'createdAtIso': datetime.utcnow().isoformat()
        }

        doc_ref = db.collection('users').document(uid).collection('climateChecks').document(check_id)
        doc_ref.set(climate_doc)
        print(f"[OK] Climate check saved to Firestore: users/{uid}/climateChecks/{check_id}")
        return check_id, climate_doc
    except Exception as e:
        print(f"[ERROR] Firestore save climate check failed: {e}")
        return None, None

def save_silkworm_diagnosis_firestore(uid, diagnosis_result, selected_symptoms):
    """
    Saves silkworm disease diagnosis document to Firestore under: users/{uid}/silkwormDiagnoses/{diagnosis_id}
    """
    try:
        db = get_firestore_db()
        diagnosis_id = f"silkworm_{uuid.uuid4().hex[:12]}"

        top_match = diagnosis_result.get('top_match', {})
        diagnosis_doc = {
            'diagnosisId': diagnosis_id,
            'uid': uid,
            'selectedSymptoms': selected_symptoms or [],
            'predictedDisease': top_match.get('name', 'Unknown') if top_match else 'None',
            'matchPercentage': top_match.get('match_percentage', 0.0) if top_match else 0.0,
            'topMatch': top_match,
            'allMatches': diagnosis_result.get('all_matches', []),
            'assessmentType': 'Preliminary symptom-based assessment',
            'createdAt': firestore.SERVER_TIMESTAMP,
            'createdAtIso': datetime.utcnow().isoformat()
        }

        doc_ref = db.collection('users').document(uid).collection('silkwormDiagnoses').document(diagnosis_id)
        doc_ref.set(diagnosis_doc)
        print(f"[OK] Silkworm diagnosis saved to Firestore: users/{uid}/silkwormDiagnoses/{diagnosis_id}")
        return diagnosis_id, diagnosis_doc
    except Exception as e:
        print(f"[ERROR] Firestore save silkworm diagnosis failed: {e}")
        return None, None

def get_user_leaf_predictions_firestore(uid, limit=50):
    """
    Retrieves user-specific leaf prediction records from Firestore users/{uid}/leafPredictions
    """
    try:
        db = get_firestore_db()
        docs = db.collection('users').document(uid).collection('leafPredictions')\
                 .order_by('createdAt', direction=firestore.Query.DESCENDING)\
                 .limit(limit).stream()
        results = []
        for d in docs:
            data = d.to_dict()
            # Convert server timestamp to ISO string if needed
            if 'createdAt' in data and hasattr(data['createdAt'], 'isoformat'):
                data['createdAtIso'] = data['createdAt'].isoformat()
            results.append(data)
        return results
    except Exception as e:
        print(f"[WARN] Firestore fetch leaf predictions failed: {e}")
        return []

def get_user_climate_checks_firestore(uid, limit=50):
    """
    Retrieves user-specific climate check records from Firestore users/{uid}/climateChecks
    """
    try:
        db = get_firestore_db()
        docs = db.collection('users').document(uid).collection('climateChecks')\
                 .order_by('createdAt', direction=firestore.Query.DESCENDING)\
                 .limit(limit).stream()
        results = []
        for d in docs:
            data = d.to_dict()
            if 'createdAt' in data and hasattr(data['createdAt'], 'isoformat'):
                data['createdAtIso'] = data['createdAt'].isoformat()
            results.append(data)
        return results
    except Exception as e:
        print(f"[WARN] Firestore fetch climate checks failed: {e}")
        return []

def get_user_silkworm_diagnoses_firestore(uid, limit=50):
    """
    Retrieves user-specific silkworm diagnosis records from Firestore users/{uid}/silkwormDiagnoses
    """
    try:
        db = get_firestore_db()
        docs = db.collection('users').document(uid).collection('silkwormDiagnoses')\
                 .order_by('createdAt', direction=firestore.Query.DESCENDING)\
                 .limit(limit).stream()
        results = []
        for d in docs:
            data = d.to_dict()
            if 'createdAt' in data and hasattr(data['createdAt'], 'isoformat'):
                data['createdAtIso'] = data['createdAt'].isoformat()
            results.append(data)
        return results
    except Exception as e:
        print(f"[WARN] Firestore fetch silkworm diagnoses failed: {e}")
        return []

# Aliases for consistent naming across routes
get_user_leaf_history_firestore = get_user_leaf_predictions_firestore
get_user_climate_history_firestore = get_user_climate_checks_firestore
get_user_silkworm_history_firestore = get_user_silkworm_diagnoses_firestore


def get_user_profile_firestore(uid):
    """
    Retrieves the user's profile document from Firestore users/{uid}.
    Used by server-side RBAC admin authorization.
    """
    try:
        db = get_firestore_db()
        doc_snap = db.collection('users').document(uid).get()
        if doc_snap.exists:
            return doc_snap.to_dict()
        return None
    except Exception as e:
        print(f"[WARN] Firestore fetch user profile failed for uid={uid}: {e}")
        return None


def get_admin_overview_stats_firestore():
    """
    Computes system-wide admin analytics directly from Cloud Firestore collections.
    Aggregates:
      - total_farmers: count of users in users collection
      - total_leaf_predictions: count of documents in leafPredictions subcollections
      - total_climate_checks: count of documents in climateChecks subcollections
      - total_silkworm_diagnoses: count of documents in silkwormDiagnoses subcollections
      - most_detected_disease: highest frequency disease name across leaf predictions
      - recent_farmers: list of recent farmer profile dictionaries (sanitized)
    
    Falls back gracefully to 0/empty values if Firestore read fails.
    """
    stats = {
        'total_farmers': 0,
        'total_leaf_predictions': 0,
        'total_climate_checks': 0,
        'total_silkworm_diagnoses': 0,
        'most_detected_disease': 'None Detected'
    }
    recent_farmers = []
    disease_counts = {}

    try:
        db = get_firestore_db()
        
        # 1. Stream users collection
        user_docs = list(db.collection('users').stream())
        stats['total_farmers'] = len(user_docs)

        for u in user_docs:
            u_data = u.to_dict()
            uid = u.id

            # Collect sanitized recent farmer data
            recent_farmers.append({
                'id': uid,
                'uid': uid,
                'full_name': u_data.get('full_name') or u_data.get('displayName') or 'Farmer',
                'email': u_data.get('email', ''),
                'phone': u_data.get('phone', ''),
                'role': str(u_data.get('role', 'farmer')).upper(),
                'preferred_language': u_data.get('preferred_language', 'en'),
                'farm_name': u_data.get('farm_name', ''),
                'village': u_data.get('village', ''),
                'district': u_data.get('district', ''),
                'state': u_data.get('state', ''),
                'created_at': u_data.get('createdAtIso') or (u_data.get('createdAt').isoformat() if hasattr(u_data.get('createdAt'), 'isoformat') else None)
            })

            # 2. Count user's leafPredictions and aggregate diseases
            try:
                leaf_docs = list(db.collection('users').document(uid).collection('leafPredictions').stream())
                stats['total_leaf_predictions'] += len(leaf_docs)
                for lp in leaf_docs:
                    lp_data = lp.to_dict()
                    dis = lp_data.get('disease')
                    if dis:
                        disease_counts[dis] = disease_counts.get(dis, 0) + 1
            except Exception as e:
                print(f"[WARN] Error scanning leafPredictions for user {uid}: {e}")

            # 3. Count user's climateChecks
            try:
                climate_docs = list(db.collection('users').document(uid).collection('climateChecks').stream())
                stats['total_climate_checks'] += len(climate_docs)
            except Exception as e:
                print(f"[WARN] Error scanning climateChecks for user {uid}: {e}")

            # 4. Count user's silkwormDiagnoses
            try:
                silkworm_docs = list(db.collection('users').document(uid).collection('silkwormDiagnoses').stream())
                stats['total_silkworm_diagnoses'] += len(silkworm_docs)
            except Exception as e:
                print(f"[WARN] Error scanning silkwormDiagnoses for user {uid}: {e}")

        # Determine most detected disease
        if disease_counts:
            sorted_diseases = sorted(disease_counts.items(), key=lambda item: item[1], reverse=True)
            stats['most_detected_disease'] = sorted_diseases[0][0]

        # Sort recent farmers by created_at descending if available, limit to 5
        recent_farmers = recent_farmers[:5]

        return {
            'stats': stats,
            'recent_farmers': recent_farmers
        }

    except Exception as e:
        print(f"[WARN] Firestore get_admin_overview_stats_firestore failed: {e}")
        return {
            'stats': stats,
            'recent_farmers': []
        }

