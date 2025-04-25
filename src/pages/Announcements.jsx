import "./AnnouncementsStyle.css";
import { useState } from "react";
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

const Announcements = () => {
  const [annonces, setAnnonces] = useState([
    {
      id: 1,
      title: "Attention: Water Outage",
      date: "February 28, 2025",
      description:
        "A water outage has been reported in some areas due to maintenance work. Please conserve water until service is restored.",
      isGlobal: false,
    },
    {
      id: 2,
      title: "Attention: Water Outage",
      date: "February 28, 2025",
      description:
        "A water outage has been reported in some areas due to maintenance work. Please conserve water until service is restored.",
      isGlobal: false,
    },
    {
      id: 3,
      title: "Attention: Water Outage",
      date: "February 28, 2025",
      description:
        "A water outage has been reported in some areas due to maintenance work. Please conserve water until service is restored.",
      isGlobal: false,
    },
    {
      id: 4,
      title: "Attention: Water Outage",
      date: "February 28, 2025",
      description:
        "A water outage has been reported in some areas due to maintenance work. Please conserve water until service is restored.",
      isGlobal: false,
    },
    {
      id: 5,
      title: "Attention: Water Outage",
      date: "February 28, 2025",
      description:
        "A water outage has been reported in some areas due to maintenance work. Please conserve water until service is restored.",
      isGlobal: false,
    },
  ]);

  const [showAnnonce, setShowAnnonce] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [isGlobalRegion, setIsGlobalRegion] = useState(false); 

  const openCreateAnnonce = () => setShowAnnonce(true);
  const closeCreateAnnonce = () => {
    setShowAnnonce(false);
    setNewTitle("");
    setNewDescription("");
    setIsGlobalRegion(false); 
  };

  const handleCreateAnnonce = () => {
    if (!newTitle || !newDescription) {
      alert("Please fill out all fields.");
      return;
    }

    const newAnnonce = {
      id: Date.now(),
      title: newTitle,
      date: "", 
      description: newDescription,
      isGlobal: isGlobalRegion, 
    };

    setAnnonces([newAnnonce, ...annonces]);
    closeCreateAnnonce();
  };

  return (
    <>
      <div className="MainAnnonce">
        <div>
          {annonces.map((annonce) => (
            <div className="Annonce-Item" key={annonce.id}>
              <div className="annonce-title">
                <WaterDropIcon className="icon1" />
                <h3>{annonce.title}</h3>
              </div>
              <p>
                <span>Date :</span> {annonce.date}
              </p>
              <p>{annonce.description}</p>
              {annonce.isGlobal && <p style={{color:"#3737ff"}}><strong>This announcement is global</strong></p>}
            </div>
          ))}
        </div>

        <div className="CreateAnnonce">
          <button onClick={openCreateAnnonce}>Create Annonce</button>
        </div>
      </div>

      {/* Create Annonce Dialog */}
      <Dialog open={showAnnonce} onClose={closeCreateAnnonce}>
        <DialogTitle>Create New Annonce</DialogTitle>
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
            label="Description"
            fullWidth
            multiline
            minRows={3}
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
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
          <Button onClick={closeCreateAnnonce} style={{color:"rgb(199, 3, 3)",}}>Cancel</Button>
          <Button onClick={handleCreateAnnonce} variant="contained">Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Announcements;
