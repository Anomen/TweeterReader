/**
 * The Settings part of the application, based on the ApplicationModel.
 * @see http://marionettejs.com/docs/v2.4.2/marionette.itemview.html
 */
define(function (require) {
    "use strict";

    var Marionette = require("marionette"),
        _          = require("underscore"),
        $          = require("jquery"),
        template   = require("text!./templates/SettingsView.tpl");

    return Marionette.ItemView.extend({
        template: _.template(template),
        className: "twitter-reader settings",

        ui: {
            checkbox: "input[type=checkbox]",
            theme: "select"
        },

        events: {
            "click input[type=checkbox]:checked + label": "_redirectHomepage",
            "click input[type=checkbox]:not(:checked) + label": "_redirectSettings"
        },

        modelEvents: {
            "change:isEditMode": "_changeEditMode",
            "change:theme": "_changeTheme"
        },

        /**
         * After constructing the view, it loads the right theme.
         */
        initialize: function () {
            this._changeTheme();
        },

        /**
         * Redirects the user to the homepage.
         * @private
         */
        _redirectHomepage: function () {
            document.location.hash = "/";
        },

        /**
         * Redirects the user to the settings page.
         * @private
         */
        _redirectSettings: function () {
            document.location.hash = "/settings";
        },

        /**
         * When the user changes the view mode (edit or not), it triggers
         * to enter or leave the edit mode.
         * @private
         */
        _changeEditMode: function () {
            if (this.model.get("isEditMode") === true) {
                this._enterEditMode();
            }
            else {
                this._leaveEditMode();
            }
        },

        /**
         * When getting to the editMode, it adds a className to the body, and
         * the CSS will display the right elements.
         * @private
         */
        _enterEditMode: function () {
            $("body").addClass("editMode");
            this.ui.checkbox.prop("checked", true);
        },

        /**
         * When leaving to the editMode, it removes a className from the body, and
         * the CSS will display the right elements.
         * @private
         */
        _leaveEditMode: function () {
            $("body").removeClass("editMode");
            this.ui.checkbox.prop("checked", false);

            // Save theme
            this.model.set("theme", this.ui.theme.find("option:selected").val());
            this.model.save();
        },

        /**
         * When the theme attribute changes, the class changes so that different
         * CSS can be loaded and change the visual.
         * @private
         */
        _changeTheme: function () {
            $("body").removeClass("default");
            $("body").removeClass("dark-theme");
            $("body").addClass(this.model.get("theme"));
        }
    });
});