const FilterBar = ({ filters, onFilterChange }) => {
  const workTypes = ['Remote', 'Hybrid', 'On-site']

  const handleWorkTypeToggle = (workType) => {
    const newWorkTypes = filters.workTypes.includes(workType)
      ? filters.workTypes.filter(w => w !== workType)
      : [...filters.workTypes, workType]

    onFilterChange({
      ...filters,
      workTypes: newWorkTypes
    })
  }

  return (
    <div className="filter-bar-compact">
      <label className="filter-label">Work Type:</label>
      <div className="filter-pills">
        {workTypes.map(workType => (
          <button
            key={workType}
            className={`filter-pill ${filters.workTypes.includes(workType) ? 'active' : ''}`}
            onClick={() => handleWorkTypeToggle(workType)}
          >
            {workType}
          </button>
        ))}
      </div>
    </div>
  )
}

export default FilterBar