import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./PieChart.css";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
  const [facultyData, setFacultyData] = useState([]);

  useEffect(() => {
    async function fetchFacultyData() {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/stats`);
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const data = await response.json();
        setFacultyData(data);
      } catch (error) {
        console.error("Ошибка при загрузке данных факультетов:", error);
      }
    }

    fetchFacultyData();
  }, []);


  const total = facultyData.reduce((sum, item) => sum + item.submissions, 0);

  const data = {
    labels: facultyData.map((item) => item.faculty),
    datasets: [
      {
        label: "Доля конверсий",
        data: facultyData.map((item) => item.submissions),
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
        {facultyData.length === 0 ? (
          <p>Загрузка данных...</p>
        ) : (
          <Pie data={data} options={options} />
        )}
      </div>
    </div>
  );
}
