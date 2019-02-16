const keystone = require('keystone');
const mongoose = require('mongoose');
const Types = keystone.Field.Types;
var Email = require('keystone-email');
var EMAIL_CONFIG = require('../constants/constant');
const sgMail = require('@sendgrid/mail');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport(EMAIL_CONFIG.CONSTANTS.EMAIL_CONFIG_APPOINTMENT.NODE_MAILER.mail.smtpConfig);

 function sendMail(from, to, subject, html) {

	var mailOptions = createMailBody(from, to, subject, html);

	return transporter.sendMail(mailOptions);
}

function createMailBody(from, to, subject, html) {
  	var mailOptions = {
		from: from,
		to: to,
		subject: subject,
		html: html,
	};
	return mailOptions;
}


let Appointment = new keystone.List('Appointment', {
	autokey: { path: 'slug', from: 'email', unique: true },
	map: { name: 'email' },
	defaultSort: '-dateCreated',
});

Appointment.add({
	email: { type: String, initial: true, required: true, unique: true, index: true, default: '' },
	requestedFor: { type: Types.Select, options: ['Darshan-15', 'Darshan-30', 'Darshan-45', 'Darshan-60'], default: 'Darshan-15' },
	approvedFor: { type: Types.Select, options: ['Darshan-15', 'Darshan-30', 'Darshan-45', 'Darshan-60'], default: 'Darshan-15' },
	disciple: { type: String, default: 'no' },
	mobileNumber:  { type: Types.Number, default: 0 },
	dateCreated: { type: Types.Date, default: Date.now },
	approved: { type: Types.Boolean, default: false },
});

Appointment.schema.pre('save', function (next) {
	next();
});

Appointment.schema.post('save', function (data) {
	
	if (data.approved) {
		new Email('./templates/testemail.pug', {
			transport: 'mailgun',
		  }).send({}, {
			apiKey: EMAIL_CONFIG.CONSTANTS.EMAIL_CONFIG_APPOINTMENT.API_KEY,
			domain: EMAIL_CONFIG.CONSTANTS.EMAIL_CONFIG_APPOINTMENT.DOMAIN,
			to: data.email,
			from: {
			  name: EMAIL_CONFIG.CONSTANTS.EMAIL_CONFIG_APPOINTMENT.FROM_NAME,
			  email: EMAIL_CONFIG.CONSTANTS.EMAIL_CONFIG_APPOINTMENT.FROM_EMAIL,
			},
			subject: EMAIL_CONFIG.CONSTANTS.EMAIL_CONFIG_APPOINTMENT.SUBJECT,
		  });
	  
	  
		sgMail.setApiKey(EMAIL_CONFIG.CONSTANTS.EMAIL_CONFIG_APPOINTMENT.SENDGRID_API_KEY);
		const msg = {
		to: data.email,
		from: EMAIL_CONFIG.CONSTANTS.EMAIL_CONFIG_APPOINTMENT.FROM_EMAIL,
		subject: EMAIL_CONFIG.CONSTANTS.EMAIL_CONFIG_APPOINTMENT.SUBJECT,
		html: EMAIL_CONFIG.CONSTANTS.EMAIL_CONFIG_APPOINTMENT.SENDGRID_HTML,
		};
		sgMail.send(msg);

		sendMail(EMAIL_CONFIG.CONSTANTS.EMAIL_CONFIG_APPOINTMENT.FROM_EMAIL, data.email, EMAIL_CONFIG.CONSTANTS.EMAIL_CONFIG_APPOINTMENT.SUBJECT, EMAIL_CONFIG.CONSTANTS.EMAIL_CONFIG_APPOINTMENT.SENDGRID_HTML)
			}
		});

Appointment.schema.post('validate', function (err, next) {
	next();
});


Appointment.register();