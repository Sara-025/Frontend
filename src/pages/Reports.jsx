import React, { useState } from "react";
import "./Reports.css"; 
import { useNavigate } from "react-router-dom";
import image1 from "../assets/1d44e80a5ea075608758d7af813a2d18.jfif";
import {
  TextField,
  Box,
  InputAdornment,
}from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Reports = () => {
  const navigate = useNavigate();
  
  // Store users in state so we can update the list
  const [users, setUsers] = useState([
    { id: 1, firstName: "Alexander", lastName: "Foley", phone: "+237 6 99 88 77 66", status: "Validé", location: "3RWJ+X5, Marsa Ben M'Hidi", email: "alexander.foley@mail.com", issueDate: "2022-06-21 14:30:25", image: image1 },
    { id: 2, firstName: "Alex", lastName: "Poley", phone: "+237 6 99 88 77 66", status: "Actif", location: "HGR2+994, N11, Tipaza" },
    { id: 3, firstName: "Blexander", lastName: "Foley", phone: "+237 6 99 88 77 66", status: "Inactif" },
    { id: 4, firstName: "Alexander", lastName: "Foley", phone: "+237 6 99 88 77 66", status: "Validé" },
  ]);

  
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Function to navigate to the suspend page
  const navigateToSuspend = (user) => {
    navigate(`/Suspend?email=${encodeURIComponent(user.email)}&firstName=${encodeURIComponent(user.firstName)}&lastName=${encodeURIComponent(user.lastName)}&phone=${encodeURIComponent(user.phone)}&location=${encodeURIComponent(user.location)}&issueDate=${encodeURIComponent(user.issueDate)}&image=${encodeURIComponent(user.image)}`);
  };

  // Function to open the modal before deleting
  const openDeleteModal = (userId) => {
    setUserToDelete(userId);
    setShowModal(true);
  };

  // Function to confirm delete
  const handleDelete = () => {
    if (userToDelete !== null) {
      setUsers(users.filter(user => user.id !== userToDelete));
      setShowModal(false);
      setUserToDelete(null);
    }
  };

  return (
    <>
      
        {/* Search Bar */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 , paddingLeft : "30px" , paddingBottom:"10px" }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            width: "900px",
            height: "48px",
            borderRadius:"20px",
            
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#4763E4" },
              "&:hover fieldset": { borderColor: "#4763E4" },
              "&.Mui-focused fieldset": { borderColor: "#4763E4" },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "black" }} />
              </InputAdornment>
            ),
          }}
        />
        </Box>

        {/* Table */}
        <div>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter((user) => user.firstName.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((user) => (
                  <tr key={user.id}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.phone}</td>
                    <td className={user.status === "Validé" ? "status-valide" : user.status === "Actif" ? "status-actif" : "status-inactif"}>
                      {user.status}
                    </td>
                    <td>
                      <button className="suspend" onClick={() => navigateToSuspend(user)}>Suspend</button>
                      <button className="delete" >Duplicate</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div> 
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Confirm Deletion</h3>
              <p>Are you sure you want to delete this user?</p>
              <div className="modal-buttons">
                <button onClick={handleDelete} className="confirm">Yes, Delete</button>
                <button onClick={() => setShowModal(false)} className="cancel">Cancel</button>
              </div>
            </div>
          </div>
        )}
      
    </>
  );
};

export default Reports;

