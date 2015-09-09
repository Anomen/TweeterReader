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
        initialize: function () {
            this._changeEditMode();
        },
        _redirectHomepage: function () {
            document.location.hash = "/";
        },
        _redirectSettings: function () {
            document.location.hash = "/settings";
        },
        _changeEditMode: function () {
            if (this.model.get("isEditMode") === true) {
                this._enterEditMode();
            }
            else {
                this._leaveEditMode();
            }
        },
        _enterEditMode: function () {
            $("body").addClass("editMode");
            $(this.ui.checkbox).prop("checked", true);
        },
        _leaveEditMode: function () {
            $("body").removeClass("editMode");
            $(this.ui.checkbox).prop("checked", false);

            // Save theme
            this.model.set("theme", $(this.ui.theme).find("option:selected").val());
        },
        _changeTheme: function () {
            $("body").removeClass("default");
            $("body").removeClass("dark-theme");
            $("body").addClass(this.model.get("theme"));
        }
    });
});