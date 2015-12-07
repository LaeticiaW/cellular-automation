/*
 * cellAutoLayout.js
 *
 * This layout represents the cellular automation page.  It has two regions, one for the
 * header, and one for the cellular automation grid content.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'views/cellAutoHeaderView',
    'views/cellAutoContentLayout'
], function ($, _, Backbone, Marionette, CellAutoHeaderView, CellAutoContentLayout) {

    return Marionette.LayoutView.extend({

        template: 'cellAutoLayout',

        regions: {
            header: '.cell-auto-header',
            content: '.cell-auto-content-layout'
        },

        initialize: function () {

            console.log('Initializing cellular automation layout');
        },

        onRender: function() {

            this.header.show(new CellAutoHeaderView());

            this.content.show(new CellAutoContentLayout());
        }
    });
});
