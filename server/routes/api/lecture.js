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
	console.log('------->',req.query);
	Lecture.paginate({
		page: req.query.page || 1,
		perPage: 3,
	}).exec(function (err, items) {
		if (err) return res.apiError('database error', err);
		let resArray = [];
		if(req.query.type === 'audio') {
		  
		 items.results.forEach(item => {
			    console.log('=======>======>',item);
				  let obj = {};
				  obj.title_en = item.title.en;
				  obj.title_ru = item.title.ru;
				  obj.date = item.date;
				  obj.audio = item.audio;
				  obj.duration = item.duration;
				  obj.downloads = item.downloads;
				  resArray.push(obj);
		})
		}
		if(req.query.type === 'video'){
			items.results.forEach(item => {
				console.log('=======>======>',item);
				  let obj = {};
				  obj.title_en = item.title.en;
				  obj.title_ru = item.title.ru;
				  obj.date = item.date;
				  obj.youtube = item.youtube;
				  obj.duration = item.duration;
				  obj.downloads = item.downloads;
				  resArray.push(obj);
		})
	}

		
		res.apiResponse({
			lecture: resArray,
		});
	// Using express req.query we can limit the number of recipes returned by setting a limit property in the link
	// This is handy if we want to speed up loading times once our recipe collection grows
	});
};
