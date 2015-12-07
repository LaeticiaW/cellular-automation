define([
    'underscore',
    'jquery',
    'backbone',
    'views/cellAutoContentLayout'
], function(_, $, Backbone, CellAutoContentLayout) {

    return describe('Cellular Automation Content Layout Spec', function () {

        var view, numCells, numRows,
            correctStates = [
                ['cell-state-0','cell-state-0','cell-state-0','cell-state-0','cell-state-0','cell-state-1','cell-state-0','cell-state-0','cell-state-0','cell-state-0','cell-state-0'],
                ['cell-state-0','cell-state-0','cell-state-0','cell-state-0','cell-state-1','cell-state-1','cell-state-1','cell-state-0','cell-state-0','cell-state-0','cell-state-0'],
                ['cell-state-0','cell-state-0','cell-state-0','cell-state-1','cell-state-1','cell-state-0','cell-state-0','cell-state-1','cell-state-0','cell-state-0','cell-state-0'],
                ['cell-state-0','cell-state-0','cell-state-1','cell-state-1','cell-state-0','cell-state-1','cell-state-1','cell-state-1','cell-state-1','cell-state-0','cell-state-0'],
                ['cell-state-0','cell-state-1','cell-state-1','cell-state-0','cell-state-0','cell-state-1','cell-state-0','cell-state-0','cell-state-0','cell-state-1','cell-state-0'],
                ['cell-state-1','cell-state-1','cell-state-0','cell-state-1','cell-state-1','cell-state-1','cell-state-1','cell-state-0','cell-state-1','cell-state-1','cell-state-1']
            ];

        var render = function(numCells) {

            window.CellAutoApp = {};
            window.CellAutoApp.vent = _.extend(Backbone.Events);

            view = new CellAutoContentLayout({
                numGridCells: numCells,
                intervalTime: 250
            });
            view.render();
        };

        var verifyCellStates = function(idx, $cells) {

            if ($($cells[0]).attr('class') === correctStates[idx][0] && $($cells[1]).attr('class') === correctStates[idx][1] &&
                $($cells[2]).attr('class') === correctStates[idx][2] && $($cells[3]).attr('class') === correctStates[idx][3] &&
                $($cells[4]).attr('class') === correctStates[idx][4] && $($cells[5]).attr('class') === correctStates[idx][5] &&
                $($cells[6]).attr('class') === correctStates[idx][6] && $($cells[7]).attr('class') === correctStates[idx][7] &&
                $($cells[8]).attr('class') === correctStates[idx][8] && $($cells[9]).attr('class') === correctStates[idx][9] &&
                $($cells[10]).attr('class') === correctStates[idx][10]) {
                return true;
            } else {
                return false;
            }
        };

        afterEach(function() {
            if (view) {
                view.remove();
                view = null;
            }
        });

        it('Initially renders the automation grid with one row of 21 cells, with one cell in on state and the rest in off state', function() {

            render(21);

            expect(view.$el.find('.cell-auto-grid').length).toEqual(1);
            expect(view.$el.find('.cell-auto-grid td').length).toEqual(21);
            expect(view.$el.find('.cell-auto-grid .cell-state-0').length).toEqual(20);
            expect(view.$el.find('.cell-auto-grid .cell-state-1').length).toEqual(1);
        });

        it('Starts the automation and verifies that the correct number of iterations and the correct cell states', function() {

            render(11);

            view.startAutomation(11);

            waitsFor(function () {
                return view.automationDone !== undefined && view.automationDone;
            }, "Automation complete", 5000);

            runs(function() {
               expect(view.$el.find('.cell-auto-grid').length).toEqual(1);
               expect(view.$el.find('.cell-auto-grid tr').length).toEqual(6);

               // For each row in the grid, get the list of cell states (via the class) and verify that the cell states
               // match the known correct states.
               var $cells;
               for (var i = 0; i <= 5; i++) {
                   $cells = view.$el.find('.cell-auto-grid tr:nth-child(' + (i + 1) + ') td');
                   expect($cells.length).toEqual(11);
                   expect(verifyCellStates(i, $cells)).toEqual(true);
               }
            });
        });

    });
});

