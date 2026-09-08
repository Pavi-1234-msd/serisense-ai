from datetime import datetime
from flask import Blueprint, jsonify, current_app, g
from middleware.auth import firebase_auth_required
from firebase.firestore_service import (
    get_user_leaf_history_firestore,
    get_user_climate_history_firestore,
    get_user_silkworm_history_firestore
)
from services.sericulture_risk_engine import SericultureRiskEngine

risk_bp = Blueprint('risk', __name__)

@risk_bp.route('/current', methods=['GET'])
@firebase_auth_required
def get_current_risk():
    """
    Protected endpoint to fetch the current cross-module Sericulture Risk Assessment.
    
    Security:
    - Requires valid Firebase Bearer token.
    - Verified UID is retrieved strictly from g.uid (Firebase Admin SDK).
    - Client-supplied UIDs in query or body are strictly discarded.
    
    Data Integrity:
    - Retrieves authoritative Firestore records for g.uid only.
    - If insufficient data exists, returns status='INSUFFICIENT_DATA' without fabricating risk.
    """
    try:
        uid = g.uid

        # Fetch recent records for the authenticated farmer
        leaf_history = get_user_leaf_history_firestore(uid, limit=10)
        climate_history = get_user_climate_history_firestore(uid, limit=10)
        silkworm_history = get_user_silkworm_history_firestore(uid, limit=10)

        latest_leaf = leaf_history[0] if leaf_history else None
        latest_climate = climate_history[0] if climate_history else None
        latest_silkworm = silkworm_history[0] if silkworm_history else None

        # Build combined chronological event list for repeated event analysis
        all_events = []
        for l in leaf_history:
            all_events.append({
                'type': 'leaf',
                'disease': l.get('disease'),
                'status': l.get('disease'),
                'createdAt': l.get('createdAtIso') or l.get('createdAt')
            })
        for c in climate_history:
            all_events.append({
                'type': 'climate',
                'status': c.get('status'),
                'createdAt': c.get('createdAtIso') or c.get('createdAt')
            })
        for s in silkworm_history:
            top_m = s.get('topMatch') or s.get('top_match') or {}
            all_events.append({
                'type': 'silkworm',
                'disease': s.get('predictedDisease') or top_m.get('name'),
                'status': s.get('predictedDisease') or top_m.get('name'),
                'createdAt': s.get('createdAtIso') or s.get('createdAt')
            })

        # Evaluate through the pure, deterministic risk engine
        evaluation = SericultureRiskEngine.evaluate(
            leaf_record=latest_leaf,
            climate_record=latest_climate,
            silkworm_record=latest_silkworm,
            historical_events=all_events
        )

        response_payload = {
            "success": True,
            "status": evaluation["status"],
            "risk_level": evaluation["risk_level"],
            "risk_score": evaluation["risk_score"],
            "score_label": evaluation["score_label"],
            "factors": evaluation["factors"],
            "priority_actions": evaluation["priority_actions"],
            "explanation": evaluation["explanation"],
            "rule_ids": evaluation["rule_ids"],
            "current_context": evaluation["current_context"],
            "latest_assessments": {
                "leaf": {
                    "disease": latest_leaf.get('disease') if latest_leaf else None,
                    "confidence": latest_leaf.get('confidence') if latest_leaf else None,
                    "created_at": latest_leaf.get('createdAtIso') if latest_leaf else None
                } if latest_leaf else None,
                "climate": {
                    "stage": latest_climate.get('stage') if latest_climate else None,
                    "temperature": latest_climate.get('temperature') if latest_climate else None,
                    "humidity": latest_climate.get('humidity') if latest_climate else None,
                    "status": latest_climate.get('status') if latest_climate else None,
                    "created_at": latest_climate.get('createdAtIso') if latest_climate else None
                } if latest_climate else None,
                "silkworm": {
                    "predicted_disease": latest_silkworm.get('predictedDisease') if latest_silkworm else None,
                    "match_percentage": latest_silkworm.get('matchPercentage') if latest_silkworm else None,
                    "created_at": latest_silkworm.get('createdAtIso') if latest_silkworm else None
                } if latest_silkworm else None
            },
            "generated_at": datetime.utcnow().isoformat()
        }

        return jsonify(response_payload), 200

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500
