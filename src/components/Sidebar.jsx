import React, { useState } from 'react';
import './SidebarPart.css'; 
import Logo from "../assets/5791991307256842482_121-removebg-preview (1).png";
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import LoginIcon from '@mui/icons-material/Login';
import ReportIcon from '@mui/icons-material/Report';
import CampaignIcon from '@mui/icons-material/Campaign';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Dialog, DialogTitle, DialogContent, DialogContentText,
  DialogActions, Button
} from '@mui/material';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleLogoutClick = (e) => {
    e.preventDefault();
    setLogoutDialogOpen(true);
  };

  const handleLogoutConfirm = () => {
    setLogoutDialogOpen(false);
    
    navigate('/Login');
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  };

  const menuItems = [
    { icon: <SpaceDashboardIcon />, label: 'Dashboard', href: '/Home' },
    { icon: <PeopleIcon />, label: 'Teams', href: '/Teams' },
    { icon: <ReportIcon />, label: 'Reports', href: '/Reports' },
    { icon: <CampaignIcon />, label: 'Announcements', href: '/Announcements' },
    { icon: <SettingsIcon />, label: 'Settings', href: '/Settings' },
    { icon: <LoginIcon />, label: 'Log Out', href: '/Login', onClick: handleLogoutClick },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={Logo} alt="logo" className="logo" />
      </div>
      <div className="sidebar-menu">
        {menuItems.map((item, index) => {
          const isActive = currentPath === item.href;
          const linkProps = item.label === 'Log Out'
            ? { onClick: item.onClick, to: '#' }
            : { to: item.href };

          return (
            <Link
              key={index}
              className={`sidebar-item-link ${isActive ? 'active' : ''}`}
              {...linkProps}
            >
              <div className="sidebar-item">
                <span className="icon">{item.icon}</span>
                <span className="label">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>

      <Dialog
  open={logoutDialogOpen}
  onClose={handleLogoutCancel}
  PaperProps={{
    sx: {
      borderRadius: 4,         
      p: 2,                   
      width: '100%',
      maxWidth: 400,
      textAlign: 'center',    
    }
  }}
>
  <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.4rem' }}>
    Confirm Log Out
  </DialogTitle>

  <DialogContent>
    <DialogContentText sx={{ fontSize: '1rem', color: 'text.secondary' }}>
      Are you sure you want to log out?
    </DialogContentText>
  </DialogContent>

  <DialogActions sx={{ justifyContent: 'center', gap: 2 }}>
    <Button
      onClick={handleLogoutCancel}
      variant="outlined"
      color="primary"
      sx={{ borderRadius: '20px', textTransform: 'none', px: 3 }}
    >
      Cancel
    </Button>

    <Button
      onClick={handleLogoutConfirm}
      variant="contained"
      color="error"
      sx={{ borderRadius: '20px', textTransform: 'none', px: 3 }}
    >
      Log Out
    </Button>
  </DialogActions>
</Dialog>

    </div>
  );
};

export default Sidebar;
