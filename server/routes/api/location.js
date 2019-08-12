var keystone = require('keystone');
let logger = require('./../../logger/logger');


var Location = keystone.list('Location');

exports.list = function (req, res) {
	
	Location.model.find(function (err, items) {
	
		if (err) return res.apiError('database error', err);
		res.apiResponse({
		
			location: items,
		});
	}).sort('title');
};


exports.createBulk = function (req, res) {
    logger.info({
		req: req
	}, "API createBulk location");
	keystone.createItems({
	      Location: req.body
	}, function (err, stats) {
		if (err) {
			logger.error({
				error: err
			}, "API createBulk location");
			return res.apiError('error', err);
		}
		return res.apiResponse({
			Location: true
		});
	});
}

exports.create = function (req, res) {
    
	var item = new Location.model(),
		data = (req.method == 'POST') ? req.body : req.query;
		logger.info({
			req: req
		}, "API create location");
	item.getUpdateHandler(req).process(data, function (err) {

		if (err) {
			logger.error({
				error: err
			}, "API create location");
			return res.apiError('error', err);
		}

		res.apiResponse({
			Location: item
		});

	});
}