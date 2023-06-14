import React, { useEffect, useState } from "react";
//@ts-ignore
import Plotly from "plotly.js/dist/plotly";
import { chartLayout } from "../../@data/chartLayout";
import { assign } from "lodash";
import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import ChartControlButton from "../CustomUI/ChartControlButton";
import { RepeatClockIcon } from "@chakra-ui/icons";
import { BarChart2, Move, ZoomIn } from "lucide-react";

type ChartDataProps = {
  data: any[];
  layout: any;
};

type PLotlyChartProps = { chartData: ChartDataProps };

export default function PLotlyChart({ chartData }: PLotlyChartProps) {
  // ==== UNTUK CONTROL BUTTON
  const [resetOn, setResetOn] = useState<boolean>(false);
  const [panOn, setPanOn] = useState<boolean>(false);
  const [zoomOn, setZoomOn] = useState<boolean>(true);
  // ==== UNTUK CONTROL BUTTON

  useEffect(() => {
    const config = {
      // displayModeBar: false,
      responsive: true,
      displaylogo: false,
      modeBarButtonsToRemove: [
        "toImage",
        "autoScale",
        "select2d",
        // "zoom2d",
        // "pan2d",
        "zoomIn2d",
        "zoomOut2d",
        "lasso2d",
        // "resetScale2d",
      ],
    };

    Plotly.newPlot(
      `myPlotlyDiv`,
      chartData.data,
      assign({}, chartData?.layout, chartLayout),
      config
    );
    return () => {
      Plotly.purge(`myPlotlyDiv`);
    };
  }, []);

  function handleReset(): void {
    const resetBtn: NodeListOf<HTMLAnchorElement> = document.querySelectorAll(
      'a[data-val*="reset"]'
    );
    resetBtn.forEach((element: HTMLAnchorElement) => {
      element.click();
    });
    setResetOn(true);
    setPanOn(false);
    setZoomOn(false);
  }

  function handlePanOn(): void {
    const panBtn: NodeListOf<HTMLAnchorElement> =
      document.querySelectorAll('a[data-val*="pan"]');
    panBtn.forEach((element: HTMLAnchorElement) => {
      element.click();
    });
    setPanOn(true);
    setResetOn(false);
    setZoomOn(false);
  }

  function handleZoomOn(): void {
    const zoomBtn: NodeListOf<HTMLAnchorElement> = document.querySelectorAll(
      'a[data-val*="zoom"]'
    );
    zoomBtn.forEach((element: HTMLAnchorElement) => {
      element.click();
    });
    setZoomOn(true);
    setResetOn(false);
    setPanOn(false);
  }

  return (
    <Box
      sx={{
        bgcolor: "white",
        position: "relative",
        borderRadius: 4,
        border: "1px solid",
        borderColor: "purple",
      }}
    >
      <Grid
        sx={{
          width: "100%",
          padding: 4,
          gap: 2,
          flexWrap: { xs: "wrap", md: "nowrap" },
          overflow: "hidden",
        }}
      >
        <GridItem colSpan={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                borderRadius: 2,
                display: "grid",
                placeItems: "center",
                padding: 2,
                background:
                  "linear-gradient(to bottom right, #ff6361, #bc5090)",
              }}
            >
              <BarChart2 style={{ color: "white" }} />
            </Box>

            <Text
              fontSize='xl'
              fontWeight={600}
              sx={{
                background:
                  "linear-gradient(to bottom right, #ff6361, #bc5090)",
                "-webkit-background-clip": "text",
                "-webkit-text-fill-color": "transparent",
              }}
            >
              {chartData?.layout?.title?.text}
            </Text>
          </Box>
        </GridItem>
        <GridItem
          colSpan={6}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: { xs: "center", md: "end" },
          }}
        >
          <Box
            sx={{
              bgcolor: "#F5F5F5",
              display: "flex",
              flexDirection: "row",
              gap: 1,
              padding: "10px 12px",
              borderRadius: 2,
            }}
          >
            <ChartControlButton toggle={resetOn} handleClick={handleReset}>
              <RepeatClockIcon
                sx={{
                  color: resetOn ? "white" : "purple",
                  fontSize: 16,
                  marginRight: 1,
                }}
              />
              reset
            </ChartControlButton>

            <ChartControlButton toggle={panOn} handleClick={handlePanOn}>
              <Move
                style={{
                  color: panOn ? "white" : "purple",
                  fontSize: 16,
                  marginRight: 1,
                }}
              />
              pan
            </ChartControlButton>

            <ChartControlButton toggle={zoomOn} handleClick={handleZoomOn}>
              <ZoomIn
                style={{
                  color: zoomOn ? "white" : "purple",
                  fontSize: 16,
                  marginRight: 1,
                }}
              />
              zoom
            </ChartControlButton>
          </Box>
        </GridItem>
      </Grid>
      <Box sx={{ borderRadius: 4, overflow: "hidden" }}>
        <div id={`myPlotlyDiv`} />
      </Box>
    </Box>
  );
}
