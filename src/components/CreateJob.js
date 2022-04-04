import {
  Container,
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import Add from "@mui/icons-material/Add";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import React, { useState } from "react";
import { useAddJob } from "../hooks/useAddJob";

let theme = createTheme();
theme = responsiveFontSizes(theme);
export default function CreateJob() {
  const { addJob } = useAddJob("jobs");

  const [validationJob, setValidationJob] = useState({
    jobValid: false,
    jobValidText: "",
  });

  const [validationPriority, setValidationPriority] = useState(false);

  const [job, setJob] = useState({
    jobName: "",
    jobPriority: "",
  });

  const handleChange = (prop) => (event) => {
    setJob({ ...job, [prop]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (job.jobName.length > 255) {
      setValidationJob({
        ...validationJob,
        jobValid: true,
        jobValidText: "max 255 characters!",
      });
    } else if (job.jobName.length === 0) {
      setValidationJob({
        ...validationJob,
        jobValid: true,
        jobValidText: "fill in the job field!",
      });
    } else if (job.jobPriority === "") {
      setValidationPriority(true);
    } else {
      addJob(job);
      setJob({
        jobName: "",
        jobPriority: "",
      });
      setValidationPriority(false);
      setValidationJob({
        ...validationJob,
        jobValid: false,
      });
    }
  };
  return (
    <Container>
      <ThemeProvider theme={theme}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ flexGrow: 1, mt: 3 }}>
            <Typography sx={{ fontWeight: "bold", mb: 2 }} variant="h6">
              Create New Job
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={7}>
                <TextField
                  error={validationJob.jobValid}
                  value={job.jobName}
                  onChange={handleChange("jobName")}
                  fullWidth
                  label="Job Name"
                  variant="outlined"
                  autoComplete="off"
                  helperText={
                    validationJob.jobValid ? validationJob.jobValidText : ""
                  }
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel>Job Priority</InputLabel>

                  <Select
                    error={validationPriority}
                    value={job.jobPriority}
                    onChange={handleChange("jobPriority")}
                    fullWidth
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
              </Grid>
              <Grid item xs={4} md={2}>
                <Button
                  type="submit"
                  sx={{ height: 56 }}
                  size="large"
                  fullWidth
                  variant="contained"
                >
                  <Add sx={{ mr: 1 }} />
                  Create
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </ThemeProvider>
    </Container>
  );
}
