var fs = require('fs');
var newData;
var oldData;

fs.readFile('withoutProfilepicData.json', (err, data) => {
	if (err) throw err;
	oldData = JSON.parse(data);
	console.log('oldData =====>>>', oldData.length);
	fs.readFile('UserData.json', (err, data) => {
		if (err) throw err;
		newData = JSON.parse(data);
		console.log('newData ====>>>>>', newData.length);
		var finalUserData = [];

		for (let i = 0; i < oldData.length; i++) {
			for (let j = 0; j < newData.length; j++) {
				if (oldData[i].oldData.uid === newData[j].oldData.uid) {
					// console.log(' i===>>>>', i);
					if (oldData[i].disciple === 'No') {
						newData[j].disciple = 'No';
					} else if (oldData[i].disciple === '0') {
						newData[j].disciple = 'No';
					} else if (oldData[i].disciple === '1') {
						newData[j].disciple = 'Disciple';
					} else if (oldData[i].disciple === '2') {
						newData[j].disciple = 'Aspiring disciple';
					} else {
						console.log('inside else part');
						newData[j].disciple = 'No';
					}
					finalUserData.push(newData[j]);
				}
			}
		}
		console.log('finalData ====>>>', finalUserData.length);
		var json1 = JSON.stringify(finalUserData, null, 2);
		fs.writeFile('latestData.json', json1, 'utf8', () => {
			console.log('success');
		});
	});
});
