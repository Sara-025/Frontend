import  { useState, useEffect } from "react";
import axios from "axios";
import "./Reports.css";
import { useNavigate } from "react-router-dom";
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

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/admin/report`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((res) => {
        setReports(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        setSnackbar({
          open: true,
          message: "Failed to load reports",
          severity: "error",
        });
      });
  }, []);

  const navigateToviewDetails = (report) => {
    navigate(`/reports/${report.id}`, { state: { report } });

  };

  const handleMarkAsDuplicate = (reportId) => {
    axios
      .post(
        `${import.meta.env.VITE_API_BASE_URL}/admin/duplicate`,
        { reportid: reportId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      )
      .then(() => {
        setReports((prevReports) =>
          prevReports.map((r) =>
            r.id === reportId ? { ...r, status: "DUPLICATE" } : r
          )
        );
        setSnackbar({
          open: true,
          message: "Report marked as duplicate",
          severity: "success",
        });
      })
      .catch(() => {
        setSnackbar({
          open: true,
          message: "Failed to mark report as duplicate",
          severity: "error",
        });
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className="Reports-Main">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 2,
          paddingLeft: "30px",
          paddingBottom: "10px",
          borderRadius: "30px",
        }}
      >
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
              <TableCell align="center"> ID</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports
              .filter((report) =>
                (report?.title?.toLowerCase() || "").includes(searchQuery.toLowerCase())
              )
              .map((report) => (
                <TableRow
                  key={report.id}
                  hover
                  style={{
                    backgroundColor: report.status === "MAYBEDUPLICATE" ? "#ffe7e1" : "inherit",
                  }}
                >
                  <TableCell align="center">{report.title}</TableCell>
                  <TableCell align="center">{new Date(report.createdAt).toLocaleString()}</TableCell>
                  <TableCell align="center">{report.teamId ?? "N/A"}</TableCell>
                  <TableCell align="center">
                    <button
                      className="viewDetails"
                      onClick={() => navigateToviewDetails(report)}
                    >
                      View Details
                    </button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      
    </div>
  );
};

export default Reports;
