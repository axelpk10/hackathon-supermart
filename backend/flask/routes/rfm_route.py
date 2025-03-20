from flask import Blueprint, jsonify
import redis
import pandas as pd
import json
from models.rfm_metrics import generate_rfm_metrics  # Import your RFM function

rfm_bp = Blueprint("rfm", __name__)

# Initialize Redis connection
redis_client = redis.StrictRedis(host="localhost", port=6379, db=0, decode_responses=True)

@rfm_bp.route("/calculate-rfm", methods=["POST"])
def calculate_and_store_rfm():
    try:
        input_file = "input_data/summary_transactions.csv"
        output_file = "output_data/rfm_metrics.csv"

        # Generate RFM metrics
        rfm_file_path = generate_rfm_metrics(input_file)

        # Read and store JSON summary in Redis
        rfm_df = pd.read_csv(rfm_file_path)
        rfm_json = rfm_df.to_json(orient="records")
        redis_client.set("rfm_data", rfm_json)

        return jsonify({"message": "RFM metrics calculated and stored successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@rfm_bp.route("/get-rfm", methods=["GET"])
def get_rfm():
    try:
        # Fetch from Redis
        rfm_json = redis_client.get("rfm_data")
        if rfm_json:
            rfm_data = json.loads(rfm_json)
            return jsonify(rfm_data), 200
        else:
            return jsonify({"error": "No RFM data found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
