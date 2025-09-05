import pandas as pd

def load_financial_news():
    return pd.read_csv("data/financial_news.csv")

def load_stock_prices():
    return pd.read_csv("data/stock_prices.csv")

def compute_sentiment_scores(news_df):
    from nlp_model import analyze_sentiment
    # Add sentiment column
    news_df['sentiment_score'] = news_df['headline'].apply(lambda x: analyze_sentiment(x)['score'])
    return news_df
