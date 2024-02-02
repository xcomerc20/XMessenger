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
} from "chart.js";

// Register the necessary components for Chart.js

const PerformanceChart = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  // Define the data for the chart
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Monthly Performance",
        data: [65, 59, 80, 81, 56, 55, 40], // Example data
        backgroundColor: "yellow", // Set the bars to yellow
        borderRadius: 20,
      },
    ],
  };

  // Define options for the chart (optional)
  const options = {
    scales: {
      y: {
        beginAtZero: true, // Start the y-axis at 0
      },
    },
    plugins: {
      legend: {
        display: true, // Display the legend (optional)
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default PerformanceChart;
