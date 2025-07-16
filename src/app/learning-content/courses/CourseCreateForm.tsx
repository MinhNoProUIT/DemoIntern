import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    Box,
    Select,
    MenuItem,
    Typography,
    FormControl,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getLevelBgColor, getLevelTextColor } from "./CoursesTable";

export default function CourseCreateForm({
    open,
    onClose,
    onSubmit,
    initialData,
}: {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    initialData?: any;
}) {
    const { t } = useTranslation("common");
    const [form, setForm] = useState({ title: "", topic: "", level: "", description: "", image: "" });

    useEffect(() => {
        if (initialData) setForm(initialData);
        else setForm({ title: "", topic: "", level: "", description: "", image: "" });
    }, [initialData]);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth
            sx={{
                '& .MuiPaper-root': {
                    backgroundColor: "var(--background-item)",
                    color: "var(--text-color)",
                    padding: '10px 4px',
                    borderRadius: '15px'
                },
                '& .MuiDialogContent-root': {
                    padding: 0,
                },
                "& fieldset": {
                    borderRadius: "10px",
                    borderColor: "var(--border-color)",
                },
                "& .MuiInputBase-input": {
                    padding: "15px 10px",
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
                "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                    borderColor: "var(--selected-field-color)",
                },
            }}
        >
            <DialogTitle sx={{
                padding: '8px 24px',
                paddingTop: '16px',
                fontWeight: 'bold',
                textAlign: 'center',
            }}>
                {initialData ?
                    t("COMMON.COURSES.FORM.TITLE_UPDATE")
                    : t("COMMON.COURSES.FORM.TITLE_CREATE")}
            </DialogTitle>

            <DialogContent>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: '20px',
                    padding: '15px 24px'
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <Typography>
                            {t("COMMON.COURSES.TABLE.title")}
                        </Typography>
                        <TextField fullWidth value={form.title}
                            placeholder={t("COMMON.COURSES.FORM.ENTER_COURSE_NAME")}
                            onChange={(e) => setForm({ ...form, title: e.target.value })} />
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        gap: '18px',
                    }}>
                        <FormControl fullWidth sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <Typography>
                                {t("COMMON.COURSES.TABLE.topic")}
                            </Typography>
                            <Select
                                value={form.topic}
                                onChange={(e) => setForm({ ...form, topic: e.target.value })}
                                displayEmpty
                                sx={{
                                    height: '61px',
                                    "& .MuiSelect-icon": {
                                        color: "var(--text-color)",
                                    },
                                }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            boxSizing: 'border-box',
                                            padding: "0 8px",
                                            border: "1px solid var(--border-color)",
                                            backgroundColor: "var(--background-item)",
                                            color: "var(--text-color)",
                                            "& .MuiMenuItem-root": {
                                                borderRadius: "6px",
                                                "&:hover": {
                                                    backgroundColor: "var(--hover-color)",
                                                },
                                                "&.Mui-selected": {
                                                    backgroundColor: "var(--selected-color)",
                                                },
                                            },
                                        },
                                    },
                                }}
                            >
                                <MenuItem value="" disabled>
                                    {t("COMMON.COURSES.FORM.SELECT_TOPIC")}     {/* placeholder */}
                                </MenuItem>
                                {["People-lifestyle", "Business", "Education", "Economy"].map((item) => (
                                    <MenuItem value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <Typography>
                                {t("COMMON.COURSES.TABLE.level")}
                            </Typography>
                            <Select
                                value={form.level}
                                onChange={(e) => setForm({ ...form, level: e.target.value })}
                                displayEmpty
                                sx={{
                                    height: '61px',
                                    "& .MuiSelect-icon": {
                                        color: "var(--text-color)",
                                    },
                                }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            boxSizing: 'border-box',
                                            padding: "0 8px",
                                            border: "1px solid var(--border-color)",
                                            backgroundColor: "var(--background-item)",
                                            color: "var(--text-color)",
                                            "& .MuiMenuItem-root": {
                                                borderRadius: "6px",
                                                "&:hover": {
                                                    backgroundColor: "var(--hover-color)",
                                                },
                                                "&.Mui-selected": {
                                                    backgroundColor: "var(--selected-color)",
                                                },
                                            },
                                        },
                                    },
                                }}
                            >
                                <MenuItem value="" disabled>
                                    {t("COMMON.COURSES.FORM.SELECT_LEVEL")}     {/* placeholder */}
                                </MenuItem>
                                {["A1 - A2", "B1 - B2", "C1 - C2"].map((item) => (
                                    <MenuItem value={item}
                                        sx={{
                                            backgroundColor: "var(--background-item)"
                                        }}
                                    >
                                        <Box sx={{
                                            display: 'inline-flex',
                                            paddingX: 1.5,
                                            paddingY: 0.5,
                                            borderRadius: 2,
                                            backgroundColor: getLevelBgColor(item),
                                            color: getLevelTextColor(item),
                                            fontWeight: 'bold',
                                        }}>
                                            {item}
                                        </Box>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <Typography>
                            {t("COMMON.COURSES.TABLE.description")}
                        </Typography>
                        <TextField fullWidth value={form.description}
                            placeholder={t("COMMON.COURSES.FORM.ENTER_DESCRIPTION")}
                            onChange={(e) => setForm({ ...form, description: e.target.value })} />
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <Typography>
                            {t("COMMON.COURSES.TABLE.image")}
                        </Typography>
                        <TextField fullWidth value={form.image}
                            placeholder={t("COMMON.COURSES.FORM.ENTER_IMAGE")}
                            onChange={(e) => setForm({ ...form, image: e.target.value })} />
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions sx={{
                alignSelf: 'center',
                padding: '16px',
                gap: '10px',
            }}>
                <Button onClick={onClose}
                    sx={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: 'var(--text-color)',
                        textTransform: "none",
                    }}
                >
                    {t("COMMON.BUTTON.CANCEL")}
                </Button>
                <Button onClick={() => onSubmit(form)} variant="contained"
                    sx={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        borderRadius: '8px',
                        backgroundColor: "#03d794",
                        textTransform: "none",
                    }}
                >
                    {t("COMMON.BUTTON.SAVE")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
