var keystone = require('keystone');


var Topic = keystone.list('Topic');

exports.list = function (req, res) {
	
	Topic.model.find(function (err, items) {
	
		if (err) return res.apiError('database error', err);
		res.apiResponse({
		
			topic: items,
		});
	});
};
