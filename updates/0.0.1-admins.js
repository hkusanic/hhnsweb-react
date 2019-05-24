/**
 * This script automatically creates a default Admin user when an
 * empty database is used for the first time. You can use this
 * technique to insert data into any List you have defined.
 *
 * Alternatively, you can export a custom function for the update:
 * module.exports = function(done) { ... }
 */

exports.create = {
	User: [
		{ 'user_id': '395a4634-7de8-11e9-8f9e-2a86e4085a59', 'name.first': 'Dina Gauranga', 'name.last': 'dasa', 'userName': 'dina123', 'email': 'dgd.nrs@gmail.com', 'mobileNumber': '+12039183034', 'password': 'Gauranga108!', 'canAccessKeystone': true, 'sadhanaSheetEnable': false },
		{ 'user_id': '395a48be-7de8-11e9-8f9e-2a86e4085a59', 'name.first': 'Hari-katha', 'name.last': 'dasa', 'userName': 'hrvoje123', 'email': 'hrvoje.kusanic@hotmail.com', 'mobileNumber': '+41786904834', 'password': 'Test01!', 'canAccessKeystone': true, 'sadhanaSheetEnable': false },
		{ 'user_id': '395a4b84-7de8-11e9-8f9e-2a86e4085a59', 'name.first': 'Shailendra', 'name.last': 'sahu', 'userName': 'shailendra123', 'email': 'shailendra@cronj.com', 'password': 'cronj123@', 'canAccessKeystone': false, 'sadhanaSheetEnable': false },
		{ 'user_id': '395a4d64-7de8-11e9-8f9e-2a86e4085a59', 'name.first': 'Kiran', 'name.last': 'Kulkarni', 'userName': 'kiran123', 'email': 'kiran.kulkarni@cronj.com', 'password': '12345', 'canAccessKeystone': false, 'sadhanaSheetEnable': false },
	],
};

/*

// This is the long-hand version of the functionality above:

var keystone = require('keystone');
var async = require('async');
var User = keystone.list('User');

var admins = [
	{ email: 'user@keystonejs.com', password: 'admin', name: { first: 'Admin', last: 'User' } }
];

function createAdmin (admin, done) {

	var newAdmin = new User.model(admin);

	newAdmin.isAdmin = true;
	newAdmin.save(function (err) {
		if (err) {
			console.error('Error adding admin ' + admin.email + ' to the database:');
			console.error(err);
		} else {
			console.log('Added admin ' + admin.email + ' to the database.');
		}
		done(err);
	});

}

exports = module.exports = function (done) {
	async.forEach(admins, createAdmin, done);
};

*/

