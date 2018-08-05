var keystone = require('keystone');
let _ = require('underscore');
let navElementList = [];

function getNavigatonElement (navElements, targetKey) {
	let childElement = null;
	let foundChildElement = false;
	_.each(navElements, function (navElement) {
		if (foundChildElement === false) {
			if (navElement.children !== undefined && foundChildElement === false) {
				let queryResult = _.findWhere(navElement.children, { key: targetKey });
				if (queryResult !== undefined) {
					childElement = queryResult;
					foundChildElement = true;
					return childElement;
				}
				else {
					if (foundChildElement === false) {
						childElement = getNavigatonElement(navElement.children, targetKey);
						if (childElement !== undefined) {
							return childElement;
						}
					}
				}
			}
		}
	});
	return childElement;
}

function findElementInNavigation (navElementList, targetKey) {
	let foundChildElement = false;
	let childElement = null;

	_.each(navElementList, function (navElement) {
		if (navElement.children !== undefined) {
			let queryResult = _.findWhere(navElement.children, { key: targetKey });
			if (queryResult !== undefined) {
				childElement = queryResult;
				foundChildElement = true;
			}
			else {
				if (foundChildElement === false) {
					childElement = getNavigatonElement(navElement.children, targetKey);
					if (childElement !== undefined && !_.isNull(childElement)) {
						foundChildElement = true;
					}
				}
			}
		}
	});

	if (foundChildElement) {
		return childElement;
	}

	let root = _.findWhere(navElementList, { key: targetKey });

	if (root) {
		return root;
	}
	else {
		return null;
	}
}

function resetStaticNavigation () {
	let promise = new Promise((resolve, reject) => {
		try {
			keystone.set('navigation-static', [
				{ label: 'Home', key: 'home', href: '/' },
				{ label: 'About', key: 'about', href: '', __ref: 'about' },
				{ label: 'Events', key: 'blog', href: '/blog' },
				{ label: 'Galleries', key: 'galleries', href: '/galleries' },
				{
					label: 'Media',
					key: 'media',
					href: '',
					children: [
						{ label: 'Video', key: 'video', href: '/video-files' },
						{ label: 'Audio', key: 'audio', href: '/audio-files' },
					],
				},
				{ label: 'Projects', key: 'projects', href: '' },
				{ label: 'Contact', key: 'contact', href: '/contact' },
			]);
			resolve(keystone.get('navigation-static'));
		}
		catch (ex) {
			reject(ex);
		}
	});
	return promise;
}

function getAllNavigationElements (pages) {
	let promise = new Promise((resolve, reject) => {
		resetStaticNavigation().then((result) => {
			navElementList = result;
			let sortedpages = _.sortBy(pages, function (item) { return { parent: 1, position: 1 }; });
			_.each(sortedpages, (page) => {
				let parent = page._doc.parent;
				let parentitem;
				if (parent !== undefined && parent !== null) {
					parentitem = findElementInNavigation(navElementList, parent.slug);
				}
				if (parentitem !== undefined && parentitem !== null) {
					if (parentitem.children === undefined)
					{
						parentitem.children = [];
					}
					parentitem.children.push({
						label: page._doc.title,
						key: page._doc.slug,
						href: '/' + page._doc.parent.slug + '/' + page._doc.slug,
						parent: page._doc.parent,
					});
				}
				else {
					navElementList.push({
						label: page._doc.title,
						key: page._doc.slug,
						href: page._doc.parent ? '/' + page._doc.parent.slug + '/' + page._doc.slug : '',
						parent: page._doc.parent,
					});
				}
			});

			resolve(navElementList);
		}, (err) => {
			console.log('ERROR in getAllNavigationElements():', err);
			reject(err);
		});
	});
	return promise;
}

exports.getNavigationItemBySlug = function (slug) {
	let promise = new Promise((resolve, reject) => {

		// get all pages from the database
		let q = keystone.list('NavigationItem').model.find({
			slug: slug,
		});

		q.exec((err, result) => {
			if (err) {
				console.log('ERROR:%s', err);
				return;
			}
			if (result) {
				resolve(result);
			} else {
				console.log('...no navigation item found in the database');
				reject();
			}
		});
	});
	return promise;
};

exports.refreshNavigation = function () {
	navElementList = [];
	let promise = new Promise((resolve, reject) => {

		let q = keystone.list('Page').model.find({
			state: 'published',
		}).populate('parent').sort({ parent: 1, position: 1 });

		q.exec((err, result) => {
			if (err) {
				console.log(err);
				reject();
			}
			if (result) {
				getAllNavigationElements(result).then((result) => {
					keystone.set('navigation', result);
					resolve(result);
				}, (err) => {
					console.log('ERROR refreshNavigation():', err);
					reject();
				});
			} else {
				reject();
			}
		});
	});
	return promise;
};

exports.getStaticNavigation = function () {
	let promise = new Promise((resolve, reject) => {
		resetStaticNavigation().then((result) => {
			console.log('STATIC MENU RESTORED');
			resolve(result);
		}, (err) => {
			console.log('ERROR: getStaticNavigation():', err);
			reject(err);
		});
	});
	return promise;
};
