const keystone = require('keystone');
const Types = keystone.Field.Types;

let Comment = new keystone.List('Comment', {
	autokey: { path: 'slug', from: 'dateCreated _id', unique: true },
	map: { name: 'message' },
	defaultSort: '-created_date_time',
});

Comment.add({
	uuid: { type: String, unique: true, index: true },
	message: {
		type: String,
		initial: true,
		required: true,
		index: true,
		default: '',
	},
	author_name: { type: String },
	author_email: { type: String },
	lecture_uuid: { type: String },
	// approved: { type: Boolean },
	approved: {
		type: Types.Select,
		options: ['0', '1', '2'],
		default: '2',
	},
	dateCreated: { type: Types.Date, default: Date.now },
	created_date_time: { type: Types.Date, default: Date.now },
});

Comment.register();
