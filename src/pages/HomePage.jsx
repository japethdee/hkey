import "../styles/home-page.css";
import Navbar from "../components/Navbar";
import MainContent from "../components/MainContent";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
      const params = new URLSearchParams(location.search);
      const section = params.get("section");

      if (section) {
          scrollToSection(section);
      }
  }, [location]);

  const scrollToSection = (id) => {
      const element = document.getElementById(id);
      if (element) {
          element.scrollIntoView({ behavior: "smooth" });
      }
  };
  return (
    <div className="home-page-container">
      <Navbar type="logged" />
      <MainContent/>
    </div>
  );
};

export default HomePage;