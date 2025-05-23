import  { useState } from 'react';
import './Login.css';
import logo from '../assets/5892970150209111129_120-removebg-preview.png';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const App = () => {
  const [phonenumber, setPhoneNumber] = useState(""); 
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();

  const HandleLogin = async () => {
    setMessage("");
    setPhoneError(false);
    setPasswordError(false);
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/admin-login`, {
        phonenumber: phonenumber,
        password: password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const { token } = response.data;
      localStorage.setItem("adminToken", token);
      
      navigate("/home");
    } catch (error) {
        console.log(error);
      if (error.response) {
        const errorMsg = error.response.data.error || "Login failed";
        setMessage(errorMsg);
        setPhoneError(true);
        setPasswordError(true);
      } else {
        setMessage("Server error. Please try again.");
        setPhoneError(true);
        setPasswordError(true);
      }
    }
  };
  
  return (
    <div className='body'>
      <div className="wrapper">
        <div className='Logo'>
          <img src={logo} alt="Logo" />
          <h1>FixSpot</h1>
        </div> 
          <>
            <p className='loginText'>Please enter your administrator login credentials</p>
            <p className={phoneError ? "errormessage" : "correctmessage"}>{message}</p>
            <div className="input-box">
              <p>Phone Number</p>
              <input
                type="text"
                placeholder="Phone number"
                value={phonenumber}
                onChange={(e) => { setPhoneNumber(e.target.value); setPhoneError(false); }}
                className={phoneError ? "error-input" : "correct-input"}
              />
            </div>
            <div className="input-box">
                <>
                  <p>Password</p>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setPasswordError(false); }}
                    className={passwordError ? "error-input" : "correct-input"}
                  />
                </>
            </div>
            <div className='btn'>
                <button onClick={HandleLogin}>Login</button>   
            </div>    
          </> 
      </div>
    </div>
  );
};

export default App;