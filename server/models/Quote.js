const keystone = require('keystone');
const Types = keystone.Field.Types;
var Content = keystone.list('Content');

let Quote = new keystone.List('Quote', {
	autokey: { path: 'slug', from: 'date _id', unique: true },
	map: { name: 'date' },
	defaultSort: '-date',
});

Quote.add({
	uuid: { type: String, index: true, unique: true },
	date: { type: String },
	published_date: { type: String },
	language: { type: String },
	needs_translation: { type: Boolean, default: true },
	en: {
		body: { type: String },
		title: { type: String },
		topic: { type: String },
		author: { type: String },
	},
	ru: {
		body: { type: String },
		title: { type: String },
		author: { type: String },
		topic: { type: String },
	},
	audit: { type: Types.TextArray },
});
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function todayDate () {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; // January is 0!

	var yyyy = today.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	}
	if (mm < 10) {
		mm = '0' + mm;
	}
	var today = yyyy + '-' + mm + '-' + dd;
	return today;
}

Quote.schema.post('save', function (data, next) {

   
    var item = new Content.model();
    let body = {};
    body.content_uuid = data.uuid;
    body.uuid = uuidv4();
    body.content_type = 'Quote';
    body.date_created = todayDate();
    
	item.getUpdateHandler().process(body, function (err) {

		if (err) {
			logger.error({
				error: err,
			}, 'API create content');
		
		}

    });
    
    next();
});

Quote.register();
