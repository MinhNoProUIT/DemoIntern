'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts/core';
import {
    TooltipComponent,
    LegendComponent,
    GridComponent,
    ToolboxComponent,
    TitleComponent,
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'next-themes';

echarts.use([
    TooltipComponent,
    LegendComponent,
    GridComponent,
    ToolboxComponent,
    TitleComponent,
    LineChart,
    CanvasRenderer,
]);

const generateMockData = (days: number) => {
    const data: { date: string; value: number }[] = [];
    const now = new Date();

    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(now.getDate() - i);
        data.push({
            date: date.toLocaleDateString('vi-VN'),
            value: Math.floor(Math.random() * 100) + 1,
        });
    }

    return data;
};

const PostChart = () => {
    const chartRef = useRef<HTMLDivElement>(null);
    const [range, setRange] = useState('7');
    const [data, setData] = useState(generateMockData(7));

    const { t } = useTranslation("common");
    const { theme } = useTheme();

    useEffect(() => {
        if (!chartRef.current) return;

        echarts.dispose(chartRef.current);
        const chartInstance = echarts.init(chartRef.current);

        const option: echarts.EChartsCoreOption = {
            tooltip: {
                trigger: 'axis',
                backgroundColor: theme === "light" ? "rgba(250, 250, 250, 0.98)" : "rgba(20, 26, 25, 0.98)",
                textStyle: {
                    color: theme === "light" ? "#000000" : "#ffffff",
                },
            },
            legend: {
                top: 40,
                textStyle: {
                    color: theme === "light" ? "black" : "#fff",
                    fontFamily: "Arial, sans-serif",
                },
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: data.map((item) => item.date),
                axisLabel: {
                    color: theme === "light" ? "black" : "#fff",
                },
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    color: theme === "light" ? "black" : "#fff",
                },
            },
            series: [
                {
                    name: t("COMMON.POST.COUNT_POST"),
                    type: 'line',
                    smooth: true,
                    color: "#FFD700",
                    data: data.map((item) => item.value),
                },
            ],
        };

        chartInstance.setOption(option);

        return () => {
            chartInstance.dispose();
        };
    }, [data, theme, t]); // chỉ còn [data, theme]


    const handleChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        setRange(value);
        setData(generateMockData(parseInt(value)));
    };

    return (
        <Box
            sx={{
                p: 2,
                borderRadius: 4,
                backgroundColor: 'var(--background-item)',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography
                    variant="h6"
                    sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}
                >
                    {t("COMMON.POST.TITLE_CHART")}
                </Typography>
            </Box>
            <FormControl sx={{ mb: 2, minWidth: 200 }} size="small">
                <InputLabel
                    id="time-range-select-label"
                    sx={{ color: 'var(--text-color)' }}
                >
                    {t("COMMON.POST.CHOOSE_TIME")}
                </InputLabel>
                <Select
                    labelId="time-range-select-label"
                    value={range}
                    label={t("COMMON.POST.CHOOSE_TIME")}
                    sx={{
                        color: 'var(--text-color)',
                        '.MuiOutlinedInput-notchedOutline': {
                            borderColor: 'var(--text-color)',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'var(--text-color)',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'var(--text-color)',
                        },
                    }}
                    onChange={handleChange}
                >
                    <MenuItem value="7">
                        {t("COMMON.POST.7_DAYS")}
                    </MenuItem>
                    <MenuItem value="30">
                        {t("COMMON.POST.30_DAYS")}
                    </MenuItem>
                    <MenuItem value="90">
                        {t("COMMON.POST.90_DAYS")}
                    </MenuItem>
                </Select>
            </FormControl>

            <Box
                ref={chartRef}
                sx={{ height: 400, backgroundColor: 'var(--background-item)', }}
            />
        </Box>
    );
};

export default PostChart;
