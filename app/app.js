/*
 * app.js
 *
 * Initialize the main Router, Backbone History, and Regions.
 */
define([
    'jquery', 'backbone', 'marionette', 'handlebars', 'routers/appRouter', 'controllers/appController'
], function ($, Backbone, Marionette, Handlebars, AppRouter, AppController) {

        var App = Marionette.Application.extend({});

        var app = new App();

        app.on('start', function () {

            this.controller = new AppController({vent: this.vent, user: this.user});

            this.router = new AppRouter({controller: this.controller});

            Backbone.history.start();

            console.log('Cell Automation app started');
        });

        // Override TemplateCache.loadTemplate to retrieve templates from server
        Marionette.TemplateCache.prototype.loadTemplate = function (templateId) {
            //jshint unused:false
            var template;
            $.ajax({
                url: './app/templates/' + templateId + '.handlebars',
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

        return app;
    }
);
