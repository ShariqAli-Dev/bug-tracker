import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJs.register(Tooltip, Title, ArcElement, Legend);

const TicketsByStatus = () => {
  return (
    <Pie
      options={{
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Tickets By Status',
            color: '#606060',
          },
        },
      }}
      data={{
        datasets: [
          {
            data: [4, 8, 2],
            backgroundColor: ['#666666', '#999999', '#B2B2B2'],
          },
        ],
        labels: ['New', 'In Progress', 'Resolved'],
      }}
    />
  );
};

export default TicketsByStatus;
