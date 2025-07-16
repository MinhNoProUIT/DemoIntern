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
import VocabularyTable from "./VocabularyTable";
import { IWord } from "@/interfaces/word.interface";
import { useTranslation } from "react-i18next";
import WordCreateForm from "./WordCreateForm";
import ConfirmDeleteDialog from "@/components/ConfirmDeleteDialog";

// Fake data
const initialVocabulary: IWord[] = [
  {
    id: 1,
    eng: "hello",
    vie: "xin chào",
    transcription: "həˈlō",
    type: "n",
    example: "She said hello to everyone in the room.",
    image: "https://picsum.photos/id/1035/400/300",
    course: "Hang out with friends",
  },
  {
    id: 2,
    eng: "friend",
    vie: "bạn bè",
    transcription: "frend",
    type: "n",
    example: "He is my best friend since childhood.",
    image: "https://picsum.photos/id/1035/400/300",
    course: "Hang out with friends",
  },
  {
    id: 3,
    eng: "study",
    vie: "học tập",
    transcription: "ˈstədē",
    type: "v",
    example: "She studies English every evening.",
    image: "https://picsum.photos/id/1025/400/300",
    course: "Sports",
  },
  {
    id: 4,
    eng: "beautiful",
    vie: "đẹp",
    transcription: "ˈbyo͞odəfəl",
    type: "adj",
    example: "The sunset was absolutely beautiful.",
    image: "https://picsum.photos/id/1015/400/300",
    course: "In court",
  },
  {
    id: 5,
    eng: "nice",
    vie: "tốt",
    transcription: "nīs",
    type: "adj",
    example: "That was a nice thing to say.",
    image: "https://picsum.photos/id/1025/400/300",
    course: "Hang out with friends",
  },
  {
    id: 6,
    eng: "buy",
    vie: "mua",
    transcription: "bī",
    type: "v",
    example: "I need to buy some groceries today.",
    image: "https://picsum.photos/id/1035/400/300",
    course: "Sports",
  },
  {
    id: 7,
    eng: "computer",
    vie: "máy tính",
    transcription: "kəmˈpyo͞odər",
    type: "n",
    example: "My computer stopped working this morning.",
    image: "https://picsum.photos/id/1015/400/300",
    course: "In court",
  },
  {
    id: 8,
    eng: "sell",
    vie: "bán",
    transcription: "sel",
    type: "v",
    example: "They sell fresh fruit at the market.",
    image: "https://picsum.photos/id/1035/400/300",
    course: "In court",
  },
  {
    id: 9,
    eng: "fly",
    vie: "bay",
    transcription: "flī",
    type: "v",
    example: "Birds can fly high in the sky.",
    image: "https://picsum.photos/id/1035/400/300",
    course: "Sports",
  },
  {
    id: 10,
    eng: "small",
    vie: "nhỏ",
    transcription: "smôl",
    type: "adj",
    example: "She has a small dog named Coco.",
    image: "https://picsum.photos/id/1015/400/300",
    course: "In court",
  },
  {
    id: 11,
    eng: "sun",
    vie: "mặt trời",
    transcription: "sun",
    type: "n",
    example: "The sun rises in the east.",
    image: "https://picsum.photos/id/1025/400/300",
    course: "Hang out with friends",
  },
  {
    id: 12,
    eng: "big",
    vie: "to, lớn",
    transcription: "biɡ",
    type: "adj",
    example: "They live in a big house near the park.",
    image: "https://picsum.photos/id/1015/400/300",
    course: "Sports",
  },
];

export default function CoursesPage() {
  const { t } = useTranslation("common");
  const [words, setWords] = useState(initialVocabulary);
  const [searchKey, setSearchKey] = useState("");
  const [searchBy, setSearchBy] = useState("eng");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const filteredWords = words.filter((word) =>
    word[searchBy].toLowerCase().includes(searchKey.toLowerCase())
  );

  const handleAdd = () => {
    setEditData(null);
    setIsFormOpen(true);
  };

  const handleEdit = (word: any) => {
    setEditData(word);
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
        Danh sách từ vựng
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
              t("COMMON.VOCABULARY.TABLE." + searchBy)
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
              <MenuItem value="eng">
                {t("COMMON.VOCABULARY.TABLE.eng")}
              </MenuItem>
              <MenuItem value="vie">
                {t("COMMON.VOCABULARY.TABLE.vie")}
              </MenuItem>
              <MenuItem value="transcription">
                {t("COMMON.VOCABULARY.TABLE.transcription")}
              </MenuItem>
              <MenuItem value="type">
                {t("COMMON.VOCABULARY.TABLE.type")}
              </MenuItem>
              <MenuItem value="course">
                {t("COMMON.VOCABULARY.TABLE.course")}
              </MenuItem>
              <MenuItem value="example">
                {t("COMMON.VOCABULARY.TABLE.example")}
              </MenuItem>
              <MenuItem value="image">
                {t("COMMON.VOCABULARY.TABLE.image")}
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
      <VocabularyTable
        vocabularyData={filteredWords}
        searchKey={searchKey}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      {/* Form + ConfirmDelete */}
      <WordCreateForm
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
