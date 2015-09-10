/*global describe, it, beforeEach, sinon, expect*/
define(function (require) {
    "use strict";

    var AccountModel = require("models/AccountModel"),
        TweetsCollection = require("collections/TweetsCollection");

    describe("In the AccountModel", function () {
        var account = null;

        beforeEach(function () {
            account = new AccountModel();
        });

        describe("#initialize()", function () {
            it("should create a new collection of tweets", function () {
                expect(account.tweets).to.be.an.instanceof(TweetsCollection);
                expect(account.tweets.account).to.equal(account);
            });
        });

        describe("#validate()", function () {
            it("should return an error with one bad parameter", function () {
                expect(account.validate({ username: "ééé" })).to.include.keys("username");
                expect(account.validate({ username: "'''" })).to.include.keys("username");
                expect(account.validate({ numberOfTweets: "123" })).to.include.keys("numberOfTweets");
            });

            it("should return an error with multiple bad parameters", function () {
                expect(account.validate({
                    username: "ééé",
                    numberOfTweets: "abc"
                })).to.include.keys("username", "numberOfTweets");
            });

            it("should return false if threre is no error", function () {
                expect(account.validate({ username: "foobar" })).to.equal(false);
                expect(account.validate({ numberOfTweets: 10 })).to.equal(false);

                expect(account.validate({
                    username: "foobar",
                    numberOfTweets: 10
                })).to.equal(false);
            });
        });

        describe("#_resetTweets()", function () {
            it("should reset the tweets collection", function () {
                sinon.stub(account.tweets, "reset");
                account._resetTweets();
                sinon.assert.calledOnce(account.tweets.reset);
            });
        });
    });
});