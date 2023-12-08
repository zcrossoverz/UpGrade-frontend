/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetOverview } from "@/hooks/useAnalystic";
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

interface Props {
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
          text: titleText ? titleText : "Thống kê nội dung theo tháng",
        },
      },
    };
  }, [titleText]);

  const getOverview = useGetOverview();

  const data = {
    labels: getOverview.data?.lineChart?.map((e: any) => e.key),
    datasets: [
      {
        label: "Tổng khóa học",
        data: getOverview.data?.lineChart?.map((e: any) => e.countCourse),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Tổng số chương",
        data: getOverview.data?.lineChart?.map((e: any) => e.countUnit),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Tổng số bài học",
        data: getOverview.data?.lineChart?.map((e: any) => e.countTopic),
        borderColor: "rgb(129, 240, 65)",
        backgroundColor: "rgba(129, 240, 65, 0.5)",
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
