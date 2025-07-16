"use client";

import React, { useState } from "react";
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
} from "@mui/material";
import { EditOutlined, DeleteOutline, } from "@mui/icons-material";
import { ITopic } from "@/interfaces/topic.interface";
import { useTranslation } from "react-i18next";

export default function TopicsTable({
    topicsData,
    handleEdit,
    handleDelete,
}: {
    topicsData: ITopic[],
    handleEdit: (topic: any) => void,
    handleDelete: (id: any) => void
}) {
    const { t } = useTranslation("common");
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<string>('id');

    const handleRequestSort = (property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedTopics = [...topicsData].sort((a, b) => {
        if (typeof a[orderBy] === 'number') {
            return order === 'asc'
                ? a[orderBy] - b[orderBy]
                : b[orderBy] - a[orderBy];
        }
        return order === 'asc'
            ? a[orderBy].localeCompare(b[orderBy])
            : b[orderBy].localeCompare(a[orderBy]);
    });

    return (
        <TableContainer
            sx={{
                '&::-webkit-scrollbar': {
                    width: '7px',
                    height: '7px'
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'var(--scrollbar-color)',
                    borderRadius: '10px'
                }
            }}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow
                        sx={{
                            backgroundColor: '#9affb3',
                            '& th': {
                                backgroundColor: '#9affb3' // Áp dụng cho các ô
                            },
                            '&:last-child td, &:last-child th': {
                                border: 'none'
                            }
                        }}
                    >
                        <TableCell align="center" onClick={() => handleRequestSort('id')}>
                            <TableSortLabel
                                active={orderBy === 'id'}
                                direction={orderBy === 'id' ? order : 'asc'}
                                sx={{
                                    display: 'inline-flex',
                                    justifyContent: 'center',
                                    '& .MuiTableSortLabel-icon': {
                                        margin: 0,
                                        position: 'absolute',
                                        right: '-20px',
                                    }
                                }}
                            >
                                <b>ID</b>
                            </TableSortLabel>
                        </TableCell>
                        <TableCell align="center" onClick={() => handleRequestSort('name')}>
                            <TableSortLabel
                                active={orderBy === 'name'}
                                direction={orderBy === 'name' ? order : 'asc'}
                                sx={{
                                    display: 'inline-flex',
                                    justifyContent: 'center',
                                    '& .MuiTableSortLabel-icon': {
                                        margin: 0,
                                        position: 'absolute',
                                        right: '-20px',
                                    }
                                }}
                            >
                                <b>{t("COMMON.TOPIC.TABLE.name")}</b>
                            </TableSortLabel>
                        </TableCell>
                        <TableCell align="center" onClick={() => handleRequestSort('note')}>
                            <TableSortLabel
                                active={orderBy === 'note'}
                                direction={orderBy === 'note' ? order : 'asc'}
                                sx={{
                                    display: 'inline-flex',
                                    justifyContent: 'center',
                                    '& .MuiTableSortLabel-icon': {
                                        margin: 0,
                                        position: 'absolute',
                                        right: '-20px',
                                    }
                                }}
                            >
                                <b>{t("COMMON.TOPIC.TABLE.note")}</b>
                            </TableSortLabel>
                        </TableCell>
                        <TableCell align="center" onClick={() => handleRequestSort('numberOfCourses')}>
                            <TableSortLabel
                                active={orderBy === 'numberOfCourses'}
                                direction={orderBy === 'numberOfCourses' ? order : 'asc'}
                                sx={{
                                    display: 'inline-flex',
                                    justifyContent: 'center',
                                    '& .MuiTableSortLabel-icon': {
                                        margin: 0,
                                        position: 'absolute',
                                        right: '-20px',
                                    }
                                }}
                            >
                                <b>{t("COMMON.TOPIC.TABLE.numberOfCourses")}</b>
                            </TableSortLabel>
                        </TableCell>
                        <TableCell align="center"><b>{t('COMMON.TABLE.COMMON.ACTION')}</b></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {sortedTopics.map((topic) => (
                        <TableRow key={topic.id} >
                            <TableCell
                                align="center"
                                sx={{
                                    color: "var(--text-color)",
                                    width: "10%",
                                }}
                            >
                                <b>{topic.id}</b>
                            </TableCell>

                            <TableCell
                                align="center"
                                sx={{
                                    color: "var(--text-color)",
                                    width: "20%",
                                }}>
                                {topic.name}
                            </TableCell>

                            <TableCell
                                sx={{
                                    color: "var(--text-color)",
                                    maxWidth: { xs: 100, md: 150, lg: 200 },
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                                title={topic.note}
                            >
                                {topic.note}
                            </TableCell>

                            <TableCell
                                align="center"
                                sx={{
                                    color: "var(--text-color)",
                                    width: "20%",
                                }}>
                                {topic.numberOfCourses}
                            </TableCell>

                            <TableCell
                                align="center"
                                sx={{
                                    width: "10%",
                                    padding: 0,
                                }}
                            >
                                <IconButton size="small" sx={{ color: '#00d4ff' }}
                                    onClick={() => handleEdit(topic)}>
                                    <EditOutlined fontSize="small" />
                                </IconButton>
                                <IconButton size="small" sx={{ color: '#ff0000' }}
                                    onClick={() => handleDelete(topic.id)}>
                                    <DeleteOutline fontSize="small" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    {topicsData.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={3} align="center" sx={{
                                color: "var(--text-color)",
                            }}>
                                Không tìm thấy chủ đề nào.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}