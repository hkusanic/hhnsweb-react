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
	comments: { type: Types.TextArray },
	additional_comments: { type: Types.TextArray },
	lectures: { type: Types.TextArray },
	email: {
		type: String,
		initial: true,
		required: true,
		unique: true,
		index: true,
		default: '',
	},

});

Sadhana.register();
