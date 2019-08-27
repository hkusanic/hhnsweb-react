// const { Client } = require("pg");
// const sgMail = require("@sendgrid/mail");
// const request = require("request");
// var rp = require("request-promise");

// // sgMail.setApiKey(
// // 	"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"
// // );

// const client = new Client({
// 	connectionString:
// 		"postgres://qnsustfngvgfhw:5d0b30eea0a84bd89a2239f961ea4f516c050fa08a7880386c9ca711ae79b6a3@ec2-184-73-169-163.compute-1.amazonaws.com:5432/d9hujrgrir06ai",
// 	ssl: true
// });

// client.connect();

// const emaillist = [];
// client.query(
// 	"SELECT DISTINCT data_login_user_email, data_login_user_first_name, data_login_user_last FROM javascript.user_login WHERE data_login_user_user_id NOT IN (SELECT user_id FROM javascript.sadhana_list);",
// 	(err, res) => {
// 		if (err) throw err;
// 		console.log("res.rows>>>>>>>>>>", res.rows);
// 		for (let row of res.rows) {
// 			//const email = JSON.parse(JSON.stringify(row.user_email));
// 			//emaillist.push({ email: row.user_email, name: row.user_name });
// 			emaillist.push({
// 				email: row.data_login_user_email,
// 				name: row.data_login_user_first_name + " " + row.data_login_user_last
// 			});
// 			//const recipentName = JSON.parse(JSON.stringify(row.user_name));
// 			//console.log("email>>>>>>", email);
// 		}
// 		console.log("list>>>>>>>>>>>>>>>>>", emaillist);
// 		const url = "http://localhost:3000/audio";
// 		let personalisationAr = [];
// 		emaillist.map(obj => {
// 			let obj1 = {
// 				to: [{ email: obj.email }],
// 				dynamic_template_data: {
// 					name: obj.name,
// 					link: url
// 				},
// 				subject: "Review Audio"
// 			};
// 			personalisationAr.push(obj1);
// 		});

// 		const data = {
// 			personalizations: personalisationAr,
// 			from: {
// 				email: "anurag@cronj.com",
// 				name: "anurag"
// 			},
// 			template_id: "d-59f330b284be4970bf6d9075054f525b"
// 		};

// 		const postdata = JSON.stringify(data);

// 		console.log("postdata>>>>>>>>>>>>", postdata);

// 		var options = {
// 			method: "POST",
// 			uri: "https://api.sendgrid.com/v3/mail/send",
// 			headers: {
// 				authorization:
// 					"Bearer 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",
// 				"Content-Type": "application/json"
// 			},
// 			body: postdata
// 			//json: true // Automatically stringifies the body to JSON
// 		};

// 		rp(options)
// 			.then(function(parsedBody) {
// 				console.log("succeeded");
// 				// POST succeeded...
// 			})
// 			.catch(function(err) {
// 				console.log("err", err);
// 				// POST failed...
// 			});
// 		client.end();
// 	}
// );

// const options = {
// 	method: "POST",
// 	url: "https://api.sendgrid.com/v3/mail/send",
// 	headers: {
// 		authorization:
// 			"Bearer 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",
// 		"Content-Type": "application/json"
// 	},
// 	body: postdata
// };

// request(options, function(error, response, body) {
// 	if (error) throw new Error(error);

// 	console.log("Here>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", body);
// 	//console.log("response >>>>>>>>>>>>>>>>>>>>>>>>>>>>", response);
// });

// const msg = {
// 	to: demolist,
// 	from: "anurag@cronj.com",
// 	subject: "Hello world",
// 	template_id: "d-8c80f8592817478f9ee9959b998479e4",
// 	dynamic_template_data: {
// 		name: demolist
// 		//lastName: data.lastname,
// 		//phone: data.phone,
// 		//message: data.message
// 	}
// };

// sgMail.send(msg);

// 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
// RW1haWwgRm9yIEF1ZGlv Email For Audio

// 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 anurag
