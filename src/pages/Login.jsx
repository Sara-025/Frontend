import React, { useState } from 'react';
import './Login.css';
import logo from '../assets/5892970150209111129_120-removebg-preview.png';
import { useNavigate } from "react-router-dom";
import api from '../api/axios'; // adjust path if needed


const App = () => {
  const [action, setAction] = useState(" ");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  
  const navigate = useNavigate();
  
  
  const HandleLogin = async () => {
    setMessage("");
    setEmailError(false);
    setPasswordError(false);
  
    try {
      const response = await api.post('/login', {
        email,
        password,
      });
  
      // Assuming the backend returns a token and a success message
      const { token } = response.data;
  
      // Save token and navigate
      localStorage.setItem("adminToken", token);
      navigate("/home");
    } catch (error) {
      if (error.response) {
        const errorMsg = error.response.data.message || "Login failed";
        setMessage(errorMsg);
        setEmailError(true);
        setPasswordError(true);
      } else {
        setMessage("Server error. Please try again.");
        setEmailError(true);
        setPasswordError(true);
      }
    }
  };  
  return (
    <div className='body'>
      <div className="wrapper">
        <div className='Logo'>
          <img src={logo} alt="Logo"/>
          <h1>FixSpot</h1>
          

        </div>
        {action === "check email " ? (
          <div>
            <p className='check-email-p'>Password change link has been sent, please check your email</p>
          </div>
        ) : (
          <>
            <p className='loginText'>Please enter your administrator login credentials</p>
            <p className={emailError ? "errormessage" : "correctmessage"}>{message}</p>
            <div className="input-box">
              <p>Phone Number</p>
              <input
                type="phone Number"
                placeholder="phone number"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setEmailError(false); }}
                className={emailError ? "error-input" : "correct-input"}
              />
            </div>
            <div className="input-box">
              {action === "Forgot password" ? (
                <></>
              ) : (
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
              )}
            </div>
            <div className="forgot">
              {action !== "Forgot password" && (
                <p onClick={() => setAction("Forgot password")}>Forgot your password?</p>
              )}
            </div>
            <div className='btn'>
              {action === "Forgot password" ? (
                <button onClick={() => setAction("check email ")}>Send</button>
              ) : (
                <button onClick={HandleLogin}>Login</button>
              )}
            </div>
            <div className='Back'>
              {action === "Forgot password" && (
                <p onClick={() => setAction("Back to login")}>Back to login page</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
