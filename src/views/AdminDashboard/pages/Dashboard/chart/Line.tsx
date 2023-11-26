import { useQuery } from "@tanstack/react-query";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useMemo } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
// const data1 = [200, 159, 280, 181, 156, 155, 100];
// const data2 = [45, 78, 21, 90, 13, 88, 22];
// const data3 = [100, 89, 93, 122, 109, 111, 156];
interface Props {
  inventory?: boolean;
  titleText?: string;
}
export const LineChart = ({ titleText }: Props) => {
  const options = useMemo(() => {
    return {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom" as const,
        },
        title: {
          display: true,
          text: titleText ? titleText : "Sale Analytics",
        },
      },
    };
  }, [titleText]);

  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Dataset 1",
        data: [1, 2, 3, 4, 5],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: [2, 3, 4, 5, 5],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <Line
      options={options}
      data={
        data
          ? data
          : {
              labels: [],
              datasets: [
                {
                  label: "Outbound",
                  data: [],
                  borderColor: "rgb(255, 99, 132)",
                  backgroundColor: "rgba(255, 99, 132, 0.5)",
                  tension: 0.1,
                },
                {
                  label: "Orders",
                  data: [],
                  borderColor: "rgb(53, 162, 235)",
                  backgroundColor: "rgba(53, 162, 235, 0.5)",
                  tension: 0.1,
                },
                {
                  label: "Inbound",
                  data: [],
                  borderColor: "rgb(252, 169, 3)",
                  backgroundColor: "rgba(252, 169, 3, 0.5)",
                  tension: 0.1,
                },
              ],
            }
      }
    />
  );
};
