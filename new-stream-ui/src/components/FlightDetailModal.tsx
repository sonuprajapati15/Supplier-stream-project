// @ts-ignore
import React from 'react';
import { Flight } from '../types/Flight';

interface Props {
  flight: Flight;
  onClose: () => void;
}

const FlightDetailModal: React.FC<Props> = ({ flight, onClose }) => {
  return (
    <div style={{
      position: 'fixed',
      zIndex: 9999,
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 16,
          maxWidth: 480,
          width: '90%',
          padding: 32,
          boxShadow: '0 8px 32px #0003',
          position: 'relative'
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            right: 20,
            top: 16,
            background: 'none',
            border: 'none',
            fontSize: 24,
            cursor: 'pointer',
            color: '#888',
          }}
        >&times;</button>
        <h2 style={{ marginTop: 0 }}>{flight.airline.name} <span style={{ color: '#aaa', fontSize: 16 }}>({flight.flightNumber})</span></h2>
        <div style={{ display: 'flex', gap: 18, marginBottom: 16 }}>
          <img src={flight.airline.logo} alt={flight.airline.name} width={44} height={44} style={{ borderRadius: 8, background: '#f9f9f9' }} />
          <div>
            <div><b>From:</b> {flight.from} @ {flight.departureTime}</div>
            <div><b>To:</b> {flight.to} @ {flight.arrivalTime}</div>
            <div><b>Date:</b> {flight.date}</div>
          </div>
        </div>
        <div style={{ marginBottom: 10 }}>
          <div><b>Duration:</b> {flight.duration}</div>
          <div><b>Total Stops:</b> {flight.totalStops} ({flight.layovers.join(', ') || 'None'})</div>
          <div><b>Terminal:</b> {flight.terminal}, Gate: {flight.gate}, Boarding: {flight.boardingTime}</div>
          <div><b>Seat Type:</b> {flight.seatType} ({flight.seatPitch}, {flight.seatWidth})</div>
          <div><b>Meal:</b> {flight.meal}</div>
          <div><b>Price:</b> ₹{flight.price.toLocaleString('en-IN')}</div>
        </div>
        <div style={{ color: '#888', fontSize: 14 }}>
          <div>Cabin Class: {flight.cabinClass}</div>
          <div>Baggage: {flight.baggage}</div>
          <div>Lounge Access: {flight.loungeAccess}</div>
          <div>Eco Friendly: {flight.ecoFriendly}</div>
          <div>Entertainment: {flight.entertainment}</div>
          <div>WiFi: {flight.wifi}, USB: {flight.usbPort}, Power: {flight.powerOutlet}</div>
          <div>Cancellation: {flight.cancellationPolicy}, Change: {flight.changePolicy}</div>
          <div>Pet Policy: {flight.petPolicy}, Infant Policy: {flight.infantPolicy}</div>
        </div>
      </div>
    </div>
  );
};

export default FlightDetailModal;