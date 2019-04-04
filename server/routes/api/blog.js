var keystone = require('keystone');
let logger = require('./../../logger/logger');

/**
 * List Page
 */

// Getting our page model
var Blog = keystone.list('Blog');

// Creating the API end point
// More about keystone api here: https://gist.github.com/JedWatson/9741171
exports.list = function (req, res) {
	// Querying the data this works similarly to the Mongo db.collection.find() method
	logger.info(
		{
			req: req,
		},
		'API list blog'
	);
	Blog.paginate({
		page: req.query.page || 1,
		perPage: 20,
	}).exec(function (err, items) {
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
			blog: items,
		});

		// Using express req.query we can limit the number of recipes returned by setting a limit property in the link
		// This is handy if we want to speed up loading times once our blog collection grows
	});
};

exports.get = function (req, res) {
	logger.info(
		{
			req: req,
		},
		'API get blog'
	);
	Blog.model
		.findOne()
		.where({ uuid: req.body.uuid })
		.exec(function (err, item) {
			if (err) {
				logger.error(
					{
						error: err,
					},
					'API get blog'
				);
				return res.apiError('database error', err);
			}
			if (!item) {
				logger.error(
					{
						error: 'item not found',
					},
					'API get blog'
				);
				return res.apiError('not found');
			}
			res.apiResponse({
				blog: item,
			});
		});
};

exports.create = function (req, res) {
	var item = new Blog.model();
	var data = req.method === 'POST' ? req.body : req.query;
	logger.info(
		{
			req: req,
		},
		'API create Blog'
	);
	item.getUpdateHandler(req).process(data, function (err) {
		if (err) {
			logger.error(
				{
					error: err,
				},
				'API create Blog'
			);
			return res.apiError('error', err);
		}

		res.apiResponse({
			Blog: item,
		});
	});
};
