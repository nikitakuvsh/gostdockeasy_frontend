import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./BarChart.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart() {
  const [usageData, setUsageData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/stats_month`);
        const data = await response.json();
        setUsageData(data);
      } catch (error) {
        console.error("Ошибка при загрузке статистики:", error);
      }
    }

    fetchData();
  }, []);

  const data = {
    labels: usageData.map((item) => item.date),
    datasets: [
      {
        label: "Ежемесячное использование",
        data: usageData.map((item) => item.count),
        backgroundColor: "rgb(98, 144, 228)",
        borderColor: "rgb(76, 126, 218)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.parsed.y} конверсий`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Количество конверсий" },
      },
      x: {
        title: { display: true, text: "Дата" },
      },
    },
  };

  return (
    <div className="chart__container">
      <h2 className="chart__title">Статистика использования конвертора за последние месяцы</h2>
      <div className="chart__content">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
