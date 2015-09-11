# TwitterReader
This project is a simple reader for Twitter, an AppDirect challenge. It creates 3 columns to read 3 twitter accounts.

## Architecture

This program uses a classical MVC pattern. Under the folder `sources`, you will find:

 - `/models`: All the models of the application.
 - `/collection`: All the collections of the application, in a classical Backbone app (see the documentation for more information).
 - `/stores`: The stores are used as a storage in the memory to hold instances that will be used across the entire application. For instance, applicationStore has all the settings of the application.
 - `/views`: The Views and templates of the application.
 - `config.js`: The requirejs configuration file.
 - `app.js`: The entry point that loads the application.
 - `routes.js`: The main routes of the application.

### Unit Tests

There are a few unit tests under `/tests` folder. I only wrote a couple of tests, and not the entire application, to demonstrate that it is possible to test Backbone/RequireJS classes. As it's only a challenge, I didn't go to far in writing tests.

## Libraries
 - [BackboneJS](http://backbonejs.org/) - The main library to create a SPA.
 - [MarionetteJS](http://marionettejs.com/) - Library on top of BackboneJS, to removes some of the boilerplate from Backbone.
 - [RequireJS](http://requirejs.org/) - Dependency manager.
 - [jQuery](http://jquery.com) and [jQueryUI](http://jqueryui.com) - Famous utility library to deal with selectors and add components like datepicker.
 - [loDash](http://lodash.com) - Utility library (dependency for Backbone).

## Grunt tasks

To develop the project, [Grunt](http://gruntjs.com/) is used and provides a set of tasks.

 - `grunt`: Starts a HTTP server to serve the `public` folder and create the Twitter Proxy to their API. It also watches for SASS changes, and recompile it automatically.
 - `grunt build`: Builds the project, by concatenating all needed files, and minimifying them. The output is the `dist` folder.
 - `grunt test`: Runs unit tests in the terminal, using Mocha.

Those tasks are the main ones, and here are more advanced tasks if needed:

 - `grunt server-dist`: Starts a HTTP server to serve the `dist` folder, and thus test if the built version works properly.
 - `grunt server-dev`: Same as `grunt`.
 - `grunt test-browser`: Starts a HTTP server to serve the `tests` folder if you want to run the unit tests in the browser (to debug, for instance).
 - `grunt test-headless`: Same as `grunt test`.

## Styles
### Libraries

 - [SASS](http://sass-lang.com/) - CSS pre-proprocessing to help build more readable CSS.
 - [Composs](http://compass-style.org) - Set of useful functions for SASS to deal with cross-plateform CSS.
 - [Breakpoint-SASS](breakpoint-sass.com) - To easily deal with responsive designs in SASS.


