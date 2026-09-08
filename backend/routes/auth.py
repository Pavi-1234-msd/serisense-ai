from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import datetime
from models.database import db, User

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json() or {}
        email = (data.get('email') or '').strip().lower()
        password = data.get('password') or ''
        full_name = (data.get('full_name') or '').strip()

        if not email or not password or not full_name:
            return jsonify({'success': False, 'message': 'Full name, email, and password are required'}), 400

        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({'success': False, 'message': 'Account with this email already exists'}), 409

        user = User(
            full_name=full_name,
            email=email,
            phone=data.get('phone', ''),
            preferred_language=data.get('preferred_language', 'en'),
            farm_name=data.get('farm_name', ''),
            village=data.get('village', ''),
            district=data.get('district', ''),
            state=data.get('state', '')
        )
        user.set_password(password)

        db.session.add(user)
        db.session.commit()

        # Create access token
        access_token = create_access_token(identity=str(user.id))

        return jsonify({
            'success': True,
            'message': 'Registration successful',
            'token': access_token,
            'user': user.to_dict()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': str(e)}), 500


@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json() or {}
        identifier = (data.get('email') or data.get('identifier') or '').strip().lower()
        password = data.get('password') or ''

        if not identifier or not password:
            return jsonify({'success': False, 'message': 'Email/phone and password are required'}), 400

        # Support login by email or phone
        user = User.query.filter((User.email == identifier) | (User.phone == identifier)).first()
        if not user or not user.check_password(password):
            return jsonify({'success': False, 'message': 'Invalid email/phone or password'}), 401

        user.last_login = datetime.utcnow()
        db.session.commit()

        access_token = create_access_token(identity=str(user.id))

        return jsonify({
            'success': True,
            'message': 'Login successful',
            'token': access_token,
            'user': user.to_dict()
        }), 200

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500


@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    try:
        user_id = get_jwt_identity()
        user = User.query.get(int(user_id))
        if not user:
            return jsonify({'success': False, 'message': 'User not found'}), 404

        return jsonify({
            'success': True,
            'user': user.to_dict()
        }), 200
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500


@auth_bp.route('/profile', methods=['PUT', 'POST'])
@jwt_required()
def update_profile():
    try:
        user_id = get_jwt_identity()
        user = User.query.get(int(user_id))
        if not user:
            return jsonify({'success': False, 'message': 'User not found'}), 404

        data = request.get_json() or {}

        if 'full_name' in data:
            user.full_name = data['full_name'].strip()
        if 'phone' in data:
            user.phone = data['phone'].strip()
        if 'preferred_language' in data:
            user.preferred_language = data['preferred_language']
        if 'farm_name' in data:
            user.farm_name = data['farm_name'].strip()
        if 'village' in data:
            user.village = data['village'].strip()
        if 'district' in data:
            user.district = data['district'].strip()
        if 'state' in data:
            user.state = data['state'].strip()
        if 'password' in data and data['password']:
            user.set_password(data['password'])

        user.updated_at = datetime.utcnow()
        db.session.commit()

        return jsonify({
            'success': True,
            'message': 'Profile updated successfully',
            'user': user.to_dict()
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': str(e)}), 500


# --- NEW: Firebase Admin ID Token Verified Endpoint ---
from flask import g
from middleware.auth import firebase_auth_required

@auth_bp.route('/firebase/me', methods=['GET'])
@firebase_auth_required
def get_firebase_current_user():
    """
    Verified endpoint for Firebase Authentication.
    Reads verified Firebase UID from g.uid (extracted from verify_id_token).
    Never trusts client-supplied UID in body or headers.
    """
    try:
        verified_uid = g.uid
        email = getattr(g, 'email', '')
        claims = getattr(g, 'firebase_user', {})

        return jsonify({
            'success': True,
            'message': 'Firebase ID token verified successfully',
            'data': {
                'uid': verified_uid,
                'email': email,
                'email_verified': claims.get('email_verified', False),
                'auth_time': claims.get('auth_time'),
                'issuer': claims.get('iss')
            }
        }), 200
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

