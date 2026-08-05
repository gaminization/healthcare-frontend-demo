import React, { useState } from 'react';
import './Projects.css';

const Projects = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const projectsData = [
    {
      id: 1,
      name: 'Global Polio Eradication Initiative',
      category: 'Vaccination',
      region: 'Worldwide',
      budget: '$150M',
      progress: 92,
      volunteers: '45,000+',
      status: 'Active',
      image: '/images/polio.jpg',
      description: 'A global public-private partnership led by national governments, WHO, Rotary International, US CDC, and UNICEF to eradicate polio globally.',
      impact: 'Reduced polio cases by 99.9% worldwide since launch.',
      goals: ['Vaccinate 400 million children annually', 'Maintain disease surveillance in 70 countries']
    },
    {
      id: 2,
      name: 'Malaria Prevention & Bed Net Distribution',
      category: 'Disease Control',
      region: 'Sub-Saharan Africa',
      budget: '$85M',
      progress: 84,
      volunteers: '28,000+',
      status: 'Active',
      image: '/images/malaria.jpg',
      description: 'Deploying long-lasting insecticidal nets, rapid diagnostic testing, and preventative therapies to protect vulnerable communities from malaria.',
      impact: 'Over 200 million mosquito nets distributed to families.',
      goals: ['Deliver 30M nets in 2026', 'Reduce malaria mortality by 40% in high-risk zones']
    },
    {
      id: 3,
      name: 'Clean Water & Sanitation for Health',
      category: 'Infrastructure',
      region: 'South Asia & East Africa',
      budget: '$60M',
      progress: 78,
      volunteers: '14,000+',
      status: 'Active',
      image: '/images/water.jpg',
      description: 'Building sustainable clean water wells, solar-powered filtration stations, and sanitation facilities in healthcare centers and schools.',
      impact: 'Provided safe drinking water access to 12 million people.',
      goals: ['Install 1,500 new water wells', 'Implement hygiene education in 3,000 schools']
    },
    {
      id: 4,
      name: 'Global Vaccine R&D & Rapid Response',
      category: 'Research',
      region: 'Global Labs',
      budget: '$210M',
      progress: 88,
      volunteers: '9,500+',
      status: 'High Priority',
      image: '/images/vaccine.jpg',
      description: 'Accelerating next-generation vaccine research for emerging infectious pathogens and strengthening worldwide clinical trial networks.',
      impact: 'Developed emergency vaccine stockpiles for 5 high-risk viral strains.',
      goals: ['Accelerate Phase III clinical trials', 'Establish regional vaccine manufacturing hubs']
    }
  ];

  const categories = ['All', 'Vaccination', 'Disease Control', 'Infrastructure', 'Research'];

  const filteredProjects = projectsData.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.region.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="projects-container">
      <div className="projects-hero">
        <div className="hero-badge">Global Impact Initiatives</div>
        <h1>WHO Healthcare Projects</h1>
        <p>Explore active global health programs dedicated to eradicating diseases, improving sanitation, and saving lives across 194 member states.</p>
        
        <div className="projects-stats-grid">
          <div className="stat-card">
            <div className="stat-num">$505M+</div>
            <div className="stat-label">Active Program Budget</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">96,500+</div>
            <div className="stat-label">Field Volunteers</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">140+</div>
            <div className="stat-label">Countries Supported</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">87%</div>
            <div className="stat-label">Average Progress</div>
          </div>
        </div>
      </div>

      <div className="projects-controls">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search programs by name, region, or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="category-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="projects-grid">
        {filteredProjects.map(project => (
          <div className="project-card" key={project.id}>
            <div className="card-image-wrapper">
              <img src={project.image} alt={project.name} className="project-img" />
              <span className={`status-tag ${project.status === 'High Priority' ? 'priority' : ''}`}>
                {project.status}
              </span>
              <span className="category-tag">{project.category}</span>
            </div>
            
            <div className="card-content">
              <div className="card-region">📍 {project.region}</div>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              
              <div className="progress-section">
                <div className="progress-header">
                  <span>Goal Completion</span>
                  <span className="progress-pct">{project.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${project.progress}%` }}></div>
                </div>
              </div>

              <div className="card-footer">
                <div className="footer-metric">
                  <span className="metric-label">Budget</span>
                  <span className="metric-val">{project.budget}</span>
                </div>
                <div className="footer-metric">
                  <span className="metric-label">Volunteers</span>
                  <span className="metric-val">{project.volunteers}</span>
                </div>
                <button className="details-btn" onClick={() => setSelectedProject(project)}>
                  View Program →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)}>×</button>
            <div className="modal-hero">
              <img src={selectedProject.image} alt={selectedProject.name} />
              <div className="modal-hero-text">
                <span className="category-tag">{selectedProject.category}</span>
                <h2>{selectedProject.name}</h2>
                <p>📍 {selectedProject.region}</p>
              </div>
            </div>
            <div className="modal-body">
              <h4>Overview & Objectives</h4>
              <p>{selectedProject.description}</p>
              
              <h4>Proven Impact</h4>
              <p className="impact-box">✨ {selectedProject.impact}</p>

              <h4>Key Milestones</h4>
              <ul>
                {selectedProject.goals.map((g, idx) => (
                  <li key={idx}>✓ {g}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Projects;
