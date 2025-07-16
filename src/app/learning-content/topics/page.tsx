"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import { SearchIcon, PlusCircle } from "lucide-react";
import TopicsTable from "./TopicsTable";
import { ITopic } from "@/interfaces/topic.interface";
import { useTranslation } from "react-i18next";
import TopicCreateForm from "./TopicCreateForm";
import ConfirmDeleteDialog from "@/components/ConfirmDeleteDialog";

// Fake data
const initialTopics: ITopic[] = [
  {
    id: 1,
    name: "Peope-lifestyle",
    note: "Các hoạt động trong cuộc sống thường ngày",
    numberOfCourses: 5,
  },
  {
    id: 2,
    name: "Business",
    note: "Các hoạt động và kiến thức liên quan đến kinh doanh",
    numberOfCourses: 2,
  },
  {
    id: 3,
    name: "Education",
    note: "Giao tiếp trong môi trường học đường và các hoạt động học thuật",
    numberOfCourses: 3,
  },
  {
    id: 4,
    name: "Economy",
    note: "Các vấn đề kinh tế và các yếu tố tác động đến nền kinh tế",
    numberOfCourses: 0,
  },
  {
    id: 5,
    name: "Peope-lifestyle",
    note: "Các hoạt động và xu hướng trong đời sống hàng ngày",
    numberOfCourses: 6,
  },
  {
    id: 6,
    name: "Business",
    note: "Các khóa học về quản lý và chiến lược kinh doanh",
    numberOfCourses: 1,
  },
  {
    id: 7,
    name: "Education",
    note: "Khóa học về phương pháp học tập và giảng dạy",
    numberOfCourses: 0,
  },
  {
    id: 8,
    name: "Economy",
    note: "Nghiên cứu về thị trường và tài chính",
    numberOfCourses: 5,
  },
  {
    id: 9,
    name: "Peope-lifestyle",
    note: "Tìm hiểu về thói quen, lối sống và sự thay đổi trong xã hội",
    numberOfCourses: 3,
  },
  {
    id: 10,
    name: "Business",
    note: "Kinh doanh quốc tế và các mô hình khởi nghiệp",
    numberOfCourses: 2,
  },
  {
    id: 11,
    name: "Education",
    note: "Giảng dạy và học tập từ xa",
    numberOfCourses: 2,
  },
  {
    id: 12,
    name: "Economy",
    note: "Cập nhật các vấn đề nóng trong nền kinh tế hiện tại",
    numberOfCourses: 5,
  },
];

export default function TopicsPage() {
  const { t } = useTranslation("common");
  const [topics, setTopics] = useState(initialTopics);
  const [searchKey, setSearchKey] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const filteredTopics = topics.filter((topic) => {
    const value = topic[searchBy];
    if (typeof value === "number") {
      // Nếu tìm theo số, so sánh chính xác
      if (searchKey == "") return true;
      return value === Number(searchKey);
    }
    return value.toLowerCase().includes(searchKey.toLowerCase());
  });

  const handleAdd = () => {
    setEditData(null);
    setIsFormOpen(true);
  };

  const handleEdit = (topic: any) => {
    setEditData(topic);
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
        {t("COMMON.TOPIC.TITLE")}
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
              t("COMMON.TOPIC.SEARCH_BY") + t("COMMON.TOPIC.TABLE." + searchBy)
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
              <MenuItem value="name">{t("COMMON.TOPIC.TABLE.name")}</MenuItem>
              <MenuItem value="note">{t("COMMON.TOPIC.TABLE.note")}</MenuItem>
              <MenuItem value="numberOfCourses">
                {t("COMMON.TOPIC.TABLE.numberOfCourses")}
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
            "&:hover": {
              backgroundColor: "#03d794",
            },
            textTransform: "none",
          }}
        >
          {t("COMMON.BUTTON.CREATE")}
        </Button>
      </Box>

      {/* Table */}
      <TopicsTable
        topicsData={filteredTopics}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      {/* Form + ConfirmDelete */}
      <TopicCreateForm
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
