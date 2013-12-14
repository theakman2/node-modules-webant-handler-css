var fs = require("fs");
var path = require("path");
var url = require("url");

var jsStringEscape = require("js-string-escape");

module.exports = {
	willHandle:function(filePath,settings){
		if (url.parse(filePath,false,true).host) {
			return false;
		}
		if (filePath === "@@css/addStylesheet") {
			return true;
		}
		if (filePath.indexOf("@@") === 0) {
			return false;
		}
		if (path.extname(filePath) === ".css") {
			return true;
		}
		return false;
	},
	handle:function(filePath,settings,done){
		if (filePath === "@@css/addStylesheet") {
			fs.readFile(__dirname+"/data/addStylesheet.js",function(e,c){
				if (e) {
					done(e);
					return;
				}
				done(null,c.toString());
			});
		} else {
			fs.readFile(filePath,function(e,c){
				if (e) {
					done(e);
					return;
				}
				done(null,'require("!@@css/addStylesheet")("'+jsStringEscape(c.toString())+'");');
			});
		}
	}
};