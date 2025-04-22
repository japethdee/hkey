import { useState, useEffect } from "react";
import "../styles/track-page.css";
import { X, Clock, CheckCircle, MapPin, Star, SquareCheck } from "lucide-react";
import PropTypes from "prop-types";

const TrackPage = ({ invoice, orderId, description, onClose }) => {
    const [trackingHistory, setTrackingHistory] = useState([]);
    const [rating, setRating] = useState(0);
    const [hovered, setHovered] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        // Simulated tracking updates (replace with real API data)
        setTrackingHistory([
            { time: "12:00 PM", status: "Preparing order", location: "Warehouse A" },
            { time: "12:30 PM", status: "Out for delivery", location: "Logistics Hub" },
            { time: "1:00 PM", status: "Halfway there", location: "Checkpoint B" },
            { time: "1:30 PM", status: "Almost there", location: "Near Destination" },
            { time: "2:00 PM", status: "Delivered", location: "Customer Location" },
            { time: "1:00 PM", status: "Halfway there", location: "Checkpoint B" },
            { time: "1:30 PM", status: "Almost there", location: "Near Destination" },
            { time: "2:00 PM", status: "Delivered", location: "Customer Location" },
            { time: "1:00 PM", status: "Halfway there", location: "Checkpoint B" },
            { time: "1:30 PM", status: "Almost there", location: "Near Destination" },
            { time: "2:00 PM", status: "Delivered", location: "Customer Location" },
        ]);
    }, []);

    const handleStarClick = (value) => {
        setRating(value);
        setSubmitted(false);
    };

    const handleSubmitRating = () => {
        if (rating === 0) return alert("Please select a star rating.");
        alert(`Thanks for rating ${rating} star(s)! Feedback: ${feedback}`);
        setSubmitted(true);
    };

    return (
        <div className="track-overlay">
            <div className="track-modal-full">
                <button className="close-track-btn" onClick={onClose}>
                    <X strokeWidth={3} size={18} />
                </button>

                {/* Header */}
                <div className="track-header-section">
                    <div className="track-logo">.</div>
                    <div className="track-order-id">
                    <h2 className="track-order-title">Your Order: <b>{description} (Order: #{orderId})</b></h2>
                    </div>
                </div>

                {/* Tracking Body */}
                <div className="track-body">
                    {/* Left Info */}
                    <div className="track-info-left">
                        <div className="track-info-box">
                            <label>Date Ordered:</label>
                            <p>Fri, 23 Mar (2:03 PM)</p>
                        </div>
                        <div className="track-info-box">
                            <label>Current Status:</label>
                            <p>Order is being prepared at the office</p>
                            <div className="location-box"><MapPin className="location-icon" /><label>Buhangin, Davao City</label></div>
                        </div>
                        <div className="track-info-box-last">
                            <label>Rate your overall delivery experience</label>
                            <div className="star-rating">
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <Star
                                        key={value}
                                        size={33}
                                        color={(hovered || rating) >= value ? "#006800" : "#008600"}
                                        fill={(hovered || rating) >= value ? "#008600" : "none"}
                                        className="star"
                                        onClick={() => handleStarClick(value)}
                                        onMouseEnter={() => setHovered(value)}
                                        onMouseLeave={() => setHovered(0)}
                                        style={{ cursor: "pointer", transition: "color 0.2s" }}
                                    />
                                ))}
                            </div>

                            {rating > 0 && !submitted && (
                                <div className="feedback-box">
                                    <input
                                        className="feedback-textarea"
                                        placeholder="Leave feedback (optional)..."
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                    ></input>
                                    <button className="submit-rating-btn" onClick={handleSubmitRating}>Submit</button>
                                </div>
                            )}

                            {submitted && <p className="thank-you-msg"><SquareCheck size={23} strokeWidth={3}/> Thank you for your feedback!</p>}
                        </div>
                    </div>

                    {/* Right Progress */}
                    <div className="track-info-right">
                        <div className="del-header">
                        <h4 className="delivery-id-header">Delivery ID: #{orderId}</h4>
                        </div>

                        <div className="progress-icons">
                            {["In Preparation", "Out For Delivery", "Halfway There", "Almost There", "Delivered"].map((step, idx) => (
                                <div className="progress-step-icon" key={idx}>
                                    <CheckCircle className="icon" size={28}/>
                                    <span>{step}</span>
                                </div>
                            ))}
                        </div><div className="progress-div"></div>

                        <div className="track-table-container">
                            <h5 className="today-label">Today</h5>
                            <table className="track-table">
                                <thead>
                                </thead>
                                <tbody>
                                    {trackingHistory.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className="time-td"><Clock color={"green"} size={15} strokeWidth={3} /> <div className="time-data"> {item.time}</div><div className="stat-data">{item.status}</div></td>
                                            <td className="loc-td">{item.location}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="delivery-personnel">
                            <label>Delivered by:</label>
                            <p>John Doe — 09123456789</p>
                        </div>
                    </div>
                </div>

                {/* Order Summary Footer */}
                <div className="track-footer">
                    <div className="foot-div-del"><h3>Your Order Details</h3></div>
                    <iframe src={`${invoice}`} width="100%" height="300px" title="Order PDF"></iframe>
                </div>
            </div>
        </div>
    );
};

TrackPage.propTypes = {
    invoice: PropTypes.string.isRequired,
    orderId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    description: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default TrackPage;