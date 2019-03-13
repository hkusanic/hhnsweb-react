var keystone = require('keystone');

/**
 * List Page
 */

// Getting our page model
var Lecture = keystone.list('Lecture');

// Creating the API end point
// More about keystone api here: https://gist.github.com/JedWatson/9741171
exports.list = function (req, res) {
	// Querying the data this works similarly to the Mongo db.collection.find() method
	Lecture.paginate({
		page: req.query.page || 1,
		perPage: 3,
	}).exec(function (err, items) {
		if (err) return res.apiError('database error', err);
		res.apiResponse({
			// Filter page by
			lecture: items,
		});
	// Using express req.query we can limit the number of recipes returned by setting a limit property in the link
	// This is handy if we want to speed up loading times once our recipe collection grows
	});
};

exports.bylocation = function (req, res) {
	Lecture.model.aggregate([
		{ $lookup: {
			from: 'locations',
			localField: 'location',
			foreignField: '_id',
			as: 'location',
		},
		},
		{ $match: { 'location.title': req.params.location } },
	])
		.exec((err, result) => {
			if (err) {
				console.log(err);
				next(err);
			}
			else {
				console.dir(result);
				res.apiResponse({
					lectures: result,
				});
			}
		});
};
