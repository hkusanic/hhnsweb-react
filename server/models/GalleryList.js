const keystone = require('keystone');
const Types = keystone.Field.Types;

let GalleryList = new keystone.List('GalleryList', {
	autokey: { path: 'slug', from: 'name _id', unique: true },
	map: { name: 'message' },
	defaultSort: '-name',
});

GalleryList.add({
    uuid: { type: String, initial: true,
		required: true,
		unique: true,
		index: true },
    name: {type: String,initial: true,required: true,
		unique: true,},
});


GalleryList.register();
