import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../layout/Naviation";
import "../style/Forget.css";

// Bootstrap icons
import "bootstrap-icons/font/bootstrap-icons.css";

function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Request reset token
  const requestReset = async () => {
    if (!username.trim()) {
      setMessage("Please enter your username");
      return;
    }
    try {
      setLoading(true);
      setMessage("");
      const res = await axios.post("/customer/forgot-password", { username });
      setToken(res.data.token);
      setMessage("Reset token generated. Enter token and new password below.");
      setStep(2);
    } catch (err) {
      setMessage(err.response?.data?.msg || "Error requesting password reset");
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const resetPassword = async () => {
    if (!token.trim() || !newPassword.trim()) {
      setMessage("Token and new password are required");
      return;
    }
    try {
      setLoading(true);
      setMessage("");
      const res = await axios.post("/customer/reset-password", {
        token,
        newPassword,
      });
      setMessage(res.data.msg || "Password reset successfully!");
      setToken("");
      setNewPassword("");
      setStep(1);
      setTimeout(() => {
        navigate("/cuslogin");
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.msg || "Error resetting password");
    } finally {
      setLoading(false);
    }
  };

return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="card shadow-sm rounded-3 mx-auto" style={{ maxWidth: '450px' }}>
          <div className="card-header bg-dark text-white text-center">
            <i className="bi bi-shield-lock-fill display-4 mb-2"></i>
            <h3 className="mb-1">Forgot Password</h3>
            <p className="mb-0">Securely reset your password below</p>
          </div>
          <div className="card-body">
            {/* Step 1: Request Reset */}
            {step === 1 && (
              <div className="mb-3">
                <label className="form-label">
                  Username
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-person-circle"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <button
                  onClick={requestReset}
                  disabled={loading}
                  className="btn btn-dark w-100 mt-3 d-flex justify-content-center align-items-center gap-2"
                >
                  {loading ? (
                    <i className="bi bi-hourglass-split animate-spin"></i>
                  ) : (
                    <>
                      <i className="bi bi-arrow-clockwise"></i> Request Reset
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Step 2: Reset Password */}
            {step === 2 && (
              <>
                <div className="mb-3">
                  <label className="form-label">
                    <i className="bi bi-key-fill me-2"></i>Reset Token
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-key-fill"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter reset token"
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    <i className="bi bi-lock-fill me-2"></i>New Password
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-lock-fill"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  onClick={resetPassword}
                  disabled={loading}
                  className="btn btn-dark w-100 d-flex justify-content-center align-items-center gap-2"
                >
                  {loading ? (
                    <i className="bi bi-hourglass-split animate-spin"></i>
                  ) : (
                    <>
                      <i className="bi bi-unlock-fill"></i> Reset Password
                    </>
                  )}
                </button>
              </>
            )}

            {message && (
              <div className="alert alert-info mt-3 text-center" role="alert">
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}



export default ForgotPassword;
