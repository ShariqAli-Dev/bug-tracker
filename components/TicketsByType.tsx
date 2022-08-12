import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
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
            data: [30, 10, 40],
            backgroundColor: ["#B2B2B2", "#666666", "#999999"],
          },
        ],
        labels: ["Issue", "Bug", "Feature"],
      }}
    />
  );
};

export default TicketsByType;
