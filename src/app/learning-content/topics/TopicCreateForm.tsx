import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    Box,
    Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function TopicCreateForm({
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
    const [form, setForm] = useState({ name: "", note: "" });

    useEffect(() => {
        if (initialData) setForm(initialData);
        else setForm({ name: "", note: "" });
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
                    t("COMMON.TOPIC.FORM.TITLE_UPDATE")
                    : t("COMMON.TOPIC.FORM.TITLE_CREATE")}
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
                        gap: '3px',
                    }}>
                        <Typography>
                            {t("COMMON.TOPIC.TABLE.name")}
                        </Typography>
                        <TextField fullWidth value={form.name}
                            placeholder={t("COMMON.TOPIC.FORM.ENTER_TOPIC_NAME")}
                            onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '3px',
                    }}>
                        <Typography>
                            {t("COMMON.TOPIC.TABLE.note")}
                        </Typography>
                        <TextField fullWidth value={form.note}
                            placeholder={t("COMMON.TOPIC.FORM.ENTER_NOTES")}
                            onChange={(e) => setForm({ ...form, note: e.target.value })} />
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
