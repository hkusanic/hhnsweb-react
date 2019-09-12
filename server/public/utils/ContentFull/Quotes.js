const contentful = require("contentful-management");

const client = contentful.createClient({
	accessToken: "CFPAT-sfCluxrxheLEkaUi2w09D9M3FGRmFZsZXfXugZSJ0XM"
});

client
	.getSpace("5z1jjbbv7zko")
	.then(space =>
		space.createContentTypeWithId("quotes", {
			name: "Quotes",
			fields: [
				{
					id: "slug",
					name: "slug",
					required: true,
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
					id: "author",
					name: "author",
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
					id: "comments",
					name: "comments",
					required: false,
					localized: false,
					type: "Array",
					items: { type: "Text" }
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
					id: "needs_translation",
					name: "needs_translation",
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
					id: "quote_date",
					name: "quote_date",
					required: false,
					localized: false,
					type: "Text"
				}
			]
		})
	)
	.then(contentType => console.log(contentType))
	.catch(console.error);
