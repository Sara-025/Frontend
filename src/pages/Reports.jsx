import React, { useState, useEffect } from "react";
import "./Reports.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Box,
  InputAdornment,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
  Snackbar,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Reports = () => {
  const navigate = useNavigate();

  const [reports, setReports] = useState([]); 
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const fetchReports = async () => {
    try {
      const response = await axios.get("http://10.110.15.150:3000/admin/report", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`, 
        },
      });
      console.log("Fetched Reports:", response.data);
      setReports(response.data); 
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.error || "Failed to fetch reports",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    fetchReports(); 
  }, []);

  const navigateToSuspend = (report) => {
    navigate(`/Suspend/${report.id}`);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className="Reports-Main">
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2, paddingLeft: "30px", paddingBottom: "10px", borderRadius: "30px" }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            width: "930px",
            height: "48px",
            borderRadius: "30px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#4763E4" },
              "&:hover fieldset": { borderColor: "#4763E4" },
              "&.Mui-focused fieldset": { borderColor: "#4763E4" },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "black" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer component={Paper} sx={{ maxWidth: "100%", mx: "auto", borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "rgb(255, 255, 255)" }}>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Created At</TableCell>
              <TableCell align="center">Team ID</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports
              .filter((report) =>
                (report?.title?.toLowerCase() || "").includes(searchQuery.toLowerCase())
              )
              .map((report) => (
                <TableRow key={report.id} hover>
                  <TableCell align="center">{report?.title || "No Title"}</TableCell>
                  <TableCell align="center">
                    {new Date(report?.createdAt || "").toLocaleString() || "Invalid Date"}
                  </TableCell>
                  <TableCell align="center">{report?.teamId || "N/A"}</TableCell>
                  <TableCell align="center">
                    <button className="suspend" onClick={() => navigateToSuspend(report)}>View Details</button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Reports;
