from flask import Blueprint, jsonify, request
import redis
import pandas as pd
import json
import os
from models.rfm_metrics import generate_rfm_metrics

# Create a Blueprint for RFM metrics
rfm_bp = Blueprint("rfm", __name__)

# Initialize Redis connection
redis_client = redis.StrictRedis(host="localhost", port=6379, db=0, decode_responses=True)

@rfm_bp.route("/generate-rfm-metrics", methods=["POST"])
def process_rfm_metrics():
    try:
        # Get input file path from request JSON
        summary_transactions_file = "input_data/summary_transactions.csv"
        
        # Generate RFM metrics
        output_path = generate_rfm_metrics(summary_transactions_file)
        
        # Read the generated metrics
        rfm_metrics_df = pd.read_csv(output_path)
        
        # Store results in Redis
        metrics_json = rfm_metrics_df.to_json(orient="records")
        redis_client.set("rfm_metrics", metrics_json)
        
        return jsonify({
            "message": "RFM metrics generated and stored successfully!",
            "total_customers": len(rfm_metrics_df)
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@rfm_bp.route("/get-rfm-metrics", methods=["GET"])
def get_rfm_metrics():
    try:
        # Fetch RFM metrics from Redis
        metrics_json = redis_client.get("rfm_metrics")
        if metrics_json:
            metrics_data = json.loads(metrics_json)
            return jsonify(metrics_data), 200
        else:
            return jsonify({"error": "No RFM metrics found. Please generate metrics first."}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@rfm_bp.route("/get-customer-rfm/<customer_id>", methods=["GET"])
def get_customer_rfm(customer_id):
    try:
        # Fetch RFM metrics from Redis
        metrics_json = redis_client.get("rfm_metrics")
        if metrics_json:
            metrics_data = json.loads(metrics_json)
            # Find the customer by ID
            customer_metrics = next((item for item in metrics_data if str(item["customer_id"]) == str(customer_id)), None)
            
            if customer_metrics:
                return jsonify(customer_metrics), 200
            else:
                return jsonify({"error": f"Customer ID {customer_id} not found"}), 404
        else:
            return jsonify({"error": "No RFM metrics found. Please generate metrics first."}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@rfm_bp.route("/get-segment-summary", methods=["GET"])
def get_segment_summary():
    try:
        # Fetch RFM metrics from Redis
        metrics_json = redis_client.get("rfm_metrics")
        if metrics_json:
            # Load data into pandas DataFrame for easier aggregation
            metrics_df = pd.DataFrame(json.loads(metrics_json))
            
            # Group by segment and calculate summary statistics
            segment_summary = metrics_df.groupby("segment").agg({
                "customer_id": "count",
                "frequency": "mean",
                "recency_days": "mean",
                "total_amount": "sum",
                "customer_lifetime_days": "mean"
            }).reset_index()
            
            # Rename columns for clarity
            segment_summary.rename(columns={
                "customer_id": "customer_count",
                "frequency": "avg_purchase_frequency",
                "recency_days": "avg_days_since_purchase",
                "customer_lifetime_days": "avg_customer_lifetime_days"
            }, inplace=True)
            
            # Convert to JSON
            segment_summary_json = segment_summary.to_dict(orient="records")
            
            return jsonify(segment_summary_json), 200
        else:
            return jsonify({"error": "No RFM metrics found. Please generate metrics first."}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500