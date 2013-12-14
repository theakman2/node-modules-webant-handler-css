# node-modules-webant-handler-css

_Require CSS files with [webant](https://github.com/theakman2/node-modules-webant)_

## Installation

There should be no need to install this module since it's required by the [webant](https://github.com/theakman2/node-modules-webant) module by default.

If for some reason you'd like to use the module outside of webant, install as follows:

    $ npm install webant-handler-css

## Usage

Ensure the `css` handler is present in your webant configuration file. For example:

````json
{
    "entry":"src/js/main.js",
    "dest":"build/main.js",
    "handlers":{
        "css":{}
    }
}
````

You may now `require` CSS files:

````javascript
require("../path/to/styles.css");
````

See the [webant](https://github.com/theakman2/node-modules-webant) module for more information.

## Tests [![Build Status](https://travis-ci.org/theakman2/node-modules-webant-handler-css.png?branch=master)](https://travis-ci.org/theakman2/node-modules-webant-handler-css)

    $ npm test