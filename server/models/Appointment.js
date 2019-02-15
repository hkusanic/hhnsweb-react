const keystone = require('keystone');
const mongoose = require('mongoose');
const Types = keystone.Field.Types;
var Email = require('keystone-email');
var EMAIL_CONFIG = require('../constants/constant');


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
      console.log('SEND EMAIL');
	}
});

Appointment.schema.post('validate', function (err, next) {
	next();
});

Appointment.schema.pre('remove', function (next) {
	//next();
});

Appointment.schema.post('remove', function (next) {
	//next();
});

Appointment.register();