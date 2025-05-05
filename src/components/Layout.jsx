import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden" , backgroundColor:"#1886e7" }}>
      <Box
        sx={{
          width: 250,
          flexShrink: 60,
          bgcolor: "primary.main",
          height: "100vh",
          position: "fixed",  
          zIndex: 1100,
          overscrollBehavior: "contain", 
        }}
      >
        <Sidebar />
      </Box>

      {/* Main Content Area */}
      <Box
        sx={{
          flexGrow: 1,
          ml: "250px",
          display: "flex",
          flexDirection: "column",
          justifyContent:"center",  
          height: "100vh",
          overflow: "hidden",
          overscrollBehavior: "contain", 
         
        }}
      >
        {/* Topbar */}
        <Box
          sx={{
            height: 0,
            width: "100%",
            bgcolor: "#ffffff",
            position: "fixed",
            zIndex: 1000,
            overscrollBehavior: "contain", 
          }}
        >
          <Topbar  />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            mt: "80px",
            p: 2,
            overflowY: "auto",
            overflowX: "auto",
            width: "calc(99vw - 250px)",
            backgroundColor:"#FAFAFA",
            overscrollBehavior: "contain", 
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;