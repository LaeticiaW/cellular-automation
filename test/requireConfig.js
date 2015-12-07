/*
 * require.js configuration
 */

require.config({

    baseUrl: '../',

    paths: {
        jquery: 'app/lib/jquery-2.1.4.min',
        underscore: 'app/lib/underscore-1.8.3.min',
        backbone: 'app/lib/backbone-1.1.2.min',
        marionette: 'app/lib/backbone.marionette-2.4.2.min',
        handlebars: 'app/lib/handlebars-3.0.3',
        bootstrap: 'app/lib/bootstrap-3.3.5.min',
        bootstrapNotify: 'app/lib/bootstrap-notify.min',
        routers: 'app/scripts/routers',
        controllers: 'app/scripts/controllers',
        views: 'app/scripts/views',
        util: 'app/scripts/util',
        algorithms: 'app/scripts/algorithms',
        'jasmine-html': 'app/lib/jasmine-1.3.1/jasmine-html',
        'jasmine-sinon': 'app/lib/jasmine-1.3.1/jasmine-sinon',
        'sinon': 'app/lib/jasmine-1.3.1/sinon-1.7.1',
        'specHelper': 'test/specHelper',
        'app': 'app/app'
    },

    shim: {
        jquery: {
            exports: '$'
        },
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },
        marionette: {
            deps: ['jquery', 'underscore', 'backbone'],
            exports: 'Marionette'
        },
        handlebars: {
            exports: "Handlebars"
        },
        bootstrap: {
            deps: ['jquery']
        },
        bootstrapNotify: {
            deps: ['bootstrap']
        },
        sinon: {
            exports: 'sinon'
        },
        'jasmine-sinon': {
            exports: 'jasmine-sinon'
        }
    },

    deps: ['specHelper']
});


require([
    'jquery', 'jasmine-html', 'sinon', 'app/app', 'spec-helper', 'marionette', 'handlebars'
], function ($, Jasmine, Sinon, APP, Marionette, Handlebars) {

    // Override TemplateCache.loadTemplate to retrieve not from DOM but from remote source
    Marionette.TemplateCache.prototype.loadTemplate = function (templateId) {

        var template;
        $.ajax({
            url: 'templates/' + templateId + '.handlebars',
            async: false
        }).done(function (data, textStatus, jqXHR) {
                template = data;
        }).fail(function (jqXHR, textStatus, errorThrown) {
            throw errorThrown;
        });
        return template;
    };

    // Override TemplateCache.compileTemplate to use Handlebars instead of Underscore
    Marionette.TemplateCache.prototype.compileTemplate = function (template) {
        return Handlebars.compile(template);
    };
});

