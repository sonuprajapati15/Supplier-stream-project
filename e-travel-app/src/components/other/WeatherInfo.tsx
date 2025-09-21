import React from "react";

interface WeatherInfoProps {
    weather: any;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ weather }) => (
    <div
        className="fb-detail-weather"
        style={{
            backgroundPosition: 'center',
            borderRadius: '12px',
            padding: '16px',
            color: '#222',
            backdropFilter: 'blur(8px)',
            backgroundColor: 'rgb(1,36,36)',
            maxWidth: '100%'
        }}
    >
        <h3 className="fb-detail-weather-title" style={{ color: '#ffffff' }}>
            Weather in {weather.location.name}
        </h3>
        <div className="fb-detail-weather-info">
            <img src={weather.current.condition.icon} alt={weather.current.condition.text} />
        </div>
        <div>
            <div>
                <b style={{ color: '#ffffff'}}>Condition: </b>
                <span style={{ color: '#ffffff'}}>{weather.current.condition.text}</span>
            </div>
            <div>
                <b style={{ color: '#ffffff' }}>Temperature: </b>
                <span style={{ color: '#ffffff'}}>{weather.current.temp_c}°C</span>
            </div>
            <div>
                <b style={{ color: '#ffffff'}}>Wind: </b>
                <span style={{ color: '#ffffff' }}>
                    {weather.current.wind_kph} kph ({weather.current.wind_dir})
                </span>
            </div>
            <div style={{marginTop: "4px", marginBottom:"4px"}}></div>
            <div>
                <b style={{ color: '#ffffff'}}>Current time: </b>
                <span style={{ color: '#ffffff' }}>
                    {weather.timezoneData.date + ' - ' +
                      (weather.timezoneData.time
                        ? (() => {
                            const [hour, min] = weather.timezoneData.time.split(':');
                            const h = parseInt(hour, 10);
                            const ampm = h >= 12 ? 'PM' : 'AM';
                            const hour12 = h % 12 === 0 ? 12 : h % 12;
                            return `${hour12}:${min} ${ampm}`;
                          })()
                        : ''
                      )
                    }
                </span>
            </div>
        </div>
    </div>
);

export default WeatherInfo;