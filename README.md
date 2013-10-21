# node-modules-webant-handler-css

_Require CSS files with [webant](https://github.com/theakman2/node-modules-webant)_

## Installation

There should be no need to install this module since it\'s required by the [webant](https://github.com/theakman2/node-modules-webant) module by default.

If for some reason you\'d like to use the module outside of webant, install as follows:

    $ npm install webant-handler-css

## Usage

First ensure your `webant-config.js` file is populated with at least the following settings:

    module.exports.build = {
        sourceDir:"path/to/src/",
        destDir:"path/to/dest/",
        js:{
            start:"relative/path/to/main.js",
            dest:"main.js"
        },
        css:{
            dest:"relative/path/to/main.css"
        },
        index:{
            start:"index.hbs",
            dest:"index.html"
        },
        handlers:["css", "js"]
    };

Then `require` a CSS file by calling `require("path/to/styles.css")`. It'll automatically be included in the file specified in `css.dest`.
    
## Tests

    $ npm test