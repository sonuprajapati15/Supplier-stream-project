// @ts-ignore
import React from 'react';

interface CompletionPopupProps {
    count: number;
    onClose: () => void;
}

const CompletionPopup: React.FC<CompletionPopupProps> = ({ count, onClose }) => (
    <div style={{
        position: 'fixed',
        top: 24,
        right: 24,
        background: '#fff',
        border: '2px solid #32cd32',
        borderRadius: 12,
        boxShadow: '0 4px 32px #0002',
        padding: '20px 32px',
        zIndex: 2000,
        fontWeight: 600,
        color: '#1b5e20',
        fontSize: 18,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        minWidth: 220,
        animation: 'pop-bounce 0.5s'
    }}>
        <span>✅ All {count} results loaded & sorted by price!</span>
        <button onClick={onClose} style={{
            marginLeft: 'auto',
            border: 'none',
            background: 'none',
            fontSize: 20,
            color: '#388e3c',
            cursor: 'pointer'
        }} title="Close">&times;</button>
        <style>
            {`
      @keyframes pop-bounce {
        0% { transform: scale(0.8); opacity: 0; }
        60% { transform: scale(1.05); opacity: 1; }
        100% { transform: scale(1); }
      }
      `}
        </style>
    </div>
);

export default CompletionPopup;