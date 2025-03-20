import numpy as np
import pandas as pd
import tensorflow as tf
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import LSTM, Dense, Dropout
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from datetime import timedelta
import os

# File Paths
DATA_FILE = "input_data/demand_forecasting_data_final.csv"
STORE_OUTPUT_FILE = "output_data/future_store_demand_predictions.csv"
CATEGORY_OUTPUT_FILE = "output_data/future_category_demand_predictions.csv"
SEQUENCE_LENGTH = 30
FUTURE_DAYS = 30

def train_lstm_model(data, model_name):
    """ Train or load an LSTM model for demand forecasting. """
    X_lstm, y_lstm = [], []
    for i in range(len(data) - SEQUENCE_LENGTH):
        X_lstm.append(data.iloc[i:i+SEQUENCE_LENGTH].values)
        y_lstm.append(data.iloc[i+SEQUENCE_LENGTH].values)

    X_lstm, y_lstm = np.array(X_lstm), np.array(y_lstm)
    X_train, X_test, y_train, y_test = train_test_split(X_lstm, y_lstm, test_size=0.2, random_state=42)

    model_file = f"models/{model_name}.h5"

    if os.path.exists(model_file):
        print(f"✅ Loading model: {model_file}")
        custom_objects = {"mse": tf.keras.losses.MeanSquaredError()}
        lstm_model = load_model(model_file, custom_objects=custom_objects)
    else:
        print(f"📌 Training model: {model_name}")
        lstm_model = Sequential([
            LSTM(50, return_sequences=True, input_shape=(SEQUENCE_LENGTH, X_lstm.shape[2])),
            Dropout(0.2),
            LSTM(50, return_sequences=False),
            Dropout(0.2),
            Dense(X_lstm.shape[2])
        ])
        lstm_model.compile(optimizer="adam", loss="mse")
        lstm_model.fit(X_train, y_train, epochs=10, batch_size=32, validation_data=(X_test, y_test), verbose=1)
        lstm_model.save(model_file)

    return lstm_model

def generate_predictions(model, data, scaler, output_file):
    """ Generate demand predictions for future days. """
    last_date = data.index.max()
    future_dates = [last_date + timedelta(days=i) for i in range(1, FUTURE_DAYS + 1)]

    latest_data = data.iloc[-SEQUENCE_LENGTH:].values.reshape(1, SEQUENCE_LENGTH, data.shape[1])
    future_predictions = []

    for _ in range(FUTURE_DAYS):
        pred = model.predict(latest_data)
        future_predictions.append(pred.flatten())
        latest_data = np.roll(latest_data, shift=-1, axis=1)
        latest_data[:, -1, :] = pred

    future_predictions = scaler.inverse_transform(future_predictions)
    future_demand_df = pd.DataFrame(future_predictions, columns=data.columns, index=future_dates)
    future_demand_df.index.name = "Future Date"
    future_demand_df.to_csv(output_file)

    return future_demand_df.to_dict()

def run_forecasting():
    """ Main function to train models and generate predictions. """
    print("📌 Loading data...")
    demand_df = pd.read_csv(DATA_FILE)
    demand_df["transaction_date"] = pd.to_datetime(demand_df["transaction_date"], dayfirst=True, errors="coerce")
    demand_df = demand_df.dropna(subset=["transaction_date"])

    store_demand_df = demand_df.groupby(["transaction_date", "store_id"])["units_sold"].sum().unstack().fillna(0)
    category_demand_df = demand_df.groupby(["transaction_date", "category"])["units_sold"].sum().unstack().fillna(0)

    scaler_store, scaler_category = MinMaxScaler(), MinMaxScaler()
    store_demand_df[:] = scaler_store.fit_transform(store_demand_df)
    category_demand_df[:] = scaler_category.fit_transform(category_demand_df)

    store_model = train_lstm_model(store_demand_df, "lstm_store_model")
    category_model = train_lstm_model(category_demand_df, "lstm_category_model")

    store_results = generate_predictions(store_model, store_demand_df, scaler_store, STORE_OUTPUT_FILE)
    category_results = generate_predictions(category_model, category_demand_df, scaler_category, CATEGORY_OUTPUT_FILE)

    return {"store_forecast": store_results, "category_forecast": category_results}