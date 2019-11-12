const errors = {
	missingUUUID: { code: 'MISSING_UUID', msg: 'unique id is missing.' },
	missingUserId: { code: 'MISSING_USER_ID', msg: 'User id is not provided' },
	missingSadhanaDate: {
		code: 'MISSING_SADHANASHEET_DATE',
		msg: 'Sadhana Sheet date is not provided',
	},
	missingRisingTime: {
		code: 'MISSING_RISING_TIME',
		msg: 'Rising time is not provided',
	},
	missingRounds: {
		code: 'MISSING_ROUNDS',
		msg: 'Sadhana Sheet rounds is not provided',
	},
	missingSadhanaReading: {
		code: 'MISSING_READING',
		msg: 'Sadhana Sheet reading is not provided',
	},
	missingSadhanaAssociation: {
		code: 'MISSING_ASSOCIATION',
		msg: 'Sadhana Sheet asociations is not provided',
	},
	missingEmail: {
		code: 'MISSING_EMAIL',
		msg: 'Email id is not provided',
	},
	missingText: {
		code: 'MISSING_TEXT_TO_DETECT_LANGUAGE',
		msg: 'Text for detecting langauge is missing',
	},
	missingDominantLanguage: {
		code: 'MISSING_DOMINANT_LANGUAGE',
		msg: 'Dominant Laguage is not provided',
	},
};

module.exports = {
	errors,
};
