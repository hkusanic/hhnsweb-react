require("dotenv").config({ path: "/home/system5/Desktop/hhnsweb-react/.env" });
exports.CONSTANTS = {
	EMAIL_CONFIG_APPOINTMENT: {
		API_KEY: process.env.MAILGUN_API_KEY,
		DOMAIN: process.env.MAIL_GUN_DOMAIN,
		FROM_NAME: process.env.EMAIL_FROM_NAME,
		FROM_EMAIL: process.env.EMAIL_FROM_EMAIL,
		SUBJECT: process.env.EMAIL_SUBJECT,
		SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
		SENDGRID_HTML: process.env.SENDGRID_HTML,
		NODE_MAILER: {
			mail: {
				smtpConfig: {
					host: process.env.NODE_MAIL_SMTP,
					port: process.env.NODE_MAIL_PORT,
					secure: process.env.NODE_MAIL_SECURE, // use SSL
					auth: {
						user: process.env.NODE_MAIL_USER,
						pass: process.env.NODE_MAIL_PASSWORD
					}
				},
				sender: process.env.NODE_MAIL_SENDER // sender address
			}
		}
	},
	SITE_URL: process.env.SITE_URL,
	FETCH_URL: process.env.FETCH_URL,
	SAVE_URL: process.env.SAVE_URL,
	AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
	AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
	APPROVAL_EMAILS: process.env.APPROVAL_EMAILS
		? process.env.APPROVAL_EMAILS.split(",")
		: "",
	GALLERY: [
		"2019",
		"2018",
		"2017",
		"2016",
		"2015",
		"2014",
		"2013",
		"2012",
		"2011",
		"Taiwan Photos",
		"Toronto Rathayatra",
		"2010",
		"2009",
		"Taiwan 2009",
		"2008",
		"Pre-2008",
		"Autumn Counselor Retreat 2009",
		"Boston",
		"California",
		"Evpatoriya Festival 2009",
		"Kiev1",
		"Kiev2",
		"Vyasa Puja",
		"New Vraja Dhama"
	]
};
