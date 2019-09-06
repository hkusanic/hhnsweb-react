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
var rp = require("request-promise");
const UUID = require("uuid");

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
		.list("Subscriber")
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

exports.subscription = function(req, res) {
	console.log("body>>>>>>>>>>>", req.body);
	logger.info(
		{
			req: req
		},
		"API subscription user"
	);
	const { firstName, lastName, email, language } = req.body;
	console.log("firstName", firstName);
	if (!firstName || !lastName || !email || !language) {
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
				async.series(
					[
						cb => {
							keystone.list("Subscriber").model.findOne(
								{
									email: req.body.email
								},
								(err, user) => {
									if (err || user) {
										return res.json({
											error: {
												title: "Already Subscribed with that email",
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
							let subscriberData = {
								name: {
									first: req.body.firstName ? req.body.firstName : "",
									last: req.body.lastName ? req.body.lastName : ""
								},
								subscriber_id: req.body.subscriber_id,
								user_id: "null",
								isRegistered: false,
								//userName: userFound.userName,
								email: req.body.email,
								//mobileNumber: userFound.mobileNumber,
								countryCode: req.body.countryCode,
								disciple: req.body.disciple,
								timezone: req.body.timezone,
								language: req.body.language,
								created: req.body.created,
								// access: req.body.access,
								// login: req.body.login,
								// signature: req.body.signature,
								// signature_format: req.body.signature_format,
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
								subscriberData.disciple_profile = {
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

							let Subscriber = keystone.list("Subscriber").model;
							let newSubscriber = new Subscriber(subscriberData);

							newSubscriber.save(err => {
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
								"API subscribe user"
							);
							console.log("ERROR222", err);
						}
					}
				);

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
							first_name: firstName,
							id: UUID(),
							last_name: lastName
							// custom_fields: {
							// 	isRegistered: false,
							// 	language: req.body.language
							// }
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
				async.series(
					[
						cb => {
							keystone.list("Subscriber").model.findOne(
								{
									email: req.body.email
								},
								(err, user) => {
									if (err || user) {
										return res.json({
											error: {
												title: "Already Subscribed with that email",
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
							let subscriberData = {
								name: {
									first: req.body.firstName ? req.body.firstName : "",
									last: req.body.lastName ? req.body.lastName : ""
								},
								subscriber_id: req.body.subscriber_id,
								user_id: userFound._id,
								isRegistered: true,
								//userName: userFound.userName,
								email: req.body.email,
								password: userFound.password,
								//mobileNumber: userFound.mobileNumber,
								//countryCode: userFound.countryCode,
								disciple: userFound.disciple,
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

								subscriberData.disciple_profile = {
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

							let Subscriber = keystone.list("Subscriber").model;
							let newSubscriber = new Subscriber(subscriberData);

							newSubscriber.save(err => {
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
								"API subscribe user"
							);
							console.log("ERROR222", err);
						}
					}
				);
				const data = {
					list_ids: ["7bf9530e-4a7b-48ae-996f-93c0ad704423"],
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
							// custom_fields: {
							// 	isRegistered: true,
							// 	language: req.body.language
							// }
						}
					]
				};
				const putdata = JSON.stringify(data);
				const options = {
					method: "PUT",
					url: "https://api.sendgrid.com/v3/marketing/contacts/lists",
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
						console.log("err>>>>>>>>>>>>", err);
					});
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
		.then(function(contacts) {
			console.log("repos>>>>>>>>>>>>>>", contacts);
			for (let contact of contacts) {
				emaillist.push({ email: contact.email });
			}
		})
		.catch(function(err) {
			console.log("err>>>>>>>>>>>>>>", err);
			// API call failed...
		});
};
