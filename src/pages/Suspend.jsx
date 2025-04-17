import './SuspendStyle.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import ImageIcon from '@mui/icons-material/Image';

const Suspend = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const reportData = {
    email: params.get("email") || "N/A",
    firstName: params.get("firstName") || "N/A",
    lastName: params.get("lastName") || "N/A",
    phone: params.get("phone") || "N/A",
    issueDate: params.get("issueDate") || "N/A",
    location: params.get("location") || "N/A",
    description: "Report details not provided.",
    image : params.get ("image") || "N/A",
  };
  const navigate = useNavigate();
          const navigateToLocation = async () => {
      
              navigate(`/Locations?loc=${encodeURIComponent(reportData.location)}`);
            };
            const navigateToImage = async () =>{
              navigate (`/imagePreview?img=${encodeURIComponent(reportData.image)}`);
            };
        
      return (
        <div className="report-container">
          
          <h3>View Account</h3>
          <div className='Main'>
          <div className="report-field">
            <p>Adresse e-mail:</p> <input type='email' value={reportData.email} readOnly></input>
          </div>
          
          <div className="report-field">
            <p>Nom:</p> <input type='text' value={reportData.firstName}readOnly/>
          </div>
          
          <div className="report-field">
            <p>Prénom:</p> <input type='text' value={reportData.lastName} readOnly/>
          </div>
          
          <div className="report-field">
            <p>Phone number:</p> <input type='phone' value={reportData.phone} readOnly/>
          </div>
          
          <div className="report-field">
            <p> Report Date:</p> <input type='' value={reportData.issueDate} readOnly/>
          </div>
          
          <div className="report-field">
            <p >Location:</p> <input onClick={navigateToLocation} type='text' value={reportData.location} readOnly />
          </div>
    
          <div className="report-field">
            <p>Description:</p>
            <input type='text' value={reportData.description}/>
          </div>
    
          <div className="report-field">
            <p>Image Preview:</p>
          
            <button
      onClick={navigateToImage}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '8px 310px 8px 10px',
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
        </div>
      );
    };
    

export default Suspend;