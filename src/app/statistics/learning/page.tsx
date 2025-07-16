import { Box } from "@mui/material";
import React from "react";
import Leaderboard from "./learningRank";
import LearningInfo from "./learningInfo";
import LearningTable from "./LearningTable";

export default function page() {
  return (
    <Box sx={{ overflow: "hidden", overflowY: "hidden" }}>
      <Box
        sx={{
          display: "flex", // Container ngang: Cột trái + Leaderboard
          alignItems: "stretch", // Giúp 2 cột bằng chiều cao
          gap: "24px", // Khoảng cách ngang giữa 2 cột
        }}
      >
        {/* Box Cột bên trái: Container dọc cho LearningInfo và TopicChart */}
        <Box
          sx={{
            width: "calc(100% / 3 * 2)", // Chiếm 2/3 chiều rộng cha
            display: "flex", // Bật flexbox
            flexDirection: "column", // Xếp các con theo chiều dọc
          }}
        >
          <Box>
            <LearningInfo />
          </Box>
        </Box>

        {/* Leaderboard Component: (Con trực tiếp của Box ngoài cùng ngang) */}
        <Leaderboard />
      </Box>
      <Box sx={{ mt: "24px" }}>
        <LearningTable />
      </Box>
    </Box>
  );
}
