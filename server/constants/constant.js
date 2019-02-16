exports.CONSTANTS = {
   
    EMAIL_CONFIG_APPOINTMENT: {
        API_KEY: 'key-c836106c22729cdb1f80d4ba601e864c',
        DOMAIN: 'sandbox965a1c0e2b714acab57623c5d878e8ca.mailgun.org',
        FROM_NAME: 'H.H. Niranjana Swami',
        FROM_EMAIL: 'kiran.kulkarni@cronj.com',
        SUBJECT : 'Appointment approved by H.H. Niranjana Swami',
        SENDGRID_API_KEY: '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',
        SENDGRID_HTML:'<strong>You can visit</strong>',
        NODE_MAILER : {
            mail: {
              smtpConfig: {
                host: 'smtp.gmail.com',
                port: 465,
                secure: true, // use SSL 
                auth: {
          
                  user: 'hhnsweb@gmail.com',
                  pass: 'hhns_2019'
                }
              },
              sender: '"HHNS" <hhnsweb@gmail.com>' // sender address 
            }
    }


}
}