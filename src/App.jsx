import React, { useState, useEffect } from 'react';
// Importa los datos simulados
import { climaCiudad, lunasSemana } from './data'; // <-- Asegúrate que 'lunasSemana' esté importado
// Importa todos los estilos globales
import './App.css'; 

// Importación de los 4 componentes de página
import WeatherPanel from './components/WeatherPanel';
import LoginScreen from './components/LoginScreen'; 
import RegisterScreen from './components/RegisterScreen'; 
import PresentationScreen from './components/PresentationScreen';

/**
 * Función que convierte Celsius a Fahrenheit.
 * @param {number} celsius - Temperatura en Celsius.
 * @returns {number} Temperatura en Fahrenheit.
 */
const celsiusToFahrenheit = (celsius) => (celsius * 9 / 5 + 32);

// --- Componente Principal de la Aplicación ---
function App() {
  // Carga los datos de clima
  const data = climaCiudad; 

  // --- Lógica de Estado Global ---
  
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');
  
  const [currentPage, setCurrentPage] = useState(isLoggedIn ? 'home' : 'welcome');
  
  const [isFahrenheit, setIsFahrenheit] = useState(false);
  
  const [isDarkMode, setIsDarkMode] = useState(false); 

  // --- Handlers y Efectos ---

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.add('app-container')
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.remove('app-container')
    }
  }, [isDarkMode]);

  const handleDarkModeToggle = () => {
    setIsDarkMode(prev => !prev);
  };
  
  const handleTempToggle = () => {
    setIsFahrenheit(prev => !prev);
  };

  const getTempValue = (celsiusValue) => {
    if (typeof celsiusValue !== 'number') return '--';
    
    if (isFahrenheit) {
      const fahrenheitValue = celsiusToFahrenheit(celsiusValue);
      return `${fahrenheitValue.toFixed(1)} °F`;
    } else {
      return `${celsiusValue.toFixed(1)} °C`;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedIn'); 
    setIsLoggedIn(false);
    setCurrentPage('welcome'); 
  };


  // --- Función de Enrutamiento (Routing) ---
  const renderPage = () => {
    switch(currentPage) {
      case 'welcome':
        return (
          <PresentationScreen
            onNavigate={setCurrentPage} 
            onGuestLogin={() => setCurrentPage('home')} 
          />
        );
      case 'login':
        return <LoginScreen 
                 onLoginSuccess={() => {
                   localStorage.setItem('loggedIn', 'true');
                   setIsLoggedIn(true);
                   setCurrentPage('home');
                 }}
                 onNavigateToRegister={() => setCurrentPage('register')} 
               />;
      case 'register':
        return <RegisterScreen 
                 onRegisterSuccess={() => {
                    localStorage.setItem('loggedIn', 'true');
                    setIsLoggedIn(true);
                    setCurrentPage('home');
                 }}
                 onNavigateToLogin={() => setCurrentPage('login')}
               />;
      case 'home':
      default:
        // --- ESTA ES LA PARTE IMPORTANTE ---
        // Fíjate que aquí YA NO HAY CÓDIGO DE LUNAS.
        // Solo renderiza el WeatherPanel y le pasa 'lunasSemana' como prop.
        return (
          <div className="app">
            <WeatherPanel 
              data={data} 
              getTempValue={getTempValue} 
              lunasData={lunasSemana} 
            />
          </div>
        );
    }
  }

  // --- Renderizado Principal (El Contenedor de la Aplicación) ---
  return (
    <div className="app-container">
      
      {/* HEADER (TOPBAR) */}
      {currentPage === 'home' && (
        <header className="topbar">
          <div className="topbar-content">
            
            <div className="brand" onClick={() => setCurrentPage('home')} title="Ir a Inicio">
              <img className="logo-img" src="./img/snowflake.png" alt="Logotipo HoneyFrost" />
              <span>HoneyFrost</span>
            </div>
            
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
              </div>
            </div>

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

              {isLoggedIn ? (
                <a href="#" onClick={handleLogout} className="chip login-btn">Cerrar Sesión</a>
              ) : (
                <a href="#" onClick={() => setCurrentPage('login')} className="chip login-btn">Iniciar Sesión</a>
              )}

            </div>
          </div>
        </header>
      )}

      {/* CONTENIDO PRINCIPAL */}
      {renderPage()}
      
    </div>
  );
}

export default App;