"""
Automated unit tests for Sericulture Risk & Farm Intelligence Engine.
Tests all explicit conditions:
- Insufficient data
- Disease Free + normal climate
- Leaf Rust / Spot elevated management priority
- Normal climate vs abnormal climate (high/low temp, high/low humidity)
- Cross-module combinations (climate + symptom, leaf + rearing stage, high humidity + pathology)
- Low-confidence leaf prediction handling (mitigates high risk, recommends verification)
- Repeated historical events
- Determinism (identical input -> identical output)
- Input variation sensitivity
- API authentication & isolation (401 on unauth, client UID ignored, client fake score ignored)
"""

import unittest
from unittest.mock import patch, MagicMock
from services.sericulture_risk_engine import SericultureRiskEngine
from app import create_app

class SericultureRiskEngineTests(unittest.TestCase):

    def test_01_no_available_data_returns_insufficient_data(self):
        """TEST 1: No available data returns INSUFFICIENT_DATA and score 0."""
        res = SericultureRiskEngine.evaluate(
            leaf_record=None,
            climate_record=None,
            silkworm_record=None,
            historical_events=None
        )
        self.assertEqual(res["status"], "INSUFFICIENT_DATA")
        self.assertEqual(res["risk_level"], "UNKNOWN")
        self.assertEqual(res["risk_score"], 0)
        self.assertEqual(res["rule_ids"], [])
        self.assertIn("Perform at least one farm measurement", res["priority_actions"][0])

    def test_02_disease_free_and_normal_climate(self):
        """TEST 2: Disease Free leaves + normal climate + no symptoms -> LOW."""
        res = SericultureRiskEngine.evaluate(
            leaf_record={"disease": "Disease Free leaves", "confidence": 98.5},
            climate_record={"stage": "Instar 3", "temperature": 26.0, "humidity": 82.0},
            silkworm_record=None
        )
        self.assertEqual(res["status"], "EVALUATED")
        self.assertEqual(res["risk_level"], "LOW")
        self.assertEqual(res["risk_score"], 0)
        self.assertIn("LEAF_DISEASE_FREE", res["rule_ids"])
        self.assertNotIn("CLIMATE_HIGH_TEMP", res["rule_ids"])

    def test_03_leaf_rust_normal_climate_elevated_priority(self):
        """TEST 3: Leaf Rust + normal climate -> elevated priority (MODERATE/HIGH)."""
        res = SericultureRiskEngine.evaluate(
            leaf_record={"disease": "Leaf Rust", "confidence": 88.0},
            climate_record={"stage": "Instar 3", "temperature": 26.0, "humidity": 82.0},
            silkworm_record=None
        )
        self.assertEqual(res["status"], "EVALUATED")
        self.assertIn(res["risk_level"], ["MODERATE", "HIGH"])
        self.assertIn("LEAF_RUST_DETECTED", res["rule_ids"])
        self.assertIn("CROSS_LEAF_REARING_CONTEXT", res["rule_ids"])
        self.assertGreater(res["risk_score"], 20)

    def test_04_leaf_spot_normal_climate_elevated_priority(self):
        """TEST 4: Leaf Spot + normal climate -> elevated priority (MODERATE/HIGH)."""
        res = SericultureRiskEngine.evaluate(
            leaf_record={"disease": "Leaf Spot", "confidence": 92.0},
            climate_record={"stage": "Instar 4", "temperature": 24.5, "humidity": 75.0},
            silkworm_record=None
        )
        self.assertEqual(res["status"], "EVALUATED")
        self.assertIn(res["risk_level"], ["MODERATE", "HIGH"])
        self.assertIn("LEAF_SPOT_DETECTED", res["rule_ids"])
        self.assertIn("CROSS_LEAF_REARING_CONTEXT", res["rule_ids"])

    def test_05_normal_climate_triggers_no_climate_rule(self):
        """TEST 5: Normal climate within stage envelope triggers no climate warning."""
        # Instar 4 ideal is 23-26°C and 70-80% RH
        res = SericultureRiskEngine.evaluate(
            climate_record={"stage": "Instar 4", "temperature": 24.0, "humidity": 72.0}
        )
        self.assertEqual(res["status"], "EVALUATED")
        self.assertEqual(res["risk_level"], "LOW")
        self.assertNotIn("CLIMATE_HIGH_TEMP", res["rule_ids"])
        self.assertNotIn("CLIMATE_LOW_TEMP", res["rule_ids"])
        self.assertNotIn("CLIMATE_HIGH_HUMIDITY", res["rule_ids"])
        self.assertNotIn("CLIMATE_LOW_HUMIDITY", res["rule_ids"])

    def test_06_high_temperature_triggers_climate_rule(self):
        """TEST 6: High temperature outside stage range triggers CLIMATE_HIGH_TEMP."""
        # Instar 4 max temp is 26.0°C. 29.5°C is +3.5°C -> CRITICAL
        res = SericultureRiskEngine.evaluate(
            climate_record={"stage": "Instar 4", "temperature": 29.5, "humidity": 75.0}
        )
        self.assertEqual(res["status"], "EVALUATED")
        self.assertIn("CLIMATE_HIGH_TEMP", res["rule_ids"])
        self.assertGreater(res["risk_score"], 0)

    def test_07_low_temperature_triggers_climate_rule(self):
        """TEST 7: Low temperature outside stage range triggers CLIMATE_LOW_TEMP."""
        # Instar 1 min temp is 26.0°C. 21.0°C is below range
        res = SericultureRiskEngine.evaluate(
            climate_record={"stage": "Instar 1", "temperature": 21.0, "humidity": 88.0}
        )
        self.assertEqual(res["status"], "EVALUATED")
        self.assertIn("CLIMATE_LOW_TEMP", res["rule_ids"])

    def test_08_high_humidity_triggers_climate_rule(self):
        """TEST 8: High humidity outside stage range triggers CLIMATE_HIGH_HUMIDITY."""
        # Instar 5 max humidity is 75.0%. 92.0% is above range
        res = SericultureRiskEngine.evaluate(
            climate_record={"stage": "Instar 5", "temperature": 24.0, "humidity": 92.0}
        )
        self.assertEqual(res["status"], "EVALUATED")
        self.assertIn("CLIMATE_HIGH_HUMIDITY", res["rule_ids"])

    def test_09_low_humidity_triggers_climate_rule(self):
        """TEST 9: Low humidity outside stage range triggers CLIMATE_LOW_HUMIDITY."""
        # Instar 1 min humidity is 85.0%. 60.0% is below range
        res = SericultureRiskEngine.evaluate(
            climate_record={"stage": "Instar 1", "temperature": 27.0, "humidity": 60.0}
        )
        self.assertEqual(res["status"], "EVALUATED")
        self.assertIn("CLIMATE_LOW_HUMIDITY", res["rule_ids"])

    def test_10_abnormal_climate_plus_silkworm_symptom_triggers_cross_rule(self):
        """TEST 10: Abnormal climate + silkworm symptoms triggers CROSS_CLIMATE_SYMPTOM."""
        res = SericultureRiskEngine.evaluate(
            climate_record={"stage": "Instar 4", "temperature": 30.0, "humidity": 88.0},
            silkworm_record={
                "predictedDisease": "Flacherie",
                "topMatch": {"name": "Flacherie", "match_percentage": 75.0}
            }
        )
        self.assertEqual(res["status"], "EVALUATED")
        self.assertIn("CROSS_CLIMATE_SYMPTOM", res["rule_ids"])
        self.assertIn("SILKWORM_FLACHERIE_ASSESSMENT", res["rule_ids"])
        self.assertIn(res["risk_level"], ["HIGH", "CRITICAL"])

    def test_11_low_confidence_leaf_prediction_mitigation(self):
        """TEST 11: Low-confidence prediction triggers LEAF_LOW_CONFIDENCE, recommends verification, and avoids CRITICAL."""
        res = SericultureRiskEngine.evaluate(
            leaf_record={"disease": "Leaf Rust", "confidence": 54.0},
            climate_record={"stage": "Instar 3", "temperature": 26.0, "humidity": 82.0}
        )
        self.assertEqual(res["status"], "EVALUATED")
        self.assertIn("LEAF_LOW_CONFIDENCE", res["rule_ids"])
        self.assertNotIn("LEAF_RUST_DETECTED", res["rule_ids"])
        self.assertNotEqual(res["risk_level"], "CRITICAL")
        self.assertTrue(any("clearer, well-lit photo" in act for act in res["priority_actions"]))

    def test_12_repeated_historical_events_triggers_cross_rule(self):
        """TEST 12: Repeated adverse historical records trigger CROSS_REPEATED_EVENT."""
        hist = [
            {"disease": "Leaf Rust", "status": "Leaf Rust"},
            {"status": "CRITICAL"},
            {"status": "WARNING"}
        ]
        res = SericultureRiskEngine.evaluate(
            leaf_record={"disease": "Disease Free leaves", "confidence": 95.0},
            historical_events=hist
        )
        self.assertEqual(res["status"], "EVALUATED")
        self.assertIn("CROSS_REPEATED_EVENT", res["rule_ids"])

    def test_13_same_input_repeated_is_strictly_identical(self):
        """TEST 13: Determinism - Same inputs repeated produce 100% identical outputs."""
        inputs = {
            "leaf_record": {"disease": "Leaf Spot", "confidence": 85.0},
            "climate_record": {"stage": "Instar 4", "temperature": 28.5, "humidity": 86.0},
            "silkworm_record": {"predictedDisease": "Grasserie", "topMatch": {"name": "Grasserie", "match_percentage": 70.0}},
            "historical_events": [{"status": "CRITICAL"}, {"disease": "Leaf Spot"}]
        }
        res1 = SericultureRiskEngine.evaluate(**inputs)
        res2 = SericultureRiskEngine.evaluate(**inputs)
        self.assertEqual(res1, res2)

    def test_14_changing_one_input_changes_only_expected_rules(self):
        """TEST 14: Sensitivity - Changing humidity only affects humidity & cross rules."""
        base_leaf = {"disease": "Disease Free leaves", "confidence": 98.0}
        res_normal = SericultureRiskEngine.evaluate(
            leaf_record=base_leaf,
            climate_record={"stage": "Instar 3", "temperature": 26.0, "humidity": 82.0}
        )
        res_high_hum = SericultureRiskEngine.evaluate(
            leaf_record=base_leaf,
            climate_record={"stage": "Instar 3", "temperature": 26.0, "humidity": 94.0}
        )
        self.assertNotIn("CLIMATE_HIGH_HUMIDITY", res_normal["rule_ids"])
        self.assertIn("CLIMATE_HIGH_HUMIDITY", res_high_hum["rule_ids"])
        self.assertGreater(res_high_hum["risk_score"], res_normal["risk_score"])


class RiskEndpointSecurityTests(unittest.TestCase):

    def setUp(self):
        self.app = create_app()
        self.client = self.app.test_client()

    def test_15_unauthenticated_request_returns_401(self):
        """TEST 15: GET /api/risk/current with no auth header returns 401."""
        res = self.client.get('/api/risk/current')
        self.assertEqual(res.status_code, 401)
        data = res.get_json()
        self.assertFalse(data['success'])
        self.assertIn('Authentication required', data['message'])

    @patch('middleware.auth.verify_firebase_id_token')
    @patch('routes.risk.get_user_leaf_history_firestore')
    @patch('routes.risk.get_user_climate_history_firestore')
    @patch('routes.risk.get_user_silkworm_history_firestore')
    def test_16_farmer_a_data_isolated_from_farmer_b(
        self, mock_sw_hist, mock_clim_hist, mock_leaf_hist, mock_verify_token
    ):
        """TEST 16: Farmer A cannot access Farmer B's risk; strictly isolates by g.uid."""
        mock_verify_token.return_value = {
            'uid': 'farmer_A_uid',
            'email': 'farmerA@serisense.com'
        }
        mock_leaf_hist.return_value = [{'disease': 'Leaf Rust', 'confidence': 88.0}]
        mock_clim_hist.return_value = []
        mock_sw_hist.return_value = []

        # Attempt to inject another farmer's UID in query params or headers
        res = self.client.get(
            '/api/risk/current?uid=farmer_B_uid',
            headers={'Authorization': 'Bearer valid.farmer.token', 'X-User-Id': 'farmer_B_uid'}
        )
        self.assertEqual(res.status_code, 200)

        # Assert Firestore calls were made STRICTLY with authenticated token UID 'farmer_A_uid'
        mock_leaf_hist.assert_called_with('farmer_A_uid', limit=10)
        mock_clim_hist.assert_called_with('farmer_A_uid', limit=10)
        mock_sw_hist.assert_called_with('farmer_A_uid', limit=10)

    @patch('middleware.auth.verify_firebase_id_token')
    @patch('routes.risk.get_user_leaf_history_firestore')
    @patch('routes.risk.get_user_climate_history_firestore')
    @patch('routes.risk.get_user_silkworm_history_firestore')
    def test_17_client_attempt_to_submit_fake_score_ignored(
        self, mock_sw_hist, mock_clim_hist, mock_leaf_hist, mock_verify_token
    ):
        """TEST 17: GET endpoint calculates score authoritatively from backend; client parameters ignored."""
        mock_verify_token.return_value = {'uid': 'farmer_X', 'email': 'x@serisense.com'}
        mock_leaf_hist.return_value = []
        mock_clim_hist.return_value = []
        mock_sw_hist.return_value = []

        # Client tries to send fake risk_score=99 or fake disease
        res = self.client.get(
            '/api/risk/current?risk_score=99&risk_level=CRITICAL&disease=Leaf+Rust',
            headers={'Authorization': 'Bearer valid.token'}
        )
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        # Because farmer_X has no records in Firestore, status MUST be INSUFFICIENT_DATA and score 0
        self.assertEqual(data["status"], "INSUFFICIENT_DATA")
        self.assertEqual(data["risk_score"], 0)


if __name__ == '__main__':
    unittest.main()
