define(function (require) {
    "use strict";

    var Marionette = require("marionette"),
        _          = require("underscore"),
        template   = require("text!./templates/TweetItem.tpl");

    return Marionette.ItemView.extend({
        template: _.template(template),
        className: "twitter-reader tweet card"
    });
});