const keystone = require('keystone');
const Types = keystone.Field.Types;

let Video = new keystone.List('Video', {
	autokey: { path: 'slug', from: 'uuid _id', unique: true },
	map: { name: 'uuid' },
	defaultSort: '-date',
});

Video.add({
	uuid: { type: String, index: true, unique: true },
	date: { type: String },
	published_date: { type: String },
	language: { type: String },
	type: { type: String },
	author: { type: String },
	translation_required: { type: Boolean, default: true },
	en: {
		title: { type: String },
		event: { type: String },
		location: { type: String },
	},
	ru: {
		title: { type: String },
		event: { type: String },
		location: { type: String },
	},
	urls: { type: Types.TextArray },
	audit: { type: Types.TextArray },
});


Video.register();
