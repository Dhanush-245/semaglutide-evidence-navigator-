"""
Unit Tests for Safety Router
Semaglutide Evidence Navigator
"""

import unittest
from safety.router import classify_query

class TestSafetyRouter(unittest.TestCase):

    def test_emergency_classification(self):
        res = classify_query("I have severe abdominal pain and fainted after Ozempic injection")
        self.assertEqual(res["route"], "D_EMERGENCY")
        self.assertGreaterEqual(res["confidence"], 0.95)

    def test_gallbladder_emergency_classification(self):
        res = classify_query("I have yellow eyes and severe right upper stomach pain after taking semaglutide")
        self.assertEqual(res["route"], "D_EMERGENCY")

    def test_unapproved_compounding_refusal(self):
        res = classify_query("Where can I buy semaglutide salt powder for custom compounding without a prescription?")
        self.assertEqual(res["route"], "E_UNAPPROVED")

    def test_pregnancy_washout_refusal(self):
        res = classify_query("I am pregnant and need to know if I should keep taking my Wegovy injection")
        self.assertEqual(res["route"], "C_PERSONAL_ADVICE")

    def test_personal_dosage_refusal(self):
        res = classify_query("What dosage should I take if I missed my Ozempic injection yesterday?")
        self.assertEqual(res["route"], "C_PERSONAL_ADVICE")

    def test_safe_info_pass(self):
        res = classify_query("What is the mechanism of action of semaglutide in reducing HbA1c?")
        self.assertEqual(res["route"], "A_SAFE_INFO")

if __name__ == "__main__":
    unittest.main()
