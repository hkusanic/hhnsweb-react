var keystone = require('keystone');

/**
 * List Page
 */

// Getting our page model
var Blog = keystone.list('Blog');
var BlogGet = keystone.get('Blog');


// Creating the API end point
// More about keystone api here: https://gist.github.com/JedWatson/9741171
exports.list = function (req, res) {
	// Querying the data this works similarly to the Mongo db.collection.find() method
	Blog.paginate({
		page: req.query.page || 1,
		perPage: 3,
	}).find({ language: req.cookies.languageCode }).exec(function (err, items) {
		if (err) return res.apiError('database error', err);
		res.apiResponse({
			// Filter page by
			blog: items,
		});

	// Using express req.query we can limit the number of recipes returned by setting a limit property in the link
	// This is handy if we want to speed up loading times once our blog collection grows
	});
};


exports.get = function (req, res) {
	
	Blog.model.findOne().where({ date: req.body.date, language: req.body.language }).exec(function (err, item) {
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		res.apiResponse({
			blog: item,
		});
	});
};
