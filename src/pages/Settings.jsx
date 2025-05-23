import { useState, useEffect } from "react";
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
    phonenumber: "",
    password: "",
    region: ""
  });

  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);          
  const [showProfilePassword] = useState(false);
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

  useEffect(() => {
    const fetchAdminInfo = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/info`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdminDetail({
          phonenumber: response.data.phonenumber,
          password: "",
          region: response.data.region,
        });
      } catch (err) {
        showSnackbar("Failed to fetch admin info.", "error");
      }
    };

    fetchAdminInfo();
  }, []);

  const openPasswordDialog = () => {
    setPasswordDialogOpen(true);
  };

  const closePasswordDialog = () => {
    setPasswordDialogOpen(false);
    setCurrentPassword("");
    setNewPassword("");
  };

  const handleSaveNewPassword = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/admin/change-password`,
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showSnackbar(response.data.message || "Password changed successfully.", "success");
      setAdminDetail((prev) => ({ ...prev, password: newPassword }));
      closePasswordDialog();
    } catch (err) {
      const errMsg = err.response?.data?.error || "Failed to change password.";
      showSnackbar(errMsg, "error");
    }
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
              <p>{adminDetail.phonenumber}</p>
              <p>{adminDetail.region}</p>
            </div>
          </div>

          <div className="ProfileActions">
            <Button
              startIcon={<EditIcon />}
              variant="outlined"
              color="primary"
              onClick={openPasswordDialog}
            >
              Change Password
            </Button>
          </div>
        </div>

        <div className="ProfileDetials">
          <div className="ProfileP">
            <p>Phone Number</p>
            <p>Password</p>
          </div>

          <div className="ProfileItem">
            <TextField
              name="phonenumber"
              value={adminDetail.phonenumber}
              InputProps={{ readOnly: true }}
              fullWidth
              margin="dense"
            />

            <TextField
              value={adminDetail.password || "••••••"}
              type={showProfilePassword ? "text" : "password"}
              fullWidth
              margin="dense"
              InputProps={{
                readOnly: true,
           
              }}
            />
          </div>
        </div>
      </div>

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
