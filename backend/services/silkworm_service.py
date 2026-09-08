import os
import json

class SilkwormService:
    def __init__(self, base_dir):
        self.base_dir = base_dir
        self.diseases = []
        self.symptoms_list = []
        self._load_knowledge_base()

    def _load_knowledge_base(self):
        kb_path = os.path.join(self.base_dir, 'knowledge_base', 'silkworm_diseases.json')
        if os.path.exists(kb_path):
            with open(kb_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                self.diseases = data.get('diseases', [])
                self.symptoms_list = data.get('symptoms', [])
        else:
            print(f"[WARN] Silkworm diseases knowledge base file not found at {kb_path}")

    def get_symptoms(self):
        return self.symptoms_list

    def diagnose(self, selected_symptom_ids):
        if not selected_symptom_ids:
            return {
                'success': False,
                'message': 'No symptoms selected'
            }

        scores = []
        selected_set = set(selected_symptom_ids)

        for disease in self.diseases:
            weights = disease.get('weights', {})
            disease_symptoms = set(disease.get('symptoms', []))
            
            # Max possible score for this disease
            max_possible = sum(weights.values()) if weights else len(disease_symptoms)
            
            # Actual score from matched selected symptoms
            matched_symptoms = selected_set.intersection(disease_symptoms)
            current_score = sum(weights.get(s, 1) for s in matched_symptoms)

            match_pct = (current_score / max_possible * 100.0) if max_possible > 0 else 0.0

            scores.append({
                'id': disease['id'],
                'name': disease['name'],
                'type': disease.get('type', ''),
                'match_percentage': round(match_pct, 1),
                'matched_count': len(matched_symptoms),
                'total_symptoms': len(disease_symptoms),
                'cause': disease.get('cause', ''),
                'treatment': disease.get('treatment', ''),
                'prevention': disease.get('prevention', []),
                'silkworm_impact': disease.get('silkworm_impact', '')
            })

        # Sort by match percentage descending
        scores.sort(key=lambda x: x['match_percentage'], reverse=True)
        top_match = scores[0] if scores else None

        return {
            'success': True,
            'top_match': top_match,
            'all_matches': scores
        }
