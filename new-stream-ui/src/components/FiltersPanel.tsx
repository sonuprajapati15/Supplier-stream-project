// @ts-ignore
import React from 'react';

const FiltersPanel: React.FC = () => {
  return (
    <aside style={{
      width: 270,
      background: '#fff',
      borderRadius: 12,
      boxShadow: '0 2px 16px #0001',
      padding: 24,
      margin: 24,
      minHeight: 500,
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
    }}>
      <h3 style={{ margin: 0, fontWeight: 600 }}>Filters</h3>
      <div>
        <strong>Stops</strong>
        <div>
          <label><input type="checkbox" /> Non-Stop</label>
        </div>
        <div>
          <label><input type="checkbox" /> 1 Stop</label>
        </div>
        <div>
          <label><input type="checkbox" /> 2+ Stops</label>
        </div>
      </div>
      <div>
        <strong>Exclude</strong>
        <div>
          <label>
            <input type="checkbox" /> Non-Refundable
          </label>
        </div>
      </div>
      <div>
        <strong>Flight Price</strong>
        <input type="range" min={1000} max={100000} defaultValue={50000} style={{ width: '100%' }} />
      </div>
      <div>
        <strong>Departure from New Delhi</strong>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <button>Early Morning</button>
          <button>Morning</button>
          <button>Mid Day</button>
          <button>Night</button>
        </div>
      </div>
    </aside>
  );
};

export default FiltersPanel;