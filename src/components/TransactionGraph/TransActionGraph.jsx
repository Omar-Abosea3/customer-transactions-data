import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TransactionGraph = ({ transactions }) => {
    if (!Object.groupBy) {
      Object.groupBy = function (iterable, callbackFn) {
        const result = {};
        for (const [index, element] of iterable.entries()) {
          const key = callbackFn(element, index);
          if (!result[key]) {
            result[key] = [];
          }
          result[key].push(element);
        }
        return result;
      };
    }
    const displayedDates = Object.groupBy(transactions, ({ date }) => date);
  
    for (const key in displayedDates) {
      if (Object.hasOwnProperty.call(displayedDates, key)) {
        displayedDates[key] = displayedDates[key].reduce(
          (sum, item) => sum + item.amount,
          0
        );
      }
    }
  
    console.log({ displayedDates });
    const dates = Object.keys(displayedDates);
    const amounts = Object.values(displayedDates);
  
    const data = {
      labels: dates,
      datasets: [
        {
          label: "Transaction",
          data: amounts,
          borderColor: "tomato",
          borderWidth: 4,
          fill: false,
        },
      ],
    };
    const options = {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Transaction Amount",
          },
        },
        x: {
          title: {
            display: true,
            text: "Date",
          },
        },
      },
    };
    return (
      <div className="mt-3">
        <Line data={data} options={options} />
      </div>
    );
  };

export default TransactionGraph;

