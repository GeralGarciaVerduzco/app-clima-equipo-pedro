import React from 'react';

// Recibe el ítem de pronóstico y el conversor de temperatura
function ForecastItem({ item, getTempValue }) {
  return (
    <div className="fitem">
      <div className="t">{item.time}</div>
      <img className="wimg" src={item.icon} alt="Clima" />
      <div className="mmv">
        {/* Usamos el conversor para mostrar C o F */}
        <div> mín <b className="row temp-value">{getTempValue(item.minC)}</b></div>
        <div> máx <b className="row temp-value">{getTempValue(item.maxC)}</b></div>
      </div>
    </div>
  );
}

export default ForecastItem;
