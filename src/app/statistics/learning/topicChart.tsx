"use client";
import React from "react";
import ReactECharts from "echarts-for-react";
import { Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
export default function TopicChart() {
  const { t } = useTranslation();
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: [
          "Natural",
          "Environment",
          "Transportation",
          "Class",
          "Subject",
          "Nation",
          "Friend",
        ],
        axisTick: {
          alignWithLabel: true,
        },
        axisLabel: {
          fontSize: 14,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "Direct",
        type: "bar",
        barWidth: "60%",
        data: [10, 12, 11, 5, 6, 15, 22],
      },
    ],
  };
  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        padding: "20px",
        backgroundColor: "var(--background-item)",
        borderRadius: "15px",
      }}
    >
      <Typography
        fontSize={"20px"}
        fontWeight={"bold"}
        color="var(--text-color)"
      >
        {t("COMMON.LEARNING.THE_MOST_TOPIC")}
      </Typography>
      <ReactECharts
        option={option}
        style={{
          width: "100%",
          height: "410px",
        }}
      ></ReactECharts>
    </Paper>
  );
}
