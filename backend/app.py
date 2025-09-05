from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from nlp_model import analyze_sentiment
from data_utils import load_financial_news, load_stock_prices, compute_sentiment_scores

app = Flask(__name__)
CORS(app)

# Routes
@app.route("/api/sentiment", methods=["POST"])
def sentiment():
    try:
        data = request.json
        text = data.get("text", "")
        result = analyze_sentiment(text)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/stock-correlation", methods=["GET"])
def stock_correlation():
    try:
        company = request.args.get("company", "DemoCorp")
        news_df = load_financial_news()
        stock_df = load_stock_prices()

        # Filter for the company
        news_df = news_df[news_df['company'] == company]
        stock_df = stock_df[stock_df['company'] == company]

        if news_df.empty or stock_df.empty:
            return jsonify({"error": "No data for this company"}), 404

        # Compute sentiment scores
        news_df = compute_sentiment_scores(news_df)

        # Merge by date
        merged = pd.merge(news_df, stock_df, on="date", how="inner")
        if merged.empty:
            correlation = 0.0
        else:
            correlation = merged['sentiment_score'].corr(merged['close'])
            correlation = round(correlation, 2)

        return jsonify({"company": company, "correlation": correlation})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5003, debug=True)
