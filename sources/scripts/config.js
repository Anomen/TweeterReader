/**
 * This file is the configuration for requirejs. It determines where to
 * find the different modules in the file architecture.
 */
(function (require) {
    "use strict";

    require.config({
        baseUrl: "scripts",
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
})(require);