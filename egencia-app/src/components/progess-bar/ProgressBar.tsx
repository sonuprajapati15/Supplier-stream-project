import React, { useState, useEffect } from "react";
import "../../css/flight-listing.css";

const ProgressBar: React.FC = () => {
    const [progress, setProgress] = useState(0);
    const [stage, setStage] = useState("Loading flights...");

    useEffect(() => {
        const stages = [
            { text: "Loading flights...", color: "skyblue" },
            { text: "Fetching from different vendors...", color: "orange" },
            { text: "Comparing best prices...", color: "purple" },
            { text: "Done!", color: "green" },
        ];

        let currentStage = 0;

        const interval = setInterval(() => {
            if (currentStage < stages.length) {
                setProgress((currentStage + 1) * 25); // Progress increments by 25%
                setStage(stages[currentStage].text);
                document.documentElement.style.setProperty("--progress-color", stages[currentStage].color);
                currentStage++;
            } else {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progress}%`, backgroundColor: "var(--progress-color)" }}>
                <span className="progress-text">{stage}</span>
            </div>
        </div>
    );
};

export default ProgressBar;