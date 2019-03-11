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
     let query = [];
	if(req.query.event){
       query.push({"event": {$regex : ".*"+req.query.event+".*",'$options' : 'i'}});	
	}
	if(req.query.topic){
		query.push({"topic.en":{$regex : ".*"+req.query.topic+".*",'$options' : 'i'}});
	}
    if(req.query.title){
		query.push({"title.en":{$regex : ".*"+req.query.title+".*",'$options' : 'i'}});
			
	}
  
	let filters = {};

   if(req.query.event || req.query.topic ||  req.query.title){
	   filters = {
		   "$and":query
	   }
   }


   console.log('=========>',req.query);
	Lecture.paginate({
		page: req.query.page || 1,
		perPage: 20,
		filters: filters
	}).exec(function (err, items) {
		if (err) return res.apiError('database error', err);
		return res.apiResponse({
			success: true,
			lecture: items,
			total: items.results.length,
			
		});
	// Using express req.query we can limit the number of recipes returned by setting a limit property in the link
	// This is handy if we want to speed up loading times once our recipe collection grows
	});
};
