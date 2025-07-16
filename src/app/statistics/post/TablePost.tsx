"use client";

import {
  Box,
  Select,
  Pagination,
  Typography,
  MenuItem,
  SelectChangeEvent,
  Paper,
  FormControl,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";
import TableDataPost from "@/components/TableDataPost";
import { IPostListItem } from "@/interfaces/post.interface";

interface IFilter {
  pageSize?: number;
  pageNumber?: number;
  sortBy?: string;
  isDescending?: boolean;
  keyword?: string;
  isType?: string;
  minReports?: string;
}

const mockPosts: IPostListItem[] = [
  {
    id: 10111606,
    title: "Button on home page is unresponsive",
    createdBy: "Trần Minh",
    createdById: "U001",
    createdByAvatar:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/11/tai-hinh-nen-dep-mien-phi.jpg",
    createdDate: new Date(),
    totalPosts: 8,
    likesCount: 12,
    sharesCount: 4,
    isReported: true,
  },
  {
    id: 10111607,
    title: "Image not loading on profile page",
    createdBy: "Cao Dương Lâm",
    createdById: "U002",
    createdByAvatar:
      "https://r2.nucuoimekong.com/wp-content/uploads/buc-anh-dep-can-bang-sang-tot-1.jpg",
    createdDate: new Date("2024-12-10T14:48:00"),
    totalPosts: 6,
    likesCount: 20,
    sharesCount: 6,
    isReported: true,
  },
  {
    id: 10111608,
    title: "Crash when clicking settings",
    createdBy: "Bùi Thị Phương Huyền",
    createdById: "U003",
    createdByAvatar:
      "https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg",
    createdDate: new Date("2024-12-01T09:20:00"),
    totalPosts: 5,
    likesCount: 35,
    sharesCount: 12,
    isReported: true,
  },
  {
    id: 10111601,
    title: "Login fails with correct credentials",
    createdBy: "Đỗ Văn Phong",
    createdById: "U004",
    createdByAvatar:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/08/anh-nguoi-mau-25.jpg",
    createdDate: new Date("2024-11-25T11:10:00"),
    totalPosts: 7,
    likesCount: 9,
    sharesCount: 3,
    isReported: false,
  },
  {
    id: 10111605,
    title: "Cannot upload avatar",
    createdBy: "Lê Xuân Nam",
    createdById: "U005",
    createdByAvatar:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/08/anh-nguoi-mau-25.jpg",
    createdDate: new Date("2024-11-20T10:30:00"),
    totalPosts: 4,
    likesCount: 25,
    sharesCount: 5,
    isReported: true,
  },
  {
    id: 6,
    title: "Page freezes when scrolling",
    createdBy: "Lương Văn E",
    createdById: "U006",
    createdByAvatar:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/08/anh-nguoi-mau-25.jpg",
    createdDate: new Date("2024-11-18T08:45:00"),
    totalPosts: 3,
    likesCount: 17,
    sharesCount: 2,
    isReported: false,
  },
];

function TablePost() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState("5");
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(5);
  const [filter, setFilter] = useState<IFilter>({
    pageSize: 5,
    pageNumber: 1,
    keyword: "",
    minReports: "",
  });
  const [keyword, setKeyword] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("");
  const [openModal, setOpenModal] = useState(false);
  const [minReports, setMinReports] = useState<string | number>("");

  const handleChangeMinReports = (
    event: SelectChangeEvent<string | number>
  ) => {
    setMinReports(event.target.value);
    // Nếu muốn search ngay khi chọn filter thì gọi thêm handleSearchKeyword();
  };

  const removeVietnameseTones = (str: string) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const filteredData = mockPosts.filter((post) => {
    const matchesKeyword = removeVietnameseTones(post.createdBy || "").includes(
      removeVietnameseTones(filter.keyword || "")
    );

    let matchesReports = true;
    if (minReports === "lessThan10") {
      matchesReports = (post.totalPosts || 0) < 10;
    } else if (minReports === "between10And30") {
      matchesReports =
        (post.totalPosts || 0) >= 10 && (post.totalPosts || 0) <= 30;
    } else if (minReports === "greaterThan30") {
      matchesReports = (post.totalPosts || 0) > 30;
    }

    return matchesKeyword && matchesReports;
  });

  const paginatedData = filteredData.slice(
    (page - 1) * Number(rowsPerPage),
    page * Number(rowsPerPage)
  );
  const postsData: IPostListItem[] = paginatedData;
  const totalRecords = filteredData.length;

  const handleSort = (property: string) => {
    setFilter((prev) => ({
      ...prev,
      sortBy: property,
      isDescending: orderBy === property && order === "asc",
    }));
    if (orderBy === property) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setOrder("asc");
    }
    setOrderBy(property);
  };

  useEffect(() => {}, [
    router,
    page,
    rowsPerPage,
    from,
    to,
    selected,
    openDialog,
    selectedRow,
    order,
    orderBy,
    openModal,
    setSelected,
    setSelectedRow,
    setOpenDialog,
    setFrom,
    setTo,
    setOrder,
    setOrderBy,
    setOpenModal,
  ]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
    setFilter((prev) => {
      return {
        ...prev,
        pageNumber: newPage,
      };
    });
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    const value = Number(event.target.value);
    setPage(1);
    setRowsPerPage(event.target.value);
    setFilter((prev) => ({
      ...prev,
      pageSize: value,
      pageNumber: 1,
    }));
  };

  const handleSearchKeyword = () => {
    setPage(1);
    setFilter((prev) => {
      return {
        ...prev,
        keyword: keyword,
        pageNumber: 1,
      };
    });
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        overflow: "hidden",
        backgroundColor: "var(--background-item)",
        borderRadius: 4,
        boxShadow: "var(--box-shadow-paper)",
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: "100%", // hoặc 1 chiều cao cố định nếu bạn muốn ví dụ 100vh, 80vh tùy trang
        minHeight: "600px", // đề phòng bảng quá ngắn
      }}
    >
      {/* tilte */}
      <Typography
        sx={{
          userSelect: "none",
          color: "var(--text-color)",
          fontWeight: "bold",
          fontSize: "20px",
          display: "flex",
          alignItems: "center",
          padding: "24px 4px 4px",
        }}
      >
        {t("COMMON.POST.TITLE_TABLE")}
      </Typography>

      <Box display="flex" alignItems="center" gap="24px" margin="20px 4px">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "45%",
            height: "55px",
            gap: "12px",
          }}
        >
          <TextField
            id="location-search"
            type="search"
            placeholder={t("COMMON.ERROR_REPORT.SEARCH")}
            variant="outlined"
            required
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            sx={{
              color: "var(--text-color)",
              padding: "0px",
              width: "100%",
              "& fieldset": {
                borderRadius: "10px",
                borderColor: "var(--border-color)",
              },
              "& .MuiInputBase-root": {
                paddingLeft: "0px",
                paddingRight: "12px",
              },
              "& .MuiInputBase-input": {
                padding: "15px 0px",
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
            onKeyDown={() => {
              handleSearchKeyword();
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{
                      mr: 0,
                    }}
                  >
                    <Box
                      sx={{
                        height: "100%",
                        color: "#a5bed4",
                        padding: "10.5px",
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
              width: "180px",
              height: "55px",
              "& fieldset": {
                borderRadius: "8px",
                borderColor: "var(--border-color)",
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
              displayEmpty
              value={minReports}
              onChange={handleChangeMinReports}
              sx={{
                height: "55px",
                color: "var(--text-color)",
                fontSize: "16px",
                "& .MuiSelect-icon": {
                  color: "var(--text-color)",
                },
              }}
            >
              <MenuItem value="">{t("COMMON.POST.ALL")}</MenuItem>
              <MenuItem value="lessThan10">
                {t("COMMON.POST.LESS_THAN", { number: 10 })}
              </MenuItem>
              <MenuItem value="between10And30">
                {t("COMMON.POST.BETWEEN", { from: 10, to: 30 })}
              </MenuItem>
              <MenuItem value="greaterThan30">
                {t("COMMON.POST.MORE_THAN", { number: 30 })}
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      {/* table */}
      <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
        <TableDataPost
          postsData={postsData}
          totalRecords={totalRecords}
          onSort={handleSort}
        />
      </Box>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding="24px"
        sx={{ flexShrink: 0 }}
      >
        <Box display="flex" alignItems="center">
          <Typography sx={{ mr: "10px", color: "var(--text-color)" }}>
            {t("COMMON.PAGINATION.ROWS_PER_PAGE")}
          </Typography>
          <Select
            id="select"
            sx={{
              width: "71px",
              padding: "5px",
              borderRadius: "8px",
              color: "var(--text-color)",
              "& .MuiSelect-icon": {
                color: "var(--text-color)",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--border-color)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--hover-field-color)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--selected-field-color)",
              },
              "& .MuiSelect-select": {
                padding: "6px 32px 6px 10px",
              },
            }}
            value={rowsPerPage}
            defaultValue="5"
            onChange={handleChangeRowsPerPage}
            MenuProps={{
              PaperProps: {
                elevation: 0,
                sx: {
                  border: "1px solid var(--border-color)",
                  borderRadius: "8px",
                  backgroundColor: "var(--background-item)",
                  "& .MuiList-root": {
                    borderRadius: "0px",
                    backgroundPosition: "top right, bottom left",
                    backgroundSize: "50%, 50%",
                    backgroundRepeat: "no-repeat",
                    backdropFilter: "blur(20px)",
                    backgroundColor: "var(--background-item)",
                    padding: "5px",
                    "& .MuiMenuItem-root": {
                      color: "var(--text-color)",
                      borderRadius: "6px",
                      "&:hover": {
                        backgroundColor: "var(--hover-color) !important",
                      },
                      "&.Mui-selected": {
                        backgroundColor: "var(--background-selected-item)",
                      },
                    },
                  },
                },
              },
            }}
          >
            <MenuItem sx={{ marginBottom: "3px" }} value={5}>
              5
            </MenuItem>
            <MenuItem sx={{ marginBottom: "3px" }} value={10}>
              10
            </MenuItem>
          </Select>
        </Box>
        <Pagination
          count={Math.ceil(mockPosts.length / Number(rowsPerPage))}
          page={page}
          onChange={handleChangePage}
          boundaryCount={1}
          siblingCount={2}
          variant="outlined"
          sx={{
            color: "var(--text-color)",
            borderColor: "var(--border-color)",
            "& .MuiPaginationItem-root": {
              color: "var(--text-color)",
              borderColor: "var(--border-color)",
              "&.Mui-selected": {
                backgroundColor: "var(--background-selected-item) ",
                borderColor: "var(--background-selected-item) ",
                color: "var(--text-color)",
              },
              "&:hover": {
                backgroundColor: "var(--hover-color) !important",
                borderColor: "var(--hover-color) !important",
              },
            },
          }}
          color="primary"
        />
      </Box>
    </Paper>
  );
}

export default TablePost;
