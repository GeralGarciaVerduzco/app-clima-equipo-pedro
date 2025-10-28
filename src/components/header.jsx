import React from 'react';

// Recibe el estado y los manejadores de eventos desde App.jsx
function Header({ isFahrenheit, handleTempToggle, isDarkMode, handleDarkModeToggle, isLoggedIn }) {

  return (
    <header className="topbar">
      <div className="topbar-content">
        <div className="brand">
          <img className="logo-img" src="./img/snowflake.png" alt="Logotipo HoneyFrost" />
          <span>HoneyFrost</span>
        </div>
        <div className="controls">
          <div className="search">
            <img className="sicon" src="./img/search.png" alt="Buscar" />
            <input placeholder="Buscar ubicación" />
            
            <div className="search-dropdown">
              <div className="dropdown-item">
                <img className="icon-img" src="./img/pin.png" alt="Reciente" />
                <span>Ciudad de México, MX</span>
              </div>
              <div className="dropdown-item">
                <img className="icon-img" src="./img/pin.png" alt="Reciente" />
                <span>Bogotá, CO</span>
              </div>
              <div className="dropdown-item">
                <img className="icon-img" src="./img/pin.png" alt="Sugerencia" />
                <span>Madrid, ES</span>
              </div>
              <div className="dropdown-item">
                <img className="icon-img" src="./img/pin.png" alt="Sugerencia" />
                <span>Buenos Aires, AR</span>
              </div>
            </div>
            </div>
          
          {/* TOGGLE DE TEMPERATURA: Controlado por isFahrenheit y handleTempToggle */}
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
                <span className="handle-c">C</span>
                <span className="handle-f">F</span>
              </span>
            </label>
          </div>

          {/* TOGGLE DE MODO OSCURO: Controlado por isDarkMode y handleDarkModeToggle */}
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

          {/* BOTÓN DE SESIÓN: Dinámico según el estado isLoggedIn */}
          <a href={isLoggedIn ? "/MiCuenta.html" : "/iniciar_sesion.html"} className="chip login-btn">
            {isLoggedIn ? "Mi Cuenta" : "Iniciar Sesión"}
          </a>
        </div>
      </div>
    </header>
  );
}
export default Header;
