const keystone = require('keystone');
const mongoose = require('mongoose');
const Types = keystone.Field.Types;

let Topic = new keystone.List('Topic', {
	autokey: { path: 'slug', from: 'title_en _id', unique: true },
	map: { name: 'title_en' },
	defaultSort: 'title_en',
});

Topic.add({
	title_en: { type: String },
	title_ru: { type: String },
	created_date_time: { type: Types.Date, default: Date.now }

});


Topic.register();