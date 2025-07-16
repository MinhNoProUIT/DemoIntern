import { Box, Typography, Paper } from "@mui/material";
import React from "react";
import {
  TrendingDown,
  TrendingUp,
  BookOpen,
  DollarSign,
  Percent,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const ManageCourse = () => {
  const { t } = useTranslation("common");

  const totalCourses = 150;
  const percentCourses = 25;

  const paidCourses = 10;
  const percentPaidCourses = -11.11;

  const conversionRate = 10;
  const percentConversion = 7.2;

  const renderCard = (
    title: string,
    value: number | string,
    percent: number,
    bgColor: string,
    Icon: React.ElementType,
    iconBgColor: string
  ) => (
    <Paper
      elevation={0}
      sx={{
        flex: 1,
        backgroundImage: `linear-gradient(135deg, ${bgColor}, ${bgColor})`,
        borderRadius: "15px",
        padding: "20px 22px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            color="text.secondary"
          >
            {title}
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            {value}
          </Typography>
        </Box>

        {/* Icon hình tròn với nền đậm hơn */}
        <Box
          sx={{
            backgroundColor: iconBgColor,
            borderRadius: "50%",
            width: 50,
            height: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={28} color="#fff" />
        </Box>
      </Box>

      <Box
        sx={{
          mt: "10px",
          color: percent >= 0 ? "#00B69B" : "#F93C65",
          fontSize: "16px",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
        }}
      >
        {percent >= 0 ? (
          <TrendingUp style={{ marginRight: "6px" }} />
        ) : (
          <TrendingDown style={{ marginRight: "6px" }} />
        )}
        {percent}%
        <Typography
          sx={{
            ml: "6px",
            color: "#9e3c00",
            fontSize: "16px",
          }}
        >
          {t("COMMON.DASHBOARD.FROM_LAST_QUARTER")}
        </Typography>
      </Box>
    </Paper>
  );

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexDirection: { xs: "column", md: "row" },
        width: "100%",
      }}
    >
      {renderCard(
        t("COMMON.COURSE.TOTAL_COURSE"),
        totalCourses,
        percentCourses,
        "#cde4f9",
        BookOpen,
        "#90bdec"
      )}
      {renderCard(
        t("COMMON.COURSE.PAID_COURSE"),
        paidCourses,
        percentPaidCourses,
        "#fde2e2",
        DollarSign,
        "#f6a5a5"
      )}
      {renderCard(
        t("COMMON.COURSE.CONVERSION_RATE"),
        `${conversionRate}%`,
        percentConversion,
        "#e2f0cb",
        Percent,
        "#b9d8a6"
      )}
    </Box>
  );
};

export default ManageCourse;
