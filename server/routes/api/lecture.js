var keystone = require('keystone');
let logger = require('./../../logger/logger');

/**
 * List Page
 */

// Getting our page model




var Lecture = keystone.list('Lecture');

// Creating the API end point
// More about keystone api here: https://gist.github.com/JedWatson/9741171
exports.list = function (req, res) {
	// Querying the data this works similarly to the Mongo db.collection.find() method
	let query = [];


	if (req.query.title) {
		let title = {
			"en.title": {
				$regex: ".*" + req.query.title + ".*",
				'$options': 'i'
			}
		};
		if (req.cookies.language === 'en')
			title = {
				"en.title": {
					$regex: ".*" + req.query.title + ".*",
					'$options': 'i'
				}
			};
		if (req.cookies.language === 'ru')
			title = {
				"ru.title": {
					$regex: ".*" + req.query.title + ".*",
					'$options': 'i'
				}
			};

		query.push(title);
	}
	if (req.query.verse) {
		query.push({
			"verse": {
				$regex: ".*" + req.query.verse + ".*",
				'$options': 'i'
			}
		});
	}
	if (req.query.location) {
		let location = {
			"en.location": {
				$regex: ".*" + req.query.location + ".*",
				'$options': 'i'
			}
		};
		if (req.cookies.language === 'en')
			location = {
				"en.location": {
					$regex: ".*" + req.query.location + ".*",
					'$options': 'i'
				}
			};
		if (req.cookies.language === 'ru')
			location = {
				"ru.location": {
					$regex: ".*" + req.query.location + ".*",
					'$options': 'i'
				}
			};

		query.push(location);
	}
	if (req.query.topic) {
		let topic_query = {
			"en.topic": {
				$regex: ".*" + req.query.topic + ".*",
				'$options': 'i'
			}
		};
		if (rreq.cookies.language === 'en')
			topic_query = {
				"en.topic": {
					$regex: ".*" + req.query.topic + ".*",
					'$options': 'i'
				}
			};
		if (req.cookies.language === 'ru')
			topic_query = {
				"ru.topic": {
					$regex: ".*" + req.query.topic + ".*",
					'$options': 'i'
				}
			};

		query.push(topic_query)

	}
	if (req.query.event) {
		let event_query = {
			"en.event": {
				$regex: ".*" + req.query.event + ".*",
				'$options': 'i'
			}
		};
		if (req.cookies.language === 'en')
			event_query = {
				"en.event": {
					$regex: ".*" + req.query.event + ".*",
					'$options': 'i'
				}
			};
		if (req.cookies.language === 'ru')
			event_query = {
				"ru.event": {
					$regex: ".*" + req.query.event + ".*",
					'$options': 'i'
				}
			};

		query.push(event_query);
	}



	let filters = {};

	if (req.query.event || req.query.topic || req.query.title || req.query.verse || req.query.location) {
		filters = {
			"$and": query
		}
	}


	logger.info({
		req: req
	}, "API list lecture");
	Lecture.paginate({
		page: req.query.page || 1,
		perPage: 20,
		filters: filters
	}).exec(function (err, items) {
		if (err) {
			logger.error({
				error: err
			}, "API list lecture");
			return res.apiError('database error', err);
		}
		return res.apiResponse({
			success: true,
			lecture: items,
			total: items.results.length,

		});
		// Using express req.query we can limit the number of recipes returned by setting a limit property in the link
		// This is handy if we want to speed up loading times once our recipe collection grows
	});
};


exports.create = function (req, res) {
    
	var item = new Lecture.model(),
		data = (req.method == 'POST') ? req.body : req.query;
		logger.info({
			req: req
		}, "API create lecture");
	item.getUpdateHandler(req).process(data, function (err) {

		if (err) {
			logger.error({
				error: err
			}, "API create lecture");
			return res.apiError('error', err);
		}

		res.apiResponse({
			Lecture: item
		});

	});
}


exports.createBulk = function (req, res) {
    logger.info({
		req: req
	}, "API createBulk lecture");
	keystone.createItems({
	      Lecture: req.body
	}, function (err, stats) {
		if (err) {
			logger.error({
				error: err
			}, "API createBulk lecture");
			return res.apiError('error', err);
		}
		return res.apiResponse({
			Lecture: true
		});
	});
}



exports.updateBulk = function (req, res) {
	logger.info({
		req: req
	}, "API updateBulk lecture");
	if (!req.body) {
		logger.error({
			error: 'No Data'
		}, "API updateBulk lecture");
		res.json({
			error: {
				title: 'Data is Reqired',
				detail: 'Mandatory values are missing. Please check.'
			}
		});
	}
	let data = req.body;
	for (let i = 0; i < data.length; i++) {
		Lecture.model.findOne({
			uuid: data[i].uuid
		}).exec(function (err, item) {

			if (err) {
				logger.error({
					error: err
				}, "API updateBulk lecture");
				return res.apiError('database error', err);
			}
			if (!item) {
				logger.error({
					error: 'No Item'
				}, "API updateBulk lecture");
				return res.apiError('not found');
			}

			item.getUpdateHandler(req).process(data[i], function (err) {

				if (err) {
					logger.error({
						error: err
					}, "API updateBulk lecture");
					return res.apiError('create error', err);
				}

				res.apiResponse({
					Lecture: item
				});

			});

		});
	}
}

exports.update = function (req, res) {
	logger.info({
		req: req
	}, "API update lecture");
	let data = req.body;
	Lecture.model.findOne({
		uuid: req.body.id
	}).exec(function (err, item) {

		if (err) {
			logger.error({
				error: err
			}, "API update lecture");
			return res.apiError('database error', err);
		}
		if (!item) {
			logger.error({
				error: 'No Item'
			}, "API update lecture");
			return res.apiError('not found');
		}

		item.getUpdateHandler(req).process(req.body, function (err) {

			if (err) {
				logger.error({
					error: err
				}, "API update lecture");
				return res.apiError('create error', err);
			}

			res.apiResponse({
				Lecture: item
			});

		});

	});
}


exports.remove = function (req, res) {
	logger.info({
		req: req
	}, "API remove lecture");
	Lecture.model.findById(req.params.id).exec(function (err, item) {

		if (err) {
			logger.error({
				error: err
			}, "API remove lecture");
			return res.apiError('database error', err);
		}
		if (!item) {
			logger.error({
				error: 'No Item'
			}, "API remove lecture");
			return res.apiError('not found');
		}

		item.remove(function (err) {
			if (err) {
				logger.error({
					error: err
				}, "API remove lecture");
				return res.apiError('database error', err);
			}

			return res.apiResponse({
				Lecture: true
			});
		});

	});
}
