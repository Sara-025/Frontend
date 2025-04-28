// src/components/Topbar.js
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { SelectedItemContext } from "../context/SelectedItemContext"; 

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
        left: 250, 
        display: "flex",
        alignItems: "center",
        borderRadius:"30px 30px 0 0",
        justifyContent: "space-between", 
        width: "calc(99% - 250px)", 
        height: "70px",
        padding: "0px 20px", 
        margin:"10px 20px 20px 0px",
        backgroundColor: "#FAFAFA",
        zIndex: 1000,
      }}
    >
      
      <Typography variant="body2" sx={{ color: "#000000" }}>
        {selectedItem.hierarchy || "Dashboard"}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
         <div style={{
          display:"flex",
          alignItems:"center",
          marginRight:"20px"
         }}>
        </div>
      </Box>
    </Box>
  );
};

export default Topbar;
