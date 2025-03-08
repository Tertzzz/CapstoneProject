import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser, faSignOutAlt, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useNotifications } from "../contexts/NotificationContext";
import "./UserNavbar.css";

const UserNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification
  } = useNotifications();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/", { replace: true });
    window.location.reload();
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <nav className="user-navbar">
      <div className="user-navbar-container">
        <Link to="/" className="logo">
          <span className="logo-text">Solo Parent</span>
          <span className="logo-subtext">Welfare System</span>
        </Link>

        <div className="nav-right" ref={menuRef}>
          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>

          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            <div className="notification-wrapper" ref={notificationRef}>
              <button 
                className={`notif-bell ${unreadCount > 0 ? 'has-notifications' : ''}`}
                onClick={() => setShowNotifications(!showNotifications)}
                aria-label={`Notifications (${unreadCount} unread)`}
              >
                <FontAwesomeIcon icon={faBell} />
                {unreadCount > 0 && (
                  <span className="notification-badge" data-count={unreadCount > 9 ? '9+' : unreadCount} />
                )}
              </button>
              
              {showNotifications && (
                <div className="notifications-dropdown">
                  <div className="notifications-header">
                    <h3>Notifications</h3>
                    {unreadCount > 0 && (
                      <button 
                        className="mark-all-read"
                        onClick={markAllAsRead}
                        aria-label="Mark all notifications as read"
                      >
                        <FontAwesomeIcon icon={faCheck} className="mark-read-icon" />
                        <span>Mark all as read</span>
                      </button>
                    )}
                  </div>
                  {notifications.length > 0 ? (
                    <div className="notifications-list">
                      {notifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <p>{notification.message}</p>
                          <div className="notification-meta">
                            <span className="notification-time">
                              {formatTimestamp(notification.timestamp)}
                            </span>
                            <button
                              className="remove-notification"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeNotification(notification.id);
                              }}
                              aria-label="Remove notification"
                            >
                              &times;
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="no-notifications">
                      <p>No notifications</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <Link to="/track" className="nav-link">
              <FontAwesomeIcon icon={faUser} className="nav-icon" />
              <span>Track Application</span>
            </Link>

            <button 
              className="logout-button" 
              onClick={() => setShowLogoutPopup(true)}
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {showLogoutPopup && (
        <div className="logout-popup">
          <div className="popup-content" onClick={e => e.stopPropagation()}>
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to log out?</p>
            <div className="popup-buttons">
              <button className="confirm" onClick={handleLogout}>
                Yes, Log Out
              </button>
              <button className="cancel" onClick={() => setShowLogoutPopup(false)}>
                Cancel
              </button>
            </div>
          </div>
          <div className="popup-overlay" onClick={() => setShowLogoutPopup(false)} />
        </div>
      )}
    </nav>
  );
};

export default UserNavbar;
