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
<<<<<<< HEAD
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
=======
	uuid: { type: String, unique: true, index: true },
	author: { type: String },
	audio_files: { type: Types.Relationship, ref: 'AudioFile', many: true, label: 'Audio File/s' },
	tnid: { type: String },
	languages: {type: String},
	en: {
	  nid: { type: String },
	  created: { type: String },
	  changed: { type: String },
	  title: { type: String },
	  body: { type: String },
	  url: { type: String },
	},
	ru: {
	  nid: { type: String },
	  created: { type: String },
	  changed: { type: String },
	  body: { type: String },
	  title: { type: String },
	  url: { type: String },
	},
  });
// Blog.add({
// 	title_en: {
// 		type: String,
// 		label: "Title English"
// 	},
// 	title_ru: {
// 		type: String,
// 		label: "Title Russian"
// 	},
// 	date: {
// 		type: String,
// 		label: "Date"
// 	},
// 	publish_date: {
// 		type: String,
// 		label: "Publish Date"
// 	},
// 	author: {
// 		type: String,
// 		label: "Author"
// 	},
// 	body_en: {
// 		type: Types.Html,
// 		wysiwyg: true,
// 		height: 600,
// 		label: "Content English"
// 	},
// 	body_ru: {
// 		type: Types.Html,
// 		wysiwyg: true,
// 		height: 600,
// 		label: "Content Russian"
// 	},
// 	audio_files: {
// 		type: Types.Relationship,
// 		ref: "AudioFile",
// 		many: true,
// 		label: "Audio File/s"
// 	},
// 	needs_translation: {
// 		type: Types.Boolean,
// 		default: true,
// 		label: "Needs To Be Translated"
// 	},
// 	slug: {
// 		type: String,
// 		index: true,
// 		hidden: true
// 	},
// 	uuid: {
// 		type: String,
// 		hidden: true
// 	},
// 	files: {
// 		type: Types.TextArray
// 	},
// 	tags_en: {
// 		type: String,
// 		label: "Tags_en"
// 	},
// 	tags_ru: {
// 		type: String,
// 		label: "Tags_ru"
// 	},
// 	language: {
// 		type: String,
// 		label: "Language"
// 	},
// 	audit: { type: Types.TextArray },
// 	created_date_time: { type: Types.Date, default: Date.now }

// });
>>>>>>> df2694bcc4ef358c7f6af7ca78e4a792e6a6c19c

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
