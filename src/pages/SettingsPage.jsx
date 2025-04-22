import { useState } from "react";
import Navbar from "../components/Navbar";
import ChatHead from "../components/ChatHead";
import "../styles/settings-page.css";
import { motion } from "framer-motion";
import { Sun, Moon, ChevronDown, Eye, EyeOff, ChevronRight, Bell, CreditCard, Truck, Settings, Lock, CircleHelp, BadgeInfo } from "lucide-react";

const SettingsPage = () => {
    const pageVariants = {
      initial: { opacity: 0, y: 0 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      exit: { opacity: 0, y: 0, transition: { duration: 0.5 } }
    };
    const [OpenSections , setOpenSections ] = useState({
        notifications: false,
        delivery: false,
        payment: false,
        system: false,
        privacy: false,
        help: false,
        about: false,
      });
      
      const toggleSection = (section) => {
        setOpenSections (prev => ({
          ...prev,
          [section]: !prev[section]
        }));
      };
      
      const [selectedPaymentType, setSelectedPaymentType] = useState("Bank");

      const savedBankMethods = [
        { id: 1, name: "BDO Savings •••• 1234" },
        { id: 2, name: "BPI Checking •••• 5678" },
      ];

      const savedEwallets = [
        { id: 1, name: "GCash •••• 7890" },
        { id: 2, name: "PayMaya •••• 4321" },
      ];

      const [openSubsections, setOpenSubsections] = useState({
        bankAdd: false,
        bankProfile: false,
        bankSaved: false,
        ewalletAdd: false,
        ewalletProfile: false,
        ewalletSaved: false,
      });
      
      const toggleSubsection = (key) => {
        setOpenSubsections((prev) => ({ ...prev, [key]: !prev[key] }));
      };

      const [theme, setTheme] = useState("system");
      
      const [OpenSubsectionsSec, setOpenSubsectionsSec] = useState({
        changePassword: false,
        loginSessions: false,
        contactUs: false,
        faq: false,
        feedback: false,
        terms: false,
        policy: false,
      });
      
      const toggleSubsectionSec = (key) => {
        setOpenSubsectionsSec((prev) => ({
          ...prev,
          [key]: !prev[key]
        }));
      };
      
      const [showLogoutModal, setShowLogoutModal] = useState(false);
      const [showDeleteModal, setShowDeleteModal] = useState(false);

      const [showOldPassword, setShowOldPassword] = useState(false);
      const [showNewPassword, setShowNewPassword] = useState(false);
      const [showConfirmPassword, setShowConfirmPassword] = useState(false);

      
  return (
    <div className="settings-container">
      <Navbar type="logged" />
      <motion.div  initial="initial" animate="animate" exit="exit" variants={pageVariants} className="settings-wrapper">
        <h1 className="settings-title">Settings</h1>

        {/* Notifications */}
        <div className="settings-section">
          <div className="section-header" onClick={() => toggleSection("notifications")}>
            <h2> <Bell /> Notifications</h2>
            {OpenSections.notifications ? <ChevronDown /> : <ChevronRight />}
          </div>
          {OpenSections.notifications && (
            <div className="section-content">
              <div className="lab-in">
                <label>Quotation Replies</label><input type="checkbox" />
              </div>
              <div className="lab-in">
                <label>Order Updates</label><input type="checkbox" />
              </div>
              <div className="lab-in">
                <label>Delivery Updates</label><input type="checkbox" />
              </div>
              <div className="lab-in">
                <label>Return/Exchange Updates</label><input type="checkbox" />
              </div>
              <div className="lab-in">
                <label>Email</label><input type="radio" name="notifChannel" defaultChecked />
              </div>
              <div className="lab-in">
                <label>SMS (Coming Soon)</label><input type="radio" name="notifChannel" disabled />
              </div>
            </div>
          )}
        </div>

        {/* Delivery Preferences */}
        <div className="settings-section">
          <div className="section-header" onClick={() => toggleSection("delivery")}>
            <h2> <Truck />  Delivery Preferences</h2>
            {OpenSections.delivery ? <ChevronDown /> : <ChevronRight />}
          </div>
          {OpenSections.delivery && (
            <div className="section-content">
              <input type="text" placeholder="Default Delivery Address" />
              <section className="location-section1">
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
              <p className="note">* Google Maps integration coming soon</p>
            </div>
          )}
        </div>

        {/* Payment Options */}
        <div className="settings-section">
          <div className="section-header" onClick={() => toggleSection("payment")}>
            <h2><CreditCard /> Payment Options</h2>
            {OpenSections.payment ? <ChevronDown /> : <ChevronRight />}
          </div>

          {OpenSections.payment && (
            <div className="section-content-payment">
              <label className="mb-2 fw-semibold">Select Payment Method</label>
              <select
                className="form-select mb-4"
                value={selectedPaymentType}
                onChange={(e) => setSelectedPaymentType(e.target.value)}
              >
                <option value="Bank">Bank</option>
                <option value="E-wallet">E-wallet</option>
                <option value="Cash">Cash</option>
              </select>

              {/* --- BANK --- */}
              {selectedPaymentType === "Bank" && (
                <>
                  {/* Add Payment Method */}
                  <div className="subsection-header" onClick={() => toggleSubsection("bankAdd")}>
                    <h4>Add Bank Payment Method</h4>
                    {openSubsections.bankAdd ? <ChevronDown /> : <ChevronRight />}
                  </div>
                  {openSubsections.bankAdd && (
                    <div className="subsection-content">
                      <input className="form-control mb-2" placeholder="Bank Name" />
                      <input className="form-control mb-2" placeholder="Account Number" />
                      <input className="form-control mb-2" placeholder="Account Holder Name" />
                      <button className="btn btn-primary mt-2">Add Bank</button>
                    </div>
                  )}

                  {/* Payment Profile */}
                  <div className="subsection-header" onClick={() => toggleSubsection("bankProfile")}>
                    <h4>Payment Profile</h4>
                    {openSubsections.bankProfile ? <ChevronDown /> : <ChevronRight />}
                  </div>
                  {openSubsections.bankProfile && (
                    <div className="subsection-content">
                      <input className="form-control mb-2" placeholder="Billing Address" />
                      <input className="form-control mb-2" placeholder="City / Province" />
                      <input className="form-control mb-2" placeholder="Zip Code" />
                    </div>
                  )}

                  {/* Saved Banks */}
                  <div className="subsection-header" onClick={() => toggleSubsection("bankSaved")}>
                    <h4>Saved Bank Accounts</h4>
                    {openSubsections.bankSaved ? <ChevronDown /> : <ChevronRight />}
                  </div>
                  {openSubsections.bankSaved && (
                    <ul className="list-group subsection-content">
                      {savedBankMethods.map((bank) => (
                        <li key={bank.id} className="list-group-item">{bank.name}</li>
                      ))}
                    </ul>
                  )}
                </>
              )}

              {/* --- E-WALLET --- */}
              {selectedPaymentType === "E-wallet" && (
                <>
                  {/* Add E-wallet */}
                  <div className="subsection-header" onClick={() => toggleSubsection("ewalletAdd")}>
                    <h4>Add E-Wallet</h4>
                    {openSubsections.ewalletAdd ? <ChevronDown /> : <ChevronRight />}
                  </div>
                  {openSubsections.ewalletAdd && (
                    <div className="subsection-content">
                      <input className="form-control mb-2" placeholder="E-wallet Provider" />
                      <input className="form-control mb-2" placeholder="Mobile Number / Wallet ID" />
                      <button className="btn btn-primary mt-2">Add E-wallet</button>
                    </div>
                  )}

                  {/* Payment Profile */}
                  <div className="subsection-header" onClick={() => toggleSubsection("ewalletProfile")}>
                    <h4>Payment Profile</h4>
                    {openSubsections.ewalletProfile ? <ChevronDown /> : <ChevronRight />}
                  </div>
                  {openSubsections.ewalletProfile && (
                    <div className="subsection-content">
                      <input className="form-control mb-2" placeholder="Billing Email" />
                    </div>
                  )}

                  {/* Saved E-Wallets */}
                  <div className="subsection-header" onClick={() => toggleSubsection("ewalletSaved")}>
                    <h4>Saved E-wallets</h4>
                    {openSubsections.ewalletSaved ? <ChevronDown /> : <ChevronRight />}
                  </div>
                  {openSubsections.ewalletSaved && (
                    <ul className="list-group subsection-content">
                      {savedEwallets.map((wallet) => (
                        <li key={wallet.id} className="list-group-item">{wallet.name}</li>
                      ))}
                    </ul>
                  )}
                </>
              )}

              {selectedPaymentType === "Cash" && (
                <div className="text-muted" style={{ marginBottom: "-18px" }}>
                </div>
              )}
            </div>
          )}
        </div>

        {/* System Preferences */}
        <div className="settings-section">
          <div className="section-header" onClick={() => toggleSection("system")}>
            <h2> <Settings /> System Preferences</h2>
            {OpenSections.system ? <ChevronDown /> : <ChevronRight />}
          </div>
          {OpenSections.system && (
            <div className="section-content">
            <label className="mb-2 fw-semibold">Language:
              <select className="form-select mt-1">
                <option>English</option>
                <option>Filipino</option>
              </select>
            </label>
            <label className="mt-2 fw-semibold">Appearance:</label>
            <div className="theme-options">
              <div className="theme-option">
                <input type="checkbox" checked={theme === "light"} onChange={() => setTheme("light")} />
                <span><Sun width={18} strokeWidth={2.5} /> Light Mode</span>
              </div>
              <div className="theme-option">
                <input type="checkbox" checked={theme === "dark"} onChange={() => setTheme("dark")} />
                <span><Moon width={18} strokeWidth={2.5}/> Dark Mode</span>
              </div>
              <div className="theme-option">
                <input type="checkbox" checked={theme === "system"} onChange={() => setTheme("system")} />
                <span><Settings width={18} strokeWidth={2.5}/> System Default</span>
              </div>
            </div>
          </div>          
          )}
        </div>

        {/* Privacy & Security */}
        <div className="settings-section">
          <div className="section-header" onClick={() => toggleSection("privacy")}>
            <h2><Lock /> Privacy & Security</h2>
            {OpenSections.privacy ? <ChevronDown /> : <ChevronRight />}
          </div>
          {OpenSections.privacy && (
            <div className="section-content-sp">

              {/* Change Password */}
              <div className="subsection">
                <div className="sp-subsection-header" onClick={() => toggleSubsectionSec("changePassword")}>
                  <h4>Change Password</h4>
                  {OpenSubsectionsSec.changePassword ? <ChevronDown /> : <ChevronRight />}
                </div>
                {OpenSubsectionsSec.changePassword && (
                  <div className="sp-subsection-body">
                  <div className="sp-password-field">
                    <input
                      type={showOldPassword ? "text" : "password"}
                      placeholder="Current Password"
                      className="form-control"
                    />
                    <span onClick={() => setShowOldPassword(!showOldPassword)}>
                      {showOldPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </span>
                  </div>
                
                  <div className="sp-password-field">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="New Password"
                      className="form-control"
                    />
                    <span onClick={() => setShowNewPassword(!showNewPassword)}>
                      {showNewPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </span>
                  </div>
                
                  <div className="sp-password-field mb-3">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm New Password"
                      className="form-control"
                    />
                    <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </span>
                  </div>
                
                  <button className="save-btn btn-success">Save Changes</button>
                </div>
                
                )}
              </div>

              {/* View Login Sessions */}
              <div className="subsection">
                <div className="sp-subsection-header" onClick={() => toggleSubsectionSec("loginSessions")}>
                  <h4>View Login Sessions</h4>
                  {OpenSubsectionsSec.loginSessions ? <ChevronDown /> : <ChevronRight />}
                </div>
                {OpenSubsectionsSec.loginSessions && (
                  <div className="sp-subsection-body text-muted">
                    <p>This feature will be available soon.</p>
                    <button
                      className="lo-btn btn-danger"
                      onClick={() => setShowLogoutModal(true)}
                    >
                      Logout All Devices
                    </button>
                  </div>
                )}
              </div>
              <button
                className="danger-btn btn-danger"
                onClick={() => setShowDeleteModal(true)}
              >
                Delete Account
              </button>

            </div>
          )}
        </div>

        {/* Help & Support */}
        <div className="settings-section">
          <div className="section-header" onClick={() => toggleSection("help")}>
            <h2><CircleHelp /> Help & Support</h2>
            {OpenSections.help ? <ChevronDown /> : <ChevronRight />}
          </div>

          {OpenSections.help && (
            <div className="section-content-sp">
              
              {/* Contact Us */}
              <div className="subsection">
                <div className="sp-subsection-header" onClick={() => toggleSubsectionSec("contactUs")}>
                  <h4>Contact Us</h4>
                  {OpenSubsectionsSec.contactUs ? <ChevronDown /> : <ChevronRight />}
                </div>
                {OpenSubsectionsSec.contactUs && (
                  <div className="sp-subsection-body text-muted">
                    <p>This feature will be available soon.</p>
                  </div>
                )}
              </div>

              {/* FAQ / How it Works */}
              <div className="subsection">
                <div className="sp-subsection-header" onClick={() => toggleSubsectionSec("faq")}>
                  <h4>FAQ / How it Works</h4>
                  {OpenSubsectionsSec.faq ? <ChevronDown /> : <ChevronRight />}
                </div>
                {OpenSubsectionsSec.faq && (
                  <div className="sp-subsection-body text-muted">
                    <p>This feature will be available soon.</p>
                  </div>
                )}
              </div>

              {/* Send Feedback */}
              <div className="subsection">
                <div className="sp-subsection-header" onClick={() => toggleSubsectionSec("feedback")}>
                  <h4>Send Feedback</h4>
                  {OpenSubsectionsSec.feedback ? <ChevronDown /> : <ChevronRight />}
                </div>
                {OpenSubsectionsSec.feedback && (
                  <div className="sp-subsection-body text-muted">
                    <p>This feature will be available soon.</p>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>

        {/* About */}
        <div className="settings-section">
          <div className="section-header" onClick={() => toggleSection("about")}>
            <h2> <BadgeInfo /> About</h2>
            {OpenSections.about ? <ChevronDown /> : <ChevronRight />}
          </div>
          {OpenSections.about && (
            <div className="section-content-sp">
              
              {/* Terms & Condition */}
              <div className="subsection">
                <div className="sp-subsection-header" onClick={() => toggleSubsectionSec("terms")}>
                  <h4>Terms & Condition</h4>
                  {OpenSubsectionsSec.terms ? <ChevronDown /> : <ChevronRight />}
                </div>
                {OpenSubsectionsSec.terms && (
                  <div className="sp-subsection-body text-muted">
                    <p>This feature will be available soon.</p>
                  </div>
                )}
              </div>

              {/* Privacy Policy */}
              <div className="subsection">
                <div className="sp-subsection-header" onClick={() => toggleSubsectionSec("policy")}>
                  <h4>Privacy Policy</h4>
                  {OpenSubsectionsSec.policy ? <ChevronDown /> : <ChevronRight />}
                </div>
                {OpenSubsectionsSec.policy && (
                  <div className="sp-subsection-body text-muted">
                    <p>This feature will be available soon.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <ChatHead/>
      </motion.div>
      
      <div className="end-note1">
            <h1><b>TO GOD BE THE GLORY</b></h1>
      </div>

      {showLogoutModal && (
        <div className="settings-modal-overlay">
          <div className="settings-modal-box">
            <span className="modal-close" onClick={() => setShowLogoutModal(false)}>×</span>
            <p>Are you sure you want to logout from all devices?</p>
            <div className="modal-buttons">
              <button className="cl-btn btn-danger">Confirm Logout</button>
              <button className="c-btn btn-secondary" onClick={() => setShowLogoutModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="settings-modal-overlay">
          <div className="settings-modal-box">
            <span className="modal-close" onClick={() => setShowDeleteModal(false)}>×</span>
            <p>This will permanently remove your account. <i>**Reason selection will be added soon.**</i></p>
            <div className="modal-buttons">
              <button className="cl-btn btn-danger">Confirm Deletion</button>
              <button className="c-btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <footer>
        Copyright © 2025 Powered by Health Key Pharmaceutical Product Distribution
      </footer>
    </div>
  );
};

export default SettingsPage;