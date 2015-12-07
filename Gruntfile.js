module.exports = function (grunt) {

    grunt.initConfig({

        connect: {
            run : {
                port : 8000
            }
        },

        jasmine: {
            run: {
                src: '../../app/scripts/**/**',
                options: {
                    host: 'http://127.0.0.1:8000',
                    baseUrl: '../../app',
                    specs: 'test/specs/*Spec.js',
                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                        requireConfigFile: 'test/requireConfig.js',
                    }
                }
            }
        },

        jshint: {
            files: ['app/scripts/**/*.js'],
            options: {
                jshintrc: 'jshintrc'
            },
        },

        jscs: {
                src: "app/scripts/**/*.js",
                options: {
                   //reporter: 'checkstyle',
                   requireSpaceAfterKeywords: [ "if", "else", "for", "while", "do", "switch", "return", "try" ],
                   requireSpacesInFunctionExpression: {beforeOpeningCurlyBrace: true},
                   requireSpacesInAnonymousFunctionExpression: {beforeOpeningCurlyBrace: true},
                   disallowSpacesInsideParentheses: true,
                   requireSpaceBeforeBinaryOperators: ["+", "-", "/", "*", "=", "==", "===", "!=", "!=="],
                   requireSpaceAfterBinaryOperators: ["+", "-", "/", "*", "=", "==", "===", "!=", "!=="]
                   // not released yet: requireSpaceBeforeBlockStatements: true
                }
        }
    });

    // Load tasks so we can use them
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks( "grunt-jscs-checker" );

    // The default task will show the usage
    grunt.registerTask("default", "Prints usage", function () {
        grunt.log.writeln("");
        grunt.log.writeln("K12 - CP30 front-end development");
        grunt.log.writeln("--------------------------------");
        grunt.log.writeln("");
        grunt.log.writeln("* run 'grunt --help' to get an overview of all commands.");
        grunt.log.writeln("* run 'grunt dev' to build while developing.");
    });

    // This task runs jshint, jscs, and jasmine tests
    grunt.registerTask("test", ["jshint", "jscs", "connect:run", "jasmine:run"]);
};
