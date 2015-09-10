define(function (require) {
    "use strict";

    var Backbone         = require("backbone"),
        TweetsCollection = require("collections/TweetsCollection"),
        _                = require("underscore");

    return Backbone.Model.extend({
        tweets: null,
        defaults: {
            username: null,
            numberOfTweets: 25,
            from: null,
            to: null,
            position: 0
        },
        initialize: function () {
            this.tweets = new TweetsCollection([], { account: this });
            this.on("change:username", this._resetTweets, this);
        },
        validate: function (attrs) {
            var errors = {};

            if (attrs.username && attrs.username.search(/^[0-9a-zA-Z]+$/) === -1) {
                errors.username = "Invalid entry.";
            }

            if (attrs.numberOfTweets && !_.isNumber(attrs.numberOfTweets)) {
                errors.numberOfTweets = "Invalid entry: it must be a number.";
            }

            /*
            if (attrs.from !== null) {
                errors.from = "Invalid date.";
            }

            if (attrs.to !== null) {
                errors.to = "Invalid date";
            }
            */

            return _.size(errors) > 0 ? errors : false;
        },
        _resetTweets: function () {
            this.tweets.reset(null);
        }
    });
});