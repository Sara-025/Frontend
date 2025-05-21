import './SuspendStyle.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
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

const Suspend = () => {
  const { reportId } = useParams();
  const navigate = useNavigate();

  const [reportData, setReportData] = useState(null);
  const [setTeamOpen, setSetTeamOpen] = useState(false);
  const [teamId, setTeamId] = useState('');
  const [assignMsg, setAssignMsg] = useState('');

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await axios.get(`http://10.110.15.150:3000/admin/report/${reportId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`
          }
        });
        console.log("Fetched Report:", res.data);
        setReportData(res.data);
      } catch (err) {
        console.error("Error fetching report:", err);
        setReportData({});
      }
    };

    fetchReport();
  }, [reportId]);

  if (!reportData) return <div>Loading...</div>;

  const user = reportData.user || {};
  const fullName = user.fullname || "";
  const [firstName = "", lastName = ""] = fullName.split(" ");

  const handleLocationClick = () => {
    navigate(`/Locations?loc=${encodeURIComponent(reportData.location || "N/A")}&lat=${reportData.lat || "N/A"}&lng=${reportData.lon || "N/A"}`);
  };

  const handleImageClick = () => {
    navigate(`/imagePreview?img=${encodeURIComponent((reportData.images?.user?.[0]) || "N/A")}`);
  };

  const openSetTeam = () => {
    setAssignMsg('');
    setSetTeamOpen(true);
  };
  const closeSetTeam = () => {
    setSetTeamOpen(false);
    setTeamId('');
    setAssignMsg('');
  };

  const handleAssignTeam = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.post("http://10.110.15.150:3000/admin/assign-report", {
        reportid: reportId,
        teamid: teamId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Assigned Team Response:', res.data);
      setAssignMsg(res.data.message);
      setTimeout(closeSetTeam, 1000); // close after success
    } catch (err) {
      setAssignMsg(err.response?.data?.error || "Error assigning team");
    }
  };

  return (
    <div className="report-container">
      <h3>View Account</h3>
      <div className="Main">
        <div className="report-field">
          <p>Adresse e-mail:</p>
          <input type="email" value={user.email || "N/A"} readOnly />
        </div>

        <div className="report-field">
          <p>Nom:</p>
          <input type="text" value={firstName || "N/A"} readOnly />
        </div>

        <div className="report-field">
          <p>Prénom:</p>
          <input type="text" value={lastName || "N/A"} readOnly />
        </div>

        <div className="report-field">
          <p>Phone number:</p>
          <input type="text" value={user.phonenumber || "N/A"} readOnly />
        </div>

        <div className="report-field">
          <p>Report Date:</p>
          <input type="text" value={new Date(reportData.createdAt).toLocaleString() || "N/A"} readOnly />
        </div>

        <div className="report-field">
          <p>Location:</p>
          <input
            type="text"
            value={reportData.location || "N/A"}
            onClick={handleLocationClick}
            readOnly
            style={{ cursor: "pointer" }}
          />
        </div>

        <div className="report-field">
          <p>Description:</p>
          <input type="text" value={"Report details not provided."} readOnly />
        </div>

        <div className="report-field">
          <p>Image Preview:</p>
          <button
            onClick={handleImageClick}
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

      <Dialog PaperProps={{ sx: { width: 500 } }} open={setTeamOpen} onClose={closeSetTeam}>
        <DialogTitle>Assign a Team</DialogTitle>
        <DialogContent dividers>
          <TextField
            margin="dense"
            label="Team ID"
            type="number"
            fullWidth
            value={teamId}
            onChange={(e) => setTeamId(e.target.value)}
          />
          {assignMsg && (
            <p style={{ color: assignMsg.includes("success") ? "green" : "red", marginTop: 10 }}>
              {assignMsg}
            </p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeSetTeam} sx={{ color: "rgb(199, 3, 3)" }}>
            Cancel
          </Button>
          <Button onClick={handleAssignTeam} variant="contained">
            Assign
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Suspend;
