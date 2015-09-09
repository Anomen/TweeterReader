(function (require) {
    "use strict";

    require.config({
        packages: [{
            name: "homepage",
            main: "homepage",
            location: "modules/homepage"
        }],
        paths: {
            marionette: "../libraries/marionette/lib/backbone.marionette",
            backbone: "../libraries/backbone/backbone",
            underscore: "../libraries/lodash/lodash",
            jquery: "../libraries/jquery/dist/jquery",
            text: "../libraries/requirejs-text/text",
            moment: "../libraries/moment/moment"
        }
    });

    require(["app"]);
})(require);