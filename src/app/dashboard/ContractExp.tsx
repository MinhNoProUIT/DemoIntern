"use client";
import React, { useState } from "react";
import {
  Avatar,
  Box,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export interface IContractExp {
  FullName: string;
  ContractType: string;
  ContractName: string;
  ContractStart: string;
  ContractEnd: string;
  AvatarPath: string | null;
}

export interface IFilterEmploymentContract {
  isActive?: boolean;
  createdDate?: Date;
  createdBy?: string;
  pageSize?: number;
  pageNumber?: number;
  sortBy?: string;
  isDescending?: boolean;
  keyword?: string;
  daysUntilExpiration: number;
}

function getContractBgColor(contractEnd: string): string {
  const today = new Date();
  const endDate = new Date(contractEnd);
  const diffInMonths =
    (endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30);
  if (diffInMonths <= 2) return "#f8d7da";
  if (diffInMonths <= 4) return "#fff3cd";
  return "#d4edda";
}

function getContractTextColor(contractEnd: string): string {
  const today = new Date();
  const endDate = new Date(contractEnd);
  const diffInMonths =
    (endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30);
  if (diffInMonths <= 2) return "#721c24";
  if (diffInMonths <= 4) return "#856404";
  return "#155724";
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString();
}

const MOCK_DATA: IContractExp[] = [
  {
    FullName: "Nguyen Van A",
    ContractType: "Full-time",
    ContractName: "HĐLĐ 1 năm",
    ContractStart: "2024-05-01",
    ContractEnd: "2025-05-01",
    AvatarPath: null,
  },
  {
    FullName: "Tran Thi B",
    ContractType: "Part-time",
    ContractName: "HĐTV",
    ContractStart: "2023-12-01",
    ContractEnd: "2024-06-15",
    AvatarPath: null,
  },
];

export default function ContractExpPage() {
  const [keyword, setKeyword] = useState("");
  const [orderBy, setOrderBy] = useState("FullName");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const filteredData = MOCK_DATA.filter((item) =>
    item.FullName.toLowerCase().includes(keyword.toLowerCase())
  );
  const sortedData = [...filteredData].sort((a, b) => {
    const aVal = a[orderBy as keyof IContractExp] as string;
    const bVal = b[orderBy as keyof IContractExp] as string;
    return order === "asc"
      ? aVal.localeCompare(bVal)
      : bVal.localeCompare(aVal);
  });

  const handleSort = (property: string) => {
    setOrderBy(property);
    setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <Box padding={3}>
      <TextField
        placeholder="Tìm kiếm tên nhân viên"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "FullName"}
                  direction={order}
                  onClick={() => handleSort("FullName")}
                >
                  Họ tên
                </TableSortLabel>
              </TableCell>
              <TableCell>Loại HĐ</TableCell>
              <TableCell>Tên HĐ</TableCell>
              <TableCell>Ngày bắt đầu</TableCell>
              <TableCell>Ngày kết thúc</TableCell>
              <TableCell>Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Avatar src={row.AvatarPath || ""} />
                    {row.FullName}
                  </Box>
                </TableCell>
                <TableCell>{row.ContractType}</TableCell>
                <TableCell>{row.ContractName}</TableCell>
                <TableCell>{formatDate(row.ContractStart)}</TableCell>
                <TableCell>{formatDate(row.ContractEnd)}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      backgroundColor: getContractBgColor(row.ContractEnd),
                      color: getContractTextColor(row.ContractEnd),
                      padding: "4px 8px",
                      borderRadius: "4px",
                    }}
                  >
                    {getContractBgColor(row.ContractEnd) === "#f8d7da"
                      ? "<= 2 tháng"
                      : getContractBgColor(row.ContractEnd) === "#fff3cd"
                      ? "<= 4 tháng"
                      : "> 4 tháng"}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
