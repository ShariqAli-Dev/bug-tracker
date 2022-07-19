import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJs.register(Tooltip, Title, ArcElement, Legend);

const TicketsByType: NextPage = () => {
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
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
    });
    setChartOptions({
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          display: true,
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
      <Pie options={chartOptions} data={chartData} />
    </>
  );
};

export default TicketsByType;
