"use client";

import { Box, Typography } from "@mui/material";

import ManageCourse from "./ManageCourse";
import RevenueChart from "./RevenueChart";
import TableTracsaction from "./TableTracsaction";
import { useTranslation } from "react-i18next";

export default function CourseManagementPage() {
    const { t } = useTranslation("common");
    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" mb={2}>
                {t("COMMON.COURSE.TITLE_PAGE")}
            </Typography>

            <Box display="flex" flexDirection="column" gap={2}>
                <ManageCourse />
                <RevenueChart />
                <Box display="flex">
                    <TableTracsaction />
                </Box>
            </Box>
        </Box>
    );
}
