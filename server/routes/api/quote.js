var keystone = require('keystone');
let logger = require('./../../logger/logger');
var quote_LIST = require('../../constants/constant');

var Quote = keystone.list('Quote');
function todayDate(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    } 
    if (mm < 10) {
      mm = '0' + mm;
    } 
    var today = yyyy  + '-' + mm + '-' + dd;
    return today
    }

exports.list = function (req, res) {
	// Querying the data this works similarly to the Mongo db.collection.find() method
	logger.info(
		{
			req: req,
		},
		'API list Quote'
	);
	Quote.paginate({
		page: req.query.page || 1,
		perPage: 20,
	}).sort('-date').exec(function (err, items) {
		if (err) {
			logger.error(
				{
					error: err,
				},
				'API list Quote'
			);
			return res.apiError('database error', err);
		}
		res.apiResponse({
			// Filter page by
			quote: items,
		});

		// Using express req.query we can limit the number of recipes returned by setting a limit property in the link
		// This is handy if we want to speed up loading times once our Quote collection grows
	});
};


exports.create = function (req, res) {

	var item = new Quote.model();
    var data = (req.method === 'POST') ? req.body : req.query;
    data.date = data.date?data.date:todayDate();
	logger.info({
		req: req,
	}, 'API create quote');
	item.getUpdateHandler(req).process(data, function (err) {

		if (err) {
			logger.error({
				error: err,
			}, 'API create quote');
			return res.apiError('error', err);
		}

		res.apiResponse({
			quote: item,
		});

	});
};

exports.getquotebyid = function (req, res) {
	if (!req.body.uuid) {
		res.json({ error: { title: 'Id is Required', detail: 'Mandatory values are missing. Please check.' } });
	}

	Quote.model.findOne().where('uuid', req.body.uuid).exec((err, quote) => {

		if (err || !quote) {
			logger.error({
				error: err,
			}, 'API getblogbyid');
			return res.json({ error: { title: 'Not able to find quote' } });
		}
		res.json({
			blog: quote,
			success: true,
		});
	});

};


exports.update = function (req, res) {
	logger.info({
		req: req,
	}, 'API update blog');

	Quote.model.findOne({ uuid: req.params.id }).exec(function (err, item) {

		if (err) {
			logger.error({
				error: err,
			}, 'API update quote');
			return res.apiError('database error', err);
		}
		if (!item) {
			logger.error({
				error: 'Item not found',
			}, 'API update quote');
			return res.apiError('not found');
		}

		var data = (req.method === 'POST') ? req.body : req.query;

		item.getUpdateHandler(req).process(data, function (err) {

			if (err) {
				logger.error({
					error: err,
				}, 'API update quote');
				return res.apiError('create error', err);
			}

			res.apiResponse({
				Quote: item,
			});

		});

	});
};



exports.remove = function (req, res) {
	logger.info({
		req: req,
	}, 'API remove quote');
	Quote.model.findOne({ uuid: req.params.id }).exec(function (err, item) {

		if (err) {
			logger.error({
				error: err,
			}, 'API remove quote');
			return res.apiError('database error', err);
		}
		if (!item) {
			logger.error({
				error: 'No Item',
			}, 'API remove quote');
			return res.apiError('not found');
		}

		item.remove(function (err) {
			if (err) {
				logger.error({
					error: err,
				}, 'API remove quote');
				return res.apiError('database error', err);
			}

			return res.apiResponse({
				quote: true,
			});
		});

	});
};
