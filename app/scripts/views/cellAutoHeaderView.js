/*
 * cellAutoHeaderView.js
 *
 * This view displays the cellular automation header with the reset, start, and stop buttons.
 */
define([
    'jquery',
    'marionette',
    'util/events'
], function ($, Marionette, Events) {

    return Marionette.ItemView.extend({

        template: 'cellAutoHeaderView',

        events: {
            'click .start-automation': 'startAutomation',
            'click .stop-automation': 'stopAutomation',
            'click .reset-automation': 'resetAutomation'
        },

        initialize: function() {

            console.log("Initializing cellular automation header view");
        },

        startAutomation: function() {
            CellAutoApp.vent.trigger(Events.START_AUTOMATION);
        },

        stopAutomation: function() {
            CellAutoApp.vent.trigger(Events.STOP_AUTOMATION);
        },

        resetAutomation: function() {
            CellAutoApp.vent.trigger(Events.RESET_AUTOMATION);
        }

    });
});
