import './viewDetailsStyle.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import ImageIcon from '@mui/icons-material/Image';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material';
import Snackbar from "@mui/material/Snackbar";

const ViewDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const report = location.state?.report;

  const [teamOpen, setTeamOpen] = useState(false);
  const [teamId, setTeamId] = useState('');
  const [assignMsg, setAssignMsg] = useState('');
  const [assigning, setAssigning] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);



  const [markingDuplicate, setMarkingDuplicate] = useState(false);
const [duplicateMsg, setDuplicateMsg] = useState("");
const [snackbar, setSnackbar] = useState({
  open: false,
  message: "",
  severity: "success", 
});

const handleMarkAsDuplicate = () => {
  setMarkingDuplicate(true);
  axios
    .post(
      `${import.meta.env.VITE_API_BASE_URL}/admin/duplicate`,
      { reportid: report.id },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      }
    )
    .then(() => {
      setSnackbar({
        open: true,
        message: "Report marked as duplicate.",
        severity: "success",
      });
      setMarkingDuplicate(false);
    })
    .catch(() => {
      setSnackbar({
        open: true,
        message: "Failed to mark report as duplicate.",
        severity: "error",
      });
      setMarkingDuplicate(false);
    });
};


  if (!report) return <div>Missing report data. Please go back and try again.</div>;

  const user = report.user 
  const handleLocationClick = () => {
    navigate(
      `/Locations?loc=${encodeURIComponent(report.location || "N/A")}&lat=${report.lat || "N/A"}&lng=${report.lon || "N/A"}`
    );
  };

  const openSetTeam = () => {
    setAssignMsg('');
    setTeamOpen(true);
  };

  const closeSetTeam = () => {
    setTeamOpen(false);
    setTeamId('');
    setAssignMsg('');
  };

  const handleAssignTeam = () => {
    if (!teamId) {
      setAssignMsg('Team ID is required');
      return;
    }
    setAssigning(true);
    axios
      .post(
       ` ${import.meta.env.VITE_API_BASE_URL}/admin/assign-report`,
        {
          reportid: report.id,
          teamid: parseInt(teamId),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      )
      .then(() => {
        setAssignMsg("Team assigned successfully.");
        setAssigning(false);
        setTimeout(closeSetTeam, 1000);
      })
      .catch((error) => {
        let errMsg = "Failed to assign team.";
        if (error.response?.data?.error) {
          errMsg = error.response.data.error;
        }
        setAssignMsg(errMsg);
        setAssigning(false);
      });
  };

  const isMaybeDuplicate = report.status === "MAYBEDUPLICATE";

  return (
    <div className="report-container">
      <h3>View Account</h3>
      <div className="Main">
        <div className="report-field">
          <p>Full name :</p>
          <input type="text" value={user.fullname || "N/A"} readOnly />
        </div>

        <div className="report-field">
          <p>Phone number:</p>
          <input type="text" value={user.phonenumber || "N/A"} readOnly />
        </div>

        <div className="report-field">
          <p>Status:</p>
          <input type="text" value={report.status || "N/A"} readOnly />
        </div>

        <div className="report-field">
          <p>Report Date:</p>
          <input type="text" value={new Date(report.createdAt).toLocaleString() || "N/A"} readOnly />
        </div>

        <div className="report-field">
          <p>Location:</p>
          <input
            type="text"
            value={report.location || "N/A"}
            onClick={handleLocationClick}
            readOnly
            style={{ cursor: "pointer" }}
          />
        </div>

        <div className="report-field">
          <p>Description:</p>
          <input type="text" value={report.description || "Report details not provided."} readOnly />
        </div>

        <div className="report-field">
          <p>Image Preview:</p>
          <button
            onClick={() => setImageDialogOpen(true)}
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

      {/* Bottom Buttons */}
      <div className="setTeam" style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={openSetTeam}
          disabled={isMaybeDuplicate}
          style={{
            backgroundColor: isMaybeDuplicate ? '#ccc' : '#1976d2',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: isMaybeDuplicate ? 'not-allowed' : 'pointer'
          }}
        >
          Set Team
        </button>

        <button
          onClick={() => navigate(-1)}
          style={{
            backgroundColor: '#1976d2',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Go Back
        </button>
      </div>
      <button
        onClick={handleMarkAsDuplicate}
        disabled={report.status === "DUPLICATE" || report.teamId !== null}
        style={{
          backgroundColor:
            report.status === "DUPLICATE" || report.teamId !== null
              ? "#ccc"
              : "#f44336",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor:
            report.status === "DUPLICATE" || report.teamId !== null
              ? "not-allowed"
              : "pointer",
        }}
      >
        {markingDuplicate ? "Marking..." : "Mark as Duplicate"}
      </button>


      {/* Assign Team Dialog */}
      <Dialog open={teamOpen} onClose={closeSetTeam}>
        <DialogTitle>Assign Team</DialogTitle>
        <DialogContent>
          <TextField
            label="Team ID"
            type="number"
            value={teamId}
            onChange={(e) => setTeamId(e.target.value)}
            fullWidth
            autoFocus
            disabled={assigning}
          />
          {assignMsg && (
            <p
              style={{
                marginTop: '10px',
                color: assignMsg.includes("Failed") ? 'red' : 'green',
              }}
            >
              {assignMsg}
            </p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeSetTeam} disabled={assigning}>Cancel</Button>
          <Button onClick={handleAssignTeam} disabled={assigning || !teamId}>
            {assigning ? "Assigning..." : "Assign"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Image Preview Dialog */}
      <Dialog open={imageDialogOpen} onClose={() => setImageDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Image Preview</DialogTitle>
        <DialogContent>
          <img
            src={report.images.user}
            alt="Report"
            style={{ width: '100%', maxHeight: '500px', objectFit: 'contain' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setImageDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
  open={snackbar.open}
  autoHideDuration={4000}
  onClose={() => setSnackbar({ ...snackbar, open: false })}
  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
>
  <div
    style={{
      backgroundColor: snackbar.severity === "success" ? "#4caf50" : "#f44336",
      color: "#fff",
      padding: "10px 16px",
      borderRadius: "4px",
    }}
  >
    {snackbar.message}
  </div>
</Snackbar>

    </div>
  );
};

export default ViewDetails;
