import React from 'react';

// componente de la barra superior
function Header({ 
  isFahrenheit, 
  handleTempToggle, 
  isDarkMode, 
  handleDarkModeToggle, 
  isLoggedIn,
  onLogout,        
  onLoginClick,      
  onHomeClick,        
  showSavedLocations,
  onToggleSaved      
}) {
  // recibe estados y funciones para los botones

  // estructura del header
  return (
  <header className="topbar">
    <div className="topbar-content">
      
      {/* IZQUIERDA: Logo */}
      <div className="brand" onClick={onHomeClick} title="Ir a Inicio">
        <img className="logo-img" src="/img/snowflake.png" alt="Logotipo HoneyFrost" />
        <span>HoneyFrost</span>
      </div>

      {/* CENTRO: Barra de búsqueda */}
      <div className="search">
        <img className="sicon" src="/img/search.png" alt="Buscar" />
        <input placeholder="Buscar ubicación" />
        <div className="search-dropdown">
          <div className="dropdown-item">
            <img className="icon-img" src="/img/pin.png" alt="Reciente" />
            <span>Ciudad de México, MX</span>
          </div>
          <div className="dropdown-item">
            <img className="icon-img" src="/img/pin.png" alt="Reciente" />
            <span>Bogotá, CO</span>
          </div>
        </div>
      </div>

      {/* DERECHA: Controles */}
      <div className="controls">
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
        <div className="toggle-container">
          <input
            type="checkbox"
            id="dark-mode-toggle"
            className="toggle-dark"
            checked={isDarkMode}
            onChange={handleDarkModeToggle}
          />
          <label htmlFor="dark-mode-toggle" className="slider">
            <span className="icon"></span>
          </label>
        </div>
        <button 
          className="chip" 
          onClick={onToggleSaved}
          title={showSavedLocations ? "Ocultar guardados" : "Mostrar guardados"}
        >
          {showSavedLocations ? "Ocultar ⭐" : "Mostrar ⭐"}
        </button>
        {isLoggedIn ?  (
          <a href="#" onClick={onLogout} className="chip login-btn">Cerrar Sesión</a>
        ) : (
          <a href="#" onClick={onLoginClick} className="chip login-btn">Iniciar Sesión</a>
        )}
      </div>

    </div>
  </header>
);
}
// exportar
export default Header;