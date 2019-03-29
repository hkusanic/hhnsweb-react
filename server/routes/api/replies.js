exports.create = function (req, res) {
    
	var item = new Comment.model(),
		data = (req.method == 'POST') ? req.body : req.query;
		logger.info({
			req: req
		}, "API create comment");
	item.getUpdateHandler(req).process(data, function (err) {

		if (err) {
			logger.error({
				error: err
			}, "API create comment");
			return res.apiError('error', err);
		}

		res.apiResponse({
			Comment: item
		});

	});
}