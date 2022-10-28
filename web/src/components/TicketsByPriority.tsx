import { Button } from "@chakra-ui/react";
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
  const [, getticket] = useTicketsByPriorityQuery();
  // console.log(data);
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

  return (
    <Button
      onClick={async () => {
        const data = await getticket();
        console.log(data);
      }}
    >
      Get Data
    </Button>
  );

  return <Bar options={chartOptions} data={chartData} />;
};

export default withUrqlClient(createUrqlClient)(TicketsByPriority);
