import React, { useState, useContext } from "react";
import {
  Box,
  Grid,
  TextField,
  FormControl,
  MenuItem,
  Select,
  Typography,
  InputAdornment,
  Container,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import JobTable from "./JobTable";
import { JobContext } from "../../contexts/JobContext";

export default function JobSearch() {
  const { jobs } = useContext(JobContext);
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState(0);
  return (
    <Container sx={{ mt: 10 }}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <Grid item>
          <Typography sx={{ fontWeight: "bold", mb: 5 }} variant="h6">
            Job List
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            sx={{ fontWeight: "secondary", mb: 5 }}
            variant="subtitle2"
          >
            ({jobs.length}/{jobs &&
            jobs
              .filter((p) => {
                if (priority === 0) {
                  return p;
                } else {
                  return p.jobPriority === priority;
                }
              }).length
              })
          </Typography>
        </Grid>
      </Grid>

      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "#70d9e7",
          alignItems: "center",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
        <Grid sx={{ p: 2 }} container spacing={3}>
          <Grid item md={8} sm={12} xs={12}>
            <TextField
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              sx={{ bgcolor: "#b2ebf2", mode: "light" }}
              type="search"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            <FormControl fullWidth>
              <Select
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                sx={{ bgcolor: "#b2ebf2" }}
                value={priority}
                onChange={(e) => {
                  setPriority(e.target.value);
                }}
              >
                <MenuItem sx={{ color: "#76ff03" }} value={0}>
                  Priority (all)
                </MenuItem>
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
        </Grid>
      </Box>

      <JobTable search={search} priority={priority} />
    </Container>
  );
}
