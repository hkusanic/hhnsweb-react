let keystone = require('keystone');
let modelHeleper = require('../helpers/modelHelper');
let Types = keystone.Field.Types;

let Page = new keystone.List('Page', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	drilldown: 'parent',
});

function formatDate (date) {
	let monthNames = [
		'January', 'February', 'March',
		'April', 'May', 'June', 'July',
		'August', 'September', 'October',
		'November', 'December',
	];

	let day = date.getDate();
	let monthIndex = date.getMonth();
	let year = date.getFullYear();

	return `${monthNames[monthIndex]} ${day} ${year}`;
}

// Adding the option to add an image to our Page from
var pageImgStorage = new keystone.Storage({
	adapter: keystone.Storage.Adapters.FS,
	fs: {
		// required; path where the files should be stored
		path: keystone.expandPath('server/public/img'),
		generateFilename: function (file, index) {
			return file.originalname;
		},
		whenExists: 'error',
		// path where files will be served
		publicPath: '/public/img',
	},
});

Page.add({
	title: { type: String, required: true },
	slug: { type: String, index: true },
	showMainImage: { type: Boolean, default: false },
	mainImage: { type: Types.File, storage: pageImgStorage, mimetype: '.jpeg, .jpg, .gif, .svg' },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true },
	parent: { type: Types.Relationship, ref: 'NavigationItem' },
	position: { type: Number },
	content: {
		html: { type: Types.Code, height: 600, wysiwig: true, language: 'htmlmixed', theme: 'mdn-like', noedit: false, default: `
		<section>
				<div class="row">
					<div class="col-sm-8 blog-main">
						<div class="blog-post">
							<h2 class="blog-post-title">Title</h2>
							<p class="blog-post-meta">${ formatDate(new Date()) } by <a href="#">Admin</a></p>
							<p>Lorem ipsum dolor sit amet, a pulvinar proin ante purus tortor, non justo venenatis fusce, sapien eros, nulla vitae nulla. In ante velit felis aptent, nulla eros porta et phasellus pretium, curabitur dui, sit architecto nec praesent a augue, nisl at id et augue ultrices. Integer nec sed, inceptos mollis at quisque, elementum integer. Lacus rhoncus, lorem taciti, eget rutrum at duis. Quis nonummy suspendisse massa, odio mauris, varius nulla per proin magna venenatis tellus, fringilla sapien in fusce. Donec sed, ultricies cum, sem ipsum imperdiet nullam vitae, ipsum id mauris, fames leo nulla cursus sed laoreet nec.</p>
						</div><!-- /.blog-post -->
					</div><!-- /.blog-main -->
					<div class="col-sm-3 offset-sm-1 blog-sidebar">
						<div class="sidebar-module sidebar-module-inset">
							<img src="../../images/placeholder.jpg" class="img-thumbnail img-responsive" alt="placeholder">
							<p>Placeholder image</p>
						</div>
						<div class="sidebar-module">
							<h4>Options</h4>
							<ol class="list-unstyled">
								<li><a href="#">Item 1</a></li>
								<li><a href="#">Item 2</a></li>
								<li><a href="#">Item 3</a></li>
								<li><a href="#">Item 4</a></li>
								<li><a href="#">Item 5</a></li>
							</ol>
						</div>
						<div class="sidebar-module">
							<h4>Options 2</h4>
							<ol class="list-unstyled">
								<li><a href="#">Item 1</a></li>
								<li><a href="#">Item 2</a></li>
								<li><a href="#">Item 3</a></li>
							</ol>
						</div>
						<div class="sidebar-module">
							<h4>Option 3</h4>
							<p>description text</p>
							<ol class="list-unstyled">
								<li><a href="#">Item 1</a></li>
								<li><a href="#">Item 2</a></li>
							</ol>
						</div>
					</div><!-- /.blog-sidebar -->
				</div><!-- /.row -->
			</section>
		` },
		css: { type: Types.Code, height: 600, wysiwig: true, language: 'css', theme: 'mdn-like', noedit: false },
		javascript: { type: Types.Code, height: 600, wysiwig: true, language: 'javascript', theme: 'mdn-like', noedit: false },
	},
});

Page.defaultColumns = 'title, parent|10%, position|10%, state|10%, author|10%, publishedDate|20%';

Page.schema.pre('save', function (next) {
	next();
});

Page.schema.post('validate', function (page, next) {
	next();
});

Page.schema.post('save', function (newPage, next) {
	modelHeleper.getNavigationItemBySlug(newPage.slug).then((navigationItem) => {
		if (navigationItem.length === 0) {
			keystone.createItems({
				NavigationItem: [
					{ name: newPage.slug, __ref: newPage.slug },
				],
			}, undefined, (result) => {
				next();
			});
		}
	},
	(reason) => {
		console.log(reason);
	}).catch((err) => {
		console.log(err);
	}).then(() => {
		let updatedatabase = keystone.get('updateDatabase');
		if (!updatedatabase)
		{
			modelHeleper.refreshNavigation().then((result) => {
				next();
			}, (err) => {
				console.log(err);
			});
		}
		else {
			next();
		}
	}).catch((err) => {
		console.log(err);
	});
});

Page.schema.post('update', function (doc) {
	console.log('Update finished.');
});

Page.schema.post('remove', function (page, next) {
	let navItemSlug = page['slug'];
	modelHeleper.getNavigationItemBySlug(navItemSlug).then((navigationItem) => {
		navigationItem[0].remove();
		modelHeleper.refreshNavigation().then((result) => {
			next();
		}, (err) => {
			console.log(err);
		});
	});
});

Page.register();
