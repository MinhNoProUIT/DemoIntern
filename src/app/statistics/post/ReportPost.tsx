import React, { useRef, useState } from "react";
import Slider from "react-slick";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Box,
  Paper,
  Divider,
} from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Building, ChevronLeft, ChevronRight, IdCard } from "lucide-react";
import { useTranslation } from "react-i18next";
import { IReportListItem } from "@/interfaces/report.interfacce";
import { formatDate } from "@/utils/formatDate";

const mockReportList: IReportListItem[] = [
  {
    id: "10111606",
    title: "Báo cáo bài viết không phù hợp",
    content: "Bài viết chứa nội dung không phù hợp với cộng đồng.",
    createdAt: "2025-04-27T08:30:00Z",
    status: "pending",
    authorId: "user123",
    authorName: "Trần Văn Minh",
    authorAvatar:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/11/tai-hinh-nen-dep-mien-phi.jpg",

    postId: "post789",
    image: "https://picsum.photos/id/1015/400/300", // ảnh bài viết
  },
  {
    id: "10111607",
    title: "Báo cáo spam",
    content: "Bài viết bị nghi ngờ là spam quảng cáo sản phẩm.",
    createdAt: "2025-04-26T14:15:00Z",
    status: "resolved",
    authorId: "user456",
    authorName: "Cao Dương Lâm",
    authorAvatar:
      "https://r2.nucuoimekong.com/wp-content/uploads/buc-anh-dep-can-bang-sang-tot-1.jpg",

    postId: "post456",
    image: "https://picsum.photos/id/1025/400/300",
  },
  {
    id: "10111608",
    title: "Báo cáo nội dung vi phạm",
    content: "Nội dung bài viết có yếu tố phân biệt đối xử.",
    createdAt: "2025-04-25T10:00:00Z",
    status: "rejected",
    authorId: "user789",
    authorName: "Bùi Thị Thanh Huyền",
    authorAvatar:
      "https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg",
    postId: "post123",
    image: "https://picsum.photos/id/1035/400/300",
  },
];

export default function ReportPost() {
  const sliderRef = useRef<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useTranslation("common");

  const settings = {
    dots: false,
    infinite: false,
    autoplaySpeed: 1000,
    cssEase: "ease-out",
    speed: 500,
    swipeToSlide: true,
    waitForAnimate: false,
    slidesToShow: 1,
    adaptiveHeight: true,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (current: number, next: number) => {
      setCurrentSlide(next);
    },
  };

  const isFirstSlide = currentSlide === 0;
  const isLastSlide = currentSlide === mockReportList.length - 1;

  const handleNext = () => {
    const nextSlide =
      currentSlide + 1 >= mockReportList.length
        ? mockReportList.length - 1
        : currentSlide + 1;
    sliderRef.current?.slickGoTo(nextSlide);
  };

  const handlePrev = () => {
    const prevSlide = currentSlide - 1 < 0 ? 0 : currentSlide - 1;
    sliderRef.current?.slickGoTo(prevSlide);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: "35%",
        padding: "24px 0",
        backgroundColor: "var(--background-item)",
        borderRadius: "15px",
        height: "774px",
        display: "flex",
        boxShadow: 4,
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          padding: "0 17px 0 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "top",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "var(--text-color)",
          }}
        >
          {t("COMMON.COURSE.TITLE_REPORT")}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onClick={handlePrev}
            sx={{
              color: "gray",
              minWidth: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 1,
              borderRadius: "50%",
              padding: 0.5,
              "&:hover": {
                backgroundColor: "var(--hover-color)",
              },
            }}
            disabled={isFirstSlide}
          >
            <ChevronLeft />
          </Button>
          <Button
            onClick={handleNext}
            sx={{
              color: "gray",
              mr: 0,
              minWidth: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 1,
              borderRadius: "50%",
              padding: 0.5,
              "&:hover": {
                backgroundColor: "var(--hover-color)",
              },
            }}
            disabled={isLastSlide}
          >
            <ChevronRight />
          </Button>
        </Box>
      </Box>

      <Typography
        variant="body2"
        sx={{
          color: "var(--sub-title-color)",
          padding: "0 24px",
          marginBottom: 3,
          mt: "0px",
        }}
      >
        {mockReportList.length} {t("COMMON.COURSE.TOTAL_REPORT")}
      </Typography>

      <Box
        sx={{
          flexGrow: 1,
          scrollbarGutter: "stable",
          "&::-webkit-scrollbar": {
            width: "7px",
            height: "7px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "var(--scrollbar-color)",
            borderRadius: "10px",
          },
          overflowY: "auto",
        }}
      >
        <Slider ref={sliderRef} {...settings}>
          {mockReportList.map((report, index) => (
            <Card
              key={index}
              sx={{
                backgroundColor: "transparent",
                boxShadow: "none",
                height: "auto",
                display: "block",
              }}
            >
              <CardContent
                sx={{
                  padding: "0 17px 0 24px",
                  paddingBottom: "10px!important",
                  overflow: "auto",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 2,
                  }}
                >
                  <Avatar
                    sx={{ marginRight: 2, height: "48px", width: "48px" }}
                    src={report.authorAvatar}
                    alt={report.authorName}
                  />
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: "bold",
                        fontSize: "14px",
                        color: "var(--text-color)",
                      }}
                    >
                      {report.authorName}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "12px",
                        color: "var(--created-date-color)",
                        mt: "4px",
                      }}
                    >
                      {t("COMMON.DASHBOARD.POSTED")}{" "}
                      {formatDate(report.createdAt)}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: 2,
                    padding: "14px 16px",
                    borderRadius: "10px",
                    gap: "10px",
                    border: "1px solid var(--border-color)",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "#00b8d9",
                      gap: "10px",
                    }}
                  >
                    <Building />
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "14px", fontWeight: "bold" }}
                    >
                      {t("COMMON.COURSE.POST_ID") + ": "}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "14px",
                        color: "var(--text-color)",
                        fontWeight: "bold",
                      }}
                    >
                      {report.postId}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "#22c55e",
                      gap: "10px",
                    }}
                  >
                    <IdCard />
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "14px", fontWeight: "bold" }}
                    >
                      {t("COMMON.COURSE.USER_ID") + ": "}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "14px",
                        color: "var(--text-color)",
                        fontWeight: "bold",
                      }}
                    >
                      {report.authorId}
                    </Typography>
                  </Box>
                </Box>

                <Typography
                  variant="body2"
                  sx={{
                    marginBottom: 1,
                    fontWeight: "bold",
                    fontStyle: "italic",
                    fontSize: "14px",
                    color: "var(--text-color)",
                  }}
                >
                  {t("COMMON.DASHBOARD.REASON") + ":"} {report.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    marginBottom: 2,
                    fontSize: "14px",
                    color: "var(--text-color)",
                  }}
                >
                  {report.content}
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    marginTop: 2,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    component="img"
                    src={report.image}
                    alt="Post Image"
                    sx={{
                      width: "100%",
                      maxWidth: "500px",
                      borderRadius: "10px",
                      objectFit: "cover",
                      boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          ))}
        </Slider>
      </Box>

      <Divider
        sx={{
          margin: "0px 0 24px 0", // Đẩy divider xuống dưới
          backgroundColor: "var(--divider-color)",
        }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "content",
          alignItems: "center",
          padding: "0 24px ",
          gap: "16px",
        }}
      >
        <Button
          variant="contained"
          color="error"
          sx={{
            flex: 1,
            fontSize: "14px",
            fontWeight: "bold",
            height: "36x",
            color: "var(--text-button-reject)",
            backgroundColor: "var(--bg-button-reject)",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "var(--bg-button-reject-hover)",
            },
            textTransform: "none",
          }}
        >
          {t("COMMON.DASHBOARD.REJECT")}
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{
            flex: 1,
            fontSize: "14px",
            fontWeight: "bold",
            height: "36x",
            color: "var(--text-button-accept)",
            backgroundColor: "var(--bg-button-accept)",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "var(--bg-button-accept-hover)",
            },
            textTransform: "none",
          }}
        >
          {t("COMMON.DASHBOARD.ACCEPT")}
        </Button>
      </Box>
    </Paper>
  );
}
