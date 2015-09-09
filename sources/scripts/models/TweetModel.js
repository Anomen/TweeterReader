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