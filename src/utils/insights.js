'use strict';

const config = require('../../config/insights.json');
const Insights = require('node-insights');

class InsightsUtils {
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
