// src/components/Topbar.js
import React, { useContext } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import footer from "../assets/Footer.png";
import { SelectedItemContext } from "../context/SelectedItemContext"; // Import the context

const Topbar = () => {
  const { selectedItem } = useContext(SelectedItemContext); // Access the context

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 250, // Adjust to match sidebar width
        display: "flex",
        alignItems: "center",
        borderRadius:"40px 40px 0 0",
        justifyContent: "space-between", // Spread items across
        width: "calc(99% - 250px)", // Adjust width after sidebar
        height: "60px",
        padding: "0px 20px", // Add padding for spacing
        margin:"20px 20px 20px 0px",
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
        <img
          src={footer}
          alt="footer"
          style={{
            width: "200px",
            height: "auto",
            marginLeft: "10px",
          }}
        />
      </Box>
    </Box>
  );
};

export default Topbar;
