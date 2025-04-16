import React, { useState } from 'react';
import './style.css';
import logo from '../assets/5892970150209111129_120-removebg-preview.png';
import { useNavigate } from "react-router-dom";

const App = () => {
  const [action, setAction] = useState(" ");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  
  const navigate = useNavigate();
  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/admin-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "admin@admin.com", password: "abc" }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Admin registered successfully!");
      } else {
        setMessage(data.error || "Registration failed");
      }
    } catch (error) {
      setMessage("Error connecting to server");
    }
  };
  
    
  

  const handleLogin = async () => {
    setEmailError(!email);
    setPasswordError(!password);

    

    try {
      const response = await fetch("http://localhost:3000/auth/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`Login successful!`);
        localStorage.setItem("token", data.token);
        navigate("../index");
      } else {
        setMessage(data.error);
        setEmailError(true);
        setPasswordError(true);
      }
    } catch (error) {
      setMessage("Error connecting to server");
    }
  };

  return (
    <div className='body'>
      <div className="wrapper">
        <div className='Logo'>
          <img src={logo} alt="Logo"/>
          <h1>FixSpot</h1>
          <handleRegister />

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
              <p>Email</p>
              <input
                type="email"
                placeholder="Email"
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
                <button onClick={handleLogin}>Login</button>
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
