import { Box, Button } from "@chakra-ui/react";
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from "chart.js";
import { withUrqlClient } from "next-urql";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { useProjectByTypeQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
ChartJs.register(Tooltip, Title, ArcElement, Legend);

const TicketsByType = () => {
  const [{ data: queryData, fetching }] = useProjectByTypeQuery();
  const [data, setData] = useState([]);
  console.log(queryData);

  useEffect(() => {
    if (!fetching) {
      setData(queryData?.projectByType[0]);
    } else {
      return;
    }
  }, [queryData, fetching]);

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
            data: [data.issue, data.bug, data.feature],
            backgroundColor: ["#B2B2B2", "#666666", "#999999"],
          },
        ],
        labels: ["Issue", "Bug", "Feature"],
      }}
    />
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(TicketsByType);
