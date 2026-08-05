// components/Navbar.js
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import whoLogo from './assets/who-logo.png';

const Navbar = ({ darkMode, toggleDarkMode, language, changeLanguage }) => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const location = useLocation();

  const translations = {
    en: {
      home: 'Home',
      projects: 'Projects',
      volunteering: 'Volunteering',
      healthPredictor: 'Health Predictor',
      news: 'News',
      mode: 'MODE',
      language: 'Language',
      login: 'Login',
      register: 'Register',
      profile: 'Profile',
      logout: 'Logout'
    },
    es: {
      home: 'Inicio',
      projects: 'Proyectos',
      volunteering: 'Voluntariado',
      healthPredictor: 'Predictor de Salud',
      news: 'Noticias',
      mode: 'MODO',
      language: 'Idioma',
      login: 'Iniciar Sesión',
      register: 'Registro',
      profile: 'Perfil',
      logout: 'Cerrar Sesión'
    },
    fr: {
      home: 'Accueil',
      projects: 'Projets',
      volunteering: 'Bénévolat',
      healthPredictor: 'Prédicteur de Santé',
      news: 'Actualités',
      mode: 'MODE',
      language: 'Langue',
      login: 'Connexion',
      register: 'Inscription',
      profile: 'Profil',
      logout: 'Déconnexion'
    }
  };

  const t = translations[language] || translations.en;
  const currentPath = location.pathname.toLowerCase();

  return (
    <header>
      <div className="logo">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
          <img src={whoLogo} alt="WHO Logo" className="who-logo" />
          <span>World Health Organization</span>
        </Link>
      </div>
      <nav>
        <Link to="/" className={`nav-item ${currentPath === '/' ? 'active' : ''}`}>
          {t.home}
        </Link>
        <Link to="/projects" className={`nav-item ${currentPath === '/projects' ? 'active' : ''}`}>
          {t.projects}
        </Link>
        <Link to="/volunteering" className={`nav-item ${currentPath === '/volunteering' ? 'active' : ''}`}>
          {t.volunteering}
        </Link>
        <Link to="/health-predictor" className={`nav-item ${currentPath === '/health-predictor' ? 'active' : ''}`}>
          {t.healthPredictor}
        </Link>
        <Link to="/news" className={`nav-item ${currentPath === '/news' ? 'active' : ''}`}>
          {t.news}
        </Link>

        {isAuthenticated ? (
          <>
            <Link to="/profile" className={`nav-item ${currentPath === '/profile' ? 'active' : ''}`}>
              {t.profile}
            </Link>
            <button
              onClick={logout}
              className="nav-item"
              style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}
            >
              {t.logout}
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={`nav-item ${currentPath === '/login' ? 'active' : ''}`}>
              {t.login}
            </Link>
            <Link to="/register" className={`nav-item ${currentPath === '/register' ? 'active' : ''}`}>
              {t.register}
            </Link>
          </>
        )}

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
  );
};

export default Navbar;
