
import { Box, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Paper } from '@mui/material';
import { TrendingDown, TrendingUp } from 'lucide-react';
import Image from 'next/image';

const RatioPost = () => {
    const { t } = useTranslation("common");

    const totalPosts = 100;
    const percentPost = 10;
    const totalUsers = 45;
    const percentUser = -5;

    return (
        <Box
            sx={{
                display: 'flex',
                gap: 2,
                flexDirection: 'row',
                width: '100%',
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    flex: 1,
                    backgroundImage: "linear-gradient(135deg, #ffdec9, #ffdec9)",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    borderRadius: "15px",
                    padding: "20px 22px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Box>
                        <Typography variant="subtitle2" fontWeight="bold" color="text.secondary">
                            {t("COMMON.POST.TOTAL_POST")}
                        </Typography>
                        <Typography variant="h4" fontWeight="bold">
                            {totalPosts}
                        </Typography>
                    </Box>
                    <Box>
                        <Image
                            src="/images/icon_test.jpg"
                            alt="Post Icon"
                            width={60}
                            height={60}
                            style={{
                                borderRadius: 8,
                                //boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                            }}
                        />
                    </Box>

                </Box>
                <Box
                    sx={{
                        mt: "10px",
                        color: !(!percentPost || percentPost >= 0)
                            ? "#F93C65"
                            : "#00B69B",
                        fontSize: "16px",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    {percentPost !== undefined &&
                        (!(!percentPost || percentPost >= 0) ? (
                            <TrendingDown style={{ marginRight: "6px" }} />
                        ) : (
                            <TrendingUp style={{ marginRight: "6px" }} />
                        ))}
                    {percentPost !== undefined ? percentPost + "%" : "N/A"}
                    {/*t('COMMON.DASHBOARD.NO_CHANGE')*/}
                    <Typography
                        sx={{
                            ml: "6px",
                            color: "#9e3c00",
                            fontSize: "16px",
                        }}
                    >
                        {t("COMMON.DASHBOARD.FROM_LAST_QUARTER")}
                    </Typography>
                </Box>
            </Paper>

            <Paper
                elevation={0}
                sx={{
                    flex: 1,
                    backgroundImage: "linear-gradient(135deg, #e2f0cb, #e2f0cb)",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    borderRadius: "15px",
                    padding: "20px 22px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Box>
                        <Typography variant="subtitle2" fontWeight="bold" color="text.secondary">
                            {t("COMMON.POST.TOTAL_USER_POST")}
                        </Typography>
                        <Typography variant="h4" fontWeight="bold">
                            {totalUsers}
                        </Typography>
                    </Box>
                    <Box>
                        <Image
                            src="/images/icon_test.jpg"
                            alt="Post Icon"
                            width={60}
                            height={60}
                            style={{
                                borderRadius: 8,
                                //boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                            }}
                        />
                    </Box>

                </Box>
                <Box
                    sx={{
                        mt: "10px",
                        color: !(!percentUser || percentUser >= 0)
                            ? "#F93C65"
                            : "#00B69B",
                        fontSize: "16px",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    {percentUser !== undefined &&
                        (!(!percentUser || percentUser >= 0) ? (
                            <TrendingDown style={{ marginRight: "6px" }} />
                        ) : (
                            <TrendingUp style={{ marginRight: "6px" }} />
                        ))}
                    {percentUser !== undefined ? percentUser + "%" : "N/A"}
                    <Typography
                        sx={{
                            ml: "6px",
                            color: "#9e3c00",
                            fontSize: "16px",
                        }}
                    >
                        {t("COMMON.DASHBOARD.FROM_LAST_QUARTER")}
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default RatioPost;