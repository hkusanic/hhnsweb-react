const keystone = require('keystone');
const Types = keystone.Field.Types;
var Content = keystone.list('Content');
let logger = require('../logger/logger');

let Blog = new keystone.List('Blog', {
	autokey: {
		path: 'slug',
		from: 'uuid',
		unique: true,
	},
	map: {
		name: 'uuid',
	},
	defaultSort: '-date',
});

Blog.add({
	uuid: { type: String },
	author: { type: String },
	audio_files: { type: Types.TextArray },
	blog_creation_date: { type: String },
	publish_date: { type: String },
	created_date_time: { type: Types.Date, default: Date.now },
	tnid: { type: String },
	languages: { type: String },
	files: { type: Types.TextArray },
	needs_translation: {
		type: Types.Boolean,
		default: true,
		label: 'Needs To Be Translated',
	},
	slug: {
		type: String,
		index: true,
		hidden: true,
	},
	en: {
		nid: { type: String },
		title: { type: String },
		body: { type: String },
		tags: { type: String },
	},
	ru: {
		nid: { type: String },
		body: { type: String },
		title: { type: String },
		tags: { type: String },
	},
	audit: { type: Types.TextArray },
});

function uuidv4 () {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = (Math.random() * 16) | 0;
		var v = c == 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

Blog.schema.post('save', function (data, next) {
	var item = new Content.model();
	let body = {};
	body.content_uuid = data.uuid;
	body.uuid = uuidv4();
	body.content_type = 'Blog';
	body.content_title_en = data.en.title? data.en.title: data.ru.title? data.ru.title : '';
	body.content_title_ru = data.ru.title? data.ru.title: data.en.title? data.en.title : '';

	item.getUpdateHandler().process(body, function (err) {
		if (err) {
			logger.error(
				{
					error: err,
				},
				'API create content'
			);
		}
	});

	next();
});

Blog.defaultColumns = 'title_en, date|15%, needs_translation|10%';

Blog.register();
