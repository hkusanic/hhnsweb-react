const keystone = require('keystone');
const Types = keystone.Field.Types;

let Mkv = new keystone.List('Mkv', {
	autokey: { path: 'slug', from: 'uuid', unique: true },
	map: { name: 'uuid' },
	defaultSort: '-created_date',
});

Mkv.add({
	uuid: { type: String, unique: true, index:true},
	created_date: { type: Types.Date, default: Date.now },
    year: { type: Types.Date, default: Date.now },
	en:{
	issue_path:{type:Types.Url},
    issue_name: {type: String},
    issue_cover: {type: Types.Url}
	},
	ru:{
        issue_path:{type:Types.Url},
        issue_name: { type: String},
        issue_cover: {type: Types.Url}
   }
});


Mkv.register();
