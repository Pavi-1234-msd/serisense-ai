import os
import uuid
from flask import Blueprint, request, jsonify, current_app, g
from middleware.auth import firebase_auth_required
from firebase.firestore_service import (
    save_leaf_prediction_firestore, 
    get_user_leaf_predictions_firestore,
    upload_leaf_image_to_storage
)
from models.database import db, LeafPrediction

leaf_bp = Blueprint('leaf', __name__)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@leaf_bp.route('/predict', methods=['POST'])
@firebase_auth_required
def predict_leaf():
    try:
        uid = g.uid

        if 'image' not in request.files and 'file' not in request.files:
            return jsonify({'success': False, 'message': 'No image file uploaded'}), 400

        file = request.files.get('image') or request.files.get('file')
        if file.filename == '':
            return jsonify({'success': False, 'message': 'No selected image file'}), 400

        if not allowed_file(file.filename):
            return jsonify({'success': False, 'message': 'Invalid file type. Only JPG, JPEG, and PNG are allowed'}), 400

        # Read image bytes
        image_bytes = file.read()
        if len(image_bytes) > current_app.config.get('MAX_CONTENT_LENGTH', 16 * 1024 * 1024):
            return jsonify({'success': False, 'message': 'File size exceeds maximum allowed limit'}), 400

        # Save image file locally as temporary processing buffer
        ext = file.filename.rsplit('.', 1)[1].lower()
        saved_filename = f"leaf_{uuid.uuid4().hex[:12]}.{ext}"
        upload_folder = current_app.config.get('UPLOAD_FOLDER', 'uploads')
        os.makedirs(upload_folder, exist_ok=True)
        file_path = os.path.join(upload_folder, saved_filename)
        with open(file_path, 'wb') as f:
            f.write(image_bytes)

        try:
            # Classify image using leaf classifier service (MobileNetV2 / TFLite)
            classifier_service = current_app.config['LEAF_SERVICE']
            result = classifier_service.predict(image_bytes)

            # 1. Save to Cloud Firestore users/{uid}/leafPredictions/{predictionId}
            storage_path = upload_leaf_image_to_storage(uid, saved_filename, image_bytes, content_type=f"image/{ext}")
            prediction_id, firestore_doc = save_leaf_prediction_firestore(uid, result, saved_filename, storage_path)

            # 2. Dual-write to Legacy SQLite table for rollback safety
            try:
                preds = result['predictions']
                prediction_record = LeafPrediction(
                    user_id=1, # Default legacy integer ID fallback
                    image_filename=saved_filename,
                    disease=result['disease'],
                    confidence=result['confidence'],
                    prob_disease_free=preds.get('Disease Free leaves', 0.0),
                    prob_leaf_rust=preds.get('Leaf Rust', 0.0),
                    prob_leaf_spot=preds.get('Leaf Spot', 0.0)
                )
                db.session.add(prediction_record)
                db.session.commit()
            except Exception as sql_err:
                db.session.rollback()
                print(f"[WARN] Legacy SQLite prediction dual-write skipped: {sql_err}")

            # Build response payload
            response_data = {
                'predictionId': prediction_id,
                'id': prediction_id,
                'uid': uid,
                'disease': result['disease'],
                'confidence': result['confidence'],
                'predictions': result['predictions'],
                'report': result['report'],
                'image_filename': saved_filename,
                'storagePath': storage_path,
                'created_at': firestore_doc.get('createdAtIso') if firestore_doc else None
            }

            return jsonify({
                'success': True,
                'message': 'Leaf disease analysis completed successfully',
                'data': response_data
            }), 200

        finally:
            # Clean up temporary local processing file to prevent disk accumulation on ephemeral hosting
            if os.path.exists(file_path):
                try:
                    os.remove(file_path)
                except Exception as cleanup_err:
                    print(f"[WARN] Temporary image cleanup skipped: {cleanup_err}")

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500


@leaf_bp.route('/history', methods=['GET'])
@firebase_auth_required
def get_prediction_history():
    try:
        uid = g.uid
        # Retrieve Firestore predictions for verified uid only
        history_list = get_user_leaf_predictions_firestore(uid)

        return jsonify({
            'success': True,
            'history': history_list
        }), 200
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

