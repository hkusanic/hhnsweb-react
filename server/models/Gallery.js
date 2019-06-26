const keystone = require("keystone");
const Types = keystone.Field.Types;
var Content = keystone.list("Content");

let Gallery = new keystone.List("Gallery", {
	autokey: { path: "slug", from: "dateCreated _id", unique: true },
	map: { name: "message" },
	defaultSort: "-dateCreated"
});

Gallery.add({
	uuid: { type: String, index: true },
	title_en: { type: String, index: true },
	title_ru: { type: String, index: true },
	comment_uuid: { type: String },
	date: { type: String },
	gallery: { type: String },
	photos: { type: Types.TextArray },
	publish_date: { type: String },
	translation_required: { type: Boolean, default: true },
	audit: { type: Types.TextArray },

});

function uuidv4() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
		var r = (Math.random() * 16) | 0;
		var v = c == "x" ? r : (r & 0x3) | 0x8;
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
	today = yyyy + "-" + mm + "-" + dd;
	return today;
}

Gallery.schema.post("save", function(data, next) {
	var item = new Content.model();
	let body = {};
	body.content_uuid = data.uuid;
	body.uuid = uuidv4();
	body.content_type = "Gallery";
	body.content_title_en = data.title_en? data.title_en: data.title_ru? data.title_ru : '';
	body.content_title_ru = data.title_ru? data.title_ru: data.title_en? data.title_en : '';

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

Gallery.register();
