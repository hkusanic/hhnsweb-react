var keystone = require('keystone');
let logger = require('./../../logger/logger');


var Comment = keystone.list('Comment');

exports.list = function (req, res) {

	logger.info({
		req: req,
	}, 'API get comment');
	Comment.model.find().where({ lecture_uuid: req.query.uuid, approved: true }).exec(function (err, item) {
		if (err) {
			logger.error({
				error: err,
			}, 'API get comment');
			return res.apiError('database error', err);
		}
		if (!item) {
			logger.error({
				error: 'item not found',
			}, 'API get comment');
			return res.apiError('not found');
		}
		res.apiResponse({
			comment: item,
		});
	});
};


exports.create = function (req, res) {

	var item = new Comment.model();
	var data = (req.method === 'POST') ? req.body : req.query;
	logger.info({
		req: req,
	}, 'API create comment');
	item.getUpdateHandler(req).process(data, function (err) {

		if (err) {
			logger.error({
				error: err,
			}, 'API create comment');
			return res.apiError('error', err);
		}

		res.apiResponse({
			Comment: item,
		});

	});
};
