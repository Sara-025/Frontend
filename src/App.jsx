// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Teams from "./pages/Teams";
import Reports from "./pages/Reports";
import { SelectedItemProvider } from "./context/SelectedItemContext";
import Login from "./pages/Login";
import Suspend from "./pages/Suspend";
import Location from "./pages/Locations";
import ImagePreview from "./pages/imagePreview";
import Announcements from "./pages/Announcements";
import Home from "./pages/Home";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Check if the user is logged in
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <SelectedItemProvider>
      <Router>
        <Routes>
          {/* Always accessible login page */}
          <Route path="/login" element={<Login />} />

          {/* Protected routes (only accessible after login) */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                  <Route path="/home" element={<Home/>} />
                  <Route path="/announcements" element={<Announcements/>} />
                    <Route path="/teams" element={<Teams />} />
                    <Route path="/reports" element={<Reports />} />
                    
                    <Route path="/suspend" element={<Suspend />} />
                    <Route path="/Locations" element={<Location />} />
                    <Route path="/imagePreview" element={<ImagePreview />} />

                    {/* If user tries to access '/', redirect to teams */}
                    <Route path="/" element={<Navigate to="/teams" />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Catch-all: If user is not logged in and tries to access anything else, redirect */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </SelectedItemProvider>
  );
}

export default App;