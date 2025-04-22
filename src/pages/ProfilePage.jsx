import { useState } from "react";
import Navbar from "../components/Navbar";
import ChatHead from "../components/ChatHead";
import "../styles/profile-page.css";
import { useNavigate } from "react-router-dom";
import doc from '../assets/doc.jpg';
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [companyName, setCompanyName] = useState("Health Key Pharmacy");
  const [email, setEmail] = useState("healthkey@example.com");
  const [phone, setPhone] = useState("09123456789");
  const [address, setAddress] = useState("Davao City, PH");
  const [licenseNumber, setLicenseNumber] = useState("LIC-12345");
  const [licenseImage, setLicenseImage] = useState(null);
  const [licensePreview, setLicensePreview] = useState(null);
  const [password, setPassword] = useState("");

  const [tempCompanyName, setTempCompanyName] = useState(companyName);
  const [tempEmail,setTempEmail] = useState(email);
  const [tempPhone, setTempPhone] = useState(phone);
  const [tempAddress, setTempAddress] = useState(address);
  const [tempLicenseNumber, setTempLicenseNumber] = useState(licenseNumber);
  const [tempLicenseImage, setTempLicenseImage] = useState(licenseImage);
  const [tempLicensePreview, setTempLicensePreview] = useState(licensePreview);

  const handleEditProfile = () => {
    setTempCompanyName(companyName);
    setTempEmail(email);
    setTempPhone(phone);
    setTempAddress(address);
    setTempLicenseNumber(licenseNumber);
    setTempLicenseImage(licenseImage);
    setTempLicensePreview(licensePreview);
    setIsEditing(true);
  };  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setTempLicenseImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setTempLicensePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleSaveClick = () => {
    if (!password.trim()
    ) {
      alert("Password is required to save changes.");
      return;
    }
    setShowModal(true);
  };
  
  const confirmSaveChanges = () => {
    setCompanyName(tempCompanyName);
    setEmail(tempEmail);
    setPhone(tempPhone);
    setAddress(tempAddress);
    setLicenseNumber(tempLicenseNumber);
    setLicenseImage(tempLicenseImage);
    setLicensePreview(tempLicensePreview);
    setPassword("");
    setIsEditing(false);
    setShowModal(false);
  };
  
  const cancelEdit = () => {
    setIsEditing(false);
    setShowModal(false);
    setPassword("");
    
    setTempCompanyName(companyName);
    setTempPhone(phone);
    setTempAddress(address);
    setTempLicenseNumber(licenseNumber);
    setTempLicenseImage(licenseImage);
    setTempLicensePreview(licensePreview);
  };

  const pageVariants = {
      initial: { opacity: 0, y: 0 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      exit: { opacity: 0, y: 0, transition: { duration: 0.5 } }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="profile-container">
      <Navbar type="logged" />
      <motion.div  initial="initial" animate="animate" exit="exit" variants={pageVariants} className="profile-wrapper">
        
        {/* LEFT SIDE */}
        <div className="profile-left">
          <div className={`license-image-box ${isEditing ? "editing" : "view-mode"}`}>
            <img
              src={
                isEditing
                  ? tempLicensePreview || doc
                  : licensePreview || doc
              }
              alt="License"
              className="license-preview"
            />
          </div>
          {isEditing ? (
            <>
              <input type="file" accept="image/*" onChange={handleFileChange} />
              <input
                type="text"
                value={tempLicenseNumber}
                onChange={(e) => setTempLicenseNumber(e.target.value)}
                placeholder="License Number"
              />
            </>
          ) : (
            <span className="license-number">License Number: <p>{licenseNumber}</p></span>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="profile-right">
        <h1 className="profile-title">My Profile</h1>
          <div className="form-group">
            <label>Company Name</label>
            <input
              type="text"
              value={isEditing ? tempCompanyName : companyName}
              onChange={(e) => setTempCompanyName(e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email" 
              value={isEditing ? tempEmail : email}
              onChange={(e) => setTempEmail(e.target.value)}
              disabled={!isEditing} />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              value={isEditing ? tempPhone : phone}
              onChange={(e) => setTempPhone(e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label>Business Address</label>
            <input
              type="text"
              value={isEditing ? tempAddress : address}
              onChange={(e) => setTempAddress(e.target.value)}
              disabled={!isEditing}
            />
          </div>

          {isEditing && (
            <div className="form-group password-group">
            <label>Password (required)</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye color="black" size={20} /> : <EyeOff color="black" size={20} />}
              </span>
            </div>
          </div>          
          )}

          <div className="button-group">
            {isEditing ? (
              <>
                <button className="btn save" onClick={handleSaveClick}>
                  Save Changes
                </button>
                <button className="btn cancel" onClick={cancelEdit}>
                  Cancel
                </button>
              </>
            ) : (
              <>
              <button className="btn edit" onClick={handleEditProfile}>
                Edit Profile
              </button>
                <button className="btn logout" onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      <ChatHead/>
      </motion.div>

      {/* MODAL */}
      {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="modal-close" onClick = {() => setShowModal(false)}>
                ×
              </button>
              <p>
                The management will need to verify all the changes before proceeding.
                You will be notified once verified. Thank you for your patience.
              </p>
              <div className="modal-buttons">
                <button onClick={confirmSaveChanges} className="btn save">
                  Confirm
                </button>
                <button onClick={cancelEdit} className="btn cancel">
                  Cancel Edit
                </button>
              </div>
            </div>
          </div>
      )}
    </div>
  );
};

export default ProfilePage;