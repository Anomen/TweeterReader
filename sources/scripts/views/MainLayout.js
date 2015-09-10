define(function (require) {
    "use strict";

    var Marionette = require("marionette"),
        _          = require("underscore"),
        template   = require("text!./templates/MainLayout.tpl"),
        AccountsList  = require("views/AccountsList"),
        accountsStore = require("stores/accountsStore"),
        SettingsView  = require("views/SettingsView"),
        applicationStore = require("stores/applicationStore");

    return Marionette.LayoutView.extend({
        template: _.template(template),

        regions: {
            header: "#header",
            content: "#content",
            settings: "#settings"
        },

        showContent: function () {
            // Create AccountList view that makes the list of accounts in columns
            var view = new AccountsList({
                collection: accountsStore
            });

            // Attach it to the content
            this.getRegion("content").show(view);
        },

        showSettings: function () {
            var view = new SettingsView({
                model: applicationStore
            });

            // Attach it to the content
            this.getRegion("settings").show(view);
        }
    });
});