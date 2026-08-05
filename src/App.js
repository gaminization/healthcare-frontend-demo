// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import worldData from './worldData';
import whoLogo from './assets/who-logo.png';
import HealthPredictor from './HealthPredictor';
import Projects from './Projects';
import Volunteering from './Volunteering';
import News from './News';
import Auth from './Auth';
import Profile from './Profile';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  const translations = {
    en: {
      home: 'Home',
      projects: 'Projects',
      volunteering: 'Volunteering',
      healthPredictor: 'Health Predictor',
      news: 'News',
      mode: 'MODE',
      language: 'Language',
      covid19: 'COVID-19',
      cancer: 'Cancer',
      hiv: 'HIV',
      cases: 'cases'
    },
    es: {
      home: 'Inicio',
      projects: 'Proyectos',
      volunteering: 'Voluntariado',
      healthPredictor: 'Predictor de Salud',
      news: 'Noticias',
      mode: 'MODO',
      language: 'Idioma',
      covid19: 'COVID-19',
      cancer: 'Cáncer',
      hiv: 'VIH',
      cases: 'casos'
    },
    fr: {
      home: 'Accueil',
      projects: 'Projets',
      volunteering: 'Bénévolat',
      healthPredictor: 'Prédicteur de Santé',
      news: 'Actualités',
      mode: 'MODE',
      language: 'Langue',
      covid19: 'COVID-19',
      cancer: 'Cancer',
      hiv: 'VIH',
      cases: 'cas'
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  const handleRegionClick = (region, x, y) => {
    setPopupPosition({ x, y });
    setSelectedRegion({
      name: region,
      covid19: Math.floor(Math.random() * 10000),
      cancer: Math.floor(Math.random() * 5000),
      hiv: Math.floor(Math.random() * 3000)
    });
  };

  const closePopup = () => {
    setSelectedRegion(null);
  };

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  const t = translations[language];

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/Login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/Register" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Profile" element={<Profile />} />
        <Route
          path="/health-predictor"
          element={
            <HealthPredictor
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
              language={language}
              changeLanguage={changeLanguage}
            />
          }
        />
        <Route
          path="/projects"
          element={
            <Projects
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
              language={language}
              changeLanguage={changeLanguage}
            />
          }
        />
        <Route
          path="/volunteering"
          element={
            <Volunteering
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
              language={language}
              changeLanguage={changeLanguage}
            />
          }
        />
        <Route
          path="/news"
          element={
            <News
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
              language={language}
              changeLanguage={changeLanguage}
            />
          }
        />
        <Route
          path="/"
          element={
            <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
              <header>
                <div className="logo">
                  <img src={whoLogo} alt="WHO Logo" className="who-logo" />
                  <span>World Health Organization</span>
                </div>
                <nav>
                  <Link to="/" className="nav-item active">
                    {t.home}
                  </Link>
                  <Link to="/projects" className="nav-item">
                    {t.projects}
                  </Link>
                  <Link to="/volunteering" className="nav-item">
                    {t.volunteering}
                  </Link>
                  <Link to="/health-predictor" className="nav-item">
                    {t.healthPredictor}
                  </Link>
                  <Link to="/news" className="nav-item">
                    {t.news}
                  </Link>
                  <Link to="/auth" className="nav-item">
                    Login/Register
                  </Link>
                  <button onClick={toggleDarkMode} className="dark-mode-toggle">
                    {darkMode ? '☀' : '🌙'} {t.mode}
                  </button>
                  <div className="language-selector">
                    <select value={language} onChange={(e) => changeLanguage(e.target.value)}>
                      <option value="en">🇬🇧 EN</option>
                      <option value="es">🇪🇸 ES</option>
                      <option value="fr">🇫🇷 FR</option>
                    </select>
                  </div>
                </nav>
              </header>
              <main>
                <div className="world-map-container">
                  <div className={`world-map ${darkMode ? 'dark-map' : 'light-map'}`}>
                    {worldData.regions.map((region, index) => (
                      <div
                        key={index}
                        className="map-point"
                        style={{ top: `${region.y}%`, left: `${region.x}%` }}
                        onClick={(e) => {
                          const rect = e.target.getBoundingClientRect();
                          const mapContainer = e.target.parentElement.getBoundingClientRect();
                          const x = rect.left - mapContainer.left + rect.width;
                          const y = rect.top - mapContainer.top;
                          handleRegionClick(region.name, x, y);
                        }}
                      ></div>
                    ))}
                    {selectedRegion && (
                      <div
                        className="health-popup"
                        style={{ left: `${popupPosition.x}px`, top: `${popupPosition.y}px` }}
                      >
                        <button className="close-popup" onClick={closePopup}>
                          ×
                        </button>
                        <h3>{selectedRegion.name}</h3>
                        <div className="stat-container">
                          <div className="stat">
                            <span className="stat-label">{t.covid19}</span>
                            <span className="stat-value">{selectedRegion.covid19}</span>
                            <span className="stat-unit">{t.cases}</span>
                          </div>
                          <div className="stat">
                            <span className="stat-label">{t.cancer}</span>
                            <span className="stat-value">{selectedRegion.cancer}</span>
                            <span className="stat-unit">{t.cases}</span>
                          </div>
                          <div className="stat">
                            <span className="stat-label">{t.hiv}</span>
                            <span className="stat-value">{selectedRegion.hiv}</span>
                            <span className="stat-unit">{t.cases}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </main>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
