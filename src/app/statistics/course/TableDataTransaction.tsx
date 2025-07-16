"use client";
import {
  Box,
  Typography,
  Tooltip,
  TableRow,
  TableBody,
  Table,
  TableCell,
  TableHead,
  TableContainer,
  TableSortLabel,
  Avatar,
} from "@mui/material";
import { ClipboardCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ITransactionListItem } from "@/interfaces/transaction.interface";
import { formatNumberToMoney } from "@/utils/formatNumberWithUnit";
import DetailTransaction from "./DetailTransaction";

interface IProps {
  transactionData: ITransactionListItem[];
  totalRecords: number;
  onSort: (property: string) => void;
}

function TableDataTransaction({
  transactionData,
  totalRecords,
  onSort,
}: IProps) {
  const { t } = useTranslation("common");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("");

  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<ITransactionListItem | null>(null);

  const handleOpenDetailModal = (transaction: ITransactionListItem) => {
    setSelectedTransaction(transaction);
    setOpenDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setSelectedTransaction(null);
    setOpenDetailModal(false);
  };

  useEffect(() => {}, [totalRecords]);

  // useEffect(() => { }, [
  //     totalRecords,
  //     selected,
  //     openDialog,
  //     selectedRow,
  //     order,
  //     orderBy,
  //     openModal,
  //     router,
  //     t,
  //     setSelected,
  //     setOpenDialog,
  //     setSelectedRow,
  //     setOrder,
  //     setOrderBy,
  //     setOpenModal
  // ])

  const handleSort = (property: string) => {
    onSort(property);
    if (orderBy === property) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setOrder("asc");
    }
    setOrderBy(property);
  };

  const rowHeight = 60;

  const calculateEmptyRows = () => {
    if (transactionData.length <= 5) {
      return 5 - transactionData.length;
    } else if (transactionData.length <= 10) {
      return 10 - transactionData.length;
    }
    return 0;
  };

  const emptyRows = calculateEmptyRows();

  return (
    <TableContainer
      sx={{
        height:
          transactionData.length <= 5
            ? `${7 * rowHeight + 64}px`
            : `${13 * rowHeight + 64}px`,
        overflowX: "hidden",
        paddingLeft: "8px",
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "var(--scrollbar-color)",
          borderRadius: "10px",
        },
      }}
    >
      {/* table */}
      <Table stickyHeader>
        <TableHead>
          <TableRow
            sx={{
              height: 64,
              backgroundColor: "var(--header-table-dashboard) !important", // Đặt !important để ưu tiên
              "& th": {
                backgroundColor: "var(--header-table-dashboard) !important", // Áp dụng cho các ô
                padding: "16px 24px", // Apply consistent padding to all headers
                borderColor: "var(--border-color)",
              },
              "&:last-child td, &:last-child th": {
                border: "none",
              },
            }}
          >
            {/* full name */}
            <TableCell
              sx={{ borderColor: "var(--border-color)", padding: "16px 24px" }}
            >
              <TableSortLabel
                active={"createdBy" === orderBy}
                direction={orderBy === "createdBy" ? order : "asc"}
                onClick={() => handleSort("createdBy")}
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
                  {t("COMMON.POST.FULL_NAME")}
                </Typography>
              </TableSortLabel>
            </TableCell>

            {/* count post */}
            <TableCell
              align="center"
              sx={{ borderColor: "var(--border-color)" }}
            >
              <TableSortLabel
                active={"totalPosts" === orderBy}
                direction={orderBy === "totalPosts" ? order : "asc"}
                onClick={() => handleSort("totalPosts")}
                sx={{
                  "& .MuiTableSortLabel-icon": {
                    color: "var(--text-color) !important",
                  },
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "var(--text-color)",
                    fontSize: "16px",
                    textAlign: "center",
                    overflow: "hidden",
                    ml: "8px",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t("COMMON.COURSE.MONEY")}
                </Typography>
              </TableSortLabel>
            </TableCell>

            {/* count like */}
            <TableCell
              align="center"
              sx={{ borderColor: "var(--border-color)" }}
            >
              <TableSortLabel
                active={"likesCount" === orderBy}
                direction={orderBy === "likesCount" ? order : "asc"}
                onClick={() => handleSort("likesCount")}
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
                  {t("COMMON.COURSE.CONTENT")}
                </Typography>
              </TableSortLabel>
            </TableCell>

            {/* count share */}
            <TableCell
              align="center"
              sx={{ borderColor: "var(--border-color)" }}
            >
              <TableSortLabel
                active={"sharesCount" === orderBy}
                direction={orderBy === "sharesCount" ? order : "asc"}
                onClick={() => handleSort("sharesCount")}
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
                    textAlign: "center",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t("COMMON.COURSE.DATE_TRANSACTION")}
                </Typography>
              </TableSortLabel>
            </TableCell>

            {/* action */}
            <TableCell
              align="center"
              sx={{ borderColor: "var(--border-color)", padding: "16px 24px" }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "var(--text-color)",
                  fontSize: "16px",
                  overflow: "hidden",
                  textAlign: "center",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {t("COMMON.ERROR_REPORT.ACTION")}
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactionData?.map((row: ITransactionListItem, index: number) => (
            <TableRow key={index}>
              {/* Author Info */}
              <TableCell padding="normal">
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar src={row.avatar} />
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{ color: "var(--text-color)" }}
                      noWrap
                    >
                      {row.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "var(--text-gray-color)" }}
                      noWrap
                    >
                      ID: {row.id}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              {/* Total Posts */}
              <TableCell
                align="center"
                sx={{ paddingRight: 5, color: "var(--text-color)" }}
              >
                <Typography variant="body1" fontWeight={600} noWrap>
                  {formatNumberToMoney(row.amount ?? 0)}
                </Typography>
              </TableCell>
              {/* Likes */}
              <TableCell
                align="center"
                sx={{ paddingRight: 5, color: "var(--text-color)" }}
              >
                <Typography variant="body1" noWrap>
                  {row.content}
                </Typography>
              </TableCell>
              {/* Shares */}
              <TableCell
                align="center"
                sx={{ paddingRight: 5, color: "var(--text-color)" }}
              >
                <Typography variant="body1" noWrap>
                  {row.date.toDateString()}
                </Typography>
              </TableCell>

              {/* Action */}
              <TableCell sx={{ paddingLeft: 6, color: "var(--text-color)" }}>
                <Tooltip title={t("COMMON.ERROR_REPORT.CONSIDER")}>
                  <Box
                    onClick={() => handleOpenDetailModal(row)}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                      color: "#00d100",
                      borderRadius: "50%",
                      width: "42px",
                      height: "42px",
                      "&:hover": {
                        backgroundColor: "var(--hover-color)",
                      },
                    }}
                  >
                    <ClipboardCheck />
                  </Box>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 &&
            Array.from({ length: emptyRows }).map((_, index) => (
              <TableRow
                key={`empty-${index}`}
                sx={{ height: `${rowHeight}px` }}
              >
                <TableCell colSpan={5} sx={{ borderBottom: "none" }} />
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {selectedTransaction && (
        <DetailTransaction
          open={openDetailModal}
          onClose={handleCloseDetailModal}
          transaction={selectedTransaction}
        />
      )}
    </TableContainer>
  );
}

export default TableDataTransaction;
