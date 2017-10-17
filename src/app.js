'use strict';

require('dotenv').config();

global.env = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev';
global.port = process.env.PORT ? process.env.PORT : 3000;
global.logsLevel = process.env.LOGS_LEVEL ? process.env.LOGS_LEVEL : 'error';

// if(global.env === "prod") {
//    require('newrelic');
// }

// ----------------------------------------------------------------------
// Load constants
// ----------------------------------------------------------------------
global.appConstants = require('./constants');

// ----------------------------------------------------------------------
// Dependencies
// ----------------------------------------------------------------------
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const async = require('async');

// ----------------------------------------------------------------------
// LOGGER
// ----------------------------------------------------------------------
const logger = require('./logger');

// ----------------------------------------------------------------------
// Server initialization
// ----------------------------------------------------------------------

const app = express();
const server = require('http').Server(app);

app.use(cors());

app.enable('trust proxy');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// ----------------------------------------------------------------------
// Routes
// ----------------------------------------------------------------------

const
  call = require('./routes/call');

app.use('/call', call);

// ----------------------------------------------------------------------
// Error handlers
// ----------------------------------------------------------------------

// catch 404/405 and forward to error handler
app.use(function (req, res) {
  logger.warn('[405] An user or an application is trying to access an unauthorized route !');
  logger.warn({req: req});
  res.status(405).send({
    message: 'This route is not allowed !'
  });
});

process.on('uncaughtException', function (err) {
  // handle the error safely
  logger.error({err: err});
  process.exit(1);
});

// ----------------------------------------------------------------------
// Start server
// ----------------------------------------------------------------------
server.listen(global.port, function () {
  logger.info('API[env=' + global.env + '] is running on port ' + global.port + '  ...');
});

// ----------------------------------------------------------------------
// Close server
// ----------------------------------------------------------------------
function closeSqlPool (db, callback) {
  global.pool[db].end(function (err) {
    if (err) {
      logger.error(err);
    } else {
      logger.info('Sql pool connection closed with db : ' + db);
    }

    callback(null, 'SQL:' + db);
  });
}

const gracefulExit = function () {
  logger.info('API is shutdown !!!');

  const functionList = [];

  if (global.pool && Object.keys(global.pool).length > 0) {
    for (let db in global.pool) {
      if (global.pool.hasOwnProperty(db)) {
        functionList.push((function (dbName) {
          return function (callback) {
            closeSqlPool(dbName, callback);
          };
        })(db));
      }
    }
  }

  async.parallel(functionList, function (err) {
    if (err) {
      logger.error(err);
    }
    process.exit(0); // close node application
  });
};

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

module.exports = app;
