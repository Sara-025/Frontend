import './SuspendStyle.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material';

const Suspend = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [setTeamOpen, setSetTeamOpen] = useState(false);

  const params = new URLSearchParams(location.search);

  const reportData = {
    email: params.get("email") || "N/A",
    firstName: params.get("firstName") || "N/A",
    lastName: params.get("lastName") || "N/A",
    phone: params.get("phone") || "N/A",
    issueDate: params.get("issueDate") || "N/A",
    location: params.get("location") || "N/A",
    description: "Report details not provided.",
    image: params.get("image") || "N/A",
    lat :params.get("lat")||"N/A" ,
    lng : params.get("lng")|| "N/A",

  };

  const openSetTeam = () => setSetTeamOpen(true);
  const closeSetTeam = () => setSetTeamOpen(false);

  const navigateToLocation = () => {
    navigate(`/Locations?loc=${encodeURIComponent(reportData.location)}&lat=${reportData.lat}&lng=${reportData.lng}`);
  };

  const navigateToImage = () => {
    navigate(`/imagePreview?img=${encodeURIComponent(reportData.image)}`);
  };

  return (
    <div className="report-container">
      <h3>View Account</h3>
      <div className="Main">
        <div className="report-field">
          <p>Adresse e-mail:</p>
          <input type="email" value={reportData.email} readOnly />
        </div>

        <div className="report-field">
          <p>Nom:</p>
          <input type="text" value={reportData.firstName} readOnly />
        </div>

        <div className="report-field">
          <p>Prénom:</p>
          <input type="text" value={reportData.lastName} readOnly />
        </div>

        <div className="report-field">
          <p>Phone number:</p>
          <input type="text" value={reportData.phone} readOnly />
        </div>

        <div className="report-field">
          <p>Report Date:</p>
          <input type="text" value={reportData.issueDate} readOnly />
        </div>

        <div className="report-field">
          <p>Location:</p>
          <input
            type="text"
            value={reportData.location}
            onClick={navigateToLocation}
            readOnly
            style={{ cursor: "pointer" }}
          />
        </div>

        <div className="report-field">
          <p>Description:</p>
          <input type="text" value={reportData.description} readOnly />
        </div>

        <div className="report-field">
          <p>Image Preview:</p>
          <button
            onClick={navigateToImage}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 310px 8px 10px',
              width: '100%',
              border: '1.3px solid #E4E4E7',
              borderRadius: '7px',
              background: '#fff',
              cursor: 'pointer',
              gap: '8px'
            }}
          >
            <ImageIcon />
            View Image
          </button>
        </div>
      </div>

      <div className="setTeam">
        <button onClick={openSetTeam}>Set Team</button>
      </div>

      <Dialog PaperProps={{
    sx: { width: 500 } 
  }} open={setTeamOpen} onClose={closeSetTeam}>
        <DialogTitle>Assign a Team</DialogTitle>
        <DialogContent dividers>
          <TextField
            margin="dense"
            label="Team Name"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeSetTeam} sx={{ color: "rgb(199, 3, 3)" }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Suspend;