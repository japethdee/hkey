import { useState, useEffect } from "react";
import "../styles/landing-page.css";
import Navbar from "../components/Navbar";
import MainContent from "../components/MainContent";
import { useLocation, useNavigate } from 'react-router-dom';
import splash from '../assets/welcome.png';

const LandingPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ Initialize navigate

  // If state exists and openLogin is true, open the panel
  const [isLoginPanelOpen, setIsLoginPanelOpen] = useState(false);

  // Automatically open login panel only when redirected from CreateAccount.jsx
  useEffect(() => {
    if (location.state?.openLogin) {
      setIsLoginPanelOpen(true);

      // ✅ Use a function inside setTimeout to avoid navigate in deps
      setTimeout(() => {
          navigate(".", { replace: true });
      }, 0);
    }
  }, [location, navigate]);

  // ✅ TOGGLE LOGIN PANEL VISIBILITY
  const toggleLoginPanel = () => setIsLoginPanelOpen(!isLoginPanelOpen);

  // ✅ CLOSE PANEL WHEN CLICKING OUTSIDE
  const closeLoginPanel = (event) => {
    if (isLoginPanelOpen && !event.target.closest(".login-panel")) {
      setIsLoginPanelOpen(false);
    }
  };

  const [showSplash, setShowSplash] = useState(false);
  const handleLogin = () => {
    setShowSplash(true);
    setTimeout(() => {
      navigate("/home");
    }, 2500);
  };

  return (
    <div className="container">
      {/* LOGIN PANEL */}
      <div className={`login-panel ${isLoginPanelOpen ? "active" : ""}`}>
        <div className="closer">
          <button className="close-button" onClick={toggleLoginPanel}>×</button>
        </div>
        <div className="login-box">
          <div className="logoBox"></div>
          <h2 className="login-text">LOGIN</h2>
          <input type="text" placeholder="Username" />
          <a className="specialtext1">Forgot Password?</a>
          <input type="password" placeholder="Password" />
          <button onClick={handleLogin}>Login</button>
          <div className="create-account-box"
            ><h2 className="specialtext2">
              No account yet? <a onClick={() => window.location.href = "/create-account"}>Join us!</a>
            </h2>

          </div>
        </div>
      </div>

      {/* ✅ OVERLAY REMAINS TO CLOSE LOGIN PANEL */}
      <div className={`overlay ${isLoginPanelOpen ? "active" : ""}`} onClick={closeLoginPanel}></div>

      {/* Main Scrollable Content */}
      <div className="main-panel">
        <Navbar type="landing" toggleLoginPanel={() => setIsLoginPanelOpen(true)} />
        <MainContent />
      </div>

      {showSplash && (
        <div className="splash-overlay">
          <img src={splash} alt="Splash Screen" className="splash-image" />
        </div>
      )}

    </div>
  );
};

export default LandingPage;