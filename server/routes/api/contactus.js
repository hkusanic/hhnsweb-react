var keystone = require("keystone");
var ContactUs = keystone.list("ContactUs");
var EMAIL_CONFIG = require("../../constants/constant");
var nodemailer = require("nodemailer");

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(
	"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"
);
//const sendgridTransport = require('nodemailer-sendgrid-transport');
// var transporter = nodemailer.createTransport(
// 	EMAIL_CONFIG.CONSTANTS.EMAIL_CONFIG_APPOINTMENT.NODE_MAILER.mail.smtpConfig
// );

// function sendMail(from, to, subject, html) {
// 	var mailOptions = createMailBody(from, to, subject, html);

// 	return transporter.sendMail(mailOptions);
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

exports.create = function(req, res) {
	let item = new ContactUs.model();
	let data = req.method === "POST" ? req.body : req.query;
	console.log("body>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", req.body);
	item.getUpdateHandler(req).process(data, function(err) {
		if (err) return res.apiError("error", err);

		// const msg = {
		// 	to: EMAIL_CONFIG.CONSTANTS.CONTACT_US_EMAIL,
		// 	from: EMAIL_CONFIG.CONSTANTS.EMAIL_CONFIG_APPOINTMENT.FROM_EMAIL,
		//     subject: "NEW ENQUIRY/QUERY",

		// 	html: `
		//     <p>Hare Krishna,</p>
		//     <p>Please accept our humble obeisances.</p>
		//     <p>All glories to Srila Prabhupada!</p>
		//     <br/>
		//     <p>EMAIL: ${data.email}</p>
		//     <p>FIRST NAME: ${data.firstName}</p>
		//     <p>LAST NAME: ${data.lastName}</p>
		//     <p>PHONE: ${data.phone}</p>
		//     <p>MESSAGE: ${data.message}</p>
		//     <br/>
		//     <p>Your servants always,</p>
		//     <p>Site administrators</p>
		//     `
		// };

		const msg = {
			to: req.body.email,
			from: "anurag@cronj.com",
			subject: "NEW ENQUIRY/QUERY",
			templateId: "d-7618350b13244b829612348de909e8f3",
			dynamic_template_data: {
				email: data.email,
				firstName: data.firstname,
				lastName: data.lastname,
				phone: data.phone,
				message: data.message
			}
			// html: `
			// <p>Hare Krishna,</p>
			// <p>Please accept our humble obeisances.</p>
			// <p>All glories to Srila Prabhupada!</p>
			// <br/>
			// <p>EMAIL: ${data.email}</p>
			// <p>FIRST NAME: ${data.firstName}</p>
			// <p>LAST NAME: ${data.lastName}</p>
			// <p>PHONE: ${data.phone}</p>
			// <p>MESSAGE: ${data.message}</p>
			// <br/>
			// <p>Your servants always,</p>
			// <p>Site administrators</p>
			// `
		};

		res.apiResponse({
			contactus: item
		});

		// sendMail(msg.from, msg.to, msg.subject, msg.html)
		// 	.then(res => {
		// 		console.log("email was sent", res);
		// 	})
		// 	.catch(err => {
		// 		console.error(err);
		// 	});
		return sgMail.send(msg);
	});
};
