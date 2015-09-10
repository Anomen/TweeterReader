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
            localstorage: "../libraries/backbone.localstorage/backbone.localStorage",
            underscore: "../libraries/lodash/lodash",
            jquery: "../libraries/jquery/dist/jquery",
            jqueryui: "../libraries/jquery-ui/jquery-ui.min",
            text: "../libraries/requirejs-text/text",
            moment: "../libraries/moment/moment"
        },
        shim: {
            localstorage: ["backbone"]
        }
    });

    require(["app"]);
})(require);