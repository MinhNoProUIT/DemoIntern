import { Avatar, Box, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Star } from "lucide-react";
import { IPostListItem } from "@/interfaces/post.interface";
import Image from "next/image";

const mockPosts: IPostListItem[] = [
  {
    id: 10111606,
    title: "Button on home page is unresponsive",
    createdBy: "Trần Minh",
    createdById: "U001",
    createdByAvatar:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/11/tai-hinh-nen-dep-mien-phi.jpg",
    createdDate: new Date(),
    totalPosts: 8,
    likesCount: 12,
    sharesCount: 4,
    isReported: true,
  },
  {
    id: 10111607,
    title: "Image not loading on profile page",
    createdBy: "Cao Dương Lâm",
    createdById: "U002",
    createdByAvatar:
      "https://r2.nucuoimekong.com/wp-content/uploads/buc-anh-dep-can-bang-sang-tot-1.jpg",
    createdDate: new Date("2024-12-10T14:48:00"),
    totalPosts: 6,
    likesCount: 20,
    sharesCount: 6,
    isReported: true,
  },
  {
    id: 10111608,
    title: "Crash when clicking settings",
    createdBy: "Bùi Thị Phương Huyền",
    createdById: "U003",
    createdByAvatar:
      "https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg",
    createdDate: new Date("2024-12-01T09:20:00"),
    totalPosts: 5,
    likesCount: 35,
    sharesCount: 12,
    isReported: true,
  },
  {
    id: 10111601,
    title: "Login fails with correct credentials",
    createdBy: "Đỗ Văn Phong",
    createdById: "U004",
    createdByAvatar:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/08/anh-nguoi-mau-25.jpg",
    createdDate: new Date("2024-11-25T11:10:00"),
    totalPosts: 7,
    likesCount: 9,
    sharesCount: 3,
    isReported: false,
  },
  {
    id: 10111605,
    title: "Cannot upload avatar",
    createdBy: "Lê Xuân Nam",
    createdById: "U005",
    createdByAvatar:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/08/anh-nguoi-mau-25.jpg",
    createdDate: new Date("2024-11-20T10:30:00"),
    totalPosts: 4,
    likesCount: 25,
    sharesCount: 5,
    isReported: true,
  },
  {
    id: 6,
    title: "Page freezes when scrolling",
    createdBy: "Lương Văn E",
    createdById: "U006",
    createdByAvatar:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/08/anh-nguoi-mau-25.jpg",
    createdDate: new Date("2024-11-18T08:45:00"),
    totalPosts: 3,
    likesCount: 17,
    sharesCount: 2,
    isReported: false,
  },
];

const aggregateEmployees = () => {
  const map = new Map<
    string,
    { id: string; name: string; avatar: string; count: number }
  >();

  for (const post of mockPosts) {
    if (!map.has(post.createdById)) {
      map.set(post.createdById, {
        id: post.createdById,
        name: post.createdBy,
        avatar: post.createdByAvatar,
        count: post.totalPosts,
      });
    } else {
      const existing = map.get(post.createdById)!;
      existing.count += post.totalPosts;
    }
  }

  return Array.from(map.values()).sort((a, b) => b.count - a.count);
};

function RankLike() {
  const { t } = useTranslation("common");

  const employees = aggregateEmployees();

  const topFive = mockPosts
    .sort((a, b) => b.totalPosts - a.totalPosts)
    .slice(0, 5)
    .map((item) => ({
      id: item.id,
      name: item.createdBy,
      avatar: item.createdByAvatar,
      count: item.totalPosts,
    }));

  return (
    <Box width="35%">
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
                        top: "-145px",
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
                        src={employees[1]?.avatar}
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
                        transform: "translateX(30%)",
                        fontSize: "15px",
                        alignItems: "center",
                        fontWeight: "bold",
                        color: "white",
                        top: "-70px",
                      }}
                    >
                      {employees[1]?.name}
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
                      {employees[1].count + " " + t("COMMON.POST.COUNT_POSTS")}
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
                        top: "-155px",
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
                        src={employees[0]?.avatar}
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
                        transform: "translateX(50%)",
                        fontSize: "15px",
                        fontWeight: "bold",
                        color: "white",
                        top: "-70px",
                      }}
                    >
                      {employees[0]?.name}
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
                      {employees[0]?.count + " " + t("COMMON.POST.COUNT_POSTS")}
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
                        top: "-145px",
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
                        src={employees[2]?.avatar}
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
                        transform: "translateX(10%)",
                        fontSize: "15px",
                        color: "white",
                        zIndex: 2,
                        fontWeight: "bold",
                        top: "-70px",
                      }}
                    >
                      {employees[2]?.name}
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
                      {employees[2]?.count + " " + t("COMMON.POST.COUNT_POSTS")}
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
                    maxHeight: 300,
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
                  {topFive.map((user, index) => (
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
                            user.avatar ||
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
                        {user.count}
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

export default RankLike;
