const keystone = require('keystone');
const Types = keystone.Field.Types;

let Reaction = new keystone.List('Reaction', {
	autokey: { path: 'slug', from: '_id', unique: true },
	map: { name: '_id' },
	defaultSort: '-created_date',
});

Reaction.add({
	user_id: { type: String, index: true },
	lecture_uuid: { type: String, index: true },
	reaction: { type: String, index: true },
	created_date: { type: Types.Date, default: Date.now },
});

Reaction.register();
