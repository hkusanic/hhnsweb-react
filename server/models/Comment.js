const keystone = require('keystone');
const mongoose = require('mongoose');
const Types = keystone.Field.Types;

let Comment = new keystone.List('Comment', {
	autokey: { path: 'slug', from: 'dateCreated _id', unique: true },
	map: { name: 'message' },
	defaultSort: '-dateCreated',
});

Comment.add({
	message: { type: String, initial: true, required: true, unique: true, index: true, default: '' },
	author: { type: Types.Relationship, ref: 'User', index: true },
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
