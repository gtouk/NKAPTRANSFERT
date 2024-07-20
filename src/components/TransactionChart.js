import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip } from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';

// Register the components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const TransactionChart = ({ transactions }) => {
  // Process transactions data to fit the chart
  const labels = transactions.map(tx => `${tx.month}/${tx.year}`);
  const data = transactions.map(tx => tx.amount);

  const dataChart = {
    labels: labels,
    datasets: [
      {
        label: 'Montant Transféré',
        data: data,
        fill: false,
        borderColor: '#16A085',
        tension: 0.1
      }
    ]
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Mois/Année'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Montants Transférés (USD)'
        },
        beginAtZero: true
      }
    }
  };

  return <Line data={dataChart} options={options} />;
};

export default TransactionChart;
