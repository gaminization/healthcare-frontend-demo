import React, { useState, useContext } from 'react';
import { VolunteeringContext } from './context/VolunteeringContext';
import './Volunteering.css';

const Volunteering = () => {
  const { addVolunteeringRecord } = useContext(VolunteeringContext);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    profession: 'Medical Doctor / Nurse',
    experience: '1-3 years',
    location: '',
    motivation: ''
  });

  const opportunities = [
    {
      id: 1,
      title: 'Emergency Medical & Surge Support Corps',
      category: 'Clinical Care',
      location: 'Sub-Saharan Africa & South Asia',
      duration: '3 - 6 Months',
      spotsLeft: 14,
      image: '/images/polio.jpg',
      summary: 'Provide emergency medical consultations, pediatric vaccinations, and frontline triage care in community health centers.',
      requirements: ['Valid Medical License or Nursing Degree', 'Active CPR/BLS certification', 'Flexibility for field travel']
    },
    {
      id: 2,
      title: 'Malaria & Vector Control Community Outreach',
      category: 'Public Health',
      location: 'East Africa & Amazon Basin',
      duration: '1 - 3 Months',
      spotsLeft: 22,
      image: '/images/malaria.jpg',
      summary: 'Educate local families on vector prevention, distribute long-lasting insecticidal bed nets, and record health data.',
      requirements: ['Passion for global public health', 'Strong communication skills', 'Fluency in English or French']
    },
    {
      id: 3,
      title: 'Clean Water Infrastructure & Hygiene Training',
      category: 'Engineering & Hygiene',
      location: 'Rural Southeast Asia',
      duration: '2 - 4 Months',
      spotsLeft: 8,
      image: '/images/water.jpg',
      summary: 'Help build community water filtration units and facilitate sanitation workshops for schools and village councils.',
      requirements: ['Background in engineering, environmental science, or health education', 'Teamwork mindset']
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (addVolunteeringRecord && selectedOpportunity) {
      await addVolunteeringRecord({
        project: selectedOpportunity.title,
        hours: 20,
        description: form.motivation ? `${form.profession} - ${form.motivation}` : `Applied for ${selectedOpportunity.title}`
      });
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedOpportunity(null);
    }, 2500);
  };

  return (
    <main className="volunteering-container">
      <div className="volunteering-hero">
        <span className="volunteering-badge">Join Global Health Action</span>
        <h1>WHO Volunteer Corps</h1>
        <p>Stand alongside frontline health professionals, researchers, and community organizers to deliver life-saving healthcare worldwide.</p>

        <div className="impact-grid">
          <div className="impact-card">
            <div className="impact-num">45,000+</div>
            <div className="impact-label">Active Field Volunteers</div>
          </div>
          <div className="impact-card">
            <div className="impact-num">85+</div>
            <div className="impact-label">Deployment Countries</div>
          </div>
          <div className="impact-card">
            <div className="impact-num">1.2M+</div>
            <div className="impact-label">Families Reached</div>
          </div>
        </div>
      </div>

      <h2 className="section-title">Open Volunteer Campaigns</h2>

      <div className="opportunities-grid">
        {opportunities.map(opp => (
          <div className="opportunity-card" key={opp.id}>
            <div className="opp-img-box">
              <img src={opp.image} alt={opp.title} />
              <span className="opp-category">{opp.category}</span>
              <span className="opp-spots">{opp.spotsLeft} Spots Open</span>
            </div>
            
            <div className="opp-content">
              <h3>{opp.title}</h3>
              <p className="opp-meta">📍 {opp.location} • ⏱️ {opp.duration}</p>
              <p className="opp-desc">{opp.summary}</p>

              <div className="opp-reqs">
                <strong>Key Requirements:</strong>
                <ul>
                  {opp.requirements.map((req, idx) => (
                    <li key={idx}>• {req}</li>
                  ))}
                </ul>
              </div>

              <button
                className="apply-btn"
                onClick={() => setSelectedOpportunity(opp)}
              >
                Apply for Campaign →
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedOpportunity && (
        <div className="modal-overlay" onClick={() => setSelectedOpportunity(null)}>
          <div className="modal-content volunteer-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedOpportunity(null)}>×</button>

            {submitted ? (
              <div className="success-box">
                <div className="success-icon">🎉</div>
                <h3>Application Submitted!</h3>
                <p>Thank you for volunteering for <strong>{selectedOpportunity.title}</strong>. Our deployment team will contact you shortly.</p>
              </div>
            ) : (
              <>
                <div className="modal-header">
                  <h2>Volunteer Application</h2>
                  <p>Campaign: <strong>{selectedOpportunity.title}</strong> ({selectedOpportunity.location})</p>
                </div>

                <form onSubmit={handleSubmit} className="volunteer-form">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Sarah Jenkins"
                      value={form.fullName}
                      onChange={e => setForm({ ...form, fullName: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="name@domain.com"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Background / Specialty</label>
                      <select
                        value={form.profession}
                        onChange={e => setForm({ ...form, profession: e.target.value })}
                      >
                        <option>Medical Doctor / Nurse</option>
                        <option>Public Health Specialist</option>
                        <option>Epidemiologist / Researcher</option>
                        <option>Engineer / Water Specialist</option>
                        <option>Community Educator</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Experience Level</label>
                      <select
                        value={form.experience}
                        onChange={e => setForm({ ...form, experience: e.target.value })}
                      >
                        <option>Student / Entry Level</option>
                        <option>1-3 years</option>
                        <option>4-7 years</option>
                        <option>8+ years Senior Specialist</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Motivation & Relevant Skills</label>
                    <textarea
                      rows="3"
                      required
                      placeholder="Briefly describe your motivation and health outreach experience..."
                      value={form.motivation}
                      onChange={e => setForm({ ...form, motivation: e.target.value })}
                    ></textarea>
                  </div>

                  <button type="submit" className="submit-app-btn">
                    Submit Application
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default Volunteering;
