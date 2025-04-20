import React, { useState } from "react";
import "./Reports.css"; 
import { useNavigate } from "react-router-dom";
import image1 from "../assets/1d44e80a5ea075608758d7af813a2d18.jfif";
import {
  TextField,
  Box,
  InputAdornment,
}from "@mui/material";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

const Reports = () => {
  const navigate = useNavigate();
  
 
  const [users, setUsers] = useState([
    { id: 1, firstName: "Alexander", lastName: "Foley", phone: "+237 6 99 88 77 66", status: "Validé", location: "3RWJ+X5, Marsa Ben M'Hidi", email: "alexander.foley@mail.com", issueDate: "2022-06-21 14:30:25", image: image1 },
    { id: 2, firstName: "Alex", lastName: "Poley", phone: "+237 6 99 88 77 66", status: "Actif", location: "HGR2+994, N11, Tipaza" },
    { id: 3, firstName: "Blexander", lastName: "Foley", phone: "+237 6 99 88 77 66", status: "Inactif" },
    { id: 4, firstName: "Alexander", lastName: "Foley", phone: "+237 6 99 88 77 66", status: "Validé" },
  ]);

  
  const [searchQuery, setSearchQuery] = useState("");

  // Function to navigate to the suspend page
  const navigateToSuspend = (user) => {
    navigate(`/Suspend?email=${encodeURIComponent(user.email)}&firstName=${encodeURIComponent(user.firstName)}&lastName=${encodeURIComponent(user.lastName)}&phone=${encodeURIComponent(user.phone)}&location=${encodeURIComponent(user.location)}&issueDate=${encodeURIComponent(user.issueDate)}&image=${encodeURIComponent(user.image)}`);
  };
  return (
    <div className="Reports-Main">
      
        {/* Search Bar */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 , paddingLeft : "30px" , paddingBottom:"10px",borderRadius:"30px", }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            width: "930px",
            height: "48px",
            borderRadius:"30px",
            
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
        <TableContainer component={Paper} sx={{ maxWidth: "100%", mx: "auto", borderRadius: 2  }}>
  <Table>
    <TableHead>
      <TableRow sx={{ backgroundColor: "rgb(255, 255, 255)" }}>
        <TableCell align="center" >First Name</TableCell>
        <TableCell align="center">Last Name</TableCell>
        <TableCell align="center">Phone</TableCell>
        <TableCell align="center">Status</TableCell>
        <TableCell align="center">Actions</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {users
        .filter((user) =>
          user.firstName.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((user) => (
          <TableRow key={user.id} hover>
            <TableCell align="center">{user.firstName}</TableCell>
            <TableCell align="center">{user.lastName}</TableCell>
            <TableCell align="center">{user.phone}</TableCell>
            <TableCell
              align="center"
              className={
                user.status === "Validé" ? "status-valide" : user.status === "Actif" ? "status-actif" : "status-inactif"
              }
            >
              {user.status}
            </TableCell>
            <TableCell align="center">
              <button  className="suspend" onClick={() => navigateToSuspend(user)}> Suspend</button>
              <button className="delete" > Duplicate</button>
            </TableCell>
          </TableRow>
        ))}
    </TableBody>
  </Table>
</TableContainer>
        </div> 
    </div>
  );
};

export default Reports;

