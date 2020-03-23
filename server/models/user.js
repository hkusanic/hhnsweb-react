const keystone = require('keystone');
const Types = keystone.Field.Types;
const userPhoneSchema = require('./schemas/UserPhone');
const userContactSchema = require('./schemas/UserContact');
const legalNameSchema = require('./schemas/LegalName');

// First we gonna create our User list
let User = new keystone.List('User');

// Then we gonna add the fields
User.add({
	user_id: { type: String },
	name: { type: Types.Name },
	userName: { type: String },
	discipleName: { type: String },
	email: { type: String, initial: true, required: true },
	mobileNumber: { type: String },
	countryCode: { type: String },
	password: { type: Types.Password },
	canAccessKeystone: { type: Boolean },
	accessKeyId: { type: String },
	timeZone: { type: String },
	language: { type: String },
	signature: { type: String },
	signature_format: { type: String },
	created: { type: String },
	access: { type: String },
	login: { type: String },
	dob: { type: String },
	gender: { type: String },
	creation_date_time: { type: String },
	sadhanaSheetEnable: { type: Boolean, default: false },
	isPasswordUpdated: { type: Boolean },
	disciple: {
		type: Types.Select,
		options: ['No', 'Disciple', 'Aspiring disciple'],
		default: 'No',
	},
	oldData: {
		uid: { type: String },
		init: { type: String },
		picture: { type: String },
		nid: { type: String },
		vid: { type: String },
		path: { type: String },
	},
	disciple_profile: {
		first_initiation_date: { type: String },
		second_initiation_date: { type: String },
		spiritual_name: { type: String },
		temple: { type: String },
		verifier: { type: String },
		marital_status: { type: String },
		education: { type: String },
		skills: { type: String },
		service: { type: String },
	},
	profile_pic: { type: String },
	address: {
		street: { type: String },
		landmark: { type: String },
		city: { type: String },
		country: { type: String },
		postalcode: { type: String },
	},
	created_date_time: { type: Types.Date, default: Date.now },
});

User.schema.add({
	phones: {
		type: [userPhoneSchema],
		required: false,
	},
	legal_name: {
		type: legalNameSchema,
		required: false,
	},
	contacts: {
		type: [userContactSchema],
		required: false,
	},
});

User.register();
