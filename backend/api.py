from flask import Flask, request, jsonify
from flask_cors import CORS
from .prediction import predict

app = Flask(__name__)
CORS(app)


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


@app.route("/predict", methods=["POST"])
def predict_route():
    data = request.get_json(force=True)
    if not data:
        return jsonify({"error": "Missing JSON body"}), 400

    result = predict(data)
    if "error" in result:
        return jsonify(result), 400

    # Optionally enrich response with description/tips from frontend database
    return jsonify(result)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
