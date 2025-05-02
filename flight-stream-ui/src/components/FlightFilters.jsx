import React from 'react';

const FlightFilters = ({ filters, onFilterChange, onSortChange }) => (
    <div className="w-1/5 p-4 bg-blue-50">
        <h2 className="text-lg font-bold text-blue-700">Filters</h2>

        <label>Date:</label>
        <input type="date" value={filters.date} onChange={e => onFilterChange('date', e.target.value)} className="mb-2 w-full" />

        <label>Price below:</label>
        <input type="number" value={filters.price} onChange={e => onFilterChange('price', e.target.value)} className="mb-2 w-full" />

        <label>Cabin Class:</label>
        <select value={filters.cabinClass} onChange={e => onFilterChange('cabinClass', e.target.value)} className="mb-2 w-full">
            <option value="">All</option>
            <option value="Executive">Executive</option>
            <option value="Deluxe">Deluxe</option>
            <option value="First Class">First Class</option>
        </select>

        <label>Wi-Fi:</label>
        <select value={filters.wifi} onChange={e => onFilterChange('wifi', e.target.value)} className="mb-2 w-full">
            <option value="">All</option>
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
        </select>

        <label>Seat Width ≥:</label>
        <input
            type="number"
            value={filters.seatWidth}
            onChange={e => onFilterChange('seatWidth', e.target.value)}
            className="mb-2 w-full"
        />

        <h2 className="text-lg font-bold text-green-700 mt-4">Sort By</h2>
        <select onChange={e => onSortChange(e.target.value)} className="w-full">
            <option value="">None</option>
            <option value="priceAsc">Price (Low to High)</option>
            <option value="priceDesc">Price (High to Low)</option>
            <option value="dateAsc">Date (Earliest)</option>
        </select>
    </div>
);

export default FlightFilters;
