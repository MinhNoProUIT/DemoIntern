import { TrendingUp } from "@mui/icons-material";
import formatNumberWithUnit from "@/utils/formatNumberWithUnit";
import { useTranslation } from "react-i18next";
import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { TrendingDown } from "lucide-react";
import Loading from "@/components/Loading";
import { useGetQuarterStatsQuery } from "@/services/UserService";
import { useEffect } from "react";

function DisplayInfo() {
  const { t } = useTranslation("common");

  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  let monthSalary = month;
  let yearSalary = year;

  if (month == 1) {
    monthSalary = 12;
    yearSalary = year - 1;
  } else {
    monthSalary = monthSalary - 1;
  }

  const {
    data: userResponse,
    isLoading: isUsersLoading,
    refetch,
  } = useGetQuarterStatsQuery();

  console.log("📊 userResponse:", userResponse);

  // const { data: response, isLoading: isLoading1 } = useGetEmployeeStatsByMonthAndYearQuery({
  //     Month: month,
  //     Year: year
  // })
  // const { data: salaryResponse, isLoading: isLoading2 } = useGetIncomeInMonthQuery({
  //     Month: monthSalary,
  //     Year: yearSalary
  // })

  // const { data: timeOffResponse, isLoading: isLoading3 } = useGetTimeOffStatisticsQuery({
  //     Month: month,
  //     Year: year
  // })
  const isLoading1 = false;
  const isLoading2 = false;
  const isLoading3 = false;

  const totalEmployee = userResponse?.currentQuarterCount || 0;
  const employeePercent = userResponse?.changePercent || 0;

  console.log("📊 totalEmployee:", totalEmployee);
  console.log("📊 employeePercent:", employeePercent);

  const timeOff = 15;
  const timeOffPercent = -25;
  const totalEmployeeLayoff = 13;
  const layoffPercent = 0;
  const newEmployees = 3;
  const newEmployeePercent = 50;
  const laborCosts = 150000;
  const laborCostsPercent = 25;
  const promotions = 0;
  const promotionPercent = -100;
  useEffect(() => {}, [yearSalary, monthSalary, isUsersLoading, refetch]);

  if (isLoading1 || isLoading2 || isLoading3) {
    return <Loading />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        overflowX: "auto",
        "&::-webkit-scrollbar": {
          width: "7px",
          height: "7px",
          backgroundColor: "var(--background-after-color)",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "var(--scrollbar-color)",
          borderRadius: "10px",
        },
        backgroundColor: "var(--background-after-color)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            backgroundImage: "linear-gradient(135deg, #ffdec9, #ffdec9)", // Từ cam nhạt (#FFE0B2) đến cam đậm (#FB8C00)
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
              <Typography
                sx={{
                  color: "#9e3c00",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                {t("COMMON.TONGSONGUOIDUNG")}
              </Typography>
              <Typography
                sx={{
                  color: "#9e3c00",
                  fontSize: "30px",
                  mt: "10px",
                  fontWeight: "bold",
                }}
              >
                {totalEmployee}
              </Typography>
            </Box>
            <Box>
              <img
                src="/images/icon_test.jpg"
                style={{
                  height: "55px",
                  borderRadius: 15,
                }}
              ></img>
            </Box>
          </Box>
          <Box
            sx={{
              mt: "10px",
              color: !(!employeePercent || employeePercent >= 0)
                ? "#F93C65"
                : "#00B69B",
              fontSize: "16px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
            }}
          >
            {employeePercent !== undefined &&
              (!(!employeePercent || employeePercent >= 0) ? (
                <TrendingDown style={{ marginRight: "6px" }} />
              ) : (
                <TrendingUp style={{ marginRight: "6px" }} />
              ))}
            {employeePercent !== undefined ? employeePercent + "%" : "N/A"}
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
            backgroundImage: "linear-gradient(135deg, #ffcece, #ffcece)",
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
              <Typography
                sx={{
                  color: "#7a0000",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                {t("COMMON.TONGSOKHOAHOC")}
              </Typography>
              <Typography
                sx={{
                  color: "#7a0000",
                  fontSize: "30px",
                  mt: "10px",
                  fontWeight: "bold",
                }}
              >
                {timeOff}
              </Typography>
            </Box>
            <Box>
              <img
                src="/images/icon_test.jpg"
                style={{
                  marginTop: "-5px",
                  height: "63px",
                  borderRadius: 15,
                }}
              ></img>
            </Box>
          </Box>
          <Box
            sx={{
              mt: "10px",
              color:
                timeOffPercent != undefined && timeOffPercent < 0
                  ? "#F93C65"
                  : "#00B69B",
              fontSize: "16px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
            }}
          >
            {timeOffPercent != undefined &&
              (timeOffPercent < 0 ? (
                <TrendingDown style={{ marginRight: "6px" }} />
              ) : (
                <TrendingUp style={{ marginRight: "6px" }} />
              ))}
            {timeOffPercent !== undefined ? timeOffPercent + "%" : "N/A"}
            {/*t('COMMON.DASHBOARD.NO_CHANGE')*/}
            <Typography
              sx={{
                ml: "6px",
                color: "#7a0000",
                fontSize: "16px",
              }}
            >
              {t("COMMON.DASHBOARD.DOWN_FROM_LAST_MONTH")}
            </Typography>
          </Box>
        </Paper>
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            backgroundImage: "linear-gradient(135deg, #fff3ce, #fff3ce)",
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
              <Typography
                sx={{
                  color: "#7A4100",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                {t("COMMON.TONGSOKHOAHOCDABAN")}
              </Typography>
              <Typography
                sx={{
                  color: "#7A4100",
                  fontSize: "30px",
                  mt: "10px",
                  fontWeight: "bold",
                }}
              >
                {newEmployees}
              </Typography>
            </Box>
            <Box>
              <img
                src="/images/icon_test.jpg"
                style={{
                  height: "55px",
                  borderRadius: 15,
                }}
              ></img>
            </Box>
          </Box>
          <Box
            sx={{
              mt: "10px",
              color: !(!newEmployeePercent || newEmployeePercent >= 0)
                ? "#F93C65"
                : "#00B69B",
              fontSize: "16px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
            }}
          >
            {newEmployeePercent !== undefined &&
              (!(!newEmployeePercent || newEmployeePercent >= 0) ? (
                <TrendingDown style={{ marginRight: "6px" }} />
              ) : (
                <TrendingUp style={{ marginRight: "6px" }} />
              ))}
            {newEmployeePercent !== undefined
              ? newEmployeePercent + "%"
              : "N/A"}
            {/*t('COMMON.DASHBOARD.NO_CHANGE')*/}
            <Typography
              sx={{
                ml: "6px",
                color: "#7A4100",
                fontSize: "16px",
              }}
            >
              {t("COMMON.DASHBOARD.DOWN_FROM_LAST_MONTH")}
            </Typography>
          </Box>
        </Paper>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            backgroundImage: "linear-gradient(135deg, #d7e2ff, #d7e2ff)",
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
              <Typography
                sx={{
                  color: "#0e2d80",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                {t("COMMON.TONGSONGUOIDUNGCONHOATDONG")}
              </Typography>
              <Typography
                sx={{
                  color: "#0e2d80",
                  fontSize: "30px",
                  mt: "10px",
                  fontWeight: "bold",
                }}
              >
                {totalEmployeeLayoff}
              </Typography>
            </Box>
            <Box>
              <img
                src="/images/icon_test.jpg"
                style={{
                  height: "59px",
                  borderRadius: 15,
                }}
              ></img>
            </Box>
          </Box>
          <Box
            sx={{
              mt: "10px",
              color: layoffPercent && layoffPercent < 0 ? "#F93C65" : "#00B69B",
              fontSize: "16px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
            }}
          >
            {layoffPercent !== undefined &&
              (layoffPercent && layoffPercent < 0 ? (
                <TrendingDown style={{ marginRight: "6px" }} />
              ) : (
                <TrendingUp style={{ marginRight: "6px" }} />
              ))}
            {layoffPercent !== undefined ? layoffPercent + "%" : "N/A"}
            {/*t('COMMON.DASHBOARD.NO_CHANGE')*/}
            <Typography
              sx={{
                ml: "6px",
                color: "#0e2d80",
                fontSize: "16px",
              }}
            >
              {t("COMMON.DASHBOARD.DOWN_FROM_LAST_MONTH")}
            </Typography>
          </Box>
        </Paper>
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            backgroundImage: "linear-gradient(135deg, #C8FAD6, #C8FAD6)",
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
              <Typography
                sx={{
                  color: "#004b50",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                {t("COMMON.TONGSOTIENTHUVAO")}
              </Typography>
              <Typography
                sx={{
                  color: "#004b50",
                  fontSize: "30px",
                  mt: "10px",
                  fontWeight: "bold",
                }}
              >
                {formatNumberWithUnit(laborCosts)}
              </Typography>
            </Box>
            <Box>
              <img
                src="/images/icon_test.jpg"
                style={{
                  height: "55px",
                  borderRadius: "15px",
                }}
              ></img>
            </Box>
          </Box>
          <Box
            sx={{
              mt: "10px",
              color:
                laborCostsPercent && laborCostsPercent < 0
                  ? "#F93C65"
                  : "#00B69B",
              fontSize: "16px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
            }}
          >
            {laborCostsPercent !== undefined &&
              (laborCostsPercent && laborCostsPercent < 0 ? (
                <TrendingDown style={{ marginRight: "6px" }} />
              ) : (
                <TrendingUp style={{ marginRight: "6px" }} />
              ))}
            {laborCostsPercent !== undefined ? laborCostsPercent + "%" : "N/A"}
            {/*t('COMMON.DASHBOARD.NO_CHANGE')*/}
            <Typography
              sx={{
                ml: "6px",
                color: "#004b50",
                fontSize: "16px",
              }}
            >
              {t("COMMON.DASHBOARD.DOWN_FROM_LAST_MONTH")}
            </Typography>
          </Box>
        </Paper>
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            backgroundImage: "linear-gradient(135deg, #d5f8ff, #d5f8ff)",
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
              <Typography
                sx={{
                  color: "#00626b",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                {t("COMMON.TONGSONGUOIDUNGCONHOATDONG")}
              </Typography>
              <Typography
                sx={{
                  color: "#00626b",
                  fontSize: "30px",
                  mt: "10px",
                  fontWeight: "bold",
                }}
              >
                {promotions}
              </Typography>
            </Box>
            <Box>
              <img
                src="/images/icon_test.jpg"
                style={{
                  height: "55px",
                }}
              ></img>
            </Box>
          </Box>
          <Box
            sx={{
              mt: "10px",
              color: !(!promotionPercent || promotionPercent >= 0)
                ? "#F93C65"
                : "#00B69B",
              fontSize: "16px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
            }}
          >
            {promotionPercent !== undefined &&
              (!(!promotionPercent || promotionPercent >= 0) ? (
                <TrendingDown style={{ marginRight: "6px" }} />
              ) : (
                <TrendingUp style={{ marginRight: "6px" }} />
              ))}
            {promotionPercent !== undefined ? promotionPercent + "%" : "N/A"}
            {/*t('COMMON.DASHBOARD.NO_CHANGE')*/}
            <Typography
              sx={{
                ml: "6px",
                color: "#00626b",
                fontSize: "16px",
              }}
            >
              {t("COMMON.DASHBOARD.FROM_LAST_QUARTER")}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default DisplayInfo;
