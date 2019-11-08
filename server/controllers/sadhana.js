require('dotenv').config();
const sadhanaService = require('../services/sadhana');
const { handleError } = require('../utils/error.handler');
const { logger } = require('../logger/newLogger');

exports.list = async function (req, res) {
	let query = [];
	let isError = false;
	let errors = [];
	return new Promise((resolve, reject) => {
		if (isError) {
			return reject(errors);
		} else {
			return resolve(true);
		}
	})
		.then(resolved => {
			if (req.query.userId) {
				query.push({
					userId: {
						$regex: '.*' + req.query.userId + '.*',
						$options: 'i',
					},
				});
			}
			if (req.query.date) {
				let date_query = {
					date: {
						$regex: '.*' + req.query.date + '.*',
						$options: 'i',
					},
				};
				query.push(date_query);
			}

			let filters = {};

			if (query.length > 0) {
				filters = {
					$and: query,
				};
			}

			const body = {
				filters,
				page: req.query.apge,
			};
			return sadhanaService.list(body);
		})
		.then(sadhanaLists => {
			logger.info('Getting Sadhana Sheet list API Succeed');
			res.status(200).json({ sadhana: sadhanaLists });
		})
		.catch(err => {
			if (isError) {
				res.status(400).json({ Errors: errors });
			} else {
				logger.error(err);
				res.status(500).json({ Errors: err });
			}
		});
};

exports.getSadhanaById = async function (req, res) {
	let errors = [];
	let isError = false;
	const body = req.body;
	return new Promise((resolve, reject) => {
		if (!body.uuid) {
			isError = true;
			handleError('missingUUUID', errors);
		}
		if (isError) {
			return reject(errors);
		} else {
			return resolve(true);
		}
	})
		.then(resolved => {
			return sadhanaService.getSadhanaById(body.uuid);
		})
		.then(sadhanaDetails => {
			logger.info('Getting Sadhana Sheet by Id API Succeed');
			res.status(200).json({ sadhana: sadhanaDetails, success: true });
		})
		.catch(err => {
			if (isError) {
				res.status(400).json({ Errors: errors });
			} else {
				logger.error(err);
				res.status(500).json({ Errors: err });
			}
		});
};

exports.createSadhanaSheet = async function (req, res) {
	let isError = false;
	let errors = [];
	const body = req.body;
	console.log(JSON.stringify(body));
	return new Promise(function (resolve, reject) {
		if (!body.uuid) {
			isError = true;
			handleError('missingUUUID', errors);
		}
		if (!body.userId) {
			isError = true;
			handleError('missingUserId', errors);
		}
		if (!body.date) {
			isError = true;
			handleError('missingSadhanaDate', errors);
		}
		if (!body.time_rising) {
			isError = true;
			handleError('missingRisingTime', errors);
		}
		if (!body.rounds) {
			isError = true;
			handleError('missingRounds', errors);
		}
		if (!body.reading) {
			isError = true;
			handleError('missingSadhanaReading', errors);
		}
		if (!body.association) {
			isError = true;
			handleError('missingSadhanaAssociation', errors);
		}
		if (isError) {
			return reject(errors);
		} else {
			return resolve(true);
		}
	})
		.then(resolved => {
			return sadhanaService.createSadhanaSheet(req);
		})
		.then(data => {
			logger.info('Creating Sadhana Sheet API Succeed');
			res.status(200).json({ sadhana: data, isCreated: true });
		})
		.catch(err => {
			if (isError) {
				res.status(400).json({ Errors: errors });
			} else {
				logger.error(err);
				res.status(500).json({ Errors: err });
			}
		});
};

exports.deleteSadhanaSheet = async function (req, res) {
	let isError = false;
	let errors = [];
	const id = req.params.id;
	return new Promise(function (resolve, reject) {
		if (isError) {
			return reject(errors);
		} else {
			return resolve(true);
		}
	})
		.then(resolved => {
			return sadhanaService.deleteSadhanaSheet(id);
		})
		.then(data => {
			if (data) {
				logger.info('Deleting Sadhana Sheet API Succeed');
				return res.status(200).json({
					message: 'sadhana Sheet deleted successfully',
					sadhana: true,
					isDeleted: true,
				});
			}
		})
		.catch(err => {
			if (isError) {
				logger.error(errors);
				res.status(400).json({ Errors: errors });
			} else {
				logger.error(err);
				res.status(500).json({ Errors: err });
			}
		});
};

exports.updateSadhanaSheet = async function (req, res) {
	let isError = false;
	let errors = [];
	const body = req.body;
	return new Promise(function (resolve, reject) {
		if (!body.uuid) {
			isError = true;
			handleError('missingUUUID', errors);
		}
		if (!body.userId) {
			isError = true;
			handleError('missingUserId', errors);
		}
		if (isError) {
			return reject(errors);
		} else {
			return resolve(true);
		}
	})
		.then(resolved => {
			return sadhanaService.updateSadhanaSheet(req);
		})
		.then(data => {
			logger.info('Updating Sadhana Sheet list API Succeed');
			return res.status(200).json({ sadhana: data, isUpdated: true });
		})
		.catch(err => {
			if (isError) {
				logger.error(errors);
				res.status(400).json({ Errors: errors });
			} else {
				logger.error(err);
				res.status(500).json({ Errors: err });
			}
		});
};
