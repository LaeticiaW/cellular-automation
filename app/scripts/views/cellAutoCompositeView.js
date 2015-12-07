/*
 * cellAutoCompositeView.js
 *
 * This view represents the cellular automation grid, calling CellAutoItemView to render each
 * row in the table.
 */
define([
    'jquery',
    'marionette',
    'views/cellAutoItemView'
], function ($, Marionette, CellAutoItemView) {

    return Marionette.CompositeView.extend({

        template: 'cellAutoCompositeView',

        childView: CellAutoItemView,

        childViewContainer: '.cell-auto-grid',

        childViewOptions: function(model) {
            return {
                cellDimension: model.get('cellDimension')
            };
        }
    });
});
