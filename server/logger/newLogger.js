const bunyan = require('bunyan');
const fs = require('fs-extra');
const config = require('../config/index');

const logDirectory = `${config.rootPath}/logs`;
const errorLogs = `${logDirectory}/errorsLogs`;
const infoLogs = `${logDirectory}/infoLogs`;

fs.ensureDirSync(errorLogs);
fs.ensureDirSync(infoLogs);

const date = new Date();
const dateDDMMYYYY = `${date.getDate()}-${date.getMonth()
	+ 1}-${date.getUTCFullYear()}`;

const options = {
	name: 'HHNS',
	src: true,
	streams: [
		{
			type: 'rotating-file',
			level: 'error',
			path: `${errorLogs}/app-${dateDDMMYYYY}.log`, // log level debug write to a file
			period: '1d', // daily rotation
			count: 5,
			serializers: {
				err: bunyan.stdSerializers.err,
			},
		},
		{
			type: 'rotating-file',
			level: config.envConfiguration.logLevel,
			path: `${infoLogs}/app-${dateDDMMYYYY}.log`,
			period: '1d',
			count: 5,
			serializers: {
				req: bunyan.stdSerializers.req,
			},
		},
	],
};
const log = bunyan.createLogger(options);

function logRequestBody (req, res, next) {
	const logchild = log.child(
		{
			id: req.id,
		},
		true
	);
	logchild.info({
		type: 'REQUEST',
		req: {
			body: req.body,
			params: req.params,
			query: req.query,
			url: req.url,
		},
	});
	next();
}

exports.logRequestBody = logRequestBody;
exports.logger = log;
