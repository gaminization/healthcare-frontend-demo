// components/HealthPredictor.js (updated)
import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js';
import { Line, Radar } from 'react-chartjs-2';
import { AuthContext } from './context/AuthContext';
import { HealthScoreContext } from './context/HealthScoreContext';
// import {Radar} from 'recharts';
import whoLogo from './assets/who-logo.png';
import './HealthPredictor.css';
import {
  Chart as ChartJS,
  RadialLinearScale, // Add this
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register all required components
ChartJS.register(
  RadialLinearScale, // Add this
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
// Register ChartJS components
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function HealthPredictor({ darkMode, toggleDarkMode, language, changeLanguage }) {
  // Existing state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [healthScore, setHealthScore] = useState(0);
  const [scoreSaved, setScoreSaved] = useState(false);
  
  const { isAuthenticated } = useContext(AuthContext);
  const { addHealthScore } = useContext(HealthScoreContext);
  const navigate = useNavigate();
  
  const translations = {
    en: {
      title: 'Health Predictor - Take the quiz and get instant results!',
      submit: 'Submit',
      next: 'Next',
      previous: 'Previous',
      result: 'Your Health Score:',
      home: 'Home',
      projects: 'Projects',
      volunteering: 'Volunteering',
      healthPredictor: 'Health Predictor',
      news: 'News',
      mode: 'MODE',
      language: 'Language',
      often: 'Often',
      sometimes: 'Sometimes',
      rarely: 'Rarely',
      never: 'Never',
      healthMetrics: 'Your Health Metrics Breakdown',
            Login: 'Login',
            Register: 'Register',
            Profile: 'Profile'
    },
    es: {
      title: 'Predictor de Salud - ¡Haz el cuestionario y obtén resultados instantáneos!',
      submit: 'Enviar',
      next: 'Siguiente',
      previous: 'Anterior',
      result: 'Tu Puntuación de Salud:',
      home: 'Inicio',
      projects: 'Proyectos',
      volunteering: 'Voluntariado',
      healthPredictor: 'Predictor de Salud',
      news: 'Noticias',
      mode: 'MODO',
      language: 'Idioma',
      often: 'A menudo',
      sometimes: 'A veces',
      rarely: 'Raramente',
      never: 'Nunca',
      healthMetrics: 'Desglose de tus métricas de salud',
            Login: 'Login',
            Register: 'Register',
            Profile: 'Profile'
    },
    fr: {
      title: 'Prédicteur de Santé - Répondez au quiz et obtenez des résultats instantanés!',
      submit: 'Soumettre',
      next: 'Suivant',
      previous: 'Précédent',
      result: 'Votre Score de Santé:',
      home: 'Accueil',
      projects: 'Projets',
      volunteering: 'Bénévolat',
      healthPredictor: 'Prédicteur de Santé',
      news: 'Actualités',
      mode: 'MODE',
      language: 'Langue',
      often: 'Souvent',
      sometimes: 'Parfois',
      rarely: 'Rarement',
      never: 'Jamais',
      healthMetrics: 'Répartition de vos indicateurs de santé',
            Login: 'Login',
            Register: 'Register',
            Profile: 'Profile'
    }
  };

  const t = translations[language];

  const questions = [
    {
      id: 1,
      text: {
        en: 'How often do you exercise?',
        es: '¿Con qué frecuencia hace ejercicio?',
        fr: 'À quelle fréquence faites-vous de l\'exercice?'
      },
      options: ['often', 'sometimes', 'rarely', 'never'],
      image: 'exercise.jpg'
    },
    {
      id: 2,
      text: {
        en: 'What is your typical diet like?',
        es: '¿Cómo es su dieta típica?',
        fr: 'Comment est votre régime alimentaire typique?'
      },
      options: ['balanced', 'mostly_healthy', 'occasional_junk', 'unhealthy'],
      image: 'diet.jpg'
    },
    {
      id: 3,
      text: {
        en: 'When was your last health check-up?',
        es: '¿Cuándo fue su último chequeo médico?',
        fr: 'Quand était votre dernier bilan de santé?'
      },
      options: ['last_month', 'last_year', 'years_ago', 'never'],
      image: 'checkup.jpg'
    },
    {
      id: 4,
      text: {
        en: 'How many hours of sleep do you get each night?',
        es: '¿Cuántas horas duerme cada noche?',
        fr: 'Combien d\'heures dormez-vous chaque nuit?'
      },
      options: ['eight_plus', 'six_to_eight', 'four_to_six', 'less_than_four'],
      image: 'sleep.jpg'
    },
    {
      id: 5,
      text: {
        en: 'How would you rate your stress levels?',
        es: '¿Cómo calificaría sus niveles de estrés?',
        fr: 'Comment évalueriez-vous vos niveaux de stress?'
      },
      options: ['very_low', 'low', 'moderate', 'high'],
      image: 'stress.jpg'
    },
    {
      id: 6,
      text: {
        en: 'Do you smoke?',
        es: '¿Fuma?',
        fr: 'Fumez-vous?'
      },
      options: ['never', 'quit', 'occasionally', 'regularly'],
      image: 'smoking.jpg'
    },
    {
      id: 7,
      text: {
        en: 'How much water do you drink daily?',
        es: '¿Cuánta agua bebe diariamente?',
        fr: 'Combien d\'eau buvez-vous quotidiennement?'
      },
      options: ['eight_plus_glasses', 'five_to_eight', 'three_to_five', 'less_than_three'],
      image: 'water.jpg'
    },
    {
      id: 8,
      text: {
        en: 'How often do you consume alcohol?',
        es: '¿Con qué frecuencia consume alcohol?',
        fr: 'À quelle fréquence consommez-vous de l\'alcool?'
      },
      options: ['never', 'rarely', 'weekly', 'daily'],
      image: 'alcohol.jpg'
    },
    {
      id: 9,
      text: {
        en: 'How often do you engage in social activities?',
        es: '¿Con qué frecuencia participa en actividades sociales?',
        fr: 'À quelle fréquence participez-vous à des activités sociales?'
      },
      options: ['often', 'sometimes', 'rarely', 'never'],
      image: 'social.jpg'
    },
    {
      id: 10,
      text: {
        en: 'How would you rate your mental health?',
        es: '¿Cómo calificaría su salud mental?',
        fr: 'Comment évalueriez-vous votre santé mentale?'
      },
      options: ['excellent', 'good', 'fair', 'poor'],
      image: 'mental.jpg'
    },
    {
      id: 11,
      text: {
        en: 'How often do you eat fruits and vegetables?',
        es: '¿Con qué frecuencia come frutas y verduras?',
        fr: 'À quelle fréquence mangez-vous des fruits et légumes?'
      },
      options: ['daily', 'few_times_week', 'rarely', 'never'],
      image: 'fruits.jpg'
    },
    {
      id: 12,
      text: {
        en: 'How would you rate your work-life balance?',
        es: '¿Cómo calificaría su equilibrio entre trabajo y vida?',
        fr: 'Comment évalueriez-vous votre équilibre travail-vie?'
      },
      options: ['excellent', 'good', 'fair', 'poor'],
      image: 'worklife.jpg'
    },
    {
      id: 13,
      text: {
        en: 'How often do you practice mindfulness or meditation?',
        es: '¿Con qué frecuencia practica la atención plena o la meditación?',
        fr: 'À quelle fréquence pratiquez-vous la pleine conscience ou la méditation?'
      },
      options: ['daily', 'weekly', 'occasionally', 'never'],
      image: 'meditation.jpg'
    },
    {
      id: 14,
      text: {
        en: 'How much screen time do you have daily?',
        es: '¿Cuánto tiempo de pantalla tiene diariamente?',
        fr: 'Combien de temps d\'écran avez-vous quotidiennement?'
      },
      options: ['less_than_two_hours', 'two_to_four_hours', 'four_to_eight_hours', 'more_than_eight_hours'],
      image: 'screen.jpg'
    },
    {
      id: 15,
      text: {
        en: 'How would you rate your overall energy levels?',
        es: '¿Cómo calificaría sus niveles de energía en general?',
        fr: 'Comment évalueriez-vous vos niveaux d\'énergie globaux?'
      },
      options: ['very_high', 'high', 'moderate', 'low'],
      image: 'energy.jpg'
    }
  ];

  const handleAnswer = (questionId, option) => {
    setAnswers({
      ...answers,
      [questionId]: option
    });
  };

  const calculateScore = () => {
    let score = 0;
    const totalQuestions = questions.length;
    
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = questions.find(q => q.id === parseInt(questionId));
      if (question) {
        const optionIndex = question.options.indexOf(answer);
        score += (question.options.length - optionIndex);
      }
    });
    
    const percentage = Math.round((score / (totalQuestions * 4)) * 100);
    setHealthScore(percentage);
    return percentage;
  };

  const handleNext = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const finalScore = calculateScore();
      setShowResults(true);
      if (addHealthScore) {
        await addHealthScore({ score: finalScore, answers });
        setScoreSaved(true);
      }
    }
  };

  const getQuestionImage = (q) => {
    const textEn = (q.text && q.text.en) ? q.text.en.toLowerCase() : '';
    if (textEn.includes('exercise')) return '/images/exercise.jpg';
    if (textEn.includes('diet') || textEn.includes('fruit') || textEn.includes('nutrit')) return '/images/nutrition.jpg';
    if (textEn.includes('sleep')) return '/images/sleep.jpg';
    if (textEn.includes('water')) return '/images/water.jpg';
    if (textEn.includes('stress') || textEn.includes('mental') || textEn.includes('meditation')) return '/images/mental.jpg';
    if (textEn.includes('check-up') || textEn.includes('smoke') || textEn.includes('alcohol')) return '/images/vaccine.jpg';
    return '/images/exercise.jpg';
  };
  
  const renderOptions = (questionId, options) => {
    return options.map((option, index) => (
      <div key={index} className="option">
        <input
          type="radio"
          id={`q${questionId}-${option}`}
          name={`question-${questionId}`}
          checked={answers[questionId] === option}
          onChange={() => handleAnswer(questionId, option)}
        />
        <label htmlFor={`q${questionId}-${option}`}>
          <span className="radio-button"></span>
          {t[option] || option.replace(/_/g, ' ')}
        </label>
      </div>
    ));
  };

  // Prepare chart data for the radar chart
  const getChartData = () => {
    const labels = questions.map(q => q.text[language].split('?')[0]);
    
    const data = questions.map(q => {
      if (!answers[q.id]) return 0;
      const optionIndex = q.options.indexOf(answers[q.id]);
      // Invert the score so healthier options (lower indices) get higher scores
      return ((q.options.length - optionIndex) / q.options.length) * 100;
    });
    
    return {
      labels,
      datasets: [
        {
          label: t.healthMetrics,
          data,
          backgroundColor: 'rgba(0, 120, 212, 0.2)',
          borderColor: 'rgba(0, 120, 212, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(0, 120, 212, 1)',
          pointRadius: 4
        }
      ]
    };
  };

  const chartOptions = {
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20
        }
      }
    },
    plugins: {
      legend: {
        display: true
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <main className="health-predictor-container">
      <div className="predictor-hero-card">
        <div className="hero-content-text">
          <span className="hero-badge-tag">🩺 Diagnostic Assessment</span>
          <h1>{t.title}</h1>
          <p>Answer a few lifestyle questions to generate your personal WHO Health Score and radar breakdown.</p>
        </div>
      </div>
        
      {!showResults ? (
        <div className="quiz-container">
          <div className="question-container">
            <h2>{`${currentQuestion + 1}. ${questions[currentQuestion].text[language] || questions[currentQuestion].text.en}`}</h2>
            <div className="options-container">
              {renderOptions(questions[currentQuestion].id, questions[currentQuestion].options)}
            </div>
          </div>
          
          <div className="image-container">
            <img
              src={getQuestionImage(questions[currentQuestion])}
              alt="Health Assessment"
              className="question-image-real"
            />
          </div>
          
          <div className="navigation-buttons">
            <button 
              onClick={handlePrevious} 
              disabled={currentQuestion === 0}
              className="nav-button prev-button"
            >
              {t.previous}
            </button>
            <button 
              onClick={handleNext} 
              className="nav-button next-button"
              disabled={!answers[questions[currentQuestion].id]}
            >
              {currentQuestion === questions.length - 1 ? t.submit : t.next}
            </button>
          </div>
        </div>
      ) : (
        <div className="results-container">
          <h2>{t.result}</h2>
          <div className="health-score">
            <div className="score-circle" style={{"--health-score": healthScore}}>
              <span className="score-value">{healthScore}%</span>
            </div>
          </div>
          <div className="score-description">
            {healthScore >= 80 ? (
              <p>Excellent! You have very healthy habits.</p>
            ) : healthScore >= 60 ? (
              <p>Good! Your lifestyle is generally healthy, but there's room for improvement.</p>
            ) : healthScore >= 40 ? (
              <p>Fair. Consider making some lifestyle changes to improve your health.</p>
            ) : (
              <p>Your health score indicates you should consider significant lifestyle changes.</p>
            )}
          </div>
          
          <div className="chart-container" style={{ maxWidth: '600px', margin: '40px auto 0' }}>
            <h3>{t.healthMetrics}</h3>
            <Radar data={getChartData()} options={chartOptions} />
          </div>
        </div>
      )}
    </main>
  );
}

export default HealthPredictor;
