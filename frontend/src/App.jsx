import { useState, useEffect, useRef } from 'react';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('intro');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isProjectsInView, setIsProjectsInView] = useState(false);
  
  const projectsRef = useRef(null);

  // Social Links updated with SVG icon markup or paths
  const socialLinks = [
    { 
      name: 'GitHub', 
      url: 'https://github.com/toonkari', 
      desc: 'Inspect source code & repositories',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
      )
    },
    { 
      name: 'Instagram', 
      url: 'https://instagram.com/teominhh', 
      desc: 'Visual repository & creative shots',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
      )
    },
    { 
      name: 'TikTok', 
      url: 'https://tiktok.com/@teominhh', 
      desc: 'Short-form content & clips',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
      )
    },
    { 
      name: 'LinkedIn', 
      url: 'https://linkedin.com', 
      desc: 'Professional network & experience',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
      )
    },
    { 
      name: 'Cobalt', 
      url: '#', 
      desc: 'System engine & utility module',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" x2="12" y1="8" y2="12"></line><line x1="12" x2="12.01" y1="16" y2="16"></line></svg>
      )
    }
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

  // Intersection Observer to detect when the projects section is actively snapped into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsProjectsInView(entry.isIntersecting);
      },
      {
        threshold: 0.5
      }
    );

    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }

    return () => {
      if (projectsRef.current) {
        observer.unobserve(projectsRef.current);
      }
    };
  }, []);

  return (
    <div className="snap-container">
      {/* Background MP4 Video Element */}
      <video 
        src="/background.mp4" 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="video-background" 
      />

      {/* SECTION 1: INTRO */}
      <section className="snap-section">
        <div style={{ textAlign: 'center', maxWidth: '600px', marginBottom: '2rem' }}>
          <div style={{ 
            width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#1e293b', 
            border: '2px solid #334155', margin: '0 auto 1.2rem auto', display: 'flex',
            alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', color: '#38bdf8', fontWeight: 'bold'
          }}>
            PA
          </div>
          
          <h1 style={{ fontSize: '2rem', marginBottom: '0.4rem', fontWeight: '600', letterSpacing: '-0.025em', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
            Project Aries
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '0.95rem', textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
            The first breath of my career.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="tab-switcher">
          <button className={`tab-button ${activeTab === 'intro' ? 'active' : ''}`} onClick={() => setActiveTab('intro')}>Intro</button>
          <button className={`tab-button ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>Projects</button>
          <button className={`tab-button ${activeTab === 'socials' ? 'active' : ''}`} onClick={() => setActiveTab('socials')}>Socials</button>
        </div>

        <div className="glass-panel" style={{ padding: '2rem', maxWidth: '600px', width: '100%' }}>
          <h2 style={{ fontSize: '1.25rem', color: '#f3f4f6', marginBottom: '1rem', fontWeight: '600' }}>
            Welcome to Project Aries
          </h2>
          <p style={{ color: '#d1d5db', fontSize: '0.95rem', lineHeight: '1.6' }}>
            The first breath of my career. Built with full-stack architecture, clean glassmorphism UI, and immersive scroll-snapping sections. Scroll down or use the tabs to explore!
          </p>
        </div>

        {/* Animated Scroll Down Indicator */}
        <div className="scroll-indicator">
          <span>Scroll Down</span>
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* SECTION 2: PROJECTS */}
      <section ref={projectsRef} className="snap-section">
        <main style={{ width: '100%', maxWidth: '700px', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.1rem', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', fontWeight: '600', textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
            Projects Hub
          </h2>

          {loading ? (
            <p style={{ color: '#cbd5e1', textAlign: 'center', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>Connecting to server...</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {projects.map((project) => (
                <div key={project.id} className="glass-panel" style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <h3 style={{ margin: 0, color: '#f3f4f6', fontSize: '1.1rem', fontWeight: '600' }}>{project.title}</h3>
                    <span style={{ 
                      fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '9999px', 
                      backgroundColor: project.status === 'Active' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                      color: project.status === 'Active' ? '#34d399' : '#60a5fa',
                      border: `1px solid ${project.status === 'Active' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(59, 130, 246, 0.4)'}`
                    }}>
                      {project.status}
                    </span>
                  </div>
                  
                  <p style={{ color: '#d1d5db', fontSize: '0.9rem', lineHeight: '1.4', marginBottom: '1rem' }}>
                    {project.description}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                      {project.techStack.map((tech, index) => (
                        <span key={index} style={{ fontSize: '0.7rem', backgroundColor: 'rgba(31, 41, 55, 0.7)', padding: '0.15rem 0.4rem', borderRadius: '4px', color: '#e2e8f0' }}>
                          {tech}
                        </span>
                      ))}
                    </div>

                    <a href={project.githubUrl} target="_blank" rel="noreferrer" style={{ fontSize: '0.85rem', color: '#38bdf8', textDecoration: 'none', fontWeight: '500' }}>
                      Source Code →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Thin Black Status Bar with Fade In/Out */}
        <div className={`projects-status-bar ${isProjectsInView ? 'visible' : ''}`}>
          <span style={{ width: '6px', height: '6px', backgroundColor: '#10b981', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 6px #10b981' }}></span>
          <span>Connected to FastAPI Backend</span>
        </div>
      </section>

      {/* SECTION 3: SOCIALS */}
      <section className="snap-section">
        <div style={{ width: '100%', maxWidth: '700px' }}>
          <h2 style={{ fontSize: '1.1rem', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', fontWeight: '600', textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
            Social Networks
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {socialLinks.map((link, idx) => (
              <a key={idx} href={link.url} target="_blank" rel="noreferrer" className="glass-panel social-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ color: '#38bdf8', display: 'flex', alignItems: 'center' }}>
                  {link.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div>{link.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: 'normal', marginTop: '0.2rem' }}>
                    {link.desc}
                  </div>
                </div>
                <span>→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}