const nodemailer = require('nodemailer');
var EMAIL_CONFIG = require('../constants/constant');

const transporter = nodemailer.createTransport(
	EMAIL_CONFIG.CONSTANTS.EMAIL_CONFIG_APPOINTMENT.NODE_MAILER.mail.smtpConfig
);

exports.sendMail = function (from, to, subject, html) {
	const mailOptions = createMailBody(from, to, subject, html);
	return transporter.sendMail(mailOptions);
};

function createMailBody (from, to, subject, html) {
	var mailOptions = {
		from: from,
		to: to,
		subject: subject,
		html: html,
	};
	return mailOptions;
}
