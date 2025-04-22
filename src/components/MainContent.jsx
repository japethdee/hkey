import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import ChatHead from "../components/ChatHead";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "../styles/main-content.css";
import antibiotics from '../assets/antibiotics.png'
import next from '../assets/next.png'
import prev from '../assets/prev.png'
import mission from '../assets/mission.png'
import vision from '../assets/vision.png'
import dist from '../assets/dist.png'
import devices from '../assets/devices.png'
import doc from '../assets/doc.jpg'
import fluids from '../assets/fluids.png'
import owner from '../assets/owner.png'
import vials from '../assets/vials.png'
import ret from '../assets/ret.png'
import syr from '../assets/syr.png'
import ws from '../assets/ws.png'
import { motion } from "framer-motion";

const MainContent = () => {
  const pageVariants = {
        initial: { opacity: 0, y: 0 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, y: 0, transition: { duration: 0.5 } }
  };

  const [documents, setDocuments] = useState([
    { id: 1, src: doc },
    { id: 2, src: doc },
    { id: 3, src: doc },
    { id: 4, src: doc },
    { id: 5, src: doc },
    { id: 6, src: doc },
    { id: 7, src: doc },
    { id: 8, src: doc },
  ]);

  // ✅ Added useRef to store Swiper instance for proper button functionality
  const swiperRef = useRef(null);

  const slidePrev = () => {
    if (swiperRef.current) {
      if (swiperRef.current.activeIndex === 0) {
        swiperRef.current.slideToLoop(documents.length - 1, 500); // ✅ Jump to last document
      } else {
        swiperRef.current.slidePrev();
      }
    }
  };
  
  const slideNext = () => {
    if (swiperRef.current) {
      if (swiperRef.current.activeIndex === documents.length - 1) {
        swiperRef.current.slideToLoop(0, 500); // ✅ Jump to first document
      } else {
        swiperRef.current.slideNext();
      }
    }
  };

  return (
    <motion.div  initial="initial" animate="animate" exit="exit" variants={pageVariants}  className="main-content-container">
        <section id="home" className="home-section">
            <h1 className="tagline"><b>Your Key to Good Health</b></h1>
            {/* New section below the tagline */}
            <div className="icons-section">
                <div className="icons">
                    <a href="https://www.medilexonline.com/medical-supply-distribution/" target="_blank" rel="noopener noreferrer" className="icon">
                        <img src={dist} alt="Distributor Icon" />
                        <span>Distributor</span>
                    </a>

                    <a href="https://www.pharmaceutical-technology.com/buyers-guide/leading-pharmaceutical-wholesalers/#:~:text=Pharmaceutical%20wholesalers%20act%20as%20intermediaries,the%20influx%20of%20counterfeited%20drugs." target="_blank" rel="noopener noreferrer" className="icon">
                        <img src={ws} alt="Wholesaler Icon" />
                        <span>Wholesaler</span>
                    </a>

                    <a href="https://gradireland.com/careers-advice/retail/retail-pharmacy#:~:text=Retail%20pharmacists%20(often%20known%20as,cosmetics%2C%20photographic%20and%20veterinary%20products." target="_blank" rel="noopener noreferrer" className="icon">
                        <img src={ret} alt="Retailer Icon" />
                        <span>Retailer</span>
                    </a>
                </div>
            </div>
        </section>

        <section id="about" className="history-section">
            <div className="owner">
                {/* Left Side - Company History */}
                <div className="history">
                    <h2>Why We Started</h2>
                    <p>
                        <strong>Health Key Pharmaceutical Product Distribution </strong>was founded by <strong>Ms. Lordieza D. Aguelo </strong> 
                        with a mission to provide quality and affordable medical products. 
                        With extensive experience in the pharmaceutical industry, she has led the company to 
                        become a trusted name in healthcare distribution.
                    </p>
                </div>

                {/* Right Side - Owner Image */}
                <div className="owner-image">
                    <img src={owner} alt="Ms. Lordieza D. Aguelo - CEO" />
                    <span className="span1">MS. LORDIEZA D. AGUELO, RPH</span><span className="span2">Company Owner</span>
                </div>
            </div>
        </section>

        <section className="about-section">
            <div className="about-us">
                <p><strong>Health Key Pharmaceutical Product Distribution</strong>, established on <strong><i> May 27, 2020</i></strong>, is a licensed <i>distributor</i>, <i>wholesaler</i>, and <i>retailer</i> focused on delivering both branded and generic medications, alongside essential medical devices. Under the leadership of Pharmacist <strong> Ms. Lordieza D. Aguelo</strong>, the organization collaborates with local FDA-licensed drug establishments and hospitals throughout the Davao Region.</p>
                <div className="mission-section">
                    {/* Left Side - Mission Image */}
                    <div className="mission-image">
                        <img src={mission} alt="HKPPD Mission" />
                    </div>
                    <div className="mission">
                        <h2>The Mission</h2>
                        <p>
                            <strong>Health Key Pharmaceutical Product</strong> aims to distribute finished products for other local distributors nationwide. It is their mission to provide cheaper generic medical products but with high-quality and safe drugs in line with our country’s health goal.
                        </p>
                    </div>
                </div>
                <div className="vision-section">
                <div className="vision">
                    <h2>Our Vision</h2>
                    <p>Our goal is to be the leading, reliable and trusted distributor of pharmaceutical products in the Philippines. Together with our customers and partners/suppliers, we will deliver innovative products and services that drive quality and efficiency in pharmaceutical care.</p>
                </div>
                    {/* Right Side - Vision Image */}
                    <div className="vision-image">
                        <img src={vision} alt="HKPPD Vision" />
                    </div>
                </div>

                <div className="certs1">
                    <div className="certs">
                        <h1><center><b>LEGAL DOCUMENTS</b></center></h1>
                    </div>

                    <section className="legal-docs">
                        <div className="custom-prev" onClick={slidePrev}>
                            <img src={prev} alt="previous button" />
                        </div>
                        <Swiper
                            effect={"coverflow"}
                            grabCursor={true}
                            centeredSlides={true}
                            slidesPerView={2}
                            spaceBetween={-245}
                            loop={true}
                            navigation={false}
                            onSwiper={(swiper) => (swiperRef.current = swiper)}
                            coverflowEffect={{
                                rotate: 0,
                                stretch: 0,
                                depth: 120,
                                modifier: 2.5,
                                slideShadows: false,
                            }}
                            modules={[EffectCoverflow, Navigation]}
                            className="swiper-container"
                        >
                        {documents.map((doc) => (
                            <SwiperSlide key={doc.id} className="doc-slide-wrapper">
                                <div className="doc-container">
                                    <img src={doc.src} alt={`Document ${doc.id}`} className="doc-slide" />
                                </div>
                            </SwiperSlide>
                        ))}
                        </Swiper>
                        <div className="custom-next" onClick={slideNext}>
                            <img src={next} alt="previous button" />
                        </div>
                    </section>
                </div>

            </div>
        </section>

        <section id="products" className="products-section">
            <div className="backdrop">
                <div className="head"><h1><center><b>OUR PRODUCTS</b></center></h1></div>
                <div className="product-icons-section">
                    <a href="https://www.healthline.com/health/capsule-vs-tablet" target="_blank" rel="noopener noreferrer" className="product-icon bottom-row">
                        <img src={antibiotics} alt="Product 2" /><span>CAPSULES & TABLETS</span>
                    </a>

                    <a href="https://medixcollege.ca/Home/NewsArticle/ampoules-vs-vials-explained-for-pharmacy-assistant-school-students/#:~:text=Whilst%20they%20may%20seem%20identical,can%20be%20stored%20and%20reused." target="_blank" rel="noopener noreferrer" className="product-icon top-row">
                        <img src={vials} alt="Product 1" /><span>VIALS & AMPOULES</span>
                    </a>

                    <a href="https://www.who.int/health-topics/medical-devices#tab=tab_1" target="_blank" rel="noopener noreferrer" className="product-icon bottom-row">
                        <img src={devices} alt="Product 3" /><span>MEDICAL DEVICES</span>
                    </a>

                    <a href="https://my.clevelandclinic.org/health/treatments/21635-iv-fluids" target="_blank" rel="noopener noreferrer" className="product-icon top-row">
                        <img src={fluids} alt="Product 4" /><span>IV FLUIDS</span>
                    </a>

                    <a href="https://www.pharmaguideline.com/2018/02/differences-between-syrups-and-suspension.html" target="_blank" rel="noopener noreferrer" className="product-icon bottom-row">
                        <img src={syr} alt="Product 5" /><span>SYRUPS AND SUSPENSIONS</span>
                    </a>
                </div>
            </div>
        </section>

        <section id="location" className="location-section">
            <div className="head1"><h1><center><b>OUR LOCATION</b></center></h1></div>

            {/* Embedded Google Map */}
            <div className="map-container">
                <iframe
                    title="Google Map"
                    className="google-map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d251.26058656376236!2d125.61888346333917!3d7.097768505811405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f96c51f0cadfd1%3A0xd8ed98df58be40a8!2sSPMC%20Building%2C%20J.P.%20Laurel%20Ave%2C%20Bajada%2C%20Davao%20City%2C%208000%20Davao%20del%20Sur!5e0!3m2!1sen!2sph!4v1740073888903!5m2!1sen!2sph"
                    allowFullScreen
                    loading="lazy"
                ></iframe>
            </div>
        </section>

        <div className="end-note">
            <h1><b>TO GOD BE THE GLORY</b></h1>
        </div>

        <ChatHead/>

        <footer>
            Copyright © 2025 Powered by Health Key Pharmaceutical Product Distribution
        </footer>
    </motion.div>
  );
};

export default MainContent;