const keystone = require('keystone');
const Types = keystone.Field.Types;

let Booking = new keystone.List('Booking', {
	autokey: {
		path: 'slug',
		from: 'email',
		unique: true,
	},
	map: {
		name: 'email',
	},
	defaultSort: '-dateCreated',
});

Booking.add({
    email: {
		type: String,
		initial: true,
		required: true,
		unique: true,
		index: true,
		default: '',
	},
    firstName: { type: String},
    lastName: { type: String},
    startsAt: { type: String},
    endsAt: { type: String},
    date: { type: String }
});



Booking.register();
