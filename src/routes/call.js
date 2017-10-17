'use strict';

const express = require('express');
const router = express.Router();
const restUtils = require('../utils/rest');
const controller = require('../controllers/call');

/**
 * @api {post} /call/count                   Get apdex from NewRelic
 * @apiVersion 1.0.0
 *
 * @apiGroup Monitoring
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "success"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Error
 *     {
 *       "status": "error",
 *       "message": "..."
 *     }
 */
router.post('/count', function (req, res) {
  const options = req.body.options;

  controller.getCount(options).then(function (response) {
    restUtils.sendResponse(req, res, response);
  }).catch(function (err) {
    restUtils.sendResponse(req, res, {info: {err: err}});
  });
});

/**
 * @api {post} /call/responseTime                   Get average response time from NewRelic
 * @apiVersion 1.0.0
 *
 * @apiGroup Monitoring
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "success"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Error
 *     {
 *       "status": "error",
 *       "message": "..."
 *     }
 */
router.post('/responseTime', function (req, res) {
  const options = req.body.options;

  controller.getResponseTime(options).then(function (response) {
    restUtils.sendResponse(req, res, response);
  }).catch(function (err) {
    restUtils.sendResponse(req, res, {info: {err: err}});
  });
});

module.exports = router;
