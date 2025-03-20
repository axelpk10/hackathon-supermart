CREATE OR REPLACE FUNCTION get_monthly_revenue()
RETURNS TABLE(month TEXT, totalRevenue FLOAT)
LANGUAGE sql
AS $$
  SELECT 
    TO_CHAR(Transaction_Date, 'YYYY-MM') AS month,
    SUM(Amount) AS totalRevenue
  FROM transactions
  GROUP BY month
  ORDER BY month;
$$;
