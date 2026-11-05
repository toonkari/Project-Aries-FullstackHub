import { useState, useEffect } from 'react';

export default function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch projects from your FastAPI backend when the page loads
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
      backgroundColor: '#090d16', 
      color: '#f8fafc', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '4rem 1.5rem' 
    }}>
      
      {/* Profile / Hero Section */}
      <div style={{ textAlign: 'center', maxWidth: '600px', marginBottom: '3rem' }}>
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
          backgroundColor: '#111827', 
          border: '1px solid #1f2937', 
          padding: '0.4rem 0.8rem', 
          borderRadius: '9999px',
          fontSize: '0.85rem',
          color: '#9ca3af'
        }}>
          <span style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 8px #10b981' }}></span>
          <span>Connected to FastAPI Backend</span>
        </div>
      </div>

      {/* Main Grid / Projects */}
      <main style={{ width: '100%', maxWidth: '700px' }}>
        <h2 style={{ fontSize: '1.1rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', fontWeight: '500' }}>
          Projects Hub
        </h2>

        {loading ? (
          <p style={{ color: '#94a3b8', textAlign: 'center' }}>Connecting to server...</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {projects.map((project) => (
              <div 
                key={project.id}
                style={{
                  backgroundColor: '#111827',
                  padding: '1.25rem',
                  borderRadius: '12px',
                  border: '1px solid #1f2937',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ margin: 0, color: '#f3f4f6', fontSize: '1.1rem', fontWeight: '600' }}>{project.title}</h3>
                  <span style={{ 
                    fontSize: '0.7rem', 
                    padding: '0.15rem 0.5rem', 
                    borderRadius: '9999px', 
                    backgroundColor: project.status === 'Active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                    color: project.status === 'Active' ? '#34d399' : '#60a5fa',
                    border: `1px solid ${project.status === 'Active' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(59, 130, 246, 0.2'}`
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
                      <span key={index} style={{ fontSize: '0.7rem', backgroundColor: '#1f2937', padding: '0.15rem 0.4rem', borderRadius: '4px', color: '#cbd5e1' }}>
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

      <footer style={{ marginTop: '4rem', color: '#4b5563', fontSize: '0.85rem', display: 'flex', gap: '1.5rem' }}>
        <a href="https://github.com" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>GitHub</a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>LinkedIn</a>
      </footer>
    </div>
  );
}