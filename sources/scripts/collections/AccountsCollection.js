/**
 * The collection of AccountModel.
 * @see http://backbonejs.org/#Collection for the attribute details.
 */
define(function (require) {
    "use strict";

    var Backbone     = require("backbone"),
        LocalStorage = require("localstorage"),
        AccountModel = require("models/AccountModel");

    return Backbone.Collection.extend({
        model: AccountModel,
        comparator: "position",
        localStorage: new LocalStorage("Accounts")
    });
});