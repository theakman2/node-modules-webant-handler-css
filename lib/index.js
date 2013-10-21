var path = require("path");

function Handler() {
	var self = this;
	
	this.extensions = [".css"];
	this.requireTypes = ["comment","function"];
	this.requireAliases = {
		'@@css/addStylesheet':path.resolve(__dirname,"data/addStylesheet.js")
	};
	
	this.go = function(data,update,done) {
		if (data.requireType === "comment") {
			update({
				type:"internalCss",
				content:data.content
			},done);
		} else {
			update({
				type:"internalJs",
				content:'require("@@css/addStylesheet")('+self.makeString(data.content.trim())+');'
			},done);
		}
	};
};

module.exports = Handler;