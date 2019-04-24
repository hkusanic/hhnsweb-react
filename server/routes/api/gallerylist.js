var keystone = require('keystone');
let logger = require('./../../logger/logger');

var GalleryList = keystone.list('GalleryList');


exports.list = function (req, res) {
	// Querying the data this works similarly to the Mongo db.collection.find() method
	 logger.info({
		req: req,
	}, 'API list gallery');
	GalleryList.model.find(function (err, items) {
		// Make sure we are handling errors
		if (err) {
			logger.error({
				error: err,
			}, 'API list gallerylist');
			return res.apiError('database error', err);
		}
		res.apiResponse({
			// Filter page by
			gallery: items,
		});

	// Using express req.query we can limit the number of recipes returned by setting a limit property in the link
	// This is handy if we want to speed up loading times once our recipe collection grows
	}).limit(Number(req.query.limit));
};



exports.create = function (req, res) {

	var item = new GalleryList.model();
	var data = (req.method === 'POST') ? req.body : req.query;
	logger.info({
		req: req,
	}, 'API create gallery');
	item.getUpdateHandler(req).process(data, function (err) {

		if (err) {
			logger.error({
				error: err,
			}, 'API create gallerylist');
			return res.apiError('error', err);
		}

		res.apiResponse({
			Gallery: item,
		});

	});
};


exports.remove = function (req, res) {
	logger.info({
		req: req,
	}, 'API remove gallery');
	GalleryList.model.findOne({ uuid: req.params.id }).exec(function (err, item) {

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
				Gallery: true,
			});
		});

	});
};

