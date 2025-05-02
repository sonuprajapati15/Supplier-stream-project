import React, { useEffect } from 'react';
import Modal from 'react-modal';

const FlightDetailsModal = ({ flight, onClose }) => {
        useEffect(() => {
                Modal.setAppElement('#root');
        }, []);

        if (!flight) return null;

        const details = [
                { label: 'Route', value: `${flight.from} → ${flight.to}` },
                { label: 'Departure', value: flight.departureTime },
                { label: 'Arrival', value: flight.arrivalTime },
                { label: 'Flight ID', value: flight.flightId },
                { label: 'Flight Number', value: flight.flightNumber },
                { label: 'Seat', value: `${flight.seatType} - ${flight.seatPitch}` },
                { label: 'Price', value: `₹${flight.price}` },
                { label: 'Baggage', value: flight.baggage },
                { label: 'Cabin Class', value: flight.cabinClass },
                { label: 'Change Policy', value: flight.changePolicy },
                { label: 'Cancellation Policy', value: flight.cancellationPolicy },
                { label: 'Flight Type', value: flight.flightType },
                { label: 'Check-in Counter', value: flight.checkInCounter },
                { label: 'Covid Safety', value: flight.covidSafety },
                { label: 'Eco Friendly', value: flight.ecoFriendly },
                { label: 'Entertainment', value: flight.entertainment },
                { label: 'Extra Legroom', value: flight.extraLegroom },
                { label: 'Infant Policy', value: flight.infantPolicy },
                { label: 'Layovers', value: flight.layovers.length ? flight.layovers.join(' → ') : 'None' },
                { label: 'Wi-Fi', value: flight.wifi },
        ];

        // Group into rows of 3 items
        const groupedDetails = [];
        for (let i = 0; i < details.length; i += 2) {
                groupedDetails.push(details.slice(i, i + 2));
        }

        return (
            <Modal
                isOpen={!!flight}
                onRequestClose={onClose}
                className="modal"
                overlayClassName="overlay"
            >
                    <div className="modal-content" style={styles.modalContent}>
                            <img
                                src={flight.airline.logo || '/default-logo.png'}
                                alt="logo"
                                style={styles.logo}
                            />
                            <h2 style={{ marginBottom: '1rem' }}>{flight.airline.name} - {flight.flightNumber}</h2>

                            <table style={styles.table}>
                                    <tbody>
                                    {groupedDetails.map((row, rowIndex) => (
                                        <tr key={rowIndex}>
                                                {row.map((item, colIndex) => (
                                                    <td key={colIndex} style={styles.cell}>
                                                            <strong>{item.label}:</strong><br />
                                                            {item.value}
                                                    </td>
                                                ))}
                                                {[...Array(2 - row.length)].map((_, i) => (
                                                    <td key={`empty-${i}`} style={styles.cell}></td>
                                                ))}
                                        </tr>
                                    ))}
                                    </tbody>
                            </table>
                            <img
                                src={flight.vendor_logo || '/default-logo.png'}
                                alt="logo"
                                style={{
                                        width: 80,
                                        height: 40,
                                        objectFit: 'contain',
                                        marginRight: '1rem',
                                }}
                            />
                            <button style={styles.closeButton} onClick={onClose}>
                                    Close
                            </button>
                    </div>
            </Modal>
        );
};

const styles = {
        modalContent: {
                textAlign: 'center',
                backgroundColor: '#fff',
                borderRadius: '12px',
                padding: '2rem',
                maxHeight: '80vh',
                overflowY: 'auto',
                width: '50vw',
                margin: 'auto',
                boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
        },
        logo: {
                width: 100,
                height: 'auto',
                marginBottom: '1rem',
        },
        table: {
                width: '100%',
                borderCollapse: 'collapse',
                marginTop: '1rem',
        },
        cell: {
                border: '1px solid #ddd',
                padding: '2px',
                textAlign: 'center',
                verticalAlign: 'top',
                width: '30%',
                backgroundColor: '#618f46',
        },
        closeButton: {
                marginTop: '2rem',
                backgroundColor: '#e53935',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '1rem',
        },
};

export default FlightDetailsModal;
