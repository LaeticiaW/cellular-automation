/*
 * cellAutoCompositeView.js
 *
 * This view represents one 'row' in the cellular automation grid, calling CellAutoItemView
 * for each cell in the row.
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
