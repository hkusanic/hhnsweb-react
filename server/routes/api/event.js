var keystone = require('keystone');


var Event = keystone.list('Event');


exports.list = function (req, res) {
	
	Event.model.find(function (err, items) {

		if (err) return res.apiError('database error', err);
		res.apiResponse({
	
			event: items,
		});

	});
};
