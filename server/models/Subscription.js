const keystone = require('keystone');
const Types = keystone.Field.Types;

let Subscription = new keystone.List('Subscription');

Subscription.add({
    sub_id : { type: String },
    registered: { type: Number , default: 0 },
    firstname: { type: String, required: true, initial: true },
    lastname: { type: String, required: true, initial: true },
    email: { type: String, initial: true, required: true },
    lang: { type: String, initial:true, required:true },
    created_date_time :  { type: Types.Date, default: Date.now }
});

Subscription.register();