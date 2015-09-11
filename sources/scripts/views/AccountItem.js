/**
 * This view is a column of an account in the interface. It is the representation
 * of an AccountModel model, which loads the tweets.
 * For more information about the attributes, please look at Marionette documentation.
 * @see http://marionettejs.com/docs/v2.4.2/marionette.compositeview.html
 */
define(function (require) {
    "use strict";

    var Marionette       = require("marionette"),
        _                = require("underscore"),
        $                = require("jquery"),
        applicationStore = require("stores/applicationStore"),
        TweetItem        = require("views/TweetItem"),
        template         = require("text!./templates/AccountItem.tpl");

    require("jqueryui");

    return Marionette.CompositeView.extend({
        template: _.template(template),
        childViewContainer: ".twitter-reader.content",
        childView: TweetItem,
        className: "twitter-reader account item",

        // Custom attribute that will be used for sorting the accounts
        attributes: function () {
            return {
                "data-id": this.model.cid
            };
        },

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

        /**
         * This function, called after the constructor, reacts on the editMode to display
         * the settings, and attach the tweet collections to display the tweets.
         */
        initialize: function () {
            this.listenTo(applicationStore, "change:isEditMode", this._changeEditMode);

            this.collection = this.model.tweets;

            this.listenTo(this.collection, "request", this._startLoading);
            this.listenTo(this.collection, "sync", this._stopLoading);
            this.listenTo(this.collection, "error", this._errorLoading);
        },

        /**
         * Fetches the tweets using the Twitter API.
         * @private
         */
        _fetch: function () {
            this.model.tweets.fetch();
        },

        /**
         * Display the loading spinner.
         * @private
         */
        _startLoading: function () {
            this.ui.error.hide();
            this.ui.loading.show();
        },

        /**
         * Hide the loading spinner.
         * @private
         */
        _stopLoading: function () {
            this.ui.loading.hide();
        },

        /**
         * Display the error coming from a failure when loading the tweets.
         * @param {String} error The error the will be displayed.
         * @private
         */
        _errorLoading: function (error) {
            this.ui.error.show();
            this.ui.error.html("Error: " + error);
            this.ui.loading.hide();
        },

        /**
         * When the editMode is enabled, we display the settings (using CSS),
         * and when it turns false, we save the new values in the Account model.
         * @private
         */
        _changeEditMode: function () {
            if (applicationStore.get("isEditMode") === false) {
                // Sets the new values with validation.
                this.model.set({
                    username: this.ui.username.val(),
                    numberOfTweets: parseInt(this.ui.numberOfTweets.val()),
                    from: this.ui.from.val() || null,
                    to: this.ui.to.val() || null
                }, {
                    validate: true
                });

                // If there is no error and there are new values, we re-render the interface.
                if (!this.model.validationError && _.size(this.model.changed)) {
                    this.render();
                }

                // If there are errors, we display them in the error box in the UI.
                else if (this.model.validationError) {
                    this.ui.error.show();
                    this.ui.error.html("Error: " + _.map(this.model.validationError, function (error, field) {
                        return field + " (" + error + ")";
                    }).join(" ; "));
                }

                // We save the model in localStorage anyway.
                this.model.save();
            }
        },

        /**
         * This method is called when the UI is rendered. It attaches the datepicker.
         */
        onRender: function () {
            var _this = this;

            this.ui.from.datepicker({
                defaultDate: "+1w",
                dateFormat: "yy-mm-dd",
                onClose: function (selectedDate) {
                    _this.ui.to.datepicker("option", "minDate", selectedDate);
                }
            });

            this.ui.to.datepicker({
                defaultDate: "+1w",
                dateFormat: "yy-mm-dd",
                onClose: function (selectedDate) {
                    _this.ui.from.datepicker("option", "maxDate", selectedDate);
                }
            });
        },

        /**
         * This method is called when the UI is destroyed: we need to release the datepicker.
         */
        onBeforeDestroy: function () {
            this.ui.from.datepicker("destroy");
            this.ui.to.datepicker("destroy");
        }
    });
});