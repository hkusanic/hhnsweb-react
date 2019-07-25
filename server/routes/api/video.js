var keystone = require('keystone');
let logger = require('./../../logger/logger');
var video_LIST = require('../../constants/constant');

var Video = keystone.list('Video');
function todayDate () {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; // January is 0!

	var yyyy = today.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	}
	if (mm < 10) {
		mm = '0' + mm;
	}
	var today = yyyy + '-' + mm + '-' + dd;
	return today;
}

exports.list = function (req, res) {
	// Querying the data this works similarly to the Mongo db.collection.find() method

	let query = [];

	if (req.query.title) {
		let title = {
			'en.title': {
				$regex: '.*' + req.query.title + '.*',
				$options: 'i',
			},
		};
		if (req.cookies.languageCode === 'en') {
			title = {
				'en.title': {
					$regex: '.*' + req.query.title + '.*',
					$options: 'i',
				},
			};
		}
		if (req.cookies.languageCode === 'ru') {
			title = {
				'ru.title': {
					$regex: '.*' + req.query.title + '.*',
					$options: 'i',
				},
			};
		}

		query.push(title);
	}

	if (req.query.location) {
		let location = {
			'en.location': {
				$regex: '.*' + req.query.location + '.*',
				$options: 'i',
			},
		};
		if (req.cookies.languageCode === 'en') {
			location = {
				'en.location': {
					$regex: '.*' + req.query.location + '.*',
					$options: 'i',
				},
			};
		}
		if (req.cookies.languageCode === 'ru') {
			location = {
				'ru.location': {
					$regex: '.*' + req.query.location + '.*',
					$options: 'i',
				},
			};
		}

		query.push(location);
	}

	if (req.query.event) {
		let event_query = {
			'en.event': {
				$regex: '.*' + req.query.event + '.*',
				$options: 'i',
			},
		};
		if (req.cookies.languageCode === 'en') {
			event_query = {
				'en.event': {
					$regex: '.*' + req.query.event + '.*',
					$options: 'i',
				},
			};
		}
		if (req.cookies.languageCode === 'ru') {
			event_query = {
				'ru.event': {
					$regex: '.*' + req.query.event + '.*',
					$options: 'i',
				},
			};
		}

		query.push(event_query);
	}

	if (req.query.year) {
		let year_query = {
			created_date: {
				$regex: '.*' + req.query.year + '.*',
				$options: 'i',
			},
		};

		query.push(year_query);
	}

	if (req.query.date) {
		let date_query = {
			created_date_time: {
				$regex: '.*' + req.query.date + '.*',
				$options: 'i',
			},
		};

		query.push(date_query);
	}

	let createdDateSort = '-created_date_time';

	if (req.query.createdDateSort) {
		if (req.query.createdDateSort === 'asc') {
			createdDateSort = 'created_date_time';
		} else {
			createdDateSort = '-created_date_time';
		}
	}

	let filters = {};

	if (query.length > 0) {
		filters = {
			$and: query,
		};
	}

	logger.info(
		{
			req: req,
		},
		'API list Video'
	);

	let queryObj = {};
	if (req.query.limit) {
		queryObj = {
			page: req.query.page || 1,
			perPage: req.query.limit,
			filters: filters,
		};
	} else {
		queryObj = {
			page: req.query.page || 1,
			perPage: 20,
			filters: filters,
		};
	}

	Video.paginate(queryObj)
		.sort({ video_date: 'desc' })
		.exec(function (err, items) {
			if (err) {
				logger.error(
					{
						error: err,
					},
					'API list Video'
				);
				return res.apiError('database error', err);
			}
			res.apiResponse({
				success: true,
				video: items,
			});

			// Using express req.query we can limit the number of recipes returned by setting a limit property in the link
			// This is handy if we want to speed up loading times once our Video collection grows
		});
};

exports.create = function (req, res) {

	var item = new Video.model();
	var data = (req.method === 'POST') ? req.body : req.query;
	data.date = data.date ? data.date : todayDate();
	logger.info({
		req: req,
	}, 'API create video');
	item.getUpdateHandler(req).process(data, function (err) {

		if (err) {
			logger.error({
				error: err,
			}, 'API create video');
			return res.apiError('error', err);
		}

		res.apiResponse({
			video: item,
		});

	});
};

exports.getvideobyid = function (req, res) {
	if (!req.body.uuid) {
		res.json({ error: { title: 'Id is Required', detail: 'Mandatory values are missing. Please check.' } });
	}

	Video.model.findOne().where('uuid', req.body.uuid).exec((err, video) => {

		if (err || !video) {
			logger.error({
				error: err,
			}, 'API getblogbyid');
			return res.json({ error: { title: 'Not able to find video' } });
		}
		res.json({
			video: video,
			success: true,
		});
	});

};


exports.update = function (req, res) {
	logger.info({
		req: req,
	}, 'API update blog');

	Video.model.findOne({ uuid: req.params.id }).exec(function (err, item) {

		if (err) {
			logger.error({
				error: err,
			}, 'API update video');
			return res.apiError('database error', err);
		}
		if (!item) {
			logger.error({
				error: 'Item not found',
			}, 'API update video');
			return res.apiError('not found');
		}

		var data = (req.method === 'POST') ? req.body : req.query;

		item.getUpdateHandler(req).process(data, function (err) {

			if (err) {
				logger.error({
					error: err,
				}, 'API update video');
				return res.apiError('create error', err);
			}

			res.apiResponse({
				Video: item,
			});

		});

	});
};


exports.remove = function (req, res) {
	logger.info({
		req: req,
	}, 'API remove video');
	Video.model.findOne({ uuid: req.params.id }).exec(function (err, item) {

		if (err) {
			logger.error({
				error: err,
			}, 'API remove video');
			return res.apiError('database error', err);
		}
		if (!item) {
			logger.error({
				error: 'No Item',
			}, 'API remove video');
			return res.apiError('not found');
		}

		item.remove(function (err) {
			if (err) {
				logger.error({
					error: err,
				}, 'API remove video');
				return res.apiError('database error', err);
			}

			return res.apiResponse({
				video: true,
			});
		});

	});
};
