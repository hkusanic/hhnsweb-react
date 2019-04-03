var keystone = require('keystone');
let logger = require('./../../logger/logger');


var Replies = keystone.list('Replies');

exports.list = function (req, res) {

	logger.info({
		req: req,
	}, 'API get replies');
	Replies.model.find().where({ comment_uuid: req.query.uuid }).exec(function (err, item) {
		if (err) {
			logger.error({
				error: err,
			}, 'API get replies');
			return res.apiError('database error', err);
		}
		if (!item) {
			logger.error({
				error: 'item not found',
			}, 'API get replies');
			return res.apiError('not found');
		}
		res.apiResponse({
			replies: item,
		});
	});
};


exports.create = function (req, res) {

	var item = new Replies.model();
	var data = (req.method === 'POST') ? req.body : req.query;
	logger.info({
		req: req,
	}, 'API create replies');
	item.getUpdateHandler(req).process(data, function (err) {

		if (err) {
			logger.error({
				error: err,
			}, 'API create replies');
			return res.apiError('error', err);
		}

		res.apiResponse({
			Replies: item,
		});

	});
};


exports.remove = function (req, res) {
	logger.info({
		req: req,
	}, 'API remove replies');
	Replies.model.findOne({ uuid: req.params.id }).exec(function (err, item) {

		if (err) {
			logger.error({
				error: err,
			}, 'API remove replies');
			return res.apiError('database error', err);
		}
		if (!item) {
			logger.error({
				error: 'No Item',
			}, 'API remove replies');
			return res.apiError('not found');
		}

		item.remove(function (err) {
			if (err) {
				logger.error({
					error: err,
				}, 'API remove replies');
				return res.apiError('database error', err);
			}

			return res.apiResponse({
				Reply: true,
			});
		});

	});
};

exports.removeByCommentId = function (req, res) {
	logger.info({
		req: req,
	}, 'API remove replies');
	Replies.model.find({comment_uuid: req.params.id }).remove().exec(function(err, item) {

		if (err) {
			logger.error({
				error: err,
			}, 'API remove replies');
			return res.apiError('database error', err);
		}
		if (!item) {
			logger.error({
				error: 'No Item',
			}, 'API remove replies');
			return res.apiError('not found');
		}

		
			return res.apiResponse({
				Reply: true,
			});
		

	});
};
