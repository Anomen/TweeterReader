/**
 * The model of a tweet.
 * @see http://backbonejs.org/#Model
 */
define(function (require) {
    "use strict";

    var Backbone = require("backbone"),
        moment   = require("moment");

    return Backbone.Model.extend({
        defaults: {
            id: null,
            content: null,
            createdAt: null,
            formattedCreatedAt: null,
            userName: null,
            userAvatar: null,
            isRetweeted: false
        },

        /**
         * This method is called automatically by backbone when the collection#fetch()
         * is called: it matches the result from Twitter API and this model attributes.
         * @param {Object} res The result from Twitter API.
         * @returns {Object} The map values to match with the attributes.
         */
        parse: function (res) {
            var isRetweeted = !!res.retweeted_status,
                userInfo    = isRetweeted ? res.retweeted_status.user : res.user;

            return {
                content: res.text,
                createdAt: new Date(res.created_at),
                id: res.id_str,
                account: userInfo.screen_name,
                userName: userInfo.name,
                userAvatar: userInfo.profile_image_url,
                isRetweeted: isRetweeted
            };
        },

        /**
         * Constructor.
         */
        initialize: function () {
            this.on("change:createdAt", this._computeCreatedAt, this);

            // Call it when constructing the object.
            this._computeCreatedAt();
        },
        destroy: function () {
            this.off("change:createdAt", this._computeCreatedAt, this);
        },

        /**
         * When there is a new date, we save a formatted version of the date.
         * @private
         */
        _computeCreatedAt: function () {
            this.set("formattedCreatedAt", moment(this.get("createdAt")).format("lll"));
        }
    });
});