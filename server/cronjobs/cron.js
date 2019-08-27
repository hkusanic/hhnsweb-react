const cron = require("node-cron");
const keystone = require('keystone');
const Subscription = keystone.list('Subscription');
const request = require('request');
const EMAIL_CONFIG = require('../constants/constant');

const getEmails = () => {
    let emailListRu = [];
    let emailListEn = [];
    Subscription.model.find()
    .exec( (err, items) => {
        if(err){
            console.error(err);
        }
        let email = {};
        items.forEach(element => {
            if(element.lang === 'en'){
                email = { email:element.email, name:element.firstname} ;
                emailListEn = [...emailListEn,email];
            }else{
                email = { email:element.email, name:element.firstname} ;
                emailListRu = [...emailListRu,email];
            }
            
        });

        let personalisationArEn = [];
        let personalisationArRu = [];
        emailListEn.map(obj => {
            let obj1 = {
                to: [{ email: obj.email }],
                dynamic_template_data: {
                    header:'News Letter',
                    link:'New Blog'
                }
            };
            personalisationArEn.push(obj1);
        });
        emailListRu.map(obj => {
            let obj1 = {
                to: [{ email: obj.email }],
                dynamic_template_data: {
                    header:'Новостная рассылка',
                    link:'новый блог'
                }
            };
            personalisationArRu.push(obj1);
        });
        
        const dataEn = {
            personalizations: personalisationArEn,
            from: {
                email: "harekrishna@hhniranjanaswami.net",
                name: "H.H.Niranjana Swami"
            },
            template_id: "d-ad15e920ea404de5954e817c03d3cc9f"
        };
        const dataRu = {
            personalizations: personalisationArRu,
            from: {
                email: "harekrishna@hhniranjanaswami.net",
                name: "H.H.Niranjana Swami"
            },
            template_id: "d-a8bdbe7b41b84b8585501b81073c0079"
        };        

         const postdataEn = JSON.stringify(dataEn);
         const postdataRu = JSON.stringify(dataRu);
         
         var options = {
            	method: "POST",
            	uri: "https://api.sendgrid.com/v3/mail/send",
            	headers: {
            		authorization:
                        `Bearer ${ EMAIL_CONFIG.CONSTANTS.EMAIL_CONFIG_APPOINTMENT.SENDGRID_API_KEY }`,
            		"Content-Type": "application/json"
            	},
            	body: postdataEn
        };
        var options2 = {
            method: "POST",
            uri: "https://api.sendgrid.com/v3/mail/send",
            headers: {
                authorization:
                `Bearer ${ EMAIL_CONFIG.CONSTANTS.EMAIL_CONFIG_APPOINTMENT.SENDGRID_API_KEY }`,
                "Content-Type": "application/json"
            },
            body: postdataRu
    };
        request (options, ( err, response, body )=> {
            if(err) {
                console.error(err);
            }
            console.log(body);
            
        });
        request (options2, ( err, response, body )=> {
            if(err) {
                console.error(err);
            }
            console.log(body);
            
        });
        console.log(emailListEn);  
        console.log(emailListRu);
         
    })
}

// getEmails();

cron.schedule("*/1 * * * *", () => {
    console.log('hello');
    getEmails();
    
});


