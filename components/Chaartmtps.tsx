import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function Chart() {
  // Generate 20 data points with random values between 0 and 3500
  const dataPoints = Array.from({ length: 20 }, () =>
    Math.floor(Math.random() * 3501)
  );

  // Generate labels for each data point, spaced one hour apart
  const labels = Array.from({ length: 20 }, (_, i) =>
    new Date(Date.now() - (19 - i) * 3600 * 1000).toISOString()
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Sample Data",
        data: dataPoints,
        borderColor: "yellow",
        backgroundColor: "rgba(255, 255, 0, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "linear" as "linear", // Correctly specify the type as 'time'
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        min: 0,
        max: 3500,
        ticks: {
          stepSize: 500,
        },
        title: {
          display: true,
          text: "Value",
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
    maintainAspectRatio: false,
  };

  return <Line data={data} options={options} />;
}
