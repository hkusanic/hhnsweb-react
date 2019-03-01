exports.CONSTANTS = {
   
    EMAIL_CONFIG_APPOINTMENT: {
        API_KEY: process.env.MAILGUN_API_KEY,
        DOMAIN: process.env.MAIL_GUN_DOMAIN,
        FROM_NAME: process.env.EMAIL_FROM_NAME,
        FROM_EMAIL: process.env.EMAIL_FROM_EMAIL,
        SUBJECT : process.env.EMAIL_SUBJECT,
        SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
        SENDGRID_HTML: process.env.SENDGRID_HTML,
        NODE_MAILER : {
            mail: {
              smtpConfig: {
                host: process.env.NODE_MAIL_SMTP,
                port: process.env.NODE_MAIL_PORT,
                secure: process.env.NODE_MAIL_SECURE, // use SSL 
                auth: {
          
                  user: process.env.NODE_MAIL_USER,
                  pass: process.env.NODE_MAIL_PASSWORD,
                }
              },
              sender: process.env.NODE_MAIL_SENDER, // sender address 
            }
    }


},
      SITE_URL : process.env.SITE_URL
}