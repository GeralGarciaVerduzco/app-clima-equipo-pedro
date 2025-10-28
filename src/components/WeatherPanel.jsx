import React from 'react';
// ESTE ES EL ÚNICO IMPORT QUE NECESITAS (además de React)
import ForecastItem from './ForecastItem'; 

// Fíjate cómo recibe 'data' y 'lunasData' como props (parámetros).
// Les ponemos '= []' para evitar errores si no llegan.
function WeatherPanel({ data, getTempValue, lunasData = [] }) {
  
  // No necesitamos 'climaCiudad' aquí, usamos la prop 'data'
  const current = data.current; 

  return (
    <div className="app">
      {/* El 'className="app"' de aquí envuelve todo, 
          pero el CSS principal ya está cargado por App.js */}
      <section className="panel">
        
        {/* INFO HEADER */}
        <div className="info-header">
          <div className="location">
            <img className="icon-img" src="./img/pin.png" alt="" />
            <span>{data.city}, {data.state}</span>
          </div>
    
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
        </div>

        {/* GRID DE TARJETAS */}
        <div className="grid">
          
          {/* CARD 1: CLIMA ACTUAL */}
          <div className="card now">
            <div className="topleft">
              <img className="thermo" src="./img/thermometer.png" alt="Termómetro" />
              <div className="temp temp-value">
                {getTempValue(data.current.temperatureC)}
              </div>
            </div>
            <div className="minmax">
              <div>Mín <b className="temp-value">{getTempValue(data.current.minTempC)}</b></div>
              <div>Máx <b className="temp-value">{getTempValue(data.current.maxTempC)}</b></div>
            </div>
            <div className="statusblock">
              <div className="status">{data.current.condition}</div>
              <div className="feels">Se siente como <b className="temp-value">{getTempValue(data.current.feelsLikeC)}</b></div>
            </div>
            <div className="wicon">
              <img src={data.current.icon} alt={data.current.condition} />
            </div>
          </div>

          {/* CARD 2: AMANECER/ATARDECER */}
          <div className="card sun-card">
            <div className="item">
              <img className="sun-icon" src="./img/sunrise.png" alt="Amanecer" />
              <div className="label">Amanecer</div>
              <div className="k">{data.current.sunrise}</div>
            </div>
            <div className="item">
              <img className="sun-icon" src="./img/sunset.png" alt="Atardecer" />
              <div className="label">Atardecer</div>
              <div className="k">{data.current.sunset}</div>
            </div>
          </div>

          {/* CARD 3: MÉTRICAS DETALLADAS */}
          <div className="card soft metrics">
            <div className="metric is-humidity">
              <img className="icon-img big" src="./img/humidity.png" alt="Humedad" />
              <div className="k">Humedad</div>
              <div className="v">{data.current.humidity}%</div>
            </div>
            <div className="metric">
              <img className="icon-img big" src="./img/clouds.png" alt="Nubes" />
              <div className="k">Nubes</div>
              <div className="v">{data.current.clouds}%</div>
            </div>
            <div className="metric">
              <img className="icon-img big" src="./img/pressure.png" alt="Presión" />
              <div className="k">Presión</div>
              <div className="v">{data.current.pressure} hPa</div>
            </div>
            <div className="metric">
              <img className="icon-img big" src="./img/visibility.png" alt="Visibilidad" />
              <div className="k">Visibilidad</div>
              <div className="v">{data.current.visibility} m</div>
            </div>
            <div className="metric">
              <img className="icon-img big" src="./img/wind.png" alt="Viento" />
              <div className="k">Viento</div>
              <div className="v">{data.current.windSpeed} m/s</div>
            </div>
          </div>
        </div>

        {/* PRONÓSTICO (FORECAST) - Horas */}
        <div className="forecast">
          <div className="flist">
            {data.forecast.map((item, index) => (
              <ForecastItem 
                key={index} 
                item={item} 
                getTempValue={getTempValue} 
              />
            ))}
          </div>
        </div>

        {/* SECCIÓN DE LUNAS */}
        <div className="forecast moon-forecast">
              
          
          <div className="flist">
            
            {/* Aquí usamos la prop 'lunasData' */}
            {lunasData.map((luna, index) => (
              
              <div className="fitem moon-item" key={index}> 
                <div className="t">{luna.dia}</div>
                <img className="wimg" src={luna.img} alt={luna.fase} />
                <div className="moon-phase">{luna.fase}</div>
              </div>

            ))}
          </div>
        </div>
        {/* --- FIN: NUEVA SECCIÓN DE LUNAS --- */}

      </section>
    </div>
  );
}

export default WeatherPanel;