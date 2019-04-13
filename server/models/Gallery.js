const keystone = require('keystone');
const Types = keystone.Field.Types;

let Gallery = new keystone.List('Gallery', {
	autokey: { path: 'slug', from: 'dateCreated _id', unique: true },
	map: { name: 'message' },
	defaultSort: '-dateCreated',
});

Gallery.add({
	uuid: { type: String, index: true },
	title: { type: String, index: true },
	comment_uuid: { type: String },
	date: { type: String },
	gallery: { type: String },
	photos: { type: Types.TextArray },
});


Gallery.register();
