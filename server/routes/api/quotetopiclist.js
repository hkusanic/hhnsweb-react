var keystone = require('keystone');
let logger = require('./../../logger/logger');

var QuoteTopicList = keystone.list('QuoteTopicList');


exports.list = function (req, res) {
	// Querying the data this works similarly to the Mongo db.collection.find() method
	 logger.info({
		req: req,
	}, 'API list gallery');
	QuoteTopicList.model.find().sort('name').exec(function (err, items) {
		// Make sure we are handling errors
		if (err) {
			logger.error({
				error: err,
			}, 'API list quotetopiclist');
			return res.apiError('database error', err);
		}
		res.apiResponse({
			// Filter page by
			topic: items,
		});

	// Using express req.query we can limit the number of recipes returned by setting a limit property in the link
	// This is handy if we want to speed up loading times once our recipe collection grows
	})
};



exports.create = function (req, res) {

	var item = new QuoteTopicList.model();
	var data = (req.method === 'POST') ? req.body : req.query;
	logger.info({
		req: req,
	}, 'API create gallery');
	item.getUpdateHandler(req).process(data, function (err) {

		if (err) {
			logger.error({
				error: err,
			}, 'API create quotetopiclist');
			return res.apiError('error', err);
		}

		res.apiResponse({
			topic: item,
		});

	});
};


exports.remove = function (req, res) {
	logger.info({
		req: req,
	}, 'API remove gallery');
	QuoteTopicList.model.findOne({ uuid: req.params.id }).exec(function (err, item) {

		if (err) {
			logger.error({
				error: err,
			}, 'API remove gallery');
			return res.apiError('database error', err);
		}
		if (!item) {
			logger.error({
				error: 'No Item',
			}, 'API remove gallery');
			return res.apiError('not found');
		}

		item.remove(function (err) {
			if (err) {
				logger.error({
					error: err,
				}, 'API remove gallery');
				return res.apiError('database error', err);
			}

			return res.apiResponse({
				topic: true,
			});
		});

	});
};

