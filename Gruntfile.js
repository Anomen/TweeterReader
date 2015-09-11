/*global module*/
var glob = require("glob"),
    serveStatic = require("serve-static");

module.exports = function (grunt) {
    "use strict";

    /**
     * This middleware is used to easily list all the tests and give
     * an array of tests to require in mocha.
     */
    var middlewareTestFiles = function (req, res, next) {
            if (req.url === "/testfiles") {
                glob("**/*Test.js", { cwd: "tests" }, function (err, files) {
                    res.end("define(function(){ return " + JSON.stringify(files) + " });");
                });
            }
            else {
                next();
            }
        },
        middlewareProxies      = require("grunt-connect-proxy/lib/utils").proxyRequest,
        middlewareTestFolder   = serveStatic(__dirname + "/tests"),
        middlewareSourceFolder = serveStatic(__dirname + "/sources");

    grunt.initConfig({
        watch: {
            dev: {
                files: ["sources/**/*.scss"],
                tasks: ["sass:dev"],
                options: {
                    atBegin: true,
                    spawn: false
                }
            }
        },
        sass: {
            options: {
                compass: true,
                loadPath: [
                    "bower_components/breakpoint-sass/stylesheets"
                ]
            },
            dev: {
                src: ["sources/styles/main.scss"],
                dest: "sources/styles/main.css"
            },
            dist: {
                src: ["sources/styles/main.scss"],
                dest: "dist/styles/main.css"
            }
        },
        connect: {
            testHeadless: {
                options: {
                    port: 8082,
                    keepalive: false,
                    middleware: [middlewareProxies, middlewareTestFiles, middlewareTestFolder, middlewareSourceFolder]
                }
            },
            testBrowser: {
                options: {
                    port: 8081,
                    keepalive: true,
                    middleware: [middlewareProxies, middlewareTestFiles, middlewareTestFolder, middlewareSourceFolder]
                }
            },
            dev: {
                options: {
                    port: 9001,
                    base: "sources",
                    middleware: [middlewareProxies, middlewareSourceFolder]
                }
            },
            dist: {
                options: {
                    port: 9002,
                    base: "dist",
                    keepalive: true,
                    middleware: [middlewareProxies, middlewareSourceFolder]
                }
            },
            proxies: [{
                context: "/twitter_server.php",
                host: "localhost",
                port: 80
            }]
        },
        requirejs: {
            dist: {
                options: {
                    findNestedDependencies: true,
                    baseUrl: "sources/scripts",
                    mainConfigFile: "sources/scripts/config.js",
                    name: "app",
                    out: "dist/scripts/config.js",
                    optimize: "uglify",
                    wrap: {
                        endFile: "end.frag"
                    }
                }
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    src: [
                        "images/**",
                        "libraries/jquery-ui/themes/base/**/*.css",
                        "libraries/jquery-ui/themes/base/**/*.png",
                        "libraries/requirejs/require.js",
                        "index.html"
                    ],
                    cwd: "sources/",
                    dest: "dist"
                }]
            }
        },
        clean: {
            build: {
                src: ["dist"]
            }
        },
        mocha_phantomjs: {
            testSpec: {
                options: {
                    log: true,
                    urls: ["http://localhost:8082/runner.html"]
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-connect-proxy");
    grunt.loadNpmTasks("grunt-contrib-requirejs");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-mocha-phantomjs");

    // Default task.
    grunt.registerTask("default", ["server-dev"]);
    grunt.registerTask("build", ["clean", "requirejs", "copy", "sass:dist"]);

    grunt.registerTask("server-dev", ["configureProxies:server", "connect:dev", "watch:dev"]);
    grunt.registerTask("server-dist", ["configureProxies:server", "connect:dist"]);

    grunt.registerTask("test-browser", ["configureProxies:testBrowser", "connect:testBrowser"]);
    grunt.registerTask("test-headless", ["configureProxies:testHeadless", "connect:testHeadless", "mocha_phantomjs:testSpec"]);
    grunt.registerTask("test", ["test-headless"]);

};