var keystone = require("keystone");
let logger = require("./../../logger/logger");

var Content = keystone.list("Content");

exports.list = function(req, res) {
	logger.info(
		{
			req: req
		},
		"API get content"
	);
	Content.model.find().exec(function(err, item) {
		if (err) {
			logger.error(
				{
					error: err
				},
				"API get content"
			);
			return res.apiError("database error", err);
		}
		if (!item) {
			logger.error(
				{
					error: "item not found"
				},
				"API get content"
			);
			return res.apiError("not found");
		}
		res.apiResponse({
			content: item
		});
	});
};

exports.create = function(req, res) {
	var item = new Content.model();
	var data = req.method === "POST" ? req.body : req.query;
	logger.info(
		{
			req: req
		},
		"API create content"
	);
	item.getUpdateHandler(req).process(data, function(err) {
		if (err) {
			logger.error(
				{
					error: err
				},
				"API create content"
			);
			return res.apiError("error", err);
		}

		res.apiResponse({
			Content: item
		});
	});
};

exports.remove = function(req, res) {
	logger.info(
		{
			req: req
		},
		"API remove content"
	);
	Content.model.findOne({ uuid: req.params.id }).exec(function(err, item) {
		if (err) {
			logger.error(
				{
					error: err
				},
				"API remove content"
			);
			return res.apiError("database error", err);
		}
		if (!item) {
			logger.error(
				{
					error: "No Item"
				},
				"API remove content"
			);
			return res.apiError("not found");
		}

		item.remove(function(err) {
			if (err) {
				logger.error(
					{
						error: err
					},
					"API remove content"
				);
				return res.apiError("database error", err);
			}

			return res.apiResponse({
				Content: true
			});
		});
	});
};

exports.getlimitedlist = function(req, res) {
	let DateSort = "date";

	logger.info(
		{
			req: req
		},
		"API list content"
	);
	Content.paginate({
		page: req.query.page || 1,
		perPage: 5
	})
		.sort("-created_date_time")
		.exec(function(err, items) {
			if (err) {
				logger.error(
					{
						error: err
					},
					"API list blog"
				);
				return res.apiError("database error", err);
			}
			res.apiResponse({
				// Filter page by
				content: items
			});

			// Using express req.query we can limit the number of recipes returned by setting a limit property in the link
			// This is handy if we want to speed up loading times once our blog collection grows
		});
};
