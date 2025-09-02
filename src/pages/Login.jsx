import { useState } from "react";
import axios from "../api/axios";
import { useNavigate , Link ,  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { GiAutoRepair } from "react-icons/gi";
import styles from '../style/Login.module.css'; // This import is correct!

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("/employee/login", {
        username,
        password,
      });

      if (response.data.msg === "successful") {
        navigate("/employee");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response) {
        if (error.response.status === 400) {
          setError("Invalid username or password");
        } else if (error.response.status === 401) {
          setError("Unauthorized - Please check your credentials");
        } else if (error.response.status === 500) {
          setError("Server error - Please try again later");
        } else {
          setError("Login failed - Please try again");
        }
      } else if (error.request) {
        setError("No response from server - Check your connection");
      } else {
        setError("Login failed - Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.loginContainer} d-flex align-items-center justify-content-center vh-100`}>
      <div className={`${styles.loginCard} shadow-lg p-4`} style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-body ">
           <Link className="navbar-brand logo-container text-center mt-2" to="/">
          <GiAutoRepair className="logo-icon" />
          <span className="logo-text text-center">SD AutoCare </span>
        </Link>


          {error && (
            <div className={`${styles.alertDanger} text-center`} role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-3 mt-4">
              <label htmlFor="username" className={`${styles.formLabel} fw-semibold`}>
                Username
              </label>
              <input
                id="username"
                type="text"
                className={`${styles.formControl} form-control`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className={`${styles.formLabel} fw-semibold`}>
                Password
              </label>
              <input
                id="password"
                type="password"
                className={`${styles.formControl} form-control`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="d-grid">
              <button
                type="submit"
                className={`${styles.loginButton} btn`}
                disabled={loading}
              >
                {loading ? (
                  <span>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Logging in...
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>

          <div className={styles.signupLink + " text-center mt-3" }>
            Don't have an account? <a href="#">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;