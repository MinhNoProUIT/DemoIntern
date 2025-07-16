"use client";
import { Box, Paper, Typography } from "@mui/material";
import { Flame } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import TopicChart from "./topicChart";

export default function LearningInfo() {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "32px",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            backgroundImage: "url(/images/Subtract_red.svg)",
            backgroundColor: "var(--background-color-after)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "38px",
            width: "calc(100% / 2)",
            height: "100%",
            padding: "24px",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            boxShadow: "var(--box-shadow-paper)",
          }}
        >
          <Box width={"100%"}>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "var(--reward-title-color)",
              }}
            >
              {t("COMMON.CHUOIHOCDAINHAT")}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  color: "#09090b",
                  fontSize: "36px",
                  margin: "10px 5px",
                  fontWeight: "bold",
                }}
              >
                Trần Văn Khang
              </Typography>
            </Box>
            <Box
              sx={{
                mt: "5px",
                color: "#09090b", //!(!rewardPercent || rewardPercent >= 0) ? '#F93C65' : '#00B69B',
                fontSize: "15px",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Flame color="green" size={30}></Flame>
              <Typography
                sx={{
                  ml: "6px",
                  color: "#09090b",
                  fontSize: "24px",
                }}
              >
                30
              </Typography>
              <Typography
                sx={{
                  ml: "6px",
                  color: "#09090b",
                  fontSize: "24px",
                }}
              >
                {t("COMMON.NGAY")}
              </Typography>
            </Box>
          </Box>
        </Paper>
        <Paper
          elevation={0}
          sx={{
            backgroundImage: "url(/images/Subtract_orange.svg)",
            backgroundColor: "var(--background-color-after)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "38px",
            width: "calc(100% / 2)",
            height: "100%",
            padding: "24px",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            boxShadow: "var(--box-shadow-paper)",
          }}
        >
          <Box width={"100%"}>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "var(--reward-title-color)",
              }}
            >
              {t("COMMON.CHUOIHOCNGANNHAT")}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  color: "#09090b",
                  fontSize: "36px",
                  margin: "10px 5px",
                  fontWeight: "bold",
                }}
              >
                Đỗ Văn Phong
              </Typography>
            </Box>
            <Box
              sx={{
                mt: "5px",
                color: "#09090b", //!(!rewardPercent || rewardPercent >= 0) ? '#F93C65' : '#00B69B',
                fontSize: "15px",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Flame color="green" size={30}></Flame>
              <Typography
                sx={{
                  ml: "6px",
                  color: "#09090b",
                  fontSize: "24px",
                }}
              >
                2
              </Typography>
              <Typography
                sx={{
                  ml: "6px",
                  color: "#09090b",
                  fontSize: "24px",
                }}
              >
                {t("COMMON.NGAY")}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
      <Box sx={{ display: "flex", width: "100%" }}>
        <TopicChart />
      </Box>
    </Box>
  );
}
