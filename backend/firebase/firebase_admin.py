import os
import json
import firebase_admin
from firebase_admin import credentials, auth

_firebase_app = None

def init_firebase_admin():
    """
    Initializes Firebase Admin SDK exactly once.
    Reuses existing initialization if already present.
    Never exposes private secrets or hardcodes key strings.

    Dual credential loading strategy:
    A. File path via GOOGLE_APPLICATION_CREDENTIALS or FIREBASE_SERVICE_ACCOUNT_KEY.
    B. Raw JSON string via FIREBASE_SERVICE_ACCOUNT_KEY.
    C. Project-ID fallback for GCP hosting or local emulation.
    """
    global _firebase_app
    if _firebase_app is not None or len(firebase_admin._apps) > 0:
        _firebase_app = firebase_admin.get_app()
        return _firebase_app

    cred = None
    cred_source = os.environ.get('GOOGLE_APPLICATION_CREDENTIALS') or os.environ.get('FIREBASE_SERVICE_ACCOUNT_KEY')

    # A. Check if credential source points to an existing file
    if cred_source and os.path.exists(cred_source):
        try:
            cred = credentials.Certificate(cred_source)
            print("[OK] Firebase Admin SDK: Loaded credentials from file path")
        except Exception as e:
            print(f"[WARN] Failed to load credentials from file path: {e}")

    # B. If not a file, check if FIREBASE_SERVICE_ACCOUNT_KEY contains raw JSON
    if cred is None:
        raw_key = os.environ.get('FIREBASE_SERVICE_ACCOUNT_KEY')
        if raw_key and isinstance(raw_key, str) and raw_key.strip().startswith('{'):
            try:
                cert_dict = json.loads(raw_key.strip())
                if isinstance(cert_dict, dict) and 'private_key' in cert_dict:
                    cred = credentials.Certificate(cert_dict)
                    print("[OK] Firebase Admin SDK: Loaded credentials from raw JSON environment secret")
            except Exception as e:
                # Log safe operational warning without leaking credential contents
                print(f"[WARN] Failed to parse raw JSON credentials from FIREBASE_SERVICE_ACCOUNT_KEY: {type(e).__name__}")

    try:
        if cred:
            _firebase_app = firebase_admin.initialize_app(cred)
        else:
            # C. Fallback initialization using project options (e.g. for GCP environments or local emulator)
            project_id = os.environ.get('FIREBASE_PROJECT_ID', 'serisense-ai')
            _firebase_app = firebase_admin.initialize_app(options={'projectId': project_id})
            print(f"[OK] Firebase Admin SDK initialized with project ID: {project_id}")
    except Exception as e:
        print(f"[WARN] Firebase Admin SDK initialization warning: {e}")
        if len(firebase_admin._apps) > 0:
            _firebase_app = firebase_admin.get_app()

    return _firebase_app

def verify_firebase_id_token(id_token):
    """
    Verifies Firebase ID token using official Firebase Admin SDK.
    Validates token signature, authenticity, expiration, and issuer.
    Returns decoded token dictionary containing verified 'uid' and claims.
    """
    if len(firebase_admin._apps) == 0:
        init_firebase_admin()

    # Verify ID token through Firebase Admin auth module
    decoded_token = auth.verify_id_token(id_token, check_revoked=False)
    return decoded_token
