// src/components/Topbar.js
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Typography } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import footer from "../assets/Ellipse 159.png";
import { SelectedItemContext } from "../context/SelectedItemContext"; // Import the context

const Topbar = () => {
  const { selectedItem } = useContext(SelectedItemContext); // Access the context
  const navigate = useNavigate();
  const handleToSettings = () => {
    navigate("/Profile");

  }

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 250, // Adjust to match sidebar width
        display: "flex",
        alignItems: "center",
        borderRadius:"30px 30px 0 0",
        justifyContent: "space-between", // Spread items across
        width: "calc(99% - 250px)", // Adjust width after sidebar
        height: "70px",
        padding: "0px 20px", // Add padding for spacing
        margin:"10px 20px 20px 0px",
        backgroundColor: "#ffffff",
        zIndex: 1000,
         
        

      }}
    >
      {/* Display selected item and hierarchy */}
      <Typography variant="body2" sx={{ color: "#000000" }}>
        {selectedItem.hierarchy || "Dashboard"}
      </Typography>

      {/* Right Section */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {/* Notifications Icon */}
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
         {/* Footer Image */}
         <div style={{
          display:"flex",
          alignItems:"center",
          marginRight:"10px"
         }}>
         <img
          src={footer}
          alt="footer"
          onClick={handleToSettings}
          style={{
            width: "30px",
            height: "auto",
            marginLeft: "10px",
            marginRight:"5px",
            cursor:"pointer"
            
          }}
        />
        <h4 style={{
          fontSize:"15px",
          fontWeight:"600",
        }}>Ramesh</h4>
        </div>

        
      </Box>
    </Box>
  );
};

export default Topbar;
