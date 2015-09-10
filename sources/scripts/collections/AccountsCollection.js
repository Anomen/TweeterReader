define(function (require) {
    "use strict";

    var Backbone     = require("backbone"),
        LocalStorage = require("localstorage"),
        $            = require("jquery"),
        _            = require("underscore"),
        AccountModel = require("models/AccountModel");

    return Backbone.Collection.extend({
        model: AccountModel,
        localStorage: new LocalStorage("Accounts"),
        fetchTweets: function (options) {
            options = options || {};
            options.success = options.success || function () {};
            options.error   = options.error   || function () {};

            _.forEach(this.models, function (model) {
                model.fetchTweets();
            });
        }
    });
});