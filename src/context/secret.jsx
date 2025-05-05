


/* 1-113-156
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
  Checkbox
} from '@mui/material';
import axios from 'axios';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [isGlobalRegion, setIsGlobalRegion] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch announcements when component loads
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('http://localhost:3000/admin/announcement', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      setAnnouncements(response.data || []);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  const openDialog = () => setShowDialog(true);
  const closeDialog = () => {
    setShowDialog(false);
    setNewTitle("");
    setNewContent("");
    setIsGlobalRegion(false);
  };

  const handleCreateAnnouncement = async () => {
    console.log("Trying to create announcement...");

    if (!newTitle || !newContent) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setMessage("No admin token found. Please login first.");
        return;
      }

      const response = await axios.post('http://localhost:3000/admin/announcement', {
        title: newTitle,
        content: newContent
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      setMessage(response.data.message || "Announcement created successfully");

      await fetchAnnouncements(); // Refresh list
      closeDialog(); // Close modal
    } catch (error) {
      if (error.response) {
        const errorMsg = error.response.data.error || "Failed to create announcement";
        setMessage(errorMsg);
      } else {
        setMessage("Server error. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="MainAnnonce">
        <div>
          {announcements.map((annonce) => (
            <div className="Annonce-Item" key={annonce.id}>
              <div className="annonce-title">
                <WaterDropIcon className="icon1" />
                <h3>{annonce.title}</h3>
              </div>
              <p><span>Date :</span> {new Date(annonce.createdAt).toLocaleDateString()}</p>
              <p>{annonce.content}</p>
              {annonce.isGlobal && (
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

      {/* Create Announcement Dialog */}
  /*    <Dialog open={showDialog} onClose={closeDialog}>
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
                checked={isGlobalRegion}
                onChange={(e) => setIsGlobalRegion(e.target.checked)}
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
    </>
  );
};

/*export default Announcements;
