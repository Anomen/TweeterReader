define(function (require) {
    "use strict";

    var Marionette    = require("marionette"),
        applicationStore = require("stores/applicationStore");

    return function (app) {
        if (!app) {
            throw new Error("You need to pass a valid 'app' parameter.");
        }

        var Router =  Marionette.AppRouter.extend({
            routes: {
                "": "homepage",
                settings: "settings"
            },
            homepage: function () {
                applicationStore.set("isEditMode", false);
            },
            settings: function () {
                applicationStore.set("isEditMode", true);
            }
        });

        // Instantiate new router
        new Router();
    };
});