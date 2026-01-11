/**
 * Logger utility for test automation framework
 * Provides structured logging with different log levels
 */

class Logger {
  constructor() {
    this.logLevel = process.env.LOG_LEVEL || 'INFO';
    this.levels = {
      DEBUG: 0,
      INFO: 1,
      WARN: 2,
      ERROR: 3,
    };
  }

  /**
   * Format log message with timestamp
   * @param {string} level - Log level
   * @param {string} message - Log message
   * @returns {string} Formatted log message
   */
  formatMessage(level, message) {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] ${message}`;
  }

  /**
   * Check if log level should be displayed
   * @param {string} level - Log level to check
   * @returns {boolean} True if should log
   */
  shouldLog(level) {
    return this.levels[level] >= this.levels[this.logLevel];
  }

  /**
   * Log debug message
   * @param {string} message - Log message
   */
  debug(message) {
    if (this.shouldLog('DEBUG')) {
      console.log(this.formatMessage('DEBUG', message));
    }
  }

  /**
   * Log info message
   * @param {string} message - Log message
   */
  info(message) {
    if (this.shouldLog('INFO')) {
      console.log(this.formatMessage('INFO', message));
    }
  }

  /**
   * Log warning message
   * @param {string} message - Log message
   */
  warn(message) {
    if (this.shouldLog('WARN')) {
      console.warn(this.formatMessage('WARN', message));
    }
  }

  /**
   * Log error message
   * @param {string} message - Log message
   */
  error(message) {
    if (this.shouldLog('ERROR')) {
      console.error(this.formatMessage('ERROR', message));
    }
  }
}

module.exports = new Logger();
