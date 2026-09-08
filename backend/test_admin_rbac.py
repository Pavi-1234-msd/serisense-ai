import unittest
from unittest.mock import patch, MagicMock
from app import create_app
from flask import g

class AdminRBACTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.client = self.app.test_client()

    def test_a_no_auth(self):
        """TEST A: Request with no Authorization header must return 401."""
        res = self.client.get('/api/admin/stats')
        self.assertEqual(res.status_code, 401)
        data = res.get_json()
        self.assertFalse(data['success'])
        self.assertIn('Authentication required', data['message'])

    def test_b_invalid_token(self):
        """TEST B: Request with malformed/invalid token must return 401."""
        res = self.client.get('/api/admin/stats', headers={'Authorization': 'Bearer bad.token.string'})
        self.assertEqual(res.status_code, 401)
        data = res.get_json()
        self.assertFalse(data['success'])
        self.assertIn('Invalid or expired authentication token', data['message'])

    @patch('middleware.auth.verify_firebase_id_token')
    @patch('firebase.firestore_service.get_user_profile_firestore')
    def test_c_authenticated_normal_farmer(self, mock_get_profile, mock_verify_token):
        """TEST C: Authenticated normal farmer (role='farmer') must return 403 Forbidden."""
        mock_verify_token.return_value = {
            'uid': 'farmer_uid_123',
            'email': 'farmer@serisense.com'
        }
        mock_get_profile.return_value = {
            'uid': 'farmer_uid_123',
            'email': 'farmer@serisense.com',
            'role': 'farmer'
        }

        res = self.client.get('/api/admin/stats', headers={'Authorization': 'Bearer valid.farmer.token'})
        self.assertEqual(res.status_code, 403)
        data = res.get_json()
        self.assertFalse(data['success'])
        self.assertIn('Forbidden', data['message'])

    @patch('middleware.auth.verify_firebase_id_token')
    @patch('firebase.firestore_service.get_user_profile_firestore')
    @patch('routes.admin.get_admin_overview_stats_firestore')
    def test_d_authenticated_admin(self, mock_stats, mock_get_profile, mock_verify_token):
        """TEST D: Authenticated admin (role='ADMIN') must return 200 with Firestore stats."""
        mock_verify_token.return_value = {
            'uid': 'admin_uid_999',
            'email': 'admin@serisense.com'
        }
        mock_get_profile.return_value = {
            'uid': 'admin_uid_999',
            'email': 'admin@serisense.com',
            'role': 'ADMIN'
        }
        mock_stats.return_value = {
            'stats': {
                'total_farmers': 5,
                'total_leaf_predictions': 12,
                'total_climate_checks': 8,
                'total_silkworm_diagnoses': 4,
                'most_detected_disease': 'Leaf Rust'
            },
            'recent_farmers': [{'id': 'farmer_1', 'full_name': 'Ramesh Kumar'}]
        }

        res = self.client.get('/api/admin/stats', headers={'Authorization': 'Bearer valid.admin.token'})
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertTrue(data['success'])
        self.assertEqual(data['stats']['total_farmers'], 5)
        self.assertEqual(data['stats']['most_detected_disease'], 'Leaf Rust')

    @patch('middleware.auth.verify_firebase_id_token')
    @patch('firebase.firestore_service.get_user_profile_firestore')
    def test_e_uid_spoofing(self, mock_get_profile, mock_verify_token):
        """TEST E: Client-supplied ?uid=... query param or body MUST BE IGNORED; g.uid is used."""
        mock_verify_token.return_value = {
            'uid': 'real_farmer_uid',
            'email': 'farmer@serisense.com'
        }
        # If server inspected spoofed ?uid=admin_uid, it might load admin profile.
        # But server MUST query get_user_profile_firestore('real_farmer_uid')!
        def profile_lookup(uid):
            if uid == 'real_farmer_uid':
                return {'uid': 'real_farmer_uid', 'role': 'farmer'}
            elif uid == 'spoofed_admin_uid':
                return {'uid': 'spoofed_admin_uid', 'role': 'ADMIN'}
            return None

        mock_get_profile.side_effect = profile_lookup

        # Try to spoof UID in query param and JSON body
        res = self.client.get(
            '/api/admin/stats?uid=spoofed_admin_uid',
            headers={'Authorization': 'Bearer valid.farmer.token'},
            json={'uid': 'spoofed_admin_uid'}
        )
        self.assertEqual(res.status_code, 403)
        mock_get_profile.assert_called_with('real_farmer_uid')

    @patch('middleware.auth.verify_firebase_id_token')
    @patch('firebase.firestore_service.get_user_profile_firestore')
    def test_f_role_spoofing(self, mock_get_profile, mock_verify_token):
        """TEST F: Client-supplied {"role": "ADMIN"} in headers/body MUST NOT grant admin privileges."""
        mock_verify_token.return_value = {
            'uid': 'farmer_uid_123',
            'email': 'farmer@serisense.com'
        }
        mock_get_profile.return_value = {
            'uid': 'farmer_uid_123',
            'role': 'farmer'
        }

        res = self.client.get(
            '/api/admin/stats',
            headers={
                'Authorization': 'Bearer valid.farmer.token',
                'X-User-Role': 'ADMIN'
            },
            json={'role': 'ADMIN'}
        )
        self.assertEqual(res.status_code, 403)
        data = res.get_json()
        self.assertFalse(data['success'])

if __name__ == '__main__':
    unittest.main()
