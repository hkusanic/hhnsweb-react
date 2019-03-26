const keystone = require('keystone');
const Types = keystone.Field.Types;

let Mkv = new keystone.List('Mkv', {
	autokey: { path: 'slug', from: 'uuid', unique: true },
	map: { name: 'uuid' },
	defaultSort: '-created_date',
});

Mkv.add({
	uuid: { type: String, unique: true, index:true},
	creation_date: { type: Types.Date, default: Date.now },
    year:  {type: String},
	en:{
	issue_path:{type:Types.Url},
    issue_name: {type: String},
    issue_cover: {type: Types.Url},
    issue_contents :{type: String}
	},
	ru:{
        issue_path:{type:Types.Url},
        issue_name: { type: String},
        issue_cover: {type: Types.Url},
        issue_contents :{type: String}
   }
});


Mkv.register();
