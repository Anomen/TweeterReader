/*global module*/
module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        watch: {
            scripts: {
                files: ["sources/**/*.scss"],
                tasks: ["concat", "sass"],
                options: {
                    atBegin: true,
                    spawn: false
                }
            }
        },
        sass: {
            dist: {
                options: {
                    compass: true,
                    loadPath: [
                        "bower_components/breakpoint-sass/stylesheets"
                    ]
                },
                files: {
                    "dist/styles/main.css": "dist/styles/main.scss"
                }
            }
        },
        concat: {
            css: {
                src: ["sources/styles/*.scss"],
                dest: "dist/styles/main.scss"
            }
        },
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: "sources",
                    middleware: function (connect, options, defaultMiddleware) {
                        var proxy = require("grunt-connect-proxy/lib/utils").proxyRequest;
                        return [
                            // Include the proxy first
                            proxy
                        ].concat(defaultMiddleware);
                    }
                },
                proxies: [{
                    context: "/twitter_server.php",
                    host: "localhost",
                    port: 80
                }]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-connect-proxy");
    grunt.loadNpmTasks("grunt-contrib-concat");

    // Default task.
    grunt.registerTask("default", ["configureProxies:server", "connect", "watch"]);

};