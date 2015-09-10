/*global module*/
module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        watch: {
            scripts: {
                files: ["sources/**/*.scss"],
                tasks: ["concat", "sass:dev"],
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
                files: {
                    "sources/styles/main.css": "sources/styles/.main.scss"
                }
            },
            dist: {
                files: {
                    "dist/styles/main.css": "sources/styles/.main.scss"
                }
            }
        },
        concat: {
            css: {
                src: ["sources/styles/*.scss"],
                dest: "sources/styles/.main.scss"
            }
        },
        connect: {
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
            }],
            dev: {
                options: {
                    port: 9001,
                    base: "sources"
                }
            },
            dist: {
                options: {
                    port: 9002,
                    base: "dist",
                    keepalive: true
                }
            }
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
                        "libraries/jquery-ui/**/*.css",
                        "libraries/jquery-ui/**/*.png",
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
        }
    });

    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-connect-proxy");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-requirejs");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");

    // Default task.
    grunt.registerTask("default", ["configureProxies:server", "connect:dev", "watch"]);
    grunt.registerTask("build", ["clean", "requirejs", "copy", "concat", "sass:dist"]);
    grunt.registerTask("dist", ["configureProxies:server", "connect:dist"]);

};