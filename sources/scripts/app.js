/**
 * This file is the bootstrap of the application: it initializes the different
 * regions, the routes
 */
define(function (require) {
    "use strict";

    var Marionette = require("marionette"),
        Backbone   = require("backbone"),
        $          = require("jquery"),
        MainLayout = require("views/MainLayout"),
        loadRoutes = require("./routes"),
        app        = new Marionette.Application();

    // Start history when our application is ready
    app.on("start", function () {
        // Define the main region and render it.
        app.rootView = new MainLayout();
        $("body").html(app.rootView.render().$el);

        // Show the different sections of the application
        app.rootView.showContent();
        app.rootView.showSettings();

        // Load the routers
        loadRoutes(app);

        // Start the Backbone application
        Backbone.history.start();
    });

    // Start the application
    app.start();
});