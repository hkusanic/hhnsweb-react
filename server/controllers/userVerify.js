const userVerifyServices = require('../services/userVerify');
const { handleError } = require('../utils/error.handler');
const { logger } = require('../logger/newLogger');

exports.getUserList = async function (req, res) {
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
			const body = {};
			return userVerifyServices.getUserList(body);
		})
		.then(userLists => {
			logger.info('Getting User Verify list API Succeed');
			res.status(200).json({ users: userLists });
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

exports.createUser = async function (req, res) {
	let isError = false;
	let errors = [];
	const body = req.body;
	return new Promise(function (resolve, reject) {
		if (!body.user_id) {
			isError = true;
			handleError('missingUserId', errors);
		}
		if (!body.email) {
			isError = true;
			handleError('missingEmail', errors);
		}
		if (isError) {
			return reject(errors);
		} else {
			return resolve(true);
		}
	})
		.then(resolved => {
			return userVerifyServices.createUser(req);
		})
		.then(data => {
			return userVerifyServices.sendNewUserSubmissionEmail(
				process.env.USER_VERIFY_ADMIN_EMIAL
			);
		})
		.then(data => {
			logger.info('Creating User Verify API Succeed');
			res
				.status(200)
				.json({ meaage: 'Data is submitted successfully', isCreated: true });
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

exports.updateUser = async function (req, res) {
	let isError = false;
	let errors = [];
	const body = req.body;
	return new Promise(function (resolve, reject) {
		if (!body.user_id) {
			isError = true;
			handleError('missingUserId', errors);
		}
		if (!body.email) {
			isError = true;
			handleError('missingEmail', errors);
		}
		if (isError) {
			return reject(errors);
		} else {
			return resolve(true);
		}
	})
		.then(resolved => {
			return userVerifyServices.updateUser(req);
		})
		.then(data => {
			logger.info('Updating User Verify API Succeed');
			res.status(200).json({ user: data, isCreated: true });
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

exports.getUserById = async function (req, res) {
	let errors = [];
	let isError = false;
	const user_id = req.params.id;
	return new Promise((resolve, reject) => {
		if (!user_id) {
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
			return userVerifyServices.getUserById(user_id);
		})
		.then(userDetails => {
			logger.info('Getting User by Id API Succeed');
			res.status(200).json({ user: userDetails, success: true });
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

exports.deleteUser = async function (req, res) {
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
			return userVerifyServices.deleteUser(id);
		})
		.then(data => {
			if (data) {
				logger.info('Deleting User API Succeed');
				return res.status(200).json({
					message: 'User deleted successfully',
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
