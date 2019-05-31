var keystone = require('keystone');
const async = require('async');
var Email = require('keystone-email');
var nodemailer = require('nodemailer');
var EMAIL_CONFIG = require('../../constants/constant');
let logger = require('./../../logger/logger');
const AWS = require('aws-sdk');
const axios = require('axios');
const fs = require('fs');
var https = require('https');

var transporter = nodemailer.createTransport(
	EMAIL_CONFIG.CONSTANTS.EMAIL_CONFIG_APPOINTMENT.NODE_MAILER.mail.smtpConfig
);

function sendMail(from, to, subject, html) {
	var mailOptions = createMailBody(from, to, subject, html);

	return transporter.sendMail(mailOptions);
}

function createMailBody(from, to, subject, html) {
	var mailOptions = {
		from: from,
		to: to,
		subject: subject,
		html: html
	};
	return mailOptions;
}

exports.list = function(req, res) {
	// Querying the data this works similarly to the Mongo db.collection.find() method
	let query = [];
	let DateSort = '-date';
	if (req.query.email) {
		query.push({
			email: {
				$regex: '.*' + req.query.email + '.*',
				$options: 'i',
			},
		});
	}


	let filters = {};

	if (query.length > 0) {
		filters = {
			$and: query,
		};
	}

	logger.info(
		{
			req: req
		},
		'API list users'
	);

	keystone
		.list('User')
		.paginate({
			page: req.query.page || 1,
			perPage: 10000,
			filters: filters,
		})
		.sort(DateSort)
		.exec(function (err, items) {
			if (err) {
				logger.error(
					{
						error: err
					},
					'API list lecture'
				);
				return res.apiError('database error', err);
			}
			return res.apiResponse({
				success: true,
				users: items.results,
				total: items.results.length,
			});
		});
};

exports.signin = function(req, res) {
	logger.info(
		{
			req: req
		},
		'API signin user'
	);

	if (!req.body.username || !req.body.password) {
		return res.json({ success: false });
	}

	keystone
		.list('User')
		.model.findOne({ email: req.body.username })
		.exec(function(err, user) {
			if (err || !user) {
				logger.error(
					{
						error: err
					},
					'API signin user'
				);
				return res.json({
					success: false,
					session: false,
					message:
						(err && err.message ? err.message : false) ||
						'Sorry, there was an issue signing you in, please try again.'
				});
			}

			keystone.session.signin(
				{ email: user.email, password: req.body.password },
				req,
				res,
				function(user) {
					return res.json({
						success: true,
						session: true,
						date: new Date().getTime(),
						admin: user.canAccessKeystone,
						loginUser: {
							id: user.id,
							email: user.email,
							firstName: user.name.first,
							last: user.name.last,
							mobileNumber: user.mobileNumber,
							countryCode: user.countryCode,
							user_id: user.user_id,
							youbookme_url: process.env.YOUBOOKME_URL
						}
					});
				},
				function(err) {
					logger.error(
						{
							error: err
						},
						'API signin user'
					);

					return res.json({
						success: false,
						session: false,
						message:
							(err && err.message ? err.message : false) ||
							'Sorry, there was an issue signing you in, please try again.'
					});
				}
			);
		});
};

exports.signout = function(req, res) {
	keystone.session.signout(req, res, () => {
		res.json({
			signedout: true
		});
	});
};

exports.signup = function(req, res) {
	logger.info(
		{
			req: req
		},
		'API signup user'
	);

	async.series(
		[
			(cb) => {
				keystone.list('User').model.findOne(
					{
						email: req.body.email
					},
					(err, user) => {
						if (err || user) {
							return res.json({
								error: {
									title: 'User already exists with that email',
									detail: 'Please try with another email'
								}
							});
						}
						return cb();
					}
				);
			},
			(cb) => {
				let userData = {
					name: {
						first: req.body.name ? req.body.name.first : '',
						last: req.body.name ? req.body.name.last : '',
					},
					user_id: req.body.user_id,
					userName: req.body.userName,
					email: req.body.email,
					password: req.body.password,
					mobileNumber: req.body.mobileNumber,
					countryCode: req.body.countryCode,
					disciple: req.body.disciple,
					timezone: req.body.timezone,
					language: req.body.language,
					created: req.body.created,
					access: req.body.access,
					login: req.body.login,
					signature: req.body.signature,
					signature_format: req.body.signature_format,
					canAccessKeystone: req.body.canAccessKeystone,
					oldData: {
						uid: req.body.oldData.uid,
						vid: req.body.oldData.vid,
						nid: req.body.oldData.nid,
						init: req.body.oldData.init,
						picture: req.body.oldData.picture,
						path: req.body.oldData.path,
					},
				};
				if (Object.keys(req.body.disciple_profile).length > 0) {
					console.log('inside it');
					userData.disciple_profile = {
						first_initiation_date:
							req.body.disciple_profile.first_initiation_date,
						second_initiation_date:
							req.body.disciple_profile.second_initiation_date,
						spiritual_name: req.body.disciple_profile.spiritual_name,
						temple: req.body.disciple_profile.temple,
						verifier: req.body.disciple_profile.verifier,
						marital_status: req.body.disciple_profile.marital_status,
						education: req.body.disciple_profile.education,
					};
				}

				let User = keystone.list('User').model;
				let newUser = new User(userData);

				newUser.save((err) => {
					return cb(err);
				});
			}
		],
		(err) => {
			if (err) {
				logger.error(
					{
						error: err
					},
					'API signup user'
				);
				console.log('ERROR222', err);
			}
			let onSuccess = function(user) {
				res.json({
					success: true,
					session: true,
					date: new Date().getTime(),
					admin: user.canAccessKeystone,
					loginUser: {
						id: user.id,
						email: user.email,
						firstName: user.name.first,
						last: user.name.last,
						mobileNumber: user.mobileNumber,
						countryCode: user.countryCode,
						user_id: user.user_id,
						youbookme_url: process.env.YOUBOOKME_URL
					}
				});
			};

			let onFail = function(e) {
				logger.error(
					{
						error: e
					},
					'API signup user'
				);
				res.json({
					error: {
						title: 'Sign up error',
						detail: 'There was a problem signing you up, please try again'
					}
				});
				console.log('ERROR111', e);
			};

			keystone.session.signin(
				{ email: req.body.email, password: req.body.password },
				req,
				res,
				onSuccess,
				onFail
			);
		}
	);
};

var User = keystone.list('User');

exports.create = function (req, res) {
	var item = new User.model();
	var data = req.method === 'POST' ? req.body : req.query;
	logger.info(
		{
			req: req,
		},
		'API create User'
	);
	// data.oldData.picture = JSON.stringify(data.oldData.picture);
	item.getUpdateHandler(req).process(data, function (err) {
		if (err) {
			logger.error(
				{
					error: err,
				},
				'API create lecture'
			);
			return res.apiError('error', err);
		}

		res.apiResponse({
			user: item,
		});
	});
};

exports.createBulk = function (req, res) {
	logger.info(
		{
			req: req,
		},
		'API createBulk User'
	);
	keystone.createItems(
		{
			User: req.body,
		},
		function (err, stats) {
			if (err) {
				logger.error(
					{
						error: err,
					},
					'API createBulk User'
				);
				return res.apiError('error', err);
			}
			return res.apiResponse({
				User: true,
			});
		}
	);
};

exports.forgotpassword = function (req, res) {
	logger.info(
		{
			req: req
		},
		'API create User'
	);
	data.oldData.picture = JSON.stringify(data.oldData.picture);
	item.getUpdateHandler(req).process(data, function(err) {
		if (err) {
			logger.error(
				{
					error: err
				},
				'API create lecture'
			);
			return res.apiError('error', err);
		}

		res.apiResponse({
			user: item
		});
	});
};

exports.forgotpassword = function(req, res) {
	logger.info(
		{
			req: req
		},
		'API forgotpassword'
	);
	const msg = {
		to: req.body.email,
		from: EMAIL_CONFIG.CONSTANTS.EMAIL_CONFIG_APPOINTMENT.FROM_EMAIL,
		subject: '',
		html: ''
	};
	if (!req.body.email) {
		res.json({
			error: {
				title: 'Email is Reqired',
				detail: 'Mandatory values are missing. Please check.'
			}
		});
	}

	keystone
		.list('User')
		.model.findOne()
		.where('email', req.body.email)
		.exec((err, userFound) => {
			if (err) {
				logger.error(
					{
						error: err
					},
					'API forgotpassword'
				);
				return res.json({ error: { title: 'Not able to reset password' } });
			}

			userFound.accessKeyId = keystone.utils.randomString();
			userFound.save((err) => {
				if (err) {
					logger.error(
						{
							error: err
						},
						'API forgotpassword'
					);
					return res.json({ error: { title: 'Not able to reset password' } });
				}
				msg.subject = 'Password Reset';
				msg.html = `
	  <p>Hare Krishna,</p>
	  <p>Please accept our humble obeisances.</p>
	  <p>All glories to Srila Prabhupada!</p>
	  <br/>
	  <p>Please click on the following link <a href='${EMAIL_CONFIG.CONSTANTS
			.SITE_URL +
			'/reset-password?accessid=' +
			userFound.accessKeyId}'>here </a>to reset your password</p>
	  <br/>
	  <p>Your servants always,</p>
	  <p>Site administrators</p>
	  `;

				sendMail(msg.from, userFound.email, msg.subject, msg.html)
					.then((res) => {
						console.log('email was sent', res);
					})
					.catch((err) => {
						logger.error(
							{
								error: err
							},
							'API forgotpassword'
						);
						console.error(err);
					});
				res.json({
					success: true
				});
			});
		});
};

exports.getuserbyaccessid = function(req, res) {
	if (!req.body.accessid) {
		res.json({
			error: {
				title: 'Access Id is Required',
				detail: 'Mandatory values are missing. Please check.'
			}
		});
	}

	keystone
		.list('User')
		.model.findOne()
		.where('accessKeyId', req.body.accessid)
		.exec((err, userFound) => {
			if (err || !userFound) {
				logger.error(
					{
						error: err
					},
					'API getuserbyaccessid'
				);
				return res.json({ error: { title: 'Not able to find user' } });
			}
			res.json({
				email: userFound.email,
				success: true
			});
		});
};

exports.resetpassword = function(req, res) {
	const msg = {
		to: req.body.email,
		from: EMAIL_CONFIG.CONSTANTS.EMAIL_CONFIG_APPOINTMENT.FROM_EMAIL,
		subject: '',
		html: ''
	};

	if (!req.body.email || !req.body.accessid || !req.body.password) {
		res.json({
			error: {
				title: 'Email, Password and Accessid is Reqired',
				detail: 'Mandatory values are missing. Please check.'
			}
		});
	}

	keystone
		.list('User')
		.model.findOne()
		.where('accessKeyId', req.body.accessid)
		.exec((err, userFound) => {
			if (err || !userFound) {
				logger.error(
					{
						error: err
					},
					'API resetpassword'
				);
				return res.json({ error: { title: 'Not able to find user' } });
			}
			keystone
				.list('User')
				.model.findOne()
				.where('email', req.body.email)
				.exec((err, userFound) => {
					if (err || !userFound) {
						logger.error(
							{
								error: err
							},
							'API resetpassword'
						);
						return res.json({ error: { title: 'Not able to reset password' } });
					}
					userFound.password = req.body.password;
					let userPassword = userFound.password;
					userFound.accessKeyId = '';
					userFound.save((err) => {
						if (err) {
							logger.error(
								{
									error: err
								},
								'API resetpassword'
							);
							return res.json({
								error: { title: 'Not able to reset password' }
							});
						}
						msg.subject = 'Your Password is Successfully Changed';
						msg.html = `
				<p>Hare Krishna,</p>
				<p>Please accept our humble obeisances.</p>
				<p>All glories to Srila Prabhupada!</p>
				<br/>
				<p>Your password is reset and the new password is - ${userPassword}</p>
				<br/>
				<p>Your servants always,</p>
				<p>Site administrators</p>
				`;

						sendMail(msg.from, userFound.email, msg.subject, msg.html)
							.then((res) => {
								console.log('email was sent', res);
							})
							.catch((err) => {
								logger.error(
									{
										error: err
									},
									'API resetpassword'
								);
								console.error(err);
							});
						res.json({
							success: true
						});
					});
				});
		});
};

exports.editprofile = function(req, res) {
	if (!req.body.firstName || !req.body.lastName || !req.body.mobileNumber) {
		res.json({
			error: {
				title: 'Required',
				detail: 'Mandatory values are missing. Please check.'
			}
		});
	}

	keystone
		.list('User')
		.model.findOne()
		.where('email', req.user.email)
		.exec((err, userFound) => {
			if (err || !userFound) {
				logger.error(
					{
						error: err
					},
					'API editprofile'
				);
				return res.json({ error: { title: 'Not able to reset password' } });
			}

			userFound.name.first = req.body.firstName;
			userFound.name.last = req.body.lastName;
			userFound.mobileNumber = req.body.mobileNumber;
			userFound.countryCode = req.body.countryCode;

			userFound.save((err) => {
				if (err) {
					logger.error(
						{
							error: err
						},
						'API editprofile'
					);
					return res.json({ error: { title: 'Not able to reset password' } });
				}

				res.json({
					success: true,
					loginUser: {
						id: userFound.id,
						email: userFound.email,
						firstName: userFound.name.first,
						last: userFound.name.last,
						mobileNumber: userFound.mobileNumber,
						countryCode: userFound.countryCode,
						user_id: userFound.user_id,
						youbookme_url: process.env.YOUBOOKME_URL
					}
				});
			});
		});
};

exports.getUserByUserId = function(req, res) {
	logger.info(
		{
			req: req
		},
		'API get Sadhana'
	);
	keystone
		.list('User')
		.model.findOne()
		.where({ user_id: req.body.user_id })
		.exec(function(err, item) {
			if (err) {
				logger.error(
					{
						error: err
					},
					'API get sadhana'
				);
				return res.apiError('database error', err);
			}
			if (!item) {
				logger.error(
					{
						error: 'item not found'
					},
					'API get sadhana'
				);
				return res.apiError('not found');
			}
			res.apiResponse({
				userDetails: item,
				success: true
			});
		});
};

exports.approvedUserForSadhana = function(req, res) {
	logger.info(
		{
			req: req
		},
		'API Approve Sadhana Sheet For user'
	);
	keystone
		.list('User')
		.model.findOne()
		.where({ user_id: req.body.user_id })
		.exec(function(err, user) {
			if (err) {
				logger.error(
					{
						error: err
					},
					'API Approve Sadhana Sheet For user'
				);
				return res.apiError('database error', err);
			}
			if (!user) {
				logger.error(
					{
						error: 'item not found'
					},
					'API Approve Sadhana Sheet For user'
				);
				return res.apiError('not found');
			}

			user.sadhanaSheetEnable = req.body.sadhanaSheetEnable;
			user.save((err) => {
				if (err) {
					logger.error(
						{
							error: err
						},
						'API Approve Sadhana Sheet For user'
					);
					return res.apiError('Enable Sadhana Sheet Error', err);
				}

				res.json({
					isSadhanaSheetEnable: true,
					userDetails: user
				});
			});
		});
};

function generatePresignedUrl(type = 'upload', fileDetails, s3, config) {
	let fileType = fileDetails.filemime;
	let myKey = `profilePicture/${fileDetails.filename}`;
	let urlType = {
		upload: 'putObject',
		download: 'getObject'
	};
	const commonOptions = {
		Bucket: process.env.bucket,
		Key: myKey,
		Expires: 100000,
		ACL: 'public-read'
	};
	const options = {
		upload: Object.assign({}, commonOptions, { ContentType: fileType }),
		download: Object.assign({}, commonOptions)
	};
	return s3.getSignedUrl(urlType[type], options[type]);
}

/**
 * To generate s3 object using configuration object
 * @param {object} awsConfig
 * @param {string} awsConfig.accessKeyId Access Key of AWS configuration
 * @param {string} awsConfig.secretAccessKey Access Secret Key(Token) of AWS configuration
 */
function generateS3Object(awsConfig) {
	const awsConfigObj = {
		accessKeyId: process.env.accessKeyId,
		secretAccessKey: process.env.secretAccessKey,
		s3BucketEndpoint: false,
		endpoint: 'https://s3.amazonaws.com'
	};
	AWS.config.update(awsConfigObj);
	return new AWS.S3();
}

async function uploadFileToS3UsingPresignedUrl(presignedUrl, info, finalUrl) {
	let image_path = './uploads/profile/1559286105286.jpg';
	let url = info.oldData.picture.url;
	https.get(url, function(res) {
		fs.readFile(image_path, 'utf-8', function(err, content) {
			if (err) {
				console.log(err);
			} else {
				// console.log(content);
				let file = {
					name: info.oldData.picture.filename,
					type: info.oldData.picture.filemime,
					data: content
				};
				axios
					.put(presignedUrl, file, {
						headers: {
							'Content-Type': info.oldData.picture.filemime
						}
					})
					.then(response => {
						// console.log(response);
						console.log('uploaded successfully');
						console.log(finalUrl);
						return finalUrl;
					})
					.catch(err => {
						console.log(err);
					});
			}
		});
	});
}

exports.uploadPic = function(req, res) {
	filePath = './uploads/profile/1559286105286.jpg';
	fs.readFile(filePath, (err, data) => {
		if (err) console.error(err);

		let base64data = new Buffer(data, 'binary');

		let params = {
			Bucket: process.env.bucket,
			Key: 'profilePictures/pictures/10d399cb-6347-4aee-8ba3-8c8a9eb7ce0f/1559286105286.jpg',
			Body: base64data,
			ACL: 'public-read'
		};
		const s3 = generateS3Object();

		s3.upload(params, (err, data) => {
			if (err) console.error(`Upload Error ${err}`);
			console.log('Upload Completed');
			res.send(data.Location);
		});
	});
};

// uploadFile(filePath, bucketName, key)

// exports.uploadPic = function(req, res) {
// 	let isError = false;
// 	const errors = [];
// 	if (!req && reeq.body && req.body.oldData && req.body.oldData.path) {
// 		isError = true;
// 		errors.push({ message: 'please attach profile picture' });
// 	}
// 	if (isError) {
// 		logger.error({ err: errors });
// 		return res.status(400).json({ errors });
// 	}
// 	const s3 = generateS3Object();
// 	const options = {
// 		signedUrlExpireSeconds: 100000,
// 		bucket: process.env.bucket,
// 		ACL: 'public-read',
// 		Body: ''
// 	};
// 	const url = generatePresignedUrl(
// 		'upload',
// 		req.body.oldData.picture,
// 		s3,
// 		options
// 	);
// 	const finalUrl = url.substr(0, url.lastIndexOf('?'));
// 	let imageUrl = uploadFileToS3UsingPresignedUrl(url, req.body, finalUrl);
// 	console.log(imageUrl);
// 	return res.json({
// 		message: 'Image uploaded successfully !!',
// 		imageLocation:'https://kirannrs.s3.amazonaws.com/profilePicture/picture-7445-1556262183.jpg'
// 	});
// };
