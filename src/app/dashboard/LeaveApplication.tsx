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
  Chip,
} from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Building,
  ChevronLeft,
  ChevronRight,
  IdCard,
  UserRoundCog,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import Loading from "@/components/Loading";
import { formatDate } from "@/utils/formatDate";
const mockTimeOffData: ITimeOffS[] = [
  {
    Id: 1,
    StartDate: "2025-06-07",
    EndDate: "2025-06-12",
    IsAccepted: false,
    Reason: "Cá nhân",
    Content: "Từ vựng apple có nghĩa bị lỗi.",
    CreatedDate: "2025-04-01",
    FullName: "Trần Văn Minh",
    Roles: ["Người dùng"],
    EmployeeId: "10111206",
    AvatarPath: "",
    Department: "Vegetables",
  },
  {
    Id: 1,
    StartDate: "2025-06-07",
    EndDate: "2025-06-12",
    IsAccepted: false,
    Reason: "Cá nhân",
    Content: "Từ vựng banana có nghĩa bị lỗi.",
    CreatedDate: "2025-04-01",
    FullName: "Trần Văn Minh",
    Roles: ["Người dùng"],
    EmployeeId: "10111206",
    AvatarPath: "",
    Department: "Vegetables",
  },
];

interface ITimeOffS {
  Id: number;
  StartDate: string;
  EndDate: string;
  IsAccepted: boolean;
  Reason: string;
  Content: string;
  CreatedDate: string;
  FullName: string;
  Roles: string[];
  EmployeeId: string;
  AvatarPath: string;
  Department: string;
}

export default function LeaveRequestCarousel() {
  const sliderRef = useRef<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useTranslation("common");

  const isLoading = false;
  const refetch = () => {};
  const dataTimeOff: ITimeOffS[] = mockTimeOffData;

  const leaveRequests = dataTimeOff.map((item) => ({
    Id: item.Id,
    FullName: item.FullName || "N/A",
    Roles: item.Roles,
    CreatedDate: item.CreatedDate || "N/A",
    Department: item.Department || "N/A",
    EmployeeId: item.EmployeeId || "N/A",
    Reason: item.Reason || "N/A",
    Content: item.Content || "N/A",
    StartDate: item.StartDate || "N/A",
    EndDate: item.EndDate || "N/A",
    AvatarPath: item.AvatarPath || "N/A",
  }));

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
  const isLastSlide = currentSlide === leaveRequests.length - 1;

  const handleNext = () => {
    const nextSlide =
      currentSlide + 1 >= leaveRequests.length
        ? leaveRequests.length - 1
        : currentSlide + 1;
    sliderRef.current?.slickGoTo(nextSlide);
  };

  const handlePrev = () => {
    const prevSlide = currentSlide - 1 < 0 ? 0 : currentSlide - 1;
    sliderRef.current?.slickGoTo(prevSlide);
  };

  const handleButtonClick = () => {
    //await updateIsAccepted({ id: dataTimeOff[currentSlide]?.Id, isAccepted })
    refetch();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        padding: "24px 0",
        backgroundColor: "var(--background-item)",
        borderRadius: "15px",
        height: "605px",
        boxShadow: "var(--box-shadow-paper)",
        display: "flex",
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
          {t("COMMON.BAOCAOLOI")}
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
        {leaveRequests.length} {t("COMMON.DASHBOARD.REQUESTS")}
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
          {leaveRequests.map((request, index) => (
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
                    src={request.AvatarPath}
                    alt={request.FullName}
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
                      {request.FullName}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "12px",
                        color: "var(--created-date-color)",
                        mt: "4px",
                      }}
                    >
                      {t("COMMON.DASHBOARD.POSTED")} {request.CreatedDate}
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
                      {t("COMMON.DASHBOARD.DEPARTMENT") + ": "}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "14px",
                        color: "var(--text-color)",
                        fontWeight: "bold",
                      }}
                    >
                      {request.Department}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "#ff5630",
                      gap: "10px",
                    }}
                  >
                    <UserRoundCog />
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "14px", fontWeight: "bold" }}
                    >
                      {t("COMMON.DASHBOARD.ROLES") + ": "}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "14px",
                        color: "var(--text-color)",
                        fontWeight: "bold",
                      }}
                    >
                      {request.Roles?.join(", ") || "N/A"}
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
                      {t("COMMON.DASHBOARD.EMPLOYEE_ID") + ": "}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "14px",
                        color: "var(--text-color)",
                        fontWeight: "bold",
                      }}
                    >
                      {request.EmployeeId}
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
                  {t("COMMON.DASHBOARD.REASON") + ":"} {request.Reason}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    marginBottom: 2,
                    fontSize: "14px",
                    color: "var(--text-color)",
                  }}
                >
                  {request.Content}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Chip
                    label={formatDate(request.StartDate)}
                    sx={{
                      fontSize: "13px",
                      fontWeight: "bold",
                      color: "var(--text-color)",
                      backgroundColor: "var(--chip-bg-color)",
                    }}
                  />
                  <Chip
                    label={formatDate(request.EndDate)}
                    sx={{
                      fontSize: "13px",
                      fontWeight: "bold",
                      color: "var(--text-color)",
                      backgroundColor: "var(--chip-bg-color)",
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
          onClick={() => handleButtonClick()}
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
          onClick={() => handleButtonClick()}
        >
          {t("COMMON.DASHBOARD.ACCEPT")}
        </Button>
      </Box>
    </Paper>
  );
}
