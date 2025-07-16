"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { SearchIcon, PlusCircle } from "lucide-react";
import CoursesTable from "./CoursesTable";
import { ICourse } from "@/interfaces/course.interface";
import { useTranslation } from "react-i18next";
import CourseCreateForm from "./CourseCreateForm";
import ConfirmDeleteDialog from "@/components/ConfirmDeleteDialog";
import { useGetAllCourseQuery } from "@/services/CourseService";
import { IGetAllCourses } from "@/models/Course";

const initialCourses: ICourse[] = [
  {
    id: 1,
    title: "Everyday Conversations",
    topic: "People-lifestyle",
    level: "A1 - A2",
    description:
      "Learn how to talk about daily routines, hobbies, and making friends.",
    image: "https://picsum.photos/id/1011/400/300",
  },
  {
    id: 2,
    title: "Workplace English",
    topic: "Business",
    level: "B1 - B2",
    description:
      "Build vocabulary and expressions for professional office environments.",
    image: "https://picsum.photos/id/1027/400/300",
  },
  {
    id: 3,
    title: "Academic Writing",
    topic: "Education",
    level: "C1 - C2",
    description:
      "Improve your writing skills for academic settings like essays and reports.",
    image: "https://picsum.photos/id/1005/400/300",
  },
  {
    id: 4,
    title: "Understanding the Economy",
    topic: "Economy",
    level: "B1 - B2",
    description: "Learn key economic terms and how the global economy works.",
    image: "https://picsum.photos/id/1043/400/300",
  },
  {
    id: 5,
    title: "Socializing and Travel",
    topic: "People-lifestyle",
    level: "A1 - A2",
    description:
      "Master common phrases used in travel, dining, and social events.",
    image: "https://picsum.photos/id/1052/400/300",
  },
  {
    id: 6,
    title: "Business Presentations",
    topic: "Business",
    level: "C1 - C2",
    description: "Practice giving effective presentations in English at work.",
    image: "https://picsum.photos/id/1020/400/300",
  },
  {
    id: 7,
    title: "Study Abroad Essentials",
    topic: "Education",
    level: "B1 - B2",
    description:
      "Prepare for academic life overseas with useful vocabulary and culture tips.",
    image: "https://picsum.photos/id/1062/400/300",
  },
  {
    id: 8,
    title: "Finance and Banking English",
    topic: "Economy",
    level: "C1 - C2",
    description:
      "Understand common terms in finance, banking, and money management.",
    image: "https://picsum.photos/id/1033/400/300",
  },
];

export default function CoursesPage() {
  const { t } = useTranslation("common");
  const [courses, setCourses] = useState(initialCourses);
  const [searchKey, setSearchKey] = useState("");
  const [searchBy, setSearchBy] = useState("title");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const {
    data: courseResponse,
    isLoading: isCourseLoading,
    refetch,
  } = useGetAllCourseQuery();

  const courseData = courseResponse as IGetAllCourses[];
  if (isCourseLoading) return;
  console.log("courseData", courseData);
  const filteredCourses = courseData.filter((course) =>
    course[searchBy].toLowerCase().includes(searchKey.toLowerCase())
  );

  const handleAdd = () => {
    setEditData(null);
    setIsFormOpen(true);
  };

  const handleEdit = (course: any) => {
    setEditData(course);
    setIsFormOpen(true);
  };

  const handleDelete = (id: any) => {
    setDeleteId(id);
    setIsDeleteConfirmOpen(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Typography
        sx={{
          userSelect: "none",
          color: "var(--text-color)",
          fontWeight: "bold",
          fontSize: "28px",
          marginBottom: "15px",
          marginX: "10px",
        }}
      >
        {t("COMMON.COURSES.TITLE")}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
          marginX: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            width: "55%",
          }}
        >
          <TextField
            id="location-search"
            type="search"
            placeholder={
              t("COMMON.TOPIC.SEARCH_BY") +
              t("COMMON.COURSES.TABLE." + searchBy)
            }
            variant="outlined"
            required
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            sx={{
              flex: 2,
              "& fieldset": {
                borderRadius: "10px",
                borderColor: "var(--border-color)",
              },
              "& .MuiInputBase-root": {
                paddingLeft: "0px",
                paddingRight: "12px",
              },
              "& .MuiInputBase-input": {
                padding: "10px 0px",
                color: "var(--text-color)",
                fontSize: "16px",
                "&::placeholder": {
                  color: "var(--placeholder-color)",
                  opacity: 1,
                },
              },
              "& .MuiOutlinedInput-root:hover fieldset": {
                borderColor: "var(--hover-field-color)",
              },
              "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                borderColor: "var(--selected-field-color)",
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        color: "#a5bed4",
                        padding: "12px",
                        zIndex: 100,
                      }}
                    >
                      <SearchIcon />
                    </Box>
                  </InputAdornment>
                ),
              },
            }}
          />

          <FormControl
            sx={{
              flex: 1,
              "& fieldset": {
                borderRadius: "10px",
                borderColor: "var(--border-color)",
              },
              "& .MuiInputBase-input": {
                paddingY: "10px",
                paddingLeft: "14px",
                color: "var(--text-color)",
              },
              "& .MuiOutlinedInput-root:hover fieldset": {
                borderColor: "var(--hover-field-color)",
              },
              "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                borderColor: "var(--selected-field-color)",
              },
            }}
          >
            <Select
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value)}
              sx={{
                "& .MuiSelect-icon": {
                  color: "var(--text-color)",
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    boxSizing: "border-box",
                    padding: "0 8px",
                    border: "1px solid var(--border-color)",
                    backgroundColor: "var(--background-item)",
                    color: "var(--text-color)",
                    "& .MuiMenuItem-root": {
                      borderRadius: "6px",
                      "&:hover": {
                        backgroundColor: "var(--hover-color)",
                      },
                      "&.Mui-selected": {
                        backgroundColor: "var(--selected-color)",
                      },
                    },
                  },
                },
              }}
            >
              <MenuItem value="title">
                {t("COMMON.COURSES.TABLE.title")}
              </MenuItem>
              <MenuItem value="topic">
                {t("COMMON.COURSES.TABLE.topic")}
              </MenuItem>
              <MenuItem value="level">
                {t("COMMON.COURSES.TABLE.level")}
              </MenuItem>
              <MenuItem value="description">
                {t("COMMON.COURSES.TABLE.description")}
              </MenuItem>
              <MenuItem value="image">
                {t("COMMON.COURSES.TABLE.image")}
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Button
          variant="contained"
          startIcon={<PlusCircle />}
          onClick={handleAdd}
          sx={{
            height: "100%",
            paddingX: "30px",
            fontSize: "14px",
            fontWeight: "bold",
            borderRadius: "8px",
            backgroundColor: "#03d794",
            textTransform: "none",
          }}
        >
          {t("COMMON.BUTTON.CREATE")}
        </Button>
      </Box>

      {/* Table */}
      <CoursesTable
        coursesData={filteredCourses}
        searchKey={searchKey}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      {/* Form + ConfirmDelete */}
      <CourseCreateForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={(data) => {
          if (editData) {
            // update logic
          } else {
            // add logic
          }
          setIsFormOpen(false);
        }}
        initialData={editData}
      />

      <ConfirmDeleteDialog
        open={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={() => {
          // delete logic using deleteId
          setIsDeleteConfirmOpen(false);
        }}
      />
    </Box>
  );
}
