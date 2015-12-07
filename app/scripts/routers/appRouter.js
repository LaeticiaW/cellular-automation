/*
 * appRouter.js
 *
 * Router for the cellular automation app.
 */
define(
    [
        'marionette'
    ],
    function(Marionette) {

        return Marionette.AppRouter.extend({

            appRoutes: {
                '': 'showCellularAutomation'
            },

            initialize: function() {

                console.log('AppRouter: initialized');
            },

            error: function(splat) {

                console.log("Error for route: " + splat);
            }
        });
    });
