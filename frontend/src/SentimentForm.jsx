import React, { useState } from "react";

export default function SentimentForm() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:5003/api/sentiment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 transition hover:shadow-2xl">
      <h2 className="text-xl font-semibold mb-4">📝 Analyze News / Reports</h2>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        className="w-full border border-gray-300 rounded-xl p-3 mb-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        rows={6}
        placeholder="Paste financial news or company report here..."
      />
      <button
        onClick={handleSubmit}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
      >
        Analyze Sentiment
      </button>

      {result && (
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-green-50 to-blue-50 shadow-inner border border-gray-100">
          <p className="mb-2"><strong>Sentiment:</strong> {result.sentiment}</p>
          <p><strong>Score:</strong> {result.score}</p>
        </div>
      )}
    </div>
  );
}
