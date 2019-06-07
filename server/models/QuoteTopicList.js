const keystone = require('keystone');
const Types = keystone.Field.Types;

let QuoteTopicList = new keystone.List('QuoteTopicList', {
	autokey: { path: 'slug', from: 'name_en _id', unique: true },
	map: { name: 'message' },
	defaultSort: '-name_en',
});

QuoteTopicList.add({
    uuid: { type: String, initial: true,
		required: true,
		unique: true,
		index: true },
    name_en: {type: String,initial: true,required: true,
        unique: true,},
    name_ru: {type: String,initial: true,required: true,
						unique: true,},
		created_date_time: { type: Types.Date, default: Date.now }

});


QuoteTopicList.register();
