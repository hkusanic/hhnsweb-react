const contentful = require("contentful-management");

const client = contentful.createClient({
	accessToken: "CFPAT-sfCluxrxheLEkaUi2w09D9M3FGRmFZsZXfXugZSJ0XM"
});

client
	.getSpace("5z1jjbbv7zko")
	.then(space =>
		space.createContentTypeWithId("lecture", {
			name: "Lecture",
			fields: [
				{
					id: "slug",
					name: "slug",
					required: true,
					localized: false,
					type: "Text"
				},
				{
					id: "languages",
					name: "languages",
					required: false,
					localized: false,
					type: "Text"
				},
				{
					id: "tnid",
					name: "tnid",
					required: false,
					localized: false,
					type: "Text"
				},
				{
					id: "published_date",
					name: "published_date",
					required: false,
					localized: false,
					type: "Text"
				},
				{
					id: "uuid",
					name: "uuid",
					required: true,
					localized: false,
					type: "Text"
				},
				{
					id: "audit",
					name: "audit",
					required: false,
					localized: false,
					type: "Array",
					items: { type: "Text" }
				},
				{
					id: "counters",
					name: "counters",
					required: false,
					localized: false,
					type: "Object"
				},
				{
					id: "ru",
					name: "ru",
					required: false,
					localized: false,
					type: "Object"
				},
				{
					id: "en",
					name: "en",
					required: false,
					localized: false,
					type: "Object"
				},
				{
					id: "transcribe_required",
					name: "transcribe_required",
					required: false,
					localized: false,
					type: "Boolean"
				},
				{
					id: "translation_required",
					name: "translation_required",
					required: false,
					localized: false,
					type: "Boolean"
				},
				{
					id: "transcribe_filter",
					name: "transcribe_filter",
					required: false,
					localized: false,
					type: "Boolean"
				},
				{
					id: "created_date_time",
					name: "created_date_time",
					required: false,
					localized: false,
					type: "Date"
				},
				{
					id: "youtube",
					name: "youtube",
					required: false,
					localized: false,
					type: "Array",
					items: {
						type: "Text"
					}
				}
			]
		})
	)
	.then(contentType => console.log(contentType))
	.catch(console.error);
