import React from "react";
import "../css/listing.css";

const listings = [
  {
    id: 1,
    image: "/listing.jpg",
    title: "Premium Hotel",
    location: "New York",
    price: "$199/night",
    description: "A premium experience in the heart of the city.",
  },
  // Add more listings as needed
];

const Listing: React.FC = () => (
  <div className="listing-page">
    <h2>Hotel Listings</h2>
    <div className="listings-grid">
      {listings.map((item) => (
        <div className="listing-card" key={item.id}>
          <img src={item.image} alt={item.title} />
          <div className="listing-info">
            <strong>{item.title}</strong>
            <div>{item.location}</div>
            <div>{item.price}</div>
            <p>{item.description}</p>
            <button>Book Now</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Listing;