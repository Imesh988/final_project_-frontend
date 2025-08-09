import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../style/CusLogin.css';

function CusLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // useEffect(() => {
    //     // Ensure video plays on mobile devices
    //     const video = document.querySelector('.login-bg-video');
    //     if (video) {
    //         video.play().catch(error => {
    //             console.log("Video autoplay prevented:", error);
    //             // Fallback: mute and try to play again
    //             video.muted = true;
    //             video.play();
    //         });
    //     }
    // }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/customer/login', {
                username,
                password
            });

            if (response.data.msg === 'successful') {
                navigate('/customer');
            } else {
                setError('Invalid username or password');
            }
        } catch (error) {
            // ... (keep your existing error handling code)
        } finally {
            setLoading(false);
        }
    }

    return (
       <div className="login-page">
      {/* Fullscreen Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="login-bg-video"
      >
        <source src="../../public/video/6873163-uhd_2160_3840_25fps.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>

      {/* Glass Morphism Login Card */}
      <div className="login-card-container">
        <div className="login-card">
          <h2 className="login-title">Welcome Back</h2>
          
          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Signing In...
                </>
              ) : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
    )
}

export default CusLogin;