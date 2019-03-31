var keystone = require('keystone');
let logger = require('./../../logger/logger');


var Replies = keystone.list('Replies');

exports.list = function (req, res) {
	
	logger.info({
		req: req
	}, "API get replies");
	Replies.model.find().where({ comment_uuid: req.query.uuid }).exec(function (err, item) {
		if (err) {
			logger.error({
				error: err
			}, "API get replies");
			return res.apiError('database error', err);
		}
		if (!item) {
			logger.error({
				error: 'item not found'
			}, "API get replies");
			return res.apiError('not found');
		}
		res.apiResponse({
			replies: item,
		});
	});
};


exports.create = function (req, res) {
    
	var item = new Replies.model(),
		data = (req.method == 'POST') ? req.body : req.query;
		logger.info({
			req: req
		}, "API create replies");
	item.getUpdateHandler(req).process(data, function (err) {

		if (err) {
			logger.error({
				error: err
			}, "API create replies");
			return res.apiError('error', err);
		}

		res.apiResponse({
			Replies: item
		});

	});
}