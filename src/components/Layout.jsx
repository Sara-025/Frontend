import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 250,
          flexShrink: 0,
          bgcolor: "primary.main",
          height: "100vh",
          position: "fixed",
          zIndex: 1100,
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
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Topbar */}
        <Box
          sx={{
            height: 60,
            width: "100%",
            bgcolor: "#ffffff",
            position: "fixed",
            zIndex: 1000,
          }}
        >
          <Topbar />
        </Box>

        {/* Page Content (Scrollable) */}
        <Box
          sx={{
            flexGrow: 1,
            mt: "60px",
            p: 2,
            overflowY: "auto",
            overflowX: "auto",
            width: "calc(100vw - 250px)",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;