var bunyan = require('bunyan');
var log = bunyan.createLogger({
    name: "HHNS-log",
    streams: [
        {
            level: 'info',
            path: __dirname + process.env.PATH_ERROR_LOG // log INFO and above to file
        },
        {
            level: 'error',
            path: __dirname + process.env.PATH_INFO_LOG // log ERROR and above to a file
        }
    ]
});

module.exports = log;