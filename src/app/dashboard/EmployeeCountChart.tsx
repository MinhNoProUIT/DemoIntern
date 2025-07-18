import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import ReactECharts from "echarts-for-react";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import { SelectChangeEvent } from "@mui/material";

const EmployeeCountChart = () => {
  const { t } = useTranslation("common");
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    setSelectedYear(event.target.value as number);
  };

  const percent = -23;

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
        t("COMMON.DASHBOARD.YEAR") + " " + (selectedYear - 1).toString(),
        t("COMMON.DASHBOARD.YEAR") + " " + selectedYear.toString(),
      ],
      textStyle: {
        color: theme === "light" ? "#000000" : "#ffffff",
        fontFamily: "Arial, sans-serif",
      },
      formatter: (name: string) => {
        const year = name.split(" ")[1];
        const total = year === selectedYear.toString() ? "1.23k" : "6.79k";
        return `${name} (${t("COMMON.DASHBOARD.SUM")}: ${total})`;
      },
      itemGap: 30,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: true,
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
        name: t("COMMON.DASHBOARD.YEAR") + " " + (selectedYear - 1).toString(),
        type: "bar",
        data: [10, 12, 15, 20, 18, 21, 23, 37, 20, 29, 28, 28],
        barWidth: "27%",
        itemStyle: {
          color: "#d24c2f",
          borderRadius: [6, 6, 0, 0],
        },
      },
      {
        name: t("COMMON.DASHBOARD.YEAR") + " " + selectedYear.toString(),
        type: "bar",
        data: [28, 28, 26, 25, 20, 22, 0, 0, 0, 0, 0, 0],
        barWidth: "27%",
        itemStyle: {
          color: "#00a76f",
          borderRadius: [6, 6, 0, 0],
        },
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
            {t("COMMON.DASHBOARD.SUM_EMPLOYEE_BY_MONTH")}
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
            MenuProps={{
              PaperProps: {
                elevation: 0,
                sx: {
                  width: "120px",
                  mt: "2px",
                  borderRadius: "8px",
                  padding: "0 8px",
                  backgroundImage:
                    "url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSJ1cmwoI3BhaW50MF9yYWRpYWxfMjc0OV8xNDUxODYpIiBmaWxsLW9wYWNpdHk9IjAuMTIiLz4KPGRlZnM+CjxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQwX3JhZGlhbF8yNzQ5XzE0NTE4NiIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgxMjAgMS44MTgxMmUtMDUpIHJvdGF0ZSgtNDUpIHNjYWxlKDEyMy4yNSkiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMDBCOEQ5Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwQjhEOSIgc3RvcC1vcGFjaXR5PSIwIi8+CjwvcmFkaWFsR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==), url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSJ1cmwoI3BhaW50MF9yYWRpYWxfMjc0OV8xNDUxODcpIiBmaWxsLW9wYWNpdHk9IjAuMTIiLz4KPGRlZnM+CjxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQwX3JhZGlhbF8yNzQ5XzE0NTE4NyIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgwIDEyMCkgcm90YXRlKDEzNSkgc2NhbGUoMTIzLjI1KSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGRjU2MzAiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkY1NjMwIiBzdG9wLW9wYWNpdHk9IjAiLz4KPC9yYWRpYWxHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K)",
                  backgroundPosition: "top right, bottom left",
                  backgroundSize: "50%, 50%",
                  backgroundRepeat: "no-repeat",
                  backdropFilter: "blur(20px)",
                  backgroundColor: "var(--background-item)",
                  color: "var(--text-color)",
                  border: "1px solid var(--border-color)",
                  "& .MuiMenuItem-root": {
                    "&:hover": { backgroundColor: "var(--hover-color)" },
                    "&.Mui-selected": {
                      backgroundColor: "var(--background-selected-item)",
                      "&:hover": { backgroundColor: "var(--hover-color)" },
                    },
                  },
                },
              },
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "right",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "right",
              },
            }}
          >
            {[...Array(currentYear - 2022)].map((_, index) => {
              const year = currentYear - index;
              return (
                <MenuItem
                  key={year}
                  value={year}
                  sx={{
                    borderRadius: "6px",
                    "&:last-child": {
                      mt: "3px",
                    },
                  }}
                >
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
};

export default EmployeeCountChart;
