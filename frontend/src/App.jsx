import { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Tracks active hover details (null means nothing is hovered)
  const [activeDialogue, setActiveDialogue] = useState(null);

  const navLinks = [
    { name: 'GitHub', url: 'https://github.com/toonkari', text: 'INSPECT SOURCE CODE & COMMIT HISTORY!' },
    { name: 'Instagram', url: 'https://instagram.com/teominhh', text: 'VISUAL REPOSITORY & CREATIVE SHOTS.' },
    { name: 'TikTok', url: 'https://tiktok.com/@teominhh', text: 'Add me mud.' },
    { name: 'LinkedIn', url: 'https://linkedin.com', text: 'CONNECT FOR PROFESSIONAL NETWORK.' },
    { name: 'Cobalt', url: '#', text: 'SYSTEM ENGINE & UTILITY MODULE.' }
  ];

  // Fetch projects from backend
  useEffect(() => {
    fetch('http://localhost:8000/api/projects')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.projects);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch projects from backend:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh', 
      color: '#f8fafc', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '4rem 1.5rem 6rem 1.5rem',
      position: 'relative',
      zIndex: 1
    }}>

      {/* Profile / Hero Section */}
      <div style={{ textAlign: 'center', maxWidth: '600px', marginBottom: '3.5rem' }}>
        <div style={{ 
          width: '80px', 
          height: '80px', 
          borderRadius: '50%', 
          backgroundColor: '#1e293b', 
          border: '2px solid #334155',
          margin: '0 auto 1.2rem auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.8rem',
          color: '#38bdf8',
          fontWeight: 'bold'
        }}>
          ZM
        </div>
        
        <h1 style={{ fontSize: '2rem', marginBottom: '0.4rem', fontWeight: '600', letterSpacing: '-0.025em' }}>
          Zachary McKenzie
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
          CS & Cyber Security Student · Building systems & web architecture.
        </p>

        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          backgroundColor: 'rgba(17, 24, 39, 0.8)', 
          backdropFilter: 'blur(8px)',
          border: '1px solid #1f2937', 
          padding: '0.4rem 0.8rem', 
          borderRadius: '9999px',
          fontSize: '0.85rem',
          color: '#9ca3af'
        }}>
          <span style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 8px #10b981' }}></span>
          <span>Connected to FastAPI Backend</span>
        </div>

        {/* Persona 5 Menu (Hover triggers the banner asset & synchronized text overlay) */}
        <nav style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '2.5rem' }}>
          {navLinks.map((link, idx) => (
            <a 
              key={idx}
              href={link.url}
              target="_blank" 
              rel="noreferrer"
              className="persona-button"
              onMouseEnter={() => setActiveDialogue({ name: link.name.toUpperCase(), text: link.text })}
              onMouseLeave={() => setActiveDialogue(null)}
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Main Grid / Projects */}
      <main style={{ width: '100%', maxWidth: '700px' }}>
        <h2 style={{ fontSize: '1.1rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', fontWeight: '600', textShadow: '1px 1px 2px #000' }}>
          Projects Hub
        </h2>

        {loading ? (
          <p style={{ color: '#94a3b8', textAlign: 'center' }}>Connecting to server...</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {projects.map((project) => (
              <div 
                key={project.id}
                className="glass-panel"
                style={{ padding: '1.25rem' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ margin: 0, color: '#f3f4f6', fontSize: '1.1rem', fontWeight: '600' }}>{project.title}</h3>
                  <span style={{ 
                    fontSize: '0.7rem', 
                    padding: '0.15rem 0.5rem', 
                    borderRadius: '9999px', 
                    backgroundColor: project.status === 'Active' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(59, 130, 246, 0.15)',
                    color: project.status === 'Active' ? '#34d399' : '#60a5fa',
                    border: `1px solid ${project.status === 'Active' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(59, 130, 246, 0.3)'}`
                  }}>
                    {project.status}
                  </span>
                </div>
                
                <p style={{ color: '#9ca3af', fontSize: '0.9rem', lineHeight: '1.4', marginBottom: '1rem' }}>
                  {project.description}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                    {project.techStack.map((tech, index) => (
                      <span key={index} style={{ fontSize: '0.7rem', backgroundColor: 'rgba(31, 41, 55, 0.8)', padding: '0.15rem 0.4rem', borderRadius: '4px', color: '#cbd5e1' }}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    style={{
                      fontSize: '0.85rem',
                      color: '#38bdf8',
                      textDecoration: 'none',
                      fontWeight: '500'
                    }}
                  >
                    Source Code →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer style={{ marginTop: '4rem', color: '#94a3b8', fontSize: '0.85rem', display: 'flex', gap: '1.5rem', textShadow: '1px 1px 2px #000' }}>
        <a href="https://github.com" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>GitHub</a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>LinkedIn</a>
      </footer>

      {/* Full-Screen 1080p Animated Banner Asset */}
      <img 
        src="/persona-banner-anim.gif" 
        alt="" 
        className={`persona-fullscreen-banner ${activeDialogue ? 'visible' : ''}`} 
      />

      {/* Synchronized Text Overlay */}
      {activeDialogue && (
        <div className="persona-footer-banner">
          <div className="persona-dialogue-box-container">
            <div className="persona-dialogue-content">
              <span className="persona-speaker-name">{activeDialogue.name}</span>
              <p className="persona-dialogue-text">{activeDialogue.text}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}