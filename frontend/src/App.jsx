import React from "react";
import SentimentForm from "./SentimentForm";
import SentimentDashboard from "./SentimentDashboard";
import RecentNews from "./RecentNews";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-50 text-gray-800">
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-extrabold tracking-tight mb-1">
            💹 Financial Sentiment Analyzer
          </h1>
          <p className="text-sm opacity-80">
            NLP-powered insights to guide investment decisions
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-6 mt-6">
        <div className="md:col-span-1 space-y-6">
          <SentimentForm />
          <RecentNews />
        </div>
        <div className="md:col-span-2">
          <SentimentDashboard />
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-gray-500 mt-10">
        Built by Alaina Rahim • Sentiment classifier ~87% accuracy
      </footer>
    </div>
  );
}
