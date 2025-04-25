// src/components/Topbar.js
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Typography } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import footer from "../assets/c79a37e13ef14be556b51143bcbb1b01.jpg";
import { SelectedItemContext } from "../context/SelectedItemContext"; // Import the context

const Topbar = () => {
  const { selectedItem } = useContext(SelectedItemContext); // Access the context
  const navigate = useNavigate();
  const handleToSettings = () => {
    navigate("/Settings");

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
        backgroundColor: "#FAFAFA",
        zIndex: 1000,
         
        

      }}
    >
      {/* Display selected item and hierarchy */}
      <Typography variant="body2" sx={{ color: "#000000" }}>
        {selectedItem.hierarchy || "Dashboard"}
      </Typography>

      {/* Right Section */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
         {/* Footer Image */}
         <div style={{
          display:"flex",
          alignItems:"center",
          marginRight:"20px"
         }}>
         <img
          src={footer}
          alt="footer"
          onClick={handleToSettings}
          style={{
            width: "30px",
            height: "auto",
            marginLeft: "10px",
            marginRight:"10px",
            cursor:"pointer",
            borderRadius:"50px", 
            border:"2px solid rgb(4, 113, 209) "
            
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
