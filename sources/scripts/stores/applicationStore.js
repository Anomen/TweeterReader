define(function (require) {
    var ApplicationModel = require("models/ApplicationModel"),
        application = new ApplicationModel({id: "app"});

    application.fetch();

    return application;
});