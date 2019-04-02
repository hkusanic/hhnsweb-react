const keystone = require('keystone');
const Types = keystone.Field.Types;

let Replies = new keystone.List('Replies', {
	autokey: { path: 'slug', from: 'dateCreated _id', unique: true },
	map: { name: 'message' },
	defaultSort: '-dateCreated',
});

Replies.add({
	uuid: { type: String, unique: true, index: true },
	message: { type: String, initial: true, required: true, index: true, default: '' },
	author_name: { type: String },
	author_email: { type: String },
	comment_uuid: { type: String },
	approved: { type: Boolean },
	dateCreated: { type: Types.Date, default: Date.now },
});

Replies.register();
