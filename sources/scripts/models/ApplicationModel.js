define(function (require) {
    "use strict";

    var Backbone = require("backbone");

    return Backbone.Model.extend({
        defaults: {
            position: 0
        }
    });
});
