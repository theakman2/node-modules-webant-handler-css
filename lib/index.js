var fs = require("fs");
var path = require("path");

var jsEscape = require("js-string-escape");

module.exports = {
	aliases:{
		"@@css/addStylesheet":path.join(__dirname,"data","addStylesheet.js")
	},
	extensions:".css",
	handle:function(filePath,done){
		fs.readFile(filePath,function(e,c){
			if (e) {
				done(e);
				return;
			}
			done(null,'require("!@@css/addStylesheet")("'+jsEscape(c.toString())+'");');
		});
	}
};