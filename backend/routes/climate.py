from flask import Blueprint, request, jsonify, current_app, g
from middleware.auth import firebase_auth_required
from firebase.firestore_service import (
    save_climate_check_firestore,
    get_user_climate_checks_firestore
)
from models.database import db, ClimateCheck

climate_bp = Blueprint('climate', __name__)

@climate_bp.route('/check', methods=['POST'])
@firebase_auth_required
def check_climate():
    try:
        uid = g.uid
        data = request.get_json() or {}

        stage = data.get('stage', 'Instar 3')
        try:
            temperature = float(data.get('temperature'))
            humidity = float(data.get('humidity'))
        except (ValueError, TypeError):
            return jsonify({'success': False, 'message': 'Temperature and humidity must be valid numbers'}), 400

        # Evaluate climate using climate advisory service engine
        climate_service = current_app.config['CLIMATE_SERVICE']
        result = climate_service.evaluate(stage, temperature, humidity)

        # 1. Save to Cloud Firestore users/{uid}/climateChecks/{checkId}
        check_id, firestore_doc = save_climate_check_firestore(uid, result)

        # 2. Dual-write to Legacy SQLite table for rollback safety
        try:
            check_record = ClimateCheck(
                user_id=1,
                stage=stage,
                temperature=temperature,
                humidity=humidity,
                status=result['status'],
                temp_correction=result['temperature_correction'],
                humidity_correction=result['humidity_correction'],
                impact_summary=result['impact_summary']
            )
            db.session.add(check_record)
            db.session.commit()
        except Exception as sql_err:
            db.session.rollback()
            print(f"[WARN] Legacy SQLite climate check dual-write skipped: {sql_err}")

        result['checkId'] = check_id
        result['id'] = check_id
        result['uid'] = uid
        result['created_at'] = firestore_doc.get('createdAtIso') if firestore_doc else None

        return jsonify({
            'success': True,
            'message': 'Climate status evaluated successfully',
            'data': result
        }), 200

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500


@climate_bp.route('/history', methods=['GET'])
@firebase_auth_required
def get_climate_history():
    try:
        uid = g.uid
        # Retrieve Firestore climate checks for verified uid only
        history_list = get_user_climate_checks_firestore(uid)

        return jsonify({
            'success': True,
            'history': history_list
        }), 200
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

