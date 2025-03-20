from flask import Flask
import redis
from routes.rfm_route import rfm_bp
from routes.clv_routes import clv_bp
from routes.demand_forecasting import demand_forecast_bp
from routes.marketBasket_route import marketBasket_bp
app = Flask(__name__)

redis_client = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)


app.logger.debug('RFM and CLV application initialized')
app.register_blueprint(clv_bp, url_prefix="/clv")
app.register_blueprint(demand_forecast_bp)
app.register_blueprint(rfm_bp)
app.register_blueprint(marketBasket_bp)

if __name__ == "__main__":
    app.run(debug=True)
