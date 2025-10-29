import React from 'react';
// importar componente para pronóstico por hora
import ForecastItem from './ForecastItem';

// componente principal del panel de clima
function WeatherPanel({
  data, // datos del clima
  getTempValue, // función para formato de temperatura
  lunasData = [], // datos de lunas
  isLoggedIn, // si el usuario inició sesión
}) {

  // acceso rápido a datos actuales
  const current = data.current;

  // estados locales del componente
  const [isFavorite, setIsFavorite] = React.useState(false); // para el corazón
  const [localSavedList, setLocalSavedList] = React.useState([]); // lista de favoritos guardados aquí
  const [favoriteId, setFavoriteId] = React.useState(null); // id del último favorito agregado

  // función para manejar clic en el corazón (favorito)
  const handleFavoriteToggle = () => {
    // verificar si inició sesión
    if (!isLoggedIn) {
      alert("inicia sesión para guardar ubicaciones.");
      return;
    }

    // cambiar estado visual del corazón
    const newFavState = !isFavorite;
    setIsFavorite(newFavState);

    // lógica para agregar o quitar de la lista
    if (newFavState) {
      // si se marca: crear objeto y agregarlo a la lista local
      const newId = new Date().getTime();
      const newSavedForecast = {
        id: newId,
        city: data.city,
        state: data.state,
        date: current.date,
        time: current.time,
        temperatureC: current.temperatureC,
        condition: current.condition,
        minTempC: current.minTempC,
        maxTempC: current.maxTempC,
        humidity: current.humidity,
        pressure: current.pressure,
        visibility: current.visibility,
        clouds: current.clouds,
        windSpeed: current.windSpeed
      };
      setLocalSavedList(prevList => [newSavedForecast, ...prevList]);
      setFavoriteId(newId); // guardar id para poder quitarlo después
    } else {
      // si se desmarca: quitar el elemento de la lista usando el id guardado
      setLocalSavedList(prevList => prevList.filter(item => item.id !== favoriteId));
      setFavoriteId(null); // limpiar id
    }
  };

  // estructura html del componente
  return (
    <div className="app"> {/* contenedor general */}
      <section className="panel"> {/* panel principal azul */}

        {/* encabezado: ubicación, fecha, hora, corazón */}
        <div className="info-header">
          {/* ubicación */}
          <div className="location">
            <img className="icon-img" src="./img/pin.png" alt="" />
            <span>{data.city}, {data.state}</span>
          </div>
          {/* fecha y hora */}
          <div className="meta small">
            <span className="meta-item">
              <img className="icon-img" src="./img/calendar.png" alt="" />
              {data.current.date}
            </span>
            <span className="meta-item">
              <img className="icon-img" src="./img/clock.png" alt="" />
              {data.current.time}
            </span>
          </div>
          {/* corazón (solo visible si está logueado) */}
          {isLoggedIn && (
            <img
              className="icon-img favorite-icon"
              src={isFavorite ? './img/favorito.png' : './img/no-favorito.png'}
              alt="marcar como favorito"
              title={isFavorite ? "quitar favorito" : "guardar ubicación"}
              onClick={handleFavoriteToggle}
              style={{ cursor: 'pointer' }}
            />
          )}
        </div>

        {/* grid principal con tarjetas de clima */}
        <div className="grid">
           {/* tarjeta clima actual */}
           <div className="card now">
            <div className="topleft">
              <img className="thermo" src="./img/thermometer.png" alt="termómetro" />
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
          {/* tarjeta amanecer/atardecer */}
          <div className="card sun-card">
            <div className="item">
              <img className="sun-icon" src="./img/sunrise.png" alt="amanecer" />
              <div className="label">amanecer</div>
              <div className="k">{data.current.sunrise}</div>
            </div>
            <div className="item">
              <img className="sun-icon" src="./img/sunset.png" alt="atardecer" />
              <div className="label">atardecer</div>
              <div className="k">{data.current.sunset}</div>
            </div>
          </div>
          {/* tarjeta métricas detalladas */}
          <div className="card soft metrics">
            <div className="metric is-humidity">
              <img className="icon-img big" src="./img/humidity.png" alt="humedad" />
              <div className="k">humedad</div>
              <div className="v">{data.current.humidity}%</div>
            </div>
            <div className="metric">
              <img className="icon-img big" src="./img/clouds.png" alt="nubes" />
              <div className="k">nubes</div>
              <div className="v">{data.current.clouds}%</div>
            </div>
            <div className="metric">
              <img className="icon-img big" src="./img/pressure.png" alt="presión" />
              <div className="k">presión</div>
              <div className="v">{data.current.pressure} hpa</div>
            </div>
            <div className="metric">
              <img className="icon-img big" src="./img/visibility.png" alt="visibilidad" />
              <div className="k">visibilidad</div>
              <div className="v">{data.current.visibility} m</div>
            </div>
            <div className="metric">
              <img className="icon-img big" src="./img/wind.png" alt="viento" />
              <div className="k">viento</div>
              <div className="v">{data.current.windSpeed} m/s</div>
            </div>
          </div>
        </div>

        {/* sección pronóstico por horas */}
        <div className="forecast">
            <div className="flist">
            {/* mapear datos del pronóstico y mostrar cada item */}
            {data.forecast.map((item, index) => (
              <ForecastItem
                key={index}
                item={item}
                getTempValue={getTempValue}
              />
            ))}
          </div>
        </div>

        {/* sección fases lunares */}
        <div className="forecast moon-forecast">
            <div className="flist">
             {/* mapear datos de lunas y mostrar cada item */}
            {lunasData.map((luna, index) => (
              <div className="fitem moon-item" key={index}>
                <div className="t">{luna.dia}</div>
                <img className="wimg" src={luna.img} alt={luna.fase} />
                <div className="moon-phase">{luna.fase}</div>
              </div>
            ))}
          </div>
        </div>

        {/* sección ubicaciones guardadas (favoritos) */}
        {/* solo se muestra si inició sesión y hay elementos en la lista */}
        {isLoggedIn && localSavedList.length > 0 && (
          <div className="forecast saved-forecasts-container">
            <h2 className="forecast-title">ubicaciones guardadas</h2>
            <div className="saved-list">

              {/* mapear la lista de favoritos y mostrar cada tarjeta */}
              {localSavedList.map((savedItem) => (

                <div className="card saved-card" key={savedItem.id}> {/* tarjeta individual */}

                  {/* ubicación */}
                  <div className="saved-location-group">
                    <div className="saved-city">{savedItem.city}</div>
                    {/* subtítulo (fecha/hora eliminada) */}
                    <div className="saved-subtitle small">
                    </div>
                  </div>

                  {/* temperatura actual */}
                  <div className="saved-main-temp temp-value">
                    {getTempValue(savedItem.temperatureC)}
                  </div>

                  {/* condición del clima */}
                  <div className="saved-condition-group">
                    <div className="saved-condition">{savedItem.condition}</div>
                  </div>

                  {/* temperaturas min/max */}
                  <div className="saved-minmax-group small">
                     <span>máx: <b className="temp-value">{getTempValue(savedItem.maxTempC)}</b></span>
                     <span>mín: <b className="temp-value">{getTempValue(savedItem.minTempC)}</b></span>
                  </div>

                  {/* grupo de 5 métricas con iconos */}
                  <div className="saved-metrics-group small">
                    {/* humedad */}
                    <div className="metric-item">
                      <img className="metric-icon" src="./img/humidity.png" alt="humedad"/>
                      <b>{savedItem.humidity}%</b>
                    </div>
                     {/* visibilidad */}
                    <div className="metric-item">
                       <img className="metric-icon" src="./img/visibility.png" alt="visibilidad"/>
                      <b>{savedItem.visibility} m</b>
                    </div>
                     {/* nubes */}
                    <div className="metric-item">
                       <img className="metric-icon" src="./img/clouds.png" alt="nubes"/>
                      <b>{savedItem.clouds}%</b>
                    </div>
                    {/* presión */}
                    <div className="metric-item">
                       <img className="metric-icon" src="./img/pressure.png" alt="presión"/>
                      <b>{savedItem.pressure} hpa</b>
                    </div>
                    {/* viento */}
                     <div className="metric-item">
                       <img className="metric-icon" src="./img/wind.png" alt="viento"/>
                      <b>{savedItem.windSpeed} m/s</b>
                    </div>
                  </div>

                </div>
              ))}

            </div>
          </div>
        )}

      </section> {/* fin del panel principal azul */}
    </div>
  );
}

// exportar componente
export default WeatherPanel;