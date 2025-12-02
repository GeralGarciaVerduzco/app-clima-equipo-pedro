import React from 'react';
import ForecastItem from '../components/ForecastItem';



function WeatherPanel({ data, getTempValue, lunasData = [], isLoggedIn }) {
  if (!data || !data.current) {
    return (
      <div className="app">
        <section className="panel">
          <p>Cargando clima...</p>
        </section>
      </div>
    );
  }

  const current = data.current;
  console.log(current)
  const hourly = Array.isArray(data.hourly) ? data.hourly : [];
  const forecast = Array.isArray(data.forecast) ? data.forecast : [];

  // ---------- Favoritos (localStorage) ----------
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
        (x.country || x.state || '') === (data.country || data.state || ''),
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
      alert('Inicia sesión para guardar ubicaciones.');
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
          windSpeed: current.windSpeed,
        },
      };
      writeSaved([saved, ...arr]);
      setIsFavorite(true);
      setFavoriteId(id);
    } else {
      const next = arr.filter((x) =>
        favoriteId ? x.id !== favoriteId : (x.city || '') !== (data.city || ''),
      );
      writeSaved(next);
      setIsFavorite(false);
      setFavoriteId(null);
    }
  };

  // ---------- Fases de luna ----------
  const moonForecast = React.useMemo(() => {
    if (lunasData && lunasData.length > 0) return lunasData;

    
    const tzOffset = data.timezoneOffsetSeconds || 0;
    const nowLocal = new Date(Date.now() + tzOffset * 1000);
    return buildMoonForecast(nowLocal, 7);
  }, [lunasData, data.timezoneOffsetSeconds]);

  return (
    <div className="app">
      <section className="panel">
        {/* Encabezado de información */}
        <div className="info-header">
          <div className="location">
            <img className="icon-img" src="/img/pin.png" alt="" />
            <span>
              {data.city}, {data.state}
            </span>
          </div>
          <div className="meta small">
            <span className="meta-item">
              <img className="icon-img" src="/img/calendar.png" alt="" />
              {current.date}
            </span>
            <span className="meta-item">
              <img className="icon-img" src="/img/clock.png" alt="" />
              {current.time}
            </span>
          </div>
          {isLoggedIn && (
            <img
              className="icon-img favorite-icon"
              src={isFavorite ? '/img/favorito.png' : '/img/no-favorito.png'}
              alt="marcar como favorito"
              title={isFavorite ? 'Quitar favorito' : 'Guardar ubicación'}
              onClick={handleFavoriteToggle}
              style={{ cursor: 'pointer' }}
            />
          )}
        </div>

        {/* Bloque principal: ahora + sol + métricas */}
        <div className="grid">
          {/* Clima actual */}
          <div className="card now">
            <div className="topleft">
              <img
                className="thermo"
                src="/img/thermometer.png"
                alt="termómetro"
              />
              <div className="temp temp-value">
                {getTempValue(current.temperatureC)}
              </div>
            </div>
            <div className="minmax">
              <div>
                mín{' '}
                <b className="temp-value">{getTempValue(current.minTempC)}</b>
              </div>
              <div>
                máx{' '}
                <b className="temp-value">{getTempValue(current.maxTempC)}</b>
              </div>
            </div>
            <div className="statusblock">
              <div className="status">{current.condition}</div>
              <div className="feels">
                Se siente como{' '}
                <b className="temp-value">
                  {getTempValue(current.feelsLikeC)}
                </b>
              </div>
            </div>
            <div className="wicon">
              <img src={current.icon} alt={current.condition} />
            </div>
          </div>

          {/* Amanecer / atardecer */}
          <div className="card sun-card">
            <div className="item">
              <img className="sun-icon" src="/img/sunrise.png" alt="amanecer" />
              <div className="label">Amanecer</div>
              <div className="k">{current.sunrise}</div>
            </div>
            <div className="item">
              <img className="sun-icon" src="/img/sunset.png" alt="atardecer" />
              <div className="label">Atardecer</div>
              <div className="k">{current.sunset}</div>
            </div>
          </div>

          {/* Métricas */}
          <div className="card soft metrics">
            <div className="metric is-humidity">
              <img
                className="icon-img big"
                src="/img/humidity.png"
                alt="humedad"
              />
              <div className="k">Humedad</div>
              <div className="v">{current.humidity}%</div>
            </div>
            <div className="metric">
              <img className="icon-img big" src="/img/clouds.png" alt="nubes" />
              <div className="k">Nubes</div>
              <div className="v">{current.clouds}%</div>
            </div>
            <div className="metric">
              <img
                className="icon-img big"
                src="/img/pressure.png"
                alt="presión"
              />
              <div className="k">Presión</div>
              <div className="v">{current.pressure} hpa</div>
            </div>
            <div className="metric">
              <img
                className="icon-img big"
                src="/img/visibility.png"
                alt="visibilidad"
              />
              <div className="k">Visibilidad</div>
              <div className="v">{current.visibility} m</div>
            </div>
            <div className="metric">
              <img className="icon-img big" src="/img/wind.png" alt="viento" />
              <div className="k">Viento</div>
              <div className="v">{current.windSpeed} m/s</div>
            </div>
          </div>
        </div>

        {/* Pronóstico por hora */}
        {hourly.length > 0 && (
          <div className="forecast hourly-forecast">
            <h3>Pronóstico por hora</h3>
            <div className="flist hourly-list">
              {hourly.map((h, index) => (
                <div className="fitem hourly-item" key={index}>
                  <div className="t">{h.time}</div>
                  <img className="wimg" src={h.icon} alt={h.condition} />
                  <div className="temp-value">
                    {getTempValue(h.temperatureC)}
                  </div>
                  <div className="cond">{h.condition}</div>
                  <div className="meta-small">
                    <span>Humedad: {h.humidity}%</span>
                    <span>Viento: {h.windSpeed} m/s</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pronóstico por día (futuro) */}
        {forecast.length > 0 && (
          <div className="forecast">
            <h3>Pronóstico por día</h3>
            <div className="flist">
              {forecast.map((item, index) => (
                <ForecastItem
                  key={index}
                  item={item}
                  getTempValue={getTempValue}
                />
              ))}
            </div>
          </div>
        )}

        {/* Fases de la luna */}
      
      </section>
    </div>
  );
}

export default WeatherPanel;
