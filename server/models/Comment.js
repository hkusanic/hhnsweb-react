const keystone = require('keystone');
const Types = keystone.Field.Types;

let Comment = new keystone.List('Comment', {
	autokey: { path: 'slug', from: 'dateCreated _id', unique: true },
	map: { name: 'message' },
	defaultSort: '-dateCreated',
});

Comment.add({
	uuid: { type: String, unique: true, index: true },
	message: { type: String, initial: true, required: true, index: true, default: '' },
	author_name: { type: String },
	author_email: { type: String },
	lecture_uuid: { type: String },
	approved: { type: Boolean },
	dateCreated: { type: Types.Date, default: Date.now },
});

Comment.schema.pre('save', function (next) {
	next();
});

Comment.schema.post('save', function (next) {
	// next();
});

Comment.schema.post('validate', function (err, next) {
	next();
});

Comment.schema.pre('remove', function (next) {
	next();
});

Comment.schema.post('remove', function (next) {
	next();
});

Comment.register();
