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
        parse: function (res) {
            var isRetweeted = !!res.retweeted_status,
                userInfo    = isRetweeted ? res.retweeted_status.user : res.user;

            return {
                content: res.text,
                createdAt: new Date(res.created_at),
                id: res.id,
                userName: userInfo.name,
                userAvatar: userInfo.profile_image_url,
                isRetweeted: isRetweeted
            };
        },
        initialize: function () {
            this.on("change:createdAt", this._computeCreatedAt, this);

            // Call it when constructing the object.
            this._computeCreatedAt();
        },
        destroy: function () {
            this.off("change:createdAt", this._computeCreatedAt, this);
        },
        _computeCreatedAt: function () {
            this.set("formattedCreatedAt", moment(this.get("createdAt")).format("lll"));
        }
    });
});