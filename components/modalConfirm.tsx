import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  onClose,
  onConfirm,
  message,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          color: "#1976d2",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          {message}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "end", gap: 2 }}>
          <Button variant="contained" onClick={onConfirm}>
            Yes
          </Button>
          <Button variant="outlined" onClick={onClose}>
            No
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
