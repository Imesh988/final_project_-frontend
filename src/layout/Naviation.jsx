import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaSearch,
  FaTools,
  FaPhoneAlt,
  FaUserCircle,
  FaCog,
  FaSignOutAlt
} from "react-icons/fa";
import { GiAutoRepair } from "react-icons/gi";
import './Navigation.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Check if user is logged in on component mount and when localStorage changes
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      const userDataString = localStorage.getItem('userData');

      setIsLoggedIn(!!token);


      if (userDataString) {
        try {
          setUserData(JSON.parse(userDataString));
        } catch (error) {
          console.error('Error parsing user data:', error);
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
    };

    const handleLoginStatusChange = () => {
      checkLoginStatus();
    };

    checkLoginStatus();

    window.addEventListener('loginStatusChange', handleLoginStatusChange);

    return () => {
      window.removeEventListener('loginStatusChange', handleLoginStatusChange);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const signOut = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('userData');

      setIsLoggedIn(false);
      setUserData(null);
      setShowDropdown(false);

      window.dispatchEvent(new CustomEvent('loginStatusChange'));

      alert('Logout successful');

      navigate('/cuslogin');

    } catch (error) {
      console.error('Logout error:', error);
      alert('Error during logout. Please try again.');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg service-navbar">
      <div className="container-fluid">
        <Link className="navbar-brand logo-container" to="/">
          <GiAutoRepair className="logo-icon" />
          <span className="logo-text">SD AutoCare </span>
        </Link>

        <div className="emergency-contact d-none d-lg-flex">
          <FaPhoneAlt className="emergency-icon" />
          <div>
            <span className="emergency-label">Emergency Service</span>
            <span className="emergency-number">076 5616 812</span>
          </div>
        </div>

        <button
          className="navbar-toggler animated-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          {isOpen ? <FaTimes className="icon-close" /> : <FaBars className="icon-open" />}
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 me-4">
            {/* <li className="nav-item">
              <Link className="nav-link service-link" to="/" onClick={() => setIsOpen(false)}>
                <span className="link-number">01.</span> Home
              </Link>
            </li>
              <li className="nav-item">
                <Link className="nav-link service-link" to="/services" onClick={() => setIsOpen(false)}>
                  <span className="link-number">02.</span> Services
                </Link>
              </li> */}
            <li className="nav-item">
              <Link className="nav-link service-link d-flex align-items-center" to="/" onClick={() => setIsOpen(false)}>
                <i className="bi bi-speedometer2 me-2"></i> {/* Dashboard icon */}
                <span className="link-number">03.</span> Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link service-link d-flex align-items-center" to="/cuslogin" onClick={() => setIsOpen(false)}>
                <i className="bi bi-box-arrow-in-right me-2"></i> {/* Login icon */}
                <span className="link-number">04.</span> Login
              </Link>
            </li>

          </ul>

          <div className="d-flex align-items-center nav-actions">
            {/* <form className="d-flex me-3 search-box" role="search" onSubmit={handleSearch}>
              <input
                className="form-control search-input"
                type="search"
                placeholder="Search services..."
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn search-btn" type="submit">
                <FaSearch className="search-icon" />
              </button>
            </form> */}

            <div className="user-dropdown-container" ref={dropdownRef}>
              <button
                className="user-bubble"
                onClick={() => setShowDropdown(!showDropdown)}
                aria-expanded={showDropdown}
              >
                <FaUser />
              </button>

              {showDropdown && (
                <div className="user-dropdown-menu">
                  {isLoggedIn ? (
                    <>
                      <div className="dropdown-header">
                        <div className="user-welcome">Welcome back!</div>
                        {userData && (
                          <div className="user-name">{userData.username}</div>
                        )}
                      </div>
                      <div className="dropdown-divider"></div>
                      <Link
                        to="/customer-details"
                        className="dropdown-item"
                        onClick={() => setShowDropdown(false)}
                      >
                        <FaUserCircle className="dropdown-icon" />
                        My Account
                      </Link>
                      <Link
                        to="/settings"
                        className="dropdown-item"
                        onClick={() => setShowDropdown(false)}
                      >
                        <FaCog className="dropdown-icon" />
                        Settings
                      </Link>
                      <div className="dropdown-divider"></div>
                      <button
                        className="dropdown-item sign-out-btn"
                        onClick={signOut}
                      >
                        <FaSignOutAlt className="dropdown-icon" />
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/cuslogin"
                        className="dropdown-item"
                        onClick={() => setShowDropdown(false)}
                      >
                        <FaUserCircle className="dropdown-icon" />
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="dropdown-item"
                        onClick={() => setShowDropdown(false)}
                      >
                        <FaCog className="dropdown-icon" />
                        Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Service Status Bar */}
      <div className="service-status-bar">
        <div className="container-fluid">
          <div className="status-content">
            <FaTools className="status-icon" />
            <span>Open today: 8:00 AM - 6:00 PM</span>
            <span className="status-divider">|</span>
            <span>24/7 Emergency Service Available</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;