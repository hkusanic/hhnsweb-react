// var keystone = require("keystone");
// const async = require("async");
// var Email = require("keystone-email");
// var nodemailer = require("nodemailer");
// var EMAIL_CONFIG = require("../../constants/constant");
// let logger = require("./../../logger/logger");
// const AWS = require("aws-sdk");
// const axios = require("axios");
// const fs = require("fs");
// const readFilePromise = require("fs-readfile-promise");
// //const sendgridTransport = require('nodemailer-sendgrid-transport');
// const sgMail = require("@sendgrid/mail");
// var request = require("request");

// exports.list = function(req, res) {
// 	// Querying the data this works similarly to the Mongo db.collection.find() method
// 	let query = [];
// 	let DateSort = "-date";
// 	if (req.query.email) {
// 		query.push({
// 			email: {
// 				$regex: ".*" + req.query.email + ".*",
// 				$options: "i"
// 			}
// 		});
// 	}

// 	if (req.query.disciple) {
// 		query.push({
// 			disciple: {
// 				$regex: ".*" + req.query.disciple + ".*",
// 				$options: "i"
// 			}
// 		});
// 	}

// 	if (req.query.disciple) {
// 		query.push({
// 			disciple: {
// 				$regex: ".*" + req.query.disciple + ".*",
// 				$options: "i"
// 			}
// 		});
// 	}

// 	if (req.query.discipleName) {
// 		query.push({
// 			discipleName: {
// 				$regex: ".*" + req.query.discipleName + ".*",
// 				$options: "i"
// 			}
// 		});
// 	}

// 	let filters = {};

// 	if (query.length > 0) {
// 		filters = {
// 			$and: query
// 		};
// 	}

// 	logger.info(
// 		{
// 			req: req
// 		},
// 		"API list users"
// 	);

// 	keystone
// 		.list("Subscriber")
// 		.paginate({
// 			page: req.query.page || 1,
// 			perPage: 10000,
// 			filters: filters
// 		})
// 		.sort(DateSort)
// 		.exec(function(err, items) {
// 			if (err) {
// 				logger.error(
// 					{
// 						error: err
// 					},
// 					"API list lecture"
// 				);
// 				return res.apiError("database error", err);
// 			}
// 			return res.apiResponse({
// 				success: true,
// 				users: items.results,
// 				total: items.results.length
// 			});
// 		});
// };

// exports.subscription = function(req, res) {
// 	console.log("body>>>>>>>>>>>", req.body);
// 	logger.info(
// 		{
// 			req: req
// 		},
// 		"API subscription user"
// 	);

// 	async.series(
// 		[
// 			cb => {
// 				console.log("hereeeeeeeeeeeeeeeeee");
// 				let userData = {
// 					name: {
// 						first: req.body.name ? req.body.name.first : "",
// 						last: req.body.name ? req.body.name.last : ""
// 					},
// 					user_id: req.body.user_id,
// 					userName: req.body.userName,
// 					email: req.body.email,
// 					password: req.body.password,
// 					mobileNumber: req.body.mobileNumber,
// 					countryCode: req.body.countryCode,
// 					disciple: req.body.disciple,
// 					timezone: req.body.timezone,
// 					language: req.body.language,
// 					created: req.body.created,
// 					access: req.body.access,
// 					login: req.body.login,
// 					signature: req.body.signature,
// 					signature_format: req.body.signature_format,
// 					canAccessKeystone: req.body.canAccessKeystone
// 					// oldData: {
// 					// 	uid: req.body.oldData.uid,
// 					// 	vid: req.body.oldData.vid,
// 					// 	nid: req.body.oldData.nid,
// 					// 	init: req.body.oldData.init,
// 					// 	picture: req.body.oldData.picture,
// 					// 	path: req.body.oldData.path
// 					// }
// 				};
// 				if (
// 					req.body.disciple_profile &&
// 					Object.keys(req.body.disciple_profile).length > 0
// 				) {
// 					console.log("inside it");

// 					userData.disciple_profile = {
// 						first_initiation_date:
// 							req.body.disciple_profile.first_initiation_date,
// 						second_initiation_date:
// 							req.body.disciple_profile.second_initiation_date,
// 						spiritual_name: req.body.disciple_profile.spiritual_name,
// 						temple: req.body.disciple_profile.temple,
// 						verifier: req.body.disciple_profile.verifier,
// 						marital_status: req.body.disciple_profile.marital_status,
// 						education: req.body.disciple_profile.education
// 					};
// 				}

// 				let User = keystone.list("User").model;
// 				let newUser = new User(userData);

// 				newUser.save(err => {
// 					console.trace("Trace*******", err);
// 					return cb("err>>>>>>>>>>>>>>>>>>>>>>>>", err);
// 				});
// 			}
// 		],
// 		err => {
// 			if (err) {
// 				logger.error(
// 					{
// 						error: err
// 					},
// 					"API signup user"
// 				);
// 				console.log("ERROR222", err);
// 			}
// 			const msg = {
// 				to: req.body.email,
// 				from: "anurag@cronj.com",
// 				subject: "Registration Successful through sendgrid",
// 				templateId: "d-c89034444bca44b0882f7f1bef971de2",
// 				dynamic_template_data: {
// 					name: req.body.firstname
// 				}
// 			};
// 			let onSuccess = function(user) {
// 				console.log("Im here");
// 				res.json({
// 					success: true,
// 					session: true,
// 					date: new Date().getTime(),
// 					admin: user.canAccessKeystone,
// 					loginUser: {
// 						id: user.id,
// 						email: user.email,
// 						firstName: user.name.first,
// 						last: user.name.last,
// 						mobileNumber: user.mobileNumber,
// 						countryCode: user.countryCode,
// 						user_id: user.user_id,
// 						youbookme_url: process.env.YOUBOOKME_URL
// 					}
// 				});
// 				return sgMail.send(msg);
// 			};

// 			let onFail = function(e) {
// 				logger.error(
// 					{
// 						error: e
// 					},
// 					"API signup user"
// 				);
// 				res.json({
// 					error: {
// 						title: "Sign up error",
// 						detail: "There was a problem signing you up, please try again"
// 					}
// 				});
// 				console.log("ERROR111", e);
// 			};

// 			keystone.session.signin(
// 				{ email: req.body.email, password: req.body.password },
// 				req,
// 				res,
// 				onSuccess,
// 				onFail
// 			);
// 		}
// 	);
// };
// 	const { firstname, lastname, email } = req.body;
// 	console.log("firstName", firstname);
// 	if (!firstname || !lastname || !email) {
// 		return res.json({
// 			error: {
// 				title: "Name and Email both are required",
// 				detail: "Mandatory fields are missing. Please Check"
// 			}
// 		});
// 	}

// 	keystone
// 		.list("User")
// 		.model.findOne()
// 		.where("email", email)
// 		.exec((err, userFound) => {
// 			if (err) {
// 				logger.error(
// 					{
// 						error: err
// 					},
// 					"API subscription"
// 				);
// 				return res.json({
// 					error: { title: "Some error during user find" }
// 				});
// 			} else if (!userFound) {
// 				// const options = {
// 				// 	method: "GET",
// 				// 	url:
// 				// 		"https://api.sendgrid.com/v3/marketing/lists/d044f9b8-7742-49ac-be7b-6c65c56f67a7",
// 				// 	headers: {
// 				// 		Authorization:
// 				// 			"Bearer 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",
// 				// 		"User-Agent": "Request-Promise"
// 				// 	},
// 				// 	json: true // Automatically parses the JSON string in the response
// 				// };
// 				// rp(options)
// 				// 	.then(function(repos) {
// 				// 		console.log("User has %d repos", repos.length);
// 				// 		console.log("repos>>>>>>>>>>>>>>", repos);
// 				// 	})
// 				// 	.catch(function(err) {
// 				// 		console.log("err>>>>>>>>>>>>>>", err);
// 				// 		// API call failed...
// 				// 	});
// 				const data = {
// 					list_ids: ["d044f9b8-7742-49ac-be7b-6c65c56f67a7"],
// 					contacts: [
// 						{
// 							//address_line_1: "string (optional)",
// 							//address_line_2: "string (optional)",
// 							//alternate_emails: ["string"],
// 							//city: "string (optional)",
// 							//country: "string (optional)",
// 							email: email,
// 							first_name: firstname,
// 							id: UUID(),
// 							last_name: lastname
// 							//postal_code: "string (optional)",
// 							//state_province_region: "string (optional)",
// 							//custom_fields: {
// 							//	status: 'subscribed'
// 							//}
// 						}
// 					]
// 				};
// 				const putdata = JSON.stringify(data);
// 				const options = {
// 					method: "PUT",
// 					url: "https://api.sendgrid.com/v3/marketing/contacts",
// 					headers: {
// 						authorization:
// 							"Bearer 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"
// 					},
// 					body: putdata
// 				};
// 				rp(options)
// 					.then(function(parsedBody) {
// 						console.log("body>>>>>", parsedBody);
// 					})
// 					.catch(function(err) {
// 						console.log("err>>>>>>", err);
// 					});
// 			} else {
// 				console.log("userFound>>>>>>>>>>>>", userFound);
// 				// const data = {
// 				// 	list_ids: ["7bf9530e-4a7b-48ae-996f-93c0ad704423"],
// 				// 	contacts: [
// 				// 		{
// 				// 			//address_line_1: "string (optional)",
// 				// 			//address_line_2: "string (optional)",
// 				// 			//alternate_emails: ["string"],
// 				// 			//city: "string (optional)",
// 				// 			//country: "string (optional)",
// 				// 			email: email,
// 				// 			first_name: firstname,
// 				// 			id: UUID(),
// 				// 			last_name: lastname
// 				// 			//postal_code: "string (optional)",
// 				// 			//state_province_region: "string (optional)",
// 				// 			//custom_fields: {
// 				// 			//	status: 'subscribed'
// 				// 			//}
// 				// 		}
// 				// 	]
// 				// };
// 				// const putdata = JSON.stringify(data);
// 				// const options = {
// 				// 	method: "PUT",
// 				// 	url: "https://api.sendgrid.com/v3/marketing/contacts/lists",
// 				// 	headers: {
// 				// 		authorization:
// 				// 			"Bearer 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"
// 				// 	},
// 				// 	body: putdata
// 				// };
// 				// rp(options)
// 				// 	.then(function(parsedBody) {
// 				// 		console.log("body>>>>>", parsedBody);
// 				// 	})
// 				// 	.catch(function(err) {
// 				// 		console.log("err>>>>>>>>>>>>", err);
// 				// 	});
// 			}
// 		});
// };
