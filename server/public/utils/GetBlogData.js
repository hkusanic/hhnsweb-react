var rp = require('request-promise');
var tough = require('tough-cookie');
var fs = require('fs');
var https = require('https');
var httpAgent = new https.Agent();
httpAgent.maxSockets = 30;
const readline = require('readline');
var fs = require("fs");
const axios = require('axios');
const AWS = require('aws-sdk');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
let apiURL = 'http://localhost:3000';
rl.question('Please provide the api url\n', (answer) => {
	apiURL = answer ? answer : 'http://localhost:3000';
	console.log(`API url: ${apiURL}`);
	rl.question('What do you like to do? \n1.Populate Blog Data\n2.Populate Lecture Data\n3.Insert Transcription Data into Lectures\n4.Insert Summary Data into Lectures\n', (answer) => {
		switch (answer) {
			case '1':
				console.log('Populating Blog Data');
				getEnglishNodeList();
				break;
			case '2':
				console.log('Populating Lecture Data');
				getEnglishLectureNodeList();
				break;
			case '3':
				console.log('Populating Transcription Data');
				getEnglishTranscriptionNodeList();
				break;
			case '4':
				console.log('Populating Summary Data');
				getRuSummaryNodeList();
				break;

		}

		rl.close();
	});
});

function timeConverter(timestamp) {
	let date = new Date(timestamp * 1000);
	return date;
}
const cookie = new tough.Cookie({
	key: 'SSESS8c0f16dd6e4ff53e267519930069d1e3',
	value: 'YCdek1Z7ROdGXdN70R3IfUMODs61efzefGDT05wH0KA',
	domain: 'nrs.niranjanaswami.net',
	httpOnly: false,
	maxAge: 3153600000000,
});
var cookiejar = rp.jar();
cookiejar._jar.rejectPublicSuffixes = false;
cookiejar.setCookie(cookie.toString(), 'https://nrs.niranjanaswami.net');

function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = (Math.random() * 16) | 0;
		var v = c == 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}
/* #region Blog*/
var englishDataList = [];
var raussainDataList = [];
var raussainfinalData = [];

function getEnglishNodeList() {
	const options = {
		method: 'GET',
		uri: 'https://nrs.niranjanaswami.net/en/rest/node.json?parameters%5Btype%5D=blog&pagesize=600&&page=0',
		jar: cookiejar,
		json: true,
		headers: {
			'User-Agent': 'Request-Promise',
		},
	};

	rp(options)
		.then(function (body) {
			englishDataList = body;
			console.log(
				'getEnglishList() function is successfully executed',
				englishDataList.length,
				'data received'
			);
			getEnglishDatainBatches();
		})
		.catch(function (err) {
			console.log('Error inside getUserList() function ====>>>>', err);
		});
}

function getEnglishDatainBatches() {
	if (englishDataList.length > 0) {
		let ar = englishDataList.splice(0, 10);
		getEnglishData(ar, () => {
			setTimeout(() => {
				getEnglishDatainBatches();
			}, 2000);
		});
	} else {
		getRuNodeList();
	}
}

function getEnglishData(ar, callback) {
	const Englishpromise = [];
	ar.map((item, i) => {
		const options = {
			method: 'GET',
			uri: `https://nrs.niranjanaswami.net/rest/object/${item.nid}.json`,
			json: true,
			jar: cookiejar,
			timeout: 6000000,
			headers: {
				'User-Agent': 'Request-Promise',
			},
		};
		Englishpromise.push(rp(options));
	});
	Promise.all(Englishpromise).then(data => {
			const insertDataPromise = data.map((item, i) => {
				const body = {
					uuid: uuidv4(),
					author: item.name,
					audio_files: [],
					tnid: item.tnid,
					languages: item.tnid != 0 ? '' : 'en',
					en: {
						nid: item.nid,
						created: timeConverter(item.created),
						changed: timeConverter(item.changed),
						title: item.title,
						body: item.body.und[0].value,
						url: item.url,
					},
				};
				const options = {
					method: 'POST',
					uri: `${apiURL}/api/blog/create/`,
					body: body,
					json: true,
					pool: httpAgent,
					timeout: 6000000,
					headers: {
						'User-Agent': 'Request-Promise',
					},
				};
				return rp(options);

			});
			return Promise.all(insertDataPromise);
		})
		.then(data => {
			console.log('data inserted =====>>>>', data.length);
			callback();
		})
		.catch(err => {
			console.log('error inside the profile api ===>>>', err, 'data: ', data);
		});

}

function getRuNodeList() {
	const options = {
		method: 'GET',
		uri: 'https://nrs.niranjanaswami.net/ru/rest/node.json?parameters%5Btype%5D=blog&pagesize=6000&&page=0',
		jar: cookiejar,
		json: true,
		headers: {
			'User-Agent': 'Request-Promise',
		},
	};

	rp(options)
		.then(function (body) {
			raussainDataList = body;
			console.log(
				'getRuNodeList() function is successfully executed',
				raussainDataList.length,
				'data received'
			);
			getRaussainDatainBatches();
		})
		.catch(function (err) {
			console.log('Error inside getRuNodeList() function ====>>>>', err);
		});
}

function getRaussainDatainBatches() {
	if (raussainDataList.length > 0) {
		let ar = raussainDataList.splice(0, 10);
		getRaussainData(ar, () => {
			setTimeout(() => {
				getRaussainDatainBatches();
			}, 2000);
		});
	} else {
		updateDatabase();
	}
}
function getRaussainData(ar, callback) {
	const Raussainpromise = [];
	ar.map((item, i) => {
		const options = {
			method: 'GET',
			uri: `https://nrs.niranjanaswami.net/rest/object/${item.nid}.json`,
			json: true,
			jar: cookiejar,
			timeout: 6000000,
			headers: {
				'User-Agent': 'Request-Promise',
			},
		};
		Raussainpromise.push(rp(options));
	});
	Promise.all(Raussainpromise).then(data => {
			console.log('data Raussainpromise inserted =====>>>>', data.length);
			for (let i = 0; i < data.length; i++) {
				if (data[i].tnid != 0) {
					const temp = {
						tnid: data[i].tnid,
						languages: 'both',
						ru: {
							nid: data[i].nid,
							created: timeConverter(data[i].created),
							changed: timeConverter(data[i].changed),
							title: data[i].title,
							body: data[i].body.und[0].value,
							url: data[i].url,
						},
					};
					raussainfinalData.push(temp);
				} else {
					const body = {
						uuid: uuidv4(),
						author: data[i].name,
						audio_files: [],
						tnid: data[i].tnid,
						languages: 'ru',
						ru: {
							nid: data[i].nid,
							created: timeConverter(data[i].created),
							changed: timeConverter(data[i].changed),
							title: data[i].title,
							body: data[i].body.und[0].value,
							url: data[i].url,
						},
					};
					createSingleRUBlogItem(body);
				}

			}
			callback();
		})
		.catch(err => {
			console.log('error inside the getRaussainData() ===>>>', err);
		});

}

function updateDatabase() {
	let options = {
		method: 'POST',
		uri: `${apiURL}/api/blog/updateBulkNew/`,
		body: raussainfinalData,
		json: true,
		pool: httpAgent,
		timeout: 600000,
		headers: {
			'User-Agent': 'Request-Promise',
		},
	};
	rp(options).then(data => {
		console.log('success');
	}).catch(err => {
		console.log('errr');
	});
}

function createSingleRUBlogItem(body) {
	const options = {
		method: 'POST',
		uri: `${apiURL}/api/blog/create/`,
		body: body,
		json: true,
		pool: httpAgent,
		timeout: 6000000,
		headers: {
			'User-Agent': 'Request-Promise',
		},
	};
	rp(options).then(data => {
		console.log('Single RU Blog inserted');
	}).catch(err => {
		console.log(err);
	});
}

/* #endregion*/

/*#region Lectures*/

var englishLectureDataList = [];
var russianLectureDataList = [];
var russianLectureFinalData = [];


function getEnglishLectureNodeList() {
	const options = {
		method: 'GET',
		uri: 'https://nrs.niranjanaswami.net/en/rest/node.json?parameters%5Btype%5D=lecture&pagesize=10000&&page=0',
		jar: cookiejar,
		json: true,
		headers: {
			'User-Agent': 'Request-Promise',
		},
	};

	rp(options)
		.then(function (body) {
			englishLectureDataList = body;
			console.log(
				'getEnglishLectureNodeList() function is successfully executed',
				englishLectureDataList.length,
				'data received'
			);
			getEnglishLectureDatainBatches();
		})
		.catch(function (err) {
			console.log('Error inside getEnglishLectureNodeList() function ====>>>>', err);
		});
}

function getEnglishLectureDatainBatches() {
	if (englishLectureDataList.length > 0) {
		let ar = englishLectureDataList.splice(0, 10);
		getEnglishLectureData(ar, () => {
			setTimeout(() => {
				getEnglishLectureDatainBatches();
			}, 2000);
		});
	} else {
		getRuLectureNodeList();
	}
}

function getEnglishLectureData(ar, callback) {
	const Englishpromise = [];
	ar.map((item, i) => {
		const options = {
			method: 'GET',
			uri: `https://nrs.niranjanaswami.net/rest/object/${item.nid}.json`,
			json: true,
			jar: cookiejar,
			timeout: 6000000,
			headers: {
				'User-Agent': 'Request-Promise',
			},
		};
		Englishpromise.push(rp(options));
	});
	Promise.all(Englishpromise).then(data => {
			const insertDataPromise = data.map((item, i) => {
				const body = {
					uuid: uuidv4(),
					tnid: ar[i].tnid,
					languages: item.tnid != 0 ? '' : 'en',
					author: item.author,
					soundcloud_link: item.soundcloud,
					lecture_date: item.date,
					published_date: timeConverter(ar[i].created),
					created_date_time: timeConverter(ar[i].created),
					duration: item.duration,
					part: item.part,
					chapter: item.chapter,
					verse: item.verse,
					audio_link: item.file,
					en: {
						nid: ar[i].nid,
						title: item.title,
						event: item.event,
						topic: item.topic,
						location: item.location,
						translation: item.translation,
					},
					counters: {
						downloads: item.downloads,
					},
				};
				const options = {
					method: 'POST',
					uri: `${apiURL}/api/lecture/create/`,
					body: body,
					json: true,
					pool: httpAgent,
					timeout: 6000000,
					headers: {
						'User-Agent': 'Request-Promise',
					},
				};
				return rp(options);

			});
			return Promise.all(insertDataPromise);
		})
		.then(data => {
			console.log('data inserted =====>>>>', data.length);
			callback();
		})
		.catch(err => {
			console.log('error inside the profile api ===>>>', err);
		});

}

function getRuLectureNodeList() {
	const options = {
		method: 'GET',
		uri: 'https://nrs.niranjanaswami.net/ru/rest/node.json?parameters%5Btype%5D=lecture&pagesize=6000&&page=0',
		jar: cookiejar,
		json: true,
		headers: {
			'User-Agent': 'Request-Promise',
		},
	};

	rp(options)
		.then(function (body) {
			russianLectureDataList = body;
			console.log(
				'getRuLectureNodeList() function is successfully executed',
				russianLectureDataList.length,
				'data received'
			);
			getRussianLectureDatainBatches();
		})
		.catch(function (err) {
			console.log('Error inside getRuLectureNodeList() function ====>>>>', err);
		});
}

function getRussianLectureDatainBatches() {
	if (russianLectureDataList.length > 0) {
		let ar = russianLectureDataList.splice(0, 10);
		getRussianLectureData(ar, () => {
			setTimeout(() => {
				getRussianLectureDatainBatches();
			}, 2000);
		});
	} else {
		updateDatabaseLectures();
	}
}

function getRussianLectureData(ar, callback) {
	const Raussainpromise = [];
	ar.map((item, i) => {
		const options = {
			method: 'GET',
			uri: `https://nrs.niranjanaswami.net/rest/object/${item.nid}.json`,
			json: true,
			jar: cookiejar,
			timeout: 6000000,
			headers: {
				'User-Agent': 'Request-Promise',
			},
		};
		Raussainpromise.push(rp(options));
	});
	Promise.all(Raussainpromise).then(data => {
			console.log('data Raussainpromise inserted =====>>>>', data.length);
			for (let i = 0; i < data.length; i++) {
				if (ar[i].tnid !== 0) {
					const temp = {
						tnid: ar[i].tnid,
						languages: 'both',
						ru: {
							nid: ar[i].nid,
							title: data[i].title,
							event: data[i].event,
							topic: data[i].topic,
							location: data[i].location,
							translation: data[i].translation,
						},
					};
					russianLectureFinalData.push(temp);
				} else {
					const body = {
						uuid: uuidv4(),
						tnid: ar[i].tnid,
						languages: 'ru',
						author: data[i].author,
						soundcloud_link: data[i].soundcloud,
						lecture_date: data[i].date,
						published_date: timeConverter(ar[i].created),
						duration: data[i].duration,
						part: data[i].part,
						chapter: data[i].chapter,
						verse: data[i].verse,
						audio_link: data[i].file,
						created_date_time: timeConverter(ar[i].created),
						ru: {
							nid: ar[i].nid,
							title: data[i].title,
							event: data[i].event,
							topic: data[i].topic,
							location: data[i].location,
							translation: data[i].translation,
						},
					};
					createSingleRULectureItem(body);
				}

			}
			callback();
		})
		.catch(err => {
			console.log('error inside the getRussianLectureData() ===>>>', err);
		});

}

function updateDatabaseLectures() {
	let options = {
		method: 'POST',
		uri: `${apiURL}/api/lecture/updateBulkNew/`,
		body: russianLectureFinalData,
		json: true,
		pool: httpAgent,
		timeout: 600000,
		headers: {
			'User-Agent': 'Request-Promise',
		},
	};
	rp(options).then(data => {
		console.log('success');
	}).catch(err => {
		console.log('errr');
	});
}

function createSingleRULectureItem(body) {
	const options = {
		method: 'POST',
		uri: `${apiURL}/api/lecture/create/`,
		body: body,
		json: true,
		pool: httpAgent,
		timeout: 6000000,
		headers: {
			'User-Agent': 'Request-Promise',
		},
	};
	rp(options).then(data => {
		console.log('Single RU Lecture inserted');
	}).catch(err => {
		console.log(err);
	});
}


/*#endregion*/


/*#region Transcription*/

var englishTranscriptionDataList = [];
var russianTranscriptionDataList = [];
var transcriptionFinalData = [];
let errorList = [];
let urlDataList = [];

function getEnglishTranscriptionNodeList() {
	const options = {
		method: 'GET',
		uri: 'https://nrs.niranjanaswami.net/en/rest/node.json?parameters%5Btype%5D=transcription&pagesize=10000&&page=0',
		jar: cookiejar,
		json: true,
		headers: {
			'User-Agent': 'Request-Promise',
		},
	};
	rp(options)
		.then(function (body) {
			englishTranscriptionDataList = body;
			console.log(
				'getEnglishTranscriptionNodeList() function is successfully executed',
				englishTranscriptionDataList.length,
				'data received'
			);
			getEnglishTranscriptionDatainBatches();
		})
		.catch(function (err) {
			console.log('Error inside getEnglishTranscriptionNodeList() function ====>>>>', err);
		});
}

function getEnglishTranscriptionDatainBatches() {
	if (englishTranscriptionDataList.length > 0) {
		let ar = englishTranscriptionDataList.splice(0, 10);
		getEnglishTranscriptionData(ar, () => {
			setTimeout(() => {
				getEnglishTranscriptionDatainBatches();
			}, 2000);
		});
	} else {
		getRuTranscriptionNodeList();
		//updateDatabaseTranscriptions();
	}
}

function getEnglishTranscriptionData(ar, callback) {
	const Englishpromise = [];
	ar.map((item, i) => {
		const options = {
			method: 'GET',
			uri: `https://nrs.niranjanaswami.net/rest/object/${item.nid}.json`,
			json: true,
			jar: cookiejar,
			timeout: 6000000,
			headers: {
				'User-Agent': 'Request-Promise',
			},
		};
		Englishpromise.push(rp(options));
	});
	Promise.all(Englishpromise).then((data) => {
			console.log('data EnglishPromise inserted =====>>>>', data.length);
			for (let i = 0; i < data.length; i++) {
				if (data[i].audio.nid) {
					let filePath = './uploads/transcription/' + Date.now() + '.pdf';
					axios({
						url: data[i].file,
						responseType: 'stream'
					})
						.then(response => {
							response.data.pipe(fs.createWriteStream(filePath));
							console.log('File downloaded sucessfully');
							const temp = {
								tnid: data[i].audio.nid,
								en: {
									transcription: {
										nid: ar[i].nid,
										title: data[i].title,
										text: data[i].body,
										attachment_name: data[i].file,
										attachment_link: filePath,
									},
								},
							};
							transcriptionFinalData.push(temp);
						})
						.catch(error => {
							console.log('Error while downloading file ==>> ', error)
						});
					
				} else {
					console.log(`Invalid or Missing Reference in data with nid ${ar[i].nid}`);
					let str = `En ${ar[i].nid}`;
					errorList.push(str);
				}
			}
			callback();
		})
		.catch(err => {
			console.log('error inside the getEnglishTranscriptionData() ===>>>', err);
		});

}

function getRuTranscriptionNodeList() {
	const options = {
		method: 'GET',
		uri: 'https://nrs.niranjanaswami.net/ru/rest/node.json?parameters%5Btype%5D=transcription&pagesize=6000&&page=0',
		jar: cookiejar,
		json: true,
		headers: {
			'User-Agent': 'Request-Promise',
		},
	};

	rp(options)
		.then(function (body) {
			russianTranscriptionDataList = body;
			console.log(
				'getRuTranscriptionNodeList() function is successfully executed',
				russianTranscriptionDataList.length,
				'data received'
			);
			getRussianTranscriptionDatainBatches();
		})
		.catch(function (err) {
			console.log('Error inside getRuTranscriptionNodeList() function ====>>>>', err);
		});
}

function getRussianTranscriptionDatainBatches() {
	if (russianTranscriptionDataList.length > 0) {
		let ar = russianTranscriptionDataList.splice(0, 10);
		getRussianTranscriptionData(ar, () => {
			setTimeout(() => {
				getRussianTranscriptionDatainBatches();
			}, 2000);
		});
	} else {
		updateDatabaseTranscriptions();
	}
}

function getRussianTranscriptionData(ar, callback) {
	const Raussainpromise = [];
	ar.map((item, i) => {
		const options = {
			method: 'GET',
			uri: `https://nrs.niranjanaswami.net/rest/object/${item.nid}.json`,
			json: true,
			jar: cookiejar,
			timeout: 6000000,
			headers: {
				'User-Agent': 'Request-Promise',
			},
		};
		Raussainpromise.push(rp(options));
	});
	Promise.all(Raussainpromise).then(data => {
			console.log('data Raussainpromise inserted =====>>>>', data.length);
			for (let i = 0; i < data.length; i++) {
				if (data[i].audio.nid) {
					let filePath = './uploads/transcription/' + Date.now() + '.pdf';
					axios({
						url: data[i].file,
						responseType: 'stream'
					})
						.then(response => {
							response.data.pipe(fs.createWriteStream(filePath));
							console.log('File downloaded sucessfully');
							const temp = {
								tnid: data[i].audio.nid,
								ru: {
									transcription: {
										nid: ar[i].nid,
										title: data[i].title,
										text: data[i].body,
										attachment_name: data[i].file,
										attachment_link: filePath,
									},
								},
							};
							transcriptionFinalData.push(temp);
						})
						.catch(error => {
							console.log('Error while downloading file ==>> ', error)
						});
				} else {
					console.log(`Invalid or Missing Reference in data with nid ${ar[i].nid}`);
					let str = `Ru ${ar[i].nid}`;
					errorList.push(str);
				}
			}
			callback();
		})
		.catch(err => {
			console.log('error inside the getRussianTranscriptionData() ===>>>', err);
		});

}

/**
 * To generate s3 object using configuration object
 * @param {object} awsConfig
 * @param {string} awsConfig.accessKeyId Access Key of AWS configuration
 * @param {string} awsConfig.secretAccessKey Access Secret Key(Token) of AWS configuration
 */


async function generateS3Object(awsConfig) {
	const awsConfigObj = {
		accessKeyId: 'AKIAJJPND6YRD2UHG2YQ',
		secretAccessKey: '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',
		s3BucketEndpoint: false,
		endpoint: 'https://s3.amazonaws.com'
	};
	AWS.config.update(awsConfigObj);
	return new AWS.S3();
}



async function updateDatabaseTranscriptions() {
	let counter0 = 0;
	let counter1 = 0;
	for(let i = 0; i< transcriptionFinalData.length; i++){
		let filePathEN = transcriptionFinalData[i].en && transcriptionFinalData[i].en.transcription.attachment_link? transcriptionFinalData[i].en.transcription.attachment_link : null;
		let filePathRU = transcriptionFinalData[i].ru && transcriptionFinalData[i].ru.transcription.attachment_link? transcriptionFinalData[i].ru.transcription.attachment_link : null;
		if(filePathEN){
			counter0++;
			let content = await fs.readFileSync(filePathEN);
			let base64data = new Buffer(content, 'binary');
			let myKey = `uploads/transcription/${Date.now()}.pdf`;
			let params = {
				Bucket: 'nrsblog',
				Key: myKey,
				Body: base64data,
				ACL: 'public-read'
			};
			const s3 = await generateS3Object();
			let url;
			s3.upload((params), (err, data) => {
				if (err) console.error(`Upload Error ${err}`);
				else {
					url = data.Location;
					console.log('Upload Completed, url ==>> ', url);
					transcriptionFinalData[i].en.transcription.attachment_link = url;
					counter1++;
				}
				}
			);
			
		}
		if(filePathRU){
			counter0++;
			let content = await fs.readFileSync(filePathRU);
			let base64data = new Buffer(content, 'binary');
			let myKey = `uploads/transcription/${Date.now()}.pdf`;
			let params = {
				Bucket: 'nrsblog',
				Key: myKey,
				Body: base64data,
				ACL: 'public-read'
			};
			const s3 = await generateS3Object();
			let url;
			s3.upload((params), (err, data) => {
				if (err) console.error(`Upload Error ${err}`);
				else {
					url = data.Location;
					console.log('Upload Completed, url ==>> ', url);
					transcriptionFinalData[i].ru.transcription.attachment_link = url;
					counter1++;
				}
				}
			);
			
		}
	}
	let timer = setInterval(() => {
		if(counter1 === counter0){
			let options = {
				method: 'POST',
				uri: `${apiURL}/api/lecture/updateBulkNew/`,
				body: transcriptionFinalData,
				json: true,
				pool: httpAgent,
				timeout: 600000,
				headers: {
					'User-Agent': 'Request-Promise',
				},
			};
			rp(options).then(data => {
				console.log('success');
				writeErrors();
			}).catch(err => {
				console.log(err);
				writeErrors();
			});
			clearInterval(timer);
		}
		else{
			console.log('Waiting for upload to complete');
		}
	}, 2000)
	
}

function writeErrors() {
	fs.writeFile("transcript_errors.txt", errorList, (err) => {
		if (err) console.log(err);
		console.log("Successfully Written to File.");
	});
}

/*#endregion*/

/*#region Summary */
var russianSummaryDataList = [];
var summaryFinalData = [];

function getRuSummaryNodeList() {
	const options = {
		method: 'GET',
		uri: 'https://nrs.niranjanaswami.net/rest/node.json?parameters%5Btype%5D=summary&pagesize=6000&&page=0',
		jar: cookiejar,
		json: true,
		headers: {
			'User-Agent': 'Request-Promise',
		},
	};

	rp(options)
		.then(function (body) {
			russianSummaryDataList = body;
			console.log(
				'getRuSummaryNodeList() function is successfully executed',
				russianSummaryDataList.length,
				'data received'
			);
			getRussianSummaryDatainBatches();
		})
		.catch(function (err) {
			console.log('Error inside getRuTranscriptionNodeList() function ====>>>>', err);
		});
}

function getRussianSummaryDatainBatches() {
	if (russianSummaryDataList.length > 0) {
		let ar = russianSummaryDataList.splice(0, 10);
		getRussianSummaryData(ar, () => {
			setTimeout(() => {
				getRussianSummaryDatainBatches();
			}, 2000);
		});
	} else {
		updateDatabaseSummary();
	}


}

function getRussianSummaryData(ar, callback) {
	const Raussainpromise = [];
	ar.map((item, i) => {
		const options = {
			method: 'GET',
			uri: `https://nrs.niranjanaswami.net/rest/object/${item.nid}.json`,
			json: true,
			jar: cookiejar,
			timeout: 6000000,
			headers: {
				'User-Agent': 'Request-Promise',
			},
		};
		Raussainpromise.push(rp(options));
	});
	Promise.all(Raussainpromise).then(data => {
			console.log('data Raussainpromise inserted =====>>>>', data.length);
			for (let i = 0; i < data.length; i++) {
				if (data[i].audio.nid && data[i].audio.nid != 0) {
					let tnid;
					getTNIDfromLecture(data[i].audio.nid).then((val) => {
						tnid = val;
						if (tnid != 0) {
							let filePath = './uploads/summaries/' + Date.now() + '.mp3';
							axios({
								url: data[i].audio.file,
								responseType: 'stream'
							})
								.then(response => {
									response.data.pipe(fs.createWriteStream(filePath));
									console.log('File downloaded sucessfully');
									const temp = {
										tnid: tnid,
										ru: {
											summary: {
												nid: ar[i].nid,
												text: data[i].body,
												attachment_name: data[i].audio.title,
												attachment_link: filePath,
											},
										},
									};
									summaryFinalData.push(temp);
								}).catch(error => {
									console.log('Error while downloading file ==>> ', error)
								});
						}
					});
				} else {
					console.log(`Invalid or Missing Reference in data with nid ${data[i].audio.nid}`);

				}
			}
			callback();
		})
		.catch(err => {
			console.log('error inside the getRussianSummaryData() ===>>>', err);
		});

}

function getTNIDfromLecture(nid) {
	const options = {
		method: 'GET',
		uri: `https://nrs.niranjanaswami.net/ru/rest/node/${nid}.json`,
		json: true,
		jar: cookiejar,
		timeout: 6000000,
		headers: {
			'User-Agent': 'Request-Promise',
		},
	};
	return rp(options).then(data => {
		return data.tnid;
	}).catch(err => {
		console.log(err);
	});

}

async function updateDatabaseSummary() {
	
	console.log('updateDatabaseSummary()', summaryFinalData.length);
	let counter0 = 0;
	let counter1 = 0;
	for(let i = 0; i< summaryFinalData.length; i++){
		let filePathRU = summaryFinalData[i].ru && summaryFinalData[i].ru.summary.attachment_link? summaryFinalData[i].ru.summary.attachment_link : null;
		if(filePathRU){
			counter0++;
			let content = await fs.readFileSync(filePathRU);
			let base64data = new Buffer(content, 'binary');
			let myKey = `uploads/summaries/${Date.now()}.mp3`;
			let params = {
				Bucket: 'nrsblog',
				Key: myKey,
				Body: base64data,
				ACL: 'public-read'
			};
			const s3 = await generateS3Object();
			let url;
			s3.upload((params), (err, data) => {
				if (err) console.error(`Upload Error ${err}`);
				else {
					url = data.Location;
					console.log('Upload Completed, url ==>> ', url);
					summaryFinalData[i].ru.summary.attachment_link = url;
					counter1++;
				}
				}
			);
			
		}
	}
	let timer = setInterval(() => {
		if(counter1 === counter0){
			function postSummaryData(){
				if(summaryFinalData.length>0){
					let ar = summaryFinalData.splice(0,10);
					let options = {
						method: 'POST',
						uri: `${apiURL}/api/lecture/updateBulkNew/`,
						body: summaryFinalData,
						json: true,
						pool: httpAgent,
						timeout: 60000,
						headers: {
							'User-Agent': 'Request-Promise',
						},
					};
					rp(options).then(data => {
						console.log('success');
						postSummaryData();
					}).catch(err => {
						console.log('Error in updateDatabaseSummary()', err);
					});
				}
			}
			postSummaryData();
			clearInterval(timer);
		}
		else{
			console.log('Waiting for upload to complete');
		}
	}, 2000)
}



/*#endregion */