'use strict';

const InsightsUtils = require('../utils/insights');
const defaultValues = require('../utils/default');

class Call {
  getCount (options = {}) {
    const since = options.since || defaultValues.since.minute;
    const appName = options.appName || defaultValues.appName;
    const timeseries = options.timeseries || '';

    const query = `SELECT count(*) FROM Transaction where appName=${appName} since ${since} ago ${timeseries}`;

    return InsightsUtils.executeQuery(query);
  }

  getResponseTime (options = {}) {
    const since = options.since || defaultValues.since.minute;
    const appName = options.appName || defaultValues.appName;

    const query = `SELECT average(duration) from Transaction since ${since} ago where appName=${appName}`;

    return InsightsUtils.executeQuery(query);
  }
}

module.exports = new Call();
