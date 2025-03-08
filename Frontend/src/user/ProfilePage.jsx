import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";
import { FaCamera, FaCheckCircle, FaClock, FaTimes } from "react-icons/fa";
import avatar from "../assets/avatar.jpg";
import idPic from "../assets/idpic.png";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("Details");
  const [user, setUser] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const navigate = useNavigate();

  const loggedInUserId = localStorage.getItem("UserId");

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
          body: JSON.stringify({ userId: loggedInUserId }),
        });

        const data = await response.json();

        if (response.ok) {
          setUser(data);
        } else {
          console.error("Error fetching user data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserDetails();
  }, [loggedInUserId]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    document.getElementById("profilePicInput").click();
  };

  const handleUploadSubmit = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("profilePic", selectedFile);
    formData.append("userId", loggedInUserId);

    try {
      const response = await fetch("http://localhost:8081/uploadProfilePic", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const updatedUser = { ...user, profilePic: URL.createObjectURL(selectedFile) };
        setUser(updatedUser);
        setShowUploadModal(false);
        setSelectedFile(null);
        setPreviewUrl(null);
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  const handleSendApplication = () => {
    navigate("/form", { state: { userId: loggedInUserId } });
  };

  if (!user) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your profile...</p>
      </div>
    );
  }

  const status = user.status || "Unverified";
  const statusIcon = {
    Verified: <FaCheckCircle className="status-icon verified" />,
    Pending: <FaClock className="status-icon pending" />,
    Unverified: <FaTimes className="status-icon unverified" />,
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-picture-container">
          <img src={user.profilePic || avatar} alt="Profile" className="profile-pic" />
          <button className="upload-button" onClick={() => setShowUploadModal(true)}>
            <FaCamera />
          </button>
        </div>
        <div className="profile-info">
          <h1>{user.name || "Unverified"}</h1>
          <p className="email">{user.email || "Unverified"}</p>
          <div className="status-badge">
            {statusIcon[status]}
            <span>{status}</span>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="tab-navigation">
          {["Details", "Benefits", "ID"].map((tab) => (
            <button
              key={tab}
              className={`tab-button ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="tab-content">
          {activeTab === "Details" && (
            <div className="details-tab">
              {status === "Unverified" ? (
                <div className="verification-prompt">
                  <h3>Verify Your Account</h3>
                  <p>Complete your verification to access all features and benefits.</p>
                  <button className="verify-button" onClick={handleSendApplication}>
                    Start Verification
                  </button>
                </div>
              ) : (
                <div className="details-list">
                  <h3>Submitted Documents</h3>
                  {Array.isArray(user.documents) && user.documents.length > 0 ? (
                    <ul>
                      {user.documents.map((doc, index) => (
                        <li key={index} className="document-item">
                          <FaCheckCircle className="document-icon" />
                          {doc}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="no-documents">No documents submitted yet</p>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === "Benefits" && (
            <div className="benefits-tab">
              {status === "Unverified" ? (
                <div className="verification-prompt">
                  <h3>Benefits Locked</h3>
                  <p>Verify your account to view available benefits.</p>
                  <button className="verify-button" onClick={handleSendApplication}>
                    Start Verification
                  </button>
                </div>
              ) : (
                <div className="benefits-list">
                  <h3>Your Benefits</h3>
                  {user.benefits && user.benefits.length > 0 ? (
                    <ul>
                      {user.benefits.map((benefit, index) => (
                        <li key={index} className="benefit-item">
                          <FaCheckCircle className="benefit-icon" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="no-benefits">No benefits available</p>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === "ID" && (
            <div className="id-tab">
              {status === "Unverified" ? (
                <div className="verification-prompt">
                  <h3>ID Not Available</h3>
                  <p>Complete verification to get your digital ID.</p>
                  <button className="verify-button" onClick={handleSendApplication}>
                    Start Verification
                  </button>
                </div>
              ) : (
                <div className="id-card">
                  {user.idPic ? (
                    <img src={user.idPic} alt="ID" className="id-image" />
                  ) : (
                    <div className="no-id">
                      <p>ID is being processed</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showUploadModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Update Profile Picture</h3>
            <div className="preview-container">
              <img
                src={previewUrl || user.profilePic || avatar}
                alt="Preview"
                className="preview-image"
              />
            </div>
            <input
              type="file"
              id="profilePicInput"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <div className="modal-buttons">
              <button className="upload-photo-btn" onClick={handleUploadClick}>
                Choose Photo
              </button>
              <button
                className="save-photo-btn"
                onClick={handleUploadSubmit}
                disabled={!selectedFile}
              >
                Save Photo
              </button>
              <button
                className="cancel-btn"
                onClick={() => {
                  setShowUploadModal(false);
                  setSelectedFile(null);
                  setPreviewUrl(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
