"use client";

import React, { useEffect, useState } from "react"; // Ensure React is imported
import { useRouter } from "next/navigation";
import {
  Box,
  Select,
  Pagination,
  Typography,
  MenuItem,
  SelectChangeEvent,
  Paper,
  Checkbox,
  TableRow,
  TableBody,
  Table,
  TableCell,
  TableHead,
  TableContainer,
  Button,
  TextField,
  InputAdornment,
  Tooltip,
  TableSortLabel,
  Avatar,
} from "@mui/material";

// Import necessary icons
import {
  CirclePlus,
  EyeIcon,
  Pencil,
  Trash2,
  LockKeyhole,
  //KeyRound,
} from "lucide-react"; // Correct icons imported
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import AlertDialog from "@/components/AlertDialog"; // Assuming this component exists and accepts the props used

// Assuming DetailModal might be used later - keep relevant state/handlers commented if not used now
// import DetailModal from "@/components/DetailModal";

// Define column keys based on the new schema (excluding passwordhash)
const columnKeys = [
  "id",
  "fullname",
  "username",
  "email",
  "phonenumber",
  "birthday",
  "gender",
  "address",
  "createddate",
  "roles",
  "balance",
];

// Function to generate translation keys (adjust prefix/case as needed)
const getTranslationKey = (key: string) =>
  `COMMON.EMPLOYEE.${key.toUpperCase()}`;

// Type for different actions triggering the dialog
type ActionDialogType = "delete" | "lock" | "unlock" | null;

function EmployeeTable() {
  // --- State ---
  const [openDialog, setOpenDialog] = useState(false);
  const [isChangeMany, setIsChangeMany] = useState(false); // For multi-delete vs single action
  const [actionType, setActionType] = useState<ActionDialogType>(null); // Which dialog content to show
  const [targetItemId, setTargetItemId] = useState<string | null>(null); // ID for single item actions
  const [targetItemStatus, setTargetItemStatus] = useState<boolean | null>(
    null
  ); // Current status for lock/unlock
  useEffect(() => {}, [targetItemStatus]);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [rowsPerPage, setRowsPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  }>({ key: "createddate", direction: "desc" });
  const [openModal, setOpenModal] = useState(false); // State for Detail Modal

  const [selectedCount, setSelectedCount] = useState(0); // Simulate selected rows count

  const { t } = useTranslation("common"); // Ensure translation hook is called correctly
  const router = useRouter();

  // --- Placeholder Data ---
  const totalRecords = 50;
  const exampleRowCount = 2; // Match the number of static rows

  // --- Event Handlers ---

  // View Detail Action
  const handleClickDetail = (id: string) => {
    console.log("View Detail for ID:", id);
    setTargetItemId(id); // Store ID if needed by modal
    setOpenModal(true); // Open the detail modal
  };

  // Sorting Action
  const handleSort = (key: string) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Pagination Actions
  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent<string>) => {
    setRowsPerPage(event.target.value);
    setCurrentPage(1); // Go back to first page on rows change
  };

  // Selection Actions
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCount(event.target.checked ? exampleRowCount : 0);
  };

  const handleCheckboxClick = (isChecked: boolean) => {
    setSelectedCount((prev) => (isChecked ? prev + 1 : Math.max(0, prev - 1)));
  };

  // Confirmation Dialog Triggers
  const handleDeleteClick = (id: string) => {
    setIsChangeMany(false);
    setActionType("delete");
    setTargetItemId(id);
    setOpenDialog(true);
  };

  const handleDeleteManyClick = () => {
    if (selectedCount > 0) {
      // Only open if items are selected
      setIsChangeMany(true);
      setActionType("delete");
      setTargetItemId(null);
      setOpenDialog(true);
    }
  };

  const handleLockUnlockClick = (id: string, currentIsActive: boolean) => {
    setIsChangeMany(false);
    setActionType(currentIsActive ? "lock" : "unlock");
    setTargetItemId(id);
    setTargetItemStatus(currentIsActive);
    setOpenDialog(true);
  };

  // Reset Dialog State (used in confirmation and cancellation)
  const resetDialogState = () => {
    setOpenDialog(false);
    setIsChangeMany(false);
    setActionType(null);
    setTargetItemId(null);
    setTargetItemStatus(null);
  };

  // Unified Confirmation Handler (Placeholder Logic)
  const handleConfirmAction = () => {
    if (isChangeMany && actionType === "delete") {
      console.log(`Confirmed bulk delete for ${selectedCount} selected items`);
      setSelectedCount(0); // Reset selection count after bulk action
      // Add bulk delete API call here
    } else if (targetItemId) {
      switch (actionType) {
        case "delete":
          console.log(`Confirmed single delete for item ID: ${targetItemId}`);
          // Add single delete API call here
          break;
        case "lock":
          console.log(
            `Confirmed lock (set inactive) for item ID: ${targetItemId}`
          );
          // Add API call to update status to inactive
          break;
        case "unlock":
          console.log(
            `Confirmed unlock (set active) for item ID: ${targetItemId}`
          );
          // Add API call to update status to active
          break;
      }
      // Potentially remove the single item from selection if it was selected
      // setSelectedCount(prev => Math.max(0, prev -1)); // Be careful if implementing selection array later
    }

    resetDialogState();
    // Add refetch data logic here if using a data fetching library (e.g., refetch())
  };

  // Close Dialog Handler (Ensures state reset on manual close/cancel)

  // --- Dynamic Content for Dialog ---
  const getDialogContent = () => {
    // Use default values to avoid errors if actionType is somehow null when dialog is open
    let title = t("COMMON.ALERT_DIALOG.CONFIRM_ACTION.TITLE", "Confirm Action"); // Default title
    let content = t(
      "COMMON.ALERT_DIALOG.CONFIRM_ACTION.CONTENT",
      "Are you sure you want to proceed?"
    ); // Default content
    let confirmText = t("COMMON.ALERT_DIALOG.CONFIRM", "Confirm"); // Default button text
    let type: "warning" | "info" | "error" | "success" = "info"; // Default type

    if (isChangeMany && actionType === "delete") {
      title = t("COMMON.ALERT_DIALOG.CONFIRM_DELETE_MANY.TITLE", {
        count: selectedCount,
      });
      content = t("COMMON.ALERT_DIALOG.CONFIRM_DELETE_MANY.CONTENT");
      confirmText = t("COMMON.ALERT_DIALOG.CONFIRM_DELETE_MANY.DELETE", {
        count: selectedCount,
      }); // Pass count here too if needed
      type = "warning";
    } else {
      switch (actionType) {
        case "delete":
          title = t("COMMON.ALERT_DIALOG.CONFIRM_DELETE.TITLE");
          content = t("COMMON.ALERT_DIALOG.CONFIRM_DELETE.CONTENT");
          confirmText = t("COMMON.ALERT_DIALOG.CONFIRM_DELETE.DELETE");
          type = "warning";
          break;
        case "lock":
          title = t("COMMON.ALERT_DIALOG.CONFIRM_LOCK.TITLE");
          content = t("COMMON.ALERT_DIALOG.CONFIRM_LOCK.CONTENT");
          confirmText = t("COMMON.ALERT_DIALOG.CONFIRM_LOCK.LOCK");
          type = "warning";
          break;
        case "unlock":
          title = t("COMMON.ALERT_DIALOG.CONFIRM_UNLOCK.TITLE");
          content = t("COMMON.ALERT_DIALOG.CONFIRM_UNLOCK.CONTENT");
          confirmText = t("COMMON.ALERT_DIALOG.CONFIRM_UNLOCK.UNLOCK");
          type = "info";
          break;
      }
    }
    return { title, content, confirmText, type };
  };

  // --- Calculated Values ---
  const from = (currentPage - 1) * Number(rowsPerPage) + 1;
  const to = Math.min(currentPage * Number(rowsPerPage), totalRecords);
  const countRows = selectedCount;
  const dialogContent = getDialogContent(); // Calculate dialog content

  // --- Render ---
  return (
    <Box>
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          borderRadius: "15px",
          backgroundColor: "var(--background-item)",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          margin="24px"
        >
          {/* Search Input */}
          <Box sx={{ position: "relative", width: "auto", height: "55px" }}>
            <TextField
              variant="outlined"
              placeholder={t("COMMON.SYS_CONFIGURATION.PLACEHOLDER_SEARCH")}
              value={searchTerm}
              sx={{
                color: "var(--text-color)",
                padding: "0px",
                width: "335px",
                "& fieldset": {
                  borderRadius: "10px",
                  borderColor: "var(--border-color)",
                },
                "& .MuiInputBase-root": {
                  paddingLeft: "0px",
                  paddingRight: "12px",
                  height: "100%",
                }, // Ensure root takes height
                "& .MuiInputBase-input": {
                  padding: "15px 0px 15px 14px",
                  color: "var(--text-color)",
                  fontSize: "16px",
                  "&::placeholder": {
                    color: "var(--placeholder-color)",
                    opacity: 1,
                  },
                  height: "calc(100% - 30px)",
                }, // Adjust padding/height if needed
                "& .MuiOutlinedInput-root:hover fieldset": {
                  borderColor: "var(--hover-field-color)",
                },
                "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                  borderColor: "var(--selected-field-color)",
                },
              }}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{
                      mr: 0,
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        height: "100%",
                        color: "#a5bed4",
                        padding: "10.5px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <SearchIcon />
                    </Box>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            gap="20px"
            flexGrow={1}
          >
            <Typography
              sx={{
                color: "red",
                whiteSpace: "nowrap",
                visibility: countRows > 0 ? "visible" : "hidden",
                mr: 1 /* Add some margin */,
              }}
            >
              {t("COMMON.COUNT_ROWS_SELECTED", { countRows })}
            </Typography>
            {/* Delete Button (for multiple) */}
            <Button
              variant="contained"
              startIcon={<Trash2 />}
              sx={{
                height: "53px",
                visibility: countRows > 0 ? "visible" : "hidden",
                backgroundColor: "var(--button-color)",
                width: "auto",
                padding: "0px 25px",
                /* Adjusted padding */ "&:hover": {
                  backgroundColor: "var(--hover-button-color)",
                },
                fontSize: "16px",
                fontWeight: "bold",
                whiteSpace: "nowrap",
                textTransform: "none",
                flexShrink: 0 /* Prevent shrinking */,
              }}
              onClick={handleDeleteManyClick}
            >
              {t("COMMON.BUTTON.DELETE")}
            </Button>
            {/* Create Button */}
            <Button
              variant="contained"
              startIcon={<CirclePlus />}
              sx={{
                height: "53px",
                backgroundColor: "var(--button-color)",
                width: "auto",
                padding: "0px 25px",
                /* Adjusted padding */ "&:hover": {
                  backgroundColor: "var(--hover-button-color)",
                },
                fontSize: "16px",
                fontWeight: "bold",
                whiteSpace: "nowrap",
                textTransform: "none",
                flexShrink: 0 /* Prevent shrinking */,
              }}
              onClick={() => router.push("/admin/user/create")}
            >
              {t("COMMON.BUTTON.CREATE")}
            </Button>
          </Box>
        </Box>

        {/* Table */}
        <TableContainer
          sx={{
            textAlign: "center",
            "&::-webkit-scrollbar": {
              width: "7px",
              height: "7px",
              backgroundColor: "var(--background-color)",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "var(--scrollbar-color)",
              borderRadius: "10px",
            },
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "var(--header-color-table)" }}>
                <TableCell
                  padding="checkbox"
                  sx={{
                    borderColor: "var(--border-color)",
                    paddingLeft: "12px",
                    backgroundColor: "var(--header-color-table)",
                    position: "sticky",
                    left: 0,
                    zIndex: 1,
                  }}
                >
                  <Checkbox
                    indeterminate={
                      selectedCount > 0 && selectedCount < exampleRowCount
                    }
                    checked={
                      totalRecords > 0 && selectedCount === exampleRowCount
                    }
                    onChange={handleSelectAllClick}
                    sx={{ color: "var(--text-color)", width: "48px" }}
                  />
                </TableCell>
                {columnKeys.map((columnKey) => (
                  <TableCell
                    key={columnKey}
                    sx={{
                      borderColor: "var(--border-color)",
                      backgroundColor: "var(--header-color-table)",
                      // Make first data column sticky if needed
                      // position: index === 0 ? 'sticky' : 'static',
                      // left: index === 0 ? 60 : 'auto', // Adjust based on checkbox width
                      // zIndex: index === 0 ? 1 : 0,
                      minWidth:
                        columnKey === "id"
                          ? 150
                          : columnKey === "fullname"
                          ? 200
                          : 120, // Example min widths
                    }}
                  >
                    <TableSortLabel
                      active={sortConfig.key === columnKey}
                      direction={
                        sortConfig.key === columnKey
                          ? sortConfig.direction
                          : "asc"
                      }
                      onClick={() => handleSort(columnKey)}
                      sx={{
                        "& .MuiTableSortLabel-icon": {
                          color: "var(--text-color) !important",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          color: "var(--text-color)",
                          fontSize: "16px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {columnKey === "id"
                          ? "ID"
                          : t(getTranslationKey(columnKey))}
                      </Typography>
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell
                  sx={{
                    borderColor: "var(--border-color)",
                    padding: "0px 9.5px",
                    width: "190px",
                    backgroundColor: "var(--header-color-table)",
                    textAlign: "center",
                    position: "sticky",
                    right: 0,
                    zIndex: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color: "var(--text-color)",
                      fontSize: "16px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t("COMMON.SYS_CONFIGURATION.ACTION")}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow hover>
                <TableCell
                  padding="checkbox"
                  sx={{
                    borderColor: "var(--border-color)",
                    paddingLeft: "12px",
                    position: "sticky",
                    left: 0,
                    zIndex: 1,
                    backgroundColor:
                      "var(--background-item)" /* Match paper bg */,
                  }}
                >
                  <Checkbox
                    checked={selectedCount > 0}
                    onChange={(e) => handleCheckboxClick(e.target.checked)}
                    sx={{ color: "var(--text-color)", width: "48px" }}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    borderColor:
                      "var(--border-color)" /* Add sticky styles if header is sticky */,
                  }}
                >
                  <Typography
                    sx={{
                      color: "var(--text-color)",
                      fontSize: "16px",
                      maxWidth: "200px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    a1b2c3d4-e5f6-7890-1234-567890abcdef
                  </Typography>
                </TableCell>
                <TableCell sx={{ borderColor: "var(--border-color)" }}>
                  <Box display="flex" alignItems="center">
                    <Avatar
                      src="/placeholder-avatar.png"
                      alt="Avatar"
                      sx={{ marginRight: "15px", width: 32, height: 32 }}
                    />
                    <Typography
                      sx={{
                        color: "var(--text-color)",
                        fontSize: "16px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Johnathan Doe
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ borderColor: "var(--border-color)" }}>
                  <Typography
                    sx={{
                      color: "var(--text-color)",
                      fontSize: "16px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    johndoe
                  </Typography>
                </TableCell>
                <TableCell sx={{ borderColor: "var(--border-color)" }}>
                  <Typography
                    sx={{
                      color: "var(--text-color)",
                      fontSize: "16px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    john.doe@example.com
                  </Typography>
                </TableCell>
                <TableCell sx={{ borderColor: "var(--border-color)" }}>
                  <Typography
                    sx={{
                      color: "var(--text-color)",
                      fontSize: "16px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    123-456-7890
                  </Typography>
                </TableCell>
                <TableCell sx={{ borderColor: "var(--border-color)" }}>
                  <Typography
                    sx={{
                      color: "var(--text-color)",
                      fontSize: "16px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    1990-01-15
                  </Typography>
                </TableCell>
                <TableCell sx={{ borderColor: "var(--border-color)" }}>
                  <Typography
                    sx={{
                      color: "var(--text-color)",
                      fontSize: "16px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Nam
                  </Typography>
                </TableCell>
                <TableCell sx={{ borderColor: "var(--border-color)" }}>
                  <Typography
                    sx={{
                      color: "var(--text-color)",
                      fontSize: "16px",
                      whiteSpace: "nowrap",
                      maxWidth: 150,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    123 Main St, Anytown
                  </Typography>
                </TableCell>
                <TableCell sx={{ borderColor: "var(--border-color)" }}>
                  <Typography
                    sx={{
                      color: "var(--text-color)",
                      fontSize: "16px",
                      whiteSpace: "nowrap",
                      maxWidth: 150,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    12/3/2024
                  </Typography>
                </TableCell>
                <TableCell sx={{ borderColor: "var(--border-color)" }}>
                  <Typography
                    sx={{
                      color: "var(--text-color)",
                      fontSize: "16px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Admin
                  </Typography>
                </TableCell>
                <TableCell sx={{ borderColor: "var(--border-color)" }}>
                  <Typography
                    sx={{
                      color: "var(--text-color)",
                      fontSize: "16px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    100
                  </Typography>
                </TableCell>
                <TableCell
                  sx={{
                    padding: "0px 9.5px",
                    borderColor: "var(--border-color)",
                    width: "190px",
                    position: "sticky",
                    right: 0,
                    zIndex: 1,
                    backgroundColor:
                      "var(--background-item)" /* Match paper bg */,
                  }}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-around"
                    /* Use space-around */ gap="5px"
                  >
                    <Tooltip title={t("COMMON.BUTTON.VIEW_DETAIL")}>
                      <Box
                        component="span"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                          cursor: "pointer",
                          color: "#00d100",
                          borderRadius: "50%",
                          width: "38px",
                          height: "38px",
                          "&:hover": { backgroundColor: "var(--hover-color)" },
                        }}
                        onClick={() =>
                          handleClickDetail(
                            "a1b2c3d4-e5f6-7890-1234-567890abcdef"
                          )
                        }
                      >
                        <EyeIcon size={20} />
                      </Box>
                    </Tooltip>
                    <Tooltip title={t("COMMON.BUTTON.EDIT")}>
                      <Box
                        component="span"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                          cursor: "pointer",
                          color: "#00d4ff",
                          borderRadius: "50%",
                          width: "38px",
                          height: "38px",
                          "&:hover": { backgroundColor: "var(--hover-color)" },
                        }}
                        onClick={() => router.push(`/account/update`)}
                      >
                        <Pencil size={20} />
                      </Box>
                    </Tooltip>
                    {/* Lock (user is active) */}
                    <Tooltip title={t("COMMON.BUTTON.LOCK")}>
                      <Box
                        component="span"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                          cursor: "pointer",
                          color: "orange",
                          borderRadius: "50%",
                          width: "38px",
                          height: "38px",
                          "&:hover": { backgroundColor: "var(--hover-color)" },
                        }}
                        onClick={() =>
                          handleLockUnlockClick(
                            "a1b2c3d4-e5f6-7890-1234-567890abcdef",
                            true
                          )
                        }
                      >
                        <LockKeyhole size={20} />
                      </Box>
                    </Tooltip>
                    <Tooltip title={t("COMMON.BUTTON.DELETE")}>
                      <Box
                        component="span"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                          cursor: "pointer",
                          color: "red",
                          borderRadius: "50%",
                          width: "38px",
                          height: "38px",
                          "&:hover": { backgroundColor: "var(--hover-color)" },
                        }}
                        onClick={() =>
                          handleDeleteClick(
                            "a1b2c3d4-e5f6-7890-1234-567890abcdef"
                          )
                        }
                      >
                        <Trash2 size={20} />
                      </Box>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination Controls */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          padding="15px"
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Typography
              sx={{ color: "var(--text-color)", whiteSpace: "nowrap" }}
            >
              {t("COMMON.PAGINATION.ROWS_PER_PAGE")}{" "}
            </Typography>
            <Select
              id="select"
              size="small"
              /* Use small size */ sx={{
                width: "75px",
                color: "var(--text-color)",
                ".MuiSelect-icon": { color: "var(--text-color)" },
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--border-color)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--hover-color)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--selected-color)",
                },
                ".MuiSelect-select": {
                  py: "6px",
                  px: "10px",
                } /* Adjust padding */,
              }}
              value={rowsPerPage}
              defaultValue="10"
              onChange={handleChangeRowsPerPage}
              MenuProps={{
                PaperProps: {
                  elevation: 0,
                  sx: {
                    border: "1px solid var(--border-color)",
                    "& .MuiList-root": {
                      backgroundColor: "var(--background-color)",
                      padding: "5px",
                      "& .MuiMenuItem-root": {
                        color: "var(--text-color)",
                        borderRadius: "4px",
                        "&:hover": { backgroundColor: "var(--hover-color)" },
                        "&.Mui-selected": {
                          backgroundColor: "var(--selected-color)",
                        },
                      },
                    },
                  },
                },
              }}
            >
              <MenuItem sx={{ mb: "3px" }} value={5}>
                5
              </MenuItem>
              <MenuItem sx={{ mb: "3px" }} value={10}>
                10
              </MenuItem>
              <MenuItem sx={{ mb: "3px" }} value={20}>
                20
              </MenuItem>
              <MenuItem sx={{ mb: "3px" }} value={30}>
                30
              </MenuItem>
              <MenuItem value={40}>40</MenuItem>
            </Select>
            <Typography
              sx={{ color: "var(--text-color)", whiteSpace: "nowrap" }}
            >
              {t("COMMON.PAGINATION.FROM_TO", { from, to, totalRecords })}{" "}
            </Typography>
          </Box>
          <Pagination
            count={Math.ceil(totalRecords / Number(rowsPerPage))}
            page={currentPage}
            onChange={handleChangePage}
            boundaryCount={1}
            siblingCount={1}
            /* Reduce siblings for smaller screens */ variant="outlined"
            shape="rounded"
            /* Use rounded shape */ sx={{
              ".MuiPaginationItem-root": {
                color: "var(--text-color)",
                borderColor: "var(--border-color)",
                "&.Mui-selected": {
                  backgroundColor: "var(--selected-color)",
                  color: "var(--text-color)",
                  borderColor: "transparent" /* Hide border on selected */,
                },
                "&:hover": {
                  backgroundColor: "var(--hover-color)",
                  borderColor: "var(--hover-color)",
                },
              },
            }}
          />
        </Box>
      </Paper>

      {/* Confirmation Dialog */}
      <AlertDialog
        title={dialogContent.title}
        content={dialogContent.content}
        type={dialogContent.type}
        open={openDialog}
        setOpen={setOpenDialog} // Allows AlertDialog to close itself
        buttonCancel={t("COMMON.ALERT_DIALOG.CANCEL")}
        buttonConfirm={dialogContent.confirmText}
        onConfirm={handleConfirmAction}
      />

      {/* Detail Modal (Example Usage) */}
      {openModal &&
        targetItemId && ( // Only render if open and an ID is targeted
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => setOpenModal(false)}
          >
            {/* Replace with your actual DetailModal component */}
            <Paper
              sx={{ p: 4, minWidth: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Typography variant="h6">Detail View</Typography>
              <Typography>Details for User ID: {targetItemId}</Typography>
              <Button onClick={() => setOpenModal(false)} sx={{ mt: 2 }}>
                Close
              </Button>
            </Paper>
          </Box>
        )}
    </Box>
  );
}

export default EmployeeTable;
