const keystone = require('keystone');
let logger = require('./../../logger/logger');

const Note = keystone.list('Note');

exports.create = function (req, res) {
	logger.info({
		req: req,
	}, 'API create note');

	const item = new Note.model();
	const data = req.body;
	if (!data.lecture_uuid || !data.author || !data.message) {
		logger.error({
			error: { title: 'Required parameters error' },
		}, 'API removeFavourite');
		return res.json({ error: { title: 'lecture_uuid, author, message params are required' } });
	}
	item.getUpdateHandler(req).process(data, function (err) {
		if (err) {
			logger.error({
				error: err,
			}, 'API create note');
			return res.apiError('error', err);
		}
		res.apiResponse({
			Note: item,
		});
	});
};

exports.update = function (req, res) {
	const data = req.body;
	logger.info({
		req: req,
	}, 'API update note');

	Note.model.findOneAndUpdate({ _id: req.params.id }, data, { new: true }, (err, item) => {
		if (err) {
			logger.error({
				error: err,
			}, 'API create note');
			return res.apiError('error', err);
		}
		res.apiResponse({
			Note: item,
		});
	});
};

exports.remove = function (req, res) {
	logger.info({
		req: req,
	}, 'API remove note');
	Note.model.deleteOne({ _id: req.params.id }, (err) => {
		if (err) {
			logger.error({
				error: err,
			}, 'API removeNote');
			return res.json({ error: { title: 'Not able to remove Note' } });
		}
		res.json({
			success: true,
		});
	});
};

exports.getNoteById = function (req, res) {
	logger.info({
		req: req,
	}, 'API get note by id');
	Note.model.findById(req.params.id)
		.exec((err, item) => {
			if (err || !item) {
				logger.error({
					error: err,
				}, 'API getNoteById');
				return res.json({ error: { title: 'Not able to find Note' } });
			}
			res.json({
				Note: item,
				success: true,
			});
		});
};

exports.getNotesByLectureId = function (req, res) {
	logger.info({
		req: req,
	}, 'API get noteList by lecture id');

	Note.model.find()
		.where({ lecture_uuid: req.params.id })
		.exec(function (err, item) {
			if (err) {
				logger.error({
					error: err,
				}, 'API get notes');
				return res.apiError('database error', err);
			}
			if (!item) {
				logger.error({
					error: 'items are not found',
				}, 'API get notes');
				return res.apiError('not found');
			}
			res.apiResponse({
				Notes: item,
			});
		});
};

