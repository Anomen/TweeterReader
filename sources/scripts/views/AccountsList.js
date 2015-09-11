/**
 * This view renders a collection of Accounts, basically the three columns
 * in this program.
 * For more information about the attributes, please look at Marionette documentation.
 * @see http://marionettejs.com/docs/v2.4.2/marionette.compositeview.html
 */
define(function (require) {
    "use strict";

    var Marionette  = require("marionette"),
        $           = require("jquery"),
        AccountItem = require("views/AccountItem");

    return Marionette.CollectionView.extend({
        childView: AccountItem,
        className: "twitter-reader account list",

        /**
         * This method is called after the constructor of this class, and
         * loads the tweets from all the accounts of the collection.
         */
        initialize: function () {
            // .
            this.collection.forEach(function (account) {
                account.tweets.fetch();
            });
        },

        /**
         * When the view is rendered, we enable the sorting.
         */
        onRender: function () {
            var _this = this;

            this.$el.sortable({
                handle: ".handle",
                distance: 50,
                revert: true,
                update: function () {
                    var position = 0;

                    // Recalculate positions: for each HTML children, we retrieve
                    // the data-id attribute, which will help us find the model, and
                    // we set the new position. Then, we save in the localStorage.
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
        },

        /**
         * Destroy the sorting when the view goes away.
         */
        onBeforeDestroy: function () {
            this.$el.sortable("destroy");
        }
    });
});