const monthNames = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "Aug",
  "09": "Sept",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec",
};

const quarterMonths = {
  Q1: ["Jan", "Feb", "Mar"],
  Q2: ["Apr", "May", "June"],
  Q3: ["July", "Aug", "Sept"],
  Q4: ["Oct", "Nov", "Dec"],
};

/**
 * Converts "YYYY-MM" to "Month Name"
 * @param {string} dateString - The YYYY-MM format string
 * @returns {string} - Month name (e.g., "January")
 */
const getMonthName = (dateString) => {
  return monthNames[dateString.split("-")[1]] || "Unknown";
};

/**
 * Filters data based on the selected quarter.
 * @param {Array} data - List of revenue data [{ month: "January", totalRevenue: 1234 }]
 * @param {string} quarter - Selected quarter (Q1, Q2, Q3, Q4, fullYear)
 * @returns {Array} - Filtered data for the quarter
 */
const filterByQuarter = (data, quarter) => {
  if (quarter === "fullYear") return data;
  return data.filter(({ month }) => quarterMonths[quarter]?.includes(month));
};

module.exports = { getMonthName, filterByQuarter };
