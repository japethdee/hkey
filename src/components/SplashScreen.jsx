import PropTypes from "prop-types";
import "../styles/splash-screen.css";

const SplashScreen = ({ image }) => {
    return (
      <div className="splash-overlay1">
        <div className="splash-banner">
          <img src={image} alt="Loading..." className="splash-image1" />
        </div>
      </div>
    );
  };

SplashScreen.propTypes = {
  image: PropTypes.string.isRequired,
};

export default SplashScreen;