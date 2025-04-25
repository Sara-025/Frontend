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
import ProtectedRoute from "./components/ProtectedRoute"; 
import  Settings from "./pages/Settings";

function App() {
  return (
    <SelectedItemProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          {/* Login page */}
          <Route path="/login" element={<Login />} />
          {/* Protected routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/announcements" element={<Announcements />} />
                    <Route path="/teams" element={<Teams />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/suspend" element={<Suspend />} />
                    <Route path="/locations" element={<Location />} />
                    <Route path="/imagePreview" element={<ImagePreview />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </SelectedItemProvider>
  );
}

export default App;
