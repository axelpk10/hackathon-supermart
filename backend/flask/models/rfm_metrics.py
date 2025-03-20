import pandas as pd
import numpy as np
from datetime import datetime
import os

def generate_rfm_metrics(summary_transactions_file, output_dir="output_data"):
    print("Loading summary transactions data...")
    summary_transactions_df = pd.read_csv(summary_transactions_file)
    summary_transactions_df['Transaction_Date'] = pd.to_datetime(summary_transactions_df['Transaction_Date'], format='%d/%m/%Y')
    current_date = datetime(2025, 1, 1)

    print("Calculating RFM metrics...")
    customer_ids_in_transactions = summary_transactions_df['Customer_ID'].unique()
    
    customer_stats = {}
    for customer_id in customer_ids_in_transactions:
        customer_transactions = summary_transactions_df[summary_transactions_df['Customer_ID'] == customer_id]
        transaction_dates = customer_transactions['Transaction_Date'].sort_values().tolist()
        
        frequency = len(transaction_dates)
        first_purchase_date = transaction_dates[0] if frequency > 0 else None
        last_purchase_date = transaction_dates[-1] if frequency > 0 else None
        
        days_since_first_purchase = (last_purchase_date - first_purchase_date).days if first_purchase_date and last_purchase_date else 0
        days_since_last_purchase = (current_date - last_purchase_date).days if last_purchase_date else 365
        average_purchase_frequency = days_since_first_purchase / frequency if frequency > 1 and days_since_first_purchase > 0 else None
        total_amount = customer_transactions['Total_Amount'].sum()
        segment = customer_transactions['Customer_Segment'].iloc[0]
        
        customer_stats[customer_id] = {
            "segment": segment,
            "frequency": frequency,
            "recency_days": days_since_last_purchase,
            "first_purchase_date": first_purchase_date.strftime("%d/%m/%Y") if first_purchase_date else None,
            "last_purchase_date": last_purchase_date.strftime("%d/%m/%Y") if last_purchase_date else None,
            "customer_lifetime_days": days_since_first_purchase,
            "average_purchase_frequency": average_purchase_frequency,
            "total_amount": total_amount
        }
    
    customer_rfm_df = pd.DataFrame.from_dict(customer_stats, orient='index')
    customer_rfm_df.reset_index(inplace=True)
    customer_rfm_df.rename(columns={'index': 'customer_id'}, inplace=True)

    output_path = os.path.join(output_dir, "rfm_metrics.csv")
    customer_rfm_df.to_csv(output_path, index=False)
    
    print(f"✅ RFM metrics saved to {output_path}")
    return output_path
