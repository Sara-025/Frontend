import React, { useEffect, useState, useContext } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import "./SidebarPart.css";
import { Typography } from "@mui/material";
import { SelectedItemContext } from "../context/SelectedItemContext"; 
import GroupsIcon from '@mui/icons-material/Groups';
import HomeIcon from '@mui/icons-material/Home';
import CampaignIcon from '@mui/icons-material/Campaign';
import ReportIcon from '@mui/icons-material/Report';

function Sidebarpart() {
  const location = useLocation(); 
  const [selected, setSelected] = useState(location.pathname); 
  const { setSelectedItem } = useContext(SelectedItemContext); 

  useEffect(() => {
    setSelected(location.pathname);
  }, [location.pathname]);

  const Item = ({ title, to, hierarchy, icon }) => {
    return (
      <MenuItem
        active={selected === to}
        style={{ color: "#ffffff" }}
        onClick={() => {
          setSelected(to);
          setSelectedItem({ title, hierarchy });
        }}
        icon={icon}
        className={`menu-item ${selected === to ? "active" : ""}`}
      >
        <Link className="menu-hov"  to={to} style={{ textDecoration: "none", color: "inherit" }}>
          <Typography>{title}</Typography>
        </Link>
      </MenuItem>
    );
  };

  return (
    <Sidebar className="sidebar">
      <div className="sidebar-header">
        <div className="logo-container">
          <img src={logo} alt="logo" className="logo" />
          <h5 className="fixSpot">FixSpot</h5>
        </div>
      </div>

      <Menu>
        <Item title="Home" to="/home" hierarchy="Home" icon={<HomeIcon />} />
        <Item title="Reports" to="/reports" hierarchy="Reports" icon={<ReportIcon />} />
        <Item title="Teams" to="/teams" hierarchy="Teams" icon={<GroupsIcon />} />
        <Item title="Announcements" to="/announcements" hierarchy="Announcements" icon={<CampaignIcon />} />
      </Menu>
    </Sidebar>
  );
}

export default Sidebarpart;
