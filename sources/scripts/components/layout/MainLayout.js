define(function (require) {
    "use strict";

    var Marionette = require("marionette"),
        _          = require("underscore"),
        template   = require("text!./MainLayout.tpl");

    return Marionette.LayoutView.extend({
        template: _.template(template),

        regions: {
            header: "#header",
            content: "#content"
        }
    });
});