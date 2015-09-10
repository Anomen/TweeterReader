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
            return "/twitter_server.php?url=" +
                encodeURIComponent("search/tweets.json?q=" +
                        encodeURIComponent(
                            "@" + this.account.get("username") +
                            (this.account.get("from") ? " since:" + this.account.get("from") : "") +
                            (this.account.get("to") ? " until:" + this.account.get("to") : "")
                        ) +
                        "&count=" + this.account.get("numberOfTweets"));
        },
        parse: function (response) {
            if (response.error || response.errors || !response.statuses || !response.statuses.length) {
                this.trigger("error", response.error || (response.errors && response.errors[0].message) || "No tweets matching this query.");
                return [];
            }
            else {
                return response.statuses;
            }
        },
        initialize: function (models, options) {
            this.account = options.account;
        }
    });
});