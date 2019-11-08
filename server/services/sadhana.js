require('dotenv').config();
const ketstone = require('keystone');
const mongoose = require('mongoose');
const Sadhana = ketstone.list('Sadhana');

exports.list = function (body) {
	return new Promise(function (resolve, reject) {
		const DateSort = '-date';
		Sadhana.paginate({
			page: body.page || 1,
			filters: body.filters,
		})
			.sort(DateSort)
			.populate('user')
			.exec(function (err, items) {
				if (err) {
					return reject(err);
				} else {
					return resolve(items);
				}
			});
	});
};

exports.getSadhanaById = function (id) {
	return new Promise(function (resolve, reject) {
		Sadhana.model
			.findOne()
			.where('uuid', id)
			.exec(function (err, sadhanaDetails) {
				if (err) {
					return reject(err);
				} else if (!sadhanaDetails) {
					return reject('No sadhana sheet found');
				} else {
					return resolve(sadhanaDetails);
				}
			});
	});
};

exports.createSadhanaSheet = function (req) {
	return new Promise(function (resolve, reject) {
		var item = new Sadhana.model();
		const data = req.body;
		data.user = mongoose.Types.ObjectId(data.user);
		data.date = data.date.substring(0, 10);
		item.getUpdateHandler(req).process(data, function (err) {
			if (err) {
				return reject(err);
			} else {
				return resolve(item);
			}
		});
	});
};

exports.deleteSadhanaSheet = function (id) {
	return new Promise(function (resolve, reject) {
		Sadhana.model
			.findOne()
			.where('uuid', id)
			.exec(function (err, item) {
				if (err) {
					return reject(err);
				} else if (!item) {
					return reject('Sadhana Sheet does not exists');
				}
				item.remove(function (err) {
					if (err) {
						return reject(err);
					}
					return resolve(true);
				});
			});
	});
};

exports.updateSadhanaSheet = function (req) {
	return new Promise(function (resolve, reject) {
		Sadhana.model
			.findOne()
			.where('uuid', req.params.id)
			.exec(function (err, item) {
				if (err) {
					return reject(err);
				} else if (!item) {
					return reject('Sadhana Sheet does not exists');
				}
				const data = req.body;
				item.getUpdateHandler(req).process(data, function (err) {
					if (err) {
						return reject(err);
					}
					return resolve(item);
				});
			});
	});
};
