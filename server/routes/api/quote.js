var keystone = require("keystone");
let logger = require("./../../logger/logger");
var quote_LIST = require("../../constants/constant");

var Quote = keystone.list("Quote");
function todayDate() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; // January is 0!

	var yyyy = today.getFullYear();
	if (dd < 10) {
		dd = "0" + dd;
	}
	if (mm < 10) {
		mm = "0" + mm;
	}
	var today = yyyy + "-" + mm + "-" + dd;
	return today;
}

exports.list = function(req, res) {
	// Querying the data this works similarly to the Mongo db.collection.find() method
	let query = [];

	if (req.query.author) {
		query.push({
			author: {
				$regex: ".*" + req.query.author + ".*",
				$options: "i"
			}
		});
	}

	let filters = {};

	if (query.length > 0) {
		filters = {
			$and: query
		};
	}

	logger.info(
		{
			req: req
		},
		"API list Quote"
	);
	Quote.paginate({
		page: req.query.page || 1,
		perPage: 20,
		filters: filters
	})
		.sort({ quote_date: "desc" })
		.exec(function(err, items) {
			if (err) {
				logger.error(
					{
						error: err
					},
					"API list Quote"
				);
				return res.apiError("database error", err);
			}
			return res.apiResponse({
				// Filter page by
				quote: items
			});

			// Using express req.query we can limit the number of recipes returned by setting a limit property in the link
			// This is handy if we want to speed up loading times once our Quote collection grows
		});
};

exports.create = function(req, res) {
	var item = new Quote.model();
	var data = req.method === "POST" ? req.body : req.query;
	data.date = data.date ? data.date : todayDate();
	logger.info(
		{
			req: req
		},
		"API create quote"
	);
	item.getUpdateHandler(req).process(data, function(err) {
		if (err) {
			logger.error(
				{
					error: err
				},
				"API create quote"
			);
			return res.apiError("error", err);
		}

		res.apiResponse({
			quote: item
		});
	});
};

exports.getquotebyid = function(req, res) {
	if (!req.body.uuid) {
		res.json({
			error: {
				title: "Id is Required",
				detail: "Mandatory values are missing. Please check."
			}
		});
	}

	Quote.model
		.findOne()
		.where("uuid", req.body.uuid)
		.exec((err, quote) => {
			if (err || !quote) {
				logger.error(
					{
						error: err
					},
					"API getblogbyid"
				);
				return res.json({ error: { title: "Not able to find quote" } });
			}
			res.json({
				quote: quote,
				success: true
			});
		});
};

exports.getLatestQuoteDate = function(req, res) {
	console.log("function start");
	Quote.model
		.find()
		.sort({ published_date: -1 })
		.limit(1)
		.exec((err, data) => {
			if (err || !data) {
				logger.error(
					{
						error: err
					},
					"API getlatestblog"
				);
				return res.json({ error: { title: "Not able to sort" } });
			}
			console.log("date>>>>", data);
			res.json({
				tnid: data[0].tnid,
				published_date: data[0].published_date,
				created_date_time: data[0].created_date_time,
				success: true
			});
		});
};

exports.update = function(req, res) {
	logger.info(
		{
			req: req
		},
		"API update blog"
	);

	Quote.model.findOne({ uuid: req.params.id }).exec(function(err, item) {
		if (err) {
			logger.error(
				{
					error: err
				},
				"API update quote"
			);
			return res.apiError("database error", err);
		}
		if (!item) {
			logger.error(
				{
					error: "Item not found"
				},
				"API update quote"
			);
			return res.apiError("not found");
		}

		var data = req.method === "POST" ? req.body : req.query;

		item.getUpdateHandler(req).process(data, function(err) {
			if (err) {
				logger.error(
					{
						error: err
					},
					"API update quote"
				);
				return res.apiError("create error", err);
			}

			res.apiResponse({
				Quote: item
			});
		});
	});
};

exports.remove = function(req, res) {
	logger.info(
		{
			req: req
		},
		"API remove quote"
	);
	Quote.model.findOne({ uuid: req.params.id }).exec(function(err, item) {
		if (err) {
			logger.error(
				{
					error: err
				},
				"API remove quote"
			);
			return res.apiError("database error", err);
		}
		if (!item) {
			logger.error(
				{
					error: "No Item"
				},
				"API remove quote"
			);
			return res.apiError("not found");
		}

		item.remove(function(err) {
			if (err) {
				logger.error(
					{
						error: err
					},
					"API remove quote"
				);
				return res.apiError("database error", err);
			}

			return res.apiResponse({
				quote: true
			});
		});
	});
};

exports.quoteOfDay = async function(req, res) {
	if (!req.body && req.body.length < 1) {
		return res.json({
			error: {
				title: "Author for quotes is not mentioned",
				detail: "Mandatory values are missing. Please check."
			}
		});
	}
	logger.info(
		{
			req: req
		},
		"API GET QUOTE OF THE DAY"
	);
	let quotesOfDay = [];
	for (let i = 0; i < req.body.length; i++) {
		let date = todayDate();
		let author = req.body[i];
		let quoote = await Quote.model
			.findOne()
			.where({ $and: [{ published_date: date }, { author: author }] })
			.exec(function(err, item) {
				if (err) {
					logger.error(
						{
							error: err
						},
						"API GET QUOTE OF THE DAY"
					);
					return res.apiError({ err: err });
				}

				if (item) {
					quotesOfDay.push(item);
				}
			});
		if (!quoote) {
			await Quote.model
				.findOne()
				.where({ author: author })
				.exec(function(err, item) {
					if (err) {
						logger.error(
							{
								error: err
							},
							"API GET QUOTE OF THE DAY"
						);
						return res.apiError({ err: err });
					}
					if (item) {
						quotesOfDay.push(item);
					}
				});
		}
	}

	if (quotesOfDay.length < 2) {
		logger.error(
			{
				error: "No Item"
			},
			"API GET  QUOTE OF THE DAY"
		);
		return res.json({ err: "NO QUOTE FOUND" });
	}
	for (let i = 0; i < quotesOfDay.length; i++) {
		if (quotesOfDay[i].en.body === "<p></p>\n") {
			quotesOfDay[i].en.body = quotesOfDay[i].ru.body;
		}
		if (quotesOfDay[i].en.body === "<p></p>\n") {
			quotesOfDay[i].ru.body = quotesOfDay[i].en.body;
		}
		if (quotesOfDay[i].en.title === "") {
			quotesOfDay[i].en.title = quotesOfDay[i].ru.title;
		}

		if (quotesOfDay[i].ru.title === "") {
			quotesOfDay[i].ru.title = quotesOfDay[i].en.title;
		}

		if (quotesOfDay[i].en.source_of_quote === "") {
			quotesOfDay[i].en.source_of_quote = quotesOfDay[i].ru.source_of_quote;
		}

		if (quotesOfDay[i].ru.source_of_quote === "") {
			quotesOfDay[i].ru.source_of_quote = quotesOfDay[i].en.source_of_quote;
		}
	}
	return res.apiResponse({
		quote: quotesOfDay
	});
};

exports.updateBulkNew = function(req, res) {
	logger.info(
		{
			req: req
		},
		"API updateBulk Quote"
	);
	if (!req.body) {
		logger.error(
			{
				error: "No Data"
			},
			"API updateBulk Quote"
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
		Quote.model
			.findOne({
				tnid: data[i].tnid
			})
			.exec(function(err, item) {
				if (err) {
					logger.error(
						{
							error: err
						},
						"API updateBulk Quote"
					);
					return;
				}
				if (!item) {
					logger.error(
						{
							error: "No Item"
						},
						"API updateBulk Quote"
					);
					return;
				}

				item.getUpdateHandler(req).process(data[i], function(err) {
					if (err) {
						logger.error(
							{
								error: err
							},
							"API updateBulk Quote"
						);
						return res.apiError("create error", err);
					}

					// res.apiResponse({
					// 	Quote: item
					// });
					res.end(
						JSON.stringify({
							Quote: item
						})
					);
				});
			});
	}
};
