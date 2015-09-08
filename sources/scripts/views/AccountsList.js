define(function (require) {
    "use strict";

    var Marionette  = require("marionette"),
        AccountItem = require("views/AccountItem");

    return Marionette.CollectionView.extend({
        childView: AccountItem,
        initialize: function () {
            this.collection.fetch();
        }
    });
});