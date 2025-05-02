import React, { useEffect, useState } from 'react';
import FlightCarousel from './components/FlightCarousel';
import FlightDetailsModal from './components/FlightDetailsModal';
import './index.css';

const App = () => {
    const [flights, setFlights] = useState([]);
    const [selectedFlight, setSelectedFlight] = useState(null);

    useEffect(() => {
        const source = new EventSource('http://localhost:9000/supplier/stream/flights');

        source.onmessage = (event) => {
            if (event.data && !event.data.startsWith("event:")) {
                try {
                    const decoded = atob(event.data.substring(5));
                    const parsed = JSON.parse(decoded);
                    if (parsed.flights && Array.isArray(parsed.flights)) {
                        setFlights(prev => [...prev, ...parsed.flights]);
                    }
                } catch (err) {
                    console.error('Decode or parse error:', err);
                }
            }
        };

        source.onerror = (err) => {
            console.error('SSE error:', err);
            source.close();
        };

        return () => source.close();
    }, []);

    return (
        <div className="app-container">
            <FlightCarousel flights={flights} onFlightSelect={setSelectedFlight} />
            {selectedFlight && (
                <FlightDetailsModal flight={selectedFlight} onClose={() => setSelectedFlight(null)} />
            )}
        </div>
    );
};

export default App;
