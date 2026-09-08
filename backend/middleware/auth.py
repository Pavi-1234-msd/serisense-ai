from functools import wraps
from flask import request, jsonify, g
from firebase.firebase_admin import verify_firebase_id_token

def firebase_auth_required(f):
    """
    Decorator to protect Flask endpoints using Firebase ID Tokens.
    
    1. Reads Authorization: Bearer <Firebase ID Token>
    2. Verifies token using Firebase Admin SDK verify_id_token()
    3. Attaches verified Firebase user info (g.firebase_user, g.uid) to Flask context
    4. Ignores any client-supplied 'uid' payload in request body or headers
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return jsonify({
                'success': False,
                'message': 'Authentication required. Authorization header missing.'
            }), 401

        parts = auth_header.split()
        if len(parts) != 2 or parts[0].lower() != 'bearer':
            return jsonify({
                'success': False,
                'message': 'Invalid authorization format. Must be Bearer <token>.'
            }), 401

        token = parts[1].strip()

        try:
            # Verify Firebase ID Token through Firebase Admin SDK
            decoded_token = verify_firebase_id_token(token)
            
            # Extract verified UID directly from verified token claims
            verified_uid = decoded_token.get('uid')
            if not verified_uid:
                return jsonify({
                    'success': False,
                    'message': 'Invalid token: missing verified UID claim.'
                }), 401

            # Attach verified user claims to Flask thread-local request context 'g'
            g.firebase_user = decoded_token
            g.uid = verified_uid
            g.email = decoded_token.get('email', '')

        except Exception as e:
            # Log error internally without exposing token or internal exception details to client
            print(f"[WARN] Firebase ID token verification failed: {e}")
            return jsonify({
                'success': False,
                'message': 'Invalid or expired authentication token. Please log in again.'
            }), 401

        return f(*args, **kwargs)

    return decorated_function


def admin_required(f):
    """
    Decorator to enforce server-side Role-Based Access Control (RBAC) for Admin endpoints.
    
    Prerequisites:
    1. Must be preceded by @firebase_auth_required (or wraps token verification).
    2. Reads verified UID solely from g.uid (populated by verify_firebase_id_token).
    3. Loads user profile from Firestore: users/{g.uid}.
    4. Evaluates trusted server-side 'role' field, normalizing to uppercase 'ADMIN'.
    5. Rejects non-admin users with HTTP 403 Forbidden.
    6. Rejects unauthenticated requests with HTTP 401 Unauthorized.
    7. Ignores any client-supplied 'role' or 'uid' in request headers, params, or body.
    """
    @wraps(f)
    @firebase_auth_required
    def decorated_admin_function(*args, **kwargs):
        verified_uid = getattr(g, 'uid', None)
        if not verified_uid:
            return jsonify({
                'success': False,
                'message': 'Authentication required. Verified UID missing.'
            }), 401

        # Check for role in Firebase custom claims first
        claims = getattr(g, 'firebase_user', {})
        claim_role = str(claims.get('role', '')).strip().upper()
        if claim_role == 'ADMIN':
            g.is_admin = True
            return f(*args, **kwargs)

        # Retrieve user profile from Cloud Firestore users/{verified_uid}
        try:
            from firebase.firestore_service import get_user_profile_firestore
            profile = get_user_profile_firestore(verified_uid)
        except Exception as e:
            print(f"[WARN] Failed to load Firestore profile for admin verification: {e}")
            profile = None

        if not profile:
            # Role cannot be confirmed
            return jsonify({
                'success': False,
                'message': 'Forbidden: Administrator privileges required.'
            }), 403

        # Canonical role check: normalize to uppercase 'ADMIN'
        raw_role = profile.get('role', '')
        normalized_role = str(raw_role).strip().upper()

        if normalized_role != 'ADMIN':
            return jsonify({
                'success': False,
                'message': 'Forbidden: Administrator privileges required.'
            }), 403

        g.is_admin = True
        return f(*args, **kwargs)

    return decorated_admin_function
