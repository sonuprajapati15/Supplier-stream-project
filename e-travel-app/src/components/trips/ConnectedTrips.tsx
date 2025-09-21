import React, {useEffect, useState} from 'react';
import '../../css/connected-trips-page.css';
import {useNavigate} from "react-router-dom";


interface Airline {
    logo: string;
    name: string;
}

interface ChooseFareComponent {
    name: string;
    price: number;
}

interface ChooseFare {
    components: {
        [key: string]: ChooseFareComponent;
    };
    total_price: number;
}

interface BookingItem {
    _id: string;
    age: number;
    hotelName: string,
    aircraftType?: string;
    airline?: Airline;
    arrivalTime: string;
    baggage: string;
    bgImage?: string;
    boardingTime: string;
    cabinClass: string;
    cancellationPolicy: string;
    changePolicy: string;
    checkInCounter: string;
    chooseFare: ChooseFare;
    cityImage?: string;
    pickup?: string,
    drop?: string,
    dropTime?: string,
    pickupTime?: string,
    covidSafety: string;
    date: string;
    date_time: string;
    departureTime: string;
    duration: string;
    checkIn: string,
    checkOut: string,
    ecoFriendly: string;
    email: string;
    entertainment: string;
    extraLegroom: string;
    fareCategories: any;
    fareClass: string;
    fareId: number;
    fareType: string;
    flightId: string;
    flightNumber: string;
    flightType: string;
    from: string;
    gate: string;
    image?: string;
    infantPolicy: string;
    lastUpdated: string;
    layovers: any;
    lobName: string;
    loungeAccess: string;
    meal: string;
    name: string;
    onTimePerformance: string;
    petPolicy: string;
    phone: string;
    pnrNo: string;
    powerOutlet: string;
    price: number;
    priorityBoarding: string;
    provider: string;
    rating: number;
    recliningAngle: string;
    reviewsCount: number;
    seatPitch: string;
    seatType: string;
    seatWidth: string;
    status: string;
    terminal: string;
    ticketNo: string;
    to: string;
    totalStops: number;
    travel_date: string;
    update_time: string;
    usbPort: string;
    userId: string;
    vendor_logo: string;
    vendor_name: string;
    wifi: string;
}

type BookingStatus = 'upcoming' | 'complete' | 'cancelled' | 'failed';

interface ApiResponse {
    cancelled: BookingItem[][][];
    complete: BookingItem[][][];
    failed: BookingItem[][][];
    upcoming: BookingItem[][][];
}


function formatDate(dateStr: string) {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, {weekday: "short", day: "2-digit", month: "short", year: "numeric"});
}

const TABS = [
    {key: 'upcoming', label: 'Upcoming'},
    {key: 'complete', label: 'Completed'},
    {key: 'cancelled', label: 'Cancelled'},
    {key: 'failed', label: 'Failed'}
] as const;

const ConnectedTripsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<BookingStatus>('upcoming');
    const [bookings, setBookings] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:9000/supplier/stream/all/booking?userId=1234')
            .then(res => res.json())
            .then(data => {
                setBookings(data);
                setLoading(false);
            });
    }, []);

    const renderTrip = (booking: BookingItem) => (
        <div>
            <div style={{
                height: `18px`,
                width: '2px',
                backgroundColor: '#000000',
                marginLeft: '15px',
            }}/>
            <div style={{display: "flex", flexDirection: 'row', width: "100%"}}>
                <div>
                    <div style={{
                        height: `60px`,
                        width: '2px',
                        backgroundColor: '#000000',
                        marginLeft: '15px',
                    }}/>
                    {booking.status.toLowerCase() === 'completed' && <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/1200px-Eo_circle_green_checkmark.svg.png"
                        alt="Right Tick"
                        width="18px"
                        height="18px"
                        style={{marginLeft: '7px', verticalAlign: 'middle' }}
                    />}
                    {booking.status.toLowerCase() === 'upcoming' && <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC5Gp183N2Hw21RQjWK-qXa37A-WeZEReQ6g&s"
                        alt="Right Tick"
                        width="18px"
                        height="18px"
                        style={{marginLeft: '7px', verticalAlign: 'middle' }}
                    />}
                    <div style={{
                        height: `75px`,
                        width: '2px',
                        backgroundColor: '#000000',
                        marginLeft: '15px',
                    }}/>
                </div>
                <div className="trip-card" key={booking._id}>
                    <div style={{flexDirection:"row", display: "flex", alignItems: "center"}}>
                        <div className={`trip-status ${booking.status.toLowerCase()}`}>
                            {booking.status.charAt(0) + booking.status.slice(1).toLowerCase()}
                        </div>
                    </div>
                    <div className="trip-card-header">
                        {booking.bgImage && (
                            <img
                                width="100px"
                                height="80px"
                                src={booking.bgImage}
                                alt={booking.cityImage}
                                className="trip-groups-container"
                                style={{
                                    borderRadius: "10px",
                                    margin: '10px 15px', // Sets top/bottom margin to 10px and left/right margin to 15px
                                    background: '#f1f1f1',
                                    objectFit: 'cover',
                                    border: '1.5px solid #eef2f7',
                                }}
                            />
                        )}
                        <div className="trip-type">
                            {booking.lobName.toLowerCase() === 'flight' && '✈️'}
                            {booking.lobName.toLowerCase() === 'train' && '🚆'}
                            {booking.lobName.toLowerCase() === 'hotel' && '🏨'}
                            {booking.lobName.toLowerCase() === 'cab' && '🚖'}
                        </div>
                    </div>
                    {booking.lobName.toLowerCase() == 'hotel' && (
                        <div style={{marginTop: "30px"}}>
                        <div className="trip-city bold" style={{marginLeft:"55px"}}>{booking.hotelName}</div>
                        <div className="trip-details" style={{marginTop:"10px"}}>
                            <div>
                                <div className="trip-time">Check-in</div>
                                <div className="trip-date">{new Date(booking.checkOut).toLocaleDateString(undefined, {
                                    weekday: 'short',
                                    day: '2-digit',
                                    month: 'short',
                                    year: '2-digit'
                                })}</div>
                            </div>
                            <div className="trip-arrow"> → </div>
                            <div>
                                <div className="trip-time">Check-Out</div>
                                <div className="trip-date">{new Date(booking.checkOut).toLocaleDateString(undefined, {
                                    weekday: 'short',
                                    day: '2-digit',
                                    month: 'short',
                                    year: '2-digit'
                                })}</div>
                            </div>
                        </div>
                        </div>
                    )}
                    {booking.lobName.toLowerCase() != 'hotel' && (
                        <div className="trip-details">
                            <div>
                                <div className="trip-city bold">{booking.from}{booking.pickup}</div>
                                <div className="trip-time">{booking.departureTime}{booking.pickupTime}</div>
                                <div className="trip-date">{new Date(booking.date).toLocaleDateString(undefined, {
                                    weekday: 'short',
                                    day: '2-digit',
                                    month: 'short',
                                    year: '2-digit'
                                })}</div>
                            </div>
                            <div className="trip-arrow"> → </div>
                            <div>
                                <div className="trip-city bold">{booking.to}{booking.drop}</div>
                                <div className="trip-time">{booking.arrivalTime}{booking.dropTime}</div>
                                <div className="trip-date">{new Date(booking.date).toLocaleDateString(undefined, {
                                    weekday: 'short',
                                    day: '2-digit',
                                    month: 'short',
                                    year: '2-digit'
                                })}</div>
                            </div>
                        </div>
                    )}
                    <div className="trip-card-actions">
                        {activeTab !== 'complete' && activeTab !== 'cancelled' && (
                            <button
                                className="btn-primary"
                                onClick={() => navigate(`/trip-detail/booking?ticketNo=${booking.ticketNo}`)}>
                                Manage Booking
                            </button>
                        )}
                        {activeTab === 'complete' && (
                            <>
                                <button
                                    className="btn-primary"
                                    onClick={() => navigate(`/trip-detail/booking?ticketNo=${booking.ticketNo}`)}>
                                    View Booking
                                </button>
                                <button className="btn-secondary">Download Invoice</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div style={{
                height: `10px`,
                width: '2px',
                backgroundColor: '#000000',
                marginLeft: '15px',
            }}/>
        </div>
    );

    const bookingCard = (booking: BookingItem) => (
        <div className="trips-card-outer"
             style={{
                 backgroundColor: booking.status.toLowerCase() === 'failed' ? '#eef5fd' : '#f5f5f5',
             }}>
            <div className="trips-img-outer">
                <img
                    src={booking.cityImage}
                    alt="Description"
                    style={{ width: "100%", height: "80%", objectFit: "cover", borderRadius: "20px" }}
                />
            </div>
            <div className="trips-card" style={{
                backgroundColor: booking.status.toLowerCase() === 'failed' ? '#eef5fd' : '#f5f5f5',
            }}>
                <div className="trips-card-header">
                    <span className="trips-card-icon">✈️</span>
                    {booking.lobName.toLowerCase() === 'flight' && (
                        <div>
                            <span className="trips-card-title">{booking.from}</span> <span className="trips-card-title-to"> → </span> <span className="trips-card-title-to">{booking.to}</span>
                        </div>
                    )}
                </div>
                <div className="trips-card-info">
                    {booking.lobName.toLowerCase() === 'flight' && (
                        <div>
                            <div className="trips-card-dates">
                                <div>
                                    <br />
                                    {formatDate(booking.date)} {booking.departureTime}
                                    <br />
                                </div>
                                <div>
                                    <br />
                                    {formatDate(booking.date)} {booking.arrivalTime}
                                    <br />
                                </div>
                            </div>
                        </div>
                    )}
                    {booking.status.toLowerCase() === "cancelled" && (
                        <div className="trips-card-error">
                            <div className="trips-card-note" style={{background: "#e3e3e3", color:"#000000"}}>
                                <ul>
                                    <li>Your Flight Booking Had Been Cancelled.
                                        <ul>
                                            <li>Refund Processed</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                    {booking.status.toLowerCase() === "failed" && (
                        <div className="trips-card-error">
                            <div className="trips-card-note" style={{background: "#ffe5e0"}}>
                                <ul>
                                    <li>This Booking Had been failed.
                                        <ul>
                                            <li>Refund will Process on Applicable fares</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="trip-card-actions">
                {booking.status.toLowerCase() == 'failed' && (<button
                    className="btn-primary" style={{background: "#363535"}}
                    onClick={() => navigate(`/trip-detail/booking?ticketNo=${booking.ticketNo}`)}>
                    View Details
                </button>)}
                {booking.status.toLowerCase() == 'cancelled' && (<button
                    className="btn-primary" style={{background: "#3e3e3e"}}
                    onClick={() => navigate(`/trip-detail/booking?ticketNo=${booking.ticketNo}`)}>
                    View Details
                </button>)}
            </div>
        </div>
    );

    const renderBookingCard = (booking: BookingItem) => {
        if (booking.status.toLowerCase() === 'failed' || booking.status.toLowerCase() === 'cancelled') {
            return bookingCard(booking);
        }
        if (booking.status.toLowerCase() === 'completed' || booking.status.toLowerCase() === 'upcoming') {
            return renderTrip(booking);
        }
        return null;
    };

    const renderTabContent = () => {
        if (loading) return <div className="loading">Loading...</div>;

        const tripGroups = bookings?.[activeTab] || [];
        if (!tripGroups.length) {
            const tabLabel = TABS.find(t => t.key === activeTab)?.label;
            return <div className="no-trips">No {tabLabel} Trips</div>;
        }

        return (
            <div className="trip-groups">
                {tripGroups.map((group, i) => (
                    <div key={i} className="trip-group">
                        {group.map((trips, j) => (
                            <React.Fragment key={j}>
                                {(activeTab === 'failed' || activeTab === 'cancelled') &&
                                    trips.map((trip, index) => (
                                        <div style={{ display: 'flex', flexDirection: 'column' }} key={index}>
                                            {renderBookingCard(trip)}
                                        </div>
                                    ))}
                                {(activeTab === 'upcoming' || activeTab === 'complete') && (
                                    <div className="trip-bookings-card">
                                        <div
                                            className="trip-groups-container"
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                padding: '10px 15px',
                                            }}
                                        >
                                            <img
                                                src={trips[0]?.cityImage || ''}
                                                alt={trips[0]?.from || 'City'}
                                                width="40px"
                                                height="40px"
                                                style={{
                                                    borderRadius: '50%',
                                                    objectFit: 'cover',
                                                    border: '2px solid #eef2f7'
                                                }}
                                            />
                                            <div style={{ padding: '5px', fontWeight: 'bold' }}>
                                                {trips[0]?.to}
                                            </div>
                                        </div>
                                        <div className="vertical-line" />
                                        {trips.map((trip, index) => (
                                            <div style={{ display: 'flex', flexDirection: 'row' }} key={index}>
                                                <div style={{ paddingLeft: '20px', paddingRight: '15px', width: "100%" }}>
                                                    {renderBookingCard(trip)}
                                                </div>
                                            </div>
                                        ))}
                                        <div style={{marginBottom:"10px"}}>
                                            {activeTab === 'complete' && (<div className="vertical-line-end" />)}
                                            {activeTab === 'complete' && (
                                                <div className="trip-safe-message">
                                                    <img
                                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/1200px-Eo_circle_green_checkmark.svg.png"
                                                        alt="Right Tick"
                                                        width="20px"
                                                        height="20px"
                                                        style={{
                                                            marginLeft: '12px',
                                                            marginRight: '8px',
                                                            marginBottom: "12px",
                                                            verticalAlign: 'middle'
                                                        }}
                                                    />
                                                    Hope you have a Safe and Wonderful trip
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="trips-page">
            <header className="trips-header">
                <h2>My Trips</h2>
                <button className="add-booking-btn">+ Add Booking</button>
            </header>
            <nav className="trips-tabs">
                {TABS.map(tab => (
                    <button
                        key={tab.key}
                        className={`trips-tab-btn${activeTab === tab.key ? ' active' : ''}`}
                        onClick={() => setActiveTab(tab.key as BookingStatus)}
                    >
                        {tab.label}
                    </button>
                ))}
            </nav>
            <div className="trips-content">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default ConnectedTripsPage;