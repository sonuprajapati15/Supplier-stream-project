// @ts-ignore
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Flight } from '../types/Flight';
import FlightCard from './FlightCard';
import FlightDetailModal from './FlightDetailModal';
import FiltersPanel from './FiltersPanel';
import FetchingBar from './FetchingBar';
import CompletionPopup from './CompletionPopup';
import { decryptAndDecompress } from '../decrypt/decryptAndDecompress';

const API_URL = "http://localhost:9000/supplier/stream/flights";

export interface FlightFilters {
  stops?: number[];
  minPrice?: number;
  maxPrice?: number;
}

const defaultFilters: FlightFilters = {
  stops: [],
  minPrice: undefined,
  maxPrice: undefined,
};

const FlightSearchPage: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [filters, setFilters] = useState<FlightFilters>(defaultFilters);

  // Store flights before filtering, to keep the original data
  const flightsRef = useRef<Flight[]>([]);

  // Filtering logic
  const applyFilters = useCallback((): Flight[] => {
    let filtered = flightsRef.current;
    if (filters.stops && filters.stops.length > 0) {
      // @ts-ignore
      filtered = filtered.filter(f => filters.stops!.includes(f.totalStops));
    }
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(f => f.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(f => f.price <= filters.maxPrice!);
    }
    // Always sort by price ascending after filtering
    filtered = [...filtered].sort((a, b) => a.price - b.price);
    return filtered;
  }, [filters]);

  // Listen for filter changes and update display list
  useEffect(() => {
    setFlights(applyFilters());
  }, [filters, applyFilters]);

  useEffect(() => {
    setFlights([]); // clear UI list
    flightsRef.current = [];
    setLoading(true);

    const source = new EventSource(API_URL);

    source.onmessage = (event) => {
      if (event.data && !event.data.startsWith("event:")) {
        try {
          const decoded = decryptAndDecompress(event.data.substring(5));
          console.log('Decoded data:', decoded);
          const parsed = JSON.parse(decoded);
          if (parsed.flights && Array.isArray(parsed.flights)) {
            flightsRef.current = [...flightsRef.current, ...parsed.flights];
            setFlights(applyFilters());
          }
        } catch (err) {
          console.error('Decode or parse error:', err);
        }
      }
      if (event.data && event.data.startsWith("event:completed")) {
        source.close();
        setLoading(false);
        setTimeout(() => setShowPopup(true), 200); // show popup after bar turns green
      }
    };

    source.onerror = (err) => {
      console.error('SSE error:', err);
      source.close();
      setLoading(false);
    };

    return () => source.close();
    // eslint-disable-next-line
  }, [applyFilters]);

  const handleCardClick = (flight: Flight) => {
    setSelectedFlight(flight);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFlight(null);
  };

  const handlePopupClose = () => setShowPopup(false);

  // Handle filter changes from FiltersPanel
  const handleFiltersChange = (changed: FlightFilters) => {
    setFilters(changed);
  };

  return (
      <div style={{ display: 'flex', minHeight: '100vh', background: '#f7f7f7' }}>
        <FiltersPanel onChange={handleFiltersChange} filters={filters} allFlights={flightsRef.current} />
        <div style={{ flex: 1, padding: '24px', position: 'relative' }}>
          <FetchingBar loading={loading} />
          {showPopup && (
              <CompletionPopup
                  count={flightsRef.current.length}
                  onClose={handlePopupClose}
              />
          )}
          <div style={{ marginBottom: 16 }}>
            <h2 style={{ margin: 0 }}>Flights Available</h2>
            <span style={{ color: '#888' }}>{flights.length} Results</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {flights.map((flight) => (
                <FlightCard
                    key={flight.flightId}
                    flight={flight}
                    onClick={() => handleCardClick(flight)}
                />
            ))}
          </div>
          {showModal && selectedFlight && (
              <FlightDetailModal flight={selectedFlight} onClose={handleCloseModal} />
          )}
        </div>
      </div>
  );
};

export default FlightSearchPage;