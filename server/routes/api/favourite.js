const keystone = require('keystone');
let logger = require('./../../logger/logger');

const Favourite = keystone.list('Favourite');

exports.create = function (req, res) {
	logger.info({
		req: req,
	}, 'API create favourite');

	const item = new Favourite.model();
	const data = req.body;
	data.user_id = req.params.id;
	if (!data.lecture_uuid) {
		logger.error({
			error: { title: 'Required parameters error' },
		}, 'API removeFavourite');
		return res.json({ error: { title: 'lecture_uuid param is required' } });
	}
	item.getUpdateHandler(req).process(data, function (err) {
		if (err) {
			logger.error({
				error: err,
			}, 'API create favourite');
			return res.apiError('error', err);
		}
		res.apiResponse({
			Favourite: item,
		});
	});
};

exports.remove = function (req, res) {
	logger.info({
		req: req,
	}, 'API remove favourite');

	const data = req.body;
	if (!data.lecture_uuid) {
		logger.error({
			error: { title: 'Required parameters error' },
		}, 'API removeFavourite');
		return res.json({ error: { title: 'lecture_uuid param is required' } });
	}
	Favourite.model.deleteMany({ lecture_uuid: data.lecture_uuid, user_id: req.params.id }, (err) => {
		if (err) {
			logger.error({
				error: err,
			}, 'API removeFavourite');
			return res.json({ error: { title: 'Not able to removeFavourite' } });
		}
		res.json({
			success: true,
		});
	});
};

exports.getUserFavourites = function (req, res) {
	logger.info({
		req: req,
	}, 'API get favouritesList by user id');

	Favourite.model.find()
		.where({ user_id: req.params.id })
		.exec(function (err, item) {
			if (err) {
				logger.error({
					error: err,
				}, 'API get favourites');
				return res.apiError('database error', err);
			}
			if (!item) {
				logger.error({
					error: 'items are not found',
				}, 'API get favourites');
				return res.apiError('not found');
			}
			res.apiResponse({
				Favourites: item,
				success: true,
			});
		});
};

