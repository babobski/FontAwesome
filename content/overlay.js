/**
 * Namespaces
 */
if (typeof(extensions) === 'undefined') extensions = {};
if (typeof(extensions.FontAwesome) === 'undefined') extensions.FontAwesome = {
	version: '2.5.0'
};

(function() {
	var self = this,
		prefs = Components.classes["@mozilla.org/preferences-service;1"]
		.getService(Components.interfaces.nsIPrefService).getBranch("extensions.FontAwesome.");

	if (!('FontAwesome' in ko)) ko.extensions = {};
	var myExt = "FontAwesome@babobski.com";
	if (!(myExt in ko.extensions)) ko.extensions[myExt] = {};
	if (!('myapp' in ko.extensions[myExt])) ko.extensions[myExt].myapp = {};
	var FontAwesomeData = ko.extensions[myExt].myapp;

	FontAwesome_insert = function(icon, unicode) {
		var typeInsert = prefs.getCharPref('typeInsert');
		var entity = '';

		entity = self._buildInsert(typeInsert, icon, unicode);

		try {
			var scimoz = ko.views.manager.currentView.scimoz;
			scimoz.insertText(scimoz.currentPos, entity);
			scimoz.gotoPos(scimoz.currentPos + entity.length);
			ko.views.manager.currentView.setFocus();
		} catch (ex) {
			alert(ex);
		}

	}

	this._buildInsert = function(type, icon, unicode) {
		var d = ko.views.manager.currentView.document || ko.views.manager.currentView.koDoc;
		var file = d.file;
		var result = '';
		switch (type) {
			case 'auto':
				if (file) {
					switch (file.ext) {
						case '.css':
						case '.sass':
						case '.scss':
						case '.less':
							result = self._buildInsert('css', icon, unicode);
							break;
						default:
							result = self._buildInsert('full', icon, unicode);
							break;
					}
				} else {
					result = '<i class="fa ' + icon + '"></i>';
				}
				break;
			case 'full':
				result = '<i class="fa ' + icon + '"></i>';
				break;
			case 'class':
				result = 'fa ' + icon;
				break;
			case 'css':
				result = '\\f' + unicode;
				break;
		}

		return result;
	}

	openSettings = function() {
		var features = "chrome,titlebar,toolbar,centerscreen,modal";
		window.openDialog('chrome://FontAwesome/content/pref-overlay.xul', "FontAwesome", features);
	}

	insertCDN = function() {
		try {
			var CDN = '//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css';
			var scimoz = ko.views.manager.currentView.scimoz;
			scimoz.insertText(scimoz.currentPos, CDN);
			scimoz.gotoPos(scimoz.currentPos + CDN.length);
			ko.views.manager.currentView.setFocus();
		} catch (ex) {
			alert(ex);
		}
	}
	
	insertFF = function() {
		try {
			var FF = 'font-family: \'FontAwesome\';';
			var scimoz = ko.views.manager.currentView.scimoz;
			scimoz.insertText(scimoz.currentPos, FF);
			scimoz.gotoPos(scimoz.currentPos + FF.length);
			ko.views.manager.currentView.setFocus();
		} catch (ex) {
			alert(ex);
		}
	}


}).apply(extensions.FontAwesome);
