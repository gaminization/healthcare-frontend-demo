import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Link } from 'react-router-dom';

import worldData from './components/worldData';
import whoLogo from './components/assets/who-logo.png';
import { AuthProvider } from './components/context/AuthContext';
import { HealthScoreProvider } from './components/context/HealthScoreContext';
import { VolunteeringProvider } from './components/context/VolunteeringContext';

// import Home from './components/Home';
import PrivateRoute from './components/routing/PrivateRoute';
import HealthPredictor from './components/HealthPredictor';
import Projects from './components/Projects';
import Volunteering from './components/Volunteering';
import News from './components/News';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/profile/Profile';
import UpdatePassword from './components/auth/UpdatePassword';
function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [translations, setTranslations] = useState({
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
      cases: 'cases',
      Login: 'Login',
      Register: 'Register',
      Profile: 'Profile'
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
      cases: 'casos',
      Login: 'Login',
      Register: 'Register',
      Profile: 'Profile'
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
      cases: 'cas',
      Login: 'Login',
      Register: 'Register',
      Profile: 'Profile'
    }
  });

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
    <AuthProvider>
    <HealthScoreProvider>
    <VolunteeringProvider>
    <Router>
      <Routes>
        <Route path="/health-predictor" element={
          <HealthPredictor darkMode={darkMode} toggleDarkMode={toggleDarkMode} language={language} changeLanguage={changeLanguage} />
        } />
        <Route path="/projects" element={
          <Projects 
            darkMode={darkMode} 
            toggleDarkMode={toggleDarkMode} 
            language={language} 
            changeLanguage={changeLanguage} 
          />
        } />
        <Route path="/volunteering" element={
          <Volunteering 
            darkMode={darkMode} 
            toggleDarkMode={toggleDarkMode} 
            language={language} 
            changeLanguage={changeLanguage} 
          />
        } />
        <Route path="/news" element={
          <News 
            darkMode={darkMode} 
            toggleDarkMode={toggleDarkMode} 
            language={language} 
            changeLanguage={changeLanguage} 
          />
        } />
        <Route path="/" element={
          <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}> {/* Corrected line */}
            <header>
              <div className="logo">
                <img src={whoLogo} alt="WHO Logo" className="who-logo" />
                <span>World Health Organization</span>
              </div>
              <nav>
                <Link to="/" className="nav-item active">{t.home}</Link>
                <Link to="/projects" className="nav-item">{t.projects}</Link>
                <Link to="/volunteering" className="nav-item">{t.volunteering}</Link>
                <Link to="/health-predictor" className="nav-item">{t.healthPredictor}</Link>
                <Link to="/news" className="nav-item">{t.news}</Link>
                <Link to="/login" className="nav-item">{t.Login}</Link>
                <Link to="/register" className="nav-item">{t.Register}</Link>
                <Link to="/profile" className="nav-item">{t.Profile}</Link>
                <button onClick={toggleDarkMode} className="dark-mode-toggle">
                  {darkMode ? '☀️' : '🌙'} {t.mode}
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
                      style={{
                        left: `${popupPosition.x}px`,
                        top: `${popupPosition.y}px`
                      }}
                    >
                      <button className="close-popup" onClick={closePopup}>×</button>
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
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/reset-password" element={<UpdatePassword />} />
        <Route path="/profile" element={<Profile darkMode={darkMode} toggleDarkMode={toggleDarkMode} language={language} changeLanguage={changeLanguage} />} />
        <Route path="/Profile" element={<Profile darkMode={darkMode} toggleDarkMode={toggleDarkMode} language={language} changeLanguage={changeLanguage} />} />
      </Routes>
    </Router>
    </VolunteeringProvider>
    </HealthScoreProvider>
    </AuthProvider>
  );
}

export default App;