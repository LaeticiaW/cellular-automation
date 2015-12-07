/**
 * master.layout.js
 *
 * Master layout for the application
 */

define([
    'jquery',
    'backbone',
    'marionette',
    'views/cellAutoLayout'
],function ($, Backbone, Marionette, CellAutoLayout) {

    return Marionette.LayoutView.extend({

            template: 'masterLayout',

            regions: {
                contentRegion: ".master-content"
            },

            renderCellularAutomation: function() {

                this.contentRegion.show(new CellAutoLayout());
            }
        });
    }
);