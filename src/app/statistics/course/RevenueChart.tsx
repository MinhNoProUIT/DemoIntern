import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

const RevenueChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation("common");
  const { theme } = useTheme();

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);

      const option = {
        tooltip: {
          trigger: "axis",
          textStyle: {
            color: theme === "light" ? "#000000" : "#ffffff",
          },
        },
        xAxis: {
          type: "category",
          data: [
            "Tháng 1",
            "Tháng 2",
            "Tháng 3",
            "Tháng 4",
            "Tháng 5",
            "Tháng 6",
            "Tháng 7",
            "Tháng 8",
            "Tháng 9",
            "Tháng 10",
            "Tháng 11",
            "Tháng 12",
          ],
          axisLabel: {
            color: theme === "light" ? "black" : "#fff",
          },
        },
        yAxis: {
          type: "value",
          name: "VNĐ",
          axisLabel: {
            color: theme === "light" ? "black" : "#fff",
          },
        },
        series: [
          {
            data: [
              130000, 150000, 180000, 200000, 120000, 150000, 0, 0, 0, 0, 0, 0,
            ],
            type: "line",
            smooth: true,
            areaStyle: {},
          },
        ],
      };

      chartInstance.setOption(option);

      return () => {
        chartInstance.dispose();
      };
    }
  }, [theme, t]);

  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: 2,
        p: 2,
        backgroundColor: "var(--background-item)",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: "bold",
            textAlign: "center",
            color: "var(--text-color)",
          }}
        >
          {t("COMMON.COURSE.TITLE_CHART")}
        </Typography>
        <Box
          ref={chartRef}
          sx={{
            width: "100%",
            height: "400px",
          }}
        />
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
