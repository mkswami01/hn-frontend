import { useState } from "react"

const JobCard = ({ job }) => {
  const [showMoreOptions, setShowMoreOptions] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showToast, setShowToast] = useState(false)

  // Handle primary application URL (first in the list)
  const handlePrimaryApply = async () => {
    const primaryUrl = job.application_url && job.application_url[0]
    if (primaryUrl) {
      window.open(primaryUrl, '_blank')
    } else if (job.email) {
      // Copy email to clipboard instead of opening mail app
      await handleCopyEmail()
    }
  }

  // Handle secondary application URLs
  const handleSecondaryApply = (url) => {
    window.open(url, '_blank')
  }

  // Handle email copy to clipboard
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(job.email)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000) // Hide toast after 3 seconds
    } catch (err) {
      console.error('Failed to copy email:', err)
    }
  }

  const getWorkTypeStyle = (workType) => {
    const styles = {
      'Remote': 'work-type-remote',
      'Hybrid': 'work-type-hybrid',
      'On-site': 'work-type-onsite'
    }
    return styles[workType] || 'work-type-default'
  }

  return (
    <div className="job-card">
      <div className="job-card-header">
        <div className="job-title-section">
          <h3 className="job-title">{job.title}</h3>
          <p className="job-company">{job.company}</p>
        </div>
        <div className={`work-type-badge ${getWorkTypeStyle(job.workType)}`}>
          {job.workType}
        </div>
      </div>

      <div className="job-salary">
        <span className="salary-label">💰</span>
        <span className="salary-amount">{job.salary}</span>
      </div>

      <p className="job-description">{job.description}</p>

      <div className="job-technologies">
        {job.technologies.map((tech, index) => (
          <span key={index} className="tech-tag">
            {tech}
          </span>
        ))}
      </div>

      <div className="job-card-footer">
        <button
          className="apply-button primary"
          onClick={handlePrimaryApply}
          disabled={!job.application_url?.length && !job.email}
        >
          {job.application_url?.length ? 'Apply Now' : job.email ? '📋 Copy Email' : 'Contact Company'}
        </button>

        {/* Show dropdown for additional application URLs */}
        {job.application_url && job.application_url.length > 1 && (
          <div className="secondary-apply-options">
            <button
              className="apply-button dropdown-toggle"
              onClick={() => setShowMoreOptions(!showMoreOptions)}
            >
              {showMoreOptions ? '▲' : '▼'} {job.application_url.length - 1} more {job.application_url.length - 1 === 1 ? 'option' : 'options'}
            </button>

            {/* Only show first 2 additional URLs in dropdown */}
            {showMoreOptions && (
              <div className="dropdown-options">
                {job.application_url.slice(1, 3).map((url, index) => (
                  <button
                    key={index}
                    className="apply-button secondary"
                    onClick={() => handleSecondaryApply(url)}
                    title={url}
                  >
                    Apply Option {index + 2}
                  </button>
                ))}

                {/* If more than 3 total URLs, show "View all" button */}
                {job.application_url.length > 3 && (
                  <button
                    className="apply-button view-all"
                    onClick={() => setShowModal(true)}
                  >
                    📋 View all {job.application_url.length} options
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal for viewing all application options */}
      {showModal && (
        <div
          className="modal-backdrop"
          onClick={() => setShowModal(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Application Options for {job.company}</h3>
              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <p className="modal-subtitle">{job.title}</p>
              <p className="modal-description">Choose any of these {job.application_url.length} ways to apply:</p>

              <div className="modal-url-list">
                {job.application_url.map((url, index) => {
                  // Extract domain from URL for display
                  const domain = url.replace(/^https?:\/\//, '').split('/')[0]

                  return (
                    <button
                      key={index}
                      className="modal-url-button"
                      onClick={() => {
                        handleSecondaryApply(url)
                        setShowModal(false)
                      }}
                    >
                      <span className="url-number">{index + 1}</span>
                      <div className="url-details">
                        <span className="url-domain">{domain}</span>
                        <span className="url-full" title={url}>{url}</span>
                      </div>
                      <span className="url-arrow">→</span>
                    </button>
                  )
                })}
              </div>

              {job.email && (
                <div className="modal-email-option">
                  <p>Or apply via email:</p>
                  <button
                    className="email-copy-button"
                    onClick={handleCopyEmail}
                  >
                    <span className="email-text">{job.email}</span>
                    <span className="copy-icon">📋 Copy</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="toast-notification">
          ✓ Email copied to clipboard!
        </div>
      )}
    </div>
  )
}

export default JobCard