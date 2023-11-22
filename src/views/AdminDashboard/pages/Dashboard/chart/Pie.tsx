import { useGetAnalystCategories } from "@/hooks/useCategory";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
    title: {
      display: true,
      text: "Chủ đề",
    },
  },
};

export function PieChart() {
  const data_chart = {
    labels: [] as string[],
    datasets: [
      {
        label: "% of courses",
        data: [] as number[],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(84, 22, 180, 0.2)",
          "rgba(181, 100, 227, 0.2)",
          "rgba(204, 255, 0, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(84, 22, 180, 1)",
          "rgba(181, 100, 227, 1)",
          "rgba(204, 255, 0, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const { data } = useGetAnalystCategories();

  data?.map((e: { name: string; count: number }) => {
    data_chart.labels.push(e.name);
    data_chart.datasets[0].data.push(e.count);
  });

  return <Pie data={data_chart} options={options} />;
}
