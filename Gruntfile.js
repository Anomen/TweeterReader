/*global module*/
module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        watch: {
            scripts: {
                files: ["sources/**/*.scss"],
                tasks: ["sass"],
                options: {
                    atBegin: true,
                    spawn: false
                }
            }
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: "sources/styles",
                    src: ["*.scss"],
                    dest: "dist/styles",
                    ext: ".css"
                }]
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
    grunt.loadNpmTasks('grunt-connect-proxy');

    // Default task.
    grunt.registerTask("default", ["configureProxies:server", "connect", "watch"]);

};