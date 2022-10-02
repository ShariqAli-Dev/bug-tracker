import { ArcElement, Chart as ChartJs, Legend, Title, Tooltip } from "chart.js";
import { withUrqlClient } from "next-urql";
import { Pie } from "react-chartjs-2";
import { createUrqlClient } from "../utils/createUrqlClient";
ChartJs.register(Tooltip, Title, ArcElement, Legend);

const TicketsByType = () => {
  return (
    <Pie
      options={{
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
          title: {
            display: true,
            text: "Tickets By Type",
            color: "#606060",
          },
        },
      }}
      data={{
        datasets: [
          {
            data: [],
            backgroundColor: ["#B2B2B2", "#666666", "#999999"],
          },
        ],
        labels: ["Issue", "Bug", "Feature"],
      }}
    />
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(TicketsByType);
