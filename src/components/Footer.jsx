const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">
              <span className="footer-pulse">⚡</span>
              <span className="footer-dev">Dev</span>
              <span className="footer-name">Pulse</span>
            </h3>
            <p className="footer-tagline">
              Human-posted jobs from real companies. AI-curated, spam-free.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">About</h4>
            <p className="footer-description">
              Our goal is to curate all human-posted jobs from real companies across Slack communities, Discord, HackerNews, and startup job boards into one place.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Technology</h4>
            <div className="footer-badges">
              <span className="footer-badge">Powered by Claude AI</span>
              <span className="footer-badge">Multi-Platform</span>
              <span className="footer-badge">Supabase</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} DevPulse. All rights reserved.
          </p>
          <p className="footer-credit">
            Built with ❤️ by <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">MK Labs</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
