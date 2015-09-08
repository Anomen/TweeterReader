define(function (require) {
    "use strict";

    var Backbone     = require("backbone"),
        $            = require("jquery"),
        _            = require("underscore"),
        AccountModel = require("models/AccountModel");

    return Backbone.Collection.extend({
        model: AccountModel,
        fetch: function (options) {
            options = options || {};
            options.success = options.success || function () {};
            options.error   = options.error   || function () {};

            _.forEach(this.models, function (model) {
                model.fetch();
            });
        }
    });
});