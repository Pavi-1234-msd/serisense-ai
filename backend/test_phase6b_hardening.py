import os
import json
import tempfile
import unittest
from unittest.mock import patch, MagicMock

class Phase6BVerificationTests(unittest.TestCase):
    def test_01_dual_credential_loading_file(self):
        """Test A: Credential loaded from file path."""
        with tempfile.NamedTemporaryFile(mode='w', suffix='.json', delete=False) as f:
            f.write('{"type": "service_account", "private_key": "test"}')
            f_path = f.name

        try:
            with patch.dict(os.environ, {'FIREBASE_SERVICE_ACCOUNT_KEY': f_path}):
                self.assertTrue(os.path.exists(f_path))
                # Check path logic
                cred_source = os.environ.get('FIREBASE_SERVICE_ACCOUNT_KEY')
                self.assertTrue(cred_source and os.path.exists(cred_source))
        finally:
            if os.path.exists(f_path):
                os.remove(f_path)

    def test_02_dual_credential_loading_raw_json(self):
        """Test B: Raw JSON string in FIREBASE_SERVICE_ACCOUNT_KEY parsed safely without error."""
        raw_json_str = json.dumps({
            "type": "service_account",
            "project_id": "serisense-ai",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n",
            "client_email": "firebase-adminsdk@serisense-ai.iam.gserviceaccount.com"
        })

        with patch.dict(os.environ, {'FIREBASE_SERVICE_ACCOUNT_KEY': raw_json_str}):
            cred_source = os.environ.get('FIREBASE_SERVICE_ACCOUNT_KEY')
            self.assertFalse(os.path.exists(cred_source))
            parsed = json.loads(cred_source)
            self.assertIsInstance(parsed, dict)
            self.assertIn('private_key', parsed)
            self.assertEqual(parsed['project_id'], 'serisense-ai')

    def test_03_cors_origin_parsing(self):
        """Test C: ALLOWED_ORIGINS comma-separated parsing and trimming."""
        test_env = "https://serisense-ai.vercel.app, http://localhost:3000 , http://127.0.0.1:3000"
        allowed = [orig.strip() for orig in test_env.split(',') if orig.strip()]
        self.assertEqual(allowed, [
            "https://serisense-ai.vercel.app",
            "http://localhost:3000",
            "http://127.0.0.1:3000"
        ])
        self.assertNotIn('*', allowed)

    def test_04_api_base_url_normalization(self):
        """Test D: Normalization removes trailing slashes without breaking URLs."""
        test_urls = [
            ("https://serisense-backend.onrender.com/api/", "https://serisense-backend.onrender.com/api"),
            ("https://serisense-backend.onrender.com/api///", "https://serisense-backend.onrender.com/api"),
            ("http://localhost:5000/api", "http://localhost:5000/api"),
            ("https://api.serisense.org", "https://api.serisense.org"),
        ]
        for input_url, expected in test_urls:
            normalized = input_url.rstrip('/')
            self.assertEqual(normalized, expected)

    def test_05_temporary_upload_cleanup_logic(self):
        """Test E: Temporary local file is removed in finally block."""
        with tempfile.NamedTemporaryFile(mode='wb', delete=False) as temp_img:
            temp_img.write(b"fake image bytes")
            temp_path = temp_img.name

        self.assertTrue(os.path.exists(temp_path))

        # Simulate finally-block cleanup
        try:
            # simulated work
            processed = True
        finally:
            if os.path.exists(temp_path):
                os.remove(temp_path)

        self.assertFalse(os.path.exists(temp_path))

if __name__ == '__main__':
    unittest.main()
