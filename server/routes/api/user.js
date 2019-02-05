var keystone = require('keystone');
const async = require('async');

exports.signin = function (req, res) {

	if (!req.body.username || !req.body.password) return res.json({ success: false });

	keystone.list('User').model.findOne({ email: req.body.username }).exec(function (err, user) {

		if (err || !user) {
			return res.json({
				success: false,
				session: false,
				message: (err && err.message ? err.message : false) || 'Sorry, there was an issue signing you in, please try again.'
			});
		}

		keystone.session.signin({ email: user.email, password: req.body.password }, req, res, function (user) {

			return res.json({
				success: true,
				session: true,
				date: new Date().getTime(),
				admin: user.canAccessKeystone,
				loginUser: {
					userId: user.id,
					userName: user.email
				}
			});

		}, function (err) {

			return res.json({
				success: true,
				session: false,
				message: (err && err.message ? err.message : false) || 'Sorry, there was an issue signing you in, please try again.'
			});

		});

	});
}




exports.signout = function (req, res) {
	keystone.session.signout(req, res, () => {
		res.json({
			signedout: true,
		});
	});
};




exports.signup = function (req, res) {
	console.log('----->', req.user);
	if (req.user) {
		return res.json({
			success: true,
			session: true,
			date: new Date().getTime(),
			admin: req.user.canAccessKeystone,
			loginUser: {
				userId: req.user.id,
				userName: req.user.email
			}
		});
	}

	async.series([
		(cb) => {
			console.log('1');
			if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password) {
				let list = [];
				req.body.firstname === '' ? list.push('First name is missing.') : '';
				req.body.lastname === '' ? list.push('Last name is missing.') : '';
				req.body.email === '' ? list.push('Email is missing.') : '';
				req.body.password === '' ? list.push('Password is missing.') : '';

				res.json({ error: { title: 'Error while creating new account', detail: 'Mandatory values are missing. Please check below for more details.' }, list: list });
				return cb('true');
			}
			return cb();
		},
		(cb) => {

			keystone.list('User').model.findOne({
				email: req.body.email,
			}, (err, user) => {
				if (err || user) {
					return res.json({ error: { title: 'User already exists with that email', detail: 'Please try with another email' } });
				}
				return cb();
			});
		},
		(cb) => {

			let userData = {
				name: {
					first: req.body.firstname,
					last: req.body.lastname,
				},
				email: req.body.email,
				password: req.body.password,
			};

			let User = keystone.list('User').model;
			let newUser = new User(userData);

			newUser.save((err) => {
				return cb(err);
			});
		}],
		(err) => {

			if (err) console.log('ERROR');
			let onSuccess = function (user) {
				res.json({
					success: true,
					session: true,
					date: new Date().getTime(),
					admin: user.canAccessKeystone,
					loginUser: {
						userId: user.id,
						userName: user.email
					}
				});
			};

			let onFail = function (e) {
				res.json({ error: { title: 'Sign up error', detail: 'There was a problem signing you up, please try again' } });
				console.log('ERROR');
			};

			keystone.session.signin({ email: req.body.email, password: req.body.password }, req, res, onSuccess, onFail);
		});


};

