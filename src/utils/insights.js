'use strict';

const config = require('../../config/insights.json');
const Insights = require('node-insights');

/**
 * Class acts as a wrapper to request insights system
 */
class InsightsUtils {
  /**
   * Method to execute a query
   *
   * @param {String} query - an object representing express request
   * @returns {Promise}
   */
  executeQuery (query) {
    const insights = new Insights({
      queryKey: config.apiKey,
      accountId: config.accountId
    });

    return new Promise(function (resolve, reject) {
      insights.query(query, function (err, responseBody) {
        if (!err) {
          resolve(responseBody);
        } else {
          reject(new Error(err));
        }
      });
    });
  }
}

module.exports = new InsightsUtils();
