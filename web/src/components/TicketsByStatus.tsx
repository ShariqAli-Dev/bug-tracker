import { ArcElement, Chart as ChartJs, Legend, Title, Tooltip } from "chart.js";
import { withUrqlClient } from "next-urql";
import { Pie } from "react-chartjs-2";
import { useTicketsByStatusQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
ChartJs.register(Tooltip, Title, ArcElement, Legend);

const TicketsByStatus = () => {
  const [{ data, fetching }] = useTicketsByStatusQuery();

  if (fetching) {
    return <></>;
  }
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
            text: "Tickets By Status",
            color: "#606060",
          },
        },
      }}
      data={{
        datasets: [
          {
            data: [
              data?.ticketsByStatus.new,
              data?.ticketsByStatus.in_progress,
              data?.ticketsByStatus.resolved,
            ],
            backgroundColor: ["#666666", "#999999", "#B2B2B2"],
          },
        ],
        labels: ["New", "In Progress", "Resolved"],
      }}
    />
  );
};

export default withUrqlClient(createUrqlClient)(TicketsByStatus);
