import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo3.png';
import PropTypes from 'prop-types';
import "../styles/navbar.css";
import { Bell, PackageSearch, MessageSquareQuote, ListOrdered, House, User } from "lucide-react";

const Navbar = ({ type, toggleLoginPanel }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showProductsMenu, setShowProductsMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  Navbar.propTypes = {
    type: PropTypes.string.isRequired,               // if type is required
    toggleLoginPanel: PropTypes.func.isRequired,     // if toggleLoginPanel is required
  };

    // Handle clicking outside to close dropdown
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    const toggleDropdown = () => setShowDropdown((prev) => !prev);

    const goToHomeSection = (sectionId) => {
        navigate(`/home?section=${sectionId}`);
    };

    const isActive = (path) => location.pathname === path;

  if (type === "landing") {
    return (
        <div className="navbar-container">
            <div className="top-line"></div>
            <nav className="navbar">
                <div className="logo" style={{ backgroundImage: `url(${logo})` }}></div>
                <div className="nav-buttons">
                    <button onClick={() => scrollToSection("home")}>HOME</button>
                    <button onClick={() => scrollToSection("about")}>ABOUT US</button>
                    <button onClick={() => scrollToSection("products")}>OUR PRODUCTS</button>
                    <button onClick={() => scrollToSection("location")}>OUR LOCATION</button>
                </div>
                <button className="login-button" onClick={toggleLoginPanel}>LOGIN</button>
            </nav>
        </div>
    );
  }

  if (type === "create") {
    return (
        <div className="navbar-container">
            <div className="top-line"></div>
            <nav className="navbar">
                <div className="logo" style={{ backgroundImage: `url(${logo})` }}></div>
            </nav>
        </div>
    );
  }

  if (type === "logged") {
    return (
        <div className="navbar-container">
            <div className="top-line"></div>
            <nav className="navbar">
                <div className="logo" style={{ backgroundImage: `url(${logo})` }}></div>
                <div className="nav-buttons2">
                    <div className="nav-item" onMouseEnter={() => setShowProductsMenu(true)} onMouseLeave={() => setShowProductsMenu(false)}>
                        <button className={`nav-button ${isActive("/home") ? "active-tab" : ""}`} onClick={() => goToHomeSection("home")}>
                            <House color="black" size={24} />
                            <span className="nav-caption">Home</span>
                        </button>
                        {showProductsMenu && (
                            <div className="dropdown-menu">
                                <button onClick={() => goToHomeSection("home")}>Home</button>
                                <button onClick={() => goToHomeSection("about")}>About Us</button>
                                <button onClick={() => goToHomeSection("products")}>Our Products</button>
                                <button onClick={() => goToHomeSection("location")}>Our Location</button>
                            </div>
                        )}
                    </div>
                    <div className="nav-divider"></div>
                    <button className={`nav-button ${isActive("/quotations") ? "active-tab" : ""}`} onClick={() => navigate('/quotations')}>
                        <MessageSquareQuote color="black" size={24} />
                        <span className="nav-caption">Quotations</span>
                    </button>
                    <button className={`nav-button ${isActive("/orders") ? "active-tab" : ""}`} onClick={() => navigate('/orders')}>
                        <ListOrdered color="black" size={24} />
                        <span className="nav-caption">Orders</span>
                    </button>
                    <button className={`nav-button ${isActive("/products") ? "active-tab" : ""}`} onClick={() => navigate('/products')}>
                        <PackageSearch color="black" size={24} />
                        <span className="nav-caption">Products</span>
                    </button>
                    <div className="nav-item" ref={dropdownRef}>
                        <button className="nav-button" onClick={toggleDropdown}>
                            <Bell color="black" size={24} />
                            <span className="nav-caption">Notifications</span>
                        </button>

                        {showDropdown && (
                            <div className="notification-dropdown">
                                <ul>
                                    <li>Order #123 has been shipped</li>
                                    <li>New message from Admin</li>
                                    <li>System maintenance on March 10</li>
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="nav-item" onMouseEnter={() => setShowAccountMenu(true)} onMouseLeave={() => setShowAccountMenu(false)}>
                        <button className={`nav-button ${isActive("/profile") ? "active-tab" : ""}`} onClick={() => navigate('/profile')}>
                            <User color="black" size={24} />
                            <span className="nav-caption">Profile</span>
                        </button>
                        {showAccountMenu && (
                            <div className="dropdown-menu2">
                                <button onClick={() => navigate('/profile')}>Profile</button>
                                <button onClick={() => navigate('/settings')}>Settings</button>
                                <button className = "logout" onClick={() => navigate('/')}>Logout</button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
  }

  return null;
};

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export default Navbar;