import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  TextField,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  MenuItem,
  Select,
  Chip,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

// Initial data for teams
const initialTeams = [
  {
    id: 1,
    name: "aaaa aaaa",
    email: "aaaa@example.com",
    status: "Actif",
    region: "xx",
    groupMembers: [
      { id: 1, name: "bbbb bbbb", phone: "987-654-3210", email: "bbbb@example.com" },
      { id: 2, name: "cccc cccc", phone: "555-555-5555", email: "cccc@example.com" },
    ],
  },
  {
    id: 2,
    name: "dddd dddd",
    email: "dddd@example.com",
    status: "Inactif",
    region: "yy",
    groupMembers: [
      { id: 3, name: "eeee", phone: "444-444-4444", email: "eeee@example.com" },
    ],
  },
];

const Teams = () => {
  // State management
  const [teams, setTeams] = useState(initialTeams);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newTeam, setNewTeam] = useState({ name: "", email: "", status: "Actif", region: "" });
  const [groupMembersDialogOpen, setGroupMembersDialogOpen] = useState(false);
  const [selectedGroupMembers, setSelectedGroupMembers] = useState([]);
  const [selectedTeamIdForMembers, setSelectedTeamIdForMembers] = useState(null);
  const [newMember, setNewMember] = useState({ name: "", phone: "", email: "" });
  const [editMemberDialogOpen, setEditMemberDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  // Add a new team leader
  const handleAddTeam = () => {
    if (!newTeam.name || !newTeam.email || !newTeam.region) return;

    const newId = teams.length ? teams[teams.length - 1].id + 1 : 1;
    setTeams([...teams, { id: newId, ...newTeam, groupMembers: [] }]);
    setNewTeam({ name: "", email: "", status: "Actif", region: "" });
    setAddDialogOpen(false);
  };

  // Handle team deletion
  const handleDeleteClick = (id) => {
    setSelectedTeamId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    setTeams(teams.filter((team) => team.id !== selectedTeamId));
    setDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  // Open group members dialog
  const handleTeamLeaderClick = (groupMembers, teamId) => {
    setSelectedGroupMembers(groupMembers);
    setSelectedTeamIdForMembers(teamId);
    setGroupMembersDialogOpen(true);
  };

  // Add a new group member
  const handleAddMember = () => {
    if (!newMember.name || !newMember.phone || !newMember.email) return;

    const newMemberId = selectedGroupMembers.length
      ? selectedGroupMembers[selectedGroupMembers.length - 1].id + 1
      : 1;

    const updatedGroupMembers = [...selectedGroupMembers, { id: newMemberId, ...newMember }];
    setSelectedGroupMembers(updatedGroupMembers);

    // Update the team's group members in the main state
    const updatedTeams = teams.map((team) =>
      team.id === selectedTeamIdForMembers
        ? { ...team, groupMembers: updatedGroupMembers }
        : team
    );
    setTeams(updatedTeams);

    // Reset the new member form
    setNewMember({ name: "", phone: "", email: "" });
  };

  // Delete a group member
  const handleDeleteMember = (memberId) => {
    const updatedGroupMembers = selectedGroupMembers.filter((member) => member.id !== memberId);
    setSelectedGroupMembers(updatedGroupMembers);

    // Update the team's group members in the main state
    const updatedTeams = teams.map((team) =>
      team.id === selectedTeamIdForMembers
        ? { ...team, groupMembers: updatedGroupMembers }
        : team
    );
    setTeams(updatedTeams);
  };

  // Edit a group member
  const handleEditMember = (member) => {
    setSelectedMember(member);
    setEditMemberDialogOpen(true);
  };

  const handleEditMemberConfirm = () => {
    const updatedGroupMembers = selectedGroupMembers.map((member) =>
      member.id === selectedMember.id ? { ...selectedMember } : member
    );
    setSelectedGroupMembers(updatedGroupMembers);

    // Update the team's group members in the main state
    const updatedTeams = teams.map((team) =>
      team.id === selectedTeamIdForMembers
        ? { ...team, groupMembers: updatedGroupMembers }
        : team
    );
    setTeams(updatedTeams);

    setEditMemberDialogOpen(false);
  };

  // Handle status change
  const handleStatusChange = (params) => {
    const updatedTeams = teams.map((team) =>
      team.id === params.id ? { ...team, status: params.props.value } : team
    );
    setTeams(updatedTeams);
  };

  // Filter teams based on search query
  const filteredTeams = teams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ width: "100%", overflowX: "auto", p: 2, minWidth: "800px" }}>
      {/* Search Bar and Add Team Button */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2  }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            width: "945px",
            height: "48px",
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
      <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setAddDialogOpen(true)}
          sx={{marginBottom: "20px"}}
        >
          Add Team
        </Button>
  
      {/* Data Grid for Teams */}
      <Box sx={{ width: "100%", minWidth: "800px", overflowX: "auto" }}>
        <DataGrid
          rows={filteredTeams}
          columns={[
            {
              field: "name",
              headerName: "Name",
              width: 200,
              editable: true,
              renderCell: (params) => (
                <Button
                  onClick={() => handleTeamLeaderClick(params.row.groupMembers, params.row.id)}
                  sx={{ textTransform: "none", color: "inherit" }}
                >
                  {params.value}
                </Button>
              ),
            },
            { field: "email", headerName: "Email", width: 250, editable: true },
            { field: "region", headerName: "Region", width: 150, editable: true },
            {
              field: "status",
              headerName: "Status",
              width: 150,
              editable: true,
              renderCell: (params) => (
                <Chip
                  label={params.value}
                  color={params.value === "Actif" ? "success" : "error"}
                  sx={{ fontWeight: "bold", color: "white" }}
                />
              ),
            },
            {
              field: "actions",
              headerName: "Actions",
              width: 200,
              renderCell: (params) => (
                <>
                  <Button size="small" startIcon={<EditIcon />} color="primary">
                    Edit
                  </Button>
                  <Button
                    size="small"
                    startIcon={<DeleteIcon />}
                    color="error"
                    onClick={() => handleDeleteClick(params.row.id)}
                  >
                    Delete
                  </Button>
                </>
              ),
            },
          ]}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          checkboxSelection
          disableSelectionOnClick
          sortingOrder={["asc", "desc"]}
          onEditCellPropsChange={handleStatusChange}
        />
      </Box>

      {/* Add Team Dialog */}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
        <DialogTitle>Add New Team Leader</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="dense"
            value={newTeam.name}
            onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            margin="dense"
            value={newTeam.email}
            onChange={(e) => setNewTeam({ ...newTeam, email: e.target.value })}
          />
          <TextField
            label="Region"
            fullWidth
            margin="dense"
            value={newTeam.region}
            onChange={(e) => setNewTeam({ ...newTeam, region: e.target.value })}
          />
          <Select
            fullWidth
            value={newTeam.status}
            onChange={(e) => setNewTeam({ ...newTeam, status: e.target.value })}
            sx={{ mt: 2 }}
          >
            <MenuItem value="Actif">Actif</MenuItem>
            <MenuItem value="Inactif">Inactif</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddTeam} color="primary" variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Team Leader</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this team leader? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Group Members Dialog */}
      <Dialog
        open={groupMembersDialogOpen}
        onClose={() => setGroupMembersDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Group Members</DialogTitle>
        <DialogContent>
          {/* Add Member Form */}
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              label="Name"
              fullWidth
              size="small"
              value={newMember.name}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
            />
            <TextField
              label="Phone"
              fullWidth
              size="small"
              value={newMember.phone}
              onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
            />
            <TextField
              label="Email"
              fullWidth
              size="small"
              value={newMember.email}
              onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
            />
            <Button variant="contained" onClick={handleAddMember} sx={{ whiteSpace: "nowrap", minWidth: "120px", paddingX: 2 }}>
              Add Member
            </Button>
          </Box>

          {/* Group Members Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedGroupMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>{member.name}</TableCell>
                    <TableCell>{member.phone}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        startIcon={<EditIcon />}
                        color="primary"
                        onClick={() => handleEditMember(member)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        startIcon={<DeleteIcon />}
                        color="error"
                        onClick={() => handleDeleteMember(member.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setGroupMembersDialogOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Member Dialog */}
      <Dialog open={editMemberDialogOpen} onClose={() => setEditMemberDialogOpen(false)}>
        <DialogTitle>Edit Member</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="dense"
            value={selectedMember?.name || ""}
            onChange={(e) => setSelectedMember({ ...selectedMember, name: e.target.value })}
          />
          <TextField
            label="Phone"
            fullWidth
            margin="dense"
            value={selectedMember?.phone || ""}
            onChange={(e) => setSelectedMember({ ...selectedMember, phone: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            margin="dense"
            value={selectedMember?.email || ""}
            onChange={(e) => setSelectedMember({ ...selectedMember, email: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditMemberDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditMemberConfirm} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Teams;