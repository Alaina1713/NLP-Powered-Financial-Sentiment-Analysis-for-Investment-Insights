import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function SentimentDashboard() {
  const [correlation, setCorrelation] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5003/api/stock-correlation?company=DemoCorp")
      .then(r => r.json())
      .then(d => setCorrelation(d));
  }, []);

  const chartData = {
    labels: ["Aug 1", "Aug 2", "Aug 3", "Aug 4", "Aug 5", "Aug 6", "Aug 7", "Aug 8", "Aug 9", "Aug 10"],
    datasets: [
      {
        label: "Stock Price",
        data: [150, 153, 148, 155, 157, 154, 160, 151, 159, 152],
        borderColor: "rgba(99, 102, 241, 0.8)",
        backgroundColor: "rgba(99, 102, 241, 0.3)",
        tension: 0.3,
        fill: true,
        pointRadius: 6
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Stock Price Trend vs Sentiment" }
    },
    scales: { y: { beginAtZero: false, ticks: { stepSize: 1 } } }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 transition hover:shadow-2xl">
      <h2 className="text-xl font-semibold mb-4">📈 Stock-Sentiment Correlation</h2>
      {correlation ? (
        <>
          <p className="mb-4">
            Company: <strong>{correlation.company}</strong><br />
            Correlation: <strong>{correlation.correlation}</strong>
          </p>
          <Line data={chartData} options={chartOptions} />
        </>
      ) : (
        <p>Loading correlation data...</p>
      )}
    </div>
  );
}
