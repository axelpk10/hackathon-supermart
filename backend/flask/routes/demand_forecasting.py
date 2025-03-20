from flask import Blueprint, jsonify
import redis
import json
from models.demand_forecasting import run_forecasting

redis_client = redis.Redis(host="localhost", port=6379, db=0, decode_responses=True)

demand_forecast_bp = Blueprint("demand_forecast", __name__)

# Define Redis keys
STORE_FORECAST_KEY = "forecast:store"
CATEGORY_FORECAST_KEY = "forecast:category"
EXPIRY_TIME = 86400  # Cache expiry time (24 hours)

@demand_forecast_bp.route("/forecast", methods=["POST"])
def run_forecast():
    """
    API endpoint to trigger LSTM demand forecasting and cache the results in Redis.
    """
    try:
        results = run_forecasting()

        # ✅ Ensure both index and keys are strings
        store_forecast = {
            str(date): {str(k): v for k, v in row.items()}
            for date, row in results["store_forecast"].items()
        }
        category_forecast = {
            str(date): {str(k): v for k, v in row.items()}
            for date, row in results["category_forecast"].items()
        }

        # ✅ Store results in Redis
        redis_client.setex(STORE_FORECAST_KEY, EXPIRY_TIME, json.dumps(store_forecast))
        redis_client.setex(CATEGORY_FORECAST_KEY, EXPIRY_TIME, json.dumps(category_forecast))

        return jsonify({"message": "Forecasting completed successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@demand_forecast_bp.route("/forecast/store", methods=["GET"])
def get_store_forecast():
    """
    API endpoint to retrieve the latest store forecast results from Redis.
    """
    try:
        store_forecast = redis_client.get(STORE_FORECAST_KEY)
        if not store_forecast:
            return jsonify({"error": "No store forecast data found. Please run forecasting first."}), 400

        return jsonify({"store_forecast": json.loads(store_forecast)}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@demand_forecast_bp.route("/forecast/category", methods=["GET"])
def get_category_forecast():
    """
    API endpoint to retrieve the latest category forecast results from Redis.
    """
    try:
        category_forecast = redis_client.get(CATEGORY_FORECAST_KEY)
        if not category_forecast:
            return jsonify({"error": "No category forecast data found. Please run forecasting first."}), 400

        return jsonify({"category_forecast": json.loads(category_forecast)}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
