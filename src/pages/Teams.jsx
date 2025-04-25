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
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

const initialTeams = [
  {
    id: 1,
    name: "aaaa aaaa",
    phoneNumber: "0000000000",
    status: "Actif",
    region: "xx",
    groupMembers: [
      { id: 1, name: "bbbb bbbb", phoneNumber: "1111111111" },
      { id: 2, name: "cccc cccc", phoneNumber: "2222222222" },
    ],
  },
  {
    id: 2,
    name: "dddd dddd",
    phoneNumber: "3333333333",
    status: "Inactif",
    region: "yy",
    groupMembers: [{ id: 3, name: "eeee", phoneNumber: "4444444444" }],
  },
];

const Teams = () => {
  const [teams, setTeams] = useState(initialTeams);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newTeam, setNewTeam] = useState({
    name: "",
    phoneNumber: "",
    status: "Actif",
    region: "",
  });
  const [groupMembersDialogOpen, setGroupMembersDialogOpen] = useState(false);
  const [selectedGroupMembers, setSelectedGroupMembers] = useState([]);
  const [selectedTeamIdForMembers, setSelectedTeamIdForMembers] = useState(null);
  const [newMember, setNewMember] = useState({ name: "", phoneNumber: "" });
  const [editTeamDialogOpen, setEditTeamDialogOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [editMemberDialogOpen, setEditMemberDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  // Filtered teams
  const filteredTeams = teams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddTeam = () => {
    if (!newTeam.name || !newTeam.phoneNumber || !newTeam.region) return;
    const newId = teams.length ? teams[teams.length - 1].id + 1 : 1;
    setTeams([...teams, { id: newId, ...newTeam, groupMembers: [] }]);
    setNewTeam({ name: "", phoneNumber: "", status: "Actif", region: "" });
    setAddDialogOpen(false);
  };

  const handleDeleteClick = (id) => {
    setSelectedTeamId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    setTeams(teams.filter((team) => team.id !== selectedTeamId));
    setDeleteDialogOpen(false);
  };

  const handleTeamLeaderClick = (groupMembers, teamId) => {
    setSelectedGroupMembers(groupMembers);
    setSelectedTeamIdForMembers(teamId);
    setGroupMembersDialogOpen(true);
  };

  const handleEditClick = (team) => {
    setSelectedTeam(team);
    setEditTeamDialogOpen(true);
  };

  const handleAddMember = () => {
    if (!newMember.name || !newMember.phoneNumber) return;
    const newId = selectedGroupMembers.length
      ? selectedGroupMembers[selectedGroupMembers.length - 1].id + 1
      : 1;
    const updatedMembers = [...selectedGroupMembers, { id: newId, ...newMember }];
    updateGroupMembersInTeam(updatedMembers);
    setNewMember({ name: "", phoneNumber: "" });
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

  const handleEditMemberConfirm = () => {
    const updatedMembers = selectedGroupMembers.map((m) =>
      m.id === selectedMember.id ? selectedMember : m
    );
    updateGroupMembersInTeam(updatedMembers);
    setEditMemberDialogOpen(false);
  };

  return (
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


      <DataGrid
        autoHeight
        rows={filteredTeams}
        columns={[
          {
            field: "name",
            headerName: "Name",
            width: 200,
            renderCell: (params) => (
              <Button onClick={() => handleTeamLeaderClick(params.row.groupMembers, params.row.id)}>
                {params.value}
              </Button>
            ),
          },
          { field: "phoneNumber", headerName: "Phone Number", width: 200 },
          { field: "region", headerName: "Region", width: 150 },
          {
            field: "status",
            headerName: "Status",
            width: 150,
            renderCell: (params) => (
              <Chip
                label={params.value}
                color={params.value === "Actif" ? "success" : "error"}
              />
            ),
          },
          {
            field: "actions",
            headerName: "Actions",
            width: 200,
            renderCell: (params) => (
              <>
                <Button
                  size="small"
                  startIcon={<EditIcon />}
                  onClick={() => handleEditClick(params.row)}
                >
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
        rowsPerPageOptions={[5]}
      />

      {/* Add Team Dialog */}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
        <DialogTitle>Add New Team</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            value={newTeam.name}
            onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Phone Number"
            value={newTeam.phoneNumber}
            onChange={(e) => setNewTeam({ ...newTeam, phoneNumber: e.target.value })}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Region"
            value={newTeam.region}
            onChange={(e) => setNewTeam({ ...newTeam, region: e.target.value })}
            margin="dense"
          />
          <Select
            fullWidth
            value={newTeam.status}
            onChange={(e) => setNewTeam({ ...newTeam, status: e.target.value })}
            margin="dense"
            sx={{ mt: 2 }}
          >
            <MenuItem value="Actif">Actif</MenuItem>
            <MenuItem value="Inactif">Inactif</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddTeam} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Team Dialog */}
      <Dialog open={editTeamDialogOpen} onClose={() => setEditTeamDialogOpen(false)}>
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
            value={selectedTeam?.phoneNumber || ""}
            onChange={(e) => setSelectedTeam({ ...selectedTeam, phoneNumber: e.target.value })}
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
      </Dialog>

      {/* Group Members Dialog */}
      <Dialog open={groupMembersDialogOpen} onClose={() => setGroupMembersDialogOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Group Members</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              label="Name"
              fullWidth
              value={newMember.name}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
            />
            <TextField
              label="Phone Number"
              fullWidth
              value={newMember.phoneNumber}
              onChange={(e) => setNewMember({ ...newMember, phoneNumber: e.target.value })}
            />
            <Button variant="contained" onClick={handleAddMember}>
              Add Member
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedGroupMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>{member.name}</TableCell>
                    <TableCell>{member.phoneNumber}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        startIcon={<EditIcon />}
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
          <Button onClick={() => setGroupMembersDialogOpen(false)}>Close</Button>
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
            label="Phone Number"
            fullWidth
            margin="dense"
            value={selectedMember?.phoneNumber || ""}
            onChange={(e) => setSelectedMember({ ...selectedMember, phoneNumber: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditMemberDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEditMemberConfirm} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this team?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Teams;
