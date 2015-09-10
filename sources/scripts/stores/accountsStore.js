define(function (require) {
    var AccountsCollection = require("collections/AccountsCollection"),
        accounts = new AccountsCollection();

    accounts.fetch({
        success: function () {
            debugger;
            if (accounts.length < 3) {
                accounts.reset([{
                    username: "AppDirect"
                }, {
                    username: "laughingsquid"
                }, {
                    username: "techcrunch"
                }]);
            }
        }
    });

    return accounts;
});