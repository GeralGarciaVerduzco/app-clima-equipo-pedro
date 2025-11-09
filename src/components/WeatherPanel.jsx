import React from 'react';
import ForecastItem from './ForecastItem';

function WeatherPanel({ data, getTempValue, lunasData = [], isLoggedIn }) {
  const current = data.current;
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [favoriteId, setFavoriteId] = React.useState(null);

  const readSaved = React.useCallback(() => {
    try {
      const raw = localStorage.getItem('savedLocations');
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  }, []);

  const writeSaved = React.useCallback((arr) => {
    localStorage.setItem('savedLocations', JSON.stringify(arr));
  }, []);

  React.useEffect(() => {
    const arr = readSaved();
    const found = arr.find(
      (x) =>
        (x.city || '') === (data.city || '') &&
        (x.country || x.state || '') === (data.country || data.state || '')
    );
    if (found) {
      setIsFavorite(true);
      setFavoriteId(found.id || null);
    } else {
      setIsFavorite(false);
      setFavoriteId(null);
    }
  }, [data.city, data.state, data.country, readSaved]);

  const handleFavoriteToggle = () => {
    if (!isLoggedIn) {
      alert('inicia sesión para guardar ubicaciones.');
      return;
    }
    const arr = readSaved();
    if (!isFavorite) {
      const id = Date.now();
      const saved = {
        id,
        city: data.city,
        state: data.state,
        country: data.country || data.state || '',
        current: {
          temperatureC: current.temperatureC,
          minTempC: current.minTempC,
          maxTempC: current.maxTempC,
          feelsLikeC: current.feelsLikeC,
          condition: current.condition,
          humidity: current.humidity,
          pressure: current.pressure,
          visibility: current.visibility,
          clouds: current.clouds,
          windSpeed: current.windSpeed
        }
      };
      writeSaved([saved, ...arr]);
      setIsFavorite(true);
      setFavoriteId(id);
    } else {
      const next = arr.filter((x) => (favoriteId ? x.id !== favoriteId : (x.city || '') !== (data.city || '')));
      writeSaved(next);
      setIsFavorite(false);
      setFavoriteId(null);
    }
  };

  return (
    <div className="app">
      <section className="panel">
        <div className="info-header">
          <div className="location">
            <img className="icon-img" src="/img/pin.png" alt="" />
            <span>{data.city}, {data.state}</span>
          </div>
          <div className="meta small">
            <span className="meta-item">
              <img className="icon-img" src="/img/calendar.png" alt="" />
              {data.current.date}
            </span>
            <span className="meta-item">
              <img className="icon-img" src="/img/clock.png" alt="" />
              {data.current.time}
            </span>
          </div>
          {isLoggedIn && (
            <img
              className="icon-img favorite-icon"
              src={isFavorite ? '/img/favorito.png' : '/img/no-favorito.png'}
              alt="marcar como favorito"
              title={isFavorite ? 'quitar favorito' : 'guardar ubicación'}
              onClick={handleFavoriteToggle}
              style={{ cursor: 'pointer' }}
            />
          )}
        </div>

        <div className="grid">
          <div className="card now">
            <div className="topleft">
              <img className="thermo" src="/img/thermometer.png" alt="termómetro" />
              <div className="temp temp-value">
                {getTempValue(data.current.temperatureC)}
              </div>
            </div>
            <div className="minmax">
              <div>mín <b className="temp-value">{getTempValue(data.current.minTempC)}</b></div>
              <div>máx <b className="temp-value">{getTempValue(data.current.maxTempC)}</b></div>
            </div>
            <div className="statusblock">
              <div className="status">{data.current.condition}</div>
              <div className="feels">se siente como <b className="temp-value">{getTempValue(data.current.feelsLikeC)}</b></div>
            </div>
            <div className="wicon">
              <img src={data.current.icon} alt={data.current.condition} />
            </div>
          </div>

          <div className="card sun-card">
            <div className="item">
              <img className="sun-icon" src="/img/sunrise.png" alt="amanecer" />
              <div className="label">Amanecer</div>
              <div className="k">{data.current.sunrise}</div>
            </div>
            <div className="item">
              <img className="sun-icon" src="/img/sunset.png" alt="atardecer" />
              <div className="label">Atardecer</div>
              <div className="k">{data.current.sunset}</div>
            </div>
          </div>

          <div className="card soft metrics">
            <div className="metric is-humidity">
              <img className="icon-img big" src="/img/humidity.png" alt="humedad" />
              <div className="k">Humedad</div>
              <div className="v">{data.current.humidity}%</div>
            </div>
            <div className="metric">
              <img className="icon-img big" src="/img/clouds.png" alt="nubes" />
              <div className="k">Nubes</div>
              <div className="v">{data.current.clouds}%</div>
            </div>
            <div className="metric">
              <img className="icon-img big" src="/img/pressure.png" alt="presión" />
              <div className="k">Presión</div>
              <div className="v">{data.current.pressure} hpa</div>
            </div>
            <div className="metric">
              <img className="icon-img big" src="/img/visibility.png" alt="visibilidad" />
              <div className="k">Visibilidad</div>
              <div className="v">{data.current.visibility} m</div>
            </div>
            <div className="metric">
              <img className="icon-img big" src="/img/wind.png" alt="viento" />
              <div className="k">Viento</div>
              <div className="v">{data.current.windSpeed} m/s</div>
            </div>
          </div>
        </div>

        <div className="forecast">
          <div className="flist">
            {data.forecast.map((item, index) => (
              <ForecastItem key={index} item={item} getTempValue={getTempValue} />
            ))}
          </div>
        </div>

        <div className="forecast moon-forecast">
          <div className="flist">
            {lunasData.map((luna, index) => (
              <div className="fitem moon-item" key={index}>
                <div className="t">{luna.dia}</div>
                <img className="wimg" src={luna.img} alt={luna.fase} />
                <div className="moon-phase">{luna.fase}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default WeatherPanel;