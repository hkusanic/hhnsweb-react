const contentful = require("contentful-management");

const client = contentful.createClient({
	accessToken: "CFPAT-sfCluxrxheLEkaUi2w09D9M3FGRmFZsZXfXugZSJ0XM"
});

client
	.getSpace("5z1jjbbv7zko")
	.then(space =>
		space.createContentTypeWithId("blog", {
			name: "Blog",
			fields: [
				{
					id: "slug",
					name: "slug",
					required: false,
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
					id: "publish_date",
					name: "publish_date",
					required: false,
					localized: false,
					type: "Text"
				},
				{
					id: "blog_creation_date",
					name: "blog_creation_date",
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
					id: "uuid",
					name: "uuid",
					required: false,
					localized: false,
					type: "Text"
				},
				{
					id: "audit",
					name: "audit",
					required: false,
					localized: false,
					type: "Array",
					items: { type: "Symbol" }
				},
				{
					id: "needs_translation",
					name: "needs_translation",
					required: false,
					localized: false,
					type: "Boolean"
				},
				{
					id: "files",
					name: "files",
					required: false,
					localized: false,
					type: "Array",
					items: { type: "Text" }
				},
				{
					id: "created_date_time",
					name: "created_date_time",
					required: false,
					localized: false,
					type: "Date"
				},
				{
					id: "audio_files",
					name: "audio_files",
					required: false,
					localized: false,
					type: "Array",
					items: {
						type: "Text"
					}
				},
				{
					id: "body",
					name: "body",
					required: false,
					localized: true,
					type: "Text"
				},
				{
					id: "title",
					name: "title",
					required: false,
					localized: true,
					type: "Text"
				},
				{
					id: "nid",
					name: "nid",
					required: false,
					localized: true,
					type: "Text"
				}
			]
		})
	)
	.then(contentType => console.log(contentType))
	.catch(console.error);

// client
// 	.getSpace("<space_id>")
// 	.then(space => space.createEnvironment({ name: "myEnv" }))
// 	.then(environment => {
// 		console.log(environment);
// 		environment.createEntry;
// 	})
// 	.catch(console.error);
