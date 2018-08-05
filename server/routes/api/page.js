var keystone = require('keystone');

/**
 * List Page
 */

// Getting our page model
var Page = keystone.list('Page');

// Creating the API end point
// More about keystone api here: https://gist.github.com/JedWatson/9741171
exports.list = function (req, res) {
	// Querying the data this works similarly to the Mongo db.collection.find() method
	Page.model.find(function (err, items) {
		// Make sure we are handling errors
		if (err) return res.apiError('database error', err);
		res.apiResponse({
			// Filter page by
			page: items,
		});

	// Using express req.query we can limit the number of recipes returned by setting a limit property in the link
	// This is handy if we want to speed up loading times once our recipe collection grows
	}).limit(Number(req.query.limit));
};
