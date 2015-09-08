define(function (require) {
    var AccountsCollection = require("collections/AccountsCollection");

    return new AccountsCollection([{
        username: "AppDirect"
    }, {
        username: "laughingsquid"
    }, {
        username: "techcrunch"
    }]);
});