import {
  MenuItem,
  FormControl,
  Select,
  Box,
  Paper,
  Typography,
  SelectChangeEvent,
} from "@mui/material";
import ReactECharts from "echarts-for-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ChartSalary() {
  const { t } = useTranslation("common");
  const { theme } = useTheme();
  const currentYear = 2025;
  const [selectedYear, setSelectedYear] = useState(2025);

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    setSelectedYear(event.target.value as number);
  };

  // 🟢 Dữ liệu mẫu thay cho API
  const response = {
    yearList: [12, 14, 13, 16, 15, 15, 0, 0, 0, 0, 0, 0],
    bYearList: [10, 11, 10, 13, 14, 16, 14, 16, 15, 16, 17, 18],
  };

  const percent = 13.5;

  const option = {
    animation: true,
    animationDuration: 700,
    tooltip: {
      trigger: "axis",
      backgroundColor:
        theme === "light"
          ? "rgba(250, 250, 250, 0.98)"
          : "rgba(20, 26, 25, 0.98)",
      borderColor:
        theme === "light"
          ? "rgba(250, 250, 250, 0.98)"
          : "rgba(20, 26, 25, 0.98)",
      textStyle: {
        color: theme === "light" ? "#000000" : "#ffffff",
      },
    },
    legend: {
      data: [
        `${t("COMMON.DASHBOARD.YEAR")} ${selectedYear - 1}`,
        `${t("COMMON.DASHBOARD.YEAR")} ${selectedYear}`,
      ],
      textStyle: {
        color: theme === "light" ? "#000000" : "#ffffff",
        fontFamily: "Arial, sans-serif",
      },
      itemGap: 30,
      formatter: (name: string) => {
        const year = name.split(" ")[1];
        const total = year === selectedYear.toString() ? "14.4b" : "12.2b";
        return `${name} (${t("COMMON.DASHBOARD.SUM")}: ${total})`;
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: theme === "dark" ? "#919EAB" : "#637381",
        },
      },
      splitLine: {
        lineStyle: {
          type: "dashed",
          color: theme === "light" ? "#e9ecee" : "#333d47",
        },
      },
      data: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yAxis: {
      type: "value",
      axisLine: {
        lineStyle: {
          color: theme === "dark" ? "#919EAB" : "#637381",
        },
      },
      splitLine: {
        lineStyle: {
          type: "dashed",
          color: theme === "light" ? "#e9ecee" : "#333d47",
        },
      },
    },
    series: [
      {
        name: `${t("COMMON.DASHBOARD.YEAR")} ${selectedYear}`,
        type: "line",
        data: response.yearList,
        smooth: true,
        symbol: "circle",
        symbolSize: 8,
        showSymbol: false,
        areaStyle: {
          opacity: 0.2,
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(102,187,106,0.6)" },
              { offset: 1, color: "rgba(102,187,106,0.1)" },
            ],
          },
        },
        lineStyle: { color: "#00a76f", width: 2 },
        itemStyle: { color: "#00a76f" },
      },
      {
        name: `${t("COMMON.DASHBOARD.YEAR")} ${selectedYear - 1}`,
        type: "line",
        data: response.bYearList,
        smooth: true,
        symbol: "circle",
        symbolSize: 8,
        showSymbol: false,
        areaStyle: {
          opacity: 0.2,
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(255,167,38,0.6)" },
              { offset: 1, color: "rgba(255,167,38,0.1)" },
            ],
          },
        },
        lineStyle: { color: "#ffab00", width: 2 },
        itemStyle: { color: "#ffab00" },
      },
    ],
  };

  return (
    <Paper
      elevation={0}
      sx={{
        height: "100%",
        width: "100%",
        padding: "24px 5px 15px",
        borderRadius: "15px",
        backgroundColor: "var(--background-item)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          padding: "0 20px",
          mb: "24px",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "var(--text-color)",
            }}
          >
            {t("COMMON.BIEUDOTHONGKESOTIENTHUVAO")}
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              mt: "4px",
              color: theme === "dark" ? "#919EAB" : "#637381",
            }}
          >
            {"(" +
              (percent > 0 ? "+" : "") +
              percent +
              "%) " +
              t("COMMON.DASHBOARD.THAN_LAST_YEAR", { year: selectedYear - 1 })}
          </Typography>
        </Box>
        <FormControl sx={{ width: "90px" }}>
          <Select
            defaultValue={currentYear}
            onChange={handleYearChange}
            sx={{
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--border-color)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "1px solid var(--border-color)",
              },
              "& fieldset": {
                borderRadius: "8px",
                borderColor: "var(--border-color)",
              },
              "& .MuiSelect-icon": {
                color: "var(--text-color)",
              },
              "& .MuiInputBase-input": {
                color: "var(--text-color)",
                padding: "10px",
              },
            }}
          >
            {[...Array(currentYear - 2022 + 1)].map((_, index) => {
              const year = currentYear - index;
              return (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <ReactECharts option={option} style={{ height: 360 }} />
    </Paper>
  );
}
