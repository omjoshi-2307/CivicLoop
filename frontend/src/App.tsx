import './App.css'

export default function App() {
  return (
    <div className="civicloop-app">
      <header className="civicloop-header">
        <div className="civicloop-badge">Phase 1 Foundation</div>
        <h1>CivicLoop</h1>
        <p className="civicloop-tagline">
          Citizen-Centric Civic Grievance Management Platform
        </p>
      </header>

      <main className="civicloop-main">
        <div className="civicloop-card">
          <h2>Application Initialized</h2>
          <p className="civicloop-description">
            The frontend client has been initialized using React, TypeScript, and Vite.
            Core civic workflows, complaint tracking, and authority dashboards will be
            introduced in subsequent development phases.
          </p>

          <div className="civicloop-status-grid">
            <div className="status-item">
              <span className="status-label">Environment</span>
              <span className="status-value">Local Development</span>
            </div>
            <div className="status-item">
              <span className="status-label">Framework</span>
              <span className="status-value">React + Vite</span>
            </div>
            <div className="status-item">
              <span className="status-label">Type Safety</span>
              <span className="status-value">TypeScript</span>
            </div>
            <div className="status-item">
              <span className="status-label">System Status</span>
              <span className="status-value status-active">Online</span>
            </div>
          </div>
        </div>
      </main>

      <footer className="civicloop-footer">
        <p>CivicLoop &copy; 2026 &bull; Transparent, Accountable Civic Governance</p>
      </footer>
    </div>
  )
}
