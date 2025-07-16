"use client";
import { formatDate } from "@/utils/formatDate";
import {
  Box,
  Select,
  Pagination,
  Typography,
  MenuItem,
  SelectChangeEvent,
  Paper,
  TableRow,
  TableBody,
  Table,
  TableCell,
  TableHead,
  TableContainer,
  TextField,
  InputAdornment,
  TableSortLabel,
  Avatar,
  FormControl,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SearchIcon from "@mui/icons-material/Search";

import { useCallback } from "react";

export interface IFilterSysConfiguration {
  isActive?: boolean;
  createdDate?: Date;
  createdBy?: string;
  pageSize?: number;
  pageNumber?: number;
  sortBy?: string;
  isDescending?: boolean;
  keyword?: string;
}

interface UserLearning {
  AvatarPath: string;
  FullName: string;
  Chain: number;
  Word: number;
  Topic: number;
  Time: number;
}

const userLearningList: UserLearning[] = [
  {
    AvatarPath: "", // Đường dẫn ảnh đại diện giả
    FullName: "Nguyễn Văn A",
    Chain: 15, // Chuỗi ngày học liên tiếp
    Word: 520, // Số từ đã học
    Topic: 25, // Số chủ đề đã hoàn thành
    Time: 1200, // Thời gian học (ví dụ: tính bằng phút)
  },
  {
    AvatarPath: "",
    FullName: "Trần Thị B",
    Chain: 12,
    Word: 480,
    Topic: 22,
    Time: 1100,
  },
  {
    AvatarPath: "",
    FullName: "Lê Văn C",
    Chain: 8,
    Word: 350,
    Topic: 18,
    Time: 850,
  },
  {
    AvatarPath: "",
    FullName: "Phạm Thị D",
    Chain: 20,
    Word: 610,
    Topic: 28,
    Time: 1400,
  },
  {
    AvatarPath: "",
    FullName: "Hoàng Văn E",
    Chain: 5,
    Word: 280,
    Topic: 15,
    Time: 700,
  },
  {
    AvatarPath: "",
    FullName: "Đỗ Thị F",
    Chain: 18,
    Word: 550,
    Topic: 26,
    Time: 1250,
  },
  {
    AvatarPath: "",
    FullName: "Ngô Văn G",
    Chain: 10,
    Word: 400,
    Topic: 20,
    Time: 950,
  },
  {
    AvatarPath: "",
    FullName: "Bùi Thị H",
    Chain: 7,
    Word: 320,
    Topic: 17,
    Time: 800,
  },
  {
    AvatarPath: "",
    FullName: "Đặng Văn I",
    Chain: 14,
    Word: 490,
    Topic: 23,
    Time: 1150,
  },
  {
    AvatarPath: "",
    FullName: "Vũ Thị K",
    Chain: 11,
    Word: 430,
    Topic: 21,
    Time: 1000,
  },
];

function getContractBgColor(IsPaid: boolean): string {
  if (IsPaid) {
    return "var(--bg-success-color)";
  } else {
    return "var(--bg-danger-color)";
  }
}

function getContractTextColor(IsPaid: boolean): string {
  if (IsPaid) {
    return "var(--text-success-color)";
  } else {
    return "var(--text-danger-color)";
  }
}

function LearningTable() {
  const { t } = useTranslation("common");
  // const router = useRouter()
  // const [selected, setSelected] = useState<number[]>([])
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState("5");
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(5);
  const [filter, setFilter] = useState<IFilterSysConfiguration>({
    pageSize: 5,
    pageNumber: 1,
  });
  const [keyword, setKeyword] = useState("");
  // const [openDialog, setOpenDialog] = useState(false)
  // const [selectedRow, setSelectedRow] = useState<number | null>(null)
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("");
  // const [selectedConfig, setSelectedConfig] = useState<IGetAllSysConfiguration | null>(null)
  //const [openModal, setOpenModal] = useState(false)
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const year =
    typeof selectedYear === "number"
      ? selectedYear.toString()
      : currentYear.toString();

  //   const {
  //     data: responseData,
  //     isFetching,
  //     refetch,
  //   } = useGetUnpaidSalaryQuery({ filter, year });

  //   const salaryData = responseData?.Data.Records as IUnpaidSalary[];
  //   const totalRecords = responseData?.Data.TotalRecords as number;
  const totalRecords = userLearningList.length;

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

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    setSelectedYear(event.target.value as number);
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    setPage(1);
    setRowsPerPage(event.target.value as string);
    setFilter((prev) => {
      return {
        ...prev,
        pageSize: Number(event.target.value),
        pageNumber: 1,
      };
    });
  };

  //   const debouncedSetFilter = useCallback(
  //     debounce((value) => {
  //       setFilter((prev) => ({
  //         ...prev,
  //         keyword: value,
  //         pageNumber: 1,
  //       }));
  //     }, 100),
  //     []
  //   );

  const handleSearchKeyword = (value) => {
    setPage(1);
    setKeyword(value);
    //debouncedSetFilter(value);
  };

  //   useEffect(() => {
  //     if (!isFetching && responseData?.Data) {
  //       const from =
  //         (page - 1) * Number(rowsPerPage) + Math.min(1, salaryData.length);
  //       setFrom(from);

  //       const to = Math.min(
  //         salaryData.length + (page - 1) * Number(rowsPerPage),
  //         totalRecords
  //       );
  //       setTo(to);
  //     }
  //   }, [isFetching, responseData, page, rowsPerPage]);

  //   useEffect(() => {
  //     refetch();
  //   }, [filter]);

  const handleSort = (property: string) => {
    setFilter((prev) => ({
      ...prev,
      sortBy: property,
      isDescending: orderBy === property && order === "asc" ? true : false,
    }));
    if (orderBy === property) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setOrder("asc");
    }
    setOrderBy(property);
  };

  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          overflow: "hidden",
          borderRadius: "15px",
          backgroundColor: "var(--background-item)",
        }}
      >
        <Typography
          sx={{
            userSelect: "none",
            color: "var(--text-color)",
            fontWeight: "bold",
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            padding: "24px 24px 20px",
          }}
        >
          {t("COMMON.DANHSACHHOCTAP")}
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          margin="24px"
        >
          <Box sx={{ position: "relative", width: "100%", height: "55px" }}>
            <TextField
              id="location-search"
              type="search"
              placeholder={t("COMMON.SYS_CONFIGURATION.PLACEHOLDER_SEARCH")}
              variant="outlined"
              required
              value={keyword}
              onChange={(e) => handleSearchKeyword(e.target.value)}
              sx={{
                color: "var(--text-color)",
                padding: "0px",
                width: "335px",
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
                    opacity: 1, // Đảm bảo opacity của placeholder không bị giảm
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
          </Box>
        </Box>
        <TableContainer
          sx={{
            width: "100%",
            "&::-webkit-scrollbar": {
              width: "7px",
              height: "7px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "var(--scrollbar-color)",
              borderRadius: "10px",
            },
            paddingInline: "24px",
          }}
        >
          <Table sx={{ width: "100%" }}>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "var(--header-table-dashboard)",
                  "&:last-child td, &:last-child th": {
                    border: "none",
                  },
                }}
              >
                <TableCell sx={{ borderColor: "var(--border-color)" }}>
                  <TableSortLabel
                    active={"FullName" === orderBy}
                    direction={orderBy === "FullName" ? order : "asc"}
                    onClick={() => handleSort("FullName")}
                    sx={{
                      "& .MuiTableSortLabel-icon": {
                        color: "var(--text-color) !important",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        color: "var(--text-color)",
                        fontSize: "16px",
                        overflow: "hidden",
                        maxWidth: "260px",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {t("COMMON.EMPLOYEE.FULLNAME")}
                    </Typography>
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ borderColor: "var(--border-color)" }}>
                  <TableSortLabel
                    active={"Chain" === orderBy}
                    direction={orderBy === "Chain" ? order : "asc"}
                    onClick={() => handleSort("Chain")}
                    sx={{
                      "& .MuiTableSortLabel-icon": {
                        color: "var(--text-color) !important",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        color: "var(--text-color)",
                        fontSize: "16px",
                        maxWidth: "180px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {t("COMMON.LOP")}
                    </Typography>
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ borderColor: "var(--border-color)" }}>
                  <TableSortLabel
                    active={"Word" === orderBy}
                    direction={orderBy === "Word" ? order : "asc"}
                    onClick={() => handleSort("Word")}
                    sx={{
                      "& .MuiTableSortLabel-icon": {
                        color: "var(--text-color) !important",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        color: "var(--text-color)",
                        maxWidth: "200px",
                        fontSize: "16px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {t("COMMON.MONHOC")}
                    </Typography>
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ borderColor: "var(--border-color)" }}>
                  <TableSortLabel
                    active={"Topic" === orderBy}
                    direction={orderBy === "Topic" ? order : "asc"}
                    onClick={() => handleSort("Topic")}
                    sx={{
                      "& .MuiTableSortLabel-icon": {
                        color: "var(--text-color) !important",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        color: "var(--text-color)",
                        fontSize: "16px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {t("COMMON.TENKHOAHOC")}
                    </Typography>
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ borderColor: "var(--border-color)" }}>
                  <TableSortLabel
                    active={"Time" === orderBy}
                    direction={orderBy === "Time" ? order : "asc"}
                    onClick={() => handleSort("Time")}
                    sx={{
                      "& .MuiTableSortLabel-icon": {
                        color: "var(--text-color) !important",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        color: "var(--text-color)",
                        fontSize: "16px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "flex",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {t("COMMON.THOIGIANHOC")}
                    </Typography>
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userLearningList &&
                userLearningList.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: "none",
                      },
                    }}
                  >
                    <TableCell
                      sx={{
                        borderColor: "var(--border-color)",
                        padding: "16px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "14px",
                        }}
                      >
                        <Avatar
                          src={
                            row.AvatarPath ||
                            "https://localhost:44381/avatars/aa1678f0-75b0-48d2-ae98-50871178e9bd.jfif"
                          }
                        />
                        <Typography
                          sx={{
                            color: "var(--text-color)",
                            fontSize: "16px",
                            maxWidth: "240px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {row.FullName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ borderColor: "var(--border-color)" }}>
                      <Typography
                        sx={{
                          color: "var(--text-color)",
                          fontSize: "16px",
                          maxWidth: "180px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {row.Chain}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ borderColor: "var(--border-color)" }}>
                      <Typography
                        sx={{
                          color: "var(--text-color)",
                          fontSize: "16px",
                          overflow: "hidden",
                          maxWidth: "200px",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {row.Word}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ borderColor: "var(--border-color)" }}>
                      <Typography
                        sx={{
                          color: "var(--text-color)",
                          fontSize: "16px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {row.Topic}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ borderColor: "var(--border-color)" }}>
                      <Typography
                        sx={{
                          color: "var(--text-color)",
                          fontSize: "16px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {row.Time}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          padding="24px"
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
                      backgroundImage:
                        "url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSJ1cmwoI3BhaW50MF9yYWRpYWxfMjc0OV8xNDUxODYpIiBmaWxsLW9wYWNpdHk9IjAuMTIiLz4KPGRlZnM+CjxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQwX3JhZGlhbF8yNzQ5XzE0NTE4NiIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgxMjAgMS44MTgxMmUtMDUpIHJvdGF0ZSgtNDUpIHNjYWxlKDEyMy4yNSkiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMDBCOEQ5Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwQjhEOSIgc3RvcC1vcGFjaXR5PSIwIi8+CjwvcmFkaWFsR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==), url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSJ1cmwoI3BhaW50MF9yYWRpYWxfMjc0OV8xNDUxODcpIiBmaWxsLW9wYWNpdHk9IjAuMTIiLz4KPGRlZnM+CjxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQwX3JhZGlhbF8yNzQ5XzE0NTE4NyIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgwIDEyMCkgcm90YXRlKDEzNSkgc2NhbGUoMTIzLjI1KSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGRjU2MzAiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkY1NjMwIiBzdG9wLW9wYWNpdHk9IjAiLz4KPC9yYWRpYWxHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K)",
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
              <MenuItem sx={{ marginBottom: "3px" }} value={20}>
                20
              </MenuItem>
              <MenuItem sx={{ marginBottom: "3px" }} value={30}>
                30
              </MenuItem>
              <MenuItem value={40}>40</MenuItem>
            </Select>
            <Typography sx={{ ml: "30px", color: "var(--text-color)" }}>
              {t("COMMON.PAGINATION.FROM_TO", { from, to, totalRecords })}
            </Typography>
          </Box>
          <Pagination
            count={Math.ceil(totalRecords / Number(rowsPerPage))}
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
    </Box>
  );
}

export default LearningTable;
