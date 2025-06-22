import React, {useState} from 'react';
import '../../css/FlightAncillarySection.css';


type AncillaryOption = {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
};

type AncillaryCategory = {
    id: string;
    name: string;
    icon: string;
    options: AncillaryOption[];
};

const sampleAncillaries: AncillaryCategory[] = [
    {
        id: 'meal',
        name: 'Meals',
        icon: '🍱',
        options: [
            {
                id: 'veg',
                name: 'Vegetarian Meal',
                price: 350,
                description: 'Tasty Indian vegetarian meal, freshly prepared and served with dessert.',
                image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80'
            },
            {
                id: 'nonveg',
                name: 'Non-Veg Meal',
                price: 400,
                description: 'Delicious chicken or egg meal, served hot with side salad.',
                image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80'
            },
            {
                id: 'special',
                name: 'Jain Meal',
                price: 420,
                description: 'Prepared without onion, garlic, or root vegetables, following Jain traditions.',
                image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80'
            },
            {
                id: 'kids',
                name: 'Kids Meal',
                price: 300,
                description: 'Fun meal for children with snacks and juice, includes a surprise toy.',
                image: 'https://images.unsplash.com/photo-1514512364185-4c2b6781d231?auto=format&fit=crop&w=400&q=80'
            },
            {
                id: 'vegan',
                name: 'Vegan Meal',
                price: 390,
                description: '100% plant-based meal, includes salad, main course, and fruit.',
                image: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80'
            },
            {
                id: 'kosher',
                name: 'Kosher Meal',
                price: 420,
                description: 'Meal prepared according to Kosher dietary laws.',
                image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80'
            },
            {
                id: 'halal',
                name: 'Halal Meal',
                price: 420,
                description: 'Halal-certified meal, prepared as per Islamic dietary laws.',
                image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80'
            }
        ]
    },
    {
        id: 'seat',
        name: 'Seat Selection',
        icon: '💺',
        options: [
            {
                id: 'window',
                name: 'Window Seat',
                price: 500,
                description: 'Enjoy the view and natural light with a window seat.',
                image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'
            },
            {
                id: 'aisle',
                name: 'Aisle Seat',
                price: 450,
                description: 'Easy access to aisle for movement and convenience.',
                image: 'https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?auto=format&fit=crop&w=400&q=80'
            },
            {
                id: 'extra_leg',
                name: 'Extra Legroom',
                price: 800,
                description: 'More space to stretch your legs and travel comfortably.',
                image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80'
            },
            {
                id: 'front_row',
                name: 'Front Row Seat',
                price: 600,
                description: 'Sit in the front row for early deplaning and quick service.',
                image: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=400&q=80'
            },
            {
                id: 'exit_row',
                name: 'Exit Row Seat',
                price: 900,
                description: 'Seat with extra legroom in exit row, subject to eligibility.',
                image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=400&q=80'
            },
            {
                id: 'adjacent',
                name: 'Adjacent Seat',
                price: 400,
                description: 'Reserve an adjacent seat for extra space or a travel companion.',
                image: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=400&q=80'
            }
        ]
    },
    {
        id: 'baggage',
        name: 'Baggage',
        icon: '🧳',
        options: [
            {
                id: 'extra_bag',
                name: 'Extra Baggage (15kg)',
                price: 700,
                description: 'Add 15kg of extra checked baggage.',
                image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80'
            },
            {
                id: 'priority_bag',
                name: 'Priority Baggage',
                price: 350,
                description: 'Get your bags first at destination.',
                image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80'
            },
            {
                id: 'sports',
                name: 'Sports Equipment',
                price: 1200,
                description: 'Carry sports equipment like golf bag, ski, or bicycle.',
                image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'
            },
            {
                id: 'musical',
                name: 'Musical Instrument',
                price: 900,
                description: 'Check-in musical instruments safely.',
                image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80'
            }
        ]
    },
    {
        id: 'other',
        name: 'Other Services',
        icon: '🛍️',
        options: [
            {
                id: 'wifi',
                name: 'WiFi',
                price: 299,
                description: 'Unlimited in-flight WiFi for browsing, social, and work.',
                image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80'
            },
            {
                id: 'priority',
                name: 'Priority Boarding',
                price: 250,
                description: 'Board first and settle in early, avoid queues.',
                image: 'https://images.unsplash.com/photo-1459129629034-1905d2b1a1f2?auto=format&fit=crop&w=400&q=80'
            },
            {
                id: 'lounge',
                name: 'Lounge Access',
                price: 999,
                description: 'Relax and refresh in a premium airport lounge.',
                image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=400&q=80'
            },
            {
                id: 'insurance',
                name: 'Travel Insurance',
                price: 180,
                description: 'Comprehensive insurance for delays, cancellations, and baggage loss.',
                image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80'
            },
            {
                id: 'fast_track',
                name: 'Fast Track Security',
                price: 200,
                description: 'Speed up your airport security process.',
                image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80'
            },
            {
                id: 'transfer',
                name: 'Airport Transfer',
                price: 850,
                description: 'Pre-book a taxi or shuttle to/from the airport.',
                image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80'
            }
        ]
    },
    {
        id: 'assistance',
        name: 'Special Assistance',
        icon: '♿',
        options: [
            {
                id: 'wheelchair',
                name: 'Wheelchair Assistance',
                price: 0,
                description: 'Request wheelchair for easy airport and boarding assistance.',
                image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80'
            },
            {
                id: 'minor',
                name: 'Unaccompanied Minor',
                price: 1800,
                description: 'Special service and supervision for children traveling alone.',
                image: 'https://images.unsplash.com/photo-1514512364185-4c2b6781d231?auto=format&fit=crop&w=400&q=80'
            },
            {
                id: 'pet',
                name: 'Pet in Cabin',
                price: 2000,
                description: 'Bring your small pet along in the cabin.',
                image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80'
            }
        ]
    },
    {
        id: 'eco',
        name: 'Eco Services',
        icon: '🌱',
        options: [
            {
                id: 'carbon_offset',
                name: 'Carbon Offset',
                price: 99,
                description: 'Offset your flight’s carbon emissions by supporting green projects.',
                image: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80'
            },
            {
                id: 'donation',
                name: 'Charity Donation',
                price: 150,
                description: 'Support a charitable cause as part of your booking.',
                image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80'
            }
        ]
    }
];

interface SelectedAncillaries {
    [categoryId: string]: string[]; // option ids per category
}

const FlightAncillarySection: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string>(sampleAncillaries[0].id);
    const [selected, setSelected] = useState<SelectedAncillaries>({});

    const handleOptionToggle = (categoryId: string, optionId: string) => {
        setSelected(prev => {
            const categorySelected = prev[categoryId] || [];
            const newSelected = categorySelected.includes(optionId)
                ? categorySelected.filter(id => id !== optionId)
                : [...categorySelected, optionId];
            return { ...prev, [categoryId]: newSelected };
        });
    };

    const activeOptions = sampleAncillaries.find(cat => cat.id === activeCategory)?.options || [];

    return (
        <div className="ancillary-section">
            <h3 className="ancillary-title">Enhance your journey</h3>
            <div className="ancillary-categories ancillary-options-scroll">
                {sampleAncillaries.map(cat => (
                    <button
                        key={cat.id}
                        className={`ancillary-category-btn${activeCategory === cat.id ? ' active' : ''}`}
                        onClick={() => setActiveCategory(cat.id)}
                        type="button"
                    >
                        <span className="ancillary-category-icon">{cat.icon}</span>
                        {cat.name}
                    </button>
                ))}
            </div>
            <div className="ancillary-options-list ancillary-options-scroll">
                {activeOptions.map(opt => (
                    <div className="ancillary-option" key={opt.id}>
                        <label>
                            <input
                                type="checkbox"
                                checked={selected[activeCategory]?.includes(opt.id) || false}
                                onChange={() => handleOptionToggle(activeCategory, opt.id)}
                            />
                            <div className="ancillary-option-flex">
                                <img className="ancillary-option-img" src={opt.image} alt={opt.name} />
                                <span className="ancillary-option-main">
                  <span className="ancillary-option-name">{opt.name}</span>
                  <span className="ancillary-option-price">₹{opt.price}</span>
                  <div className="ancillary-option-desc">{opt.description}</div>
                </span>
                            </div>
                        </label>
                    </div>
                ))}
            </div>
            <div className="ancillary-summary">
                {Object.entries(selected).some(([_, ids]) => ids.length > 0) &&
                    <>
                        <div className="ancillary-summary-title">Selected services:</div>
                        <ul>
                            {sampleAncillaries.map(cat =>
                                (selected[cat.id] || []).map(optId => {
                                    const opt = cat.options.find(o => o.id === optId);
                                    return opt ? (
                                        <li key={cat.id + '-' + opt.id}>
                                            {cat.name}: <b>{opt.name}</b> <span style={{ color: "#3e73f7" }}>₹{opt.price}</span>
                                        </li>
                                    ) : null;
                                })
                            )}
                        </ul>
                    </>
                }
            </div>
        </div>
    );
};

export default FlightAncillarySection;