const keystone = require('keystone');
const Types = keystone.Field.Types;

let Favourite = new keystone.List('Favourite', {
	autokey: { path: 'slug', from: '_id', unique: true },
	map: { name: '_id' },
	defaultSort: '-created_date',
});

Favourite.add({
	user_id: { type: String, index: true },
	lecture_uuid: { type: String, index: true },
	created_date: { type: Types.Date, default: Date.now },
});

Favourite.register();
