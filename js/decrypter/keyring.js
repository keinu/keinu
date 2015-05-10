var keyRing = (function () {

	"use strict";

	var keys = [];
	if (localStorage.keys) {
		keys = JSON.parse(localStorage.keys);
	}

	var save = function() {

		localStorage.keys = JSON.stringify(keys);

	};

	var add = function(key) {

		key = setExpiry(key);
		for (var i in keys) {
			if (keys[i].value === key.value) {
				keys[i] = key;
				save();
				return key;
			}
		}
		keys.push(key);
		save();

		return key;

	};

	var setExpiry = function(key) {

		key.expires = (new Date()).getTime() + key.validity;

		return key;

	};

	var remove = function(value) {

		for (var i in keys) {
			if (keys[i].value === value) {
				keys.splice(i, 1);
			}
		}
		save();

	};

	var getAll = function() {

		return keys;

	};

	var getGalleryKey = function(galleryId) {

		for (var i in keys) {
			if (keys[i].galleryId === galleryId) {
				if (keys[i].expires > (new Date()).getTime()) {
					return keys[i];
				}
			}
		}

		return false;

	};

	return {
		add: add,
		remove: remove,
		getAll: getAll,
		getGalleryKey: getGalleryKey,
		setExpiry: setExpiry
	};

})();