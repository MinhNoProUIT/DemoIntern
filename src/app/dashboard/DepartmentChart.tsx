"use client";
import React from "react";
import ReactECharts from "echarts-for-react";
import { Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

interface IDepartmentGetAllDashboard {
  Department: string;
  Count: number;
}

const mockData: IDepartmentGetAllDashboard[] = [
  { Department: "Hoàn thành", Count: 9 },
  { Department: "Chưa hoàn thành", Count: 91 },
];

const DepartmentChart = () => {
  const { t } = useTranslation("common");
  const { theme } = useTheme();

  const chartData = mockData.map((department) => ({
    value: department.Count,
    name: department.Department,
  }));

  const option = {
    tooltip: {
      trigger: "item",
      backgroundColor:
        theme === "light"
          ? "rgba(250, 250, 250, 0.98)"
          : "rgba(20, 26, 25, 0.98)",
      textStyle: {
        color: theme === "light" ? "#000000" : "#ffffff",
      },
    },
    legend: {
      orient: "horizontal",
      left: "left",
      top: "bottom",
      itemGap: 14,
      textStyle: {
        color: theme === "light" ? "black" : "#fff",
        fontFamily: "Arial, sans-serif",
      },
      selectedMode: false,
    },
    series: [
      {
        name: t("COMMON.HOCTAP"),
        type: "pie",
        radius: "70%",
        center: ["50%", "40%"],
        data: chartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
      },
    ],
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        padding: "24px",
        backgroundColor: "var(--background-item)",
        borderRadius: "15px",
        height: "100%",
      }}
    >
      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: "bold",
          color: "var(--text-color)",
        }}
      >
        {t("COMMON.TILEHOANTHANHKHOAHOC")}
      </Typography>
      <ReactECharts
        option={option}
        style={{ height: "400px", width: "100%" }}
      />
    </Paper>
  );
};

export default DepartmentChart;
