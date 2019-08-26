var keystone = require("keystone");
const async = require("async");
var Email = require("keystone-email");
var nodemailer = require("nodemailer");
var EMAIL_CONFIG = require("../../constants/constant");
let logger = require("./../../logger/logger");
const AWS = require("aws-sdk");
const axios = require("axios");
const fs = require("fs");
const readFilePromise = require("fs-readfile-promise");
//const sendgridTransport = require('nodemailer-sendgrid-transport');
const sgMail = require("@sendgrid/mail");
var request = require("request");
var unirest = require("unirest");
var rp = require("request-promise");
const UUID = require("uuid");
var cron = require("node-cron");
//var schedule = require("node-schedule");

sgMail.setApiKey(
	"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"
);

// var transporter = nodemailer.createTransport(
// 	EMAIL_CONFIG.CONSTANTS.EMAIL_CONFIG_APPOINTMENT.NODE_MAILER.mail.smtpConfig
// );

// function sendMail(from, to, subject, html) {
// 	//console.log("anurag");
// 	var mailOptions = createMailBody(from, to, subject, html);
// 	return transporter.sendMail(mailOptions);
// }

// function sendMail(from, to, subject, html) {
// 	var mailOptions = createMailBody(from, to, subject, html);
// 	return sgMail.send(mailOptions);
// }

// function createMailBody(from, to, subject, html) {
// 	var mailOptions = {
// 		from: from,
// 		to: to,
// 		subject: subject,
// 		html: html
// 	};
// 	return mailOptions;
// }

exports.list = function(req, res) {
	// Querying the data this works similarly to the Mongo db.collection.find() method
	let query = [];
	let DateSort = "-date";
	if (req.query.email) {
		query.push({
			email: {
				$regex: ".*" + req.query.email + ".*",
				$options: "i"
			}
		});
	}

	if (req.query.disciple) {
		query.push({
			disciple: {
				$regex: ".*" + req.query.disciple + ".*",
				$options: "i"
			}
		});
	}

	if (req.query.disciple) {
		query.push({
			disciple: {
				$regex: ".*" + req.query.disciple + ".*",
				$options: "i"
			}
		});
	}

	if (req.query.discipleName) {
		query.push({
			discipleName: {
				$regex: ".*" + req.query.discipleName + ".*",
				$options: "i"
			}
		});
	}

	let filters = {};

	if (query.length > 0) {
		filters = {
			$and: query
		};
	}

	logger.info(
		{
			req: req
		},
		"API list users"
	);

	keystone
		.list("User")
		.paginate({
			page: req.query.page || 1,
			perPage: 10000,
			filters: filters
		})
		.sort(DateSort)
		.exec(function(err, items) {
			if (err) {
				logger.error(
					{
						error: err
					},
					"API list lecture"
				);
				return res.apiError("database error", err);
			}
			return res.apiResponse({
				success: true,
				users: items.results,
				total: items.results.length
			});
		});
};

exports.signin = function(req, res) {
	logger.info(
		{
			req: req
		},
		"API signin user"
	);

	if (!req.body.username || !req.body.password) {
		return res.json({ success: false });
	}

	keystone
		.list("User")
		.model.findOne({ email: req.body.username })
		.exec(function(err, user) {
			if (err || !user) {
				logger.error(
					{
						error: err
					},
					"API signin user"
				);
				return res.json({
					success: false,
					session: false,
					message:
						(err && err.message ? err.message : false) ||
						"Sorry, there was an issue signing you in, please try again."
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
							user: user._id,
							id: user.id,
							email: user.email,
							firstName: user.name.first,
							last: user.name.last,
							mobileNumber: user.mobileNumber,
							countryCode: user.countryCode,
							user_id: user.user_id,
							youbookme_url: process.env.YOUBOOKME_URL,
							disciple: user.disciple
						}
					});
				},
				function(err) {
					logger.error(
						{
							error: err
						},
						"API signin user"
					);

					return res.json({
						success: false,
						session: false,
						message:
							(err && err.message ? err.message : false) ||
							"Sorry, there was an issue signing you in, please try again."
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
	console.log(req.body);
	logger.info(
		{
			req: req
		},
		"API signup user"
	);

	async.series(
		[
			cb => {
				keystone.list("User").model.findOne(
					{
						email: req.body.email
					},
					(err, user) => {
						if (err || user) {
							return res.json({
								error: {
									title: "User already exists with that email",
									detail: "Please try with another email"
								}
							});
						}
						return cb();
					}
				);
			},
			cb => {
				console.log("hereeeeeeeeeeeeeeeeee");
				let userData = {
					name: {
						first: req.body.firstName ? req.body.firstName : "",
						last: req.body.lastName ? req.body.lastName : ""
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
					canAccessKeystone: req.body.canAccessKeystone
					// oldData: {
					// 	uid: req.body.oldData.uid,
					// 	vid: req.body.oldData.vid,
					// 	nid: req.body.oldData.nid,
					// 	init: req.body.oldData.init,
					// 	picture: req.body.oldData.picture,
					// 	path: req.body.oldData.path
					// }
				};
				if (
					req.body.disciple_profile &&
					Object.keys(req.body.disciple_profile).length > 0
				) {
					console.log("inside it");

					userData.disciple_profile = {
						first_initiation_date:
							req.body.disciple_profile.first_initiation_date,
						second_initiation_date:
							req.body.disciple_profile.second_initiation_date,
						spiritual_name: req.body.disciple_profile.spiritual_name,
						temple: req.body.disciple_profile.temple,
						verifier: req.body.disciple_profile.verifier,
						marital_status: req.body.disciple_profile.marital_status,
						education: req.body.disciple_profile.education
					};
				}

				let User = keystone.list("User").model;
				let newUser = new User(userData);

				newUser.save(err => {
					console.trace("Trace*******", err);
					return cb("err>>>>>>>>>>>>>>>>>>>>>>>>", err);
				});
			}
		],
		err => {
			if (err) {
				logger.error(
					{
						error: err
					},
					"API signup user"
				);
				console.log("ERROR222", err);
			}
			const msg = {
				to: req.body.email,
				from: "anurag@cronj.com",
				subject: "Registration Successful through sendgrid",
				templateId: "d-c89034444bca44b0882f7f1bef971de2",
				dynamic_template_data: {
					name: req.body.firstname
				}
			};
			let onSuccess = function(user) {
				console.log("Im here");
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
				return sgMail.send(msg);
			};

			let onFail = function(e) {
				logger.error(
					{
						error: e
					},
					"API signup user"
				);
				res.json({
					error: {
						title: "Sign up error",
						detail: "There was a problem signing you up, please try again"
					}
				});
				console.log("ERROR111", e);
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

var User = keystone.list("User");

exports.create = function(req, res) {
	var item = new User.model();
	var data = req.method === "POST" ? req.body : req.query;
	logger.info(
		{
			req: req
		},
		"API create User"
	);
	// data.oldData.picture = JSON.stringify(data.oldData.picture);
	item.getUpdateHandler(req).process(data, function(err) {
		if (err) {
			logger.error(
				{
					error: err
				},
				"API create lecture"
			);
			return res.apiError("error", err);
		}

		res.apiResponse({
			user: item
		});
	});
};

exports.createBulk = function(req, res) {
	logger.info(
		{
			req: req
		},
		"API createBulk User"
	);
	keystone.createItems(
		{
			User: req.body
		},
		function(err, stats) {
			if (err) {
				logger.error(
					{
						error: err
					},
					"API createBulk User"
				);
				return res.apiError("error", err);
			}
			return res.apiResponse({
				User: true
			});
		}
	);
};

exports.forgotpassword = function(req, res) {
	logger.info(
		{
			req: req
		},
		"API forgotpassword"
	);

	if (!req.body.email) {
		res.json({
			error: {
				title: "Email is Reqistered",
				detail: "Mandatory values are missing. Please check."
			}
		});
	}

	keystone
		.list("User")
		.model.findOne()
		.where("email", req.body.email)
		.exec((err, userFound) => {
			if (err) {
				logger.error(
					{
						error: err
					},
					"API forgotpassword"
				);
				return res.json({ error: { title: "Not able to reset password" } });
			}

			userFound.accessKeyId = keystone.utils.randomString();
			userFound.save(err => {
				if (err) {
					logger.error(
						{
							error: err
						},
						"API forgotpassword"
					);
					return res.json({ error: { title: "Not able to reset password" } });
				}
				// 			msg.subject = "Password Reset";
				// 			msg.html = `
				//   <p>Hare Krishna,</p>
				//   <p>Please accept our humble obeisances.</p>
				//   <p>All glories to Srila Prabhupada!</p>
				//   <br/>
				//   <p>Please click on the following link <a href='${EMAIL_CONFIG.CONSTANTS
				// 		.SITE_URL +
				// 		"/reset-password?accessid=" +
				// 		userFound.accessKeyId}'>here </a>to reset your password</p>
				//   <br/>
				//   <p>Your servants always,</p>
				//   <p>Site administrators</p>
				//   `;
				const url =
					EMAIL_CONFIG.CONSTANTS.SITE_URL +
					"/reset-password?accessid=" +
					userFound.accessKeyId;
				const forgotmsg = {
					to: req.body.email,
					from: "anurag@cronj.com",
					subject: "Password Reset",
					templateId: "d-1b7e4524ce2c4079ad5fce0f04520dcb",
					dynamic_template_data: {
						link: url
					}
				};
				// sendMail(msg.from, userFound.email, msg.subject, msg.html)
				// 	.then(res => {
				// 		console.log("email was sent", res);
				// 	})
				// 	.catch(err => {
				// 		logger.error(
				// 			{
				// 				error: err
				// 			},
				// 			"API forgotpassword"
				// 		);
				// 		console.error(err);
				// 	});
				sgMail.send(forgotmsg);
				res.json({
					success: true
				});
				//return sgMail.send(forgotmsg);
			});
		});
};

exports.getuserbyaccessid = function(req, res) {
	if (!req.body.accessid) {
		res.json({
			error: {
				title: "Access Id is Required",
				detail: "Mandatory values are missing. Please check."
			}
		});
	}

	keystone
		.list("User")
		.model.findOne()
		.where("accessKeyId", req.body.accessid)
		.exec((err, userFound) => {
			if (err || !userFound) {
				logger.error(
					{
						error: err
					},
					"API getuserbyaccessid"
				);
				return res.json({ error: { title: "Not able to find user" } });
			}
			res.json({
				email: userFound.email,
				success: true
			});
		});
};

exports.resetpassword = function(req, res) {
	// const msg = {
	// 	to: req.body.email,
	// 	//from: EMAIL_CONFIG.CONSTANTS.EMAIL_CONFIG_APPOINTMENT.FROM_EMAIL,
	// 	from: "anurag@cronj.com",
	// 	subject: "Your password is successfully changed"
	// };
	console.log("reset>>>>>>>>>>>>>>>>>>", req.body);
	if (!req.body.email || !req.body.accessid || !req.body.password) {
		res.json({
			error: {
				title: "Email, Password and Accessid is Reqired",
				detail: "Mandatory values are missing. Please check."
			}
		});
	}

	keystone
		.list("User")
		.model.findOne()
		.where("accessKeyId", req.body.accessid)
		.exec((err, userFound) => {
			if (err || !userFound) {
				logger.error(
					{
						error: err
					},
					"API resetpassword"
				);
				return res.json({ error: { title: "Not able to find user" } });
			}
			keystone
				.list("User")
				.model.findOne()
				.where("email", req.body.email)
				.exec((err, userFound) => {
					if (err || !userFound) {
						logger.error(
							{
								error: err
							},
							"API resetpassword"
						);
						return res.json({ error: { title: "Not able to reset password" } });
					}
					userFound.password = req.body.password;
					let userPassword = userFound.password;
					userFound.accessKeyId = "";

					userFound.save(err => {
						if (err) {
							logger.error(
								{
									error: err
								},
								"API resetpassword"
							);
							return res.json({
								error: { title: "Not able to reset password" }
							});
						}
						//msg.subject = "Your Password is Successfully Changed";

						// 		msg.html = `
						// <p>Hare Krishna,</p>
						// <p>Please accept our humble obeisances.</p>
						// <p>All glories to Srila Prabhupada!</p>
						// <br/>
						// <p>Your password is reset and the new password is - ${userPassword}</p>
						// <br/>
						// <p>Your servants always,</p>
						// <p>Site administrators</p>
						// `;

						// sendMail(msg.from, userFound.email, msg.subject, msg.html)
						// 	.then(res => {
						// 		console.log("email was sent", res);
						// 	})
						// 	.catch(err => {
						// 		logger.error(
						// 			{
						// 				error: err
						// 			},
						// 			"API resetpassword"
						// 		);
						// 		console.error(err);
						// 	});
						const resetmsg = {
							to: req.body.email,
							from: "anurag@cronj.com",
							subject: "Your Password is Successfully Changed",
							templateId: "d-452092f2428443c7a67b57a230d4634a",
							dynamic_template_data: {
								userPassword: userPassword
							}
						};
						sgMail
							.send(resetmsg)
							.then(res => {
								console.log("email was sent", res);
							})
							.catch(err => {
								logger.error(
									{
										error: err
									},
									"API resetpassword"
								);
								console.log(err);
							});

						res.json({
							success: true
						});
					});
				});
		});
};

exports.editprofile1 = function(req, res) {
	if (!req.body.firstName || !req.body.lastName || !req.body.mobileNumber) {
		res.json({
			error: {
				title: "Required",
				detail: "Mandatory values are missing. Please check."
			}
		});
	}

	keystone
		.list("User")
		.model.findOne()
		.where("email", req.user.email)
		.exec((err, userFound) => {
			if (err || !userFound) {
				logger.error(
					{
						error: err
					},
					"API editprofile"
				);
				return res.json({ error: { title: "Not able to reset password" } });
			}

			userFound.name.first = req.body.firstName;
			userFound.name.last = req.body.lastName;
			userFound.mobileNumber = req.body.mobileNumber;
			userFound.countryCode = req.body.countryCode;

			userFound.save(err => {
				if (err) {
					logger.error(
						{
							error: err
						},
						"API editprofile"
					);
					return res.json({ error: { title: "Not able to reset password" } });
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
		"API get Sadhana"
	);
	keystone
		.list("User")
		.model.findOne()
		.where({ user_id: req.body.user_id })
		.exec(function(err, item) {
			if (err) {
				logger.error(
					{
						error: err
					},
					"API get sadhana"
				);
				return res.apiError("database error", err);
			}
			if (!item) {
				logger.error(
					{
						error: "item not found"
					},
					"API get sadhana"
				);
				return res.apiError("not found");
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
		"API Approve Sadhana Sheet For user"
	);
	keystone
		.list("User")
		.model.findOne()
		.where({ user_id: req.body.user_id })
		.exec(function(err, user) {
			if (err) {
				logger.error(
					{
						error: err
					},
					"API Approve Sadhana Sheet For user"
				);
				return res.apiError("database error", err);
			}
			if (!user) {
				logger.error(
					{
						error: "item not found"
					},
					"API Approve Sadhana Sheet For user"
				);
				return res.apiError("not found");
			}

			user.sadhanaSheetEnable = req.body.sadhanaSheetEnable;
			user.save(err => {
				if (err) {
					logger.error(
						{
							error: err
						},
						"API Approve Sadhana Sheet For user"
					);
					return res.apiError("Enable Sadhana Sheet Error", err);
				}

				res.json({
					isSadhanaSheetEnable: true,
					userDetails: user
				});
			});
		});
};

/**
 * To generate s3 object using configuration object
 * @param {object} awsConfig
 * @param {string} awsConfig.accessKeyId Access Key of AWS configuration
 * @param {string} awsConfig.secretAccessKey Access Secret Key(Token) of AWS configuration
 */
function generateS3Object(awsConfig) {
	const awsConfigObj = {
		accessKeyId: process.env.AWS_KEY,
		secretAccessKey: process.env.AWS_SECRET,
		s3BucketEndpoint: false,
		endpoint: "https://s3.amazonaws.com"
	};
	AWS.config.update(awsConfigObj);
	return new AWS.S3();
}

async function uploadToAWS(filePath, req, response) {
	console.log("...came to upload aws");
	let content = await readFilePromise(filePath);
	let base64data = new Buffer(content, "binary");
	let myKey = `profilePictures/pictures/${req.body.uid}/${req.body.oldData.picture.filename}`;
	let params = {
		Bucket: process.env.AWS_BUCKET,
		Key: myKey,
		Body: base64data,
		ACL: "public-read"
	};
	// fs.unlink(filePath, err => {
	// 	if (err) {
	// 		console.log(err);
	// 	} else {
	// 		console.log('deleted file');
	// 	}
	// });
	const s3 = generateS3Object();
	s3.upload(params, (err, data) => {
		if (err) console.error(`Upload Error ${err}`);
		console.log("Upload Completed");
		return response.json({
			url: data.Location
		});
	});
}

exports.uploadPic = async (req, response) => {
	var delayInMilliseconds = 1000;
	if (req && req.body && req.body.oldData && req.body.oldData.picture) {
		if (
			req.body.oldData.picture &&
			JSON.parse(req.body.oldData.picture) !== null
		) {
			req.body.oldData.picture = JSON.parse(req.body.oldData.picture);
			let filePath = "./uploads/profile/" + Date.now() + ".jpg";
			let url = req.body.oldData.picture.url;
			let downloadImage = await download_image(url, filePath);
			if (downloadImage.status) {
				setTimeout(function() {
					uploadToAWS(filePath, req, response);
					console.log("done");
				}, delayInMilliseconds);
			}
		} else {
			console.log("profile pic not available");
			return response.json({ url: "Profile pic not available" });
		}
	} else {
		console.log("profile pic not available");
		return response.json({ url: "Profile pic not available" });
	}
};

const download_image = (url, image_path) =>
	axios({
		url: url,
		responseType: "stream"
	})
		.then(response => {
			response.data.pipe(fs.createWriteStream(image_path));

			return {
				status: true,
				error: ""
			};
		})
		.catch(error => ({
			status: false,
			error: "Error: " + error.message
		}));

exports.updateRegistration = function(req, res) {
	logger.info(
		{
			req: req
		},
		"API updateRegistration"
	);
	const msg = {
		to: req.body.email,
		from: EMAIL_CONFIG.CONSTANTS.EMAIL_CONFIG_APPOINTMENT.FROM_EMAIL,
		subject: "",
		html: ""
	};
	if (!req.body.email) {
		res.json({
			error: {
				title: "Email is Reqired",
				detail: "Mandatory values are missing. Please check."
			}
		});
	}

	keystone
		.list("User")
		.model.findOne()
		.where("email", req.body.email)
		.exec((err, userFound) => {
			if (err) {
				logger.error(
					{
						error: err
					},
					"API updateRegistration"
				);
				return res.json({ error: { title: "Not able to send email" } });
			}

			userFound.accessKeyId = keystone.utils.randomString();
			userFound.save(err => {
				if (err) {
					logger.error(
						{
							error: err
						},
						"API updateRegistration"
					);
					return res.json({ error: { title: "Not able to send email" } });
				}
				msg.subject = "Update Profile";
				msg.html = `
			  <p>Hare Krishna,</p>
			  <p>Please accept our humble obeisances.</p>
			  <p>All glories to Srila Prabhupada!</p>
			  <br/>
			  <p>Please click on the following link <a href='${EMAIL_CONFIG.CONSTANTS
					.SITE_URL +
					"/updatePassword?accessid=" +
					userFound.accessKeyId}'>here </a>to update your profile</p>
			  <br/>
			  <p>Your servants always,</p>
			  <p>Site administrators</p>
			  `;

				sendMail(msg.from, userFound.email, msg.subject, msg.html)
					.then(res => {
						console.log("email was sent", res);
					})
					.catch(err => {
						logger.error(
							{
								error: err
							},
							"API forgotpassword"
						);
						console.error(err);
					});
				res.json({
					success: true
				});
			});
		});
};

exports.updatePassword = function(req, res) {
	const msg = {
		to: req.body.email,
		from: EMAIL_CONFIG.CONSTANTS.EMAIL_CONFIG_APPOINTMENT.FROM_EMAIL,
		subject: "",
		html: ""
	};

	if (!req.body.email || !req.body.accessid || !req.body.password) {
		res.json({
			error: {
				title: "Email, Password and Accessid is Reqired",
				detail: "Mandatory values are missing. Please check."
			}
		});
	}

	keystone
		.list("User")
		.model.findOne()
		.where("accessKeyId", req.body.accessid)
		.exec((err, userFound) => {
			if (err || !userFound) {
				logger.error(
					{
						error: err
					},
					"API resetpassword"
				);
				return res.json({ error: { title: "Not able to find user" } });
			}
			keystone
				.list("User")
				.model.findOne()
				.where("email", req.body.email)
				.exec((err, userFound) => {
					if (err || !userFound) {
						logger.error(
							{
								error: err
							},
							"API resetpassword"
						);
						return res.json({ error: { title: "Not able to reset password" } });
					}
					userFound.password = req.body.password;
					let userPassword = userFound.password;
					userFound.accessKeyId = "";
					userFound
						.save(err => {
							if (err) {
								logger.error(
									{
										error: err
									},
									"API resetpassword"
								);
								return res.json({
									error: { title: "Not able to reset password" }
								});
							}
							msg.subject = "Your Password is Successfully Changed";
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
								.then(res => {
									console.log("email was sent", res);
								})
								.catch(err => {
									logger.error(
										{
											error: err
										},
										"API resetpassword"
									);
									console.error(err);
								});
						})
						.then(() => {
							console.log("inside then ===?????");
							keystone.session.signin(
								{ email: userFound.email, password: req.body.password },
								req,
								res,
								function(user) {
									return res.json({
										success: true,
										session: true,
										date: new Date().getTime(),
										admin: user.canAccessKeystone,
										loginUser: {
											user: user._id,
											id: user.id,
											email: user.email,
											firstName: user.name.first,
											last: user.name.last,
											mobileNumber: user.mobileNumber,
											countryCode: user.countryCode,
											user_id: user.user_id,
											youbookme_url: process.env.YOUBOOKME_URL,
											disciple: user.disciple
										}
									});
								},
								function(err) {
									console.log("inside error ===?????");

									logger.error(
										{
											error: err
										},
										"API signin user"
									);

									return res.json({
										success: false,
										session: false,
										message:
											(err && err.message ? err.message : false) ||
											"Sorry, there was an issue signing you in, please try again."
									});
								}
							);
						});
				});
		});
};

exports.editprofile = function(req, res) {
	if (!req.body.email || !req.body.mobileNumber) {
		res.json({
			error: {
				title: "Required",
				detail: "Mandatory values are missing. Please check."
			}
		});
	}

	keystone
		.list("User")
		.model.findOne()
		.where("email", req.user.email)
		.exec((err, userFound) => {
			if (err || !userFound) {
				logger.error(
					{
						error: err
					},
					"API editprofile"
				);
				return res.json({ error: { title: "Not able to reset password" } });
			}

			userFound.name.first = req.body.first;
			userFound.name.last = req.body.last;
			userFound.mobileNumber = req.body.mobileNumber;
			userFound.disciple_profile = req.body.disciple_profile;
			userFound.userName = req.body.userName;
			userFound.profile_pic = req.body.profile_pic;
			userFound.address = req.body.address;
			userFound.timeZone = req.body.timeZone;

			userFound.save(err => {
				if (err) {
					logger.error(
						{
							error: err
						},
						"API editprofile"
					);
					return res.json({ error: { title: "Not able to reset password" } });
				}

				res.json({
					success: true,
					loginUser: {
						id: userFound.id,
						email: userFound.email,
						firstName: userFound.name.first,
						last: userFound.name.last,
						mobileNumber: userFound.mobileNumber,
						user_id: userFound.user_id,
						youbookme_url: process.env.YOUBOOKME_URL
					}
				});
			});
		});
};

exports.subscription = function(req, res) {
	console.log("body>>>>>>>>>>>", req.body);
	const { firstname, lastname, email } = req.body;
	console.log("firstName", firstname);
	if (!firstname || !lastname || !email) {
		return res.json({
			error: {
				title: "Name and Email both are required",
				detail: "Mandatory fields are missing. Please Check"
			}
		});
	}

	keystone
		.list("User")
		.model.findOne()
		.where("email", email)
		.exec((err, userFound) => {
			if (err) {
				logger.error(
					{
						error: err
					},
					"API subscription"
				);
				return res.json({
					error: { title: "Some error during user find" }
				});
			} else if (!userFound) {
				// const options = {
				// 	method: "GET",
				// 	url:
				// 		"https://api.sendgrid.com/v3/marketing/lists/d044f9b8-7742-49ac-be7b-6c65c56f67a7",
				// 	headers: {
				// 		Authorization:
				// 			"Bearer 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",
				// 		"User-Agent": "Request-Promise"
				// 	},
				// 	json: true // Automatically parses the JSON string in the response
				// };
				// rp(options)
				// 	.then(function(repos) {
				// 		console.log("User has %d repos", repos.length);
				// 		console.log("repos>>>>>>>>>>>>>>", repos);
				// 	})
				// 	.catch(function(err) {
				// 		console.log("err>>>>>>>>>>>>>>", err);
				// 		// API call failed...
				// 	});
				const data = {
					list_ids: ["d044f9b8-7742-49ac-be7b-6c65c56f67a7"],
					contacts: [
						{
							//address_line_1: "string (optional)",
							//address_line_2: "string (optional)",
							//alternate_emails: ["string"],
							//city: "string (optional)",
							//country: "string (optional)",
							email: email,
							first_name: firstname,
							id: UUID(),
							last_name: lastname
							//postal_code: "string (optional)",
							//state_province_region: "string (optional)",
							//custom_fields: {
							//	status: 'subscribed'
							//}
						}
					]
				};
				const putdata = JSON.stringify(data);
				const options = {
					method: "PUT",
					url: "https://api.sendgrid.com/v3/marketing/contacts",
					headers: {
						authorization:
							"Bearer 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"
					},
					body: putdata
				};
				rp(options)
					.then(function(parsedBody) {
						console.log("body>>>>>", parsedBody);
					})
					.catch(function(err) {
						console.log("err>>>>>>", err);
					});
			} else {
				console.log("userFound>>>>>>>>>>>>", userFound);
				// const data = {
				// 	list_ids: ["7bf9530e-4a7b-48ae-996f-93c0ad704423"],
				// 	contacts: [
				// 		{
				// 			//address_line_1: "string (optional)",
				// 			//address_line_2: "string (optional)",
				// 			//alternate_emails: ["string"],
				// 			//city: "string (optional)",
				// 			//country: "string (optional)",
				// 			email: email,
				// 			first_name: firstname,
				// 			id: UUID(),
				// 			last_name: lastname
				// 			//postal_code: "string (optional)",
				// 			//state_province_region: "string (optional)",
				// 			//custom_fields: {
				// 			//	status: 'subscribed'
				// 			//}
				// 		}
				// 	]
				// };
				// const putdata = JSON.stringify(data);
				// const options = {
				// 	method: "PUT",
				// 	url: "https://api.sendgrid.com/v3/marketing/contacts/lists",
				// 	headers: {
				// 		authorization:
				// 			"Bearer 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"
				// 	},
				// 	body: putdata
				// };
				// rp(options)
				// 	.then(function(parsedBody) {
				// 		console.log("body>>>>>", parsedBody);
				// 	})
				// 	.catch(function(err) {
				// 		console.log("err>>>>>>>>>>>>", err);
				// 	});
			}
		});
};

exports.getSubscribersList = function(req, res) {
	// var username = "anuragjais";
	// var password = "Sangeeta@1996";
	// var auth =
	// 	"Basic " + new Buffer(username + ":" + password).toString("base64");
	// const options = {
	// 	method: "GET",
	// 	url: "https://api.sendgrid.com/v3/marketing/contacts?page_size=100",
	// 	// qs: { page_size: "100" },
	// 	headers: {
	// 		// authorization: auth
	// 		Authorization:
	// 			"Bearer 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"
	// 	},
	// 	body: "{}"
	// };
	// request(options, function(error, response, body) {
	// 	if (error) throw new Error(error);
	// 	console.log(error, response.statusCode, body);
	// });

	var options = {
		uri: "https://api.sendgrid.com/v3/marketing/contacts",
		qs: {
			page_size: "100"
		},
		headers: {
			Authorization:
				"Bearer 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",
			"User-Agent": "Request-Promise"
		},
		json: true // Automatically parses the JSON string in the response
	};

	rp(options)
		.then(function(repos) {
			console.log("User has %d repos", repos.length);
			console.log("repos>>>>>>>>>>>>>>", repos);
		})
		.catch(function(err) {
			console.log("err>>>>>>>>>>>>>>", err);
			// API call failed...
		});
};

exports.createSubscribedUserList = function(req, res) {
	console.log("body>>>>>>>>>>>", req.body);
	var options = {
		method: "POST",
		uri: "https://api.sendgrid.com/v3/marketing/lists",
		headers: {
			Authorization:
				"Bearer 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",
			"User-Agent": "Request-Promise"
		},
		body: {
			name: "Subscribed Users"
		},
		json: true // Automatically stringifies the body to JSON
	};
	rp(options)
		.then(function(parsedBody) {
			console.log("parsedbody>>>>>>>>>>>>", parsedBody);
			// POST succeeded...
		})
		.catch(function(err) {
			console.log("err>>>>>>>>>", err);
			// POST failed...
		});
};

exports.createRegisteredSubscribedUsers = function(req, res) {
	console.log("body>>>>>>>>>>>", req.body);
	var options = {
		method: "POST",
		uri: "https://api.sendgrid.com/v3/contactdb/lists",
		headers: {
			Authorization:
				"Bearer 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",
			"User-Agent": "Request-Promise"
		},
		body: {
			name: "Registered SubscribedUsers"
		},
		json: true // Automatically stringifies the body to JSON
	};
	rp(options)
		.then(function(parsedBody) {
			console.log("parsedbody>>>>>>>>>>>>", parsedBody);
			// POST succeeded...
		})
		.catch(function(err) {
			console.log("err>>>>>>>>>", err);
			// POST failed...
		});
};

exports.createUnsubscribeGroup = function(req, res) {
	const options = {
		method: "POST",
		url: "https://api.sendgrid.com/v3/asm/groups",
		headers: {
			authorization:
				"Bearer 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",
			"Content-Type": "application/json"
		},
		body: {
			name: "NewsLetter Suggestions",
			description: "Suggestions for NewsLetter our users might like.",
			is_default: true
		},
		json: true
	};
	rp(options)
		.then(function(parsedBody) {
			console.log("body>>>>>", parsedBody);
			// 			 { id: 9799,
			//   name: 'NewsLetter Suggestions',
			//   description: 'Suggestions for NewsLetter our users might like.',
			//   last_email_sent_at: null,
			//   is_default: true }
		})
		.catch(function(err) {
			console.log("err>>>>>>", err);
		});
};

// exports.scheduleMail = function(req, res) {
// 	const data = {
// 		list_ids: ["d044f9b8-7742-49ac-be7b-6c65c56f67a7"],
// 		send_at :
// 	};
// 	const putdata = JSON.stringify(data);
// 	const options = {
// 		method: "PUT",
// 		url: "https://api.sendgrid.com/v3/marketing/contacts",
// 		headers: {
// 			authorization:
// 				"Bearer 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"
// 		},
// 		body: putdata
// 	};
// 	rp(options)
// 		.then(function(parsedBody) {
// 			console.log("body>>>>>", parsedBody);
// 		})
// 		.catch(function(err) {
// 			console.log("err>>>>>>", err);
// 		});
// };
exports.addRecipient = function(req, res) {
	console.log("body>>>>>>>>>>>", req.body);
	const { firstname, lastname, email } = req.body;
	console.log("firstName", firstname);
	if (!firstname || !lastname || !email) {
		return res.json({
			error: {
				title: "Name and Email both are required",
				detail: "Mandatory fields are missing. Please Check"
			}
		});
	}

	const data = {
		email: email,
		first_name: firstname,
		last_name: lastname
	};

	const postData = JSON.stringify(data);

	const options = {
		method: "POST",
		url: "https://api.sendgrid.com/v3/contactdb/recipients",
		headers: {
			"content-type": "application/json",
			authorization:
				"Bearer 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"
			//authorization: auth
		},
		body: postData,
		json: true
	};

	request(options, function(error, response, body) {
		if (error) throw new Error(error);

		console.log(body);
	});
};

exports.createSenderIdentity = function(req, res) {
	console.log("body......", req.body);
	const data = {
		nickname: req.body.nickname,
		from: {
			email: "anurag@cronj.com",
			name: "anurag"
		},
		reply_to: {
			email: "anurag@cronj.com",
			name: "anurag"
		},
		address: "123 Elm St.",
		address_2: "Apt. 456",
		city: "Bangalore",
		state: "UP",
		zip: "80202",
		country: "India"
	};
	const postdata = JSON.stringify(data);

	const options = {
		method: "POST",
		uri: "https://api.sendgrid.com/v3/senders",
		headers: {
			Authorization:
				"Bearer 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",
			"User-Agent": "Request-Promise"
		},
		body: postdata,
		json: true // Automatically stringifies the body to JSON
	};

	rp(options)
		.then(function(parsedBody) {
			console.log("parsedbody>>>>>>>>>>>>", parsedBody);
			// POST succeeded...
		})
		.catch(function(err) {
			console.log("err>>>>>>>>>", err);
			// POST failed...
		});
};

exports.createCampaign = function(req, res) {
	console.log("body>>>>>>>>>>>", req.body);
	const data = {
		name: req.body.name
	};
	const postdata = JSON.stringify(data);
	var options = {
		method: "POST",
		uri: "https://api.sendgrid.com/v3/contactdb/lists",
		headers: {
			Authorization:
				"Bearer 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",
			"User-Agent": "Request-Promise"
		},
		body: postdata,
		json: true // Automatically stringifies the body to JSON
	};

	rp(options)
		.then(function(parsedBody) {
			console.log("parsedbody>>>>>>>>>>>>", parsedBody);
			// POST succeeded...
		})
		.catch(function(err) {
			console.log("err>>>>>>>>>", err);
			// POST failed...
		});
};

// anuragjais: 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

//anurag-jais: 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

// self: 'https://api.sendgrid.com/v3/marketing/lists/7fdec155-3b6e-49ee-9c7a-39f210a8c714'

// { name: 'Subscribed Users',
//   id: 'd044f9b8-7742-49ac-be7b-6c65c56f67a7',
//   contact_count: 0,
//   _metadata:
//    { self: 'https://api.sendgrid.com/v3/marketing/lists/d044f9b8-7742-49ac-be7b-6c65c56f67a7' } }

//

//  <button
// 		style="	display: inline-block;
// 	border-radius: 3px;
// 	padding: 7px 12px;
// 	border: 1px solid #D5D5D5;
// 	background-image: linear-gradient(#EEE, #DDD);

// 	font: 700 13px/18px Helvetica, arial;"
//  >
// 		Visit Site
//  </button>;
