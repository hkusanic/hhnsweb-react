const getTime = (date) => {
	return new Date(date) != null ? new Date(date).getTime() : 0;
};

export const sortByDate = (array, compareField) => {
	array.sort((a, b) => {
		return getTime(b[compareField]) - getTime(a[compareField]);
	});

	return array;
};
