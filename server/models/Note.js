const keystone = require('keystone');
const Types = keystone.Field.Types;

let Note = new keystone.List('Note', {
	autokey: { path: 'slug', from: '_id', unique: true },
	map: { name: '_id' },
	defaultSort: '-created_date',
});

Note.add({
	message: { type: String },
	author: { type: String, index: true },
	lecture_uuid: { type: String, index: true },
	created_date: { type: Types.Date, default: Date.now },
});

Note.register();
