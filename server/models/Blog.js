const keystone = require("keystone");
const Types = keystone.Field.Types;
var Content = keystone.list("Content");

let Blog = new keystone.List("Blog", {
	autokey: {
		path: "slug",
		from: "title_en _id",
		unique: true
	},
	map: {
		name: "title_en"
	},
	defaultSort: "-date"
});

Blog.add({
	title_en: {
		type: String,
		label: "Title English"
	},
	title_ru: {
		type: String,
		label: "Title Russian"
	},
	date: {
		type: String,
		label: "Date"
	},
	publish_date: {
		type: String,
		label: "Publish Date"
	},
	author: {
		type: String,
		label: "Author"
	},
	body_en: {
		type: Types.Html,
		wysiwyg: true,
		height: 600,
		label: "Content English"
	},
	body_ru: {
		type: Types.Html,
		wysiwyg: true,
		height: 600,
		label: "Content Russian"
	},
	audio_files: {
		type: Types.Relationship,
		ref: "AudioFile",
		many: true,
		label: "Audio File/s"
	},
	needs_translation: {
		type: Types.Boolean,
		default: true,
		label: "Needs To Be Translated"
	},
	slug: {
		type: String,
		index: true,
		hidden: true
	},
	uuid: {
		type: String,
		hidden: true
	},
	files: {
		type: Types.TextArray
	},
	tags_en: {
		type: String,
		label: "Tags_en"
	},
	tags_ru: {
		type: String,
		label: "Tags_ru"
	},
	language: {
		type: String,
		label: "Language"
	},
	audit: { type: Types.TextArray }
});

function uuidv4() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
		var r = (Math.random() * 16) | 0,
			v = c == "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

function todayDate() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; // January is 0!

	var yyyy = today.getFullYear();
	if (dd < 10) {
		dd = "0" + dd;
	}
	if (mm < 10) {
		mm = "0" + mm;
	}
	var today = yyyy + "-" + mm + "-" + dd;
	return today;
}

Blog.schema.post("save", function(data, next) {
	var item = new Content.model();
	let body = {};
	body.content_uuid = data.uuid;
	body.uuid = uuidv4();
	body.content_type = "Blog";
	body.created_date_time = new Date().toISOString();
	
	item.getUpdateHandler().process(body, function(err) {
		if (err) {
			logger.error(
				{
					error: err
				},
				"API create content"
			);
		}
	});

	next();
});

Blog.defaultColumns = "title_en, date|15%, needs_translation|10%";

Blog.register();
