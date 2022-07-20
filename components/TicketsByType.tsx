import { NextPage } from 'next';
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJs.register(Tooltip, Title, ArcElement, Legend);

const chartData = {
  datasets: [
    {
      data: [30, 10, 40, 20],
      backgroundColor: ['#FB3640', '#EFCA08', '#43AA8B', '#253D5B'],
    },
  ],
  labels: [
    'Bugs/Errors',
    'Training/Document Requests',
    'Other Comments',
    'Feature Requests',
  ],
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
      text: 'Tickets By Priority',
    },
  },
};

const TicketsByType: NextPage = () => {
  return (
    <>
      <Pie options={chartOptions} data={chartData} />
    </>
  );
};

export default TicketsByType;
