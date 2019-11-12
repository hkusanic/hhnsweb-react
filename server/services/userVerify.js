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

exports.sendNewUserSubmissionEmail = function (emails, data) {
	return new Promise(function (resolve, reject) {
		const subject = 'New User submitted the details';
		const html = `
	  <p>Hare Krishna,</p>
	  <p>Please accept our humble obeisances.</p>
	  <p>All glories to Srila Prabhupada!</p>
		<p>A new user is submit the user verify data</p>
		<table>
				<tr>
					<td><b>Legal Name</b></td>: <td>${data.name && data.name.first ? data.name.first : '-' }  ${data.name && data.name.last ? data.name.last : '-' }</td>
				</tr>
				<tr>
					<td><b>Temple Associated With</b></td>: <td>${data.disciple_profile && data.disciple_profile.temple ? data.disciple_profile.temple : '-'}</td>
				</tr>
				<tr>
					<td><b>Spiritual Name</b></td>: <td>${data.disciple_profile.spiritual_name.first}  ${data.disciple_profile.spiritual_name.last}</td>
				</tr>
				<tr>
					<td><b>Date of First Association </b></td>: <td>${data.disciple_profile && data.disciple_profile.first_initiation_date ? data.disciple_profile.first_initiation_date : '-' }</td>
				</tr>
				<tr>
					<td><b>Date of Second Association </b></td>: <td>${data.disciple_profile && data.disciple_profile.second_initiation_date ? data.disciple_profile.second_initiation_date : '-'}</td>
				</tr>
				<tr>
					<td><b>Date of Birth</b></td>: <td>${data.dob ? data.dob : '-' }</td>
				</tr>
				<tr>
					<td><b>Email</b></td>: <td>${data.email ? data.email : '-' }</td>
				</tr>
				<tr>
					<td><b>Home Phone Number</b></td>: <td>${data.homeNumber && data.homeNumber.code ? data.homeNumber.code : '-' }  ${data.homeNumber && data.homeNumber.number ? data.homeNumber.number : '-' }</td>
				</tr>
				<tr>
					<td><b>Home Address</b></td>: <td>${data.address ? data.address : '-' }</td>
				</tr>
				<tr>
					<td><b>Mobile Number</b></td>: <td>${data.mobileNumber && data.mobileNumber.code ? data.mobileNumber.code : '-' }  ${data.mobileNumber && data.mobileNumber.number ? data.mobileNumber.number : '-' }</td>
				</tr>
				<tr>
					<td><b>Spouse Name</b></td>: <td>${data.disciple_profile && data.disciple_profile.spouse_name ? data.disciple_profile.spouse_name : '-'}</td>
				</tr>
				<tr>
					<td><b>Spouse Married Year</b></td>: <td>${data.disciple_profile && data.disciple_profile.spouse_marriedYear ? data.disciple_profile.spouse_marriedYear : '-'}</td>
				</tr>
				<tr>
					<td><b>Counselor Name</b></td>: <td>${data.disciple_profile && data.disciple_profile.counselor_name ? data.disciple_profile.counselor_name : '-'}</td>
				</tr>
				<tr>
					<td><b>Education</b></td>: <td>${data.disciple_profile && data.disciple_profile.education ? data.disciple_profile.education : '-'}</td>
				</tr>
				<tr>
					<td><b>Skills</b></td>: <td>${data.disciple_profile && data.disciple_profile.skills ? data.disciple_profile.skills : '-' }</td>
				</tr>
				<tr>
					<td><b>Service</b></td>: <td>${data.disciple_profile && data.disciple_profile.service ? data.disciple_profile.service : '-' }</td>
				</tr>
		</table>
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
