/**
 * Utility functions for handling MM-YY date format
 */

/**
 * Get current month in MM-YY format
 * @returns {string} Current month in MM-YY format (e.g., "12-25")
 */
export const getCurrentMonthFormatted = () => {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const year = String(now.getFullYear()).slice(2)
  return `${month}-${year}`
}

/**
 * Convert MM-YY format to display string
 * @param {string} monthYear - Month in MM-YY format (e.g., "11-25")
 * @returns {string} Display string (e.g., "November 2025")
 */
export const formatMonthDisplay = (monthYear) => {
  if (!monthYear || !monthYear.includes('-')) {
    return new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }

  const [month, year] = monthYear.split('-')
  const monthNum = parseInt(month, 10)
  const fullYear = `20${year}`

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  return `${monthNames[monthNum - 1]} ${fullYear}`
}

/**
 * Generate list of available months
 * @returns {Array<{name: string, path: string}>} Array of month objects
 */
export const getAvailableMonths = () => {
  return [
    { name: 'October 2025', path: '10-25' },
    { name: 'November 2025', path: '11-25' },
    { name: 'December 2025', path: '12-25' },
    { name: 'January 2026', path: '01-26' },
    { name: 'February 2026', path: '02-26' },
  ]
}
