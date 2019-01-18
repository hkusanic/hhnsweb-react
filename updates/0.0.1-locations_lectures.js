/**
 * This script automatically creates a default Admin user when an
 * empty database is used for the first time. You can use this
 * technique to insert data into any List you have defined.
 *
 * Alternatively, you can export a custom function for the update:
 * module.exports = function(done) { ... }
 */

exports.create = {
	Location: [
		{ title: 'Boston', __ref: 'Boston' },
		{ title: 'Lithuania', __ref: 'Lithuania' },
		{ title: 'Mayapura', __ref: 'Mayapura' },
		{ title: 'Almaty', __ref: 'Almaty' },
		{ title: 'Kiev', __ref: 'Kiev' },
		{ title: 'Kishinev', __ref: 'Kishinev' },
		{ title: 'Moscow', __ref: 'Moscow' },
		{ title: 'Kharkov', __ref: 'Kharkov' },
		{ title: 'Other', __ref: 'Other' },
		{ title: 'Minsk', __ref: 'Minsk' },
		{ title: 'Vitebsk', __ref: 'Vitebsk' },
		{ title: 'New York', __ref: 'New-york' },
		{ title: 'Ukraine', __ref: 'Ukraine' },
		{ title: 'Vilnius', __ref: 'Vilnius' },
		{ title: 'Chowpatti', __ref: 'Chowpatti' },
		{ title: 'St. Petersburg', __ref: 'St. Petersburg' },
		{ title: 'Ottawa', __ref: 'Ottawa' },
		{ title: 'Lipetsk', __ref: 'Lipetsk' },
		{ title: 'New Vraja Dhama', __ref: 'New Vraja Dhama' },
		{ title: 'Lugansk', __ref: 'Lugansk' },
		{ title: 'Tbilisi', __ref: 'Tbilisi' },
		{ title: 'Anapa', __ref: 'Anapa' },
		{ title: 'Bologna', __ref: 'Bologna' },
		{ title: 'Istanbul', __ref: 'Istanbul' },
		{ title: 'Germany', __ref: 'Germany' },
		{ title: 'Magdalinivka', __ref: 'Magdalinivka' },
		{ title: 'Tiraspol', __ref: 'Tiraspol' },
		{ title: 'Kherson', __ref: 'Kherson' },
		{ title: 'Beltsi', __ref: 'Beltsi' },
		{ title: 'Mogilev', __ref: 'Mogilev' },
		{ title: 'Hartford', __ref: 'Hartford' },
		{ title: 'Russian Sadhu Sanga', __ref: 'Russian Sadhu Sanga' },
		{ title: 'Taiwan', __ref: 'Taiwan' },
		{ title: 'Berdyansk', __ref: 'Berdyansk' },
		{ title: 'Bali', __ref: 'Bali' },
		{ title: 'Tomsk', __ref: 'Tomsk' },
		{ title: 'Carpathian Festival', __ref: 'Carpathian Festival' },
		{ title: 'Budapest', __ref: 'Budapest' },
		{ title: 'Gomel', __ref: 'Gomel' },
		{ title: 'Dnepropetrovsk', __ref: 'Dnepropetrovsk' },
		{ title: 'Odessa', __ref: 'Odessa' },
		{ title: 'Donetsk', __ref: 'Donetsk' },
		{ title: 'Evpatoriya', __ref: 'Evpatoriya' },
		{ title: 'Pune', __ref: 'Pune' },
	],
	Lecture: [
		{
			'title.en': 'November 24, 2018 - Kiev Counselor Retreat - \"Guru is Servant Before Master\" - English/ Russian',
			'title.ru': 'Test Russian',
			'type': 'Lecture',
			'location': 'Kiev',
			'event': 'Retreat',
			'date': '2018-11-24',
			'translation': 'Russian',
			'topic': 'Other',
			'audio': 'https://www.niranjanaswami.relaxweb.ca/dev/download/33744',
			'duration': '01:55:05',
			'downloads': 64,
			'youtube': [
				'https://www.youtube.com/embed/5IKgXKxQsjA?rel=gallery-all&wmode=opaque&autoplay=0',
				'https://www.youtube.com/embed/R8niXGb8dtA?rel=gallery-all&wmode=opaque',
				'https://www.youtube.com/embed/DPJBF6b8Xmw?rel=gallery-all&wmode=opaque',
				'https://www.youtube.com/embed/d2QiG3ER-8w?rel=gallery-all&wmode=opaque',
				'https://www.youtube.com/embed/WtQHDLG4wzg?rel=gallery-all&wmode=opaque',
			],
		},
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
