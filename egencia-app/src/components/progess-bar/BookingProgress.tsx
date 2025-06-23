import React, {useEffect, useState} from "react";
import "../../css/booking-progress-bar.css";

const STAGES = ["Checking Inventory", "Processing", "Confirming", "Finalizing", "Completed"];

const BookingProgress: React.FC<{ stages: number }> = ({ stages }) => {
    console.log("stages", stages);
    return (
        <div className="booking-progress-overlay">
            <div className="booking-progress-modal">
                <div className="booking-progress-title">Booking your flight...</div>
                <div className="simple-progress-bar-outer">
                    <div className="simple-progress-bar-track">
                        {STAGES.map((stage, idx) => (
                            <React.Fragment key={stage}>
                                {/* Connector */}
                                {idx > 0 && (
                                    <div
                                        className="simple-progress-bar-connector"
                                        style={{
                                            background: idx < stages ? "#000" : "#b8b7b7"
                                        }}
                                    />
                                )}
                                {/* Step */}
                               <div className="simple-progress-bar-step-wrap">
                                    <div
                                        className="simple-progress-bar-step"
                                        style={{
                                            background: idx + 1 < stages
                                                ? "#14a303"
                                                : "#f1f1f1",
                                            border: idx + 1 < stages
                                                ? "2.5px solid #14a303"
                                                : "2.5px solid #b8b7b7",
                                            position: "relative"
                                        }}
                                    >
                                        {idx + 1 < stages ? (
                                            <span className="simple-progress-bar-check">
                                                {idx + 1 === STAGES.length
                                                    ? <svg width="18" height="18" viewBox="0 0 18 18">
                                                        <circle cx="9" cy="9" r="9" fill="#14a303" />
                                                        <polyline points="5,10 8,13 13,6" fill="none" stroke="#fff" strokeWidth="2.2" />
                                                    </svg>
                                                    : <svg width="18" height="18" viewBox="0 0 18 18">
                                                        <circle cx="9" cy="9" r="9" fill="#f1f1f1" />
                                                        <polyline points="5,10 8,13 13,6" fill="none" stroke="#111" strokeWidth="2.2" />
                                                    </svg>
                                                }
                                            </span>
                                        ) : (
                                            <span className="simple-progress-bar-step-num">{idx + 1}</span>
                                        )}
                                        {idx + 1 === stages && (
                                            <img
                                                src="https://t4.ftcdn.net/jpg/05/33/64/17/360_F_533641706_1I6Wzsc6pAxR3X3fuj77RM9sGIUjYdnQ.jpg"
                                                alt="Flying plane"
                                                width="90px"
                                                height="90px"
                                                style={{
                                                    position: "absolute",
                                                    top: "-20px",
                                                    left: "50%",
                                                    transform: "translateX(-50%)",
                                                    animation: "fly 0.6s ease-in-out"
                                                }}
                                            />
                                        )}
                                    </div>
                                    <div className="simple-progress-label">{stage}</div>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const BookingProgressWrapper: React.FC = () => {
    const [stages, setStages] = useState(0);

    useEffect(() => {
        setStages(0); // start from 0
        const interval = setInterval(() => {
            setStages(prev => {
                if (prev <= STAGES.length) {
                    return prev + 1;
                } else {
                    clearInterval(interval);
                    window.location.href = "/trips";
                    return prev;
                }
            });
        }, 800);

        return () => clearInterval(interval);
    }, []);

    return <BookingProgress stages={stages} />;
};

export default BookingProgressWrapper;