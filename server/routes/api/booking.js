var keystone = require('keystone');
var Booking = keystone.list('Booking');


exports.bookingcreated = function (req, res) {

	let item = new Booking.model();
	let	data = (req.method === 'POST') ? req.body : req.query;

	item.getUpdateHandler(req).process(data, function (err) {

		if (err) return res.apiError('error', err);

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

		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');

		res.apiResponse({
			Booking: item,
		});

	});
};
