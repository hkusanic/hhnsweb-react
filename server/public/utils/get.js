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

const readFilePromise = require('fs-readfile-promise');
var englishTranscriptionDataList = [];
let errorList = [];
const cookie = new tough.Cookie({
	key: 'SSESS8c0f16dd6e4ff53e267519930069d1e3',
	value: 'c0SPzkeq2rcbK8bKiVlUdHiTegRIGsYtUVJwexuWZxA',
	domain: 'nrs.niranjanaswami.net',
	httpOnly: false,
	maxAge: 3153600000000,
});
var cookiejar = rp.jar();
cookiejar._jar.rejectPublicSuffixes = false;
cookiejar.setCookie(cookie.toString(), 'https://nrs.niranjanaswami.net');

// function getEnglishTranscriptionNodeList() {
// 	const options = {
// 		method: 'GET',
// 		uri: 'https://nrs.niranjanaswami.net/en/rest/node.json?parameters%5Btype%5D=transcription&pagesize=10000&&page=0',
// 		jar: cookiejar,
// 		json: true,
// 		headers: {
// 			'User-Agent': 'Request-Promise',
// 		},
// 	};
// 	rp(options)
// 		.then(function (body) {
// 			englishTranscriptionDataList = body;
// 			console.log(
// 				'getEnglishTranscriptionNodeList() function is successfully executed',
// 				englishTranscriptionDataList.length,
// 				'data received'
// 			);
// 			getEnglishTranscriptionDatainBatches();
// 		})
// 		.catch(function (err) {
// 			console.log('Error inside getEnglishTranscriptionNodeList() function ====>>>>', err);
// 		});
// }

// function getEnglishTranscriptionDatainBatches() {
// 	if (englishTranscriptionDataList.length > 0) {
// 		let ar = englishTranscriptionDataList.splice(0, 1);
// 		getEnglishTranscriptionData(ar, () => {
// 			setTimeout(() => {
// 				getEnglishTranscriptionDatainBatches();
// 			}, 2000);
// 		});
// 	} 
// }

// function getEnglishTranscriptionData(ar, callback) {
// 	const Englishpromise = [];
// 	ar.map((item, i) => {
// 		const options = {
// 			method: 'GET',
// 			uri: `https://nrs.niranjanaswami.net/rest/object/${item.nid}.json`,
// 			json: true,
// 			jar: cookiejar,
// 			timeout: 6000000,
// 			headers: {
// 				'User-Agent': 'Request-Promise',
// 			},
// 		};
// 		Englishpromise.push(rp(options));
// 	});
// 	Promise.all(Englishpromise).then(data => {
// 			console.log('data EnglishPromise inserted =====>>>>', data.length);
// 			for (let i = 0; i < data.length; i++) {
				
// 					let obj = {
// 						url: data[i].file
//                     }
//                     console.log('Download and Upload Process begins')
//                     uploadPDFtoS3(obj);					//transcriptionFinalData.push(temp);
				
// 			}
// 			callback();
// 		})
// 		.catch(err => {
// 			console.log('error inside the getEnglishTranscriptionData() ===>>>', err);
// 		});

// }
async function uploadPDFtoS3() {
    let item = {
        url: 'https://nrs.niranjanaswami.net/sites/default/files/attachments/balarama_purnima_august_26_2018_in_almaty_kazakhstan.pdf'
    }
    let uploadPdfPromise =  new Promise((resolve, reject) => {
        resolve(uploadPDF(item));
    })
    let str = await uploadPdfPromise;
    console.log(str);
}

/**
 * To generate s3 object using configuration object
 * @param {object} awsConfig
 * @param {string} awsConfig.accessKeyId Access Key of AWS configuration
 * @param {string} awsConfig.secretAccessKey Access Secret Key(Token) of AWS configuration
 */

function generateS3Object(awsConfig) {
	const awsConfigObj = {
		accessKeyId: 'AKIAJJPND6YRD2UHG2YQ',
		secretAccessKey: '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',
		s3BucketEndpoint: false,
		endpoint: 'https://s3.amazonaws.com'
    };
    AWS.config.update(awsConfigObj);
	return new AWS.S3();
}

 function uploadpdfToAWS(filePath) {
	let content = fs.readFileSync(filePath);
    let base64data = new Buffer(content, 'binary');
	let myKey = `uploads/transcription/${Date.now()}.pdf`;
	let params = {
		Bucket: 'nrsblog',
		Key: myKey,
		Body: base64data,
		ACL: 'public-read'
    };
    const s3 = generateS3Object();
	s3.upload(params, (err, data) => {
		if (err) console.error(`Upload Error ${err}`);
		else{console.log('Upload Completed');
		return data.Location;
    }
	});
}

uploadPDF = async (item) => {
    
	var delayInMilliseconds = 1000;
			let filePath = './uploads/transcription/' + Date.now() + '.pdf';
            let url = item.url;
            let uploadPDFPromise =  new Promise((resolve, reject) => {
                resolve(download_pdf(url, filePath));
            })
            let url1 = await uploadPDFPromise;
            return url1;
};

const download_pdf = async (url, pdf_path) =>
{
    axios({
		url: url,
		responseType: 'stream'
	}).then(async (response) => {
            response.data.pipe(fs.createWriteStream(pdf_path));
            let download_pdfPromise =  new Promise((resolve, reject) => {
                resolve(uploadpdfToAWS(pdf_path));
            })
                let url = await download_pdfPromise;
                return url;
            
		})
		.catch(error => ({
			status: false,
			error: 'Error: ' + error.message
        }));
    }
    uploadPDFtoS3();