from flask import Blueprint, jsonify, request
import redis
import pandas as pd
import json
from models.marketBasket import process_transactions_and_get_rules

# Create a Blueprint for association rule mining
marketBasket_bp = Blueprint("marketBasket", __name__)

# Initialize Redis connection
redis_client = redis.StrictRedis(host="localhost", port=6379, db=0, decode_responses=True)

@marketBasket_bp.route("/process-transactions", methods=["POST"])
def process_transactions():
    try:
        # Get input file path from request JSON
        input_file = "input_data/transactions_with_product_sets_full.csv"
        
        # Read transaction data
        df_transactions = pd.read_csv(input_file, encoding="Windows-1252")
        
        # Process transactions to generate association rules
        top_rules_df = process_transactions_and_get_rules(df_transactions)
        
        # Store results in Redis
        rules_json = top_rules_df.to_json(orient="records")
        redis_client.set("association_rules", rules_json)
        
        # Save results to CSV
        top_rules_df.to_csv("output_data/top_association_rules.csv", index=False)
        
        return jsonify({"message": "Association rules processed and stored successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@marketBasket_bp.route("/get-association-rules", methods=["GET"])
def get_association_rules():
    try:
        # Fetch association rules from Redis
        rules_json = redis_client.get("association_rules")
        if rules_json:
            rules_data = json.loads(rules_json)
            return jsonify(rules_data), 200
        else:
            return jsonify({"error": "No association rules found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500