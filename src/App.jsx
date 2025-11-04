import { useState, useMemo, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { mockJobs } from './data/mockJobs'
import JobCard from './components/JobCard'
import FilterBar from './components/FilterBar'
import Header from './components/Header'
import Footer from './components/Footer'
import MonthSelector from './components/MonthSelector'
import './App.css'

function App() {
  const { month } = useParams()
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [filters, setFilters] = useState({
    technologies: [],
    workTypes: [],
    salaryRange: null
  })

  const transformJobData = (backendJob) => {
    const sd = backendJob.structured_data  // Shorthand for easier access

    return {
      id: backendJob.hn_id,
      title: sd?.positions?.[0] || "Position Not Specified",
      company: sd?.company || "Unknown Company",
      technologies: sd?.stack || [],
      workType: sd?.remote_friendly ? "Remote" : "On-site",
      application_url: sd?.application_url || [],
      email: backendJob.email || sd?.email,
      salary: sd?.salary || "Not specified",
      description: sd?.description || "No description",
      location: sd?.location || "Not specified"
    }
  }

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true)
        const API_URL = import.meta.env.VITE_API_URL || "https://hn-backend.onrender.com"

        // Build URL with month parameter if provided
        const url = month
          ? `${API_URL}/api/stories/jobs?month=${month}`
          : `${API_URL}/api/stories/jobs`

        const res = await fetch(url)
        const json = await res.json()

        // Transform backend data to frontend format
        const transformedJobs = json.data.map(transformJobData)
        setJobs(transformedJobs)  // Update jobs state with transformed data

        setLoading(false)
      } catch (error) {
        console.error(error)
        setError(error.message)
        setLoading(false)
      }
    }

    fetchJobs()  // Actually call the function!
  }, [month])  // Re-fetch when month changes

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      if (filters.technologies.length > 0) {
        const hasMatchingTech = job.technologies.some(tech =>
          filters.technologies.includes(tech)
        )
        if (!hasMatchingTech) return false
      }

      if (filters.workTypes.length > 0) {
        if (!filters.workTypes.includes(job.workType)) return false
      }

      return true
    })
  }, [filters, jobs])  // Re-filter when filters OR jobs change

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  if (loading) {
    return <div className="loading">Loading jobs...</div>
  }

  if (error) {
    return <div className="error">Error: {error}</div>
  }

  return (
    <div className="app">
      <Header jobCount={filteredJobs.length} selectedMonth={month} />
      <main className="main">
        <div className="container">
          <div className="controls-bar">
            <MonthSelector />
            <FilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>
          <div className="jobs-grid">
            {filteredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          {filteredJobs.length === 0 && (
            <div className="no-results">
              <h3>No jobs found</h3>
              <p>Try adjusting your filters to see more opportunities</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App