/**
 * The collection of TweetModel.
 * @see http://backbonejs.org/#Collection for the attribute details.
 */
define(function (require) {
    "use strict";

    var Backbone   = require("backbone"),
        TweetModel = require("models/TweetModel");

    return Backbone.Collection.extend({
        account: null,
        model: TweetModel,

        /**
         * Generated url to use when fetching data. It uses the account attributes.
         * @returns {string} The url to fetch
         */
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

        /**
         * This method is automatically called by Backbone after a fetch. If there is an error,
         * we trigger an "error" event to be catched.
         * @param {Object} response The response from the server after a #fetch()
         * @returns {Array} The array that will be used to create the models of this collection.
         */
        parse: function (response) {
            if (response.error || response.errors || !response.statuses || !response.statuses.length) {
                this.trigger("error", response.error || (response.errors && response.errors[0].message) || "No tweets matching this query.");
                return [];
            }
            else {
                return response.statuses;
            }
        },

        /**
         * The contructor that will set the account, to be used to generate the url.
         * @param {TweetModel[]} models The array of models to fill this collection.
         * @param {Object} options The options to pass along with the collection.
         */
        initialize: function (models, options) {
            if (!options || !options.account) {
                throw new Error ("You need to pass the account in TweetsCollection#initialize().");
            }

            this.account = options.account;
        }
    });
});