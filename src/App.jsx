// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = true; 
  const location = useLocation();

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

function App() {
  return (
    <SelectedItemProvider>
      <Router>
        <Routes>
          
          <Route path="/login" element={<Login />} />

         
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

                    
                    <Route path="/" element={<Navigate to="/teams" />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            }
          />

          
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </SelectedItemProvider>
  );
}

export default App;