import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  scales,
} from "chart.js";
import "./BarChart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart() {
  const usageData = [
    { date: "Январь 2025", count: 120 },
    { date: "Февраль 2025", count: 150 },
    { date: "Март 2025", count: 100 },
    { date: "Апрель 2025", count: 180 },
    { date: "Май 2025", count: 130 },
    { date: "Июнь 2025", count: 200 },
    { date: "Июль 2025", count: 170 },
  ];

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
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.parsed.y} конверсий`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Количество конверсий",
        },
      },
      x: {
        title: {
          display: true,
          text: "Дата",
        },
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
};
