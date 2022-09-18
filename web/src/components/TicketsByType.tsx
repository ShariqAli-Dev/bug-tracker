import { ArcElement, Chart as ChartJs, Legend, Title, Tooltip } from "chart.js";
import { withUrqlClient } from "next-urql";
import { Pie } from "react-chartjs-2";
import { useProjectByTypeQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
ChartJs.register(Tooltip, Title, ArcElement, Legend);

const TicketsByType = () => {
  const [{ data }] = useProjectByTypeQuery();

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
            data: [
              data?.projectByType[0].issue,
              data?.projectByType[0].bug,
              data?.projectByType[0].feature,
            ],
            backgroundColor: ["#B2B2B2", "#666666", "#999999"],
          },
        ],
        labels: ["Issue", "Bug", "Feature"],
      }}
    />
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(TicketsByType);
