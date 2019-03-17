var keystone = require('keystone');
let logger = require('./../../logger/logger');
var Appointment = keystone.list('Appointment');





exports.list = function (req, res) {
	// Querying the data this works similarly to the Mongo db.collection.find() method
	 logger.info({
		req: req
	}, "API list appointment");
	Appointment.model.find(function (err, items) {
		// Make sure we are handling errors
		if (err) {
			logger.error({
				error: err
			}, "API list appointment");
			return res.apiError('database error', err);
		}
		res.apiResponse({
			// Filter page by
			appointments: items,
		});

	// Using express req.query we can limit the number of recipes returned by setting a limit property in the link
	// This is handy if we want to speed up loading times once our recipe collection grows
	}).limit(Number(req.query.limit));
};

exports.create = function(req, res) {
	logger.info({
		req: req
	}, "API create appointment");
	var item = new Appointment.model(),
		data = (req.method == 'POST') ? req.body : req.query;
	
	item.getUpdateHandler(req).process(data, function(err) {
		
		if (err) {
			logger.error({
				error: err
			}, "API create appointment");
			return res.apiError('error', err);
		}
		
		res.apiResponse({
			Appointment: item
		});
		
	});
}


exports.update = function(req, res) {
	logger.info({
		req: req
	}, "API update appointment");

	Appointment.model.findOne({email: req.params.id }).exec(function(err, item) {

		if (err) {
			logger.error({
				error: err
			}, "API update appointment");
			return res.apiError('database error', err);
		}
		if (!item) {
			logger.error({
				error: 'Item not found'
			}, "API update appointment");
			return res.apiError('not found');
		}
		
		var data = (req.method == 'POST') ? req.body : req.query;
		
		item.getUpdateHandler(req).process(data, function(err) {
			
			if (err) {
				logger.error({
					error: err
				}, "API update appointment");
				return res.apiError('create error', err);
			}
			
			res.apiResponse({
				Appointment: item
			});
			
		});
		
	});
}

exports.remove = function(req, res) {
	logger.info({
		req: req
	}, "API remove appointment");
	Appointment.model.findById(req.params.id).exec(function (err, item) {
		
		if (err) {
			logger.error({
				error: err
			}, "API remove appointment");
			return res.apiError('database error', err);
		}
		if (!item) {
			logger.error({
				error: 'Item not found'
			}, "API remove appointment");
			return res.apiError('not found');
		}
		
		item.remove(function (err) {
			if (err) {
				logger.error({
					error: err
				}, "API remove appointment");
				return res.apiError('database error', err);
			}
			
			return res.apiResponse({
				success: true
			});
		});
		
	});
}

exports.get = function(req, res) {
   
	Appointment.model.findOne({email: req.params.id }).exec(function(err, item) {
		
		if (err) {
			logger.error({
				error: err
			}, "API get appointment");
			return res.apiError('database error', err);
		}
		if (!item) {
			logger.error({
				error: 'Item not found'
			}, "API remove appointment");
			return res.apiError('not found');
		}
		
		res.apiResponse({
			Appointment: item
		});
		
	});
}