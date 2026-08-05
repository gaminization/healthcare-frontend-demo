import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import worldData from './components/worldData';
import { AuthProvider } from './components/context/AuthContext';
import { HealthScoreProvider } from './components/context/HealthScoreContext';
import { VolunteeringProvider } from './components/context/VolunteeringContext';

import Navbar from './components/Navbar';
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

  return (
    <AuthProvider>
      <HealthScoreProvider>
        <VolunteeringProvider>
          <Router>
            <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
              <Navbar
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                language={language}
                changeLanguage={changeLanguage}
              />
              <Routes>
                <Route
                  path="/"
                  element={
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
                                  <span className="stat-label">COVID-19</span>
                                  <span className="stat-value">{selectedRegion.covid19}</span>
                                  <span className="stat-unit">cases</span>
                                </div>
                                <div className="stat">
                                  <span className="stat-label">Cancer</span>
                                  <span className="stat-value">{selectedRegion.cancer}</span>
                                  <span className="stat-unit">cases</span>
                                </div>
                                <div className="stat">
                                  <span className="stat-label">HIV</span>
                                  <span className="stat-value">{selectedRegion.hiv}</span>
                                  <span className="stat-unit">cases</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </main>
                  }
                />
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
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/reset-password" element={<UpdatePassword />} />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </div>
          </Router>
        </VolunteeringProvider>
      </HealthScoreProvider>
    </AuthProvider>
  );
}

export default App;