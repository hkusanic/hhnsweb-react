const keystone = require('keystone');
const Types = keystone.Field.Types;
var EMAIL_CONFIG = require('../constants/constant');
var nodemailer = require('nodemailer');

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


let Appointment = new keystone.List('Appointment', {
	autokey: {
		path: 'slug',
		from: 'email',
		unique: true,
	},
	map: {
		name: 'email',
	},
	defaultSort: '-dateCreated',
});

Appointment.add({
	email: {
		type: String,
		initial: true,
		required: true,
		unique: true,
		index: true,
		default: '',
	},
	requestedFor: {
		type: Types.Select,
		options: ['Darshan-15', 'Darshan-30', 'Darshan-45', 'Darshan-60'],
		default: 'Darshan-15',
	},
	approvedFor: {
		type: Types.Select,
		options: ['Darshan-15', 'Darshan-30', 'Darshan-45', 'Darshan-60'],
		default: 'Darshan-15',
	},
	disciple: {
		type: String,
		default: 'no',
	},
	mobileNumber: {
		type: Types.Number,
		default: 0,
	},
	dateCreated: {
		type: Types.Date,
		default: Date.now,
	},
	approved: {
		type: Types.Boolean,
		default: false,
	},
	canceled: {
		type: Types.Boolean,
		default: false,
	},
});

Appointment.schema.pre('save', function (next) {
	next();
});

Appointment.schema.post('save', function (data, next) {

	const siteUrl = 'http://3.94.20.19:3000/booking';

	const msg = {
		to: data.email,
		from: EMAIL_CONFIG.CONSTANTS.EMAIL_CONFIG_APPOINTMENT.FROM_EMAIL,
		subject: '',
		html: '',
	};

	if (data.approved && data.canceled === false) {
		msg.subject = 'Approved - Request for darshan with H.H. Niranjana Swami';
		msg.html = `
		<p>Hare Krishna,</p>
		<p>Please accept our humble obeisances.</p>
		<p>All glories to Srila Prabhupada!</p>
		<br/>
		<p>Your request for "${data.approvedFor}" has been approved.</p>
		<p>However, you still need to select the available time-slot.</p>
		<p>To do so, please click on the following link <a href="${siteUrl}">here</a></p>
		<br/>
		<p>Your servants always,</p>
		<p>Site administrators</p>
		`;
	}
	else if (data.approved !== true && data.canceled === false) {
		msg.subject = 'Request for darshan with H.H. Niranjana Swami';
		msg.html = `
		<p>Hare Krishna,</p>
		<p>Please accept our humble obeisances.</p>
		<p>All glories to Srila Prabhupada!</p>
		<br/>
		<p>We are currently reviewing your request for darshan with H.H. Niranjana Swami.</p>
		<p>Once decision has been made you will receive an email with further instructions.</p>
		<br/>
		<p>Your servants always,</p>
		<p>Site administrators</p>
		`;
	}
	else if (data.canceled === true) {
		msg.subject = 'Declined - Request for darshan with H.H. Niranjana Swami';
		msg.html = `
		<p>Hare Krishna,</p>
		<p>Please accept our humble obeisances.</p>
		<p>All glories to Srila Prabhupada!</p>
		<br/>
		<p>We regret to inform you that currently we cannot accommodate your request for darshan with H.H. Niranjana Swami.</p>
		<br/>
		<p>Your servants always,</p>
		<p>Site administrators</p>
		`;
	}

	sendMail(msg.from, data.email, msg.subject, msg.html)
		.then((res) => {
			console.log('email was sent', res);
		})
		.catch((err) => {
			console.error(err);
		});

	next();
});

Appointment.schema.post('validate', function (err, next) {
	next();
});


Appointment.register();
