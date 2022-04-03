import React, { useState } from "react";
import { useUpdate } from "../../hooks/useUpdate";
import {
  Modal,
  Typography,
  Box,
  Fab,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #ffc400",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};
export default function UpdateModal({ open, handleClose, id, jobName }) {
  const [validationPriority, setValidationPriority] = useState(false);
  const [jobPriority, setJobPriority] = useState("");
  const { handleUpdate } = useUpdate("jobs");

  const handleUpdateModal = () => {
    if (jobPriority === "") {
      setValidationPriority(true);
    } else {
      setValidationPriority(false);
      handleClose();
      handleUpdate(id, jobPriority, jobName);
    }
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Job Edit
        </Typography>
        <form>
          <Box sx={{ textAlign: "start", p: 2 }}>
            <TextField
              fullWidth
              label="Job Name"
              defaultValue={jobName}
              InputProps={{
                readOnly: true,
              }}
            />
            <FormControl fullWidth sx={{ my: 2 }}>
              <InputLabel>Job Priority</InputLabel>

              <Select
                error={validationPriority}
                value={jobPriority}
                onChange={(e) => {
                  setJobPriority(e.target.value);
                }}
                label="Job Priority"
              >
                <MenuItem sx={{ color: "#ff1744" }} value={1}>
                  Urgent
                </MenuItem>
                <MenuItem sx={{ color: "#ffc400" }} value={2}>
                  Regular
                </MenuItem>
                <MenuItem sx={{ color: "#3d5afe" }} value={3}>
                  Trival
                </MenuItem>
              </Select>
            </FormControl>
          </Box>

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
              onClick={handleUpdateModal}
              color="warning"
              sx={{ width: 120, ml: 3 }}
            >
              <Edit sx={{ mr: 1 }} />
              Save
            </Fab>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
