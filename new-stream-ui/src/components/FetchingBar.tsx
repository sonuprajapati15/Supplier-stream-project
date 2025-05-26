// @ts-ignore
import React, { useEffect, useState } from 'react';

interface FetchingBarProps {
    loading: boolean;
    onComplete?: () => void;
}

const FetchingBar: React.FC<FetchingBarProps> = ({ loading, onComplete }) => {
    const [showCompleted, setShowCompleted] = useState(false);

    useEffect(() => {
        if (!loading) {
            setShowCompleted(true);
            const timer = setTimeout(() => {
                setShowCompleted(false);
                if (onComplete) onComplete();
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [loading, onComplete]);

    // Wider bar: 8px; Orange while loading, green when done
    return (loading || showCompleted) ? (
        <div style={{
            position: 'sticky',
            top: 0,
            left: 0,
            width: '100%',
            height: 8,
            background: loading
                ? 'linear-gradient(90deg, #ff9100, #ff3c00, #ff9100)'
                : 'linear-gradient(90deg, #32cd32, #00c851, #32cd32)',
            backgroundSize: '200% 100%',
            animation: loading ? 'fetching-bar 1s linear infinite' : undefined,
            zIndex: 999,
            transition: 'background 0.3s'
        }}>
            <style>
                {`
        @keyframes fetching-bar {
          0% { background-position: 0% 0; }
          100% { background-position: 200% 0; }
        }
        `}
            </style>
        </div>
    ) : null;
};

export default FetchingBar;