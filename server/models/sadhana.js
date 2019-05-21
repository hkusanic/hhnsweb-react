const keystone = require('keystone');
const Types = keystone.Field.Types;

let Sadhana = new keystone.List('Sadhana', {
	autokey: {
		path: 'slug',
		from: 'uuid',
		unique: true,
	},
	map: {
		name: 'uuid',
	},
	defaultSort: '-date',
});

// Then we gonna add the fields
Sadhana.add({
	uuid: { type: String, unique: true, index: true },
	date: { type: String },
	firstName: { type: String },
	lastName: { type: String },
	rounds: { type: String },
	reading: { type: String },
	time_rising: { type: String },
	association: { type: String },
	comments: { type: String },
	additional_comments: { type: String },
	lectures: { type: String },
	email: { type: String },
	approved: { type: Boolean, default: false },
	userId: { type: String },
});

Sadhana.register();
