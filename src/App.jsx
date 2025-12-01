import React, { useState, useEffect } from 'react';
import { climaCiudad, lunasSemana } from './data';
import './App.css';
import WeatherPanel from './pages/WeatherPanel';
import LoginScreen from './pages/auth/LoginScreen';
import RegisterScreen from './pages/auth/RegisterScreen';
import PresentationScreen from './pages/presentation/PresentationScreen';
import SavedLocations from './components/SavedLocations';
import Header from './components/header';

const celsiusToFahrenheit = (celsius) => (celsius * 9 / 5 + 32);

function App() {
  const [showSavedLocations, setShowSavedLocations] = useState(true);
  const data = climaCiudad;
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');
  const [currentPage, setCurrentPage] = useState(isLoggedIn ? 'home' : 'welcome');
  const [isFahrenheit, setIsFahrenheit] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleSavedLocations = () => {
  setShowSavedLocations((prev) => !prev);
};

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
    localStorage.removeItem('loggedIn');
    setIsLoggedIn(false);
    setCurrentPage('welcome');
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
            onLoginSuccess={() => {
              localStorage.setItem('loggedIn', 'true');
              setIsLoggedIn(true);
              setCurrentPage('home');
            }}
            onNavigateToRegister={() => setCurrentPage('register')}
          />
        );
      case 'register':
        return (
          <RegisterScreen
            onRegisterSuccess={() => {
              localStorage.setItem('loggedIn', 'true');
              setIsLoggedIn(true);
              setCurrentPage('home');
            }}
            onNavigateToLogin={() => setCurrentPage('login')}
          />
        );
      case 'home':
      default:
        return (
          <div className="app">
            <WeatherPanel
              data={data}
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
        />
      )}
      {currentPage === 'home' && showSavedLocations && (
  <SavedLocations isFahrenheit={isFahrenheit} getTempValue={getTempValue} />
)}
      {renderPage()}
    </div>
  );
}

export default App;