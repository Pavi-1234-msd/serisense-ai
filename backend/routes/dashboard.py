from flask import Blueprint, jsonify, current_app, g
from middleware.auth import firebase_auth_required
from firebase.firestore_service import (
    get_user_leaf_history_firestore,
    get_user_climate_history_firestore,
    get_user_silkworm_history_firestore
)

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/summary', methods=['GET'])
@firebase_auth_required
def get_dashboard_summary():
    try:
        uid = g.uid

        leaf_history = get_user_leaf_history_firestore(uid)
        climate_history = get_user_climate_history_firestore(uid)
        silkworm_history = get_user_silkworm_history_firestore(uid)

        leaf_count = len(leaf_history)
        climate_count = len(climate_history)
        silkworm_count = len(silkworm_history)

        latest_leaf = leaf_history[0] if leaf_history else None
        latest_climate = climate_history[0] if climate_history else None
        latest_silkworm = silkworm_history[0] if silkworm_history else None

        classifier_service = current_app.config['LEAF_SERVICE']

        if latest_leaf and 'report' not in latest_leaf:
            disease_name = latest_leaf.get('disease')
            latest_leaf['report'] = classifier_service.knowledge_base.get(disease_name, {})

        latest_activity = {
            'leaf': latest_leaf,
            'climate': latest_climate,
            'silkworm': latest_silkworm
        }

        # Build current alert status from latest climate check
        alert = None
        if latest_climate:
            status = latest_climate.get('status', 'Optimal')
            stage = latest_climate.get('stage', 'General')
            alert = {
                'status': status,
                'stage': stage,
                'message': f"Climate status for {stage} is {status}.",
                'temp_correction': latest_climate.get('temperature_correction', latest_climate.get('temp_correction')),
                'humidity_correction': latest_climate.get('humidity_correction'),
                'created_at': latest_climate.get('createdAt')
            }

        return jsonify({
            'success': True,
            'user': {
                'uid': uid,
                'email': getattr(g, 'email', '')
            },
            'stats': {
                'total_leaf_scans': leaf_count,
                'total_climate_checks': climate_count,
                'total_silkworm_diagnoses': silkworm_count,
                'total_activities': leaf_count + climate_count + silkworm_count
            },
            'recent_activity': latest_activity,
            'current_alert': alert
        }), 200

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

