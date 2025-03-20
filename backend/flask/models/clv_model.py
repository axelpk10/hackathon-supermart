import pandas as pd
import numpy as np

def calculate_clv(file_path):
    df = pd.read_csv(file_path, encoding="ISO-8859-1")
    df["Transaction_Date"] = pd.to_datetime(df["Transaction_Date"])
    
    clv_df = df.groupby("Customer_ID").agg({
        "Total_Amount": "sum",
        "Transaction_ID": "count",
        "Transaction_Date": ["min", "max"]
    }).reset_index()
    
    clv_df.columns = ["Customer_ID", "Total_Amount", "Frequency", "First_Purchase_Date", "Last_Purchase_Date"]
    
    # Calculate tenure
    clv_df["Customer_Tenure"] = (clv_df["Last_Purchase_Date"] - clv_df["First_Purchase_Date"]).dt.days + 1
    clv_df = clv_df[clv_df["Customer_Tenure"] >= 30]  
    
    clv_df["AOV"] = clv_df["Total_Amount"] / clv_df["Frequency"]
    clv_df["Purchase_Frequency"] = clv_df["Frequency"] / clv_df["Customer_Tenure"]
    clv_df["Purchase_Frequency"] = np.where(clv_df["Purchase_Frequency"] > 1, 1, clv_df["Purchase_Frequency"])
    clv_df["CLV_Calculated"] = clv_df["AOV"] * clv_df["Purchase_Frequency"] * 365
    
    return clv_df
