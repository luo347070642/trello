import log4j from 'log4js'
const levels = {
  trace: log4j.levels.TRACE.levelStr,
  debug: log4j.levels.DEBUG.levelStr,
  info: log4j.levels.INFO.levelStr,
  warn: log4j.levels.WARN.levelStr,
  error: log4j.levels.ERROR.levelStr,
  fatal: log4j.levels.FATAL.levelStr
}

// log4j配置
log4j.configure({
  appenders: {
    console: { type: 'console' },
    info: {
      type: 'file',
      filename: 'logs/all-logs.log'
    },
    error: {
      type: 'dateFile',
      filename: 'logs/log',
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true // 设置文件名称为 filename + pattern
    }
  },
  categories: {
    default: {
      appenders: ['console'],
      level: 'debug'
    },
    info: {
      appenders: ['info', 'console'],
      level: 'info'
    },
    error: {
      appenders: ['error', 'console'],
      level: 'error'
    }
  }
})

/**
 * 日志输出 level为bug
 * @param { string } content
 */
const debug = (content: string) => {
  let logger = log4j.getLogger('debug')
  logger.level = levels.debug
  logger.debug(content)
}

/**
 * 日志输出 level为info
 * @param { string } content
 */
const info = (content: string) => {
  let logger = log4j.getLogger('info')
  logger.level = levels.info
  logger.info(content)
}

/**
 * 日志输出 level为error
 * @param { string } content
 */
const error = (content: string) => {
  let logger = log4j.getLogger('error')
  logger.level = levels.error
  logger.error(content)
}

export default {
  debug,
  info,
  error
}
