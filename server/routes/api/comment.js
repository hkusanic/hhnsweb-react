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


exports.remove = function (req, res) {
	logger.info({
		req: req,
	}, 'API remove comment');
	Comment.model.findOne({ uuid: req.params.id }).exec(function (err, item) {

		if (err) {
			logger.error({
				error: err,
			}, 'API remove comment');
			return res.apiError('database error', err);
		}
		if (!item) {
			logger.error({
				error: 'No Item',
			}, 'API remove comment');
			return res.apiError('not found');
		}

		item.remove(function (err) {
			if (err) {
				logger.error({
					error: err,
				}, 'API remove comment');
				return res.apiError('database error', err);
			}

			return res.apiResponse({
				Comment: true,
			});
		});

	});
};

exports.getlimitedlist = function (req, res) {
	
	let DateSort = 'date';

	logger.info(
		{
			req: req,
		},
		'API list comment'
	);
	Comment.paginate({
		page: req.query.page || 1,
		perPage: 10,
	}).sort('-dateCreated').exec(function (err, items) {
		if (err) {
			logger.error(
				{
					error: err,
				},
				'API list blog'
			);
			return res.apiError('database error', err);
		}
		res.apiResponse({
			// Filter page by
			comment: items,
		});

		// Using express req.query we can limit the number of recipes returned by setting a limit property in the link
		// This is handy if we want to speed up loading times once our blog collection grows
	});
};
