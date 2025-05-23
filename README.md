# Retail Customer Analytics

## Project Overview
The **Retail Customer Analytics** project aims to analyze customer behavior, sales patterns, and revenue trends across various store locations. The insights generated will help optimize business strategies, improve customer experience, and enhance profitability.

## Features
- **Customer Segmentation**: Categorizing customers based on purchase behavior, demographics, and engagement levels.
- **Sales Analysis**: Identifying top-performing products, stores, and seasonal trends.
- **Revenue Forecasting**: Predicting future revenue trends using machine learning models.
- **Customer Lifetime Value (CLV) Estimation**: Measuring customer value over time.
- **Personalized Recommendations**: Suggesting relevant products to customers using AI-based techniques.
- **Churn Prediction**: Identifying at-risk customers to improve retention strategies.
- **Marketing Campaign Optimization**: Analyzing past campaign performance to improve future targeting.

## Tech Stack
### Backend:
- **Flask** (for API development)
- **Node.js** (for GraphQL API integration)

### Frontend:
- **React.js** (for visualization and dashboard)

### Database & Storage:
- **Redis** (for temporary data storage)
- **PostgreSQL(Supabase)** (for long-term storage)

### Data Processing:
- **Pandas**, **NumPy** (for data wrangling and manipulation)
- **Scikit-learn**, **TensorFlow** (for machine learning)
- **NLTK**, **spaCy** (for natural language processing, if required)

### Visualization:
- **Recharts** (for interactive graphs in React)
- **Matplotlib**, **Seaborn** (for backend data visualization)

## Installation

### Clone the repository
```sh
git clone https://github.com/yourusername/retail-customer-analytics.git
cd retail-customer-analytics
```
Prerequisites
Node.js (v16+)
Python (v3.10)
Docker (for Redis)
Supabase (for PostgreSQL)
Redis (Running via Docker)
Environment Variables (Create a .env file)

### Setup Redis (Docker)
```sh
docker run --name redis-container -d -p 6379:6379 redis
```
### Setup Node.js Backend
```sh
cd backend/node
npm install
npm run dev
```
### Setup Flask Backend (ML Models)
```sh
cd backend/flask
pip install -r requirements.txt
python app.py  # Runs on port 5001
```
### Run Frontend (React + Recharts)
```sh
cd frontend
npm install
npm run dev 
```
