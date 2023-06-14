import React, { useEffect, useState } from "react";
//@ts-ignore
import Plotly from "plotly.js/dist/plotly";
import { chartLayout } from "../../@data/chartLayout";
import { assign } from "lodash";
import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import ChartControlButton from "../CustomUI/ChartControlButton";
import { BarChart2, Move, RotateCcw, ZoomIn } from "lucide-react";
import { deepPurple } from "../../constants/muiColors";

type ChartDataProps = {
  data: any[];
  layout: any;
};

type PLotlyChartProps = { title: string; chartData: ChartDataProps };

export default function PLotlyChart({ title, chartData }: PLotlyChartProps) {
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

    const plotlyDivId = "thePlotlyDiv";
    const plotlyDiv = document.getElementById(plotlyDivId);

    if (plotlyDiv) {
      Plotly.newPlot(
        `thePlotlyDiv`,
        chartData.data,
        assign({}, chartData?.layout, chartLayout),
        config
      );
    } else {
      console.log("No Plotly Div detected");
    }
    return () => {
      Plotly.purge(`thePlotlyDiv`);
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
        backgroundColor: "white",
        position: "relative",
        borderRadius: "16px",
        border: "1px solid",
        borderColor: deepPurple[50],
      }}
    >
      <Grid gap={4} templateColumns='repeat(12, 1fr)' className='w-full p-8'>
        <GridItem colSpan={{ base: 12, md: 6 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "12px",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                borderRadius: "8px",
                display: "grid",
                placeItems: "center",
                padding: "8px",
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
              {title}
            </Text>
          </Box>
        </GridItem>
        <GridItem
          colSpan={{ base: 12, md: 6 }}
          className='flex flex-row'
          justifyContent={{ base: "center", md: "end" }}
        >
          <Box
            className='center-row gap-2 py-2 px-3 rounded-lg'
            sx={{ backgroundColor: "#F5F5F5" }}
          >
            <ChartControlButton toggle={resetOn} handleClick={handleReset}>
              <RotateCcw
                size={16}
                style={{
                  color: resetOn ? "white" : deepPurple[200],
                  marginRight: "6px",
                }}
              />
              reset
            </ChartControlButton>

            <ChartControlButton toggle={panOn} handleClick={handlePanOn}>
              <Move
                size={16}
                style={{
                  color: panOn ? "white" : deepPurple[200],
                  marginRight: "6px",
                }}
              />
              pan
            </ChartControlButton>

            <ChartControlButton toggle={zoomOn} handleClick={handleZoomOn}>
              <ZoomIn
                size={16}
                style={{
                  color: zoomOn ? "white" : deepPurple[200],
                  marginRight: "6px",
                }}
              />
              zoom
            </ChartControlButton>
          </Box>
        </GridItem>
      </Grid>
      <Box sx={{ borderRadius: "16px", overflow: "hidden" }}>
        <div style={{ height: "300px" }} id={`thePlotlyDiv`} />
      </Box>
    </Box>
  );
}
