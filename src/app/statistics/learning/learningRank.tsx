"use client";
import React from "react";

import { Avatar, Box, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Star } from "lucide-react";
import Image from "next/image";

interface learningCount {
  id: number;
  name: string;
  avt: string;
  exerciseCount: number;
}

const mockLearningCounts: learningCount[] = [
  {
    id: 1011155,
    name: "Nguyễn Thị Mai",
    avt: "", // Example avatar path
    exerciseCount: 12, // Number of exercises completed
  },
  {
    id: 1011156,
    name: "Trần Văn Khang",
    avt: "", // Can be an empty string if no avatar
    exerciseCount: 16,
  },
  {
    id: 1011156,
    name: "Lê Anh Tú",
    avt: "",
    exerciseCount: 10,
  },
  {
    id: 1011157,
    name: "Phạm Thuỳ Linh",
    avt: "", // Example remote URL
    exerciseCount: 10,
  },
  {
    id: 1011158,
    name: "Hoàng Minh Đức",
    avt: "",
    exerciseCount: 15,
  },
];

// Bạn có thể sử dụng mockLearningCounts trong component của mình
// Ví dụ: console.log(mockLearningCounts);

const rankLearningCounts = (data: learningCount[]) => {
  // Create a shallow copy before sorting to avoid mutating the original array
  return data.slice().sort((a, b) => b.exerciseCount - a.exerciseCount);
};

export default function LearningRank() {
  const { t } = useTranslation();
  // Use the ranked learning counts data
  const rankedLearners = rankLearningCounts(mockLearningCounts);
  return (
    <Box width="30%">
      <Paper
        sx={{
          width: "100%",
          height: "100%",
          boxShadow: "var(--box-shadow-paper)",
          overflow: "hidden",
          borderRadius: "20px",
          backgroundColor: "#6A5AE0",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            padding: "24px 24px 15px 24px",
            fontSize: "18px",
            fontWeight: "bold",
            color: "white",
          }}
        >
          {t("COMMON.POST.TITLE_TOP_RANKING")}
        </Typography>

        <Box>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              position: "relative",
            }}
          >
            <Image
              src="/images/group8.svg"
              alt="Group"
              width={100}
              height={100}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                zIndex: 1,
              }}
            />

            <Image
              src="/images/ovalCopy.svg"
              alt="Oval"
              width={80}
              height={80}
              style={{
                position: "absolute",
                top: 95,
                right: 120,
                zIndex: 2,
              }}
            />

            <Box
              sx={{
                width: "100%",
                height: "100%",
                position: "relative",
                display: "flex", // Sử dụng Flexbox
                flexDirection: "column", // Đặt các phần tử con theo chiều dọc
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  padding: "24px",
                  height: "400px",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    height: "100%",
                    mt: "175px",
                    mr: "44px",
                  }}
                >
                  <Box
                    sx={{
                      width: "calc(100% / 3)",
                      height: "100%",
                      position: "relative",
                      mt: "-30px",
                      backgroundImage: "url(/images/rank-2.svg)",
                      backgroundSize: "contain",
                      backgroundPosition: "center top",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <Box
                      sx={{
                        width: "60px",
                        height: "60px",
                        position: "absolute",
                        left: "calc(50%)",
                        borderRadius: "50%",
                        transform: "translateX(-50%)",
                        top: "-165px",
                        border: "2px solid #00D95F",
                        zIndex: 1,
                        overflow: "visible", // Cho phép phần tử con thoát ra ngoài
                        // Thêm ::after để tạo hình vuông
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          bottom: "-8px", // Đặt hình vuông vào cuối avatar
                          left: "50%", // Căn giữa hình vuông
                          width: "17px", // Kích thước hình vuông
                          height: "17px",
                          borderRadius: "4px", // Bo tròn hình vuông
                          backgroundColor: "#00D95F", // Màu nền của hình vuông
                          transform: "translateX(-50%) rotate(45deg)", // Xoay hình vuông 45 độ
                          zIndex: 2, // Đặt hình vuông phía sau avatar
                        },
                        "&::before": {
                          content: '"2"', // Nội dung hiển thị số 1
                          position: "absolute",
                          bottom: "-5px", // Đặt số 1 vào cùng vị trí với hình vuông
                          left: "50%", // Căn giữa số 1
                          transform: "translateX(-50%)", // Đảm bảo số 1 không bị xoay
                          zIndex: 3, // Đặt số 1 lên trên hình vuông
                          display: "flex", // Sử dụng flex để căn giữa
                          justifyContent: "center", // Căn giữa theo chiều ngang
                          alignItems: "center", // Căn giữa theo chiều dọc
                          fontSize: "10px", // Kích thước chữ
                          color: "white", // Màu chữ
                          fontWeight: "bold", // Đậm chữ
                        },
                      }}
                    >
                      <Avatar
                        src={rankedLearners[1]?.avt}
                        sx={{
                          position: "absolute",
                          width: "60px",
                          height: "60px",
                        }}
                      ></Avatar>
                    </Box>
                    <Typography
                      sx={{
                        position: "absolute",
                        right: "50%",
                        transform: "translateX(50%)",
                        fontSize: "15px",
                        color: "white",
                        zIndex: 2,
                        fontWeight: "bold",
                        top: "-85px", // Đặt thấp hơn để tránh đè lên exerciseCount
                        width: "80%", // Giới hạn chiều rộng
                        maxWidth: "120px", // Tùy theo layout
                        textAlign: "center", // Căn giữa chữ
                        wordWrap: "break-word", // Cho phép xuống dòng
                        lineHeight: "18px",
                      }}
                    >
                      {rankedLearners[1]?.name}
                    </Typography>

                    <Typography
                      sx={{
                        position: "absolute",
                        right: "50%",
                        fontSize: "16px",
                        color: "white",
                        borderRadius: "8px",
                        padding: "4px 7px",
                        whiteSpace: "nowrap",
                        backgroundColor: "#9087E5",
                        fontWeight: "bold",
                        transform: "translateX(50%)",
                        top: "-40px",
                      }}
                    >
                      {rankedLearners[1].exerciseCount +
                        " " +
                        t("COMMON.BUOIHOC")}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      backgroundImage: "url(/images/rank-1.svg)", // Gradient nền mượt mà
                      width: "calc(100% / 3)",
                      height: "100%",
                      mt: "-60px",
                      zIndex: 2,
                      backgroundSize: "contain",
                      backgroundPosition: "center top",
                      backgroundRepeat: "no-repeat",
                      position: "relative",
                    }}
                  >
                    <Box
                      sx={{
                        width: "70px",
                        height: "70px",
                        position: "absolute",
                        left: "50%",
                        borderRadius: "50%",
                        transform: "translateX(-50%)",
                        top: "-165px",
                        border: "2px solid #FFAA00",
                        zIndex: 1,
                        overflow: "visible", // Cho phép phần tử con thoát ra ngoài
                        // Thêm ::after để tạo hình vuông
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          bottom: "-8px", // Đặt hình vuông vào cuối avatar
                          left: "50%", // Căn giữa hình vuông
                          width: "17px", // Kích thước hình vuông
                          height: "17px",
                          borderRadius: "4px", // Bo tròn hình vuông
                          backgroundColor: "#FFAA00", // Màu nền của hình vuông
                          transform: "translateX(-50%) rotate(45deg)", // Xoay hình vuông 45 độ
                          zIndex: 2, // Đặt hình vuông phía sau avatar
                        },
                        "&::before": {
                          content: '"1"', // Nội dung hiển thị số 1
                          position: "absolute",
                          bottom: "-5px", // Đặt số 1 vào cùng vị trí với hình vuông
                          left: "50%", // Căn giữa số 1
                          transform: "translateX(-50%)", // Đảm bảo số 1 không bị xoay
                          zIndex: 3, // Đặt số 1 lên trên hình vuông
                          display: "flex", // Sử dụng flex để căn giữa
                          justifyContent: "center", // Căn giữa theo chiều ngang
                          alignItems: "center", // Căn giữa theo chiều dọc
                          fontSize: "10px", // Kích thước chữ
                          color: "white", // Màu chữ
                          fontWeight: "bold", // Đậm chữ
                        },
                      }}
                    >
                      <Avatar
                        src={rankedLearners[0]?.avt}
                        sx={{
                          position: "absolute",
                          width: "70px",
                          height: "70px",
                        }}
                      ></Avatar>
                    </Box>

                    <Image
                      src="/images/leader-board.svg"
                      alt="Leader Board"
                      width={30}
                      height={60}
                      style={{
                        position: "absolute",
                        top: "-175px",
                        left: "calc(50% - 30px)",
                        transform: "translateX(-50%) rotate(324deg)",
                        zIndex: 1,
                      }}
                    />

                    <Typography
                      sx={{
                        position: "absolute",
                        right: "50%",
                        transform: "translateX(50%)",
                        fontSize: "15px",
                        color: "white",
                        zIndex: 2,
                        fontWeight: "bold",
                        top: "-85px", // Đặt thấp hơn để tránh đè lên exerciseCount
                        width: "80%", // Giới hạn chiều rộng
                        maxWidth: "120px", // Tùy theo layout
                        textAlign: "center", // Căn giữa chữ
                        wordWrap: "break-word", // Cho phép xuống dòng
                        lineHeight: "18px",
                      }}
                    >
                      {rankedLearners[0]?.name}
                    </Typography>

                    <Typography
                      sx={{
                        position: "absolute",
                        right: "50%",
                        fontSize: "16px",
                        color: "white",
                        borderRadius: "8px",
                        padding: "4px 7px",
                        whiteSpace: "nowrap",
                        backgroundColor: "#9087E5",
                        fontWeight: "bold",
                        transform: "translateX(50%)",
                        top: "-40px",
                      }}
                    >
                      {rankedLearners[0]?.exerciseCount +
                        " " +
                        t("COMMON.BUOIHOC")}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      backgroundImage: "url(/images/rank-3.svg)", // Gradient nền mượt mà
                      width: "calc(100%/ 3)",
                      mt: "10px",
                      height: "100%",
                      backgroundSize: "contain",
                      backgroundPosition: "center top",
                      backgroundRepeat: "no-repeat",
                      position: "relative",
                    }}
                  >
                    <Box
                      sx={{
                        width: "60px",
                        height: "60px",
                        position: "absolute",
                        borderRadius: "50%",
                        right: "50%",
                        transform: "translateX(50%)",
                        top: "-165px",
                        border: "2px solid red",
                        zIndex: 1,
                        overflow: "visible", // Cho phép phần tử con thoát ra ngoài
                        // Thêm ::after để tạo hình vuông
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          bottom: "-8px", // Đặt hình vuông vào cuối avatar
                          left: "50%", // Căn giữa hình vuông
                          width: "17px", // Kích thước hình vuông
                          height: "17px",
                          borderRadius: "4px", // Bo tròn hình vuông
                          backgroundColor: "red", // Màu nền của hình vuông
                          transform: "translateX(-50%) rotate(45deg)", // Xoay hình vuông 45 độ
                          zIndex: 2, // Đặt hình vuông phía sau avatar
                        },
                        "&::before": {
                          content: '"3"', // Nội dung hiển thị số 1
                          position: "absolute",
                          bottom: "-5px", // Đặt số 1 vào cùng vị trí với hình vuông
                          left: "50%", // Căn giữa số 1
                          transform: "translateX(-50%)", // Đảm bảo số 1 không bị xoay
                          zIndex: 3, // Đặt số 1 lên trên hình vuông
                          display: "flex", // Sử dụng flex để căn giữa
                          justifyContent: "center", // Căn giữa theo chiều ngang
                          alignItems: "center", // Căn giữa theo chiều dọc
                          fontSize: "10px", // Kích thước chữ
                          color: "white", // Màu chữ
                          fontWeight: "bold", // Đậm chữ
                        },
                      }}
                    >
                      <Avatar
                        src={rankedLearners[2]?.avt}
                        sx={{
                          position: "absolute",
                          width: "60px",
                          height: "60px",
                        }}
                      ></Avatar>
                    </Box>

                    <Typography
                      sx={{
                        position: "absolute",
                        right: "50%",
                        transform: "translateX(50%)",
                        fontSize: "15px",
                        color: "white",
                        zIndex: 2,
                        fontWeight: "bold",
                        top: "-85px", // Đặt thấp hơn để tránh đè lên exerciseCount
                        width: "80%", // Giới hạn chiều rộng
                        maxWidth: "120px", // Tùy theo layout
                        textAlign: "center", // Căn giữa chữ
                        wordWrap: "break-word", // Cho phép xuống dòng
                        lineHeight: "18px",
                      }}
                    >
                      {rankedLearners[2]?.name}
                    </Typography>

                    <Typography
                      sx={{
                        position: "absolute",
                        right: "50%",
                        fontSize: "16px",
                        color: "white",
                        borderRadius: "8px",
                        padding: "4px 7px",
                        whiteSpace: "nowrap",
                        backgroundColor: "#9087E5",
                        fontWeight: "bold",
                        transform: "translateX(50%)",
                        top: "-40px",
                      }}
                    >
                      {rankedLearners[2]?.exerciseCount +
                        " " +
                        t("COMMON.BUOIHOC")}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  position: "absolute", // Bắt buộc để z-index hoạt động
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "left",
                  bottom: "-200px",
                  width: "calc(100% - 20px)",
                  left: "50%",
                  padding: "45px 0px 2px 0px",
                  transform: "translateX(-50%)",
                  backgroundImage: "url(/images/userRank.svg)",
                  backgroundSize: "cover",
                  fontSize: "20px",
                  height: "290px",
                  // overflow: "hidden",
                  borderRadius: "0 0 12px 12px",
                  zIndex: 3,
                }}
              >
                <Box
                  sx={{
                    maxHeight: 500,
                    overflow: "auto",
                    scrollbarGutter: "stable",
                    padding: "0 1px 7px 7px",
                    "&::-webkit-scrollbar": {
                      width: "7px",
                      height: "7px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "#cecece",
                      borderRadius: "10px",
                    },
                    pr: 1,
                  }}
                >
                  {rankedLearners.map((user, index) => (
                    <Box
                      key={index}
                      sx={{
                        "&:hover": {
                          backgroundColor: "var(--hover-color)",
                          cursor: "pointer",
                        },
                        borderRadius: "10px",
                        padding: "5px 6px",
                        display: "flex",
                        justifyContent: "left",
                        alignItems: "center",
                      }}
                    >
                      {index === 0 ? (
                        <Image
                          src="/images/cup.svg"
                          alt="Cup"
                          width={20}
                          height={20}
                          style={{ marginRight: "15px" }}
                        />
                      ) : (
                        <Box
                          sx={{
                            color: "white",
                            fontSize: "13px",
                            borderRadius: "50%",
                            border:
                              index === 0
                                ? "1px solid #FFAA00"
                                : index === 1
                                ? "1px solid #00D95F"
                                : index === 2
                                ? "1px solid red"
                                : "1px solid rgb(59, 59, 59)",
                            width: "20px",
                            height: "20px",
                            display: "flex",
                            backgroundColor:
                              index === 0
                                ? "#FFAA00"
                                : index === 1
                                ? "#00D95F"
                                : index === 2
                                ? "red"
                                : "rgb(59, 59, 59)",
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: "15px",
                          }}
                        >
                          {index + 1}
                        </Box>
                      )}
                      <Box>
                        <Avatar
                          sx={{
                            mr: "12px",
                            width: "45px",
                            height: "45px",
                          }}
                          src={
                            user.avt ||
                            "https://localhost:44381/avatars/aa1678f0-75b0-48d2-ae98-50871178e9bd.jfif"
                          }
                        />
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            color: "#0C092A",
                            fontWeight: "bold",
                            fontSize: "16px",
                          }}
                        >
                          {user.name}
                        </Typography>
                        <Typography
                          sx={{
                            color: "#858494",
                            fontSize: "14px",
                          }}
                        >
                          {user.id}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          fontSize: "16px",
                          color: "white",
                          marginLeft: "auto",
                          borderRadius: "8px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "4px 7px",
                          whiteSpace: "nowrap",
                          backgroundColor: "#37cf79e6",
                          fontWeight: "bold",
                        }}
                      >
                        <Star
                          size={16}
                          style={{
                            color: "#FFAA00",
                            fill: "#FFAA00",
                            verticalAlign: "middle",
                            marginRight: "6px",
                          }}
                        />
                        {user.exerciseCount}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
