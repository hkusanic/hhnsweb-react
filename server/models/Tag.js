const keystone = require('keystone');
const mongoose = require('mongoose');
const Types = keystone.Field.Types;

let Tag = new keystone.List('Tag', {
	autokey: { path: 'slug', from: 'title _id', unique: true },
	map: { name: 'title' },
});

Tag.add({
	title: { type: String, initial: true, required: true, unique: true, index: true, default: '' },
});

Tag.schema.pre('save', function (next) {
	next();
});

Tag.schema.post('save', function (next) {
	// next();
});

Tag.schema.post('validate', function (err, next) {
	next();
});

Tag.schema.virtual('commentCount').get(function () {
	return this.comments.length;
});

Tag.schema.pre('remove', function (next) {
	next();
});

Tag.schema.post('remove', function (next) {
	next();
});

Tag.register();
