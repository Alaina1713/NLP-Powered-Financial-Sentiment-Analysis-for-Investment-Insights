import pandas as pd
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
import pickle
import os

nltk.download('vader_lexicon')

# Pre-trained sentiment analyzer (VADER for simplicity)
sia = SentimentIntensityAnalyzer()

def analyze_sentiment(text):
    """
    Returns sentiment classification and compound score
    """
    if not text.strip():
        return {"sentiment": "Neutral", "score": 0.0}

    scores = sia.polarity_scores(text)
    compound = scores['compound']

    if compound >= 0.05:
        sentiment = "Positive"
    elif compound <= -0.05:
        sentiment = "Negative"
    else:
        sentiment = "Neutral"

    return {"sentiment": sentiment, "score": round(compound, 2), "text": text}
