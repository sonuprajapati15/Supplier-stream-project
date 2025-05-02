import React from 'react';

const getCardColor = (index) => {
    const colors = ['#d9fdd2', '#faf3fb', '#f8fdf5']; // light blue, light gray, light red
    return colors[index % colors.length];
};

const FlightCard = ({ flight, onClick, index }) => (
    <div
        onClick={onClick}
        style={{
            width: '80%',
            height: '70%',
            minWidth: '300px',
            margin: '1rem',
            backgroundColor: getCardColor(index),
            padding: '1.5rem',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            transition: 'transform 0.3s ease-in-out',
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
        <img
            src={flight.airline.logo || '/default-logo.png'}
            alt="logo"
            style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                width: '80px',
                height: '80px',
                objectFit: 'contain'
            }}
        />

            <div style={{ display: 'flex',  flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                <h3>{flight.airline.name}</h3>
                <p>{flight.from} → {flight.to}</p>
                <p>{flight.departureTime} - {flight.arrivalTime}</p>
                <p>₹{flight.price}</p>
            </div>


        <img
            src={flight.vendor_logo || '/default-logo.png'}
            alt="logo"
            style={{
                position: 'absolute',
                bottom: '5px',
                right: '10px',
                width: '60px',
                height: '30px',
                objectFit: 'contain'
            }}
        />
    </div>
);

export default FlightCard;
