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
  labels: ['None', 'Low', 'Medium', 'High'],
  datasets: [
    {
      data: [2, 3, 4, 1],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: ['#9C2A4B', '#320311'],
    },
  ],
};

const chartOptions = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Tickets By Priority',
    },
  },
};

const TicketsByPriority: NextPage = () => {
  return (
    <>
      <Bar options={chartOptions} data={chartData} />
    </>
  );
};

export default TicketsByPriority;
