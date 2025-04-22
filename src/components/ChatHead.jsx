import { useState } from "react";
import "../styles/chat-head.css";
import { MailPlus } from "lucide-react";

const ChatHead = () => {

  const [showTooltip, setShowTooltip] = useState(false);

  // Open Gmail Compose in a Small Popup Window
  const openGmailPopup = () => {
    const width = 600;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    window.open(
      "https://mail.google.com/mail/?view=cm&fs=1&to=healthkey997@gmail.com&su=Inquiry&body=Hello, I'd like to ask about...",
      "_blank",
      `width=${width},height=${height},top=${top},left=${left},noopener,noreferrer`
    );
  };

  return (
    <div>
        {/* Floating Gmail Chathead Button with Tooltip */}
        <div
            className="chathead-container"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            {/* Tooltip */}
            {showTooltip && <div className="tooltip">Message us!</div>}

            {/* Button */}
            <button className="chathead-button" onClick={openGmailPopup}>
                <MailPlus className = "msg" color="white" size={28} />
            </button>
        </div>
    </div>
  );
};

export default ChatHead;