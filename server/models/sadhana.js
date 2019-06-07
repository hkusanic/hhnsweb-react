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
	creation_date_time: { type: String },
	rounds: { type: String },
	reading: { type: String },
	time_rising: { type: String },
	association: { type: String },
	comments: { type: String },
	additional_comments: { type: String },
	lectures: { type: String },
	approved: { type: Boolean, default: false },
	userId: { type: String },
	user: { type: Types.Relationship, ref: 'User' },
	created_date_time: { type: Types.Date, default: Date.now }

});

Sadhana.register();
