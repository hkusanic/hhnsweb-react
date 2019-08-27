const cron = require("node-cron");
const keystone = require('keystone');
const Subscription = keystone.list('Subscription');
const request = require('request');

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
                    name: obj.name,
                }
            };
            personalisationArEn.push(obj1);
        });
        emailListRu.map(obj => {
            let obj1 = {
                to: [{ email: obj.email }],
                dynamic_template_data: {
                    name: obj.name,
                }
            };
            personalisationArRu.push(obj1);
        });
        
        const dataEn = {
            personalizations: personalisationArEn,
            from: {
                email: "manas@cronj.com",
                name: "manas"
            },
            template_id: "d-bb83dedb9d5544918719c418d0db62a5"
        };
        const dataRu = {
            personalizations: personalisationArRu,
            from: {
                email: "manas@cronj.com",
                name: "manas"
            },
            template_id: "d-d16fe0617ab44c92b7869dd0899d4282"
        };        

         const postdataEn = JSON.stringify(dataEn);
         const postdataRu = JSON.stringify(dataRu);
         
         var options = {
            	method: "POST",
            	uri: "https://api.sendgrid.com/v3/mail/send",
            	headers: {
            		authorization:
            			"Bearer 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",
            		"Content-Type": "application/json"
            	},
            	body: postdataEn
        };
        var options2 = {
            method: "POST",
            uri: "https://api.sendgrid.com/v3/mail/send",
            headers: {
                authorization:
                    "Bearer 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",
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


