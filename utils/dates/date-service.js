/**
 * Returns the current JavaScript `Date` object.
 * @returns {Date}
 */
const getCurrentDate = () => {
    return new Date();
}

/**
 * Internal utility to format a date according to the given format.
 * Supported formats: "MM-DD-YYYY", "MM-DD-YY", "DD-MM-YYYY", "DD-MM-YY", "YYYY-MM-DD"
 * @param {Date} date - Date object to format
 * @param {"MM-DD-YYYY" | "MM-DD-YY" | "DD-MM-YYYY" | "DD-MM-YY" | "YYYY-MM-DD"} format
 * @returns {string}
 */
function formatDate(date, format) {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    const yy = String(yyyy).slice(-2);

    switch (format) {
        case "MM-DD-YYYY":
            return `${mm}-${dd}-${yyyy}`;
        case "MM-DD-YY":
            return `${mm}-${dd}-${yy}`;
        case "DD-MM-YYYY":
            return `${dd}-${mm}-${yyyy}`;
        case "DD-MM-YY":
            return `${dd}-${mm}-${yy}`;
        case "YYYY-MM-DD":
            return `${yyyy}-${mm}-${dd}`;
        default:
            throw new Error("Unsupported format. Use MM-DD-YYYY, MM-DD-YY, or DD-MM-YYYY");
    }
}

/**
 * Parses a date string based on the given format into a Date object.
 * Supported formats: "MM-DD-YYYY", "MM-DD-YY", "DD-MM-YYYY", "DD-MM-YY", "YYYY-MM-DD"
 * @param {string} dateStr - The date string.
 * @param {"MM-DD-YYYY" | "MM-DD-YY" | "DD-MM-YYYY" | "DD-MM-YY" | "YYYY-MM-DD"} format
 * @returns {Date}
 * @throws Will throw an error if format is unsupported or date is invalid.
 */
function parseDateString(dateStr, format = "DD-MM-YYYY") {
    const [part1, part2, part3] = dateStr.split('-');

    let day, month, year;

    switch (format) {
        case "MM-DD-YYYY":
            [month, day, year] = [part1, part2, part3];
            break;
        case "MM-DD-YY":
            [month, day, year] = [part1, part2, '20' + part3];
            break;
        case "DD-MM-YYYY":
            [day, month, year] = [part1, part2, part3];
            break;
        case "DD-MM-YY":
            [day, month, year] = [part1, part2, '20' + part3];
            break;
        case "YYYY-MM-DD":
            [year, month, day] = [part1, part2, part3];
            break;
        default:
            throw new Error(`Unsupported format: ${format}`);
    }

    const isoString = `${year}-${month}-${day}`;
    const date = new Date(isoString);

    if (isNaN(date.getTime())) {
        throw new Error(`Invalid date string: "${dateStr}" with format "${format}"`);
    }

    return date;
}

const DateService = {
    /**
     * Returns the current date formatted as DD-MM-YYYY.
     * Supported formats: "MM-DD-YYYY", "MM-DD-YY", "DD-MM-YYYY", "DD-MM-YY", "YYYY-MM-DD"
     * @param {"MM-DD-YYYY" | "MM-DD-YY" | "DD-MM-YYYY" | "DD-MM-YY" | "YYYY-MM-DD"} format
     * @returns {string}
     */
    getCurrentDate(format = "DD-MM-YYYY") {
        return formatDate(getCurrentDate(), format);
    },

    /**
     * Returns the current financial year in the format "YY-YY" or "YYYY-YY".
     * @param {boolean} [fullYear=false] - If true, returns format "YYYY-YY"; else "YY-YY".
     * @returns {string}
     */
    getFinancialYear(fullYear = false) {
        const currentDate = getCurrentDate();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;

        let startYear, endYear;

        if (month >= 4) {
            startYear = year;
            endYear = year + 1;
        } else {
            startYear = year - 1;
            endYear = year;
        }

        if (fullYear) {
            return `${startYear}-${endYear.toString().slice(-2)}`;
        }

        return `${startYear.toString().slice(-2)}-${endYear.toString().slice(-2)}`;
    },

    /**
     * Returns the first date of the current month formatted according to the given format.
     * Supported formats: "MM-DD-YYYY", "MM-DD-YY", "DD-MM-YYYY", "DD-MM-YY", "YYYY-MM-DD"
     * @param {"MM-DD-YYYY" | "MM-DD-YY" | "DD-MM-YYYY" | "DD-MM-YY" | "YYYY-MM-DD"} format
     * @returns {string}
     */
    getFirstDateOfMonth(format = "DD-MM-YYYY") {
        const currentDate = getCurrentDate();
        const firstDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        return formatDate(firstDate, format);
    },

    /**
     * Returns the numeric month of the current date (1-12).
     * @returns {number}
     */
    getNumericMonth() {
        return getCurrentDate().getMonth() + 1;
    },

    /**
     * Returns the name of the current month.
     * @param {boolean} [short=false] - If true, returns abbreviated month name (e.g., "Sep").
     * @returns {string}
     */
    getMonthName(short = false) {
        const date = getCurrentDate();
        const locale = 'en-US';
        const options = { month: short ? 'short' : 'long' };
        return date.toLocaleString(locale, options);
    },

    /**
     * Returns yesterday's date formatted according to the given format.
     * Supported formats: "MM-DD-YYYY", "MM-DD-YY", "DD-MM-YYYY", "DD-MM-YY", "YYYY-MM-DD"
     * @param {"MM-DD-YYYY" | "MM-DD-YY" | "DD-MM-YYYY" | "DD-MM-YY" | "YYYY-MM-DD"} format
     * @returns {string}
     */
    getYesterday(format = "DD-MM-YYYY") {
        const date = getCurrentDate();
        date.setDate(date.getDate() - 1);
        return formatDate(date, format);
    },

    /**
     * Returns tomorrow's date formatted according to the given format.
     * Supported formats: "MM-DD-YYYY", "MM-DD-YY", "DD-MM-YYYY", "DD-MM-YY", "YYYY-MM-DD"
     * @param {"MM-DD-YYYY" | "MM-DD-YY" | "DD-MM-YYYY" | "DD-MM-YY" | "YYYY-MM-DD"} format
     * @returns {string}
     */
    getTomorrow(format = "DD-MM-YYYY") {
        const date = getCurrentDate();
        date.setDate(date.getDate() + 1);
        return formatDate(date, format);
    },

    /**
     * Returns the day of the week for the current date.
     * @param {boolean} [short=false] - If true, returns abbreviated day name (e.g., "Mon").
     * @returns {string}
     */
    getDayOfWeek(short = false) {
        const date = getCurrentDate();
        const locale = 'en-US';
        const options = { weekday: short ? 'short' : 'long' };
        return date.toLocaleString(locale, options);
    },

    /**
     * Returns the number of days in a given month and year.
     * @param {number} year - Full year (e.g., 2025).
     * @param {number} month - Month number (1-12).
     * @returns {number}
     */
    getDaysInMonth(year, month) {
        return new Date(year, month, 0).getDate();
    },

    /**
     * Returns the last date of the current month formatted according to the given format.
     * Supported formats: "MM-DD-YYYY", "MM-DD-YY", "DD-MM-YYYY", "DD-MM-YY", "YYYY-MM-DD"
     * @param {"MM-DD-YYYY" | "MM-DD-YY" | "DD-MM-YYYY" | "DD-MM-YY" | "YYYY-MM-DD"} format
     * @returns {string}
     */
    getLastDateOfMonth(format = "DD-MM-YYYY") {
        const currentDate = getCurrentDate();
        const lastDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        return formatDate(lastDate, format);
    },

    /**
     * Checks if a given year is a leap year.
     * @param {number} year - Full year (e.g., 2024).
     * @returns {boolean}
     */
    isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    },

    /**
     * Returns the current quarter of the year (1-4).
     * @returns {number}
     */
    getCurrentQuarter() {
        const month = getCurrentDate().getMonth() + 1;
        return Math.floor((month - 1) / 3) + 1;
    },

    /**
     * Returns the start date of the current quarter formatted according to the given format.
     * Supported formats: "MM-DD-YYYY", "MM-DD-YY", "DD-MM-YYYY", "DD-MM-YY", "YYYY-MM-DD"
     * @param {"MM-DD-YYYY" | "MM-DD-YY" | "DD-MM-YYYY" | "DD-MM-YY" | "YYYY-MM-DD"} format
     * @returns {string}
     */
    getQuarterStartDate(format = "DD-MM-YYYY") {
        const quarter = this.getCurrentQuarter();
        const currentDate = getCurrentDate();
        const year = currentDate.getFullYear();
        const startMonth = (quarter - 1) * 3;

        const firstDate = new Date(year, startMonth, 1);
        return formatDate(firstDate, format);
    },

    /**
     * Returns the end date of the current quarter formatted according to the given format.
     * Supported formats: "MM-DD-YYYY", "MM-DD-YY", "DD-MM-YYYY", "DD-MM-YY", "YYYY-MM-DD"
     * @param {"MM-DD-YYYY" | "MM-DD-YY" | "DD-MM-YYYY" | "DD-MM-YY" | "YYYY-MM-DD"} format
     * @returns {string}
     */
    getQuarterEndDate(format = "DD-MM-YYYY") {
        const quarter = this.getCurrentQuarter();
        const currentDate = getCurrentDate();
        const year = currentDate.getFullYear();
        const endMonth = quarter * 3;

        const lastDate = new Date(year, endMonth, 0);
        return formatDate(lastDate, format);
    },

    /**
     * Adds a number of days to the given date specified by day, month, and year.
     * @param {number} day - Day of the month (1-31)
     * @param {number} month - Month number (1-12)
     * @param {number} year - Full year (e.g., 2025)
     * @param {number} daysToAdd - Number of days to add (can be negative)
     * @param {"MM-DD-YYYY" | "MM-DD-YY" | "DD-MM-YYYY" | "DD-MM-YY", "YYYY-MM-DD"} format - Desired output format
     * @returns {string}
     */
    addDays(day, month, year, daysToAdd, format = "DD-MM-YYYY") {
        const date = new Date(year, month - 1, day);
        date.setDate(date.getDate() + daysToAdd);
        return formatDate(date, format);
    },

    /**
     * Returns date in the desired format by day, month, and year.
     * @param {number} day - Day of the month (1-31)
     * @param {number} month - Month number (1-12)
     * @param {number} year - Full year (e.g., 2025)
     * @param {"MM-DD-YYYY" | "MM-DD-YY" | "DD-MM-YYYY" | "DD-MM-YY" | "YYYY-MM-DD"} format - Desired output format
     * @returns {string}
     */
    getAnyDate(day, month, year, format = "DD-MM-YYYY") {
        const date = new Date(year, month - 1, day);
        return formatDate(date, format);
    },

    /**
     * Validates if a given input is a valid date.
     * @param {*} date - Input to check.
     * @returns {boolean}
     */
    isValidDate(date) {
        return date instanceof Date && !isNaN(date.valueOf());
    },

    /**
     * Return boolean: true if startDate is less than endDate, else false.
     * Works with multiple formats.
     * Supported formats: "MM-DD-YYYY", "MM-DD-YY", "DD-MM-YYYY", "DD-MM-YY", "YYYY-MM-DD"
     * @param {string} startDate
     * @param {string} endDate
     * @param {"MM-DD-YYYY" | "MM-DD-YY" | "DD-MM-YYYY" | "DD-MM-YY" | "YYYY-MM-DD"} format
     * @returns {boolean}
     */
    areDatesValid(startDate, endDate, format = "DD-MM-YYYY") {
        const start = parseDateString(startDate, format);
        const end = parseDateString(endDate, format);
        return start < end;
    }

};

module.exports = DateService;