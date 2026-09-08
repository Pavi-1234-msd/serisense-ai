import os
import json

class ClimateEngineService:
    def __init__(self, base_dir):
        self.base_dir = base_dir
        self.rules = {}
        self._load_rules()

    def _load_rules(self):
        rules_path = os.path.join(self.base_dir, 'knowledge_base', 'climate_rules.json')
        if os.path.exists(rules_path):
            with open(rules_path, 'r', encoding='utf-8') as f:
                self.rules = json.load(f)
        else:
            print(f"[WARN] Climate rules file not found at {rules_path}")

    def evaluate(self, stage, temperature, humidity):
        stage_info = self.rules.get(stage)
        if not stage_info:
            # Fallback to Instar 3 if invalid stage
            stage_info = self.rules.get('Instar 3', {
                'name': stage,
                'ideal_temp_min': 25.0, 'ideal_temp_max': 27.0,
                'ideal_humidity_min': 80.0, 'ideal_humidity_max': 85.0
            })

        t_min = stage_info['ideal_temp_min']
        t_max = stage_info['ideal_temp_max']
        h_min = stage_info['ideal_humidity_min']
        h_max = stage_info['ideal_humidity_max']

        temp_status = 'SAFE'
        hum_status = 'SAFE'

        # Temp evaluation
        t_diff = 0
        if temperature < t_min:
            t_diff = t_min - temperature
            temp_status = 'WARNING' if t_diff <= 2.0 else 'CRITICAL'
            temp_correction = f"Temperature is {t_diff:.1f}°C below optimal. Increase heating/insulation toward {t_min}-{t_max}°C."
        elif temperature > t_max:
            t_diff = temperature - t_max
            temp_status = 'WARNING' if t_diff <= 2.0 else 'CRITICAL'
            temp_correction = f"Temperature is {t_diff:.1f}°C above optimal. Increase ventilation, sprinkle water on roof/floor toward {t_min}-{t_max}°C."
        else:
            temp_correction = f"Temperature ({temperature:.1f}°C) is within ideal range ({t_min}-{t_max}°C)."

        # Humidity evaluation
        h_diff = 0
        if humidity < h_min:
            h_diff = h_min - humidity
            hum_status = 'WARNING' if h_diff <= 5.0 else 'CRITICAL'
            humidity_correction = f"Humidity is {h_diff:.1f}% below optimal. Hang wet gunny bags / spray water on walls toward {h_min}-{h_max}%."
        elif humidity > h_max:
            h_diff = humidity - h_max
            hum_status = 'WARNING' if h_diff <= 5.0 else 'CRITICAL'
            humidity_correction = f"Humidity is {h_diff:.1f}% above optimal. Dust lime powder on beds and open windows toward {h_min}-{h_max}%."
        else:
            humidity_correction = f"Humidity ({humidity:.1f}%) is within ideal range ({h_min}-{h_max}%)."

        # Combined status
        if temp_status == 'CRITICAL' or hum_status == 'CRITICAL':
            overall_status = 'CRITICAL'
        elif temp_status == 'WARNING' or hum_status == 'WARNING':
            overall_status = 'WARNING'
        else:
            overall_status = 'SAFE'

        # Detailed impact summary based on rules
        impact_reasons = []
        if temperature > t_max:
            impact_reasons.append(stage_info.get('impact_high_temp', 'High temperature stress.'))
        elif temperature < t_min:
            impact_reasons.append(stage_info.get('impact_low_temp', 'Low temperature slows metabolism.'))

        if humidity > h_max:
            impact_reasons.append(stage_info.get('impact_high_humidity', 'High humidity promotes pathogen buildup.'))
        elif humidity < h_min:
            impact_reasons.append(stage_info.get('impact_low_humidity', 'Low humidity desiccates foliage.'))

        if not impact_reasons:
            impact_summary = f"Optimal rearing microclimate. High leaf conversion rate expected for {stage_info.get('name', stage)}."
        else:
            impact_summary = " ".join(impact_reasons)

        return {
            'stage': stage,
            'temperature': temperature,
            'humidity': humidity,
            'status': overall_status,
            'ideal_range': {
                'temp_min': t_min, 'temp_max': t_max,
                'humidity_min': h_min, 'humidity_max': h_max
            },
            'temperature_correction': temp_correction,
            'humidity_correction': humidity_correction,
            'impact_summary': impact_summary
        }
