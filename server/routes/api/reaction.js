const keystone = require('keystone');
let logger = require('./../../logger/logger');

const Reaction = keystone.list('Reaction');

exports.create = function (req, res) {
	logger.info({
		req: req,
	}, 'API create favourite');

	const item = new Reaction.model();
	const data = req.body;
	data.user_id = req.params.id;
	if (!data.lecture_uuid || !data.user_id || !data.reaction) {
		logger.error({
			error: { title: 'Required parameters error' },
		}, 'API createFavourite');
		return res.json({ error: { title: 'lecture_uuid, user_id, reaction params are required' } });
	}
	item.getUpdateHandler(req).process(data, function (err) {
		if (err) {
			logger.error({
				error: err,
			}, 'API create reaction');
			return res.apiError('error', err);
		}
		res.apiResponse({
			Reaction: item,
		});
	});
};

exports.remove = function (req, res) {
	logger.info({
		req: req,
	}, 'API remove reaction');
	const data = req.body;
	if (!data.lecture_uuid || !data.reaction) {
		logger.error({
			error: { title: 'Required parameters error' },
		}, 'API removeReaction');
		return res.json({ error: { title: 'lecture_uuid, reaction params are required' } });
	}
	Reaction.model.deleteMany({ lecture_uuid: data.lecture_uuid, user_id: req.params.id, reaction: data.reaction }, (err) => {
		if (err) {
			logger.error({
				error: err,
			}, 'API removeFavourite');
			return res.json({ error: { title: 'Not able to removeReaction' } });
		}
		res.json({
			success: true,
		});
	});
};

exports.getLectureReactions = function (req, res) {
	logger.info({
		req: req,
	}, 'API get reactionsList by user id');

	Reaction.model.find()
		.where({ lecture_uuid: req.params.id })
		.exec(function (err, item) {
			if (err) {
				logger.error({
					error: err,
				}, 'API get reactionsList');
				return res.apiError('database error', err);
			}
			if (!item) {
				logger.error({
					error: 'items are not found',
				}, 'API get reactionsList');
				return res.apiError('not found');
			}
			res.apiResponse({
				Reactions: item,
				success: true,
			});
		});
};

