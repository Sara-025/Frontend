import React, { useState } from "react";
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
  InputAdornment
} from "@mui/material";
import profil from "../assets/c79a37e13ef14be556b51143bcbb1b01.jpg";
import "./Settings.css";

const Settings = () => {
  const [adminDetail, setAdminDetail] = useState({
    Name: "Ramesh",
    PhoneNumber: "0687659944",
    Email: "remash@gmail.com",
    Password: "Sn198763",
  });

  const [originalDetail, setOriginalDetail] = useState(adminDetail);
  const [isEditable, setIsEditable] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleInputChange = (e) => {
    setAdminDetail({ ...adminDetail, [e.target.name]: e.target.value });
    setIsEdited(true);
  };

  const toggleEdit = () => {
    if (!isEditable) {
      setOriginalDetail(adminDetail);
      setIsEditable(true);
    } else {
      setConfirmCancelOpen(true);
    }
  };

  const handleConfirmCancel = () => {
    setAdminDetail(originalDetail);
    setIsEditable(false);
    setIsEdited(false);
    setConfirmCancelOpen(false);
  };

  const handleCloseCancelDialog = () => {
    setConfirmCancelOpen(false);
  };

  const handleSaveChanges = () => {
    setIsEditable(false);
    setIsEdited(false);
    
  };

  const handleOpenPasswordDialog = () => {
    setShowPasswordDialog(true);
  };

  const handleClosePasswordDialog = () => {
    setShowPasswordDialog(false);
    setCurrentPassword(""); 
    setNewPassword(""); 
  };

  const handleSaveNewPassword = () => {
    if (currentPassword === adminDetail.Password) {
      setAdminDetail({ ...adminDetail, Password: newPassword });
      handleClosePasswordDialog();
    } else {
      alert("Current password is incorrect!");
    }
  };

  return (
    <div className='SettingsMain'>
      <div className="TopItem">
        <PermIdentityIcon className='ProfileIcon' />
        <p>My Profile</p>
      </div>

      <div className='ProfileMain'>
        <div className='Profile'>
          <div className='ProfilePhoto' style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={profil}
              alt="profil"
              style={{ width: "100px", marginLeft: "10px", marginRight: "20px", cursor: "pointer" ,borderRadius:"50px", border:"2px solid rgb(4, 113, 209) "}}
            />
            <div>
              <h4>{adminDetail.Name}</h4>
              <p>{adminDetail.PhoneNumber}</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: "70px" }}>
            
            <Button
              
              startIcon={<EditIcon />}
              color= "primary"
              variant="outlined"
              size="small"
              onClick={toggleEdit}
            >
              {isEditable ? "Cancel" : "Edit"}
            </Button>
            {isEdited && isEditable && (
              <Button
                
                color="primary"
                variant="outlined"
                onClick={handleSaveChanges}
                
              >
                Save
              </Button>
            )}
          </div>
        </div>

        <div className='ProfileDetials'>
          <div className='ProfileP'>
            <p>Name</p>
            <p>Phone Number</p>
            <p>Email</p>
            <p>Password</p>
          </div>

          <div className='ProfileItem'>
            <input
              name="Name"
              value={adminDetail.Name}
              onChange={handleInputChange}
              readOnly={!isEditable}
            />
            <input
              name="PhoneNumber"
              value={adminDetail.PhoneNumber}
              onChange={handleInputChange}
              readOnly={!isEditable}
            />
            <input
              name="Email"
              value={adminDetail.Email}
              onChange={handleInputChange}
              readOnly={!isEditable}
            />
            <input
              value={adminDetail.Password}
              readOnly
            />

            {isEditable && (
                <div style={{ marginTop: "20px", textAlign: "right" }}>
              <Button
                variant="outlined"
                color="primary"
                
                onClick={handleOpenPasswordDialog}
              >
                Change Password
              </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Password Dialog */}
      <Dialog open={showPasswordDialog} onClose={handleClosePasswordDialog}>
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
                  <IconButton onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                    {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
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
                  <IconButton onClick={() => setShowNewPassword(!showNewPassword)}>
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePasswordDialog}>Cancel</Button>
          <Button color="primary" variant="contained" onClick={handleSaveNewPassword}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Cancel Dialog */}
      <Dialog open={confirmCancelOpen} onClose={handleCloseCancelDialog}>
        <DialogTitle>Cancel Changes?</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to cancel the changes? Any unsaved data will be lost.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancelDialog} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmCancel} color="error" variant="contained">
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Settings;
