import React from "react";
import "../../css/booking-progress-bar.css";

const STAGES = ["Checking Inventry", "Processing", "Confirming", "Finalizing", "Completed"];

const getStepColor = (idx: number, stages: number) => {
    // Color changes from left to right as completed
    if (idx < stages) {
        // Assign a different color for each completed step
        const colors = ["#867070", "#cea828", "#2196f3", "#0fd401", "#9c27b0"];
        return colors[4];
    }
    return "#e6e6e6"; // inactive (gray) // completed step (gold)
};

const BookingProgress: React.FC<{ stages: number }> = ({ stages }) => {
    // Calculate plane position (between 0 and 1)
    const planePos = stages <= 1
        ? 0
        : stages >= STAGES.length
            ? 1
            : (stages - 1) / (STAGES.length - 1);

    return (
        <div className="booking-progress-overlay">
            <div className="booking-progress-modal">
                <div className="booking-progress-title">Booking your flight...</div>
                <div className="booking-progress-bar-outer">
                    <div className="booking-progress-bar-track">
                        {/* Plane */}
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/7893/7893979.png"
                            alt="plane"
                            className="booking-progress-plane"
                            style={{
                                left: `calc(${planePos * 100}% - 18px)`,
                                transition: "left 0.6s cubic-bezier(.79,.14,.15,.86)"
                            }}
                        />
                        {/* Steps and connectors */}
                        {STAGES.map((stage, idx) => (
                            <React.Fragment key={stage}>
                                {/* Connector */}
                                {idx > 0 && (
                                    <div
                                        className="booking-progress-bar-connector"
                                        style={{
                                            background: idx < stages ? "#cd2009" : "#e6e6e6"
                                        }}
                                    />
                                )}
                                {/* Step */}
                                <div className="booking-progress-bar-step-wrap">
                                    <div
                                        className="booking-progress-bar-step"
                                        style={{
                                            background: getStepColor(idx, stages),
                                            border: idx < stages ? "2.5px solid #eab649" : "2.5px solid #e6e6e6"
                                        }}
                                    >
                                        {idx < stages
                                            ? <span className="booking-progress-check">✔</span>
                                            : <span className="booking-progress-step-num">{idx + 1}</span>}
                                    </div>
                                    <div className="booking-progress-label">{stage}</div>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingProgress;