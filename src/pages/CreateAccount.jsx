import { useState } from "react";
import "../styles/create-account.css";
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { Eye, EyeOff } from "lucide-react";
import splash from '../assets/welcome.png';
import { motion } from "framer-motion";

const CreateAccount = () => {
  const pageVariants = {
      initial: { opacity: 0, y: 0 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      exit: { opacity: 0, y: 0, transition: { duration: 0.5 } }
  };
  const navigate = useNavigate();  

  const [showSplash, setShowSplash] = useState(false);
  const handleLogin = () => {
    setShowSplash(true);
    setTimeout(() => {
      navigate("/home");
    }, 2500);
  };

  const [form, setForm] = useState({
    businessName: "",
    password: "",
    confirmPassword: "",
    cellphone: "",
    address: "",
    email: "",
    licenseNumber: "",
    licenseImage: null,
    uploadLater: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : type === "checkbox" ? checked : value,
    }));
  };

  // Logic to disable fields
  const isFieldDisabled = (field) => {
    if (field === "password" || field === "confirmPassword") return !form.businessName;
    if (field === "cellphone") return !form.password || form.password !== form.confirmPassword;
    if (field === "address") return !form.cellphone;
    if (field === "email") return !form.address;
    if (field === "licenseNumber") return !form.email;
    if (field === "licenseImage" && !form.uploadLater) return !form.licenseNumber;
    return false;
  };

  // When "Login here" is clicked:
  const goToLogin = () => {
      navigate('/', { state: { openLogin: true } });
  };

  return (
    <motion.div  initial="initial" animate="animate" exit="exit" variants={pageVariants} className="create-account-container">
      <Navbar type="create" />
      {/* Create Account Form */}
      <div className="create-account-form">
        <h2>Create Your Account</h2>
        <div className="form-container">
          <div className="field-group">
            <label className="field-label">Company Name</label>
            <input
              type="text"
              name="businessName"
              placeholder="Enter Company Name"
              value={form.businessName}
              onChange={handleChange}
            />
          </div>

          <div className="password-container">
            <div className="password-field">
              <div className="field-group">
                <label className="field-label">Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter Password"
                    value={form.password}
                    onChange={handleChange}
                    disabled={isFieldDisabled("password")}
                  />
              </div>
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <Eye color="black" size={20} /> : <EyeOff color="black" size={20} />}
              </button>
            </div>

            <div className="password-field">
              <div className="field-group">
                <label className="field-label">Confirm Password</label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  disabled={isFieldDisabled("confirmPassword")}
                />
              </div>
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <Eye color="black" size={20} /> : <EyeOff color="black" size={20}/>}
                </button>
            </div>
          </div>
          <div className="field-group">
            <label className="field-label">Cellphone Number</label>
            <input
              type="tel"
              name="cellphone"
              placeholder="Enter Cellphone Number"
              value={form.cellphone}
              onChange={handleChange}
              disabled={isFieldDisabled("cellphone")}
            />
          </div>

          <div className="field-group">
            <label className="field-label">Business Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter Business Address"
              value={form.address}
              onChange={handleChange}
              disabled={isFieldDisabled("address")}
            />
          </div>

          <div className="field-group">
            <label className="field-label">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email Address"
              value={form.email}
              onChange={handleChange}
              disabled={isFieldDisabled("email")}
            />
          </div>

          <div className="field-group">
            <label className="field-label">License Number</label>
            <input
              type="text"
              name="licenseNumber"
              placeholder="Enter License Number"
              value={form.licenseNumber}
              onChange={handleChange}
              disabled={isFieldDisabled("licenseNumber")}
            />
          </div>
          
          <div className="upload-image-field">
            <label className="field-label">Upload License Image</label>
              <input
                type="file"
                name="licenseImage"
                onChange={handleChange}
                disabled={isFieldDisabled("licenseImage") || form.uploadLater}
              />

            <label className="checkbox-label">
              <input className="checkbox-button"
                type="checkbox"
                name="uploadLater"
                checked={form.uploadLater}
                onChange={handleChange}
                disabled={!form.licenseNumber}
              />
              Upload License Image Later (To Follow Up)
            </label>
          </div>
          {form.uploadLater && (
            <p className="note">
              Reminder: Upload your LTO later to complete your account. Without it, we cannot process your transactions.
            </p>
          )}
        </div>

        {/* Already have account section */}
        <p className="specialtext2">
          Already have an account?{" "}
          <a className="link" onClick={goToLogin}>
            Login here!
          </a>
        </p>

        <button className="submit-button"  onClick={handleLogin}>Create Account</button>
      </div>
      {showSplash && (
        <div className="splash-overlay">
          <img src={splash} alt="Splash Screen" className="splash-image" />
        </div>
      )}
    </motion.div>
  );
};

export default CreateAccount;
