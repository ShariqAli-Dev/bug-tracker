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
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const chartData = {
  labels: [
    'New',
    'Open',
    'In Progress',
    'Resolved',
    'Additional Info Required',
  ],
  datasets: [
    {
      data: [3, 4, 2, 0, 1],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: ['#6666cc', '#2d2d86'],
    },
  ],
};

const chartOptions = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Tickets By Progress',
    },
  },
};

const TicketsByProgress: NextPage = () => {
  return (
    <>
      <Bar options={chartOptions} data={chartData} />
    </>
  );
};

export default TicketsByProgress;
