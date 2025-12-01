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
  onToggleSaved,
  // 🔹 NUEVO: props de búsqueda
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  searchLoading,
  searchResults = [],
  onSearchResultClick,
}) {
  return (
    <header className="topbar">
      <div className="topbar-content">
        {/* IZQUIERDA: Logo */}
        <div className="brand" onClick={onHomeClick} title="Ir a Inicio">
          <img
            className="logo-img"
            src="/img/snowflake.png"
            alt="Logotipo HoneyFrost"
          />
          <span>HoneyFrost</span>
        </div>

        {/* CENTRO: Barra de búsqueda */}
        <form className="search" onSubmit={onSearchSubmit}>
          <img className="sicon" src="/img/search.png" alt="Buscar" />
          <input
            placeholder="Buscar ubicación"
            value={searchQuery}
            onChange={onSearchChange}
          />
          <button
            type="submit"
            className="search-btn"
            disabled={searchLoading}
          >
            {searchLoading ? '...' : 'Buscar'}
          </button>

          {/* Dropdown de resultados */}
          {searchResults.length > 0 && (
            <div className="search-dropdown">
              {searchResults.map((loc, index) => (
                <div
                  key={`${loc.name}-${loc.lat}-${loc.lon}-${index}`}
                  className="dropdown-item"
                  onClick={() =>
                    onSearchResultClick && onSearchResultClick(loc)
                  }
                >
                  <img
                    className="icon-img"
                    src="/img/pin.png"
                    alt="Resultado"
                  />
                  <span>
                    {loc.name}
                    {loc.state ? `, ${loc.state}` : ''}
                    {loc.countryCode ? `, ${loc.countryCode}` : ''}
                  </span>
                </div>
              ))}
            </div>
          )}
        </form>

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
            title={
              showSavedLocations ? 'Ocultar guardados' : 'Mostrar guardados'
            }
          >
            {showSavedLocations ? 'Ocultar ⭐' : 'Mostrar ⭐'}
          </button>
          {isLoggedIn ? (
            <a href="#" onClick={onLogout} className="chip login-btn">
              Cerrar Sesión
            </a>
          ) : (
            <a href="#" onClick={onLoginClick} className="chip login-btn">
              Iniciar Sesión
            </a>
          )}
        </div>
      </div>
    </header>
  );
}

// exportar
export default Header;
