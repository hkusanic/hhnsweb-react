const keystone = require('keystone');
const mongoose = require('mongoose');
const Types = keystone.Field.Types;

let Translation = new keystone.List('Translation', {
	autokey: { path: 'slug', from: 'title_en _id', unique: true },
	map: { name: 'title_en' },
	defaultSort: 'title_en',
});

Translation.add({
	title_en: { type: String },
	title_ru: { type: String },
});


Translation.register();