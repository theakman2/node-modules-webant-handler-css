var fs = require("fs");
var path = require("path");

var Handler = require("../lib/index.js");

var handler = new Handler();

var tests = {
	"test filetypes":function(assert) {
		var data = [
		            "http://google.com/bla.css?foo=bar",
		            "//microsoft.com/path/to/assets.css",
		            "path/to/assets.css",
		            "/abs/path/to/assets.css",
		            "@@hbs/runtime",
		            "@@css/addStylesheet"
		            ];
		assert.deepEqual(
			data.map(handler.willHandle),
			[false,false,true,true,false,true],
			"Should handle the correct files."
		);
	},
	"test correct file type":function(assert,done) {
		handler.handle(__dirname+"/style.css",function(err,content){
			assert.ok(
				!err,
				"There should be no errors handling this filetype."
			);
			assert.equal(
				content,
				'require("@@css/addStylesheet")(".bla { color: red; }");',
				"Handler should update with correct content."
			);
			done();
		});
	},
	"test correct file type 2":function(assert,done) {
		handler.handle("@@css/addStylesheet",function(err,content){
			assert.ok(
				!err,
				"There should be no errors handling this filetype."
			);
			assert.equal(
				content,
				fs.readFileSync(path.join(__dirname,"..","lib","data","addStylesheet.js")).toString(),
				"Handler should update with correct content."
			);
			done();
		});
	}
};

require("test").run(tests);