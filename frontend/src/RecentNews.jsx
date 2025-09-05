import React, { useEffect, useState } from "react";

export default function RecentNews() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // For demo, fetch backend news CSV via API or static JSON
    setNews([
      { date: "2025-08-01", headline: "Company reports record quarterly profits" },
      { date: "2025-08-02", headline: "CEO announces innovative product line" },
      { date: "2025-08-03", headline: "Minor regulatory fine imposed" }
    ]);
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 transition hover:shadow-2xl">
      <h2 className="text-xl font-semibold mb-4">📰 Recent Financial News</h2>
      <ul className="space-y-2 max-h-64 overflow-y-auto">
        {news.map((item, index) => (
          <li key={index} className="p-2 bg-gray-50 rounded hover:bg-indigo-50 transition">
            <span className="font-medium">{item.date}:</span> {item.headline}
          </li>
        ))}
      </ul>
    </div>
  );
}
