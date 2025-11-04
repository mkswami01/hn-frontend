const Header = ({ jobCount, selectedMonth }) => {
  const displayDate = selectedMonth
    ? `${selectedMonth.charAt(0).toUpperCase() + selectedMonth.slice(1)} ${new Date().getFullYear()}`
    : new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="brand">
            <h1 className="brand-title">
              <span className="brand-pulse">⚡</span>
              <span className="brand-dev">Curated</span>
              <span className="brand-name">Hire</span>
            </h1>
            <p className="brand-subtitle">Real jobs from real companies</p>
          </div>
          <div className="header-meta">
            <div className="date-badge">{displayDate}</div>
            <div className="job-count">{jobCount} opportunities</div>
          </div>
        </div>
        <p className="header-description">
          Human-posted jobs from HackerNews, Slack communities, Discord, and startup boards. AI-curated, spam-free.
        </p>
      </div>
    </header>
  )
}

export default Header