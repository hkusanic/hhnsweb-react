var keystone = require('keystone');
let logger = require('./../../logger/logger');


var Topic = keystone.list('Topic');

exports.list = function (req, res) {
	
	Topic.model.find(function (err, items) {
	
		if (err) return res.apiError('database error', err);
		res.apiResponse({
		
			topic: items,
		});
	}).sort('title');
};


exports.createBulk = function (req, res) {
    logger.info({
		req: req
	}, "API createBulk topic");
	keystone.createItems({
	      Topic: req.body
	}, function (err, stats) {
		if (err) {
			logger.error({
				error: err
			}, "API createBulk topic");
			return res.apiError('error', err);
		}
		return res.apiResponse({
			Topic: true
		});
	});
}

exports.create = function (req, res) {
    
	var item = new Topic.model(),
		data = (req.method == 'POST') ? req.body : req.query;
		logger.info({
			req: req
		}, "API create topic");
	item.getUpdateHandler(req).process(data, function (err) {

		if (err) {
			logger.error({
				error: err
			}, "API create topic");
			return res.apiError('error', err);
		}

		res.apiResponse({
			Topic: item
		});

	});
}