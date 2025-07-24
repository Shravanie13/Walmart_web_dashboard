from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)
CORS(app)

csv_path = os.path.abspath('./dataset/Walmart_Store_sales.csv')
print("CSV Path:", csv_path)

df = None
try:
    df = pd.read_csv(csv_path)
    print("Data loaded successfully ✅")
except Exception as e:
    print("❌ Failed to load CSV:", e)

@app.route('/api/summary')
def summary():
    if df is None:
        return jsonify({'error': 'CSV file not loaded'}), 500

    total_revenue = df['Weekly_Sales'].sum()
    total_orders = len(df)
    transport_cost = 6200000
    fulfillment_rate = 97.5

    return jsonify({
        'revenue': round(total_revenue, 2),
        'orders': total_orders,
        'transport_cost': transport_cost,
        'fulfillment_rate': fulfillment_rate
    })

# Optional: Add /dashboard route for frontend compatibility
@app.route('/dashboard')
def dashboard():
    if df is None:
        return jsonify({'error': 'CSV file not loaded'}), 500

    total_revenue = df['Weekly_Sales'].sum()
    total_orders = len(df)
    transport_cost = 6200000
    fulfillment_rate = 97.5

    return jsonify({
        'total_revenue': round(total_revenue, 2),
        'total_orders': total_orders,
        'transport_cost': transport_cost,
        'fulfillment_rate': fulfillment_rate
    })

if __name__ == '__main__':
    app.run(debug=True)