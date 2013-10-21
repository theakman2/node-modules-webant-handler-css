var Handler = require("../lib/index.js");
var HandlerBase = require("./lib/Handler.js");

function createHandler(Handler,settings) {
	var handlerBase = new HandlerBase(settings);
	
	Handler.prototype = handlerBase;
	Handler.prototype.constructor = Handler;
	
	return new Handler();
}

var handler = createHandler(Handler);

var tests = {
	"test css external url":function(assert,done) {
		handler.willHandle({
			filePath:"//google.com/bla.css?foo=bar#fgs"
		},function(err,yes){
			assert.strictEqual(err,null,"Handler should not report an error.");
			assert.strictEqual(yes,false,"Handler should report false.");
			done();
		});
	},
	"test css wrong file type":function(assert,done) {
		handler.willHandle({
			filePath:__dirname+"/path/to/javascript.js",
		},function(err,yes){
			assert.strictEqual(err,null,"Handler should not report an error.");
			assert.strictEqual(yes,false,"Handler should report false.");
			done();
		});
	},
	"test css correct file type (comment)":function(assert,done) {
		handler.handle({
			filePath:__dirname+"/style.css",
			requireType:"comment",
			raw:"./style.css"
		},function(data){
			assert.deepEqual(
				data,
				{
					type:"internalCss",
					content:".bla { color: red; }"
				},
				"Handler should update with correct data."
			);
			done();
		});
	},
	"test css correct file type (function)":function(assert,done) {
		handler.handle({
			filePath:__dirname+"/style.css",
			requireType:"function",
			raw:"./style.css"
		},function(data){
			assert.deepEqual(
				data,
				{
					type:"internalJs",
					content:'require("@@css/addStylesheet")(".bla { color: red; }");'
				},
				"Handler should update with correct data."
			);
			done();
		});
	}
};

require("test").run(tests);