import React from 'react';

function ForecastItem({ item, getTempValue }) {
  if (!item) return null;

  // soportar formatos viejos y nuevos
  const dayLabel =
    item.day ||
    item.label ||
    item.dia ||
    ''; // según tu data original

  const minC =
    typeof item.minTempC === 'number'
      ? item.minTempC
      : typeof item.min === 'number'
      ? item.min
      : null;

  const maxC =
    typeof item.maxTempC === 'number'
      ? item.maxTempC
      : typeof item.max === 'number'
      ? item.max
      : null;

  const icon = item.icon || item.img || item.iconPath || '/img/clouds.png';
  const condition = item.condition || item.text || '';

  return (
    <div className="fitem">
      <div className="t">{dayLabel}</div>
      <img className="wimg" src={icon} alt={condition} />
      <div className="cond">{condition}</div>
      <div className="minmax">
        <div>
          mín{' '}
          <b className="temp-value">
            {getTempValue && minC != null ? getTempValue(minC) : '--'}
          </b>
        </div>
        <div>
          máx{' '}
          <b className="temp-value">
            {getTempValue && maxC != null ? getTempValue(maxC) : '--'}
          </b>
        </div>
      </div>
    </div>
  );
}

export default ForecastItem;
