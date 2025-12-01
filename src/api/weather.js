import api from './client';

export async function getFullWeatherByCoordsRaw(lat, lon, units = 'metric') {
  const res = await api.get('/weather/full/by-coords', {
    params: { lat, lon, units },
  });
  return res.data;
}

export async function searchLocations(query) {
  const res = await api.get('/weather/search', {
    params: { q: query },
  });
  return res.data;
}


function makeLocalDateFromUtcSeconds(dtUtcSeconds, offsetSeconds = 0) {
  // dtUtcSeconds está en UTC, offsetSeconds es lo que devuelve OpenWeather
  // (ej: -18000 para Cancún)
  return new Date((dtUtcSeconds + offsetSeconds) * 1000);
}


/**
 * Daily forecast a partir de forecast.list (cada 3h).
 * Agrupa por día local (según offset).
 */
function buildDailyFromForecastList(list, tzOffsetSeconds = 0) {
  const byDate = new Map();

  list.forEach((item) => {
    const dtLocal = makeLocalDateFromUtcSeconds(item.dt, tzOffsetSeconds);
    const dateKey = dtLocal.toISOString().slice(0, 10); // YYYY-MM-DD

    const temp = item.main?.temp;
    if (!byDate.has(dateKey)) {
      byDate.set(dateKey, {
        date: dtLocal,
        min: temp,
        max: temp,
        sample: item,
      });
    } else {
      const entry = byDate.get(dateKey);
      if (typeof temp === 'number') {
        if (entry.min == null || temp < entry.min) entry.min = temp;
        if (entry.max == null || temp > entry.max) entry.max = temp;
      }
    }
  });

  return Array.from(byDate.values())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map((entry) => {
      const { date, min, max, sample } = entry;
      const dayShort = date.toLocaleDateString('es-MX', { weekday: 'short' });

      const iconCode =
        (Array.isArray(sample.weather) && sample.weather[0]?.icon) || '01d';
      const condition =
        (Array.isArray(sample.weather) && sample.weather[0]?.description) ||
        'Desconocido';

      return {
        // campos que usa tu ForecastItem (nuevo)
        day: dayShort,                            // ej: "lun."
        dateLabel: date.toLocaleDateString('es-MX'),
        minTempC: min,
        maxTempC: max,
        condition,
        icon: `https://openweathermap.org/img/wn/${iconCode}@2x.png`,
      };
    });
}

/**
 * Mapea /weather + /forecast al formato que usa WeatherPanel.
 */
export function mapBackendWeatherToPanel(raw) {
  if (!raw || !raw.payload) {
    throw new Error('Respuesta de clima inválida');
  }

  const { location, payload } = raw;
  const currentSrc = payload.current;
  const forecastSrc = payload.forecast;

  if (!currentSrc || !forecastSrc) {
    throw new Error('Falta current o forecast en el payload');
  }

  // 🔹 offset de zona horaria en segundos (localidad, no PC)
  const tzOffset =
    currentSrc.timezone ??
    forecastSrc.city?.timezone ??
    0;

  const city = currentSrc.name || location?.name || 'Ubicación';
  const state = currentSrc.sys?.country || location?.countryCode || '';

  const temperatureC =
    typeof currentSrc.main?.temp === 'number' ? currentSrc.main.temp : null;
  const feelsLikeC =
    typeof currentSrc.main?.feels_like === 'number'
      ? currentSrc.main.feels_like
      : null;
  const minTempC =
    typeof currentSrc.main?.temp_min === 'number'
      ? currentSrc.main.temp_min
      : temperatureC;
  const maxTempC =
    typeof currentSrc.main?.temp_max === 'number'
      ? currentSrc.main.temp_max
      : temperatureC;

  const condition =
    (Array.isArray(currentSrc.weather) &&
      currentSrc.weather[0]?.description) ||
    'Desconocido';

  const iconCode =
    (Array.isArray(currentSrc.weather) && currentSrc.weather[0]?.icon) || '01d';
  const icon = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const humidity = currentSrc.main?.humidity ?? null;
  const pressure = currentSrc.main?.pressure ?? null;
  const visibility = currentSrc.visibility ?? null;
  const windSpeed = currentSrc.wind?.speed ?? null;
  const clouds = currentSrc.clouds?.all ?? null;

  const sunriseTs = currentSrc.sys?.sunrise ?? null;
  const sunsetTs = currentSrc.sys?.sunset ?? null;

  const sunriseDate = sunriseTs
    ? makeLocalDateFromUtcSeconds(sunriseTs, tzOffset)
    : null;
  const sunsetDate = sunsetTs
    ? makeLocalDateFromUtcSeconds(sunsetTs, tzOffset)
    : null;

  const sunrise = sunriseDate
    ? sunriseDate.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
    : '--';
  const sunset = sunsetDate
    ? sunsetDate.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
    : '--';

 const refDate = makeLocalDateFromUtcSeconds(currentSrc.dt, tzOffset);

const dateStr = refDate.toLocaleDateString('es-MX', {
  weekday: 'long',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  timeZone: 'UTC',            // 👈 IMPORTANTE
});

const timeStr = refDate.toLocaleTimeString('es-MX', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'UTC',            // 👈 IMPORTANTE
});


  const list = Array.isArray(forecastSrc.list) ? forecastSrc.list : [];

  // 🔹 hourly = 8 bloques de 3h (24h) en hora local
  const hourly = list.slice(0, 8).map((item) => {
    const dtLocal = makeLocalDateFromUtcSeconds(item.dt, tzOffset);
    const hourLabel = dtLocal.toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const hIconCode =
      (Array.isArray(item.weather) && item.weather[0]?.icon) || iconCode;
    const hCondition =
      (Array.isArray(item.weather) && item.weather[0]?.description) ||
      'Desconocido';

    return {
      time: hourLabel,
      temperatureC: item.main?.temp ?? null,
      feelsLikeC: item.main?.feels_like ?? null,
      condition: hCondition,
      icon: `https://openweathermap.org/img/wn/${hIconCode}@2x.png`,
      humidity: item.main?.humidity ?? null,
      windSpeed: item.wind?.speed ?? null,
    };
  });

  // 🔹 daily = agrupación por día local
  const forecast = buildDailyFromForecastList(list, tzOffset).slice(0, 7);

  return {
    city,
    state,
    lat: currentSrc.coord?.lat ?? location?.lat ?? null,
    lon: currentSrc.coord?.lon ?? location?.lon ?? null,
    timezoneOffsetSeconds: tzOffset,   // 👈 lo usaremos para luna
    current: {
      temperatureC,
      minTempC,
      maxTempC,
      feelsLikeC,
      condition,
      icon,
      humidity,
      pressure,
      visibility,
      clouds,
      windSpeed,
      sunrise,
      sunset,
      date: dateStr,
      time: timeStr,
    },
    hourly,
    forecast,
  };
}

export async function getCurrentWeatherForPanel(lat, lon, units = 'metric') {
  const raw = await getFullWeatherByCoordsRaw(lat, lon, units);
  return mapBackendWeatherToPanel(raw);
}
