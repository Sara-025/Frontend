import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import "./imageStyle.css"
const ImagePreview = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const imageUrl = params.get("img");
  const [action , setAction] = useState (" ");

  return (
    <div>
      {imageUrl ? (
        <><img src={imageUrl} className="imag" alt="Preview" style={{ width: "101%", height: "480px", margin: "0" }} /><div className="image-text">
                  <h3>Water leakage caused by a broken pipe, leading to water waste.</h3>
                  <p> 📍 <strong>Downtown Street, Block 5</strong></p>
                  <p> 🗓 <strong>Reported on:</strong> 2025-03-03</p>

                  <p className={action==="resolve " ? "Verre"  : "Rouge"}>Status: Pending</p>
                 {action==="resolve "? <div> </div> : <button className="resolve-btn" onClick={() => { setAction("resolve ") } }>Mark as Resolved</button>} 
              </div></> 
      ) : (
        <p>No image available</p>
      )}
    </div>
  );
};

export default ImagePreview;
