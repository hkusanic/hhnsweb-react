const keystone = require('keystone');
const Types = keystone.Field.Types;

let Video = new keystone.List('Video', {
	autokey: { path: 'slug', from: 'uuid _id', unique: true },
	map: { name: 'uuid' },
	defaultSort: '-date',
});

 Video.add({
    uuid:{ type: String,  index: true, unique: true },
    date: { type: String },
    language:{ type: String },
    type: {type: String},
    en:{
    title:{ type: String },
    event: { type: String },
    author:{ type: String },
    location: {type: String}
    },
    ru:{
        title:{ type: String },
        event:{ type: String },
        author:{ type: String },
        location: {type: String}
    }

});


Video.register();