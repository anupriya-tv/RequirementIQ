from flask import Flask, request, jsonify
from flask_cors import CORS
from analyzer import analyze_requirements

app = Flask(__name__)
CORS(app)  # allows React (running on a different port) to call this API


@app.route("/")
def home():
    return jsonify({"status": "RequirementIQ API is running"})


@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()

    if not data or "text" not in data:
        return jsonify({"error": "Missing 'text' field in request body"}), 400

    raw_text = data["text"].strip()

    if not raw_text:
        return jsonify({"error": "Input text cannot be empty"}), 400

    result = analyze_requirements(raw_text)
    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)