import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  TextField,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Chip,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const Teams = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [teams, setTeams] = useState([]);
  const [newTeam, setNewTeam] = useState({   
    phonenumber: "",
    password: "",
  });

  const fetchTeams = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/team`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      const mapped = res.data.map((t) => ({
        id: t.id,
        name: `Team ${t.id}`,
        phonenumber: t.phonenumber,
        region: t.region?.name || "",
        status: t.isoccupied ? "Actif" : "Inactif",
      }));

      setTeams(mapped);
    } catch (err) {
      console.error("Error fetching teams", err);
      setSnackbar({
        open: true,
        message: "Failed to fetch teams.",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleAddTeam = async () => {
    if (!newTeam.phonenumber || !newTeam.password) {
      setSnackbar({
        open: true,
        message: "Phone number and password are required.",
        severity: "warning",
      });
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/admin/team`,
        {
          phonenumber: newTeam.phonenumber,
          password: newTeam.password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      if (response.status === 200) {
        setSnackbar({
          open: true,
          message: "Your team was added successfully",
          severity: "success",
        });

        await fetchTeams();

        setNewTeam({  phonenumber: "", password: "" });
        setAddDialogOpen(false);
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      const errMsg = error.response?.data?.error || "Failed to add team";
      console.error("Add team error:", errMsg);

      setSnackbar({
        open: true,
        message: errMsg,
        severity: "error",
      });
    }
  };

  const filteredTeams = teams.filter(
    (team) =>
      (team.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.phonenumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Box sx={{ p: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 2 }}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setAddDialogOpen(true)}
            sx={{ alignSelf: "start" }}
          >
            Add Team
          </Button>
        </Box>
        <Box sx={{ flex: 1, p: 2 }}>
          <DataGrid
            rows={filteredTeams}
            columns={[
              {
                field: "name",
                headerName: "Name",
                width: 300,
                renderCell: (params) => (
                  <h6 style={{ color: "#1886e7", textTransform: "uppercase" }}>
                    {params.value}
                  </h6>
                ),
              },
              {
                field: "phonenumber",
                headerName: "Phone Number",
                width: 300,
              },
              {
                field: "status",
                headerName: "Status",
                width: 300,
                renderCell: (params) => (
                  <Chip
                    label={params.value}
                    color={params.value === "Actif" ? "success" : "error"}
                  />
                ),
              },
            ]}
            disableColumnMenu
            hideFooterSelectedRowCount
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f5f5f5",
              },
              "& .MuiDataGrid-virtualScroller": {
                overflowX: "hidden !important",
              },
            }}
            autoHeight
            hideFooterPagination
          />
        </Box>

        {/* Add Team Dialog */}
        <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
          <DialogTitle>Add New Team</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={newTeam.password}
              onChange={(e) => setNewTeam({ ...newTeam, password: e.target.value })}
              margin="dense"
            />
            <TextField
              fullWidth
              label="Phone Number"
              value={newTeam.phonenumber}
              onChange={(e) => setNewTeam({ ...newTeam, phonenumber: e.target.value })}
              margin="dense"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddTeam} variant="contained">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default Teams;
