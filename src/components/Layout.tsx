"use client";

import React from "react";
import Sidebar, { SidebarItem, TypographyItem } from "@/components/Sidebar";
import { Box } from "@mui/material";
import { Home, ShoppingCart } from "lucide-react";
import { ChartNoAxesCombined, NotepadText } from "lucide-react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import { useTranslation } from "react-i18next";
import { authSelector } from "@/redux/slices/authSlice";
import { useSelector } from "react-redux";
import { MenuBookOutlined } from "@mui/icons-material";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  const { t } = useTranslation("common");

  const menuLeft = useSelector(authSelector);

  console.log(Object.keys(menuLeft));
  console.log(menuLeft["/statistics/post"]);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar>
        {(menuLeft["Home"].IsAllowView ||
          menuLeft["Statistics"].IsAllowView) && (
          <TypographyItem text={t("COMMON.SIDEBAR.DASHBOARD")} />
        )}
        {menuLeft["Home"].IsAllowView && (
          <SidebarItem
            icon={<Home />}
            text={t("COMMON.SIDEBAR.HOME")}
            route="/dashboard"
            active={pathname === "/dashboard"}
          />
        )}

        {menuLeft["Home"].IsAllowView && (
          <SidebarItem
            icon={<ShoppingCart />}
            text={t("COMMON.SANPHAM")}
            route="/product"
            active={pathname === "/product"}
          />
        )}

        {menuLeft["Statistics"].IsAllowView && (
          <SidebarItem
            icon={<ChartNoAxesCombined />}
            text={t("COMMON.SIDEBAR.STATISTICS")}

            // route='/statistics'
            // active={pathname === '/statistics'}
          >
            {/* {menuLeft["/statistics/post"]?.IsAllowView && (
              <SidebarItem
                icon={<NotepadText />}
                text={t("COMMON.SIDEBAR.POST")}
                route="/statistics/post"
                active={pathname === "/statistics/post"}
              />
            )} */}
            {menuLeft["/statistics/course"]?.IsAllowView && (
              <SidebarItem
                icon={<MenuBookOutlined />}
                text={t("COMMON.SIDEBAR.COURSE")}
                route="/statistics/course"
                active={pathname === "/statistics/course"}
              />
            )}
            {menuLeft["/statistics/course"]?.IsAllowView && (
              <SidebarItem
                icon={<MenuBookOutlined />}
                text={t("COMMON.HOCTAP")}
                route="/statistics/learning"
                active={pathname === "/statistics/learning"}
              />
            )}
          </SidebarItem>
        )}
      </Sidebar>
      <Box
        component="main"
        sx={{
          flex: 1,
          height: "100%",
          overflowY: "auto",
          position: "relative",
          backgroundColor: "var(--background-color)",
        }}
      >
        <Header />
        <Box
          sx={{
            flex: 1,
            height: "100%",
            paddingTop: "55px",
            position: "relative",
            scrollbarGutter: "stable both-edges",
            "&::-webkit-scrollbar": {
              width: "7px",
              height: "7px",
              backgroundColor: "var(--background-after-color)",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "var(--scrollbar-color)",
              borderRadius: "10px",
            },
            backgroundColor: "var(--background-after-color)",
            overflowY: "auto",
          }}
        >
          <Box
            sx={{
              padding: "24px 17px",
              minHeight: "100%",
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Layout;
