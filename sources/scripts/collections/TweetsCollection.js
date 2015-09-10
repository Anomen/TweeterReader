define(function (require) {
    "use strict";

    var Backbone   = require("backbone"),
        $          = require("jquery"),
        _          = require("underscore"),
        TweetModel = require("models/TweetModel");

    return Backbone.Collection.extend({
        account: null,
        model: TweetModel,
        url: function () {
            return "/twitter_server.php?url=" + encodeURIComponent("statuses/user_timeline.json?screen_name=" + this.account.get("username"));
        },
        parse: function (response) {
            if (response.error || response.errors || !_.isArray(response)) {
                this.trigger("error", response.error || (response.errors && response.errors[0].message) || "An error occurred. Please retry with a different username.");
                return [];
            }
            else {
                return response;
            }
        },
        initialize: function (models, options) {
            this.account = options.account;
        }
    });
});