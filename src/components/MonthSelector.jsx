import { useNavigate, useParams } from 'react-router-dom'

const MonthSelector = () => {
  const { month } = useParams()
  const navigate = useNavigate()

  const months = [
    { name: 'October', path: 'october' }
  ]

  const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long' }).toLowerCase()
  const selectedMonth = months.find(m => m.path === month) || months.find(m => m.path === currentMonth)

  const handleMonthChange = (e) => {
    const selectedPath = e.target.value
    navigate(`/${selectedPath}`)
  }

  return (
    <div className="month-selector-compact">
      <label htmlFor="month-select" className="month-selector-label">Month:</label>
      <select
        id="month-select"
        className="month-selector-dropdown"
        value={selectedMonth?.path || currentMonth}
        onChange={handleMonthChange}
      >
        {months.map((m) => (
          <option key={m.path} value={m.path}>
            {m.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default MonthSelector
