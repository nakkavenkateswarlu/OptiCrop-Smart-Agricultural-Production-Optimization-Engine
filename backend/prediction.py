from pathlib import Path
import pickle
import pandas as pd

BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "backend" / "model" / "crop_model.pkl"

_model = None

# Soil mapping must match training
SOIL_MAP = {
    "Loamy": 0,
    "Black": 1,
    "Sandy": 2,
    "Clay": 3,
}


def load_model():
    global _model
    if _model is None:
        if not MODEL_PATH.exists():
            raise FileNotFoundError(f"Model not found at {MODEL_PATH}")
        with open(MODEL_PATH, "rb") as f:
            _model = pickle.load(f)
    return _model


def validate_input(payload: dict) -> tuple[bool, str]:
    try:
        t = float(payload.get("temperature"))
        r = float(payload.get("rainfall"))
        h = float(payload.get("humidity"))
        ph = float(payload.get("ph"))
        soil = payload.get("soil")
    except Exception:
        return False, "Invalid numeric input types."

    if not (0 <= t <= 60):
        return False, "Temperature must be between 0 and 60 °C."
    if not (0 <= r <= 5000):
        return False, "Rainfall must be between 0 and 5000 mm."
    if not (0 <= h <= 100):
        return False, "Humidity must be between 0 and 100%"
    if not (0 <= ph <= 14):
        return False, "pH must be between 0 and 14."
    if soil not in SOIL_MAP:
        return False, f"Soil must be one of: {list(SOIL_MAP.keys())}"

    return True, ""


def predict(payload: dict) -> dict:
    """Return prediction dict: {'crop': str, 'confidence': float}

    Expects payload keys: temperature, rainfall, humidity, soil, ph
    """
    model = load_model()

    valid, msg = validate_input(payload)
    if not valid:
        return {"error": msg}

    # Preserve feature order used in training
    temperature = float(payload["temperature"])
    rainfall = float(payload["rainfall"])
    humidity = float(payload["humidity"])
    soil = SOIL_MAP[payload["soil"]]
    ph = float(payload["ph"])

    df = pd.DataFrame([[temperature, rainfall, humidity, soil, ph]],
                      columns=["Temperature", "Rainfall", "Humidity", "Soil", "pH"])

    try:
        pred = model.predict(df)
        # try to derive confidence if possible
        confidence = None
        if hasattr(model, "predict_proba"):
            probs = model.predict_proba(df)[0]
            # find index of predicted class
            class_index = list(model.classes_).index(pred[0])
            confidence = float(probs[class_index] * 100)
        else:
            confidence = 100.0

        return {"crop": str(pred[0]), "confidence": round(confidence, 2)}
    except Exception as e:
        return {"error": f"Prediction error: {e}"}
