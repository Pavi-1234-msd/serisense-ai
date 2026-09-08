"""
SeriSense AI — Sericulture Risk & Farm Intelligence Engine
Deterministic, inspectable, rule-based decision support engine.

IMPORTANT CONSTRAINTS:
1. Pure Python service: No Flask request/global dependencies, no database/Firestore calls.
2. The calculated score is a DECISION-SUPPORT MANAGEMENT PRIORITY INDEX [0-100],
   NOT a disease probability, NOT an infection rate, and NOT an epidemiological risk.
3. Every rule is deterministic: Identical inputs ALWAYS yield identical outputs.
4. Distinguishes ML model confidence from disease severity.
5. Employs cautious wording without unproven causal claims.
"""

from typing import Dict, Any, List, Optional

# Verified Stage-Specific Climate Envelopes (from project knowledge base)
CLIMATE_STAGE_ENVELOPES = {
    "Egg": {
        "ideal_temp_min": 24.0, "ideal_temp_max": 25.0,
        "ideal_humidity_min": 80.0, "ideal_humidity_max": 85.0
    },
    "Instar 1": {
        "ideal_temp_min": 26.0, "ideal_temp_max": 28.0,
        "ideal_humidity_min": 85.0, "ideal_humidity_max": 90.0
    },
    "Instar 2": {
        "ideal_temp_min": 26.0, "ideal_temp_max": 28.0,
        "ideal_humidity_min": 85.0, "ideal_humidity_max": 90.0
    },
    "Instar 3": {
        "ideal_temp_min": 25.0, "ideal_temp_max": 27.0,
        "ideal_humidity_min": 80.0, "ideal_humidity_max": 85.0
    },
    "Instar 4": {
        "ideal_temp_min": 23.0, "ideal_temp_max": 26.0,
        "ideal_humidity_min": 70.0, "ideal_humidity_max": 80.0
    },
    "Instar 5": {
        "ideal_temp_min": 22.0, "ideal_temp_max": 25.0,
        "ideal_humidity_min": 65.0, "ideal_humidity_max": 75.0
    }
}

# Confidence threshold below which an ML prediction requires verification
# rather than aggressive disease escalation
CONFIDENCE_VERIFICATION_THRESHOLD = 70.0

# Rule severity mapping to numerical priority impact (Decision-Support Index)
SEVERITY_POINTS = {
    "LOW": 5,
    "MODERATE": 15,
    "HIGH": 25,
    "CRITICAL": 35
}


class SericultureRiskEngine:
    """
    Pure deterministic rule engine evaluating multi-source farm data.
    """

    @classmethod
    def evaluate(
        cls,
        leaf_record: Optional[Dict[str, Any]] = None,
        climate_record: Optional[Dict[str, Any]] = None,
        silkworm_record: Optional[Dict[str, Any]] = None,
        historical_events: Optional[List[Dict[str, Any]]] = None
    ) -> Dict[str, Any]:
        """
        Evaluates current farm data and returns a structured risk intelligence payload.
        """
        # Step 1: Check for Insufficient Data
        has_leaf = leaf_record is not None and bool(leaf_record.get('disease'))
        has_climate = climate_record is not None and climate_record.get('temperature') is not None and climate_record.get('humidity') is not None
        has_silkworm = silkworm_record is not None and (
            bool(silkworm_record.get('predictedDisease')) or 
            bool(silkworm_record.get('top_match')) or 
            bool(silkworm_record.get('selectedSymptoms'))
        )

        if not (has_leaf or has_climate or has_silkworm):
            return {
                "status": "INSUFFICIENT_DATA",
                "risk_level": "UNKNOWN",
                "risk_score": 0,
                "score_label": "Decision-Support Priority Index (Not a probability)",
                "factors": [],
                "priority_actions": [
                    "Perform at least one farm measurement (leaf scan, climate check, or silkworm symptom check) to initialize decision support."
                ],
                "explanation": "Insufficient farm records available to calculate an integrated cross-module risk assessment.",
                "rule_ids": [],
                "current_context": {
                    "leaf_available": False,
                    "climate_available": False,
                    "silkworm_available": False,
                    "historical_events_analyzed": len(historical_events or [])
                }
            }

        triggered_rules = []
        priority_actions = []

        # ==========================================
        # Category A: CLIMATE RULES
        # ==========================================
        if has_climate:
            stage = climate_record.get('stage', 'Instar 3')
            temp = float(climate_record.get('temperature', 0.0))
            hum = float(climate_record.get('humidity', 0.0))

            envelope = CLIMATE_STAGE_ENVELOPES.get(stage, CLIMATE_STAGE_ENVELOPES['Instar 3'])
            t_min, t_max = envelope['ideal_temp_min'], envelope['ideal_temp_max']
            h_min, h_max = envelope['ideal_humidity_min'], envelope['ideal_humidity_max']

            # Temperature evaluation
            if temp > t_max:
                t_diff = temp - t_max
                sev = "CRITICAL" if t_diff > 2.0 else "MODERATE"
                triggered_rules.append({
                    "rule_id": "CLIMATE_HIGH_TEMP",
                    "category": "CLIMATE",
                    "severity": sev,
                    "points": SEVERITY_POINTS[sev],
                    "factor": f"Rearing room temperature ({temp:.1f}°C) is above the recommended range ({t_min}–{t_max}°C) for {stage}.",
                    "action": "Enhance rearing room cross-ventilation or apply wet gunny bags to cool the room."
                })
            elif temp < t_min:
                t_diff = t_min - temp
                sev = "CRITICAL" if t_diff > 2.0 else "MODERATE"
                triggered_rules.append({
                    "rule_id": "CLIMATE_LOW_TEMP",
                    "category": "CLIMATE",
                    "severity": sev,
                    "points": SEVERITY_POINTS[sev],
                    "factor": f"Rearing room temperature ({temp:.1f}°C) is below the recommended range ({t_min}–{t_max}°C) for {stage}.",
                    "action": "Increase rearing house insulation or utilize controlled artificial heating."
                })

            # Humidity evaluation
            if hum > h_max:
                h_diff = hum - h_max
                sev = "CRITICAL" if h_diff > 5.0 else "MODERATE"
                triggered_rules.append({
                    "rule_id": "CLIMATE_HIGH_HUMIDITY",
                    "category": "CLIMATE",
                    "severity": sev,
                    "points": SEVERITY_POINTS[sev],
                    "factor": f"Relative humidity ({hum:.1f}%) is elevated above stage recommendation ({h_min}–{h_max}%) for {stage}.",
                    "action": "Improve airflow and dust slaked lime powder on rearing beds to reduce bed moisture."
                })
            elif hum < h_min:
                h_diff = h_min - hum
                sev = "CRITICAL" if h_diff > 5.0 else "MODERATE"
                triggered_rules.append({
                    "rule_id": "CLIMATE_LOW_HUMIDITY",
                    "category": "CLIMATE",
                    "severity": sev,
                    "points": SEVERITY_POINTS[sev],
                    "factor": f"Relative humidity ({hum:.1f}%) is below stage recommendation ({h_min}–{h_max}%) for {stage}.",
                    "action": "Hang damp gunny cloth along room walls to restore requisite moisture and prevent leaf desiccation."
                })

        # ==========================================
        # Category B: LEAF DISEASE RULES
        # ==========================================
        leaf_disease = None
        leaf_conf = 0.0
        if has_leaf:
            leaf_disease = leaf_record.get('disease', 'Disease Free leaves')
            try:
                leaf_conf = float(leaf_record.get('confidence', 0.0))
            except (ValueError, TypeError):
                leaf_conf = 0.0

            if leaf_disease == 'Disease Free leaves':
                triggered_rules.append({
                    "rule_id": "LEAF_DISEASE_FREE",
                    "category": "LEAF",
                    "severity": "LOW",
                    "points": 0,
                    "factor": f"Mulberry foliage assessed as Disease Free (Model confidence: {leaf_conf:.1f}%).",
                    "action": "Continue routine garden maintenance and hygiene protocols."
                })
            elif leaf_conf < CONFIDENCE_VERIFICATION_THRESHOLD:
                # Distinguish model uncertainty from high farm risk
                triggered_rules.append({
                    "rule_id": "LEAF_LOW_CONFIDENCE",
                    "category": "LEAF",
                    "severity": "MODERATE",
                    "points": SEVERITY_POINTS["MODERATE"],
                    "factor": f"AI model flagged potential {leaf_disease}, but with low confidence ({leaf_conf:.1f}%).",
                    "action": "Capture a clearer, well-lit photo of the leaf or consult a local sericulture extension officer before applying crop treatments."
                })
            else:
                if leaf_disease == 'Leaf Rust':
                    triggered_rules.append({
                        "rule_id": "LEAF_RUST_DETECTED",
                        "category": "LEAF",
                        "severity": "HIGH",
                        "points": SEVERITY_POINTS["HIGH"],
                        "factor": f"Leaf Rust detected on mulberry foliage (Model confidence: {leaf_conf:.1f}%).",
                        "action": "Quarantine severely rusted plots; avoid feeding heavily infected coarse leaves to early instar silkworms."
                    })
                elif leaf_disease == 'Leaf Spot':
                    triggered_rules.append({
                        "rule_id": "LEAF_SPOT_DETECTED",
                        "category": "LEAF",
                        "severity": "HIGH",
                        "points": SEVERITY_POINTS["HIGH"],
                        "factor": f"Leaf Spot detected on mulberry foliage (Model confidence: {leaf_conf:.1f}%).",
                        "action": "Prune spotted leaves to reduce fungal spread; maintain field drainage and monitor progression."
                    })

        # ==========================================
        # Category C: SILKWORM SYMPTOM RULES
        # ==========================================
        sw_disease = None
        if has_silkworm:
            top_match = silkworm_record.get('topMatch') or silkworm_record.get('top_match') or {}
            sw_disease = silkworm_record.get('predictedDisease') or top_match.get('name') or 'Unknown'
            sw_pct = top_match.get('match_percentage') or silkworm_record.get('matchPercentage', 0.0)

            # Map to explicit rule IDs
            disease_lower = str(sw_disease).lower()
            if 'grasserie' in disease_lower:
                triggered_rules.append({
                    "rule_id": "SILKWORM_GRASSERIE_ASSESSMENT",
                    "category": "SILKWORM",
                    "severity": "HIGH",
                    "points": SEVERITY_POINTS["HIGH"],
                    "factor": f"Preliminary symptom assessment matches Grasserie characteristics ({sw_pct:.1f}% symptom match).",
                    "action": "Isolate symptomatic larvae immediately; dispose of diseased worms away from rearing house and dust bed disinfectant."
                })
            elif 'flacherie' in disease_lower:
                triggered_rules.append({
                    "rule_id": "SILKWORM_FLACHERIE_ASSESSMENT",
                    "category": "SILKWORM",
                    "severity": "HIGH",
                    "points": SEVERITY_POINTS["HIGH"],
                    "factor": f"Preliminary symptom assessment matches Flacherie characteristics ({sw_pct:.1f}% symptom match).",
                    "action": "Remove dead/soft worms carefully with forceps; reduce bed humidity and provide fresh, dry mulberry foliage."
                })
            elif 'muscardine' in disease_lower:
                triggered_rules.append({
                    "rule_id": "SILKWORM_MUSCARDINE_ASSESSMENT",
                    "category": "SILKWORM",
                    "severity": "HIGH",
                    "points": SEVERITY_POINTS["HIGH"],
                    "factor": f"Preliminary symptom assessment matches Muscardine characteristics ({sw_pct:.1f}% symptom match).",
                    "action": "Dust recommended lime-bleaching powder mixture on rearing trays and improve airflow to discourage fungal sporulation."
                })
            elif 'pebrine' in disease_lower:
                triggered_rules.append({
                    "rule_id": "SILKWORM_PEBRINE_ASSESSMENT",
                    "category": "SILKWORM",
                    "severity": "CRITICAL",
                    "points": SEVERITY_POINTS["CRITICAL"],
                    "factor": f"Preliminary symptom assessment matches Pebrine characteristics ({sw_pct:.1f}% symptom match).",
                    "action": "Notify local sericulture department immediately for microscopic examination; quarantine rearing lot."
                })

        # ==========================================
        # Category D: CROSS-MODULE RULES
        # ==========================================
        # Rule 1: Leaf disease detected + Active rearing stage context
        if has_leaf and leaf_disease in ('Leaf Rust', 'Leaf Spot') and leaf_conf >= CONFIDENCE_VERIFICATION_THRESHOLD:
            if has_climate:
                rearing_stage = climate_record.get('stage', 'Unknown')
                triggered_rules.append({
                    "rule_id": "CROSS_LEAF_REARING_CONTEXT",
                    "category": "CROSS_MODULE",
                    "severity": "MODERATE",
                    "points": SEVERITY_POINTS["MODERATE"],
                    "factor": f"Mulberry leaf disease detected while actively rearing {rearing_stage} worms.",
                    "action": "Screen harvested foliage before feeding to avoid feeding low-nutritive or pathogen-bearing leaves to worms."
                })

        # Rule 2: Climate deviation + Silkworm symptoms recorded
        climate_abnormal = any(r['rule_id'] in ('CLIMATE_HIGH_TEMP', 'CLIMATE_LOW_TEMP', 'CLIMATE_HIGH_HUMIDITY', 'CLIMATE_LOW_HUMIDITY') for r in triggered_rules)
        silkworm_abnormal = any(r['category'] == 'SILKWORM' for r in triggered_rules)

        if climate_abnormal and silkworm_abnormal:
            triggered_rules.append({
                "rule_id": "CROSS_CLIMATE_SYMPTOM",
                "category": "CROSS_MODULE",
                "severity": "HIGH",
                "points": SEVERITY_POINTS["HIGH"],
                "factor": "Microclimate deviation coincides with recorded silkworm symptom assessment, which may compound larval stress.",
                "action": "Prioritize immediate environmental correction to minimize environmental stress during symptom management."
            })

        # Rule 3: High humidity + Leaf disease / Silkworm symptoms
        high_humidity_active = any(r['rule_id'] == 'CLIMATE_HIGH_HUMIDITY' for r in triggered_rules)
        if high_humidity_active and (has_leaf and leaf_disease in ('Leaf Rust', 'Leaf Spot') or silkworm_abnormal):
            triggered_rules.append({
                "rule_id": "CROSS_HUMIDITY_PATHOLOGY_RISK",
                "category": "CROSS_MODULE",
                "severity": "MODERATE",
                "points": SEVERITY_POINTS["MODERATE"],
                "factor": "Elevated humidity and damp bed conditions increase rearing management concern.",
                "action": "Ensure rearing trays are well spaced and bed cleaning is conducted after each feeding period."
            })

        # Rule 4: Historical event repetition (e.g. repeated disease or adverse climate)
        if historical_events and len(historical_events) >= 2:
            recent_adverse = 0
            for ev in historical_events[:5]:
                # Check for adverse status in historical event
                status = str(ev.get('status') or ev.get('disease') or '').lower()
                if any(k in status for k in ('rust', 'spot', 'critical', 'warning', 'grasserie', 'flacherie', 'muscardine', 'pebrine')):
                    recent_adverse += 1

            if recent_adverse >= 2:
                triggered_rules.append({
                    "rule_id": "CROSS_REPEATED_EVENT",
                    "category": "CROSS_MODULE",
                    "severity": "MODERATE",
                    "points": SEVERITY_POINTS["MODERATE"],
                    "factor": f"Multiple adverse events ({recent_adverse} records) detected in recent farm history.",
                    "action": "Conduct a comprehensive audit of rearing bed hygiene, sanitation cycles, and leaf storage conditions."
                })

        # ==========================================
        # Step 4: Transparent Priority Score Aggregation
        # ==========================================
        # Calculate base points from unique triggered rules
        total_points = sum(r['points'] for r in triggered_rules)

        # Cap score deterministically in [0, 100] range
        risk_score = min(100, max(0, total_points))

        # Categorical Decision-Support Management Priority Level
        if risk_score >= 75:
            risk_level = "CRITICAL"
        elif risk_score >= 50:
            risk_level = "HIGH"
        elif risk_score >= 25:
            risk_level = "MODERATE"
        else:
            risk_level = "LOW"

        # Compile contributing factors and priority actions
        factors = [r['factor'] for r in triggered_rules if r['points'] > 0]
        rule_ids = [r['rule_id'] for r in triggered_rules]

        # Extract distinct priority actions in order of rule severity
        action_seen = set()
        for r in sorted(triggered_rules, key=lambda x: x['points'], reverse=True):
            act = r.get('action')
            if act and act not in action_seen:
                priority_actions.append(act)
                action_seen.add(act)

        if not priority_actions:
            priority_actions.append("Maintain standard hygienic rearing conditions and continue periodic monitoring.")

        # Human-readable decision support explanation
        if risk_level == "CRITICAL":
            explanation = "Urgent management intervention required: Acute microclimate deviation, critical pathogen symptoms, or compound stress factors detected."
        elif risk_level == "HIGH":
            explanation = "Elevated management priority: Active foliar disease, silkworm symptoms, or compound environmental stress require targeted corrective action."
        elif risk_level == "MODERATE":
            explanation = "Moderate management attention advised: Mild environmental deviation, low-confidence leaf flags, or single-factor stress noted."
        else:
            explanation = "Normal management conditions: Farm parameters are within acceptable thresholds for sericultural rearing."

        return {
            "status": "EVALUATED",
            "risk_level": risk_level,
            "risk_score": risk_score,
            "score_label": "Decision-Support Priority Index (Not a probability)",
            "factors": factors,
            "priority_actions": priority_actions,
            "explanation": explanation,
            "rule_ids": rule_ids,
            "current_context": {
                "leaf_available": has_leaf,
                "climate_available": has_climate,
                "silkworm_available": has_silkworm,
                "historical_events_analyzed": len(historical_events or [])
            }
        }
