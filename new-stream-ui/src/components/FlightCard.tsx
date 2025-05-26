// @ts-ignore
import React from 'react';
import { Flight } from '../types/Flight';

interface FlightCardProps {
  flight: Flight;
  onClick: () => void;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight, onClick }) => {
  return (
    <div
      onClick={onClick}
      tabIndex={0}
      style={{
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 2px 12px #0002',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 24,
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px) scale(1.025)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px #0003';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform = '';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 12px #0002';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <img src={flight.airline.logo} alt={flight.airline.name} style={{ width: 56, height: 56, borderRadius: 8, objectFit: 'contain', background: '#f9f9f9' }} />
        <div>
          <div style={{ fontWeight: 600, fontSize: 18 }}>{flight.airline.name}</div>
          <div style={{ color: '#666', fontSize: 14 }}>{flight.flightNumber} • {flight.flightType}</div>
        </div>
      </div>
      <div style={{ flex: 1, textAlign: 'center' }}>
        <div style={{ fontWeight: 700, fontSize: 22 }}>{flight.departureTime}</div>
        <div style={{ color: '#aaa', fontSize: 14 }}>{flight.from}</div>
      </div>
      <div style={{ flex: 1, textAlign: 'center' }}>
        <div style={{ color: '#888', fontWeight: 500, fontSize: 14 }}>{flight.duration}</div>
        <div style={{ color: '#bbb', fontSize: 12 }}>{flight.totalStops} stop{flight.totalStops !== 1 ? 's' : ''}</div>
      </div>
      <div style={{ flex: 1, textAlign: 'center' }}>
        <div style={{ fontWeight: 700, fontSize: 22 }}>{flight.arrivalTime}</div>
        <div style={{ color: '#aaa', fontSize: 14 }}>{flight.to}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 120 }}>
        <div style={{ fontWeight: 700, color: '#f67c00', fontSize: 22, marginBottom: 6 }}>₹{flight.price.toLocaleString('en-IN')}</div>
        <button style={{
          background: '#ff9100',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '8px 18px',
          fontWeight: 700,
          cursor: 'pointer',
        }}>View Fares</button>
      </div>
    </div>
  );
};

export default FlightCard;