import React from 'react';

// componente de la barra superior
function Header({ isFahrenheit, handleTempToggle, isDarkMode, handleDarkModeToggle, isLoggedIn }) {
  // recibe estados y funciones para los botones

  // estructura del header
  return (
    <header className="topbar">
      <div className="topbar-content">

        {/* sección izquierda: logo y nombre */}
        <div className="brand">
          <img className="logo-img" src="./img/snowflake.png" alt="logotipo honeyfrost" />
          <span>honeyfrost</span>
        </div>

        {/* sección derecha: controles */}
        <div className="controls">

          {/* barra para buscar */}
          <div className="search">
            <img className="sicon" src="./img/search.png" alt="buscar" />
            <input placeholder="buscar ubicación" />

            {/* sugerencias de búsqueda */}
            <div className="search-dropdown">
              <div className="dropdown-item">
                <img className="icon-img" src="./img/pin.png" alt="reciente" />
                <span>ciudad de méxico, mx</span>
              </div>
              <div className="dropdown-item">
                <img className="icon-img" src="./img/pin.png" alt="reciente" />
                <span>bogotá, co</span>
              </div>
              <div className="dropdown-item">
                <img className="icon-img" src="./img/pin.png" alt="sugerencia" />
                <span>madrid, es</span>
              </div>
              <div className="dropdown-item">
                <img className="icon-img" src="./img/pin.png" alt="sugerencia" />
                <span>buenos aires, ar</span>
              </div>
            </div>
          </div>

          {/* botón c/f */}
          <div className="toggle-container">
            <input
              type="checkbox"
              id="temp-toggle"
              className="toggle-temp-checkbox"
              checked={isFahrenheit}
              onChange={handleTempToggle}
            />
            <label htmlFor="temp-toggle" className="slider temp-slider">
              <span className="handle">
                <span className="handle-c">c</span>
                <span className="handle-f">f</span>
              </span>
            </label>
          </div>

          {/* botón modo oscuro */}
          <div className="toggle-container">
            <input
              type="checkbox"
              id="dark-mode-toggle"
              className="toggle-dark"
              checked={isDarkMode}
              onChange={handleDarkModeToggle}
            />
            <label htmlFor="dark-mode-toggle" className="slider"></label>
          </div>

          {/* botón sesión */}
          <a href={isLoggedIn ? "/micuenta.html" : "/iniciar_sesion.html"} className="chip login-btn">
            {isLoggedIn ? "mi cuenta" : "iniciar sesión"}
          </a>
        </div>
      </div>
    </header>
  );
}
// exportar
export default Header;