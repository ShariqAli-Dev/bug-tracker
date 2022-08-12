import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TicketsByPriority = () => {
  const chartData = {
    labels: ["Low", "Medium", "High", "Immediate"],
    datasets: [
      {
        data: [2, 3, 4, 1],
        borderColor: "#EBEBEB",
        backgroundColor: ["#E5E5E5", "#B2B2B2", "#999999", "#666666"],
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
        text: "Tickets By Priority",
        color: "#606060",
      },
    },
  };

  return <Bar options={chartOptions} data={chartData} />;
};

export default TicketsByPriority;
