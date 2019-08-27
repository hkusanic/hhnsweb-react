const keystone = require('keystone');
const logger = require('./../../logger/logger');
const Subscription = keystone.list('Subscription');
// const async = require('async');
const http = require('https');
const request = require('request');
const User = keystone.list('User');

exports.subscribe = async ( req, res ) => {
    logger.info({
        req:req,
        
    }, 'API News letter');
    if(!req.body.email){
        logger.error(
            {
                error: 'Email required'
            },
            'API Subscribe'
        );
        return res.json({
            error:'Email required'
        });
    }

    let registered = 0;
    
    await User.model.findOne({email: req.body.email})
    .exec( (err, user) => {
        if(err){
            return res.json({
                msg:err
            })
        }
        if(user){
            registered = 1;
        
        }
        
    } )

    await Subscription.model.findOne(
        {
            email: req.body.email
        }
    )
    .exec( (err, items) => {
        if(err){
            return res.json({
                msg: err
            });
        }
        if(items)
            return res.json({
                msg: "Already subscribed"
            });
        
        try {
            //Data of the user for subscription1
            let subData = {
            
                email : req.body.email,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                registered: registered,
                lang: req.body.lang,
                
            }
            
            let subs = keystone.list('Subscription').model;
            let newSubs = new subs(subData);
            
            newSubs.save();

            subData = {

                list_ids:["890a4130a-dec7-4f10-8d61-fbcbb8ed5318"],
                contacts:[
                    {
                        email: req.body.email,
                        first_name: req.body.firstname,
                        last_name: req.body.lastname,
                        custom_fields: {
                            "e1_N":registered,
                            "e3_T":req.body.lang
                        }
                    }
                ],

            }

            //Storing contact in sendgrid list
            const options = {
                method: 'PUT',
                url: 'https://api.sendgrid.com/v3/marketing/contacts',
                headers: { authorization: 'Bearer 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' },
                body: JSON.stringify(subData)
            }
            request (options, ( err, response, body )=> {
                if(err) {
                    return res.json({
                        msg: err
                    })
                }
                console.log(body);
                
            });
            return res.json({
                msg: "You are subscribed"
            });  
           
        } catch (error) {
            console.error(error);
        }
         
    });
}

exports.listAll = function ( req, res ) {
    logger.info({
        req:req,
        
    }, 'API News letter');

    Subscription.model.find()
    .exec((err, user) => {
        let registeredUser = user.map((data)=>{
            if(data.registered){
                return data;
            }
        });
        
        let unregistered = user.map( (data) => {
            if(!data.registered)
            return data;
        } )

        return res.json({
            rU:registeredUser,
            urU: unregistered
        });
    })
}