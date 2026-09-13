import json
import uuid
from flask import Blueprint, request, jsonify, current_app, g
from middleware.auth import firebase_auth_required
from firebase.firestore_service import (
    save_silkworm_diagnosis_firestore,
    get_user_silkworm_history_firestore
)
from models.database import db, SilkwormDiagnosis

silkworm_bp = Blueprint('silkworm', __name__)

@silkworm_bp.route('/symptoms', methods=['GET'])
def get_symptoms_list():
    try:
        silkworm_service = current_app.config['SILKWORM_SERVICE']
        symptoms = silkworm_service.get_symptoms()
        return jsonify({
            'success': True,
            'symptoms': symptoms
        }), 200
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500


@silkworm_bp.route('/diagnose', methods=['POST'])
@firebase_auth_required
def diagnose_silkworm():
    try:
        uid = g.uid
        data = request.get_json() or {}
        selected_symptoms = data.get('symptoms', [])

        if not selected_symptoms:
            return jsonify({'success': False, 'message': 'Please select at least one symptom'}), 400

        silkworm_service = current_app.config['SILKWORM_SERVICE']
        result = silkworm_service.diagnose(selected_symptoms)

        if not result.get('success'):
            return jsonify({'success': False, 'message': result.get('message', 'Diagnosis failed')}), 400

        diagnosis_id = str(uuid.uuid4())
        top_match = result['top_match']

        # Extract optional context metadata (rearing stage, bed, severity, feeding, env)
        context = {
            'stage': data.get('stage'),
            'rearing_bed': data.get('rearing_bed'),
            'observed_severity': data.get('observed_severity'),
            'onset_timeline': data.get('onset_timeline'),
            'affected_ratio': data.get('affected_ratio'),
            'feeding_behavior': data.get('feeding_behavior'),
            'larval_activity': data.get('larval_activity'),
            'temperature': data.get('temperature'),
            'humidity': data.get('humidity'),
            'bed_condition': data.get('bed_condition'),
            'ventilation': data.get('ventilation')
        }

        # 1. Firestore Save (safely captures diagnosis_id and returns id, doc)
        fs_id, fs_doc = save_silkworm_diagnosis_firestore(
            uid=uid,
            diagnosis_id=diagnosis_id,
            selected_symptoms=selected_symptoms,
            top_match=top_match,
            all_matches=result.get('all_matches', []),
            context=context
        )

        # 2. Legacy Dual-Write to SQLite (Fallback/Reference)
        try:
            diag_record = SilkwormDiagnosis(
                user_id=1,  # Legacy integer placeholder
                selected_symptoms=json.dumps(selected_symptoms),
                predicted_disease=top_match['name'],
                match_percentage=top_match['match_percentage'],
                disease_type=top_match['type']
            )
            db.session.add(diag_record)
            db.session.commit()
        except Exception as db_err:
            current_app.logger.warning(f"SQLite dual-write failed (non-critical): {db_err}")
            db.session.rollback()

        result['diagnosisId'] = fs_id or diagnosis_id
        result['id'] = fs_id or diagnosis_id
        result['createdAt'] = fs_doc.get('createdAtIso') if fs_doc else None
        result['context'] = context

        return jsonify({
            'success': True,
            'message': 'Silkworm preliminary diagnosis generated successfully',
            'data': result
        }), 200

    except Exception as e:
        current_app.logger.error(f"[ERROR] Silkworm diagnosis failed: {e}", exc_info=True)
        return jsonify({'success': False, 'message': f'Diagnosis failure: {str(e)}'}), 500


@silkworm_bp.route('/history', methods=['GET'])
@firebase_auth_required
def get_silkworm_history():
    try:
        uid = g.uid
        history = get_user_silkworm_history_firestore(uid)
        return jsonify({
            'success': True,
            'history': history
        }), 200
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500