from flask import Blueprint, jsonify
import redis
import pandas as pd
import json
from models.clv_model import calculate_clv

clv_bp = Blueprint("clv", __name__)

# Initialize Redis connection
redis_client = redis.StrictRedis(host="localhost", port=6379, db=0, decode_responses=True)

@clv_bp.route("/calculate-clv", methods=["POST"])
def calculate_and_store_clv():
    try:
        input_file = "input_data/summary_transactions.csv"
        output_file = "output_data/Future_CLV2.csv"

        # Calculate CLV
        clv_df = calculate_clv(input_file)

        # Store full CSV
        clv_df.to_csv(output_file, index=False)

        # Store JSON summary in Redis
        clv_json = clv_df.to_json(orient="records")
        redis_client.set("clv_data", clv_json)

        return jsonify({"message": "CLV calculated and stored successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@clv_bp.route("/get-clv", methods=["GET"])
def get_clv():
    try:
        # Fetch from Redis
        clv_json = redis_client.get("clv_data")
        if clv_json:
            clv_data = json.loads(clv_json)
            return jsonify(clv_data), 200
        else:
            return jsonify({"error": "No CLV data found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
