define(function (require) {
    "use strict";

    var Marionette = require("marionette"),
        _          = require("underscore"),
        $          = require("jquery"),
        applicationStore = require("stores/applicationStore"),
        TweetItem  = require("views/TweetItem"),
        template   = require("text!./templates/AccountItem.tpl");

    require("jqueryui");

    return Marionette.CompositeView.extend({
        template: _.template(template),
        className: "twitter-reader account item",
        childViewContainer: ".twitter-reader.content",
        childView: TweetItem,
        ui: {
            error: ".error",
            loading: ".loading",
            from: "[name=from]",
            to: "[name=to]",
            username: "[name=username]",
            numberOfTweets: "[name=numberOfTweets]"
        },
        modelEvents: {
            loading: "_startLoading",
            success: "_stopLoading",
            error: "_stopLoading",
            change: "_fetch"
        },
        initialize: function () {
            this.collection = this.model.get("tweets");
            // @TODO: unbind!!
            this.listenTo(applicationStore, "change:isEditMode", this._changeEditMode);
        },
        _fetch: function () {
            this.model.fetch();
        },
        _startLoading: function () {
            $(this.ui.loading).show();
        },
        _stopLoading: function (error) {
            if (error) {
                $(this.ui.error).show();
                $(this.ui.error).html("Error: " + error);
            }
            else {
                $(this.ui.error).hide();
            }

            $(this.ui.loading).hide();
        },
        _changeEditMode: function () {
            if (applicationStore.get("isEditMode") === false) {
                this.model.set({
                    username: $(this.ui.username).val(),
                    numberOfTweets: parseInt($(this.ui.numberOfTweets).val()),
                    from: $(this.ui.from).val() || null,
                    to: $(this.ui.to).val() || null
                });

                if (_.size(this.model.changed)) {
                    this.render();
                }
            }
        },
        onRender: function () {
            var _this = this;

            $(this.ui.from).datepicker({
                defaultDate: "+1w",
                onClose: function (selectedDate) {
                    $(_this.ui.to).datepicker("option", "minDate", selectedDate);
                }
            });
            $(this.ui.to).datepicker({
                defaultDate: "+1w",
                onClose: function(selectedDate) {
                    $(_this.ui.from).datepicker("option", "maxDate", selectedDate);
                }
            });
        }
    });
});