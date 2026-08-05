// Projects.js (updated with 20 projects and image support)
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import whoLogo from './assets/who-logo.png';
import './Projects.css';

function Projects({ darkMode, toggleDarkMode, language, changeLanguage }) {
  const translations = {
    en: {
      title: 'WHO Projects',
      home: 'Home',
      projects: 'Projects',
      volunteering: 'Volunteering',
      healthPredictor: 'Health Predictor',
      news: 'News',
      mode: 'MODE',
      language: 'Language',
      serialNumber: 'S.No',
      projectTitle: 'Title',
      description: 'Description',
      link: 'Link',
      learnMore: 'Continue',
            Login: 'Login',
            Register: 'Register',
            Profile: 'Profile'
    },
    es: {
      title: 'Proyectos de la OMS',
      home: 'Inicio',
      projects: 'Proyectos',
      volunteering: 'Voluntariado',
      healthPredictor: 'Predictor de Salud',
      news: 'Noticias',
      mode: 'MODO',
      language: 'Idioma',
      serialNumber: 'N°',
      projectTitle: 'Título',
      description: 'Descripción',
      link: 'Enlace',
      learnMore: 'Más Información',
            Login: 'Login',
            Register: 'Register',
            Profile: 'Profile'
    },
    fr: {
      title: 'Projets de l\'OMS',
      home: 'Accueil',
      projects: 'Projets',
      volunteering: 'Bénévolat',
      healthPredictor: 'Prédicteur de Santé',
      news: 'Actualités',
      mode: 'MODE',
      language: 'Langue',
      serialNumber: 'N°',
      projectTitle: 'Titre',
      description: 'Description',
      link: 'Lien',
      learnMore: 'En Savoir Plus',
            Login: 'Login',
            Register: 'Register',
            Profile: 'Profile'
    }
  };

  const t = translations[language];

  const projects = [
    {
      id: 1,
      title: {
        en: 'Global Health Initiative',
        es: 'Iniciativa de Salud Global',
        fr: 'Initiative Mondiale pour la Santé'
      },
      description: {
        en: 'A comprehensive program aimed at improving health outcomes worldwide through collaborative efforts, policy development, and resource mobilization.',
        es: 'Un programa integral destinado a mejorar los resultados de salud en todo el mundo a través de esfuerzos de colaboración, desarrollo de políticas y movilización de recursos.',
        fr: 'Un programme complet visant à améliorer les résultats de santé dans le monde entier grâce à des efforts collaboratifs, au développement de politiques et à la mobilisation de ressources.'
      },
      image: 'global-health.jpg',
      link: '#global-health-initiative'
    },
    {
      id: 2,
      title: {
        en: 'Pandemic Preparedness',
        es: 'Preparación para Pandemias',
        fr: 'Préparation aux Pandémies'
      },
      description: {
        en: 'Strengthening global capacity to prevent, detect, and respond to pandemic threats through surveillance systems, emergency response mechanisms, and international coordination.',
        es: 'Fortalecer la capacidad mundial para prevenir, detectar y responder a las amenazas de pandemia mediante sistemas de vigilancia, mecanismos de respuesta a emergencias y coordinación internacional.',
        fr: 'Renforcer la capacité mondiale à prévenir, détecter et répondre aux menaces de pandémie grâce à des systèmes de surveillance, des mécanismes d\'intervention d\'urgence et une coordination internationale.'
      },
      image: 'pandemic-preparedness.jpg',
      link: '#pandemic-preparedness'
    },
    {
      id: 3,
      title: {
        en: 'Universal Health Coverage',
        es: 'Cobertura Sanitaria Universal',
        fr: 'Couverture Sanitaire Universelle'
      },
      description: {
        en: 'Working to ensure that all people have access to the health services they need without suffering financial hardship, including essential medicines and health products.',
        es: 'Trabajar para garantizar que todas las personas tengan acceso a los servicios de salud que necesitan sin sufrir dificultades financieras, incluidos medicamentos esenciales y productos sanitarios.',
        fr: 'Travailler pour garantir que toutes les personnes aient accès aux services de santé dont elles ont besoin sans subir de difficultés financières, y compris les médicaments essentiels et les produits de santé.'
      },
      image: 'uhc.jpg',
      link: '#universal-health-coverage'
    },
    {
      id: 4,
      title: {
        en: 'Global Polio Eradication Initiative',
        es: 'Iniciativa Mundial para la Erradicación de la Poliomielitis',
        fr: 'Initiative Mondiale pour l\'Éradication de la Poliomyélite'
      },
      description: {
        en: 'A public-private partnership led by national governments with five partners to eradicate polio worldwide by delivering vaccines to every child and monitoring the virus.',
        es: 'Una asociación público-privada liderada por gobiernos nacionales con cinco socios para erradicar la poliomielitis en todo el mundo mediante la entrega de vacunas a todos los niños y el monitoreo del virus.',
        fr: 'Un partenariat public-privé dirigé par les gouvernements nationaux avec cinq partenaires pour éradiquer la poliomyélite dans le monde entier en fournissant des vaccins à chaque enfant et en surveillant le virus.'
      },
      image: 'polio.jpg',
      link: '#polio-eradication'
    },
    {
      id: 5,
      title: {
        en: 'Climate Change and Health',
        es: 'Cambio Climático y Salud',
        fr: 'Changement Climatique et Santé'
      },
      description: {
        en: 'Addressing the health impacts of climate change through research, capacity building, and policy development to create climate-resilient health systems worldwide.',
        es: 'Abordar los impactos del cambio climático en la salud a través de la investigación, el desarrollo de capacidades y el desarrollo de políticas para crear sistemas de salud resilientes al clima en todo el mundo.',
        fr: 'Aborder les impacts du changement climatique sur la santé par la recherche, le renforcement des capacités et l\'élaboration de politiques pour créer des systèmes de santé résilients au climat dans le monde entier.'
      },
      image: 'climate-health.jpg',
      link: '#climate-health'
    },
    {
      id: 6,
      title: {
        en: 'Access to COVID-19 Tools (ACT) Accelerator',
        es: 'Acelerador del Acceso a las Herramientas contra la COVID-19',
        fr: 'Accélérateur d\'accès aux outils COVID-19'
      },
      description: {
        en: 'A global collaboration to accelerate development, production, and equitable access to COVID-19 tests, treatments, and vaccines.',
        es: 'Una colaboración global para acelerar el desarrollo, la producción y el acceso equitativo a pruebas, tratamientos y vacunas contra la COVID-19.',
        fr: 'Une collaboration mondiale pour accélérer le développement, la production et l\'accès équitable aux tests, traitements et vaccins COVID-19.'
      },
      image: 'act-accelerator.jpg',
      link: '#act-accelerator'
    },
    {
      id: 7,
      title: {
        en: 'Cervical Cancer Elimination Initiative',
        es: 'Iniciativa para la Eliminación del Cáncer Cervical',
        fr: 'Initiative pour l\'élimination du cancer du col de l\'utérus'
      },
      description: {
        en: 'Working to eliminate cervical cancer as a public health problem through vaccination, screening, and treatment.',
        es: 'Trabajando para eliminar el cáncer cervical como un problema de salud pública a través de la vacunación, el cribado y el tratamiento.',
        fr: 'Travailler à éliminer le cancer du col de l\'utérus en tant que problème de santé publique grâce à la vaccination, au dépistage et au traitement.'
      },
      image: 'cervical-cancer.jpg',
      link: '#cervical-cancer'
    },
    {
      id: 8,
      title: {
        en: 'Climate and Health Initiative (ATACH)',
        es: 'Iniciativa de Clima y Salud (ATACH)',
        fr: 'Initiative Climat et Santé (ATACH)'
      },
      description: {
        en: 'The Alliance for Transformative Action on Climate and Health safeguards health amidst climate challenges and promotes climate resilience.',
        es: 'La Alianza para la Acción Transformadora sobre el Clima y la Salud protege la salud en medio de los desafíos climáticos y promueve la resiliencia climática.',
        fr: 'L\'Alliance pour l\'action transformatrice sur le climat et la santé protège la santé face aux défis climatiques et favorise la résilience climatique.'
      },
      image: 'atach.jpg',
      link: '#atach'
    },
    {
      id: 9,
      title: {
        en: 'Decade of Healthy Ageing (2021-2030)',
        es: 'Década del Envejecimiento Saludable (2021-2030)',
        fr: 'Décennie pour le vieillissement en bonne santé (2021-2030)'
      },
      description: {
        en: 'A global collaboration to improve the lives of older people, their families, and communities.',
        es: 'Una colaboración global para mejorar la vida de las personas mayores, sus familias y comunidades.',
        fr: 'Une collaboration mondiale pour améliorer la vie des personnes âgées, de leurs familles et de leurs communautés.'
      },
      image: 'healthy-ageing.jpg',
      link: '#healthy-ageing'
    },
    {
      id: 10,
      title: {
        en: 'Global Initiative for Childhood Cancer',
        es: 'Iniciativa Mundial contra el Cáncer Infantil',
        fr: 'Initiative mondiale contre le cancer infantile'
      },
      description: {
        en: 'Aims to increase the survival rate for children with cancer worldwide.',
        es: 'Tiene como objetivo aumentar la tasa de supervivencia de los niños con cáncer en todo el mundo.',
        fr: 'Vise à augmenter le taux de survie des enfants atteints de cancer dans le monde entier.'
      },
      image: 'childhood-cancer.jpg',
      link: '#childhood-cancer'
    },
    {
      id: 11,
      title: {
        en: 'mRNA Vaccine Technology Transfer Hub',
        es: 'Centro de Transferencia de Tecnología de Vacunas de ARNm',
        fr: 'Centre de transfert de technologie de vaccins à ARNm'
      },
      description: {
        en: 'Expanding global vaccine production capacity through technology transfer.',
        es: 'Ampliando la capacidad de producción global de vacunas a través de la transferencia de tecnología.',
        fr: 'Élargir la capacité mondiale de production de vaccins grâce au transfert de technologie.'
      },
      image: 'mrna-hub.jpg',
      link: '#mrna-hub'
    },
    {
      id: 12,
      title: {
        en: 'SAFER - Alcohol Control Initiative',
        es: 'SAFER - Iniciativa de Control del Alcohol',
        fr: 'SAFER - Initiative de contrôle de l\'alcool'
      },
      description: {
        en: 'Reducing harmful use of alcohol through evidence-based interventions.',
        es: 'Reduciendo el uso nocivo del alcohol a través de intervenciones basadas en evidencia.',
        fr: 'Réduire l\'usage nocif de l\'alcool grâce à des interventions fondées sur des données probantes.'
      },
      image: 'safer.jpg',
      link: '#safer'
    },
    {
      id: 13,
      title: {
        en: 'Hand Hygiene for All Global Initiative',
        es: 'Iniciativa Mundial de Higiene de Manos para Todos',
        fr: 'Initiative mondiale d\'hygiène des mains pour tous'
      },
      description: {
        en: 'Promoting hand hygiene to prevent infections globally.',
        es: 'Promoviendo la higiene de manos para prevenir infecciones a nivel mundial.',
        fr: 'Promouvoir l\'hygiène des mains pour prévenir les infections dans le monde entier.'
      },
      image: 'hand-hygiene.jpg',
      link: '#hand-hygiene'
    },
    {
      id: 14,
      title: {
        en: 'Maternal and Neonatal Tetanus Elimination',
        es: 'Eliminación del Tétanos Materno y Neonatal',
        fr: 'Élimination du tétanos maternel et néonatal'
      },
      description: {
        en: 'Working to eliminate preventable maternal and neonatal deaths from tetanus.',
        es: 'Trabajando para eliminar las muertes maternas y neonatales prevenibles por tétanos.',
        fr: 'Travailler à éliminer les décès maternels et néonatals évitables dus au tétanos.'
      },
      image: 'tetanus.jpg',
      link: '#tetanus'
    },
    {
      id: 15,
      title: {
        en: 'Mekong Malaria Elimination Programme',
        es: 'Programa de Eliminación de la Malaria en el Mekong',
        fr: 'Programme d\'élimination du paludisme dans le Mékong'
      },
      description: {
        en: 'Targeting malaria elimination in the Greater Mekong region.',
        es: 'Dirigido a la eliminación de la malaria en la región del Gran Mekong.',
        fr: 'Cibler l\'élimination du paludisme dans la région du Grand Mékong.'
      },
      image: 'mekong.jpg',
      link: '#mekong'
    },
    {
      id: 16,
      title: {
        en: 'Health and Energy Platform of Action (HEPA)',
        es: 'Plataforma de Acción sobre Salud y Energía (HEPA)',
        fr: 'Plateforme d\'action sur la santé et l\'énergie (HEPA)'
      },
      description: {
        en: 'Promoting clean energy for health benefits.',
        es: 'Promoviendo la energía limpia para beneficios de salud.',
        fr: 'Promouvoir l\'énergie propre pour des bénéfices de santé.'
      },
      image: 'hepa.jpg',
      link: '#hepa'
    },
    {
      id: 17,
      title: {
        en: 'Global Breast Cancer Initiative',
        es: 'Iniciativa Mundial contra el Cáncer de Mama',
        fr: 'Initiative mondiale contre le cancer du sein'
      },
      description: {
        en: 'Addressing breast cancer through comprehensive approaches to prevention, early detection, and treatment.',
        es: 'Abordando el cáncer de mama a través de enfoques integrales para la prevención, detección temprana y tratamiento.',
        fr: 'Lutter contre le cancer du sein grâce à des approches globales de prévention, de détection précoce et de traitement.'
      },
      image: 'breast-cancer.jpg',
      link: '#breast-cancer'
    },
    {
      id: 18,
      title: {
        en: 'Special Initiative for Mental Health',
        es: 'Iniciativa Especial para la Salud Mental',
        fr: 'Initiative spéciale pour la santé mentale'
      },
      description: {
        en: 'Addressing the global burden of mental health conditions.',
        es: 'Abordando la carga global de las condiciones de salud mental.',
        fr: 'Faire face au fardeau mondial des troubles de santé mentale.'
      },
      image: 'mental-health.jpg',
      link: '#mental-health'
    },
    {
      id: 19,
      title: {
        en: 'Hub for Pandemic and Epidemic Intelligence',
        es: 'Centro de Inteligencia sobre Pandemias y Epidemias',
        fr: 'Centre de renseignement sur les pandémies et les épidémies'
      },
      description: {
        en: 'Strengthening global surveillance systems for disease outbreaks.',
        es: 'Fortaleciendo los sistemas de vigilancia global para brotes de enfermedades.',
        fr: 'Renforcer les systèmes mondiaux de surveillance des épidémies.'
      },
      image: 'pandemic-hub.jpg',
      link: '#pandemic-hub'
    },
    {
      id: 20,
      title: {
        en: 'Plastics and Health Initiative',
        es: 'Iniciativa sobre Plásticos y Salud',
        fr: 'Initiative sur les plastiques et la santé'
      },
      description: {
        en: 'Addressing health impacts of plastics on human health.',
        es: 'Abordando los impactos de los plásticos en la salud humana.',
        fr: 'Traiter les impacts des plastiques sur la santé humaine.'
      },
      image: 'plastics.jpg',
      link: '#plastics'
    }
  ];

  return (
    <main className="projects-container">
        <h1>{t.title}</h1>
        
        <div className="projects-table-container">
          <table className="projects-table">
            <thead>
              <tr>
                <th>{t.serialNumber}</th>
                <th></th> {/* Image column */}
                <th>{t.projectTitle}</th>
                <th>{t.description}</th>
                <th>{t.link}</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.id}</td>
                  <td className="project-image-cell">
                    <div className="project-image-placeholder"></div>
                  </td>
                  <td className="project-title">{project.title[language]}</td>
                  <td className="project-description">{project.description[language]}</td>
                  <td>
                    <a href={project.link} className="project-link">
                      {t.learnMore}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
  );
}

export default Projects;
