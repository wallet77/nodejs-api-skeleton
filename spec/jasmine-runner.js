const Jasmine = require('jasmine');
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

const jrunner = new Jasmine();
jasmine.getEnv().clearReporters(); // remove default reporter logs
jasmine.getEnv().addReporter(new SpecReporter( // add jasmine-spec-reporter
    {
        displayStacktrace: 'none', // display stacktrace for each failed assertion, values: (all|specs|summary|none)
        displaySuccessesSummary: false, // display summary of all successes after execution
        displayFailuresSummary: true, // display summary of all failures after execution
        displayPendingSummary: true, // display summary of all pending specs after execution
        displaySuccessfulSpec: true, // display each successful spec
        displayFailedSpec: true, // display each failed spec
        displayPendingSpec: false, // display each pending spec
        displaySpecDuration: true, // display each spec duration
        displaySuiteNumber: false, // display each suite number (hierarchical)
        colors: {
            success: 'green',
            failure: 'red',
            pending: 'yellow'
        },
        prefixes: {
            success: '✓ ',
            failure: '✗ ',
            pending: '* '
        },
        customProcessors: []
    }
));
jrunner.loadConfigFile(`${__dirname}/support/jasmine.json`); // load jasmine.json configuration
jrunner.execute();
