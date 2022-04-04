/* eslint-disable array-callback-return */
import React, { useState, useContext } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Fab,
  Grid,
} from "@mui/material";
import { Delete, Create } from "@mui/icons-material";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";

import { JobContext } from "../../contexts/JobContext";
import DeleteModal from "../modals/DeleteModal";
import UpdateModal from "../modals/UpdateModal";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const style = (priority) => {
  if (priority === 1) {
    return "#ff1744";
  }
  if (priority === 2) {
    return "#ff9100";
  }
  if (priority === 3) {
    return "#3d5afe";
  }
};

const text = (priority) => {
  if (priority === 1) {
    return "Urgent";
  }
  if (priority === 2) {
    return "Regular";
  }
  if (priority === 3) {
    return "Trival";
  }
};

export default function JobTable({ search, priority }) {
  const { jobs } = useContext(JobContext);

  const [modalDelete, setModalDelete] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);

  const [id, setId] = useState(null);
  const [jobName, setJobName] = useState("");

  const handleDeleteOpen = (e, id) => {
    setId(id);
    setModalDelete(true);
  };
  const handleDeleteClose = () => {
    setModalDelete(false);
  };

  const handleUpdateOpen = (e, id, jobName) => {
    setId(id);
    setJobName(jobName);
    setModalUpdate(true);
  };
  const handleUpdateClose = () => {
    setModalUpdate(false);
  };
  if (jobs) {
    jobs.sort(function (a, b) {
      return a.jobPriority - b.jobPriority;
    });
  }

  return (
    <TableContainer>
      <ThemeProvider theme={theme}>
        <Table>
          <TableHead sx={{ backgroundColor: "#00bcd4" }}>
            <TableRow>
              <TableCell>
                <Typography
                  sx={{ fontWeight: "bold" }}
                  variant="h6"
                  color="white"
                >
                  Name
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography
                  sx={{ fontWeight: "bold" }}
                  variant="h6"
                  color="white"
                >
                  Priority
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography
                  sx={{ fontWeight: "bold" }}
                  variant="h6"
                  color="white"
                >
                  Action
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs &&
              jobs
                .filter((p) => {
                  if (priority === 0) {
                    return p;
                  } else {
                    return p.jobPriority === priority;
                  }
                })
                .filter((i) => {
                  if (search === "") {
                    return i;
                  } else if (
                    i.jobName.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return i;
                  }
                })
                .map((job) => (
                  <TableRow key={job.id}>
                    <TableCell component="th" scope="row">
                      <Typography variant="h6" color="dark">
                        {job.jobName}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Paper
                        sx={{
                          p: 1.2,
                          textAlign: "center",
                          width: 50,
                          backgroundColor: style(job.jobPriority),
                        }}
                      >
                        <Typography variant="inherit" color="white">
                          {text(job.jobPriority)}
                        </Typography>
                      </Paper>
                    </TableCell>
                    <TableCell align="left">
                      <Grid container spacing={1}>
                        <Grid item>
                          <Fab
                            size="small"
                            color="error"
                            onClick={(e) => {
                              handleDeleteOpen(e, job.id);
                            }}
                          >
                            <Delete />
                          </Fab>
                        </Grid>
                        <Grid item>
                          <Fab
                            size="small"
                            color="warning"
                            onClick={(e) => {
                              handleUpdateOpen(e, job.id, job.jobName);
                            }}
                            aria-label="create"
                          >
                            <Create />
                          </Fab>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        <DeleteModal
          open={modalDelete}
          handleClose={handleDeleteClose}
          id={id}
        />
        <UpdateModal
          open={modalUpdate}
          handleClose={handleUpdateClose}
          id={id}
          jobName={jobName}
        />
      </ThemeProvider>
    </TableContainer>
  );
}
