
/*
 * main.js
 *
 * Configure require.js and launch the app
 */
require.config({

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
        algorithms: 'app/scripts/algorithms'
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
        }
    }
});

// Launch Marionette application
require(['app/app'], function(CellAutoApp){
    $(function() {
        window.CellAutoApp = CellAutoApp;
        CellAutoApp.start();
    });
});
