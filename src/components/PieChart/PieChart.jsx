import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./PieChart.css";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
  const facultyData = [
    {
      faculty: "Факультет графики и искусства книги имени В.А. Фаворского",
      count: 50,
    },
    { faculty: "Факультет издательского дела и журналистики", count: 70 },
    { faculty: "Факультет информационных технологий", count: 30 },
    { faculty: "Факультет машиностроения", count: 20 },
    { faculty: "Полиграфический факультет", count: 40 },
    { faculty: "Транспортный факультет", count: 25 },
    { faculty: "Факультет урбанистики и городского хозяйства", count: 15 },
    { faculty: "Факультет химической технологии и биотехнологии", count: 35 },
    { faculty: "Факультет экономики и управления", count: 45 },
  ];

  const total = facultyData.reduce((sum, item) => sum + item.count, 0);
  const data = {
    labels: facultyData.map((item) => item.faculty),
    datasets: [
      {
        label: "Доля конверсий",
        data: facultyData.map((item) => item.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(199, 199, 199, 0.6)",
          "rgba(83, 102, 255, 0.6)",
          "rgba(255, 99, 235, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(199, 199, 199, 1)",
          "rgba(83, 102, 255, 1)",
          "rgba(255, 99, 235, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.parsed;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${percentage}% (${value} конверсий)`;
          },
        },
      },
    },
  };

  return (
    <div className="pie-chart__container">
        <h2 className="pie-chart__title">Распределение конверсий по факультетам</h2>
        <div className="pie-chart__content">
            <Pie data={data} options={options} />
        </div>
    </div>
  )
}
