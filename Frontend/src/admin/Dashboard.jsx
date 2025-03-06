import React, { useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import "./Dashboard.css";

const Dashboard = () => {
  const [selectedBrgy, setSelectedBrgy] = useState("All");
  
  const barangays = ["All", "Brgy 1", "Brgy 2", "Brgy 3", "Brgy 4"];

  const handleBrgyChange = (event) => {
    setSelectedBrgy(event.target.value);
  };

  const brgyData = {
    "All": { population: [43, 44, 46, 46, 48, 50, 51, 53, 54, 56, 57, 62], growth: [10, 12, 8, 15], distribution: [150, 80, 10] },
    "Brgy 1": { population: [20, 22, 23, 25, 26, 28, 30, 31, 33, 35, 37, 40], growth: [5, 6, 4, 7], distribution: [50, 30, 5] },
    "Brgy 2": { population: [15, 17, 18, 19, 21, 23, 24, 26, 28, 29, 31, 34], growth: [3, 4, 2, 5], distribution: [40, 25, 3] },
    "Brgy 3": { population: [10, 11, 12, 14, 15, 17, 18, 20, 21, 22, 23, 25], growth: [2, 3, 2, 4], distribution: [30, 20, 2] },
    "Brgy 4": { population: [8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 21], growth: [1, 2, 2, 3], distribution: [20, 15, 1] },
  };

  const populationData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: `Population Growth (${selectedBrgy})`,
        data: brgyData[selectedBrgy].population,
        borderColor: "#ED2939",
        backgroundColor: "rgba(237, 41, 57, 0.3)",
        fill: true,
      },
    ],
  };

  const growthData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: `Quarterly Growth (${selectedBrgy})`,
        data: brgyData[selectedBrgy].growth,
        backgroundColor: "#50C878",
        borderColor: "#74C365",
        borderWidth: 1,
      },
    ],
  };

  const userDistributionData = {
    labels: ["Female", "Male", "LGBTQ+"],
    datasets: [
      {
        data: brgyData[selectedBrgy].distribution,
        backgroundColor: ["#E30B5C", "#007FFF", "#6F2DA8"],
      },
    ],
  };

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Dashboard</h2>
      
      {/* Dropdown for Barangay Selection */}
      <div className="dropdown-container">
        <label>Select Barangay: </label>
        <select value={selectedBrgy} onChange={handleBrgyChange}>
          {barangays.map((brgy) => (
            <option key={brgy} value={brgy}>{brgy}</option>
          ))}
        </select>
      </div>

      <div className="charts-container">
        <div className="left-charts">
          <div className="chart-container">
            <h3 className="chart-title">Population Growth</h3>
            <Line data={populationData} />
          </div>

          <div className="chart-container">
            <h3 className="chart-title">Quarterly Growth</h3>
            <Bar data={growthData} />
          </div>
        </div>

        <div className="right-chart">
          <div className="chart-container">
            <h3 className="chart-title">Population by Gender</h3>
            <Pie data={userDistributionData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
