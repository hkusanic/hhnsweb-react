var ketstone = require('keystone');
let logger = require('./../../logger/logger');
const mongoose =  require('mongoose');
// Getting Modal

var Sadhana = ketstone.list('Sadhana');

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

	let DateSort = '-date';

	let query = [];

	if (req.query.userId) {
		query.push({
			userId: {
				$regex: '.*' + req.query.userId + '.*',
				$options: 'i',
			},
		});
	}

	if (req.query.date) {
		let date_query = {
			date: {
				$regex: '.*' + req.query.date + '.*',
				$options: 'i',
			},
		};

		query.push(date_query);
	}

	let filters = {};

	if (query.length > 0) {
		filters = {
			$and: query,
		};
	}

	logger.info({
		req: req,
	},
	'API list Sadhana'
	);

	Sadhana.paginate({
		page: req.query.page || 1,
		// perPage: 20,
		filters: filters,
	}).sort(DateSort).populate('user').exec(function (err, items) {
		if (err) {
			logger.error({
				error: err,
			},
			'API list sadhana'
			);
			return res.apiError('database error', err);
		}
		res.apiResponse({
			sadhana: items,
		});
	});
};


exports.get = function (req, res) {
	logger.info(
		{
			req: req,
		},
		'API get Sadhana'
	);
	Sadhana.model
		.findOne()
		.where({ uuid: req.body.uuid })
		.exec(function (err, item) {
			if (err) {
				logger.error({
					error: err,
				},
				'API get sadhana'
				);
				return res.apiError('database error', err);
			}
			if (!item) {
				logger.error(
					{
						error: 'item not found',
					},
					'API get sadhana'
				);
				return res.apiError('not found');
			}
			res.apiResponse({
				sadhana: item,
			});
		});

};

exports.create = function (req, res) {
	var item = new Sadhana.model();
	var data = req.method === 'POST' ? req.body : req.query;
	data.user = mongoose.Types.ObjectId(data.user);
	data.date = data.date.substring(0, 10);
	// data.date = todayDate();
	logger.info(
		{
			req: req,
		},
		'API create Sadhana'
	);
	item.getUpdateHandler(req).process(data, function (err) {
		if (err) {
			logger.error(
				{
					error: err,
				},
				'API create sadhana'
			);
			return res.apiError('error', err);
		}
		res.apiResponse({
			sadhana: item,
			isCreated: true,
		});
	});
};

exports.getSadhanaById = function (req, res) {
	if (!req.body.uuid) {
		res.json({
			error: { title: 'Id is Required', detail: 'Mandatory values are missing. Please check.' },
		});
	}

	Sadhana.model
		.findOne()
		.where('uuid', req.body.uuid)
		.exec(function (err, sadhana) {
			if (err || !sadhana) {
				logger.error(
					{
						error: err,
					},
					'API getSadhana by id'
				);
				return res.apiError('error', err);
			}
			res.apiResponse({
				sadhana: sadhana,
				success: true,
			});
		});
};

exports.remove = function (req, res) {
	logger.info(
		{
			req: req,
		},
		'API Remove sadhana'
	);

	Sadhana.model
		.findOne()
		.where('uuid', req.params.id)
		.exec(function (err, item) {
			if (err) {
				logger.error(
					{
						error: err,
					},
					'API remove sadhana'
				);
			}
			if (!item) {
				logger.error(
					{

					},
					'API remove sadhana'
				);
			}

			item.remove(function (err) {
				if (err) {
					logger.error(
						{
							error: err,
						},
						'API remove sadhana'
					);
					return res.apiError('database error', err);
				}
				return res.apiResponse(
					{
						sadhana: true,
					}
				);
			});
		});
};

exports.update = function (req, res) {
	logger.info(
		{
			req: req,
		},
		'API update sadhana'
	);

	Sadhana.model
		.findOne()
		.where('uuid', req.params.id)
		.exec(function (err, item) {
			if (err) {
				logger.error(
					{
						error: err,
					},
					'API update sadhana'
				);
				return res.apiError('not found');
			}
			if (!item) {
				logger.error(
					{

					},
					'API update sadhana'
				);
				return res.apiError('not found');
			}

			var data = (req.method === 'POST') ? req.body : req.query;

			item.getUpdateHandler(req).process(data, function (err) {
				if (err) {
					logger.error(
						{
							error: err,
						},
						'API update sadhana'
					);
					return res.apiError('update error', err);
				}
				res.apiResponse({
					sadhana: item,
					isUpdated: true,
				});
			});
		});
};

