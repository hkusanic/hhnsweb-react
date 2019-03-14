var keystone = require('keystone');


var Location = keystone.list('Location');

exports.list = function (req, res) {
	
	Location.model.find(function (err, items) {
	
		if (err) return res.apiError('database error', err);
		res.apiResponse({
		
			location: items,
		});
	});
};
