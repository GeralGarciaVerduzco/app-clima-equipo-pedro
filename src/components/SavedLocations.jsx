import React, { useEffect, useState, useMemo } from "react";

function readSaved() {
  const a = localStorage.getItem("savedLocations");
  const b = localStorage.getItem("favorites");
  try {
    const ja = a ? JSON.parse(a) : [];
    const jb = b ? JSON.parse(b) : [];
    const arr = Array.isArray(ja) ? ja : [];
    const arr2 = Array.isArray(jb) ? jb : [];
    const merged = [...arr, ...arr2];
    const seen = new Set();
    const unique = merged.filter((x) => {
      const k = JSON.stringify({ city: x.city || x.name, country: x.country });
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
    return unique;
  } catch {
    return [];
  }
}

function normalize(item) {
  const current = item.current || item.weather || {};
  return {
    city: item.city || item.name || "—",
    country: item.country || item.sys?.country || "",
    condition: current.condition || current.description || item.condition || "—",
    tempC:
      typeof current.temperatureC === "number"
        ? current.temperatureC
        : typeof current.tempC === "number"
        ? current.tempC
        : typeof current.temp === "number"
        ? current.temp
        : undefined,
    minC:
      typeof current.minTempC === "number"
        ? current.minTempC
        : typeof current.minC === "number"
        ? current.minC
        : undefined,
    maxC:
      typeof current.maxTempC === "number"
        ? current.maxTempC
        : typeof current.maxC === "number"
        ? current.maxC
        : undefined,
  };
}

export default function SavedLocations({ isFahrenheit, getTempValue }) {
  const [items, setItems] = useState(() => readSaved());

  useEffect(() => {
    const id = setInterval(() => {
      setItems(readSaved());
    }, 800);
    return () => clearInterval(id);
  }, []);

  const list = useMemo(() => items.map(normalize), [items]);

  if (!list.length) return null;

  return (
    <section className="saved-forecasts-container container-pad">
      <div className="forecast-title">Ubicaciones guardadas</div>
      <div className="saved-list">
        {list.map((it, idx) => (
          <div key={idx} className="saved-card">
            <div className="saved-location-group">
              <div className="saved-city">{it.city}</div>
              <div className="saved-subtitle">{it.country}</div>
            </div>
            <div className="saved-main-temp">
              {typeof it.tempC === "number" ? getTempValue(it.tempC) : "—"}
            </div>
            <div className="saved-condition-group">
              <div className="saved-condition">{it.condition}</div>
            </div>
            <div className="saved-minmax-group">
              <span>
                Min: <span className="temp-value">{typeof it.minC === "number" ? getTempValue(it.minC) : "—"}</span>
              </span>
              <span>
                Max: <span className="temp-value">{typeof it.maxC === "number" ? getTempValue(it.maxC) : "—"}</span>
              </span>
            </div>
            <div className="saved-metrics-group"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
