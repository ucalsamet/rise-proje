import React from "react";
import { useDelete } from "../../hooks/useDelete";
import { Modal, Typography, Box, Fab } from "@mui/material";
import { ErrorOutline, DeleteForeverOutlined } from "@mui/icons-material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #ab003c",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};
export default function DeleteModal({ open, handleClose, id }) {
  const { handleDelete } = useDelete("jobs");

  const handleDeleteModal = () => {
    handleClose()
    handleDelete(id)
  } 
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <ErrorOutline sx={{ color: "#ab003c", fontSize: 60, mb: 1 }} />
        <Typography variant="h6">
          Are you sure you want to delete it?
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Fab
            variant="extended"
            onClick={handleClose}
            sx={{ width: 120, mr: 3 }}
          >
            Cancel
          </Fab>
          <Fab
            variant="extended"
            onClick={handleDeleteModal}
            color="error"
            sx={{ width: 120, ml: 3 }}
          >
            <DeleteForeverOutlined sx={{ mr: 1 }} />
            Approve
          </Fab>
        </Box>
      </Box>
    </Modal>
  );
}
