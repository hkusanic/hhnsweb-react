const keystone = require('keystone');
const mongoose = require('mongoose');
const Types = keystone.Field.Types;

let Location = new keystone.List('Location', {
	autokey: { path: 'slug', from: 'title_en _id', unique: true },
	map: { name: 'title_en' },
	defaultSort: 'title_en',
});

Location.add({
	title_en: { type: String },
	title_ru: { type: String },

});

Location.register();
