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
        attributes: function () {
            return {
                "data-id": this.model.cid
            };
        },
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
            "change:username": "_fetch",
            "change:from": "_fetch",
            "change:to": "_fetch",
            "change:numberOfTweets": "_fetch"
        },
        initialize: function () {
            this.listenTo(applicationStore, "change:isEditMode", this._changeEditMode);

            this.collection = this.model.tweets;

            this.listenTo(this.collection, "request", this._startLoading);
            this.listenTo(this.collection, "sync", this._stopLoading);
            this.listenTo(this.collection, "error", this._errorLoading);
        },
        _fetch: function () {
            this.model.tweets.fetch();
        },
        _startLoading: function () {
            $(this.ui.error).hide();
            $(this.ui.loading).show();
        },
        _stopLoading: function () {
            $(this.ui.loading).hide();
        },
        _errorLoading: function (error) {
            $(this.ui.error).show();
            $(this.ui.error).html("Error: " + error);
            $(this.ui.loading).hide();
        },
        _changeEditMode: function () {
            if (applicationStore.get("isEditMode") === false) {
                this.model.set({
                    username: $(this.ui.username).val(),
                    numberOfTweets: parseInt($(this.ui.numberOfTweets).val()),
                    from: $(this.ui.from).val() || null,
                    to: $(this.ui.to).val() || null
                }, {
                    validate: true
                });

                if (!this.model.validationError && _.size(this.model.changed)) {
                    this.render();
                }
                else if (this.model.validationError) {
                    $(this.ui.error).show();
                    $(this.ui.error).html("Error: " + _.map(this.model.validationError, function (error, field) {
                        return field + " (" + error + ")";
                    }).join(" ; "));
                }

                this.model.save();
            }
        },
        onRender: function () {
            var _this = this;

            $(this.ui.from).datepicker({
                defaultDate: "+1w",
                dateFormat: "yy-mm-dd",
                onClose: function (selectedDate) {
                    $(_this.ui.to).datepicker("option", "minDate", selectedDate);
                }
            });
            $(this.ui.to).datepicker({
                defaultDate: "+1w",
                dateFormat: "yy-mm-dd",
                onClose: function (selectedDate) {
                    $(_this.ui.from).datepicker("option", "maxDate", selectedDate);
                }
            });
        }
    });
});