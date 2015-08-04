/**
 * Namespaces
 */
if (typeof(extensions) === 'undefined') extensions = {};
if (typeof(extensions.FontAwsome) === 'undefined') extensions.FontAwsome = { version : '2.5.0' };

(function() {
	var self = this,
		prefs = Components.classes["@mozilla.org/preferences-service;1"]
        .getService(Components.interfaces.nsIPrefService).getBranch("extensions.FontAwsome.");
		
	if (!('FontAwsome' in ko)) ko.extensions = {}; 
	var myExt = "FontAwsome@babobski.com" ; 
	if (!(myExt in ko.extensions)) ko.extensions[myExt] = {};
	if (!('myapp' in ko.extensions[myExt])) ko.extensions[myExt].myapp = {};
	var FontAwsomeData = ko.extensions[myExt].myapp;
	
	FontAwsome_insert = function(icon, unicode){
		var typeInsert = prefs.getCharPref('typeInsert');
		var entity = '';
	
		entity = self._buildInsert(typeInsert, icon, unicode);
		
	 try {
		var scimoz = ko.views.manager.currentView.scimoz;
		 scimoz.insertText(scimoz.currentPos ,entity);
		 scimoz.gotoPos(scimoz.currentPos + entity.length);
	 } catch(ex) {
		 alert(ex);
	 }
	
	}
	
	this._buildInsert = function (type, icon, unicode) {
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
				result = unicode;
				break;
		}
		
		return result;
	}
	
	openSettings = function(){
		var features = "chrome,titlebar,toolbar,centerscreen,modal";
		window.openDialog('chrome://FontAwsome/content/pref-overlay.xul', "FontAwsome", features);
	}
	
	changeOption = function(){
		var insert = document.getElementById('selectedOption').value;
		
		prefs.setCharPref('typeInsert', insert);
	}
	
	saveImagePath = function(){
		var input = document.getElementById('image_path').value;
		
		if (input.length > 0) {
			prefs.setCharPref('imagePath', input);
		}
	}
	
	insertImagePath = function(){
		var imagePath = prefs.getCharPref('imagePath');
		var scimoz = ko.views.manager.currentView.scimoz;
		 scimoz.insertText(scimoz.currentPos ,imagePath);
		 scimoz.gotoPos(scimoz.currentPos + imagePath.length);
	}
	
	
	
}).apply(extensions.FontAwsome);
