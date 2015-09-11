/**
 * This class is used to render only one tweet.
 * @see http://marionettejs.com/docs/v2.4.2/marionette.itemview.html
 */
define(function (require) {
    "use strict";

    var Marionette = require("marionette"),
        _          = require("underscore"),
        template   = require("text!./templates/TweetItem.tpl");

    return Marionette.ItemView.extend({
        template: _.template(template),
        className: "twitter-reader tweet card",

        events: {
            click: "_onClick"
        },

        /**
         * When clicking on the element, we redirect the user to twitter.
         * @private
         */
        _onClick: function () {
            document.location = "https://twitter.com/" + this.model.get("account") + "/status/" + this.model.get("id");
        }
    });
});