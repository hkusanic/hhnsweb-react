var keystone = require("keystone");
let logger = require("./../../logger/logger");

/**
 * List Page
 */

// Getting our page model

var Kirtan = keystone.list("Kirtan");

// Creating the API end point
// More about keystone api here: https://gist.github.com/JedWatson/9741171
exports.list = function(req, res) {
	// Querying the data this works similarly to the Mongo db.collection.find() method
	let query = [];

	if (req.query.title) {
		let title = {
			"en.title": {
				$regex: ".*" + req.query.title + ".*",
				$options: "i"
			}
		};
		if (req.cookies.languageCode === "en") {
			title = {
				"en.title": {
					$regex: ".*" + req.query.title + ".*",
					$options: "i"
				}
			};
		}
		if (req.cookies.languageCode === "ru") {
			title = {
				"ru.title": {
					$regex: ".*" + req.query.title + ".*",
					$options: "i"
				}
			};
		}

		query.push(title);
	}

	if (req.query.location) {
		let location = {
			"en.location": {
				$regex: ".*" + req.query.location + ".*",
				$options: "i"
			}
		};
		if (req.cookies.languageCode === "en") {
			location = {
				"en.location": {
					$regex: ".*" + req.query.location + ".*",
					$options: "i"
				}
			};
		}
		if (req.cookies.languageCode === "ru") {
			location = {
				"ru.location": {
					$regex: ".*" + req.query.location + ".*",
					$options: "i"
				}
			};
		}

		query.push(location);
	}
	if (req.query.topic) {
		let topic_query = {
			"en.topic": {
				$regex: ".*" + req.query.topic + ".*",
				$options: "i"
			}
		};
		if (req.cookies.languageCode === "en") {
			topic_query = {
				"en.topic": {
					$regex: ".*" + req.query.topic + ".*",
					$options: "i"
				}
			};
		}
		if (req.cookies.languageCode === "ru") {
			topic_query = {
				"ru.topic": {
					$regex: ".*" + req.query.topic + ".*",
					$options: "i"
				}
			};
		}

		query.push(topic_query);
	}
	if (req.query.event) {
		let event_query = {
			"en.event": {
				$regex: ".*" + req.query.event + ".*",
				$options: "i"
			}
		};
		if (req.cookies.languageCode === "en") {
			event_query = {
				"en.event": {
					$regex: ".*" + req.query.event + ".*",
					$options: "i"
				}
			};
		}
		if (req.cookies.languageCode === "ru") {
			event_query = {
				"ru.event": {
					$regex: ".*" + req.query.event + ".*",
					$options: "i"
				}
			};
		}

		query.push(event_query);
	}

	if (req.query.year) {
		let year_query = {
			created_date: {
				$regex: ".*" + req.query.year + ".*",
				$options: "i"
			}
		};

		query.push(year_query);
	}

	let filters = {};

	if (query.length > 0) {
		filters = {
			$and: query
		};
	}

	let createdDateSort = "-created_date";

	logger.info(
		{
			req: req
		},
		"API list kirtan"
	);
	Kirtan.paginate({
		page: req.query.page || 1,
		perPage: 20,
		filters: filters
	})
		.sort({ kirtan_creation_date: "desc" })
		.exec(function(err, items) {
			if (err) {
				logger.error(
					{
						error: err
					},
					"API list kirtan"
				);
				return res.apiError("database error", err);
			}
			return res.apiResponse({
				success: true,
				kirtan: items,
				total: items.results.length
			});
			// Using express req.query we can limit the number of recipes returned by setting a limit property in the link
			// This is handy if we want to speed up loading times once our recipe collection grows
		});
};

exports.create = function(req, res) {
	var item = new Kirtan.model();
	var data = req.method == "POST" ? req.body : req.query;
	logger.info(
		{
			req: req
		},
		"API create kirtan"
	);
	item.getUpdateHandler(req).process(data, function(err) {
		if (err) {
			logger.error(
				{
					error: err
				},
				"API create kirtan"
			);
			return res.apiError("error", err);
		}

		res.apiResponse({
			Kirtan: item
		});
	});
};

exports.createBulk = function(req, res) {
	logger.info(
		{
			req: req
		},
		"API createBulk kirtan"
	);
	keystone.createItems(
		{
			Kirtan: req.body
		},
		function(err, stats) {
			if (err) {
				logger.error(
					{
						error: err
					},
					"API createBulk kirtan"
				);
				return res.apiError("error", err);
			}
			return res.apiResponse({
				Kirtan: true
			});
		}
	);
};

exports.updateBulk = function(req, res) {
	logger.info(
		{
			req: req
		},
		"API updateBulk kirtan"
	);
	if (!req.body) {
		logger.error(
			{
				error: "No Data"
			},
			"API updateBulk kirtan"
		);
		res.json({
			error: {
				title: "Data is Reqired",
				detail: "Mandatory values are missing. Please check."
			}
		});
	}
	let data = req.body;
	for (let i = 0; i < data.length; i++) {
		Kirtan.model
			.findOne({
				tnid: data[i].tnid
			})
			.exec(function(err, item) {
				if (err) {
					logger.error(
						{
							error: err
						},
						"API updateBulk kirtan"
					);
					return res.apiError("database error", err);
				}
				if (!item) {
					logger.error(
						{
							error: "No Item"
						},
						"API updateBulk kirtan"
					);
					return res.apiError("not found");
				}

				item.getUpdateHandler(req).process(data[i], function(err) {
					if (err) {
						logger.error(
							{
								error: err
							},
							"API updateBulk kirtan"
						);
						return res.apiError("create error", err);
					}

					res.apiResponse({
						Kirtan: item
					});
				});
			});
	}
};

exports.update = function(req, res) {
	logger.info(
		{
			req: req
		},
		"API update kirtan"
	);
	let data = req.body;
	Kirtan.model.findOne({ uuid: req.params.id }).exec(function(err, item) {
		if (err) {
			logger.error(
				{
					error: err
				},
				"API update kirtan"
			);
			return res.apiError("database error", err);
		}
		if (!item) {
			logger.error(
				{
					error: "No Item"
				},
				"API update kirtan"
			);
			return res.apiError("not found");
		}

		item.getUpdateHandler(req).process(req.body, function(err) {
			if (err) {
				logger.error(
					{
						error: err
					},
					"API update kirtan"
				);
				return res.apiError("create error", err);
			}

			res.apiResponse({
				Kirtan: item
			});
		});
	});
};

exports.remove = function(req, res) {
	logger.info(
		{
			req: req
		},
		"API remove kirtan"
	);
	Kirtan.model.findOne({ uuid: req.params.id }).exec(function(err, item) {
		if (err) {
			logger.error(
				{
					error: err
				},
				"API remove kirtan"
			);
			return res.apiError("database error", err);
		}
		if (!item) {
			logger.error(
				{
					error: "No Item"
				},
				"API remove kirtan"
			);
			return res.apiError("not found");
		}

		item.remove(function(err) {
			if (err) {
				logger.error(
					{
						error: err
					},
					"API remove kirtan"
				);
				return res.apiError("database error", err);
			}

			return res.apiResponse({
				Kirtan: true
			});
		});
	});
};

exports.getKirtanbyid = function(req, res) {
	if (!req.body.uuid) {
		res.json({
			error: {
				title: "Id is Required",
				detail: "Mandatory values are missing. Please check."
			}
		});
	}

	Kirtan.model
		.findOne()
		.where("uuid", req.body.uuid)
		.exec((err, item) => {
			if (err || !item) {
				logger.error(
					{
						error: err
					},
					"API getGallerybyid"
				);
				return res.json({ error: { title: "Not able to find kirtan" } });
			}
			res.json({
				kirtan: item,
				success: true
			});
		});
};

exports.updateCounters = function(req, res) {
	logger.info(
		{
			req: req
		},
		"API update kirtan"
	);
	Kirtan.model
		.findOne({
			uuid: req.body.uuid
		})
		.exec(function(err, item) {
			if (err) {
				logger.error(
					{
						error: err
					},
					"API update kirtan"
				);
				return res.apiError("database error", err);
			}
			if (!item) {
				logger.error(
					{
						error: "No Item"
					},
					"API update kirtan"
				);
				return res.apiError("not found");
			}
			if (req.body.downloads) {
				item.counters.downloads = item.counters.downloads + 1;
			}

			item.getUpdateHandler(req).process(item, function(err) {
				if (err) {
					logger.error(
						{
							error: err
						},
						"API update kirtan"
					);
					return res.apiError("create error", err);
				}

				res.apiResponse({
					kirtan: item
				});
			});
		});
};

exports.updateBulkNew = function(req, res) {
	logger.info(
		{
			req: req
		},
		"API updateBulk"
	);
	if (!req.body) {
		logger.error(
			{
				error: "No Data"
			},
			"API updateBulk"
		);
		res.json({
			error: {
				title: "Data is Reqired",
				detail: "Mandatory values are missing. Please check."
			}
		});
	}
	let data = req.body;
	for (let i = 0; i < data.length; i++) {
		Kirtan.model
			.findOne({
				tnid: data[i].tnid
			})
			.exec(function(err, item) {
				if (err) {
					logger.error(
						{
							error: err
						},
						"API updateBulk"
					);
					return;
				}
				if (!item) {
					logger.error(
						{
							error: "No Item"
						},
						"API updateBulk"
					);
					return;
				}

				item.getUpdateHandler(req).process(data[i], function(err) {
					if (err) {
						logger.error(
							{
								error: err
							},
							"API updateBulk"
						);
						return res.apiError("create error", err);
					}
					res.end(
						JSON.stringify({
							Kirtan: item
						})
					);
				});
			});
	}
};
