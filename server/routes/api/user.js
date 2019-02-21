var keystone = require('keystone');
const async = require('async');
var Email = require('keystone-email');
var nodemailer = require('nodemailer');
var EMAIL_CONFIG = require('../../constants/constant');

var transporter = nodemailer.createTransport(EMAIL_CONFIG.CONSTANTS.EMAIL_CONFIG_APPOINTMENT.NODE_MAILER.mail.smtpConfig);

function sendMail (from, to, subject, html) {

	var mailOptions = createMailBody(from, to, subject, html);

	return transporter.sendMail(mailOptions);
}

function createMailBody (from, to, subject, html) {
	var mailOptions = {
		from: from,
		to: to,
		subject: subject,
		html: html,
	};
	return mailOptions;
}

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
					id: user.id,
					email: user.email,
					firstName: user.name.first,
					last: user.name.last,
					mobileNumber: user.mobileNumber
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

	async.series([
		(cb) => {
			console.log('1');
			if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password || !req.body.mobileNumber) {
				let list = [];
				req.body.firstname === '' ? list.push('First name is missing.') : '';
				req.body.lastname === '' ? list.push('Last name is missing.') : '';
				req.body.email === '' ? list.push('Email is missing.') : '';
				req.body.password === '' ? list.push('Password is missing.') : '';
				req.body.mobileNumber === '' ? list.push('Mobile number is missing.') : '';

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
				mobileNumber: req.body.mobileNumber,
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
						id: user.id,
						email: user.email,
						firstName: user.name.first,
						last: user.name.last,
						mobileNumber: user.mobileNumber
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


exports.forgotpassword = function (req, res) {
	
	const msg = {
		to: req.body.email,
		from: EMAIL_CONFIG.CONSTANTS.EMAIL_CONFIG_APPOINTMENT.FROM_EMAIL,
		subject: '',
		html: '',
	};
	if (!req.body.email) {
		res.json({ error: { title: 'Email is Reqired', detail: 'Mandatory values are missing. Please check.' } });	
	}

	keystone.list('User').model.findOne().where('email', req.body.email).exec((err, userFound) => {
		if (err) return res.json({ error: { title: 'Not able to reset password' } });
		
	 userFound.accessKeyId = keystone.utils.randomString();
	 userFound.save((err) => {
	  if (err) return res.json({ error: { title: 'Not able to reset password' } });			;
	  msg.subject = 'Password Reset';
	  msg.html = `
	  <p>Hare Krishna,</p>
	  <p>Please accept our humble obeisances.</p>
	  <p>All glories to Srila Prabhupada!</p>
	  <br/>
	  <p>Please click on the following link <a href="${EMAIL_CONFIG.CONSTANTS.SITE_URL + '/reset-password?accessid=' + userFound.accessKeyId}">here </a>to reset your password</p>
	  <br/>
	  <p>Your servants always,</p>
	  <p>Site administrators</p>
	  `;

	 
	  sendMail(msg.from, userFound.email, msg.subject, msg.html)
		.then((res) => {
			console.log('email was sent', res);
		})
		.catch((err) => {
			console.error(err);
		});
		  res.json({
				success: true,
		});
	});
});


}



exports.getuserbyaccessid = function (req, res) {
	if (!req.body.accessid) {
		res.json({ error: { title: 'Access Id is Required', detail: 'Mandatory values are missing. Please check.' } });	
	}

	keystone.list('User').model.findOne().where('accessKeyId', req.body.accessid).exec((err, userFound) => {
		
		if (err || !userFound) return res.json({ error: { title: 'Not able to find user' } });
		res.json({
			email: userFound.email,
			success: true,
		});
	});

}



exports.resetpassword = function (req, res) {
	const msg = {
		to: req.body.email,
		from: EMAIL_CONFIG.CONSTANTS.EMAIL_CONFIG_APPOINTMENT.FROM_EMAIL,
		subject: '',
		html: '',
	};

	if (!req.body.email || !req.body.accessid || !req.body.password) {
		res.json({ error: { title: 'Email, Password and Accessid is Reqired', detail: 'Mandatory values are missing. Please check.' } });	
	}

	keystone.list('User').model.findOne().where('accessKeyId', req.body.accessid).exec((err, userFound) => {
		if (err || !userFound) return res.json({ error: { title: 'Not able to find user' } });
		keystone.list('User').model.findOne().where('email', req.body.email).exec((err, userFound) => {
			if (err || !userFound) return res.json({ error: { title: 'Not able to reset password' } });
			userFound.password = req.body.password;
			let userPassword = userFound.password; 
			userFound.accessKeyId = '';
			userFound.save((err) => {
				if (err) return res.json({ error: { title: 'Not able to reset password' } });			;
				msg.subject = 'Your Password is Successfully Changed';
				msg.html = `
				<p>Hare Krishna,</p>
				<p>Please accept our humble obeisances.</p>
				<p>All glories to Srila Prabhupada!</p>
				<br/>
				<p>Your password is reset and the new password is - ${userPassword}</p>
				<br/>
				<p>Your servants always,</p>
				<p>Site administrators</p>
				`;
		  
			   
				sendMail(msg.from, userFound.email, msg.subject, msg.html)
				  .then((res) => {
					  console.log('email was sent', res);
				  })
				  .catch((err) => {
					  console.error(err);
				  });
				  res.json({
					success: true,
				});
			 
			});
		});
	
	});

	

}


exports.editprofile = function (req, res) {
	
	if (!req.body.firstName || !req.body.lastName || !req.body.mobileNumber) {
		res.json({ error: { title: 'Required', detail: 'Mandatory values are missing. Please check.' } });	
	}

	keystone.list('User').model.findOne().where('email', req.user.email).exec((err, userFound) => {
		if (err || !userFound) return res.json({ error: { title: 'Not able to reset password' } });
	
	userFound.name.first = req.body.firstName;
	userFound.name.last = req.body.lastName;
	userFound.mobileNumber = req.body.mobileNumber;
	 
	 userFound.save((err) => {
	  if (err) return res.json({ error: { title: 'Not able to reset password' } });			;
	  
		  res.json({
			success: true,
			loginUser: {
				id: userFound.id,
				email: userFound.email,
				firstName: userFound.name.first,
				last: userFound.name.last,
				mobileNumber: userFound.mobileNumber,
			}
		  });
	});
});


}
