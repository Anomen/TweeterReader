define(function (require) {
    "use strict";

    var Backbone = require("backbone"),
        TweetsCollection = require("collections/TweetsCollection"),
        $        = require("jquery"),
        _        = require("underscore");

    return Backbone.Model.extend({
        defaults: {
            username: null,
            tweets: null
        },
        initialize: function () {
            this.set("tweets", new TweetsCollection());
        },
        fetch: function () {
            var _this = this;

            $.ajax({
                url: "/twitter_server.php?url=" + encodeURIComponent("statuses/user_timeline.json?screen_name=" + this.get("username")),
                success: function (response) {
                    _this.get("tweets").reset(response);
                }
                // @TODO: error callback
            });
        }
    });
});