/**
 * This store creates a storage space to store the application information. It's
 * a unique instance of ApplicationModel, shared across the entire application.
 * It first loads what is stored in the localStorage to set the values.
 */
define(function (require) {
    var ApplicationModel = require("models/ApplicationModel"),
        application = new ApplicationModel({id: "app"});

    application.fetch();

    return application;
});