import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { withUrqlClient } from "next-urql";
import { Bar } from "react-chartjs-2";
import { useTicketsByPriorityQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TicketsByPriority = () => {
  const [{ data, fetching }] = useTicketsByPriorityQuery();
  if (fetching) {
    return <></>;
  }

  const chartData = {
    labels: ["Low", "Medium", "High", "Immediate"],
    datasets: [
      {
        data: [
          data?.ticketsByPriority.low,
          data?.ticketsByPriority.medium,
          data?.ticketsByPriority.high,
          data?.ticketsByPriority.immediate,
        ],
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

export default withUrqlClient(createUrqlClient)(TicketsByPriority);
