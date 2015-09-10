define(function (require) {
    "use strict";

    var Marionette  = require("marionette"),
        AccountItem = require("views/AccountItem");

    return Marionette.CollectionView.extend({
        childView: AccountItem,
        className: "twitter-reader account list",
        initialize: function () {
            this.collection.forEach(function (account) {
                account.tweets.fetch();
            });
        }
    });
});