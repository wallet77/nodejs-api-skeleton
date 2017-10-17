'use strict';

const logger = require('../logger');

class Rest {
  sendResponse (req, res, response) {
    let code = response.code ? response.code : 200;
    let status = response.status ? response.status : 'success';
    let json = {};
    let errorMsg;

    // if an additional information is found
    if (response.info) {
      // if an error is found in response we log it
      if (response.info.err) {
        logger.error({req: req, err: response.info.err});
        code = 500;
      }
    } else if (errorMsg) { // log error even if no more information is available
      errorMsg = {req: req};
      if (req.body) {
        errorMsg.body = req.body;
      }

      logger.error(errorMsg);
    }

    if (code !== 200) {
      status = 'error';
    }

    json.status = status;

    if (response.message) {
      json.message = response.message;
    }

    if (code === 200) {
      json.data = response.data || response;
    }

    res.status(code).send(json);
  }
}

module.exports = new Rest();
