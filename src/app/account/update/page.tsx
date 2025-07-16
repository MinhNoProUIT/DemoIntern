"use client";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
  Avatar,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { SaveIcon, XIcon, RefreshCcwIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Assume roles might come from props or a static list in this simplified version
const MOCK_ROLES = [
  { Name: "Admin", Id: "1" },
  { Name: "User", Id: "2" },
  { Name: "Manager", Id: "3" },
  { Name: "Auditor", Id: "4" },
];

const UpdateEmployeePageSimplified = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  // State for the new fields
  const [id, setId] = useState("");
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [roles, setRoles] = useState<string[]>([]);
  const [balance, setBalance] = useState<number | string>("");

  // Avatar related state
  const [previewSrc, setPreviewSrc] = useState<string>(
    "https://localhost:44381/avatars/aa1678f0-75b0-48d2-ae98-50871178e9bd.jfif" // Default placeholder
  );
  const [file, setFile] = useState<File | null>(null);

  // State to trigger validation visuals
  const [isSubmit, setIsSubmit] = useState(false);

  // --- Effect to hide body scrollbar ---
  useEffect(() => {
    // Store original overflow style
    const originalStyle = window.getComputedStyle(document.body).overflow;
    // Apply overflow: hidden to the body when the component mounts
    document.body.style.overflow = "hidden";

    // Cleanup function: Restore the original style when the component unmounts
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []); // Empty dependency array ensures this runs only on mount and unmount

  const handleSave = () => {
    setIsSubmit(true);
    if (
      fullName === "" ||
      userName === "" ||
      email === "" ||
      phoneNumber === "" ||
      birthday === "" ||
      gender === "" ||
      address === "" ||
      !Array.isArray(roles) ||
      roles.length === 0 ||
      balance === ""
    ) {
      console.log("Validation failed");
      alert("Please fill all required fields.");
      return;
    }

    const dataToSave = {
      id: id,
      fullname: fullName,
      username: userName,
      email: email,
      phonenumber: phoneNumber,
      birthday: birthday,
      gender: gender,
      address: address,
      roles: roles,
      balance: Number(balance),
    };

    console.log("Data to save (simulation):", dataToSave);
    alert("Data saved (simulation)!");
    setIsSubmit(false);
  };

  const handleSaveAndClose = () => {
    setIsSubmit(true);
    if (
      fullName === "" ||
      userName === "" ||
      email === "" ||
      phoneNumber === "" ||
      birthday === "" ||
      gender === "" ||
      address === "" ||
      !Array.isArray(roles) ||
      roles.length === 0 ||
      balance === ""
    ) {
      console.log("Validation failed");
      alert("Please fill all required fields.");
      return;
    }

    const dataToSave = {
      id: id,
      fullname: fullName,
      username: userName,
      email: email,
      phonenumber: phoneNumber,
      birthday: birthday,
      gender: gender,
      address: address,
      roles: roles,
      balance: Number(balance),
    };

    console.log("Data to save and close (simulation):", dataToSave);
    alert("Data saved (simulation)! Closing page.");
    setIsSubmit(false);
    router.push("/account");
  };

  const triggerFileInput = () => {
    document.getElementById("fileInput")?.click();
  };

  const previewImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        setPreviewSrc(e.target?.result as string);
        setFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    // You might need to ensure this outer Box or a parent container
    // has a defined height (e.g., height: '100vh') for the body overflow
    // style to reliably prevent scrolling caused *by this component*.
    // If the scrollbar comes from elements outside this component (like a fixed header/footer),
    // this approach might still show those elements correctly while preventing the main content scroll.
    <Box sx={{ width: "100%", display: "flex" }}>
      {/* Avatar Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "auto",
          width: "18%",
          position: "sticky",
          top: "25px",
          color: "var(--text-color)",
          // Ensure sticky positioning works within the viewport context
          // You might need to adjust height/maxHeight if needed
          alignSelf: "flex-start", // Make sticky relative to the top of the flex container
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            background: "#fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            maxWidth: "300px",
            marginRight: "auto",
            borderRadius: "15px",
            backgroundColor: "var(--background-item)",
            padding: "24px",
            backgroundImage:
              "url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSJ1cmwoI3BhaW50MF9yYWRpYWxfMjc0OV8xNDUxODYpIiBmaWxsLW9wYWNpdHk9IjAuMTIiLz4KPGRlZnM+CjxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQwX3JhZGlhbF8yNzQ5XzE0NTE4NiIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgxMjAgMS44MTgxMmUtMDUpIHJvdGF0ZSgtNDUpIHNjYWxlKDEyMy4yNSkiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMDBCOEQ5Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwQjhEOSIgc3RvcC1vcGFjaXR5PSIwIi8+CjwvcmFkaWFsR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==), url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSJ1cmwoI3BhaW50MF9yYWRpYWxfMjc0OV8xNDUxODcpIiBmaWxsLW9wYWNpdHk9IjAuMTIiLz4KPGRlZnM+CjxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQwX3JhZGlhbF8yNzQ5XzE0NTE4NyIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgwIDEyMCkgcm90YXRlKDEzNSkgc2NhbGUoMTIzLjI1KSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGRjU2MzAiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkY1NjMwIiBzdG9wLW9wYWNpdHk9IjAiLz4KPC9yYWRpYWxHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K)",
            backgroundPosition: "top right, bottom left",
            backgroundSize: "50%, 50%",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Box
            sx={{
              position: "relative",
              cursor: "pointer",
            }}
          >
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={previewImage}
              style={{ display: "none" }}
            />
            <Box
              sx={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                overflow: "hidden",
                margin: "0 auto 8px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                transition: "box-shadow 0.3s ease",
              }}
              onMouseEnter={() =>
                (document.getElementById("updatePhoto")!.style.display = "flex")
              }
              onMouseLeave={() =>
                (document.getElementById("updatePhoto")!.style.display = "none")
              }
            >
              <Avatar
                sx={{
                  width: "100%",
                  height: "100%",
                }}
                src={previewSrc}
                alt="Avatar"
              />
              <Box
                id="updatePhoto"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0, 0, 0, 0.3)",
                  display: "none",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "14px",
                  cursor: "pointer",
                  flexDirection: "column",
                  textAlign: "center",
                }}
                onClick={triggerFileInput}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <path d="M12 10.25a.75.75 0 0 1 .75.75v1.25H14a.75.75 0 0 1 0 1.5h-1.25V15a.75.75 0 0 1-1.5 0v-1.25H10a.75.75 0 0 1 0-1.5h1.25V11a.75.75 0 0 1 .75-.75"></path>
                  <path d="M9.778 21h4.444c3.121 0 4.682 0 5.803-.735a4.4 4.4 0 0 0 1.226-1.204c.749-1.1.749-2.633.749-5.697s0-4.597-.749-5.697a4.4 4.4 0 0 0-1.226-1.204c-.72-.473-1.622-.642-3.003-.702c-.659 0-1.226-.49-1.355-1.125A2.064 2.064 0 0 0 13.634 3h-3.268c-.988 0-1.839.685-2.033 1.636c-.129.635-.696 1.125-1.355 1.125c-1.38.06-2.282.23-3.003.702A4.4 4.4 0 0 0 2.75 7.667C2 8.767 2 10.299 2 13.364s0 4.596.749 5.697c.324.476.74.885 1.226 1.204C5.096 21 6.657 21 9.778 21M16 13a4 4 0 1 1-8 0a4 4 0 0 1 8 0m2-3.75a.75.75 0 0 0 0 1.5h1a.75.75 0 0 0 0-1.5z"></path>
                </svg>
                <span style={{ color: "white" }}>Update Avatar</span>
              </Box>
            </Box>
          </Box>
          <Box sx={{ marginTop: "15px" }}>
            Allowed: *.jpeg, *.jpg, *.png, *.gif
            <br />
            <small>Max size: 3MB</small>
          </Box>
        </Box>
      </Box>

      {/* Form Section */}
      <Paper
        sx={{
          width: "80%",
          // Ensure the Paper itself can scroll internally if needed,
          // instead of relying on the body scroll.
          // overflow: "hidden", // Original - prevents internal scroll
          overflowY: "auto", // Allows vertical scroll within the Paper if content exceeds its height
          marginLeft: "auto",
          marginBottom: "auto", // This might push content down if Paper height is large
          borderRadius: "15px",
          backgroundColor: "var(--background-item)",
          padding: "24px",
          boxShadow: "var(--box-shadow-paper)",
          // Set a max-height relative to viewport height to contain the Paper
          // Adjust the '90vh' based on your layout (e.g., accounting for headers/footers)
          // Make sure the parent container allows this height.
          maxHeight: "calc(100vh - 50px)", // Example: Subtract approx height of potential headers/margins
          alignSelf: "flex-start", // Align Paper to the top
        }}
      >
        {/* Title */}
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "22px",
            color: "var(--text-color)",
          }}
        >
          {t("COMMON.EMPLOYEE.UPDATE.UPDATE_EMPLOYEE")}
        </Typography>

        {/* Form Fields... */}
        {/* Row 1: FullName / Username */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            mt: "20px",
          }}
        >
          {/* FullName */}
          <Box sx={{ width: "calc(50% - 10px)" }}>
            <TextField
              label={t("COMMON.EMPLOYEE.FULLNAME") + "*"}
              fullWidth
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              error={isSubmit && fullName === ""}
              sx={{
                "& fieldset": {
                  borderRadius: "8px",
                  color: "var(--text-color)",
                  borderColor: "var(--border-color)",
                },
                "& .MuiInputBase-root": { paddingRight: "0px" },
                "& .MuiInputBase-input": {
                  paddingRight: "12px",
                  color: "var(--text-color)",
                  fontSize: "16px",
                  "&::placeholder": {
                    color: "var(--placeholder-color)",
                    opacity: 1,
                  },
                },
                "& .MuiOutlinedInput-root:hover fieldset": {
                  borderColor: "var(--hover-field-color)",
                },
                "& .MuiOutlinedInput-root.Mui-error:hover fieldset": {
                  borderColor: "var(--error-color) !important",
                },
                "& .MuiOutlinedInput-root.Mui-error fieldset": {
                  borderColor: "var(--error-color) !important",
                },
                "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                  borderColor: "var(--selected-field-color)",
                },
                "& .MuiInputLabel-root": { color: "var(--text-label-color)" },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "var(--selected-field-color)",
                },
                "& .MuiInputLabel-root.Mui-error": {
                  color: "var(--error-color)",
                },
              }}
            />
            <Typography
              sx={{
                color: "red",
                margin: "1px 0 0 10px",
                fontSize: "12px",
                visibility: isSubmit && fullName === "" ? "visible" : "hidden",
              }}
            >
              {t("COMMON.TEXTFIELD.REQUIRED")}
            </Typography>
          </Box>
          {/* Username */}
          <Box sx={{ width: "calc(50% - 10px)" }}>
            <TextField
              label={t("COMMON.EMPLOYEE.USERNAME") + "*"}
              fullWidth
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              error={isSubmit && userName === ""}
              sx={{
                "& fieldset": {
                  borderRadius: "8px",
                  color: "var(--text-color)",
                  borderColor: "var(--border-color)",
                },
                "& .MuiInputBase-root": { paddingRight: "0px" },
                "& .MuiInputBase-input": {
                  paddingRight: "12px",
                  color: "var(--text-color)",
                  fontSize: "16px",
                  "&::placeholder": {
                    color: "var(--placeholder-color)",
                    opacity: 1,
                  },
                },
                "& .MuiOutlinedInput-root:hover fieldset": {
                  borderColor: "var(--hover-field-color)",
                },
                "& .MuiOutlinedInput-root.Mui-error:hover fieldset": {
                  borderColor: "var(--error-color) !important",
                },
                "& .MuiOutlinedInput-root.Mui-error fieldset": {
                  borderColor: "var(--error-color) !important",
                },
                "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                  borderColor: "var(--selected-field-color)",
                },
                "& .MuiInputLabel-root": { color: "var(--text-label-color)" },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "var(--selected-field-color)",
                },
                "& .MuiInputLabel-root.Mui-error": {
                  color: "var(--error-color)",
                },
              }}
            />
            <Typography
              sx={{
                color: "red",
                margin: "1px 0 0 10px",
                fontSize: "12px",
                visibility: isSubmit && userName === "" ? "visible" : "hidden",
              }}
            >
              {t("COMMON.TEXTFIELD.REQUIRED")}
            </Typography>
          </Box>
        </Box>

        {/* Row 2: Email / PhoneNumber */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            mt: "7px",
          }}
        >
          {/* Email */}
          <Box sx={{ width: "calc(50% - 10px)" }}>
            <TextField
              label={t("COMMON.EMPLOYEE.EMAIL") + "*"}
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={isSubmit && email === ""}
              sx={{
                "& fieldset": {
                  borderRadius: "8px",
                  color: "var(--text-color)",
                  borderColor: "var(--border-color)",
                },
                "& .MuiInputBase-root": { paddingRight: "0px" },
                "& .MuiInputBase-input": {
                  paddingRight: "12px",
                  color: "var(--text-color)",
                  fontSize: "16px",
                  "&::placeholder": {
                    color: "var(--placeholder-color)",
                    opacity: 1,
                  },
                },
                "& .MuiOutlinedInput-root:hover fieldset": {
                  borderColor: "var(--hover-field-color)",
                },
                "& .MuiOutlinedInput-root.Mui-error:hover fieldset": {
                  borderColor: "var(--error-color) !important",
                },
                "& .MuiOutlinedInput-root.Mui-error fieldset": {
                  borderColor: "var(--error-color) !important",
                },
                "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                  borderColor: "var(--selected-field-color)",
                },
                "& .MuiInputLabel-root": { color: "var(--text-label-color)" },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "var(--selected-field-color)",
                },
                "& .MuiInputLabel-root.Mui-error": {
                  color: "var(--error-color)",
                },
              }}
            />
            <Typography
              sx={{
                color: "red",
                margin: "1px 0 0 10px",
                fontSize: "12px",
                visibility: isSubmit && email === "" ? "visible" : "hidden",
              }}
            >
              {t("COMMON.TEXTFIELD.REQUIRED")}
            </Typography>
          </Box>
          {/* PhoneNumber */}
          <Box sx={{ width: "calc(50% - 10px)" }}>
            <TextField
              label={t("COMMON.EMPLOYEE.PHONENUMBER") + "*"}
              fullWidth
              value={phoneNumber}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setPhoneNumber(value);
                }
              }}
              error={isSubmit && phoneNumber === ""}
              sx={{
                "& fieldset": {
                  borderRadius: "8px",
                  color: "var(--text-color)",
                  borderColor: "var(--border-color)",
                },
                "& .MuiInputBase-root": { paddingRight: "0px" },
                "& .MuiInputBase-input": {
                  paddingRight: "12px",
                  color: "var(--text-color)",
                  fontSize: "16px",
                  "&::placeholder": {
                    color: "var(--placeholder-color)",
                    opacity: 1,
                  },
                },
                "& .MuiOutlinedInput-root:hover fieldset": {
                  borderColor: "var(--hover-field-color)",
                },
                "& .MuiOutlinedInput-root.Mui-error:hover fieldset": {
                  borderColor: "var(--error-color) !important",
                },
                "& .MuiOutlinedInput-root.Mui-error fieldset": {
                  borderColor: "var(--error-color) !important",
                },
                "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                  borderColor: "var(--selected-field-color)",
                },
                "& .MuiInputLabel-root": { color: "var(--text-label-color)" },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "var(--selected-field-color)",
                },
                "& .MuiInputLabel-root.Mui-error": {
                  color: "var(--error-color)",
                },
              }}
            />
            <Typography
              sx={{
                color: "red",
                margin: "1px 0 0 10px",
                fontSize: "12px",
                visibility:
                  isSubmit && phoneNumber === "" ? "visible" : "hidden",
              }}
            >
              {t("COMMON.TEXTFIELD.REQUIRED")}
            </Typography>
          </Box>
        </Box>

        {/* Row 3: Birthday / Gender */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            mt: "7px",
          }}
        >
          {/* Birthday */}
          <Box sx={{ width: "calc(50% - 10px)" }}>
            <TextField
              label={t("COMMON.EMPLOYEE.BIRTHDAY") + "*"}
              type="date"
              fullWidth
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              InputLabelProps={{ shrink: true }}
              error={isSubmit && birthday === ""}
              sx={{
                "& fieldset": {
                  borderRadius: "8px",
                  color: "var(--text-color)",
                  borderColor: "var(--border-color)",
                },
                "& .MuiInputBase-root": { paddingRight: "0px" },
                "& .MuiInputBase-input": {
                  paddingRight: "12px",
                  color: "var(--text-color)",
                  fontSize: "16px",
                  "&::placeholder": {
                    color: "var(--placeholder-color)",
                    opacity: 1,
                  },
                },
                "& .MuiOutlinedInput-root:hover fieldset": {
                  borderColor: "var(--hover-field-color)",
                },
                "& .MuiOutlinedInput-root.Mui-error:hover fieldset": {
                  borderColor: "var(--error-color) !important",
                },
                "& .MuiOutlinedInput-root.Mui-error fieldset": {
                  borderColor: "var(--error-color) !important",
                },
                "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                  borderColor: "var(--selected-field-color)",
                },
                "& .MuiInputLabel-root": { color: "var(--text-label-color)" },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "var(--selected-field-color)",
                },
                "& .MuiInputLabel-root.Mui-error": {
                  color: "var(--error-color)",
                },
              }}
            />
            <Typography
              sx={{
                color: "red",
                margin: "1px 0 0 10px",
                fontSize: "12px",
                visibility: isSubmit && birthday === "" ? "visible" : "hidden",
              }}
            >
              {t("COMMON.TEXTFIELD.REQUIRED")}
            </Typography>
          </Box>
          {/* Gender */}
          <Box sx={{ width: "calc(50% - 10px)" }}>
            <FormControl
              fullWidth
              error={isSubmit && gender === ""}
              sx={{
                "& fieldset": {
                  borderRadius: "8px",
                  color: "var(--text-color)",
                  borderColor: "var(--border-color)",
                },
                "& .MuiInputBase-root": { paddingRight: "0px" },
                "& .MuiInputBase-input": {
                  paddingRight: "12px",
                  color: "var(--text-color)",
                  fontSize: "16px",
                  "&::placeholder": {
                    color: "var(--placeholder-color)",
                    opacity: 1,
                  },
                },
                "& .MuiOutlinedInput-root:hover fieldset": {
                  borderColor: "var(--hover-field-color)",
                },
                "& .MuiOutlinedInput-root.Mui-error:hover fieldset": {
                  borderColor: "var(--error-color) !important",
                },
                "& .MuiOutlinedInput-root.Mui-error fieldset": {
                  borderColor: "var(--error-color) !important",
                },
                "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                  borderColor: "var(--selected-field-color)",
                },
                "& .MuiInputLabel-root": { color: "var(--text-label-color)" },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "var(--selected-field-color)",
                },
                "& .MuiInputLabel-root.Mui-error": {
                  color: "var(--error-color)",
                },
                "& .MuiSelect-icon": {
                  color:
                    isSubmit && gender === ""
                      ? "var(--error-color)"
                      : "var(--text-color)",
                },
              }}
            >
              <InputLabel>{t("COMMON.EMPLOYEE.GENDER") + "*"}</InputLabel>
              <Select
                label={t("COMMON.EMPLOYEE.GENDER") + "*"}
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                MenuProps={{
                  PaperProps: {
                    elevation: 0,
                    sx: {
                      backgroundImage:
                        "url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSJ1cmwoI3BhaW50MF9yYWRpYWxfMjc0OV8xNDUxODYpIiBmaWxsLW9wYWNpdHk9IjAuMTIiLz4KPGRlZnM+CjxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQwX3JhZGlhbF8yNzQ5XzE0NTE4NiIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgxMjAgMS44MTgxMmUtMDUpIHJvdGF0ZSgtNDUpIHNjYWxlKDEyMy4yNSkiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMDBCOEQ5Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwQjhEOSIgc3RvcC1vcGFjaXR5PSIwIi8+CjwvcmFkaWFsR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==), url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSJ1cmwoI3BhaW50MF9yYWRpYWxfMjc0OV8xNDUxODcpIiBmaWxsLW9wYWNpdHk9IjAuMTIiLz4KPGRlZnM+CjxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQwX3JhZGlhbF8yNzQ5XzE0NTE4NyIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgwIDEyMCkgcm90YXRlKDEzNSkgc2NhbGUoMTIzLjI1KSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGRjU2MzAiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkY1NjMwIiBzdG9wLW9wYWNpdHk9IjAiLz4KPC9yYWRpYWxHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K)",
                      backgroundPosition: "top right, bottom left",
                      backgroundSize: "50%, 50%",
                      backgroundRepeat: "no-repeat",
                      padding: "0 8px",
                      backdropFilter: "blur(20px)",
                      borderRadius: "8px",
                      backgroundColor: "var(--background-item)",
                      color: "var(--text-color)",
                      border: "1px solid var(--border-color)",
                      "& .MuiMenuItem-root": {
                        borderRadius: "6px",
                        "&:hover": { backgroundColor: "var(--hover-color)" },
                        "&.Mui-selected": {
                          backgroundColor: "var(--selected-color)",
                          "&:hover": { backgroundColor: "var(--hover-color)" },
                        },
                      },
                    },
                  },
                  autoFocus: false,
                }}
              >
                <MenuItem value="nam">Nam</MenuItem>
                <MenuItem value="nữ">Nữ</MenuItem>
                <MenuItem value="khác">Khác</MenuItem>
              </Select>
              <Typography
                sx={{
                  color: "red",
                  margin: "1px 0 0 10px",
                  fontSize: "12px",
                  visibility: isSubmit && gender === "" ? "visible" : "hidden",
                }}
              >
                {t("COMMON.TEXTFIELD.REQUIRED")}
              </Typography>
            </FormControl>
          </Box>
        </Box>

        {/* Row 4: Address / Roles */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            mt: "7px",
          }}
        >
          {/* Address */}
          <Box sx={{ width: "calc(50% - 10px)" }}>
            <TextField
              label={t("COMMON.EMPLOYEE.ADDRESS") + "*"}
              fullWidth
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              error={isSubmit && address === ""}
              sx={{
                "& fieldset": {
                  borderRadius: "8px",
                  color: "var(--text-color)",
                  borderColor: "var(--border-color)",
                },
                "& .MuiInputBase-root": { paddingRight: "0px" },
                "& .MuiInputBase-input": {
                  paddingRight: "12px",
                  color: "var(--text-color)",
                  fontSize: "16px",
                  "&::placeholder": {
                    color: "var(--placeholder-color)",
                    opacity: 1,
                  },
                },
                "& .MuiOutlinedInput-root:hover fieldset": {
                  borderColor: "var(--hover-field-color)",
                },
                "& .MuiOutlinedInput-root.Mui-error:hover fieldset": {
                  borderColor: "var(--error-color) !important",
                },
                "& .MuiOutlinedInput-root.Mui-error fieldset": {
                  borderColor: "var(--error-color) !important",
                },
                "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                  borderColor: "var(--selected-field-color)",
                },
                "& .MuiInputLabel-root": { color: "var(--text-label-color)" },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "var(--selected-field-color)",
                },
                "& .MuiInputLabel-root.Mui-error": {
                  color: "var(--error-color)",
                },
              }}
            />
            <Typography
              sx={{
                color: "red",
                margin: "1px 0 0 10px",
                fontSize: "12px",
                visibility: isSubmit && address === "" ? "visible" : "hidden",
              }}
            >
              {t("COMMON.TEXTFIELD.REQUIRED")}
            </Typography>
          </Box>
          {/* Roles */}
          <Box sx={{ width: "calc(50% - 10px)" }}>
            <FormControl
              fullWidth
              error={isSubmit && roles.length === 0}
              sx={{
                "& fieldset": {
                  borderRadius: "8px",
                  color: "var(--text-color)",
                  borderColor: "var(--border-color)",
                },
                "& .MuiInputBase-root": { paddingRight: "0px" },
                "& .MuiInputBase-input": {
                  paddingRight: "12px",
                  color: "var(--text-color)",
                  fontSize: "16px",
                  "&::placeholder": {
                    color: "var(--placeholder-color)",
                    opacity: 1,
                  },
                },
                "& .MuiOutlinedInput-root:hover fieldset": {
                  borderColor: "var(--hover-field-color)",
                },
                "& .MuiOutlinedInput-root.Mui-error:hover fieldset": {
                  borderColor: "var(--error-color) !important",
                },
                "& .MuiOutlinedInput-root.Mui-error fieldset": {
                  borderColor: "var(--error-color) !important",
                },
                "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                  borderColor: "var(--selected-field-color)",
                },
                "& .MuiInputLabel-root": { color: "var(--text-label-color)" },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "var(--selected-field-color)",
                },
                "& .MuiInputLabel-root.Mui-error": {
                  color: "var(--error-color)",
                },
                "& .MuiSelect-icon": {
                  color:
                    isSubmit && roles.length === 0
                      ? "var(--error-color)"
                      : "var(--text-color)",
                },
              }}
            >
              <InputLabel>{t("COMMON.EMPLOYEE.ROLES") + "*"}</InputLabel>
              <Select
                label={t("COMMON.EMPLOYEE.ROLES") + "*"}
                multiple
                value={roles}
                onChange={(event) => setRoles(event.target.value as string[])}
                renderValue={(selected) => (selected as string[]).join(", ")}
                MenuProps={{
                  PaperProps: {
                    elevation: 0,
                    sx: {
                      backgroundImage:
                        "url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSJ1cmwoI3BhaW50MF9yYWRpYWxfMjc0OV8xNDUxODYpIiBmaWxsLW9wYWNpdHk9IjAuMTIiLz4KPGRlZnM+CjxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQwX3JhZGlhbF8yNzQ5XzE0NTE4NiIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgxMjAgMS44MTgxMmUtMDUpIHJvdGF0ZSgtNDUpIHNjYWxlKDEyMy4yNSkiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMDBCOEQ5Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwQjhEOSIgc3RvcC1vcGFjaXR5PSIwIi8+CjwvcmFkaWFsR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==), url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSJ1cmwoI3BhaW50MF9yYWRpYWxfMjc0OV8xNDUxODcpIiBmaWxsLW9wYWNpdHk9IjAuMTIiLz4KPGRlZnM+CjxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQwX3JhZGlhbF8yNzQ5XzE0NTE4NyIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgwIDEyMCkgcm90YXRlKDEzNSkgc2NhbGUoMTIzLjI1KSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGRjU2MzAiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkY1NjMwIiBzdG9wLW9wYWNpdHk9IjAiLz4KPC9yYWRpYWxHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K)",
                      backgroundPosition: "top right, bottom left",
                      backgroundSize: "50%, 50%",
                      backgroundRepeat: "no-repeat",
                      padding: "0 8px",
                      backdropFilter: "blur(20px)",
                      borderRadius: "8px",
                      backgroundColor: "var(--background-item)",
                      color: "var(--text-color)",
                      border: "1px solid var(--border-color)",
                      "& .MuiMenuItem-root": {
                        borderRadius: "6px",
                        "&:hover": { backgroundColor: "var(--hover-color)" },
                        "&.Mui-selected": {
                          backgroundColor: "var(--selected-color)",
                          "&:hover": { backgroundColor: "var(--hover-color)" },
                        },
                      },
                    },
                  },
                  autoFocus: false,
                }}
              >
                {MOCK_ROLES.map((roleItem) => (
                  <MenuItem key={roleItem.Name} value={roleItem.Name}>
                    <Checkbox
                      checked={roles.includes(roleItem.Name)}
                      sx={{
                        color: "var(--text-color)",
                        "&.Mui-checked": {
                          color: "var(--selected-field-color)",
                        },
                      }}
                    />
                    <ListItemText primary={roleItem.Name} />
                  </MenuItem>
                ))}
              </Select>
              <Typography
                sx={{
                  color: "red",
                  margin: "1px 0 0 10px",
                  fontSize: "12px",
                  visibility:
                    isSubmit && roles.length === 0 ? "visible" : "hidden",
                }}
              >
                {t("COMMON.TEXTFIELD.REQUIRED")}
              </Typography>
            </FormControl>
          </Box>
        </Box>

        {/* Row 5: Balance */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            mt: "7px",
          }}
        >
          <Box sx={{ width: "calc(50% - 10px)" }}>
            <TextField
              label={t("Balance") + "*"}
              fullWidth
              type="number"
              value={balance}
              InputProps={{ inputProps: { min: 0 } }}
              onChange={(e) => setBalance(e.target.value)}
              error={isSubmit && balance === ""}
              sx={{
                "& fieldset": {
                  borderRadius: "8px",
                  color: "var(--text-color)",
                  borderColor: "var(--border-color)",
                },
                "& .MuiInputBase-root": { paddingRight: "0px" },
                "& .MuiInputBase-input": {
                  paddingRight: "12px",
                  color: "var(--text-color)",
                  fontSize: "16px",
                  "&::placeholder": {
                    color: "var(--placeholder-color)",
                    opacity: 1,
                  },
                },
                "& .MuiOutlinedInput-root:hover fieldset": {
                  borderColor: "var(--hover-field-color)",
                },
                "& .MuiOutlinedInput-root.Mui-error:hover fieldset": {
                  borderColor: "var(--error-color) !important",
                },
                "& .MuiOutlinedInput-root.Mui-error fieldset": {
                  borderColor: "var(--error-color) !important",
                },
                "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                  borderColor: "var(--selected-field-color)",
                },
                "& .MuiInputLabel-root": { color: "var(--text-label-color)" },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "var(--selected-field-color)",
                },
                "& .MuiInputLabel-root.Mui-error": {
                  color: "var(--error-color)",
                },
              }}
            />
            <Typography
              sx={{
                color: "red",
                margin: "1px 0 0 10px",
                fontSize: "12px",
                visibility: isSubmit && balance === "" ? "visible" : "hidden",
              }}
            >
              {t("COMMON.TEXTFIELD.REQUIRED")}
            </Typography>
          </Box>
          <Box sx={{ width: "calc(50% - 10px)" }} />
        </Box>

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            mt: "20px",
            // Make buttons sticky at the bottom if Paper scrolls
            position: "sticky",
            bottom: 0,
            backgroundColor: "var(--background-item)", // Match paper background
            py: 2, // Add some padding
            borderTop: "1px solid var(--border-color)", // Optional separator
            zIndex: 1, // Ensure buttons stay above scrolled content
          }}
        >
          <Button
            variant="contained"
            startIcon={<RefreshCcwIcon />}
            sx={{
              height: "44px",
              backgroundColor: "var(--button-color)",
              width: "auto",
              fontSize: "16px",
              "&:hover": { backgroundColor: "var(--hover-button-color)" },
              padding: "0px 20px",
              fontWeight: "bold",
              whiteSpace: "nowrap",
              textTransform: "none",
            }}
            onClick={() => window.location.reload()}
          >
            {t("COMMON.BUTTON.REFRESH")}
          </Button>

          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            sx={{
              height: "44px",
              backgroundColor: "var(--button-color)",
              width: "auto",
              padding: "0px 20px",
              fontSize: "16px",
              "&:hover": { backgroundColor: "var(--hover-button-color)" },
              fontWeight: "bold",
              whiteSpace: "nowrap",
              textTransform: "none",
            }}
            onClick={handleSave}
          >
            {t("COMMON.BUTTON.SAVE")}
          </Button>

          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            sx={{
              height: "44px",
              backgroundColor: "var(--button-color)",
              width: "auto",
              padding: "0px 20px",
              "&:hover": { backgroundColor: "var(--hover-button-color)" },
              fontSize: "16px",
              fontWeight: "bold",
              whiteSpace: "nowrap",
              textTransform: "none",
            }}
            onClick={handleSaveAndClose}
          >
            {t("COMMON.BUTTON.SAVE_AND_CLOSE")}
          </Button>

          <Button
            variant="contained"
            startIcon={<XIcon />}
            sx={{
              height: "44px",
              backgroundColor: "var(--button-color)",
              width: "auto",
              fontSize: "16px",
              "&:hover": { backgroundColor: "var(--hover-button-color)" },
              padding: "0px 20px",
              fontWeight: "bold",
              whiteSpace: "nowrap",
              textTransform: "none",
            }}
            onClick={() => router.push("/login")}
          >
            {t("COMMON.BUTTON.CLOSE")}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default UpdateEmployeePageSimplified;
