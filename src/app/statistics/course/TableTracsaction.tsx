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
import { ITransactionListItem } from "@/interfaces/transaction.interface";
import TableDataTransaction from "./TableDataTransaction";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { convertToVietnamTime } from "@/utils/convertToVietnamTime";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { useTheme } from "next-themes";

interface IFilter {
  pageSize?: number;
  pageNumber?: number;
  sortBy?: string;
  isDescending?: boolean;
  keyword?: string;
  isType?: string;
  startDate?: string;
  endDate?: string;
}

const mockTransactions: ITransactionListItem[] = [
  {
    id: "#10111606",
    name: "Trần Văn Minh",
    avatar: null,
    amount: 500000,
    date: new Date("2025-06-09"),
    content: "Thanh toán đơn hàng",
  },
  {
    id: "#10111607",
    name: "Cao Dương Lâm",
    avatar: null,
    amount: 10000,
    date: new Date("2025-06-09"),
    content: "Chuyển khoản bạn bè",
  },
  {
    id: "#10111603",
    name: "Đỗ Văn Phong",
    avatar: null,
    amount: 240000,
    date: new Date("2025-06-06"),
    content: "Thanh toán hóa đơn điện",
  },
  {
    id: "#10111602",
    name: "Bùi Thị Phương Huyền",
    avatar: null,
    amount: 70000,
    date: new Date("2025-06-05"),
    content: "Mua hàng online",
  },
  {
    id: "#10111605",
    name: "Lê Xuân Nam",
    avatar: null,
    amount: 10000,
    date: new Date("2025-06-05"),
    content: "Đóng học phí",
  },
  {
    id: "#10111610",
    name: "Lê Ngọc Ngà",
    avatar: null,
    amount: 10000,
    date: new Date("2025-06-06"),
    content: "Thuê nhà",
  },
  {
    id: "#10111611",
    name: "Nguyễn Đức Minh",
    avatar: null,
    amount: 500000,
    date: new Date("2025-06-07"),
    content: "Mua vé máy bay",
  },
  {
    id: "#10111613",
    name: "Trần Tuấn Khoa",
    avatar: null,
    amount: 10000,
    date: new Date("2025-06-08"),
    content: "Đi ăn nhà hàng",
  },
];

function TableTransaction() {
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
    startDate: new Date("2025-01-01T00:00:00").toString(),
  });
  const [keyword, setKeyword] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("");
  const [openModal, setOpenModal] = useState(false);
  const { theme } = useTheme();

  const removeVietnameseTones = (str: string) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const filteredData = mockTransactions.filter((transaction) => {
    const matchKeyword = removeVietnameseTones(transaction.name || "").includes(
      removeVietnameseTones(keyword)
    );

    const transactionDate = new Date(transaction.date);
    const startDate = filter.startDate ? new Date(filter.startDate) : null;
    const endDate = filter.endDate ? new Date(filter.endDate) : null;

    const matchDate =
      (!startDate || transactionDate >= startDate) &&
      (!endDate || transactionDate <= endDate);

    return matchKeyword && matchDate;
  });

  const paginatedData = filteredData.slice(
    (page - 1) * Number(rowsPerPage),
    page * Number(rowsPerPage)
  );
  const transactionsData: ITransactionListItem[] = paginatedData;
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          overflow: "hidden",
          p: 2,
          borderRadius: 4,
          boxShadow: 2,
          backgroundColor: "var(--background-item)",
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
          {t("COMMON.COURSE.TITLE_TABLE")}
        </Typography>

        <Box display="flex" alignItems="center" gap="24px" margin="20px 4px">
          <Box sx={{ position: "relative", width: "45%", height: "55px" }}>
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
          </Box>

          {/* Date Picker */}
          <Box sx={{ display: "flex", gap: "24px" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label={t("COMMON.COURSE.FROM")}
                value={dayjs(filter.startDate)}
                onChange={(value) =>
                  setFilter({
                    ...filter,
                    startDate: convertToVietnamTime(
                      value?.toDate() || new Date()
                    ),
                  })
                }
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock,
                }}
                sx={{
                  width: "100%",
                  "& .MuiInputBase-root": {
                    color: "var(--text-color)", // Đặt màu chữ của input
                  },
                  "& .MuiInputBase-input": {
                    padding: "15px 0 15px 14px",
                    color: theme === "light" ? "#000000" : "#ffffff", // Màu chữ của value
                  },
                  "& .MuiInputLabel-root": {
                    color: theme === "light" ? "#000000" : "#ffffff", // Màu label
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "8px",
                    borderColor:
                      theme === "light" ? "#000000" : "#ffffff !important", // Màu viền
                  },
                  "& .MuiSvgIcon-root": {
                    color: theme === "light" ? "#000000" : "#ffffff", // Màu icon (lịch)
                  },
                  "& .MuiOutlinedInput-root": {
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme === "light" ? "#1976d2" : "#90caf9", // Màu viền khi hover
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme === "light" ? "#1976d2" : "#90caf9", // Màu viền khi focus
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: theme === "light" ? "#1976d2" : "#90caf9", // Màu label khi focus
                  },
                }}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label={t("COMMON.COURSE.TO")}
                value={dayjs(filter.endDate)}
                onChange={(value) =>
                  setFilter({
                    ...filter,
                    endDate: convertToVietnamTime(
                      value?.toDate() || new Date()
                    ),
                  })
                }
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock,
                }}
                sx={{
                  width: "100%",
                  "& .MuiInputBase-root": {
                    color: "var(--text-color)",
                  },
                  "& .MuiInputBase-input": {
                    padding: "15px 0 15px 14px",
                    color: theme === "light" ? "#000000" : "#ffffff", // Màu chữ của value
                  },
                  "& .MuiInputLabel-root": {
                    color: theme === "light" ? "#000000" : "#ffffff", // Màu label
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "8px",
                    borderColor: theme === "light" ? "#000000" : "#ffffff", // Màu viền
                  },
                  "& .MuiSvgIcon-root": {
                    color: theme === "light" ? "#000000" : "#ffffff", // Màu icon (lịch)
                  },
                  "& .MuiOutlinedInput-root": {
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme === "light" ? "#1976d2" : "#90caf9", // Màu viền khi hover
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme === "light" ? "#1976d2" : "#90caf9", // Màu viền khi focus
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: theme === "light" ? "#1976d2" : "#90caf9", // Màu label khi focus
                  },
                }}
              />
            </LocalizationProvider>
          </Box>
        </Box>

        <Box>
          <FormControl
            sx={{
              width: "140px",
              height: "53px",
              "& fieldset": {
                borderRadius: "8px",
                borderColor: "var(--border-color)", // Viền mặc định
              },
              "& .MuiOutlinedInput-root:hover fieldset": {
                borderColor: "var(--hover-field-color)", // Màu hover khi không lỗi
              },
              "& .MuiOutlinedInput-root.Mui-error:hover fieldset": {
                borderColor: "var(--error-color)", // Màu hover khi lỗi
              },
              "& .MuiOutlinedInput-root.Mui-error fieldset": {
                borderColor: "var(--error-color)", // Màu viền khi lỗi
              },
              "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                borderColor: "var(--selected-field-color)", // Màu viền khi focus
              },
              "& .MuiOutlinedInput-root.Mui-error.Mui-focused fieldset": {
                borderColor: "var(--error-color)", // Màu viền khi lỗi và focus
              },
              "& .MuiInputLabel-root": {
                color: "var(--text-label-color)", // Label mặc định
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "var(--selected-field-color)", // Label khi focus
              },
              "& .MuiInputLabel-root.Mui-error": {
                color: "var(--error-color)", // Label khi lỗi
              },
            }}
          ></FormControl>
        </Box>

        {/* table */}
        <TableDataTransaction
          transactionData={transactionsData}
          totalRecords={totalRecords}
          onSort={handleSort}
        />

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
            count={Math.ceil(mockTransactions.length / Number(rowsPerPage))}
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
    </LocalizationProvider>
  );
}

export default TableTransaction;
