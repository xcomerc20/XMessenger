import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

const NodeChart = () => {
    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
    // Define the data for the chart with only three bars
    const data = {
        labels: ['January', 'February', 'March'],
        datasets: [
            {
                label: 'Monthly Performance',
                data: [65, 59, 80], // Keep only three data points
                backgroundColor: 'yellow', // Set the bars to yellow
                borderRadius: 20,
              },
        ],
    };

    // Define options for the chart
    const options = {
        scales: {
            y: {
                beginAtZero: true, // Start the y-axis at 0
                max: 350, // Set the maximum value of the y-axis to 350
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

export default NodeChart;