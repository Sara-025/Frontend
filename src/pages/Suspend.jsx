import './SuspendStyle.css';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
  const location = useLocation();

  const reportData = location.state?.report;
  const [detailedReport, setDetailedReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [setTeamOpen, setSetTeamOpen] = useState(false);
  const [teamId, setTeamId] = useState('');
  const [assignMsg, setAssignMsg] = useState('');
  const [imageDialogOpen, setImageDialogOpen] = useState(false);

  useEffect(() => {
    const fetchDetailedReport = async () => {
      if (reportData) {
        try {
          const token = localStorage.getItem("adminToken");
          const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/report/${reportId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!res.ok) throw new Error("Failed to fetch detailed report");
          const data = await res.json();
          setDetailedReport(data);
        } catch (err) {
          setDetailedReport(null);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchDetailedReport();
  }, [reportData, reportId]);

  if (loading) return <div>Loading report data...</div>;

  const report = detailedReport || reportData;
  if (!report) return <div>Missing report data. Please go back and try again.</div>;

  const user = report.user || {};
  const fullName = user.fullname || "";
  const [firstName = "", lastName = ""] = fullName.split(" ");

  const handleLocationClick = () => {
    navigate(`/Locations?loc=${encodeURIComponent(report.location || "N/A")}&lat=${report.lat || "N/A"}&lng=${report.lon || "N/A"}`);
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
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/assign-report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          reportid: reportId,
          teamid: teamId
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setAssignMsg(data.message);
      setTimeout(closeSetTeam, 1000);
    } catch (err) {
      setAssignMsg(err.message || "Error assigning team");
    }
  };

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
            <p style={{ color: assignMsg.includes("successfully") ? "green" : "red", marginTop: 10 }}>
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

      {/* Image Dialog */}
      <Dialog
        open={imageDialogOpen}
        onClose={() => setImageDialogOpen(false)}
        maxWidth="md"
        fullWidth
        scroll="paper"
      >
        
        <DialogTitle>Report Images</DialogTitle>
        <DialogContent dividers style={{ maxHeight: "500px", overflowY: "auto" }}>
          <div className="report-images">
            {report.images?.user?.map((img, idx) => (
              <img
                key={`user-${idx}`}
                src={`${import.meta.env.VITE_API_BASE_URL}/${img}`}
                alt={`User image ${idx + 1}`}
                className="report-img"
              />
            ))}
            {report.images?.teams?.map((img, idx) => (
              <img
                key={`team-${idx}`}
                src={`${import.meta.env.VITE_API_BASE_URL}/${img}`}
                alt={`Team image ${idx + 1}`}
                className="report-img"
              />
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setImageDialogOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Suspend;
