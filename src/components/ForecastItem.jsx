import React from 'react';

// componente para mostrar un item del pronóstico por hora
function ForecastItem({ item, getTempValue }) {
  // item: datos de la hora (hora, icono, temps)
  // getTempValue: función para mostrar temp en °c o °f

  // estructura html de la tarjeta de pronóstico
  return (
    <div className="fitem">
      <div className="t">{item.time}</div>
      <img className="wimg" src={item.icon} alt="clima" />
      <div className="mmv">
        <div> mín <b className="row temp-value">{getTempValue(item.minC)}</b></div>
        <div> máx <b className="row temp-value">{getTempValue(item.maxC)}</b></div>
      </div>
    </div>
  );
}

// exportar para usarlo en otros lados
export default ForecastItem;