var keystone = require('keystone');
let logger = require('./../../logger/logger');
var GALLERY_LIST = require('../../constants/constant');

var Gallery = keystone.list('Gallery');


exports.list = function (req, res) {
	// Querying the data this works similarly to the Mongo db.collection.find() method
	 logger.info({
		req: req,
	}, 'API list gallery');
	Gallery.model.find(function (err, items) {
		// Make sure we are handling errors
		if (err) {
			logger.error({
				error: err,
			}, 'API list gallery');
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

exports.list = function (req, res) {
	// Querying the data this works similarly to the Mongo db.collection.find() method
	 logger.info({
		req: req,
	}, 'API list gallery');
	Gallery.model.find(function (err, items) {
		// Make sure we are handling errors
		if (err) {
			logger.error({
				error: err,
			}, 'API list gallery');
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

	var item = new Gallery.model();
	var data = (req.method === 'POST') ? req.body : req.query;
	logger.info({
		req: req,
	}, 'API create gallery');
	item.getUpdateHandler(req).process(data, function (err) {

		if (err) {
			logger.error({
				error: err,
			}, 'API create gallery');
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
	Gallery.model.findOne({ uuid: req.params.id }).exec(function (err, item) {

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

exports.getGalleryByGallery = function (req, res) {

	logger.info({
		req: req,
	}, 'API get gallery');
	Gallery.model.find().where({ gallery: req.body.gallery }).sort('-date').exec(function (err, item) {
		if (err) {
			logger.error({
				error: err,
			}, 'API get gallery');
			return res.apiError('database error', err);
		}
		if (!item) {
			logger.error({
				error: 'item not found',
			}, 'API get gallery');
			return res.apiError('not found');
		}
		res.apiResponse({
			gallery: item,
		});
	});
};

exports.getGallerybyid = function (req, res) {
	if (!req.body.uuid) {
		res.json({ error: { title: 'Id is Required', detail: 'Mandatory values are missing. Please check.' } });
	}

	Gallery.model.findOne().where('uuid', req.body.uuid).exec((err, item) => {

		if (err || !item) {
			logger.error({
				error: err,
			}, 'API getGallerybyid');
			return res.json({ error: { title: 'Not able to find gallery' } });
		}
		res.json({
			gallery: item,
			success: true,
		});
	});

};

exports.getStaticGallery = function (req, res) {

	logger.info({
		req: req,
	}, 'API get static gallery');

	    if (GALLERY_LIST.CONSTANTS.GALLERY) {
		res.apiResponse({
			gallery: GALLERY_LIST.CONSTANTS.GALLERY,
		});
	    }
	else {
		return res.apiError('not found');
	}
};

exports.update = function (req, res) {
	logger.info({
		req: req,
	}, 'API update gallery');

	Gallery.model.findOne({ uuid: req.params.id }).exec(function (err, item) {

		if (err) {
			logger.error({
				error: err,
			}, 'API update gallery');
			return res.apiError('database error', err);
		}
		if (!item) {
			logger.error({
				error: 'Item not found',
			}, 'API update gallery');
			return res.apiError('not found');
		}

		var data = (req.method === 'POST') ? req.body : req.query;

		item.getUpdateHandler(req).process(data, function (err) {

			if (err) {
				logger.error({
					error: err,
				}, 'API update gallery');
				return res.apiError('create error', err);
			}

			res.apiResponse({
				Gallery: item,
			});

		});

	});
};


