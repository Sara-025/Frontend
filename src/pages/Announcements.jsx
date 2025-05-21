import "./AnnouncementsStyle.css";
import { useState, useEffect } from "react";
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Snackbar,
  Alert,
} from '@mui/material';
import axios from 'axios';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [isglobal, setIsglobal] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info", 
  });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('http://10.110.15.150:3000/admin/announcement', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      setAnnouncements(response.data || []);
    } catch (error) {
      console.error("Error fetching announcements:", error);
      setSnackbar({
        open: true,
        message: "Failed to fetch announcements.",
        severity: "error",
      });
    }
  };

  const openDialog = () => setShowDialog(true);
  const closeDialog = () => {
    setShowDialog(false);
    setNewTitle("");
    setNewContent("");
    setIsglobal(false);
  };

  const handleCreateAnnouncement = async () => {
    if (!newTitle.trim() || !newContent.trim()) {
      setSnackbar({
        open: true,
        message: "Please fill out all fields.",
        severity: "warning",
      });
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setSnackbar({
          open: true,
          message: "No admin token found. Please login first.",
          severity: "error",
        });
        return;
      }

      const response = await axios.post('http://10.110.15.150:3000/admin/announcement', {
        title: newTitle,
        content: newContent,
        isglobal: isglobal
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      setSnackbar({
        open: true,
        message: response.data.message || "Announcement created successfully",
        severity: "success",
      });

      await fetchAnnouncements();
      closeDialog();
    } catch (error) {
      console.error("Create announcement error:", error);
      setSnackbar({
        open: true,
        message: error.response?.data?.error || "Failed to create announcement",
        severity: "error",
      });
    }
  };

  return (
    <>
      <div className="MainAnnonce">
        <div>
          {announcements.map((annonce, index) => (
            <div className="Annonce-Item" key={index}>
              <div className="annonce-title">
                <WaterDropIcon className="icon1" />
                <h3>{annonce.title}</h3>
              </div>
              <p><span>Date:</span> {new Date(annonce.createdAt).toLocaleDateString()}</p>
              <p>{annonce.content}</p>
              {annonce.isglobal && (
                <p style={{ color: "#3737ff" }}>
                  <strong>This announcement is global</strong>
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="CreateAnnonce">
          <button onClick={openDialog}>Create Announcement</button>
        </div>
      </div>

      <Dialog open={showDialog} onClose={closeDialog}>
        <DialogTitle>Create New Announcement</DialogTitle>
        <DialogContent dividers>
          <TextField
            margin="dense"
            label="Title"
            fullWidth
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Content"
            fullWidth
            multiline
            minRows={3}
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isglobal}
                onChange={(e) => setIsglobal(e.target.checked)}
                color="primary"
              />
            }
            label="Is this announcement global?"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} style={{ color: "rgb(199, 3, 3)" }}>
            Cancel
          </Button>
          <Button onClick={handleCreateAnnouncement} variant="contained">
            Create
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
          sx={{ width: '100%' }}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Announcements;
