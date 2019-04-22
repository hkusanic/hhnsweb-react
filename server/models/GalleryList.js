const keystone = require('keystone');
const Types = keystone.Field.Types;

let GalleryList = new keystone.List('GalleryList', {
	autokey: { path: 'slug', from: 'name _id', unique: true },
	map: { name: 'message' },
	defaultSort: '-name',
});

GalleryList.add({
	uuid: {
		type: String,
		initial: true,
		required: true,
		unique: true,
		index: true,
	},
	date: { type: String },
	name_en: { type: String, initial: true, unique: true },
	name_ru: { type: String, initial: true, unique: true },
});

GalleryList.register();
