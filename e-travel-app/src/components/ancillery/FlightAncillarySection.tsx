import React, {useState, useEffect} from 'react';
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

interface SelectedAncillaries {
    [categoryId: string]: string[];
}

interface AncillarySelectedDetailProps {
    selected: SelectedAncillaries;
    ancillaries: AncillaryCategory[];
}

const AncillarySelectedDetail: React.FC<AncillarySelectedDetailProps> = ({selected, ancillaries}) => {
    return (
        <div className="ancillary-summary">
            {Object.entries(selected).some(([_, ids]) => ids.length > 0) && (
                <>
                    <div className="ancillary-summary-title">Selected services:</div>
                    <ul>
                        {ancillaries.map((cat) =>
                            (selected[cat.id] || []).map((optId) => {
                                const opt = cat.options.find((o) => o.id === optId);
                                return opt ? (
                                    <li key={cat.id + '-' + opt.id}>
                                        {cat.name}: <b>{opt.name}</b>{' '}
                                        <span style={{color: '#3e73f7'}}>₹{opt.price}</span>
                                    </li>
                                ) : null;
                            })
                        )}
                    </ul>
                </>
            )}
        </div>
    );
};

interface PopCtasProps {
    selected: SelectedAncillaries;
    ancillaries: AncillaryCategory[];
    showPop: boolean;
    setShowPop: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopCtas: React.FC<PopCtasProps> = ({selected, ancillaries, showPop, setShowPop}) => {
    return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            {!showPop && selected && Object.keys(selected).some(catId => selected[catId].length > 0) && window.location.pathname.includes('trip-detail/booking') &&
                <button className="ancillary-sec-btn">
                    Continue to Buy
                </button>
            }
            <button className="ancillary-primary-btn" onClick={() => setShowPop(!showPop)}>
                {showPop ? 'Done' : 'Show Options'}
            </button>
        </div>
    );
};

interface AncillaryPopUpProps {
    ancillaries: AncillaryCategory[];
    setAncillaries: React.Dispatch<React.SetStateAction<AncillaryCategory[]>>;
    selected: SelectedAncillaries;
    setSelected: React.Dispatch<React.SetStateAction<SelectedAncillaries>>;
    setShowPop: React.Dispatch<React.SetStateAction<boolean>>;
    showPop: boolean;
}

const AncillaryPopUp: React.FC<AncillaryPopUpProps> = ({
                                                           ancillaries,
                                                           setAncillaries,
                                                           selected,
                                                           setSelected,
                                                           setShowPop,
                                                           showPop,
                                                       }) => {
    const [activeCategory, setActiveCategory] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch('http://localhost:9000/supplier/v1/ancillary')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch ancillary data');
                }
                return response.json();
            })
            .then((data: AncillaryCategory[]) => {
                setAncillaries(data);
                setActiveCategory(data[0]?.id || '');
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching ancillary data:', error);
                setLoading(false);
            });
    }, [setAncillaries]);

    const handleOptionToggle = (categoryId: string, optionId: string) => {
        setSelected((prev) => {
            const categorySelected = prev[categoryId] || [];
            const newSelected = categorySelected.includes(optionId)
                ? categorySelected.filter((id) => id !== optionId)
                : [...categorySelected, optionId];
            return {...prev, [categoryId]: newSelected};
        });
    };

    const activeOptions = ancillaries.find((cat) => cat.id === activeCategory)?.options || [];

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="passenger-modal-ancillary">
            <div className="ancillary-section">
                <div className="ancillary-header">
                    <h3 className="ancillary-title">Enhance your journey with add-on</h3>
                    <button className="ancillary-close-btn" onClick={() => setShowPop(false)}>✖</button>
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div className="ancillary-categories ancillary-options-scroll">
                        {ancillaries.map((cat) => (
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
                        {activeOptions.map((opt) => (
                            <div className="ancillary-option" key={opt.id}>
                                <label>
                                    <div className="ancillary-option-flex">
                                        <input
                                            style={{alignItems: "center"}}
                                            type="checkbox"
                                            checked={selected[activeCategory]?.includes(opt.id) || false}
                                            onChange={() => handleOptionToggle(activeCategory, opt.id)}
                                        />
                                        <img className="ancillary-option-img" src={opt.image} alt={opt.name}/>
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
                </div>
                <div>
                    <AncillarySelectedDetail selected={selected} ancillaries={ancillaries}/>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    {!showPop && selected && Object.keys(selected).some(catId => selected[catId].length > 0) &&
                        <button className="ancillary-sec-btn">
                            Continue to Buy
                        </button>
                    }
                    <button className="ancillary-primary-btn" onClick={() => setShowPop(!showPop)}>
                        {showPop ? 'Done' : 'Show Options'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const FlightAncillarySection: React.FC = () => {
    const [selected, setSelected] = useState<SelectedAncillaries>({});
    const [ancillaries, setAncillaries] = useState<AncillaryCategory[]>([]);
    const [showPop, setShowPop] = useState(false);

    return (
        <div style={{background: '#f3f3f3', boxShadow: "0 2px 8px rgba(44,62,80,0.06)"}}>
            <div className="ancillary-section-page">
                <h3 className="ancillary-title-page">Enhance your journey</h3>
                {showPop ? (
                    <AncillaryPopUp
                        ancillaries={ancillaries}
                        setAncillaries={setAncillaries}
                        selected={selected}
                        setSelected={setSelected}
                        setShowPop={setShowPop}
                        showPop={showPop}
                    />
                ) : (
                    <div>
                        <AncillarySelectedDetail selected={selected} ancillaries={ancillaries}/>
                    </div>
                )}
            </div>
            <div style={{paddingLeft: '18px', paddingRight: '18px', paddingBottom: '20px'}}>
                <PopCtas
                    selected={selected}
                    ancillaries={ancillaries}
                    showPop={showPop}
                    setShowPop={setShowPop}
                />
            </div>
        </div>
    );
};

export default FlightAncillarySection;