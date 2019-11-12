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
	let body = req.body;
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
		if (body.isEnglishDominantLanguage === undefined || body.isEnglishDominantLanguage === null) {
			isError = true;
			handleError('missingDominantLanguage', errors);
		}
		if (isError) {
			return reject(errors);
		} else {
			return resolve(true);
		}
	})
		.then(data1 => {
			return sadhanaService.isSheetExistForUser(body.userId, body.date);
		})
		.then(async resolved => {
			if (resolved === false) {
				if (!body.isEnglishDominantLanguage) {
					body.ru = {
						reading: body.reading,
						association: body.association,
						comments: body.comments ? body.comments : '',
						additional_comments: body.additional_comments ? body.additional_comments : '',
						lectures: body.lectures ? body.lectures : '',
					};
					const ruSadhanaData = [];
					ruSadhanaData[0] = body.reading;
					ruSadhanaData[1] = body.association;
					ruSadhanaData[2] = body.comments;
					ruSadhanaData[3] = body.additional_comments;
					ruSadhanaData[4] = body.lectures;
					const convertedData = await sadhanaService.convertDataIntoOtherLanguage(ruSadhanaData, 'en');
					body.en = {
						reading: convertedData[0].translatedText,
						association: convertedData[1].translatedText,
						comments: convertedData[2].translatedText,
						additional_comments: convertedData[3].translatedText,
						lectures: convertedData[4].translatedText,
					};
					return true;
				} else {
					body.en = {
						reading: body.reading,
						association: body.association,
						comments: body.comments ? body.comments : '',
						additional_comments: body.additional_comments ? body.additional_comments : '',
						lectures: body.lectures ? body.lectures : '',
					};
					return true;
				}
			} else if (resolved === true) {
				const errorMessage = {
					message: 'Sadhana sheet is already submitted for this date',
					isAlreadyExist: true,
					isCreated: false,
				};
				throw errorMessage;
			}
		})
		.then(resolved2 => {
			return sadhanaService.createSadhanaSheet(req);
		})
		.then(data => {
			logger.info('Creating Sadhana Sheet API Succeed');
			res.status(200).json({ sadhana: data, isCreated: true, isAlreadyExist: false });
		})
		.catch(err => {
			if (isError) {
				res.status(400).json({ Errors: errors });
			} else if (err.isAlreadyExist) {
				res.status(400).json(err);
			} else {
				logger.error(err);
				res.status(500).json(err);
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

exports.checkLanguageType = async function (req, res) {
	const body = req.body;
	let isError = false;
	let errors = [];
	return new Promise((resolve, reject) => {
		if (!body.text) {
			isError = true;
			handleError('missingText', errors);
		}
		if (isError) {
			return reject(errors);
		} else {
			return resolve(true);
		}
	})
		.then(resolved => {
			return sadhanaService.checkLanguageType(body);
		})

		.then(data => {
			logger.info('Checking language Type for sadhana sheet API Succeed');
			res.status(200).json({
				data: {
					language: data,
				},
			});
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
