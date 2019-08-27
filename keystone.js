let keystone = require("keystone");
var cron = require("node-cron");
var rp = require("request-promise");
if (
	process.env.NODE_ENV === undefined &&
	process.env.NODE_ENV !== "production"
) {
	console.log("---LOADING ENV VARIABLES---");
	require("dotenv").load();
	console.dir(process.env);
}

// Set up our keystone instance
keystone.init({
	// The name of the KeystoneJS application
	name: "H.H. Niranja Swami Web - Admin UI",
	// Paths to our application static files
	static: ["./server/public", "./uploads", "./admin"],
	"file limit": "150000MB",
	"cors allow origin": true,
	"api allow origin": true,
	// Keystone includes an updates framework,
	// which you can enable by setting the auto update option to true.
	// Updates provide an easy way to seed your database,
	// transition data when your models change,
	// or run transformation scripts against your database.
	"auto update": true,
	// The url for your MongoDB connection
	mongo: "mongodb://localhost/keystonereactcms",
	// Whether to enable built-in authentication for Keystone's Admin UI,
	auth: true,
	// The key of the Keystone List for users, required if auth is set to true
	"user model": "User",
	// The encryption key to use for your cookies.
	"cookie secret": "6D61822FBEAED8635A4A52241FEC3",
	"kfm public url": "/images/",
	"kfm virtual prop key": "src",
	"kfm uploaded files storage": "/uploads/images/",
	"wysiwyg override toolbar": false,
	"wysiwyg menubar": true,
	"wysiwyg skin": "lightgray",
	"wysiwyg images": true,
	"wysiwyg additional buttons":
		"searchreplace visualchars," +
		" charmap ltr rtl pagebreak paste, forecolor backcolor," +
		" emoticons media, preview print ",
	"wysiwyg additional plugins":
		"example, table, advlist, anchor," +
		" autolink, autosave, bbcode, charmap, contextmenu, " +
		" directionality, emoticons, fullpage, hr, media, pagebreak," +
		" paste, preview, print, searchreplace, textcolor," +
		" visualblocks, visualchars, wordcount",
	"cloudinary config": {
		cloud_name: "not",
		api_key: "really",
		api_secret: "used"
	},
	"wysiwyg cloudinary images": true,
	"wysiwyg additional options": {
		image_title: true,
		automatic_uploads: true,
		images_upload_url: "/images",
		uploadimage_form_url: "/api/fileupload/create",
		images_reuse_filename: true,
		images_upload_handler: (blobInfo, success, failure) => {
			console.log("---image_upload_handler---");
			var xhr, formData;

			xhr = new XMLHttpRequest();
			xhr.withCredentials = false;
			xhr.open("POST", "postAcceptor.php");

			xhr.onload = () => {
				var json;

				if (xhr.status !== 200) {
					failure("=HTTP Error: " + xhr.status);
					return;
				}

				json = JSON.parse(xhr.responseText);

				if (!json || typeof json.location !== "string") {
					failure("Invalid JSON: " + xhr.responseText);
					return;
				}

				success(json.location);
			};

			formData = new FormData();
			formData.append("file", blobInfo.blob(), blobInfo.filename());

			xhr.send(formData);
		},
		file_picker_callback: (callback, value, meta) => {
			console.log("---file_picker_callback---");
			// Provide file and text for the link dialog
			if (meta.filetype === "file") {
				callback("mypage.html", {
					text: "My text"
				});
			}
			// Provide image and alt text for the image dialog
			if (meta.filetype === "image") {
				callback("myimage.jpg", {
					alt: "My alt text"
				});
			}
			// Provide alternative source and posted for the media dialog
			if (meta.filetype === "media") {
				callback("movie.mp4", {
					source2: "alt.ogg",
					poster: "image.jpg"
				});
			}
		}
	}
});

// Load your project's Models
keystone.import("./server/models");
// Add routes
keystone.set("routes", require("./server/routes"));

// Start Keystone
keystone.start();

//const url = "http://localhost:3000/audio";
const emailList = [];
// const demolist = [
// 	{ email: "anurag@cronj.com", name: "anurag" },
// 	{ email: "prateek@cronj.com", name: "prateek" },
// 	{ email: "ayush@cronj.com", name: "ayush" },
// 	{ email: "dilip@cronj.com", name: "dilip" },
// 	{ email: "priyanka@cronj.com", name: "priyanka" }
// ];

cron.schedule("*/2 * * * *", () => {
	keystone
		.list("Subscriber")
		.model.find()
		.exec((err, subscriberList) => {
			if (err || !subscriberList) {
				logger.error(
					{
						error: err
					},
					"API subscriberList"
				);
				return res.json({
					error: {
						title: "Not able to get the subscriber list or list is empty"
					}
				});
			}
			console.log(subscriberList);
			for (let subscriber of subscriberList) {
				emailList.push({
					email: subscriber.email,
					name: subscriber.name.first + " " + subscriber.name.last
				});
			}
		});
	let personalisationAr = [];
	demolist.map(obj => {
		let obj1 = {
			to: [{ email: obj.email }],
			dynamic_template_data: {
				name: obj.name,
				link: url
			},
			subject: "Review Audio"
		};
		personalisationAr.push(obj1);
	});
	const data = {
		personalizations: personalisationAr,
		from: {
			email: "anurag@cronj.com",
			name: "anurag"
		},
		template_id: "d-59f330b284be4970bf6d9075054f525b"
	};
	const postdata = JSON.stringify(data);
	console.log("postdata>>>>>>>>>>>>", postdata);
	var options = {
		method: "POST",
		uri: "https://api.sendgrid.com/v3/mail/send",
		headers: {
			authorization:
				"Bearer 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",
			"Content-Type": "application/json"
		},
		body: postdata
		//json: true // Automatically stringifies the body to JSON
	};
	rp(options)
		.then(function(parsedBody) {
			console.log("succeeded");
			// POST succeeded...
		})
		.catch(function(err) {
			console.log("err", err);
			// POST failed...
		});
});
