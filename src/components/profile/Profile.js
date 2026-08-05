// components/profile/Profile.js
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { HealthScoreContext } from '../context/HealthScoreContext';
import { VolunteeringContext } from '../context/VolunteeringContext';
import UpdatePassword from '../auth/UpdatePassword';
import { Line } from 'react-chartjs-2';
import whoLogo from '../assets/who-logo.png';
import './Profile.css';

const Profile = ({ darkMode, toggleDarkMode, language = 'en', changeLanguage }) => {
  const { user, logout } = useContext(AuthContext);
  const { healthScores, getHealthScores, deleteHealthScore } = useContext(HealthScoreContext);
  const { volunteeringRecords, getVolunteeringRecords } = useContext(VolunteeringContext);
  
  const [activeTab, setActiveTab] = useState('health');
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  useEffect(() => {
    getHealthScores();
    getVolunteeringRecords();
    // eslint-disable-next-line
  }, []);

  const translations = {
    en: {
      home: 'Home',
      projects: 'Projects',
      volunteering: 'Volunteering',
      healthPredictor: 'Health Predictor',
      news: 'News',
      mode: 'MODE',
      language: 'Language',
      Login: 'Login',
      Register: 'Register',
      Profile: 'Profile',
      Logout: 'Logout'
    },
    es: {
      home: 'Inicio',
      projects: 'Proyectos',
      volunteering: 'Voluntariado',
      healthPredictor: 'Predictor de Salud',
      news: 'Noticias',
      mode: 'MODO',
      language: 'Idioma',
      Login: 'Login',
      Register: 'Registro',
      Profile: 'Perfil',
      Logout: 'Cerrar Sesión'
    },
    fr: {
      home: 'Accueil',
      projects: 'Projets',
      volunteering: 'Bénévolat',
      healthPredictor: 'Prédicteur de Santé',
      news: 'Actualités',
      mode: 'MODE',
      language: 'Langue',
      Login: 'Connexion',
      Register: 'Inscription',
      Profile: 'Profil',
      Logout: 'Déconnexion'
    }
  };

  const t = translations[language] || translations.en;

  const handleDeleteScore = id => {
    if (window.confirm('Are you sure you want to delete this health score?')) {
      deleteHealthScore(id);
    }
  };

  // Prepare chart data
  const chartData = {
    labels: healthScores.map(score => new Date(score.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Health Score',
        data: healthScores.map(score => score.score),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Your Health Score History'
      }
    },
    scales: {
      y: {
        min: 0,
        max: 100
      }
    }
  };

  // Calculate total volunteering hours
  const totalHours = volunteeringRecords.reduce((total, record) => total + record.hours, 0);

  return (
    <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <header>
        <div className="logo">
          <img src={whoLogo} alt="WHO Logo" className="who-logo" />
          <span>World Health Organization</span>
        </div>
        <nav>
          <Link to="/" className="nav-item">{t.home}</Link>
          <Link to="/projects" className="nav-item">{t.projects}</Link>
          <Link to="/volunteering" className="nav-item">{t.volunteering}</Link>
          <Link to="/health-predictor" className="nav-item">{t.healthPredictor}</Link>
          <Link to="/news" className="nav-item">{t.news}</Link>
          {user ? (
            <>
              <Link to="/profile" className="nav-item active">{t.Profile}</Link>
              <button onClick={logout} className="nav-item" style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}>{t.Logout}</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-item">{t.Login}</Link>
              <Link to="/register" className="nav-item">{t.Register}</Link>
            </>
          )}
          {toggleDarkMode && (
            <button onClick={toggleDarkMode} className="dark-mode-toggle">
              {darkMode ? '☀️' : '🌙'} {t.mode}
            </button>
          )}
          {changeLanguage && (
            <div className="language-selector">
              <select value={language} onChange={(e) => changeLanguage(e.target.value)}>
                <option value="en">🇬🇧 EN</option>
                <option value="es">🇪🇸 ES</option>
                <option value="fr">🇫🇷 FR</option>
              </select>
            </div>
          )}
        </nav>
      </header>

      <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        <div className="profile-info">
          <p><strong>Name:</strong> {user && user.name}</p>
          <p><strong>Email:</strong> {user && user.email}</p>
          <button 
            className="password-button"
            onClick={() => setShowPasswordForm(!showPasswordForm)}
          >
            {showPasswordForm ? 'Cancel' : 'Change Password'}
          </button>
        </div>
        {showPasswordForm && <UpdatePassword />}
      </div>

      <div className="profile-tabs">
        <button 
          className={`tab-button ${activeTab === 'health' ? 'active' : ''}`}
          onClick={() => setActiveTab('health')}
        >
          Health Scores
        </button>
        <button 
          className={`tab-button ${activeTab === 'volunteering' ? 'active' : ''}`}
          onClick={() => setActiveTab('volunteering')}
        >
          Volunteering
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'health' && (
          <div className="health-scores-tab">
            <h2>Your Health Scores</h2>
            
            {healthScores.length > 0 ? (
              <>
                <div className="health-chart">
                  <Line data={chartData} options={chartOptions} />
                </div>
                
                <div className="health-scores-list">
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Score</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {healthScores.map(score => (
                        <tr key={score._id}>
                          <td>{new Date(score.date).toLocaleDateString()}</td>
                          <td>{score.score}%</td>
                          <td>
                            <button 
                              className="delete-button"
                              onClick={() => handleDeleteScore(score._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <p>You haven't taken any health assessments yet.</p>
            )}
          </div>
        )}

        {activeTab === 'volunteering' && (
          <div className="volunteering-tab">
            <h2>Your Volunteering Activities</h2>
            
            <div className="volunteering-summary">
              <div className="summary-card">
                <h3>Total Hours</h3>
                <p className="summary-value">{totalHours}</p>
              </div>
              <div className="summary-card">
                <h3>Activities</h3>
                <p className="summary-value">{volunteeringRecords.length}</p>
              </div>
            </div>
            
            {volunteeringRecords.length > 0 ? (
              <div className="volunteering-list">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Project</th>
                      <th>Hours</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {volunteeringRecords.map(record => (
                      <tr key={record._id}>
                        <td>{new Date(record.date).toLocaleDateString()}</td>
                        <td>{record.project}</td>
                        <td>{record.hours}</td>
                        <td>{record.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>You haven't logged any volunteering activities yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Profile;
