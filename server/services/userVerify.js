require('dotenv').config();
const ketstone = require('keystone');
const UserVerify = ketstone.list('UserVerify');
const emailService = require('../services/email.service');

exports.getUserList = function (body) {
	return new Promise(function (resolve, reject) {
		UserVerify.paginate({
			page: body.page || 1,
			filters: body.filters,
			perPage: body.pageSize,
		})
			.sort({ created_date_time: 'desc' })
			.exec(function (err, items) {
				if (err) {
					return reject(err);
				} else {
					return resolve(items);
				}
			});
	});
};

exports.createUser = function (req) {
	return new Promise(function (resolve, reject) {
		var item = new UserVerify.model();
		const data = req.body;
		item.getUpdateHandler(req).process(data, function (err) {
			if (err) {
				return reject(err);
			} else {
				return resolve(item);
			}
		});
	});
};

exports.updateUser = function (req) {
	return new Promise(function (resolve, reject) {
		UserVerify.model
			.findOne()
			.where('user_id', req.body.user_id)
			.exec(function (err, item) {
				if (err) {
					return reject(err);
				} else if (!item) {
					return reject('user does not exists');
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

exports.getUserById = function (id) {
	return new Promise(function (resolve, reject) {
		UserVerify.model
			.findOne()
			.where('user_id', id)
			.exec(function (err, userDetails) {
				if (err) {
					return reject(err);
				} else if (!userDetails) {
					return reject('No User found');
				} else {
					return resolve(userDetails);
				}
			});
	});
};

exports.deleteUser = function (id) {
	return new Promise(function (resolve, reject) {
		UserVerify.model
			.findOne()
			.where('user_id', id)
			.exec(function (err, item) {
				if (err) {
					return reject(err);
				} else if (!item) {
					return reject('user does not exists');
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

exports.sendNewUserSubmissionEmail = function (emails) {
	return new Promise(function (resolve, reject) {
		const subject = 'New User submitted the details';
		const html = `
	  <p>Hare Krishna,</p>
	  <p>Please accept our humble obeisances.</p>
	  <p>All glories to Srila Prabhupada!</p>
	  <br/>
	  <p>A new user is submit the user verify data</p>
	  <br/>
	  <p>Your servants always,</p>
		<p>Site administrators</p>`;
		emailService
			.sendMail('shailedra@cronj.com', emails, subject, html)
			.then(res => {
				resolve(res);
				console.log('email was sent', res);
			})
			.catch(err => {
				reject(err);
			});
	});
};
