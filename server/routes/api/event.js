var keystone = require("keystone");
let logger = require("./../../logger/logger");

var Event = keystone.list("Event");

exports.list = function(req, res) {
	//"optional": true

	Event.model
		.find(function(err, items) {
			if (err) return res.apiError("database error", err);
			res.apiResponse({
				event: items
			});
		})
		.sort("title");
};

exports.createBulk = function(req, res) {
	logger.info(
		{
			req: req
		},
		"API createBulk event"
	);
	keystone.createItems(
		{
			Event: req.body
		},
		function(err, stats) {
			if (err) {
				logger.error(
					{
						error: err
					},
					"API createBulk event"
				);
				return res.apiError("error", err);
			}
			return res.apiResponse({
				Event: true
			});
		}
	);
};

exports.create = function(req, res) {
	var item = new Event.model(),
		data = req.method == "POST" ? req.body : req.query;
	logger.info(
		{
			req: req
		},
		"API create event"
	);
	item.getUpdateHandler(req).process(data, function(err) {
		if (err) {
			logger.error(
				{
					error: err
				},
				"API create event"
			);
			return res.apiError("error", err);
		}

		res.apiResponse({
			Event: item
		});
	});
};
