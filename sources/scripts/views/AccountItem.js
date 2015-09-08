define(function (require) {
    "use strict";

    var Marionette = require("marionette"),
        _          = require("underscore"),
        TweetItem  = require("views/TweetItem"),
        template   = require("text!./templates/AccountItem.tpl");

    return Marionette.CompositeView.extend({
        template: _.template(template),
        childViewContainer: "ol",
        childView: TweetItem,
        initialize: function () {
            this.collection = this.model.get("tweets");
        }
    });
});