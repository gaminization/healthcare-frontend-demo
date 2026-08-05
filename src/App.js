import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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
      covid19: Math.floor(Math.random() * 10000 + 1200),
      cancer: Math.floor(Math.random() * 5000 + 800),
      hiv: Math.floor(Math.random() * 3000 + 400)
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
                    <main className="home-main">
                      {/* Live Incident Ticker */}
                      <div className="live-ticker-banner">
                        <span className="ticker-badge">🔴 LIVE UPDATE</span>
                        <div className="ticker-text">
                          World Health Assembly adopts historic rapid pandemic response agreement • Polio Eradication Campaign reaches 92% coverage • Over 200M bed nets deployed in East Africa
                        </div>
                      </div>

                      {/* Home Hero Section */}
                      <div className="home-hero">
                        <h1>Global Health Surveillance & Action Map</h1>
                        <p>Monitoring disease trends, managing emergency medical responses, and supporting health programs across 194 member nations.</p>

                        <div className="quick-actions-bar">
                          <Link to="/projects" className="action-btn primary-btn">
                            Explore Health Programs →
                          </Link>
                          <Link to="/volunteering" className="action-btn secondary-btn">
                            Join Volunteer Corps
                          </Link>
                          <Link to="/health-predictor" className="action-btn outline-btn">
                            Calculate Health Score
                          </Link>
                        </div>
                      </div>

                      {/* Interactive World Map */}
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
                            >
                              <div className="pulse-ring"></div>
                            </div>
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
                                <div className="stat covid">
                                  <div className="stat-icon">🦠</div>
                                  <div className="stat-info">
                                    <span className="stat-label">COVID-19 Active</span>
                                    <span className="stat-value">{selectedRegion.covid19.toLocaleString()}</span>
                                  </div>
                                </div>
                                <div className="stat cancer">
                                  <div className="stat-icon">🎗️</div>
                                  <div className="stat-info">
                                    <span className="stat-label">Oncology Tracking</span>
                                    <span className="stat-value">{selectedRegion.cancer.toLocaleString()}</span>
                                  </div>
                                </div>
                                <div className="stat hiv">
                                  <div className="stat-icon">🔴</div>
                                  <div className="stat-info">
                                    <span className="stat-label">Immune Surveillance</span>
                                    <span className="stat-value">{selectedRegion.hiv.toLocaleString()}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Featured Initiatives Section */}
                      <div className="features-section">
                        <h2>Core Focus Areas</h2>
                        <div className="features-grid">
                          <div className="feature-card">
                            <div className="feature-img">
                              <img src="/images/polio.jpg" alt="Polio Eradication" />
                            </div>
                            <div className="feature-body">
                              <h3>Immunization & Polio Eradication</h3>
                              <p>Reaching over 400 million children annually with life-saving oral vaccines.</p>
                              <Link to="/projects" className="feature-link">View Program →</Link>
                            </div>
                          </div>

                          <div className="feature-card">
                            <div className="feature-img">
                              <img src="/images/malaria.jpg" alt="Malaria Prevention" />
                            </div>
                            <div className="feature-body">
                              <h3>Malaria & Vector Control</h3>
                              <p>Distributing dual-active long-lasting bed nets and rapid diagnostic kits.</p>
                              <Link to="/projects" className="feature-link">View Program →</Link>
                            </div>
                          </div>

                          <div className="feature-card">
                            <div className="feature-img">
                              <img src="/images/water.jpg" alt="Water Sanitation" />
                            </div>
                            <div className="feature-body">
                              <h3>Clean Water & Hygiene Infrastructure</h3>
                              <p>Installing solar filtration systems in healthcare centers and schools.</p>
                              <Link to="/projects" className="feature-link">View Program →</Link>
                            </div>
                          </div>
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