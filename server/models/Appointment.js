const keystone = require('keystone');
const mongoose = require('mongoose');
const Types = keystone.Field.Types;
var Email = require('keystone-email');


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
			apiKey: 'key-c836106c22729cdb1f80d4ba601e864c',
			domain: 'sandbox965a1c0e2b714acab57623c5d878e8ca.mailgun.org',
			to: 'shailendra@cronj.com',
			from: {
			  name: 'kiran',
			  email: 'kiran.kulkarni@cronj.com',
			},
			subject: 'Appointment Approved by Niranjanaswami',
		  });
      console.log('SEND EMAIL');
	}
});

Appointment.schema.post('validate', function (err, next) {
	next();
});

Appointment.schema.pre('remove', function (next) {
	next();
});

Appointment.schema.post('remove', function (next) {
	next();
});

Appointment.register();