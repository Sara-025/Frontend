import { useState } from "react";
import axios from "axios";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import EditIcon from "@mui/icons-material/Edit";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import "./Settings.css";
import profil from "../assets/istockphoto-1300845620-612x612-removebg-preview.png";

const Settings = () => {
  const [adminDetail, setAdminDetail] = useState({
    PhoneNumber: "0558743374",
    Password: "abc",
  });

  const [originalDetail, setOriginalDetail] = useState({ ...adminDetail });
  const [isEditable, setIsEditable] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  const [showProfilePassword, setShowProfilePassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminDetail((prev) => ({ ...prev, [name]: value }));
    setIsEdited(true);
  };

  const toggleEdit = () => {
    if (!isEditable) {
      setOriginalDetail({ ...adminDetail });
      setIsEditable(true);
    } else {
      setCancelDialogOpen(true);
    }
  };

  const handleConfirmCancel = () => {
    setAdminDetail({ ...originalDetail });
    setIsEditable(false);
    setIsEdited(false);
    setCancelDialogOpen(false);
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) throw new Error("Admin token not found");

      await axios.put("http://10.110.15.150:3000/admin/profile", adminDetail, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsEditable(false);
      setIsEdited(false);
      showSnackbar("Changes saved successfully.", "success");
    } catch (err) {
      showSnackbar("Failed to save changes.", "error");
    }
  };

  const handleSaveNewPassword = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const response = await axios.put(
        "http://10.110.15.150:3000/admin/change-password",
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showSnackbar(response.data.message || "Password changed successfully.", "success");
      setAdminDetail((prev) => ({ ...prev, Password: newPassword }));
      closePasswordDialog();
    } catch (err) {
      const errMsg = err.response?.data?.error || "Failed to change password.";
      showSnackbar(errMsg, "error");
    }
  };

  const openPasswordDialog = () => {
    setPasswordDialogOpen(true);
  };

  const closePasswordDialog = () => {
    setPasswordDialogOpen(false);
    setCurrentPassword("");
    setNewPassword("");
  };

  return (
    <div className="SettingsMain">
      <div className="TopItem">
        <PermIdentityIcon className="ProfileIcon" />
        <p>My Profile</p>
      </div>

      <div className="ProfileMain">
        <div className="Profile">
          <div className="ProfilePhoto" style={{ display: "flex", alignItems: "center" }}>
            <img
              src={profil}
              alt="profil"
              style={{ width: "150px", marginLeft: "0px", marginRight: "5px", cursor: "pointer" }}
            />
            <div>
              <p>{adminDetail.PhoneNumber}</p>
            </div>
          </div>

          <div className="ProfileActions">
            <Button
              startIcon={<EditIcon />}
              variant="outlined"
              color="primary"
              onClick={toggleEdit}
            >
              {isEditable ? "Cancel" : "Edit"}
            </Button>
            {isEditable && isEdited && (
              <Button variant="outlined" color="primary" onClick={handleSaveChanges}>
                Save
              </Button>
            )}
          </div>
        </div>

        <div className="ProfileDetials">
          <div className="ProfileP">
            <p>Phone Number</p>
            <p>Password</p>
          </div>

          <div className="ProfileItem">
            <TextField
              name="PhoneNumber"
              value={adminDetail.PhoneNumber}
              onChange={handleInputChange}
              InputProps={{ readOnly: !isEditable }}
              fullWidth
              margin="dense"
            />

            <TextField
              value={adminDetail.Password}
              type={showProfilePassword ? "text" : "password"}
              fullWidth
              margin="dense"
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowProfilePassword((prev) => !prev)}>
                      {showProfilePassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {isEditable && (
              <div style={{ marginTop: "20px", textAlign: "right" }}>
                <Button variant="outlined" onClick={openPasswordDialog}>
                  Change Password
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Password Dialog */}
      <Dialog open={passwordDialogOpen} onClose={closePasswordDialog}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            label="Current Password"
            type={showCurrentPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowCurrentPassword((v) => !v)}>
                    {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="New Password"
            type={showNewPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowNewPassword((v) => !v)}>
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closePasswordDialog}>Cancel</Button>
          <Button color="primary" variant="contained" onClick={handleSaveNewPassword}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Cancel Edit Dialog */}
      <Dialog open={cancelDialogOpen} onClose={() => setCancelDialogOpen(false)}>
        <DialogTitle>Cancel Changes?</DialogTitle>
        <DialogContent>
          Are you sure you want to cancel your changes? Unsaved data will be lost.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelDialogOpen(false)} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmCancel} color="error" variant="contained">
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
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
    </div>
  );
};

export default Settings;
