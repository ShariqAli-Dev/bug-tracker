import { NextPage } from 'next';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TicketsByPriority: NextPage = () => {
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels: ['None', 'Low', 'Medium', 'High'],
      datasets: [
        {
          // label: "Whom'st let the dogs out",
          data: [2, 3, 4, 1],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: ['#9C2A4B', '#320311'],
        },
      ],
    });
    setChartOptions({
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          display: false,
        },
        title: {
          display: true,
          text: 'Tickets By Priority',
        },
      },
    });
  }, []);
  return (
    <>
      <Bar options={chartOptions} data={chartData} />
    </>
  );
};

export default TicketsByPriority;
