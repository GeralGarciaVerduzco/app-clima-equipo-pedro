import React, { useState, useEffect } from 'react';
import { climaCiudad, lunasSemana } from './data';
import './App.css';
import WeatherPanel from './pages/WeatherPanel';
import LoginScreen from './pages/auth/LoginScreen';
import RegisterScreen from './pages/auth/RegisterScreen';
import PresentationScreen from './pages/presentation/PresentationScreen';
import SavedLocations from './components/SavedLocations';
import Header from './components/header';

// auth client
import { setAuthToken } from './api/client';


import { getCurrentWeatherForPanel, searchLocations } from './api/weather';

const celsiusToFahrenheit = (celsius) => (celsius * 9 / 5 + 32);

function App() {
  const [showSavedLocations, setShowSavedLocations] = useState(true);
  const data = climaCiudad; // fallback hardcodeada

  // auth
  const initialToken =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  const [isLoggedIn, setIsLoggedIn] = useState(!!initialToken);
  const [currentPage, setCurrentPage] = useState(
    initialToken ? 'home' : 'welcome',
  );
  const [isFahrenheit, setIsFahrenheit] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 🔹 estado del clima (lo que verá WeatherPanel)
  const [weatherData, setWeatherData] = useState(data); // empieza con climaCiudad
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState('');

  // 🔹 estado de la búsqueda (Header)
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const handleToggleSavedLocations = () => {
    setShowSavedLocations((prev) => !prev);
  };

  useEffect(() => {
    if (initialToken) {
      setAuthToken(initialToken);
    }
  }, []);

  useEffect(() => {
    if (currentPage === 'home') {
      document.body.classList.add('home-page-styles');
      if (isDarkMode) {
        document.body.classList.add('dark-mode');
        document.body.classList.add('app-container');
      } else {
        document.body.classList.remove('dark-mode');
        document.body.classList.remove('app-container');
      }
    } else {
      document.body.classList.remove('home-page-styles');
      document.body.classList.remove('dark-mode');
      document.body.classList.remove('app-container');
    }
  }, [isDarkMode, currentPage]);

  const handleDarkModeToggle = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleTempToggle = () => {
    setIsFahrenheit((prev) => !prev);
  };

  const getTempValue = (celsiusValue) => {
    if (typeof celsiusValue !== 'number') return '--';
    if (isFahrenheit) {
      const f = celsiusToFahrenheit(celsiusValue);
      return `${f.toFixed(1)} °F`;
    } else {
      return `${celsiusValue.toFixed(1)} °C`;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('loggedIn');
    setAuthToken(null);
    setIsLoggedIn(false);
    setCurrentPage('welcome');
  };

  const handleLoginSuccess = ({ accessToken, refreshToken } = {}) => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }
      setAuthToken(accessToken);
      setIsLoggedIn(true);
      setCurrentPage('home');
    } else {
      const token = localStorage.getItem('accessToken');
      if (token) {
        setAuthToken(token);
        setIsLoggedIn(true);
        setCurrentPage('home');
      }
    }
  };

  const handleRegisterSuccess = ({ accessToken, refreshToken } = {}) => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }
      setAuthToken(accessToken);
      setIsLoggedIn(true);
      setCurrentPage('home');
    } else {
      const token = localStorage.getItem('accessToken');
      if (token) {
        setAuthToken(token);
        setIsLoggedIn(true);
        setCurrentPage('home');
      }
    }
  };

  // 🔹 helper para cargar clima por coordenadas
  const loadWeatherByCoords = async (lat, lon, meta) => {
    try {
      setWeatherLoading(true);
      setWeatherError('');

      const units = isFahrenheit ? 'imperial' : 'metric';
      const apiData = await getCurrentWeatherForPanel(lat, lon, units);

      if (meta) {
        apiData.city = meta.name || apiData.city;
        apiData.state = meta.state || meta.countryCode || apiData.state;
      }

      setWeatherData(apiData);
    } catch (err) {
      console.error('Error cargando clima:', err);
      setWeatherError('No se pudo cargar el clima desde la API.');
      // fallback hardcodeado si algo sale mal
      setWeatherData(data);
    } finally {
      setWeatherLoading(false);
    }
  };

  // 🔹 cargar clima inicial al entrar a la app
  useEffect(() => {
    // Cancún aprox; cámbialo si quieres otro default
    loadWeatherByCoords(21.1619, -86.8515);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 🔍 búsqueda: actualiza campo
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // 🔍 búsqueda: submit desde Header
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;

    setSearchLoading(true);
    setWeatherError('');
    setSearchResults([]);

    try {
      const results = await searchLocations(q);
      setSearchResults(results || []);

      // si solo hay un resultado, puedes cargarlo directo
      if (results && results.length === 1) {
        const loc = results[0];
        await loadWeatherByCoords(loc.lat, loc.lon, loc);
        setSearchResults([]);
        setSearchQuery(
          `${loc.name}${
            loc.state ? ', ' + loc.state : ''
          }${loc.countryCode ? ', ' + loc.countryCode : ''}`,
        );
      }
    } catch (err) {
      console.error('Error en búsqueda:', err);
      setWeatherError('Ocurrió un error al buscar la ciudad.');
    } finally {
      setSearchLoading(false);
    }
  };

  // 🔍 click en un resultado del dropdown
  const handleSearchResultClick = async (loc) => {
    await loadWeatherByCoords(loc.lat, loc.lon, loc);
    setSearchResults([]);
    setSearchQuery(
      `${loc.name}${
        loc.state ? ', ' + loc.state : ''
      }${loc.countryCode ? ', ' + loc.countryCode : ''}`,
    );
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'welcome':
        return (
          <PresentationScreen
            onNavigate={setCurrentPage}
            onGuestLogin={() => setCurrentPage('home')}
          />
        );
      case 'login':
        return (
          <LoginScreen
            onLoginSuccess={handleLoginSuccess}
            onNavigateToRegister={() => setCurrentPage('register')}
          />
        );
      case 'register':
        return (
          <RegisterScreen
            onRegisterSuccess={handleRegisterSuccess}
            onNavigateToLogin={() => setCurrentPage('login')}
          />
        );
      case 'home':
      default:
        return (
          <div className="app">
            {/* Mensajes de carga/error opcionales */}
            {weatherLoading && (
              <div className="status-banner">Cargando clima...</div>
            )}
            {weatherError && (
              <div className="status-banner error">{weatherError}</div>
            )}

            <WeatherPanel
              data={weatherData}
              getTempValue={getTempValue}
              lunasData={lunasSemana}
              isLoggedIn={isLoggedIn}
            />
          </div>
        );
    }
  };

  return (
    <div className="app-container">
      {currentPage === 'home' && (
        <Header
          isFahrenheit={isFahrenheit}
          handleTempToggle={handleTempToggle}
          isDarkMode={isDarkMode}
          handleDarkModeToggle={handleDarkModeToggle}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          onLoginClick={() => setCurrentPage('login')}
          onHomeClick={() => setCurrentPage('home')}
          showSavedLocations={showSavedLocations}
          onToggleSaved={handleToggleSavedLocations}

          // 🔹 props de búsqueda
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
          searchLoading={searchLoading}
          searchResults={searchResults}
          onSearchResultClick={handleSearchResultClick}
        />
      )}

      {currentPage === 'home' && showSavedLocations && (
        <SavedLocations
          isFahrenheit={isFahrenheit}
          getTempValue={getTempValue}
        />
      )}

      {renderPage()}
    </div>
  );
}

export default App;
