import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TransactionGraph = ({ transactions }) => {
  const dates = transactions?.map((transaction) => transaction.date);
  const amounts = transactions?.map((transaction) => transaction.amount);

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Transaction Amount',
        data: amounts,
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  return <Line data={data} />;
};

export default TransactionGraph;

