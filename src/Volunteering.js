// components/Volunteering.js (updated)
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './components/context/AuthContext';
import { VolunteeringContext } from './components/context/VolunteeringContext';
import whoLogo from './assets/who-logo.png';
import './Volunteering.css';

function Volunteering({ darkMode, toggleDarkMode, language, changeLanguage }) {
  // Existing state
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [donationAmount, setDonationAmount] = useState(10);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [currentProject, setCurrentProject] = useState(null);
  const [volunteerHours, setVolunteerHours] = useState(0);
  const [volunteerDescription, setVolunteerDescription] = useState('');
  const [recordSaved, setRecordSaved] = useState(false);
  
  const { isAuthenticated } = useContext(AuthContext);
  const { addVolunteeringRecord } = useContext(VolunteeringContext);
  const navigate = useNavigate();

  const translations = {
    en: {
      title: 'Volunteer with WHO',
      home: 'Home',
      projects: 'Projects',
      volunteering: 'Volunteering',
      healthPredictor: 'Health Predictor',
      news: 'News',
      mode: 'MODE',
      language: 'Language',
      donateTitle: 'Support Global Health Initiatives',
      donateButton: 'Donate',
      volunteerOpportunities: 'Volunteer Opportunities',
      learnMore: 'Learn More',
      joinEfforts: 'Join our efforts to improve health worldwide',
      donationHelps: 'Your donation helps us respond to health emergencies and support vulnerable communities',
      donationAmount: 'Donation Amount',
      fullName: 'Full Name',
      email: 'Email Address',
      submit: 'Submit Donation',
      cancel: 'Cancel',
      donateToProject: 'Donate to this project',
            Login: 'Login',
            Register: 'Register',
            Profile: 'Profile'
    },
    es: {
      // Spanish translations
      title: 'Voluntariado con la OMS',
      home: 'Inicio',
      projects: 'Proyectos',
      volunteering: 'Voluntariado',
      healthPredictor: 'Predictor de Salud',
      news: 'Noticias',
      mode: 'MODO',
      language: 'Idioma',
      donateTitle: 'Apoye las Iniciativas de Salud Global',
      donateButton: 'Donar',
      volunteerOpportunities: 'Oportunidades de Voluntariado',
      learnMore: 'Más Información',
      joinEfforts: 'Únase a nuestros esfuerzos para mejorar la salud en todo el mundo',
      donationHelps: 'Su donación nos ayuda a responder a emergencias sanitarias y apoyar a comunidades vulnerables',
      donationAmount: 'Monto de Donación',
      fullName: 'Nombre Completo',
      email: 'Correo Electrónico',
      submit: 'Enviar Donación',
      cancel: 'Cancelar',
      donateToProject: 'Donar a este proyecto',
            Login: 'Login',
            Register: 'Register',
            Profile: 'Profile'
    },
    fr: {
      // French translations
      title: 'Bénévolat avec l\'OMS',
      home: 'Accueil',
      projects: 'Projets',
      volunteering: 'Bénévolat',
      healthPredictor: 'Prédicteur de Santé',
      news: 'Actualités',
      mode: 'MODE',
      language: 'Langue',
      donateTitle: 'Soutenez les Initiatives de Santé Mondiale',
      donateButton: 'Faire un Don',
      volunteerOpportunities: 'Opportunités de Bénévolat',
      learnMore: 'En Savoir Plus',
      joinEfforts: 'Rejoignez nos efforts pour améliorer la santé dans le monde entier',
      donationHelps: 'Votre don nous aide à répondre aux urgences sanitaires et à soutenir les communautés vulnérables',
      donationAmount: 'Montant du Don',
      fullName: 'Nom Complet',
      email: 'Adresse Email',
      submit: 'Soumettre le Don',
      cancel: 'Annuler',
      donateToProject: 'Faire un don à ce projet',
            Login: 'Login',
            Register: 'Register',
            Profile: 'Profile'
    }
  };

  const t = translations[language];

  const volunteerOpportunities = [
    {
      id: 1,
      title: {
        en: 'Emergency Response Team',
        es: 'Equipo de Respuesta a Emergencias',
        fr: 'Équipe d\'Intervention d\'Urgence'
      },
      description: {
        en: 'Join our emergency response teams that deploy to areas affected by health crises and natural disasters.',
        es: 'Únase a nuestros equipos de respuesta a emergencias que se despliegan en áreas afectadas por crisis sanitarias y desastres naturales.',
        fr: 'Rejoignez nos équipes d\'intervention d\'urgence qui se déploient dans les zones touchées par des crises sanitaires et des catastrophes naturelles.'
      },
      image: 'emergency-response.jpg'
    },
    {
      id: 2,
      title: {
        en: 'Community Health Education',
        es: 'Educación Sanitaria Comunitaria',
        fr: 'Éducation Sanitaire Communautaire'
      },
      description: {
        en: 'Volunteer to educate communities about preventive healthcare, hygiene practices, and disease management.',
        es: 'Ofrézcase como voluntario para educar a las comunidades sobre atención médica preventiva, prácticas de higiene y manejo de enfermedades.',
        fr: 'Portez-vous volontaire pour éduquer les communautés sur les soins de santé préventifs, les pratiques d\'hygiène et la gestion des maladies.'
      },
      image: 'health-education.jpg'
    },
    {
      id: 3,
      title: {
        en: 'Digital Health Volunteers',
        es: 'Voluntarios de Salud Digital',
        fr: 'Bénévoles en Santé Numérique'
      },
      description: {
        en: 'Support our digital initiatives by contributing to data analysis, app development, or online health campaigns.',
        es: 'Apoye nuestras iniciativas digitales contribuyendo al análisis de datos, desarrollo de aplicaciones o campañas de salud en línea.',
        fr: 'Soutenez nos initiatives numériques en contribuant à l\'analyse de données, au développement d\'applications ou aux campagnes de santé en ligne.'
      },
      image: 'digital-health.jpg'
    }
  ];

  const saveVolunteeringRecord = async () => {
    if (!isAuthenticated) {
      if (window.confirm('You need to login to log volunteering hours. Would you like to login now?')) {
        navigate('/login');
      }
      return;
    }
    
    if (!currentProject || volunteerHours <= 0) {
      alert('Please select a project and enter valid hours');
      return;
    }
    
    const volunteeringData = {
      project: currentProject.title[language],
      hours: volunteerHours,
      description: volunteerDescription
    };
    
    const result = await addVolunteeringRecord(volunteeringData);
    if (result) {
      setRecordSaved(true);
      setTimeout(() => {
        setRecordSaved(false);
        setShowDonationForm(false);
        setVolunteerHours(0);
        setVolunteerDescription('');
      }, 2000);
    }
  };

  const handleDonateClick = (project) => {
    setCurrentProject(project);
    setShowDonationForm(true);
  };

  const handleDonationSubmit = (e) => {
    e.preventDefault();
    // Here you would integrate with a payment processor like PayPal or Stripe
    console.log({
      amount: donationAmount,
      name: donorName,
      email: donorEmail,
      project: currentProject ? currentProject.title[language] : 'General Donation'
    });
    
    // Reset form and close it
    setDonationAmount(10);
    setDonorName('');
    setDonorEmail('');
    setShowDonationForm(false);
    
    // Show success message (you could implement a toast notification here)
    alert('Thank you for your donation!');
  };

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
            <Link to="/volunteering" className="nav-item active">{t.volunteering}</Link>
            <Link to="/health-predictor" className="nav-item">{t.healthPredictor}</Link>
            <Link to="/news" className="nav-item">{t.news}</Link>
            <Link to="/Login" className="nav-item">{t.Login}</Link>
            <Link to="/Register" className="nav-item">{t.Register}</Link>
            <Link to="/Profile" className="nav-item">{t.Profile}</Link>
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

      <main className="volunteering-container">
        <h1>{t.title}</h1>
        <p className="intro-text">{t.joinEfforts}</p>
        
        <div className="volunteer-opportunities">
          {volunteerOpportunities.map((opportunity) => (
            <div key={opportunity.id} className="volunteer-card">
              <div className="volunteer-image-placeholder"></div>
              <div className="volunteer-content">
                <h3>{opportunity.title[language]}</h3>
                <p>{opportunity.description[language]}</p>
                <button 
                  className="donate-button"
                  onClick={() => handleDonateClick(opportunity)}
                >
                  {t.donateButton}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Donation Form Modal */}
      {showDonationForm && (
        <div className="donation-modal-overlay">
          <div className="donation-modal">
            <button className="close-modal" onClick={() => setShowDonationForm(false)}>×</button>
            <h2>{t.donateToProject}</h2>
            {currentProject && (
              <h3>{currentProject.title[language]}</h3>
            )}
            <form onSubmit={handleDonationSubmit} className="donation-form">
              <div className="form-group">
                <label htmlFor="amount">{t.donationAmount}</label>
                <div className="amount-input">
                  <span className="currency-symbol">$</span>
                  <input
                    type="number"
                    id="amount"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    min="1"
                    required
                  />
                <label htmlFor="volunteerHours">Volunteer Hours</label>
                <input
                  type="number"
                  id="volunteerHours"
                  value={volunteerHours}
                  onChange={(e) => setVolunteerHours(parseInt(e.target.value))}
                  min="0"
                />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="name">{t.fullName}</label>
                <input
                  type="text"
                  id="name"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  required
                />
                <label htmlFor="volunteerDescription">Description</label>
                <textarea
                  id="volunteerDescription"
                  value={volunteerDescription}
                  onChange={(e) => setVolunteerDescription(e.target.value)}
                  rows="3"
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="email">{t.email}</label>
                <input
                  type="email"
                  id="email"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={() => setShowDonationForm(false)}>
                  {t.cancel}
                </button>
                <button type="submit" className="submit-button">
                  {t.submit}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Volunteering;
