import React, { useState } from 'react';
import './News.css';

const News = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeArticle, setActiveArticle] = useState(null);

  const articles = [
    {
      id: 1,
      title: 'Global Summit Approves Historic Pandemic Response Accord',
      category: 'Policy',
      date: 'August 4, 2026',
      readTime: '4 min read',
      image: '/images/vaccine.jpg',
      snippet: 'Delegates from 194 WHO member states have ratified new guidelines for global rapid vaccine sharing and early pathogen detection.',
      content: `GENEVA — In a landmark decision at the World Health Assembly, representatives unanimously adopted a comprehensive global agreement to streamline medical countermeasure distribution during health emergencies.
      
      Key elements include:
      - Automatic activation of emergency funding reserves within 24 hours of a public health alert.
      - Standardized intellectual property sharing protocols for diagnostic kits and essential therapies.
      - Establishment of regional manufacturing hubs in Africa and Latin America.`
    },
    {
      id: 2,
      title: 'Breakthrough in Next-Gen Oral Polio Vaccine Distribution',
      category: 'Vaccines',
      date: 'August 2, 2026',
      readTime: '3 min read',
      image: '/images/polio.jpg',
      snippet: 'Field trials demonstrate 98% protection rate with thermal-stable oral polio vaccines requiring no cold-chain refrigeration.',
      content: `KABUL / ISLAMABAD — Health officials announced a major breakthrough in immunizing remote communities against Type 2 poliovirus. The newly deployed thermal-stable oral vaccine remains effective at ambient tropical temperatures for up to 30 days without refrigeration.`
    },
    {
      id: 3,
      title: 'Rollout of 20M Insecticidal Bed Nets Achieves Milestones in East Africa',
      category: 'Prevention',
      date: 'July 28, 2026',
      readTime: '5 min read',
      image: '/images/malaria.jpg',
      snippet: 'Community health worker networks complete distribution of dual-active ingredient mosquito nets across high-transmission districts.',
      content: `KAMPALA — The World Health Organization, alongside national health ministries, confirmed the completion of its largest malaria vector control campaign to date across East Africa.`
    },
    {
      id: 4,
      title: 'Clean Water Infrastructure Expansion Reduces Waterborne Outbreaks by 60%',
      category: 'Environment',
      date: 'July 20, 2026',
      readTime: '4 min read',
      image: '/images/water.jpg',
      snippet: 'Solar-powered water purification systems installed in 1,200 rural clinics mark a new standard for primary healthcare facilities.',
      content: `DHAKA — Access to safe drinking water and sanitation in primary healthcare centers has significantly decreased waterborne cholera and enteric infection rates in rural districts.`
    }
  ];

  const categories = ['All', 'Policy', 'Vaccines', 'Prevention', 'Environment'];

  const filteredArticles = selectedCategory === 'All'
    ? articles
    : articles.filter(a => a.category === selectedCategory);

  return (
    <main className="news-container">
      <div className="news-hero">
        <span className="news-badge">WHO Media & Global Health Updates</span>
        <h1>Latest News & Press Releases</h1>
        <p>Stay informed with authoritative global health advisories, outbreak reports, policy announcements, and scientific breakthroughs.</p>
      </div>

      <div className="news-categories">
        {categories.map(cat => (
          <button
            key={cat}
            className={`news-cat-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="news-grid">
        {filteredArticles.map(article => (
          <div className="news-card" key={article.id}>
            <div className="news-img-box">
              <img src={article.image} alt={article.title} />
              <span className="news-tag">{article.category}</span>
            </div>
            
            <div className="news-content">
              <div className="news-meta">
                <span>📅 {article.date}</span>
                <span>⏱️ {article.readTime}</span>
              </div>
              <h3>{article.title}</h3>
              <p>{article.snippet}</p>

              <button className="read-more-btn" onClick={() => setActiveArticle(article)}>
                Read Full Story →
              </button>
            </div>
          </div>
        ))}
      </div>

      {activeArticle && (
        <div className="modal-overlay" onClick={() => setActiveArticle(null)}>
          <div className="modal-content news-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveArticle(null)}>×</button>
            <div className="news-modal-img">
              <img src={activeArticle.image} alt={activeArticle.title} />
            </div>
            <div className="news-modal-body">
              <span className="news-tag">{activeArticle.category}</span>
              <h2>{activeArticle.title}</h2>
              <div className="news-meta">
                <span>📅 {activeArticle.date}</span> • <span>⏱️ {activeArticle.readTime}</span>
              </div>
              <hr />
              <div className="article-full-text">
                {activeArticle.content.split('\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default News;
