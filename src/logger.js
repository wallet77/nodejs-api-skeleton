'use strict';
const path = require('path');

const baseLogPath = path.join(__dirname, '/../logs');

const bunyan = require('bunyan');
const levels = ['error', 'warn', 'info', 'debug', 'trace'];
const rotating = 5;
const period = '1d';
const errorStream = {
  level: 'error',
  path: baseLogPath + '/error.log',
  type: 'rotating-file',
  period: period,
  count: rotating
};
const warningStream = {
  level: 'warn',
  path: baseLogPath + '/warn.log',
  type: 'rotating-file',
  period: period,
  count: rotating
};
const infoStream = {
  level: 'info',
  stream: process.stdout
};
const debugStream = {
  level: 'debug',
  path: baseLogPath + '/debug.log',
  type: 'rotating-file',
  period: period,
  count: rotating
};
const traceStream = {
  level: 'trace',
  path: baseLogPath + '/trace.log',
  type: 'rotating-file',
  period: period,
  count: rotating
};
const streams = [
  infoStream,
  errorStream,
  warningStream,
  debugStream,
  traceStream
];

let level = global.logsLevel ? global.logsLevel : 'error';

// prevent human errors when starting api
if (levels.indexOf(level) === -1) {
  level = 'error';
}

const logger = bunyan.createLogger({
  name: 'API',
  streams: streams,
  serializers: bunyan.stdSerializers
});

logger.level(level);

module.exports = logger;
