'use client';

import { Box } from '@mui/material';
import RatioPost from './RatioPost';
import PostChart from './PostChart';
import TablePost from './TablePost';
import RankLike from './RankLike';
import ReportPost from './ReportPost';

export default function PostManagementPage() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                backgroundColor: 'var(--background-color)',
                p: 2,
                maxWidth: '100vw', // Giới hạn chiều rộng màn hình
                overflowX: 'auto', // Nếu có nội dung quá rộng, nó sẽ có thanh cuộn ngang
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 4,
                    flexWrap: 'wrap',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4,
                        flex: 1,
                        minWidth: 0,
                    }}
                >
                    <RatioPost />
                    <PostChart />
                </Box>

                <RankLike />
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 4,
                    flex: 1,
                    minWidth: 0,
                }}
            >
                <TablePost />
                <ReportPost />
            </Box>
        </Box>
    );
}
