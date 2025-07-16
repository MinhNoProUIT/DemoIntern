"use client";

import { Box } from "@mui/material";
import DisplayInfo from "./DisplayInfo";
import TableAttendance from "./TableAttendance";
import WelfareApplication from "./welfareapplication";
import NthTopUser from "./NthTopUser";

const Example = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <DisplayInfo />
      <TableAttendance />
      <Box sx={{ width: "calc(100% / 3 - 16px)" }}>
        <WelfareApplication />
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "calc(100% / 3 * 2 - 8px) calc(100% / 3 - 16px)",
          gap: "24px",
        }}
      >
        <Box width="100%">
          <DisplayInfo />
          <DisplayInfo />
        </Box>
        <NthTopUser />
      </Box>
    </Box>
  );
};

export default Example;
