const keystone = require('keystone');
const Types = keystone.Field.Types;

let UserVerify = new keystone.List('UserVerify');

UserVerify.add({
	user_id: { type: String, initial: true, unique: true, required: true },
	name: {
		first: { type: String },
		last: { type: String },
	},
	active: { type: Boolean, default: true },
	userName: { type: String },
	dob: { type: String },
	gender: { type: String },
	password: { type: Types.Password },
	email: { type: String, initial: true, unique: true, required: true },
	profile_pic: { type: String },
	mobileNumber: {
		code: { type: String },
		number: { type: String },
	},
	homeNumber: {
		code: { type: String },
		number: { type: String },
	},
	parents: {
		father_name: { type: String },
		father_address: { type: String },
		father_number: { type: String },
		mother_name: { type: String },
		mother_address: { type: String },
		mother_number: { type: String },
	},
	disciple_profile: {
		first_initiation_date: { type: String },
		second_initiation_date: { type: String },
		spiritual_name: {
			first: { type: String },
			last: { type: String },
		},
		temple: { type: String },
		education: { type: String },
		skills: { type: String },
		service: { type: String },
		counselor_name: { type: String },
		spouse_name: { type: String },
		spouse_marriedYear: { type: String },
	},
	children: { type: String },
	address: { type: String },
	accessKeyId: { type: String },
	canAccessKeystone: { type: Boolean, default: false },
	sadhanaSheetEnable: { type: Boolean, default: false },
	isPasswordUpdated: { type: Boolean },
	created_date_time: { type: Types.Date, default: Date.now },
});

UserVerify.register();
