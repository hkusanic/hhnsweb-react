var keystone = require('keystone');
var Booking = keystone.list('Booking');
let logger = require('./../../logger/logger');


exports.bookingcreated = function (req, res) {
	logger.info({
		req: req,
	}, 'API get blog');
	let item = new Booking.model();
	let	data = (req.method === 'POST') ? req.body : req.query;

	item.getUpdateHandler(req).process(data, function (err) {

		if (err) {
			logger.error({
				error: err,
			}, 'API create booking ---> Webhook');
			return res.apiError('error', err);
		}

		res.apiResponse({
			Booking: item,
		});

	});
};


exports.get = function (req, res) {
	console.log('---/routes/api/get---');
	console.dir(req.params);
	Booking.model.findOne({
		email: req.params.email,
	}).exec(function (err, item) {

		if (err) {
			logger.error({
				error: err,
			}, 'API get booking');
			return res.apiError('database error', err);
		}
		if (!item) {
			logger.error({
				error: 'item not found',
			}, 'API get booking');

			return res.apiError('not found');
		}

		res.apiResponse({
			Booking: item,
		});

	});
};
