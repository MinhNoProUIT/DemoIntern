"use client";

import { Badge, Box } from "@mui/material";

import FavoriteIcon from "@mui/icons-material/FavoriteBorder";
import { useRouter } from "next/navigation";

import { useState, useRef } from "react";

interface Props {
  isUser?: boolean;
}

const NotificationMenu = ({ isUser }: Props) => {
  const router = useRouter();

  const anchorRef = useRef<HTMLDivElement | null>(null);
  const unreadCount: number = 3; // 🎯 Giá trị tạm, bạn có thể để 0, 5, 10...

  const handleClick = () => {
    router.push("/product/favourite");
  };

  return (
    <Box>
      <Badge
        badgeContent={unreadCount}
        variant="dot"
        color="error"
        invisible={unreadCount === 0}
        sx={{
          userSelect: "none",
          "& .MuiBadge-badge": {
            right: 9,
            top: 9,
            backgroundColor: "red",
            fontSize: "10px",
          },
        }}
      >
        <Box
          ref={anchorRef}
          onClick={handleClick}
          sx={{
            cursor: "pointer",
            padding: "6px",
            borderRadius: "50%",
            color: isUser ? "#fff" : "var(--text-color)",
            "&:hover": {
              backgroundColor: isUser ? "#5ce2c2" : "var(--hover-color)",
            },
          }}
        >
          <FavoriteIcon sx={{ fontSize: 28 }} />
        </Box>
      </Badge>
    </Box>
  );
};

export default NotificationMenu;
