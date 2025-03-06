import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css"; // Import CSS file
import FirstForm from "./forms/FirstForm";

// ✅ Import images
import avatar from "../assets/avatar.jpg";
import idPic from "../assets/idpic.png"; // Use exact case for the ID pic

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("Details"); // Default to "Details"
  const [user, setUser] = useState(null); // State for user data
  const navigate = useNavigate();

  // Retrieve UserId from localStorage
  const loggedInUserId = localStorage.getItem("UserId"); // Assuming the logged-in user's UserId is stored in localStorage
  
  // Fetch user details from the backend
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!loggedInUserId) {
        console.error("No logged-in user found");
        return;
      }

      try {
        const response = await fetch("http://localhost:8081/getUserDetails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: loggedInUserId }), // Pass userId to fetch data
        });

        const data = await response.json();

        if (response.ok) {
          setUser(data); // Set user details from the response
        } else {
          console.error("Error fetching user data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserDetails();
  }, [loggedInUserId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  // Get the status directly from the user object (from the backend)
  const status = user.status || "Unverified";  

  const handleApplicationClick = () => {
    navigate("/firstform", { state: { user } }); // Pass user data via navigate state
  };
  

  return (
    <div className="profile-container">
      {/* ✅ Profile Header */}
      <div className="profile-header">
        <div className="profile-header-left">
          <img src={user.profilePic || avatar} alt="Profile" className="profile-pic" />
          <div>
            <h2>{user.name || "Unverified"}</h2>
            <p>{user.email || "Unverified"}</p>
            <p className={`status ${status.toLowerCase()}`}>Status: {status}</p> {/* Displaying the status */}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        {["Details", "benefits", "ID"].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* ✅ Tab Content */}
      <div className="tab-content">
        {/* Details Tab */}
        {activeTab === "Details" && (
          <div>
            {status === "Unverified" ? (
              <div>
                <p>You need to send an application to become verified.</p>
                <button className="application-button" onClick={handleApplicationClick}>
                  Send Application
                </button>
              </div>
            ) : (
              <ul>
                {Array.isArray(user.documents) && user.documents.length > 0 ? (
                  user.documents.map((doc, index) => <li key={index}>{doc}</li>)
                ) : (
                  <li>Unverified</li>
                )}
              </ul>
            )}
          </div>
        )}

        {/* Benefits Tab */}
        {activeTab === "benefits" && (
          <div>
            {status === "Unverified" ? (
              <p>You need to send an application to become verified to see the benefits.</p>
            ) : (
              <ul>
                {user.benefits && user.benefits.length > 0 ? (
                  user.benefits.map((benefit, index) => <li key={index}>{benefit}</li>)
                ) : (
                  <li>Unverified</li>
                )}
              </ul>
            )}
          </div>
        )}

        {/* ID Tab */}
        {activeTab === "ID" && (
          <div className="id-container">
            {status === "Unverified" ? (
              <p>You need to send an application to become verified to see your ID.</p>
            ) : (
              <div>
                {user.idPic ? (
                  <img src={user.idPic} alt="ID" className="id-pic" />
                ) : (
                  <p>Unverified</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};  

export default ProfilePage;
