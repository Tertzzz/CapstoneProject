import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import styles from "./Login.module.css";
import { FiMail, FiLock, FiAlertCircle } from "react-icons/fi";

const Login = ({ isSuperAdminRoute }) => {
  const navigate = useNavigate(); // For redirection
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [superadmins, setSuperadmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // For loading state

  // Fetch the data when the component mounts
  useEffect(() => {
    Promise.all([
      fetch("http://localhost:8081/users"),
      fetch("http://localhost:8081/admin"),
      fetch("http://localhost:8081/superadmin"),
    ])
      .then(([usersRes, adminsRes, superadminsRes]) =>
        Promise.all([usersRes.json(), adminsRes.json(), superadminsRes.json()])
      )
      .then(([usersData, adminsData, superadminsData]) => {
        setUsers(usersData);
        setAdmins(adminsData);
        setSuperadmins(superadminsData);
        setIsLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Set loading to false even if there's an error
      });
  }, []);

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      // Determine which login endpoint to use based on the route
      const loginEndpoint = isSuperAdminRoute ? '/superadmin-login' : '/login';
      
      const response = await fetch(`http://localhost:8081${loginEndpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Store user data in localStorage
        localStorage.setItem("loggedInUser", JSON.stringify(data.user));
        localStorage.setItem("UserId", data.user.id);

        // Redirect based on role
        if (data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else if (data.user.role === "superadmin") {
          navigate("/superadmin-dashboard");
        } else {
          navigate("/userui");
        }
      } else {
        setError(data.error || "Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login. Please try again.");
    }
  };
  
  // Show loading message until data is fetched
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles["login-container"]}>
      <div className={styles["login-box"]}>
        <h2>{isSuperAdminRoute ? "SuperAdmin Login" : "Login"}</h2>
        
        {error && (
          <div className={styles["error-message"]}>
            <FiAlertCircle />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className={styles["input-group"]}>
            <label>
              <FiMail className={styles["input-icon"]} />
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className={styles["input-group"]}>
            <label>
              <FiLock className={styles["input-icon"]} />
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          {!isSuperAdminRoute && (
            <>
              <div className={styles["forgot-password"]}>
                <button 
                  type="button" 
                  className={styles["forgot-password-btn"]}
                  onClick={() => navigate("/forgot-password")}
                  disabled={isLoading}
                >
                  Forgot Password?
                </button>
              </div>
              <p className={styles["signup-text"]}>
                Don't have an account? <a href="/signup">Sign Up</a>
              </p>
            </>
          )}

          <button 
            type="submit" 
            className={`${styles["login-btn"]} ${isLoading ? styles["loading"] : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : (isSuperAdminRoute ? "Login as SuperAdmin" : "Login")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
