function compare (a, b) {
	if (a.name_en.toLowerCase() < b.name_en.toLowerCase()) {
		return -1;
	}
	if (a.name_en.toLowerCase() > b.name_en.toLowerCase()) {
		return 1;
	}
	return 0;
}

export function handleFilterGallery (mainGallery) {
	const numberArray = [];
	const stringArray = [];
	for (let i = 0; i < mainGallery.length; i++) {
		if (mainGallery[i].name_en[0] >= '0' && mainGallery[i].name_en[0] <= '9') {
			console.log(mainGallery[i].name_en[0]);
			numberArray.push(mainGallery[i]);
		} else {
			stringArray.push(mainGallery[i]);
		}
	}

	for (let i = 1; i < numberArray.length; i++) {
		for (let j = 0; j < i; j++) {
			if (Number(numberArray[i].name_en) > Number(numberArray[j].name_en)) {
				const temp = numberArray[i];
				numberArray[i] = numberArray[j];
				numberArray[j] = temp;
			}
		}
	}

	stringArray.sort(compare);
	const finalArray = numberArray.concat(stringArray);
	return finalArray;
}
