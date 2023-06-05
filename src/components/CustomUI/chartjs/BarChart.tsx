import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Box } from "@chakra-ui/react";
import { barchart } from "../../../@fakedb/charts";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  showTooltips: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
    tooltip: {
      enabled: true,
    },
  },
};

export default function BarChart() {
  const newbarchart = barchart?.data?.map((item: any) => {
    console.log("newbarchart", { item });
  });

  const reducedValueY = (barchart?.data || []).reduce(
    (final: any, item: any) => {
      final.push(item.y[0]);
      return final;
    },
    []
  );
  console.log(`reducedValueY`, { reducedValueY });

  const reducedValueX = (barchart?.data || []).reduce(
    (final: any, item: any) => {
      final.push(item.x[0]);
      return final;
    },
    []
  );
  console.log(`reducedValueX`, { reducedValueX });

  const reducedValueBGColor = (barchart?.data || []).reduce(
    (final: any, item: any) => {
      final.push(item.marker.color);
      return final;
    },
    []
  );
  console.log(`reducedValueBGColor`, { reducedValueBGColor });

  //   const labels = ["January", "February", "March", "April", "May"];
  const labels = reducedValueX;

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: reducedValueY,
        backgroundColor: reducedValueBGColor,
      },
    ],
  };

  return (
    <Box
      sx={{ bgColor: "white", width: "400px" }}
      className='flex items-center justify-center'
    >
      <Bar options={options} data={data} />
    </Box>
  );
}
