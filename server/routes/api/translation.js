var keystone = require('keystone');
let logger = require('./../../logger/logger');


var Translation = keystone.list('Translation');

exports.list = function (req, res) {
	
	Translation.model.find(function (err, items) {
	
		if (err) return res.apiError('database error', err);
		res.apiResponse({
		
			translation: items,
		});
	}).sort('title');
};


exports.createBulk = function (req, res) {
    logger.info({
		req: req
	}, "API createBulk translation");
	keystone.createItems({
	      Translation: req.body
	}, function (err, stats) {
		if (err) {
			logger.error({
				error: err
			}, "API createBulk translation");
			return res.apiError('error', err);
		}
		return res.apiResponse({
			Translation: true
		});
	});
}

exports.create = function (req, res) {
    
	var item = new Translation.model(),
		data = (req.method == 'POST') ? req.body : req.query;
		logger.info({
			req: req
		}, "API create translation");
	item.getUpdateHandler(req).process(data, function (err) {

		if (err) {
			logger.error({
				error: err
			}, "API create translation");
			return res.apiError('error', err);
		}

		res.apiResponse({
			Translation: item
		});

	});
}