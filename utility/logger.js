const winston = require('winston')

const options = {
  info: {
    level: 'info',
    filename: './logs/app.log',
    handleExceptions: true,
    json: false,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    format: winston.format.json()
  },
  error: {
    level: 'error',
    filename: './logs/error.log',
    handleExceptions: true,
    json: false,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    format: winston.format.json()
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: true,
    colorize: true,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  },
};




const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.File(options.info),
    new winston.transports.File(options.error),
    new winston.transports.Console(options.console),

  ],
  exitOnError: false
})

module.exports = logger