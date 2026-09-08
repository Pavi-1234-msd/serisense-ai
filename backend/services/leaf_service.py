import os
import io
import json
import numpy as np
from PIL import Image

try:
    import ai_edge_litert.interpreter as tflite
    TFLITE_AVAILABLE = True
except ImportError:
    try:
        import tflite_runtime.interpreter as tflite
        TFLITE_AVAILABLE = True
    except ImportError:
        try:
            import tensorflow as tf
            TFLITE_AVAILABLE = False
        except ImportError:
            TFLITE_AVAILABLE = False

CLASS_NAMES = ['Disease Free leaves', 'Leaf Rust', 'Leaf Spot']

class LeafClassifierService:
    def __init__(self, base_dir):
        self.base_dir = base_dir
        self.interpreter = None
        self.input_index = None
        self.output_index = None
        self.keras_model = None
        self.knowledge_base = {}

        self._load_knowledge_base()
        self._load_model()

    def _load_knowledge_base(self):
        kb_path = os.path.join(self.base_dir, 'knowledge_base', 'leaf_diseases.json')
        if os.path.exists(kb_path):
            with open(kb_path, 'r', encoding='utf-8') as f:
                self.knowledge_base = json.load(f)
        else:
            print(f"[WARN] Leaf knowledge base file not found at {kb_path}")

    def _load_model(self):
        model_dir = os.path.join(self.base_dir, 'model')
        tflite_path = os.path.join(model_dir, 'mulberry_model.tflite')
        keras_path = os.path.join(model_dir, 'mulberry_model.keras')

        if os.path.exists(tflite_path):
            try:
                if TFLITE_AVAILABLE:
                    interp = tflite.Interpreter(model_path=tflite_path)
                else:
                    import tensorflow as tf
                    interp = tf.lite.Interpreter(model_path=tflite_path)

                interp.allocate_tensors()
                self.interpreter = interp
                self.input_index = interp.get_input_details()[0]['index']
                self.output_index = interp.get_output_details()[0]['index']

                # Warmup
                dummy = np.zeros((1, 224, 224, 3), dtype=np.float32)
                interp.set_tensor(self.input_index, dummy)
                interp.invoke()
                print("[OK] LeafClassifierService: TFLite model loaded successfully!")
                return
            except Exception as e:
                print(f"[ERROR] LeafClassifierService TFLite load failed: {e}")

        if os.path.exists(keras_path):
            try:
                import tensorflow as tf
                self.keras_model = tf.keras.models.load_model(keras_path, compile=False)
                print("[OK] LeafClassifierService: Keras model loaded successfully!")
                return
            except Exception as e:
                print(f"[ERROR] LeafClassifierService Keras load failed: {e}")

        print("[WARN] LeafClassifierService: No ML model loaded! Fallback predictions will be unavailable unless fixed.")

    def predict(self, image_bytes):
        # Open and preprocess image
        image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        image = image.resize((224, 224))
        img_array = np.array(image, dtype=np.float32) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        probs = None
        if self.interpreter is not None:
            self.interpreter.set_tensor(self.input_index, img_array)
            self.interpreter.invoke()
            probs = self.interpreter.get_tensor(self.output_index)[0]
        elif self.keras_model is not None:
            probs = self.keras_model.predict(img_array, verbose=0)[0]
        else:
            raise RuntimeError("Model engine is not loaded.")

        # Class scores
        probs = [float(p) for p in probs]
        max_idx = int(np.argmax(probs))
        predicted_disease = CLASS_NAMES[max_idx]
        confidence = float(probs[max_idx]) * 100.0

        predictions_dict = {
            CLASS_NAMES[i]: round(probs[i] * 100.0, 2) for i in range(len(CLASS_NAMES))
        }

        disease_info = self.knowledge_base.get(predicted_disease, {})

        return {
            'disease': predicted_disease,
            'confidence': round(confidence, 2),
            'predictions': predictions_dict,
            'report': disease_info
        }
