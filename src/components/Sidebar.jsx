import React from 'react';
import './SidebarPart.css'; 
import Logo from "../assets/logo.png"
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import LoginIcon from '@mui/icons-material/Login';
import ReportIcon from '@mui/icons-material/Report';
import CampaignIcon from '@mui/icons-material/Campaign';
import { Link, useLocation } from 'react-router-dom';


const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { icon: <SpaceDashboardIcon />, label: 'Dashboard', href: '/Home' },
    { icon: <PeopleIcon />, label: 'Teams', href: '/Teams' },
    { icon: <ReportIcon />, label: 'Reports', href: '/Reports' },
    { icon: <CampaignIcon />, label: 'Announcements', href: '/Announcements' },
    { icon: <SettingsIcon />, label: 'Settings', href: '/Settings' },
    { icon: <LoginIcon />, label: 'Log Out', href: '/Login' },
    
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
       
        <img src={Logo} alt="logo" className="logo" />
          <h5 className="fixSpot">FixSpot</h5>
      </div>
      <div className="sidebar-menu">
        {menuItems.map((item, index) => {
          const isActive = currentPath === item.href;
          return (
            <Link
              to={item.href}
              key={index}
              className={`sidebar-item-link ${isActive ? 'active' : ''}`}
            >
              <div className="sidebar-item">
                <span className="icon">{item.icon}</span>
                <span className="label">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
