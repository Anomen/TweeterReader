/**
 * The settings of the overall application, saved in localStorage.
 * @see http://backbonejs.org/#Model
 */
define(function (require) {
    "use strict";

    var Backbone = require("backbone"),
        LocalStorage = require("localstorage");

    return Backbone.Model.extend({
        localStorage: new LocalStorage("Application"),
        defaults: {
            theme: "default",
            isEditMode: false
        }
    });
});
