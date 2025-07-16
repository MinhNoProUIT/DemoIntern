"use client";

import { ITransactionListItem } from "@/interfaces/transaction.interface";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import { X } from "lucide-react";

interface DetailTransactionProps {
  open: boolean;
  onClose: () => void;
  transaction: ITransactionListItem;
}

const DetailTransaction = ({
  open,
  onClose,
  transaction,
}: DetailTransactionProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="detail-transaction-modal"
      aria-describedby="modal-for-detail-transaction"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          outline: "none",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "grey.500",
          }}
        >
          <X />
        </IconButton>

        <Typography variant="h5" mb={2}>
          Chi tiết giao dịch
        </Typography>
        <Typography variant="body1" mb={1}>
          Tên: {transaction.name}
        </Typography>
        <Typography variant="body1" mb={1}>
          ID: {transaction.id}
        </Typography>
        <Typography variant="body1" mb={1}>
          Số tiền: {transaction.amount}
        </Typography>
        <Typography variant="body1" mb={1}>
          Nội dung: {transaction.content}
        </Typography>
        <Typography variant="body1">
          Ngày giao dịch: {transaction.date.toDateString()}
        </Typography>
      </Box>
    </Modal>
  );
};

export default DetailTransaction;
