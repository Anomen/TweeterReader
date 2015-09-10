define(function (require) {
    "use strict";

    var Marionette  = require("marionette"),
        $           = require("jquery"),
        AccountItem = require("views/AccountItem");

    return Marionette.CollectionView.extend({
        childView: AccountItem,
        className: "twitter-reader account list",
        initialize: function () {
            this.collection.forEach(function (account) {
                account.tweets.fetch();
            });
        },
        onRender: function () {
            var _this = this;

            this.$el.sortable({
                handle: ".handle",
                distance: 50,
                revert: true,
                update: function () {
                    var position = 0;

                    // Recalculate positions
                    _.forEach(_this.$el.children(), function (el) {
                        var cid = $(el).attr("data-id"),
                            account = _this.collection.get(cid);

                        if (account) {
                            account.set("position", position);
                            account.save();
                            position++;
                        }
                    });
                }
            });

            this.$el.disableSelection();
        }
    });
});