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
		{ 'name.first': 'Admin', 'name.last': 'User', 'email': 'hrvoje.kusanic@hotmail.com', 'password': 'Test01!', 'canAccessKeystone': true },
		{ 'name.first': 'Shailendra', 'name.last': 'sahu', 'email': 'shailendra@cronj.com', 'password': 'cronj123@', 'canAccessKeystone': false },
		{ 'name.first': 'Kiran', 'name.last': 'Kulkarni', 'email': 'kiran.kulkarni@cronj.com', 'password': '12345', 'canAccessKeystone': false },

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
