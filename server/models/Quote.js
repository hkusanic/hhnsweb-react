const keystone = require('keystone');
const Types = keystone.Field.Types;

let Quote = new keystone.List('Quote', {
	autokey: { path: 'slug', from: 'date _id', unique: true },
	map: { name: 'date' },
	defaultSort: '-date',
});

Quote.add({
	uuid: { type: String, index: true, unique: true },
	date: { type: String },
	published_date: { type: String },
	language: { type: String },
	needs_translation: { type: Boolean, default: true },
	en: {
		body: { type: String },
		title: { type: String },
		topic: { type: String },
		author: { type: String },
	},
	ru: {
		body: { type: String },
		title: { type: String },
		author: { type: String },
		topic: { type: String },
    },
    audit: {type: Types.TextArray }
});

Quote.register();
