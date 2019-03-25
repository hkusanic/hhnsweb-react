var keystone = require('keystone');
let logger = require('./../../logger/logger');

/**
 * List Page
 */

// Getting our page model




var Mkv = keystone.list('Mkv');

// Creating the API end point
// More about keystone api here: https://gist.github.com/JedWatson/9741171
exports.list = function (req, res) {

	if (req.query.year) {
		let year_query = {
			"year": {
				$regex: ".*" + req.query.year + ".*",
				'$options': 'i'
			}
		};

		query.push(year_query);
	}


	let filters = {};

	if (query.length > 0) {
		filters = {
			"$and": query
		}
	}


	logger.info({
		req: req
	}, "API list mkv");
	Mkv.paginate({
		page: req.query.page || 1,
		perPage: 20,
		filters: filters
	}).exec(function (err, items) {
		if (err) {
			logger.error({
				error: err
			}, "API list mkv");
			return res.apiError('database error', err);
		}
		return res.apiResponse({
			success: true,
			mkv: items,
			total: items.results.length,

		});
		// Using express req.query we can limit the number of recipes returned by setting a limit property in the link
		// This is handy if we want to speed up loading times once our recipe collection grows
	});
};


exports.create = function (req, res) {
    
	var item = new Mkv.model(),
		data = (req.method == 'POST') ? req.body : req.query;
		logger.info({
			req: req
		}, "API create mkv");
	item.getUpdateHandler(req).process(data, function (err) {

		if (err) {
			logger.error({
				error: err
			}, "API create mkv");
			return res.apiError('error', err);
		}

		res.apiResponse({
			Mkv: item
		});

	});
}


exports.createBulk = function (req, res) {
    logger.info({
		req: req
	}, "API createBulk mkv");
	keystone.createItems({
	      Mkv: req.body
	}, function (err, stats) {
		if (err) {
			logger.error({
				error: err
			}, "API createBulk mkv");
			return res.apiError('error', err);
		}
		return res.apiResponse({
			Mkv: true
		});
	});
}



exports.updateBulk = function (req, res) {
	logger.info({
		req: req
	}, "API updateBulk mkv");
	if (!req.body) {
		logger.error({
			error: 'No Data'
		}, "API updateBulk mkv");
		res.json({
			error: {
				title: 'Data is Reqired',
				detail: 'Mandatory values are missing. Please check.'
			}
		});
	}
	let data = req.body;
	for (let i = 0; i < data.length; i++) {
		Mkv.model.findOne({
			uuid: data[i].uuid
		}).exec(function (err, item) {

			if (err) {
				logger.error({
					error: err
				}, "API updateBulk mkv");
				return res.apiError('database error', err);
			}
			if (!item) {
				logger.error({
					error: 'No Item'
				}, "API updateBulk mkv");
				return res.apiError('not found');
			}

			item.getUpdateHandler(req).process(data[i], function (err) {

				if (err) {
					logger.error({
						error: err
					}, "API updateBulk mkv");
					return res.apiError('create error', err);
				}

				res.apiResponse({
					Mkv: item
				});

			});

		});
	}
}

exports.update = function (req, res) {
	logger.info({
		req: req
	}, "API update mkv");
	let data = req.body;
	Mkv.model.findOne({
		uuid: req.body.id
	}).exec(function (err, item) {

		if (err) {
			logger.error({
				error: err
			}, "API update mkv");
			return res.apiError('database error', err);
		}
		if (!item) {
			logger.error({
				error: 'No Item'
			}, "API update mkv");
			return res.apiError('not found');
		}

		item.getUpdateHandler(req).process(req.body, function (err) {

			if (err) {
				logger.error({
					error: err
				}, "API update mkv");
				return res.apiError('create error', err);
			}

			res.apiResponse({
				Mkv: item
			});

		});

	});
}


exports.remove = function (req, res) {
	logger.info({
		req: req
	}, "API remove mkv");
	Mkv.model.findById(req.params.id).exec(function (err, item) {

		if (err) {
			logger.error({
				error: err
			}, "API remove mkv");
			return res.apiError('database error', err);
		}
		if (!item) {
			logger.error({
				error: 'No Item'
			}, "API remove mkv");
			return res.apiError('not found');
		}

		item.remove(function (err) {
			if (err) {
				logger.error({
					error: err
				}, "API remove mkv");
				return res.apiError('database error', err);
			}

			return res.apiResponse({
				Mkv: true
			});
		});

	});
}
