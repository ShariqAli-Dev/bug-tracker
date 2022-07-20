import { NextPage } from 'next';
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJs.register(Tooltip, Title, ArcElement, Legend);

const chartData = {
  datasets: [
    {
      data: [3, 6, 1],
      // Dark Off-Pastels Color Palette
      backgroundColor: ['#2d5b6b', '#c47a53', '#52494c'],
    },
  ],
  labels: ['Shariq Ali', 'Michael Jackson', 'Spongebob'],
};

const chartOptions = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'Tickets By User',
    },
  },
};

const TicketsByUser: NextPage = () => {
  return (
    <>
      <Pie options={chartOptions} data={chartData} />
    </>
  );
};

export default TicketsByUser;
