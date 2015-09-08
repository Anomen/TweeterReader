define(function (require) {
    "use strict";

    var Marionette    = require("marionette"),
        AccountsList  = require("views/AccountsList"),
        accountsStore = require("stores/accountsStore");

    return function (app) {
        if (!app) {
            throw new Error("You need to pass a valid 'app' parameter.");
        }

        var Router =  Marionette.AppRouter.extend({
            routes: {
                "": "homepage"
            },
            homepage: function () {
                // Create AccountList view that makes the list of accounts in columns
                var view = new AccountsList({
                    collection: accountsStore
                });

                // Attach it to the content
                app.rootView.getRegion("content").show(view);
            }
        });

        // Instantiate new router
        new Router();
    };
});