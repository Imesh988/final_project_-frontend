import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes, FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";
import "../style/NavigationCss.css"

const Navbar = () => {
    
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      closeMenu();
    }
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                className="h-8 w-auto"
                src="/logo.png"
                alt="Your Logo"
              />
              <span className="ml-2 text-xl font-bold text-gray-900">YourBrand</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-8">
              <NavLink to="/" text="Home" closeMenu={closeMenu} />
              <NavLink to="/products" text="Products" closeMenu={closeMenu} />
              <NavLink to="/about" text="About" closeMenu={closeMenu} />
              <NavLink to="/contact" text="Contact" closeMenu={closeMenu} />
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                placeholder="Search..."
                className="px-3 py-1 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-3 py-1 rounded-r-md hover:bg-blue-600 transition"
              >
                <FaSearch />
              </button>
            </form>

            {/* Icons */}
            <div className="flex items-center space-x-4 ml-4">
              <Link to="/account" className="text-gray-700 hover:text-blue-600">
                <FaUser className="h-5 w-5" />
              </Link>
              <Link to="/cart" className="text-gray-700 hover:text-blue-600 relative">
                <FaShoppingCart className="h-5 w-5" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink to="/" text="Home" closeMenu={closeMenu} />
            <MobileNavLink to="/products" text="Products" closeMenu={closeMenu} />
            <MobileNavLink to="/about" text="About" closeMenu={closeMenu} />
            <MobileNavLink to="/contact" text="Contact" closeMenu={closeMenu} />
            
            <div className="px-3 pt-2">
              <form onSubmit={handleSearch} className="flex">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-3 py-2 rounded-r-md hover:bg-blue-600 transition"
                >
                  <FaSearch />
                </button>
              </form>
            </div>

            <div className="flex px-3 pt-2 space-x-4">
              <Link 
                to="/account" 
                onClick={closeMenu}
                className="text-gray-700 hover:text-blue-600 px-3 py-2"
              >
                <FaUser className="h-5 w-5 inline mr-2" />
                Account
              </Link>
              <Link 
                to="/cart" 
                onClick={closeMenu}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 relative"
              >
                <FaShoppingCart className="h-5 w-5 inline mr-2" />
                Cart
                <span className="absolute top-1 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// Reusable NavLink component for desktop
const NavLink = ({ to, text, closeMenu }) => (
  <Link
    to={to}
    onClick={closeMenu}
    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition"
    activeClassName="text-blue-600 font-semibold"
  >
    {text}
  </Link>
);

// Reusable MobileNavLink component
const MobileNavLink = ({ to, text, closeMenu }) => (
  <Link
    to={to}
    onClick={closeMenu}
    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
    activeClassName="text-blue-600 bg-blue-50"
  >
    {text}
  </Link>
);

export default Navbar;