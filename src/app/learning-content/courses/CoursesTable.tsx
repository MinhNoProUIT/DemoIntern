"use client";

import React, { useState } from "react";
import {
  IconButton,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import {
  VisibilityOutlined,
  EditOutlined,
  DeleteOutline,
} from "@mui/icons-material";
import { ICourse } from "@/interfaces/course.interface";
import { useTranslation } from "react-i18next";
import { IGetAllCourses } from "@/models/Course";

export const getLevelBgColor = (level: string) => {
  switch (level) {
    case "A1 - A2":
      return "var(--bg-success-color1)";
    case "B1 - B2":
      return "var(--bg-closed-color1)";
    case "C1 - C2":
      return "var(--bg-warning-color1)";
  }
};
export const getLevelTextColor = (level: string) => {
  switch (level) {
    case "A1 - A2":
      return "var(--text-success-color1)";
    case "B1 - B2":
      return "var(--text-closed-color1)";
    case "C1 - C2":
      return "var(--text-warning-color1)";
  }
};

export default function CoursesTable({
  coursesData,
  searchKey,
  handleEdit,
  handleDelete,
}: {
  coursesData: IGetAllCourses[];
  searchKey: string;
  handleEdit: (course: any) => void;
  handleDelete: (id: any) => void;
}) {
  const { t } = useTranslation("common");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("id");

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedCourses = [...coursesData].sort((a, b) => {
    if (typeof a[orderBy] === "number") {
      return order === "asc"
        ? a[orderBy] - b[orderBy]
        : b[orderBy] - a[orderBy];
    }
    return order === "asc"
      ? a[orderBy].localeCompare(b[orderBy])
      : b[orderBy].localeCompare(a[orderBy]);
  });

  return (
    <TableContainer
      sx={{
        "&::-webkit-scrollbar": {
          width: "7px",
          height: "7px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "var(--scrollbar-color)",
          borderRadius: "10px",
        },
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#9affb3",
              "& th": {
                backgroundColor: "#9affb3", // Áp dụng cho các ô
              },
              "&:last-child td, &:last-child th": {
                border: "none",
              },
            }}
          >
            <TableCell
              align="center"
              onClick={() => handleRequestSort("title")}
            >
              <TableSortLabel
                active={orderBy === "title"}
                direction={orderBy === "title" ? order : "asc"}
                sx={{
                  display: "inline-flex",
                  justifyContent: "center",
                  "& .MuiTableSortLabel-icon": {
                    margin: 0,
                    position: "absolute",
                    right: "-25px",
                  },
                }}
              >
                <b>{t("COMMON.COURSES.TABLE.title")}</b>
              </TableSortLabel>
            </TableCell>
            <TableCell
              align="center"
              onClick={() => handleRequestSort("topic")}
            >
              <TableSortLabel
                active={orderBy === "topic"}
                direction={orderBy === "topic" ? order : "asc"}
                sx={{
                  display: "inline-flex",
                  justifyContent: "center",
                  "& .MuiTableSortLabel-icon": {
                    margin: 0,
                    position: "absolute",
                    right: "-25px",
                  },
                }}
              >
                <b>{t("COMMON.COURSES.TABLE.topic")}</b>
              </TableSortLabel>
            </TableCell>
            <TableCell
              align="center"
              onClick={() => handleRequestSort("level")}
            >
              <TableSortLabel
                active={orderBy === "level"}
                direction={orderBy === "level" ? order : "asc"}
                sx={{
                  display: "inline-flex",
                  "& .MuiTableSortLabel-icon": {
                    margin: 0,
                    position: "absolute",
                    right: "-20px",
                  },
                }}
              >
                <b>{t("COMMON.COURSES.TABLE.level")}</b>
              </TableSortLabel>
            </TableCell>

            <TableCell
              align="center"
              onClick={() => handleRequestSort("price")}
            >
              <TableSortLabel
                active={orderBy === "price"}
                direction={orderBy === "price" ? order : "asc"}
                sx={{
                  display: "inline-flex",
                  justifyContent: "center",
                  "& .MuiTableSortLabel-icon": {
                    margin: 0,
                    position: "absolute",
                    right: "-20px",
                  },
                }}
              >
                <b>Price</b>
              </TableSortLabel>
            </TableCell>
            <TableCell
              align="center"
              onClick={() => handleRequestSort("description")}
            >
              <TableSortLabel
                active={orderBy === "description"}
                direction={orderBy === "description" ? order : "asc"}
                sx={{
                  display: "inline-flex",
                  "& .MuiTableSortLabel-icon": {
                    margin: 0,
                    position: "absolute",
                    right: "-25px",
                  },
                }}
              >
                <b>{t("COMMON.COURSES.TABLE.description")}</b>
              </TableSortLabel>
            </TableCell>
            <TableCell
              align="center"
              onClick={() => handleRequestSort("image")}
            >
              <TableSortLabel
                active={orderBy === "image"}
                direction={orderBy === "image" ? order : "asc"}
                sx={{
                  display: "inline-flex",
                  justifyContent: "center",
                  "& .MuiTableSortLabel-icon": {
                    margin: 0,
                    position: "absolute",
                    right: "-25px",
                  },
                }}
              >
                <b>{t("COMMON.COURSES.TABLE.image")}</b>
              </TableSortLabel>
            </TableCell>
            <TableCell align="center">
              <b>{t("COMMON.TABLE.COMMON.ACTION")}</b>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {sortedCourses.map((course) => (
            <TableRow key={course.id} hover>
              {/* ID */}

              {/* Title */}
              <TableCell
                align="center"
                sx={{
                  color: "var(--text-color)",
                  maxWidth: { xs: 100, md: 150, lg: 200 },
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                title={course.title}
              >
                {course.title}
              </TableCell>

              {/* Topic */}
              <TableCell
                align="center"
                sx={{
                  color: "var(--text-color)",
                  maxWidth: { xs: 100, md: 150 },
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                title={course.topics?.name}
              >
                {course.topics?.name}
              </TableCell>

              {/* Level */}
              <TableCell
                align="center"
                sx={{
                  width: "10%",
                }}
              >
                <Box
                  sx={{
                    display: "inline-flex",
                    paddingX: 1.5,
                    paddingY: 0.5,
                    borderRadius: 2,
                    backgroundColor: getLevelBgColor(course.level),
                    color: getLevelTextColor(course.level),
                    fontWeight: "bold",
                  }}
                >
                  {course.level}
                </Box>
              </TableCell>

              <TableCell
                align="center"
                sx={{
                  color: "var(--text-color)",
                  width: "5%",
                  fontWeight: "bold",
                }}
              >
                {course.price}
              </TableCell>

              {/* Description */}
              <TableCell
                align="center"
                sx={{
                  color: "var(--text-color)",
                  maxWidth: { xs: 100, md: 150, lg: 200 },
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                title={course.description}
              >
                {course.description}
              </TableCell>

              {/* Image */}
              <TableCell
                align="center"
                sx={{
                  color: "var(--text-color)",
                  maxWidth: { xs: 100, md: 150, lg: 200 },
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                title={course.image_url}
              >
                <img
                  src={course.image_url}
                  alt="Course Thumbnail"
                  style={{
                    width: "100%",
                    maxHeight: 100,
                    objectFit: "cover",
                    borderRadius: 4,
                  }}
                />
              </TableCell>

              {/* Actions */}
              <TableCell
                align="center"
                sx={{
                  width: "10%",
                  padding: 0,
                }}
              >
                <IconButton
                  size="small"
                  sx={{ color: "#00d4ff" }}
                  onClick={() => handleEdit(course)}
                >
                  <EditOutlined fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{ color: "#ff0000" }}
                  onClick={() => handleDelete(course.id)}
                >
                  <DeleteOutline fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {coursesData.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} align="center">
                Không tìm thấy "{searchKey}".
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
