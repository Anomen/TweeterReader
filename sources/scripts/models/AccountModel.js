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
                    var tweets = _.map(response, function(res) {
                        var isRetweeted = !!res.retweeted_status,
                            userInfo = isRetweeted ? res.retweeted_status.user : res.user;

                        return {
                            content: res.text,
                            createdAt: new Date(res.created_at),
                            id: res.id,
                            userName: userInfo.name,
                            userAvatar: userInfo.profile_image_url,
                            isRetweeted: isRetweeted
                        };
                    });

                    _this.get("tweets").reset(tweets);
                }
                // @TODO: error callback
            });
        }
    });
});