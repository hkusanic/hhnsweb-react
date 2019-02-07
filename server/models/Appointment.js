const keystone = require('keystone');
const mongoose = require('mongoose');
const Types = keystone.Field.Types;

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
});

Appointment.schema.pre('save', function (next) {
	next();
});

Appointment.schema.post('save', function (next) {
	// next();
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