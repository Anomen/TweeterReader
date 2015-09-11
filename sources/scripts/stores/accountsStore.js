/**
 * This store creates a storage space to store the accounts information. It's
 * a unique instance of AccountCollection, shared across the entire application.
 * It first loads what is stored in the localStorage to set the values.
 */
define(function (require) {
    var AccountsCollection = require("collections/AccountsCollection"),
        accounts = new AccountsCollection();

    accounts.fetch({
        success: function () {
            if (accounts.length < 3) {
                // Default accounts
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