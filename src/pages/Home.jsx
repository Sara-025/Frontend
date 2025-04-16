import React from "react";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    defaults } from "chart.js";
import { Line } from "react-chartjs-2";
import "./Home.css";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
  );
  defaults.font.family = "Arial";
defaults.color = "#000";

  

  
const Home = () => {
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Users",
            data: [100, 200, 150, 300, 250, 400],
            borderColor: "#000",
            borderWidth: 1,
            backgroundColor: "rgba(250, 250, 250, 0.91)",
            pointBorderColor: "#000",
            tension: 0.3, 
            fill: true,
          },
        ],
      };
      const options = {
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: "top",
          },
        },
        tooltip: {
            backgroundColor: "#fff",
            titleColor: "#333",
            bodyColor: "#666",
            borderColor: "#ccc",
            borderWidth: 1,
          },
 

        scales: {
          y: {
            beginAtZero: true,
            
          },
        },
      };
  const previousUsers = 400;
  const currentUsers = 444;

  const difference = currentUsers - previousUsers;
  const percentageChange1 = ((difference / previousUsers) * 100).toFixed(1);

  const isPositive1 = percentageChange1 >= 0;

  const previousReports = 500;
  const currentReports = 540;

  const difference2 = currentReports - previousReports;
  const percentageChange2 = ((difference2 / previousReports) * 100).toFixed(1);

  const isPositive2 = percentageChange2 >= 0;

  const previousActiveUsers = 320;
  const currentActiveUsers = 300;

  const difference3 = currentActiveUsers - previousActiveUsers;
  const percentageChange3 = ((difference3 / previousActiveUsers) * 100).toFixed(1);

  const isPositive3 = percentageChange3 >= 0;

  return (
    <>
      <div className="container1">
        <div className="a card">
          <div className="top">
            <span className="title">Users</span>
            {isPositive1 ? (
           <TrendingUpIcon sx={{ color: "white", fontSize: 28 }}/>
        ) : (
           <TrendingDownIcon sx={{ color: "white", fontSize: 28 }}/>
        )}
            
          </div>
          <div className="bottom">
            <span className="number">{currentUsers}</span>
             {isPositive1 ? (
             <span className="percentage_is_positive" >+
             {Math.abs(percentageChange1)}%
                </span>
        ) : (
            <span className="percentage_is_negative" >-
            {Math.abs(percentageChange1)}%
               </span>
        )}
          </div>
        </div>

        <div className="b card">
          <div className="top">
            <span className="title">Requests</span>
            {isPositive3 ? (
           <TrendingUpIcon sx={{ color: "white", fontSize: 28 }}/>
        ) : (
           <TrendingDownIcon sx={{ color: "white", fontSize: 28 }}/>
        )}
          </div>
          <div className="bottom">
            <span className="number">{currentActiveUsers}</span>
            {isPositive3 ? (
             <span className="percentage_is_positive" >+
             {Math.abs(percentageChange3)}%
                </span>
        ) : (
            <span className="percentage_is_negative" >-
            {Math.abs(percentageChange3)}%
               </span>
        )}
          </div>
        </div>
        <div className="c card">
          <div className="top">
            <span className="title">Reports</span>
            {isPositive2 ? (
           <TrendingUpIcon sx={{ color: "white", fontSize: 28 }}/>
        ) : (
           <TrendingDownIcon sx={{ color: "white", fontSize: 28 }}/>
        )}
            
          </div>
          <div className="bottom">
            <span className="number">{currentReports}</span>
             {isPositive2 ? (
             <span className="percentage_is_positive" >+
             {Math.abs(percentageChange2)}%
                </span>
        ) : (
            <span className="percentage_is_negative" >-
            {Math.abs(percentageChange2)}%
               </span>
        )}
          </div>
        </div>
      </div>
      <div calssName="container2">
        <div className="left">
            <h1>Reports</h1>
            <div className="dataCard">
        <Line data={data} options={options} />
        </div>
            </div>
        
        
      </div>
    </>
  );
};

export default Home;