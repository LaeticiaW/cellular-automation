/*
 * cellAutoItemView.js
 *
 * This view represents one row in the cellular automation grid.
 */
define([
    'jquery',
    'marionette'
], function ($, Marionette) {

    return Marionette.ItemView.extend({

        template: 'cellAutoItemView',

        tagName: 'tr'
    });
});
