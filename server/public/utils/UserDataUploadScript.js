var rp = require('request-promise');
var tough = require('tough-cookie');
var fs = require('fs');

var https = require('https');
var httpAgent = new https.Agent();
httpAgent.maxSockets = 20;

let cookie = new tough.Cookie({
	key: 'SSESS8c0f16dd6e4ff53e267519930069d1e3',
	value: 'BydqPSQrvpLQddIyI8HNARfAiNR4kXGMmRubkowE-U4',
	domain: 'nrs.niranjanaswami.net',
	httpOnly: false,
	maxAge: 3153600000000000,
});
var cookiejar = rp.jar();
cookiejar.setCookie(cookie.toString(), 'https://nrs.niranjanaswami.net');

var normalUserList = [];
var discipleUserList = [];
var normalUserDetailsList = [];
var discipleUserDetailsList = [];
var finalUserData = [];


function uuidv4 () {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0; var v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}


function getDiscipleUserDetails () {
	const DisPromiseArr = [];

	for (let k = 0; k < 4400; k++) {
		for (let m = 0; m < discipleUserList.length; m++) {
			if (normalUserDetailsList[k].uid !== undefined && discipleUserList[m].uid !== undefined) {
				if (normalUserDetailsList[k].uid === discipleUserList[m].uid) {
					let options = {
						method: 'GET',
						uri: 'https://nrs.niranjanaswami.net/en/rest/node/' + discipleUserList[m].nid + '.json',
						jar: cookiejar,
						json: true,
						timeout: 600000,
						pool: httpAgent,
						headers: {
							'User-Agent': 'Request-Promise',
						},
					};
					DisPromiseArr.push(rp(options));
				}
			}
		}
	}
	Promise.all(DisPromiseArr).then((data) => {
		discipleUserDetailsList = data;
		console.log('getDiscipleUserDetails() function is successfully executed', discipleUserDetailsList.length, 'details data received');
		for (let u = 0; u < normalUserDetailsList.length; u++) {
			if (normalUserDetailsList[u] && normalUserDetailsList[u].uid) {
				let data = {
					oldData: {},
				};
				data.user_id = uuidv4();
				data.userName = normalUserDetailsList[u].name;
				data.email = normalUserDetailsList[u].mail;
				data.password = 'Gauranga';
				data.timezone = normalUserDetailsList[u].timezone;
				data.language = normalUserDetailsList[u].language;
				data.created = normalUserDetailsList[u].created;
				data.access = normalUserDetailsList[u].access;
				data.login = normalUserDetailsList[u].login;
				data.signature = normalUserDetailsList[u].signature;
				data.signature_format = normalUserDetailsList[u].signature_format;
				data.canAccessKeystone = false;
				data.oldData.uid = normalUserDetailsList[u].uid;
				data.oldData.init = normalUserDetailsList[u].init;
				data.oldData.picture = normalUserDetailsList[u].picture;
				data.oldData.path = 'https://nrs.niranjanaswami.net/en/rest/user/' + normalUserDetailsList[u].uid;
				for (let v = 0; v < discipleUserDetailsList.length; v++) {
					if (discipleUserDetailsList[v] && discipleUserDetailsList[v].uid) {
						if (discipleUserDetailsList[v].uid === normalUserDetailsList[u].uid) {
							data.disciple_profile = {};
							data.name = {};
							data.disciple_profile.first_initiation_date = discipleUserDetailsList[v].field_first_initiation_date.und ? discipleUserDetailsList[v].field_first_initiation_date.und[0].value : '';
							data.disciple_profile.second_initiation_date = discipleUserDetailsList[v].field_second_initiation_date.und ? discipleUserDetailsList[v].field_second_initiation_date.und[0].value : '';
							data.disciple_profile.spiritual_name = discipleUserDetailsList[v].field_spiritual_name.und ? discipleUserDetailsList[v].field_spiritual_name.und[0].value : '';
							data.disciple_profile.temple = discipleUserDetailsList[v].field_temple.und ? discipleUserDetailsList[v].field_temple.und[0].value : '';
							data.disciple_profile.verifier = (discipleUserDetailsList[v].verifier && discipleUserDetailsList[v].verifier.und) ? discipleUserDetailsList[v].verifier.und[0].value : '';
							data.disciple_profile.marital_status = discipleUserDetailsList[v].field_marital_status.und ? discipleUserDetailsList[v].field_marital_status.und[0].value : '';
							data.disciple_profile.education = discipleUserDetailsList[v].field_education.und ? discipleUserDetailsList[v].field_education.und[0].value : '';
							data.gender = discipleUserDetailsList[v].field_gender.und ? discipleUserDetailsList[v].field_gender.und[0].value : '';
							data.mobileNumber = discipleUserDetailsList[v].field_mobile_phone.und ? discipleUserDetailsList[v].field_mobile_phone.und[0].value : '';
							data.dob = discipleUserDetailsList[v].field_birth_date.und ? discipleUserDetailsList[v].field_birth_date.und[0].value : '';
							data.name.first = discipleUserDetailsList[v].field_name.und ? discipleUserDetailsList[v].field_name.und[0].value : '';
							data.name.last = discipleUserDetailsList[v].field_surname.und ? discipleUserDetailsList[v].field_surname.und[0].value : '';
							data.oldData.vid = discipleUserDetailsList[v].vid;
							data.oldData.nid = discipleUserDetailsList[v].nid;
							data.disciple = 'Disciple';
						}
					}
				}
				data.oldData.picture = JSON.stringify(data.oldData.picture);
				finalUserData.push(data);
			}
		}

		return finalUserData;
	}).then((data) => {
		console.log('final User data is integrated  total user is :', finalUserData.length);
		var json = JSON.stringify(finalUserData, null, 2);
		fs.writeFile('UserProfileData.json', json, 'utf8', () => { console.log('success'); });
	}).catch((err) => {
		console.log('Error inside getDiscipleUserDetails() function ====>>>>', err); ;
	});

}

function getNormalUserDetails () {
	console.log('length ===>>>', normalUserList.length);
	const PromiseArr = normalUserList.map((item, i) => {
		if (i < 4400) {
			const uid = normalUserList[i].uid;
			let options = {
				method: 'GET',
				uri: 'https://nrs.niranjanaswami.net/en/rest/user/' + uid + '.json',
				jar: cookiejar,
				json: true,
				pool: httpAgent,
				timeout: 600000,
				headers: {
					'User-Agent': 'Request-Promise',
				},
			};
			return rp(options);
		}
	});


	Promise.all(PromiseArr)
		.then((data) => {
			normalUserDetailsList = data;
			getDiscipleUserDetails();
			console.log('getNormalUserDetails() function is successfully executed', normalUserDetailsList.length, 'details data received');

		})
		.catch((err) => {
			console.log('Error inside getNormalUserDetails() function ====>>>>', err); ;
		});
}

function getDiscipleUserList () {
	let options = {
		method: 'GET',
		uri: 'https://nrs.niranjanaswami.net/rest/node.json?parameters[type]=disciple_profile&pagesize=2000&page=0 ',
		jar: cookiejar,
		json: true,
		headers: {
			'User-Agent': 'Request-Promise',
		},
	};

	rp(options)
		.then(function (body) {
			discipleUserList = body;
			getNormalUserDetails();
			console.log('getDiscipleUserList() function is successfully executed', discipleUserList.length, 'data received');

		})
		.catch(function (err) {
			console.log('Error inside getDiscipleUserList() function ====>>>>', err); ;
		});
}

function getUserList () {
	let options = {
		method: 'GET',
		uri: 'https://nrs.niranjanaswami.net/rest/user.json?pagesize=5000&page=0',
		jar: cookiejar,
		json: true,
		headers: {
			'User-Agent': 'Request-Promise',
		},
	};

	rp(options)
		.then(function (body) {
			normalUserList = body;
			getDiscipleUserList();
			console.log('getUserList() function is successfully executed', normalUserList.length, 'data received');

		})
		.catch(function (err) {
			console.log('Error inside getUserList() function ====>>>>', err); ;
		});
}

getUserList();
