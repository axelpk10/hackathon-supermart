import pandas as pd
import matplotlib.pyplot as plt
from mlxtend.frequent_patterns import apriori, fpgrowth, association_rules
from mlxtend.preprocessing import TransactionEncoder

def process_transactions_and_get_rules(df, min_support=0.01, min_confidence=0.6, min_lift=1.0, top_n=20, algorithm="apriori"):
    """
    Processes transaction data (passed as a DataFrame) to generate and filter association rules.
    
    Args:
        df (pd.DataFrame): DataFrame containing transactions with 'Transaction_ID' and 'Product_Name'.
        min_support (float): Minimum support threshold.
        min_confidence (float): Minimum confidence threshold.
        min_lift (float): Minimum lift threshold.
        top_n (int): Number of top rules to return.
        algorithm (str): Either "apriori" or "fpgrowth" for generating frequent itemsets.
    
    Returns:
        top_rules (pd.DataFrame): DataFrame containing the top association rules.
    """
    
    # Ensure product names are normalized
    df['Product_Name'] = df['Product_Name'].str.strip().str.lower()

    # Convert transactions into a list of lists (Each transaction = set of products)
    transactions = df.groupby('Transaction_ID')['Product_Name'].apply(list).tolist()

    # Encode transactions into one-hot format
    te = TransactionEncoder()
    te_ary = te.fit(transactions).transform(transactions)
    df_encoded = pd.DataFrame(te_ary, columns=te.columns_)

    # Generate frequent itemsets
    if algorithm == "apriori":
        frequent_itemsets = apriori(df_encoded, min_support=min_support, use_colnames=True)
    elif algorithm == "fpgrowth":
        frequent_itemsets = fpgrowth(df_encoded, min_support=min_support, use_colnames=True)
    else:
        raise ValueError("Invalid algorithm choice! Use 'apriori' or 'fpgrowth'.")

    # Generate association rules
    rules = association_rules(frequent_itemsets, metric="confidence", min_threshold=min_confidence)
    rules = rules[rules["lift"] >= min_lift]

    # Convert frozensets to comma-separated strings
    rules["antecedents"] = rules["antecedents"].apply(lambda x: ", ".join(x))
    rules["consequents"] = rules["consequents"].apply(lambda x: ", ".join(x))

    # Sort rules by Lift and select top N
    top_rules = rules.sort_values(by="lift", ascending=False).head(top_n)

    return top_rules

# Example Usage
df_transactions = pd.read_csv("./input_data/transactions_with_product_sets_full.csv", encoding="Windows-1252")
top_rules_df = process_transactions_and_get_rules(df_transactions)

# Save cleaned results
top_rules_df.to_csv("top_association_rules.csv", index=False)

print("Processed transactions and extracted top association rules successfully!")