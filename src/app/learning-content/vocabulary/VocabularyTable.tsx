"use client";

import React, { useState } from "react";
import {
    Box,
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
import { VisibilityOutlined, EditOutlined, DeleteOutline, } from "@mui/icons-material";
import { IWord } from "@/interfaces/word.interface";
import { useTranslation } from "react-i18next";

export const getTypeBgColor = (type: string) => {
    switch (type) {
        case "n":
            return "var(--bg-success-color1)";
        case "v":
            return "var(--bg-closed-color1)";
        case "adj":
            return "var(--bg-warning-color1)";
    }
}
export const getTypeTextColor = (type: string) => {
    switch (type) {
        case "n":
            return "var(--text-success-color1)";
        case "v":
            return "var(--text-closed-color1)";
        case "adj":
            return "var(--text-warning-color1)";
    }
}

export default function VocabularyTable({
    vocabularyData,
    searchKey,
    handleEdit,
    handleDelete,
}: {
    vocabularyData: IWord[],
    searchKey: string,
    handleEdit: (course: any) => void,
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

    const sortedVocabulary = [...vocabularyData].sort((a, b) => {
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
            }}
        >
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
                        <TableCell align="center" onClick={() => handleRequestSort('eng')}>
                            <TableSortLabel
                                active={orderBy === 'eng'}
                                direction={orderBy === 'eng' ? order : 'asc'}
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
                                <b>{t("COMMON.VOCABULARY.TABLE.eng")}</b>
                            </TableSortLabel>
                        </TableCell>
                        <TableCell align="center" onClick={() => handleRequestSort('vie')}>
                            <TableSortLabel
                                active={orderBy === 'vie'}
                                direction={orderBy === 'vie' ? order : 'asc'}
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
                                <b>{t("COMMON.VOCABULARY.TABLE.vie")}</b>
                            </TableSortLabel>
                        </TableCell>
                        <TableCell align="center" onClick={() => handleRequestSort('transcription')}>
                            <TableSortLabel
                                active={orderBy === 'transcription'}
                                direction={orderBy === 'transcription' ? order : 'asc'}
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
                                <b>{t("COMMON.VOCABULARY.TABLE.transcription")}</b>
                            </TableSortLabel>
                        </TableCell>
                        <TableCell align="center" onClick={() => handleRequestSort('type')}>
                            <TableSortLabel
                                active={orderBy === 'type'}
                                direction={orderBy === 'type' ? order : 'asc'}
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
                                <b>{t("COMMON.VOCABULARY.TABLE.type")}</b>
                            </TableSortLabel>
                        </TableCell>
                        <TableCell align="center" onClick={() => handleRequestSort('course')}>
                            <TableSortLabel
                                active={orderBy === 'course'}
                                direction={orderBy === 'course' ? order : 'asc'}
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
                                <b>{t("COMMON.VOCABULARY.TABLE.course")}</b>
                            </TableSortLabel>
                        </TableCell>
                        <TableCell align="center" onClick={() => handleRequestSort('example')}>
                            <TableSortLabel
                                active={orderBy === 'example'}
                                direction={orderBy === 'example' ? order : 'asc'}
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
                                <b>{t("COMMON.VOCABULARY.TABLE.example")}</b>
                            </TableSortLabel>
                        </TableCell>
                        <TableCell align="center" onClick={() => handleRequestSort('image')}>
                            <TableSortLabel
                                active={orderBy === 'image'}
                                direction={orderBy === 'image' ? order : 'asc'}
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
                                <b>{t("COMMON.VOCABULARY.TABLE.image")}</b>
                            </TableSortLabel>
                        </TableCell>
                        <TableCell align="center">
                            <b>{t("COMMON.TABLE.COMMON.ACTION")}</b>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedVocabulary.map((word) => (
                        <TableRow key={word.id} hover>
                            {/* ID */}
                            <TableCell
                                align="center"
                                sx={{
                                    color: "var(--text-color)",
                                    width: "5%",
                                    fontWeight: 'bold',
                                }}
                            >
                                {word.id}
                            </TableCell>

                            {/* Eng */}
                            <TableCell
                                align="center"
                                sx={{
                                    color: "var(--text-color)",
                                    maxWidth: { xs: 100, md: 150, },
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                                title={word.eng}
                            >
                                {word.eng}
                            </TableCell>

                            {/* Vie */}
                            <TableCell
                                align="center"
                                sx={{
                                    color: "var(--text-color)",
                                    maxWidth: { xs: 100, md: 150, },
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                                title={word.vie}
                            >
                                {word.vie}
                            </TableCell>

                            {/* Transcription */}
                            <TableCell
                                align="center"
                                sx={{
                                    color: "var(--text-color)",
                                    maxWidth: { xs: 100, md: 150, },
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                                title={word.transcription}
                            >
                                <i>/{word.transcription}/</i>
                            </TableCell>

                            {/* Type */}
                            <TableCell
                                align="center"
                                sx={{
                                    width: "10%",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'inline-flex',
                                        paddingX: 1.5,
                                        paddingY: 0.5,
                                        borderRadius: 2,
                                        backgroundColor: getTypeBgColor(word.type),
                                        color: getTypeTextColor(word.type),
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {word.type}
                                </Box>
                            </TableCell>

                            {/* Course */}
                            <TableCell
                                align="center"
                                sx={{
                                    color: "var(--text-color)",
                                    maxWidth: { xs: 100, md: 150, },
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                                title={word.course}
                            >
                                {word.course}
                            </TableCell>

                            {/* Example */}
                            <TableCell
                                align="center"
                                sx={{
                                    color: "var(--text-color)",
                                    maxWidth: { xs: 100, md: 150, },
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                                title={word.example}
                            >
                                {word.example}
                            </TableCell>

                            {/* Image */}
                            <TableCell
                                align="center"
                                sx={{
                                    color: "var(--text-color)",
                                    maxWidth: { xs: 100, md: 150, },
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                                title={word.image}
                            >
                                {word.image}
                            </TableCell>

                            {/* Action */}
                            <TableCell
                                align="center"
                                sx={{
                                    width: "10%",
                                    padding: 0,
                                }}
                            >
                                <IconButton size="small" sx={{ color: '#00d4ff' }}
                                    onClick={() => handleEdit(word)}>
                                    <EditOutlined fontSize="small" />
                                </IconButton>
                                <IconButton size="small" sx={{ color: '#ff0000' }}
                                    onClick={() => handleDelete(word.id)}>
                                    <DeleteOutline fontSize="small" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    {vocabularyData.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={9} align="center" sx={{
                                color: "var(--text-color)",
                            }}>
                                Không tìm thấy từ vựng nào.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}