var fs = require('fs');
var mustache = require('mustache');

module.exports = {
	request: function (template, callback) {
		if (typeof template != 'string')
			throw 'template is not a valid string';
		
		if (typeof callback != 'function')
			throw 'callback is not a function';
		
		fs.readFile('templates/' + template + '.tpl', 'utf8', function(err, tplText) {  
			if (err) throw err;
			
			callback(function(data) {
				if (typeof data == 'undefined')
					data = {};
				
				return mustache.render(tplText, data);
			});
		});
	},
	
	
}