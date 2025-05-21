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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
//import EditIcon from "@mui/icons-material/Edit";
//import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
// import { toast } from 'react-toastify';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const Teams = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // success, error, info, warning
  });

  useEffect(() => {
    axios
      .get("http://10.110.15.150:3000/admin/team", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((res) => {
        console.log("API response:", res.data);
        const mapped = res.data.map((t) => ({
          id: t.id,
          name: `Team ${t.id}`,
          phonenumber: t.phonenumber,
          region: t.region?.name || "",
          status: t.isoccupied ? "Actif" : "Inactif",
          groupMembers: [],
        }));
        setTeams(mapped);
      })
      .catch((err) => {
        console.error("Error fetching teams", err);
      });
  }, []);

  const handleAddTeam = async () => {
    if (!newTeam.phonenumber || !newTeam.password) {
      alert("Phone number and password are required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://10.110.15.150:3000/admin/team",
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
        const res = await axios.get("http://10.110.15.150:3000/admin/team", {
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
          groupMembers: [],
        }));

        setTeams(mapped);
        setNewTeam({ name: "", phonenumber: "", password: "", region: "", status: "Actif" });
        setAddDialogOpen(false);
      } else {
        throw new Error(response.data?.error || "Failed to add team");
      }
    } catch (error) {
      console.error("Add team error:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Failed to add team");
      setSnackbar({
        open: true,
        message: error.response?.data?.error || "Failed to add team",
        severity: "error",
      });
    }
  };

  const [searchQuery, setSearchQuery] = useState("");
  //  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [teams, setTeams] = useState([]);
  const [newTeam, setNewTeam] = useState({
    name: "",
    phonenumber: "",
    password: "",
    region: "",
    status: "Actif",
  });

  const [groupMembersDialogOpen, setGroupMembersDialogOpen] = useState(false);
  const [selectedGroupMembers, setSelectedGroupMembers] = useState([]);
  const [selectedTeamIdForMembers, setSelectedTeamIdForMembers] = useState(null);
  const [newMember, setNewMember] = useState({ name: "", phonenumber: "" });
  //const [editTeamDialogOpen, setEditTeamDialogOpen] = useState(false);
  //const [selectedTeam, setSelectedTeam] = useState(null);
  //const [editMemberDialogOpen, setEditMemberDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const filteredTeams = teams.filter(
    (team) =>
      (team.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.phonenumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /*
    const handleDeleteClick = (id) => {
      setSelectedTeamId(id);
      setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
      try {
        const teamToDelete = teams.find((team) => team.id === selectedTeamId);
        if (!teamToDelete) return;

        await axios.delete(http://10.110.15.150:3000/admin/team/${selectedTeamId}, {
          headers: { Authorization: Bearer ${localStorage.getItem("adminToken")} },
        });

        const updatedTeams = teams.filter((team) => team.id !== selectedTeamId);
        setTeams(updatedTeams);
        setDeleteDialogOpen(false);
        toast.success("Team deleted successfully.");
      } catch (error) {
        console.error("Error deleting team:", error.response?.data || error.message);
        toast.error("Failed to delete team.");
      }
    };
    */

  const handleTeamLeaderClick = (groupMembers, teamId) => {
    setSelectedGroupMembers(groupMembers);
    setSelectedTeamIdForMembers(teamId);
    setGroupMembersDialogOpen(true);
  };

  // const handleEditClick = (team) => {
  //   setSelectedTeam(team);
  //   setEditTeamDialogOpen(true);
  // };

  const handleAddMember = () => {
    if (!newMember.name || !newMember.phonenumber) return;
    const newId = selectedGroupMembers.length
      ? selectedGroupMembers[selectedGroupMembers.length - 1].id + 1
      : 1;
    const updatedMembers = [...selectedGroupMembers, { id: newId, ...newMember }];
    updateGroupMembersInTeam(updatedMembers);
    setNewMember({ name: "", phonenumber: "" });
  };

  const handleDeleteMember = (memberId) => {
    const updatedMembers = selectedGroupMembers.filter((m) => m.id !== memberId);
    updateGroupMembersInTeam(updatedMembers);
  };

  const updateGroupMembersInTeam = (members) => {
    setSelectedGroupMembers(members);
    setTeams((prev) =>
      prev.map((team) =>
        team.id === selectedTeamIdForMembers ? { ...team, groupMembers: members } : team
      )
    );
  };

  const handleEditMember = (member) => {
    setSelectedMember(member);
    setEditMemberDialogOpen(true);
  };

  // const handleEditMemberConfirm = () => {
  //  const updatedMembers = selectedGroupMembers.map((m) =>
  //    m.id === selectedMember.id ? selectedMember : m
  //  );
  //  updateGroupMembersInTeam(updatedMembers);
  //  setEditMemberDialogOpen(false);
  //};

  return (
    <>
      {/* Snackbar for feedback */}
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
                  <Button onClick={() => handleTeamLeaderClick(params.row.groupMembers, params.row.id)}>
                    {params.value}
                  </Button>
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
            <Button onClick={() => handleAddTeam()} variant="contained">
              Add
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Team Dialog */}
        {/*<Dialog open={editTeamDialogOpen} onClose={() => setEditTeamDialogOpen(false)}>
            <DialogTitle>Edit Team</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                label="Name"
                value={selectedTeam?.name || ""}
                onChange={(e) => setSelectedTeam({ ...selectedTeam, name: e.target.value })}
                margin="dense"
              />
              <TextField
                fullWidth
                label="Phone Number"
                value={selectedTeam?.phonenumber || ""}
                onChange={(e) => setSelectedTeam({ ...selectedTeam, phonenumber: e.target.value })}
                margin="dense"
              />
              <TextField
                fullWidth
                label="Region"
                value={selectedTeam?.region || ""}
                onChange={(e) => setSelectedTeam({ ...selectedTeam, region: e.target.value })}
                margin="dense"
              />
              <Select
                fullWidth
                value={selectedTeam?.status || ""}
                onChange={(e) => setSelectedTeam({ ...selectedTeam, status: e.target.value })}
                margin="dense"
                sx={{ mt: 2 }}
              >
                <MenuItem value="Actif">Actif</MenuItem>
                <MenuItem value="Inactif">Inactif</MenuItem>
              </Select>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setEditTeamDialogOpen(false)}>Cancel</Button>
              <Button
                onClick={() => {
                  setTeams((prev) =>
                    prev.map((team) =>
                      team.id === selectedTeam.id ? selectedTeam : team
                    )
                  );
                  setEditTeamDialogOpen(false);
                }}
                variant="contained"
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>*/}

        {/* Group Members Dialog */}
        <Dialog
          open={groupMembersDialogOpen}
          onClose={() => setGroupMembersDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Group Members</DialogTitle>
          <DialogContent>
            <TableContainer component={Paper}>
              <Table size="small" aria-label="members table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Phone Number</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedGroupMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>{member.name}</TableCell>
                      <TableCell>{member.phonenumber}</TableCell>
                      <TableCell align="right">
                        {/* <IconButton onClick={() => handleEditMember(member)}>
                          <EditIcon fontSize="small" />
                        </IconButton> */}
                        <Button
                          size="small"
                          color="error"
                          onClick={() => handleDeleteMember(member.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell>
                      <TextField
                        size="small"
                        label="Name"
                        value={newMember.name}
                        onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        label="Phone Number"
                        value={newMember.phonenumber}
                        onChange={(e) =>
                          setNewMember({ ...newMember, phonenumber: e.target.value })
                        }
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Button size="small" variant="contained" onClick={handleAddMember}>
                        Add
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setGroupMembersDialogOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* Edit Member Dialog */}
        {/* <Dialog open={editMemberDialogOpen} onClose={() => setEditMemberDialogOpen(false)}>
          <DialogTitle>Edit Member</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Name"
              value={selectedMember?.name || ""}
              onChange={(e) => setSelectedMember({ ...selectedMember, name: e.target.value })}
              margin="dense"
            />
            <TextField
              fullWidth
              label="Phone Number"
              value={selectedMember?.phonenumber || ""}
              onChange={(e) => setSelectedMember({ ...selectedMember, phonenumber: e.target.value })}
              margin="dense"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditMemberDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditMemberConfirm} variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog> */}
      </Box>
      {/* <ToastContainer /> */}
    </>
  );
};

export default Teams;
