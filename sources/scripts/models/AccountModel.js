/**
 * The model of an account. It holds all the parameters to render the list of tweets.
 * @see http://backbonejs.org/#Model
 */
define(function (require) {
    "use strict";

    var Backbone         = require("backbone"),
        TweetsCollection = require("collections/TweetsCollection"),
        _                = require("underscore");

    return Backbone.Model.extend({
        // This collection is not part of the "defaults" and attributes
        // (in Backbone sense), because it should not be save when calling
        // AccountModel#save().
        tweets: null,

        defaults: {
            username: null,
            numberOfTweets: 25,
            from: null,
            to: null,
            position: 0
        },

        /**
         * Constructor: creates new tweet collection attached to this account.
         */
        initialize: function () {
            this.tweets = new TweetsCollection([], { account: this });
            this.on("change:username", this._resetTweets, this);
        },
        destroy: function () {
            this.off("change:username", this._resetTweets, this);
        },

        /**
         * Validator of the attributes, called automatically by Backbone.
         * @param {Object} attrs The attributes that should be set and to be validated.
         * @returns {Object|Boolean} If there are errors, an object is returned.
         */
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

        /**
         * Reset the tweet collections.
         * @private
         */
        _resetTweets: function () {
            this.tweets.reset(null);
        }
    });
});