/*
 * cellAutoContentLayout.js
 *
 * This layout is used to display the cellular automation grid, perform the iterations, and handle all actions
 * relating to the automation.  It will rerender the grid after each iteration.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'bootstrapNotify',
    'views/cellAutoCompositeView',
    'algorithms/rule30',
    'util/events',
    'util/constants'
], function ($, _, Backbone, Marionette, Notify, CellAutoCompositeView, Rule30, Events, Constants) {

    return Marionette.LayoutView.extend({

        template: 'cellAutoContentLayout',

        regions: {
            header: '.cell-auto-header',
            content: '.cell-auto-content'
        },

        initialize: function (options) {

            console.log('Initializing cellular automation content layout');

            this.initializeData(options || {});

            this.listenTo(CellAutoApp.vent, Events.START_AUTOMATION, this.startAutomation);
            this.listenTo(CellAutoApp.vent, Events.STOP_AUTOMATION, this.stopAutomation);
            this.listenTo(CellAutoApp.vent, Events.RESET_AUTOMATION, this.resetAutomation);
        },

        onRender: function() {

            this.content.show(new CellAutoCompositeView({
                model: this.model,
                collection: this.collection
            }));
        },

        initializeData: function(options) {

            if (window.matchMedia && window.matchMedia("screen and (max-width: 510px)").matches) {
                this.containerPadding = Constants.CONTAINER_PADDING_SMALL;
                this.cellDimension = Constants.CELL_DIMENSION_SMALL;
            } else {
                this.containerPadding = Constants.CONTAINER_PADDING;
                this.cellDimension = Constants.CELL_DIMENSION;
            }

            this.numGridCells = options.numGridCells ? options.numGridCells : this.getNumberOfGridCells();
            this.maxIterations = (this.numGridCells - 1) / 2;
            this.intervalTime = options.intervalTime ? options.intervalTime : Constants.AUTOMATION_INTERVAL_MS;
            this.automationDone = false;
            this.interval = null;
            this.iterations = 0;

            console.log("Number of grid cells: " + this.numGridCells + ", cell dimension: " + this.cellDimension);

            this.model = new Backbone.Model({
                cellStates: this.getInitialCellStates(this.numGridCells),
                cellDimension: this.cellDimension
            });

            this.collection = new Backbone.Collection([this.model]);
        },

        getInitialCellStates: function(numGridCells) {

            var states = [],
                halfTheCells = Math.floor(numGridCells / 2),
                i;

            for (i = 1; i <= halfTheCells; i++) {
                states.push("0");
            }
            states.push("1");
            for (i = 1; i <= halfTheCells; i++) {
                states.push("0");
            }

            return states;
        },

        startAutomation: function() {

            var self = this;

            if (this.interval !== null) {
                return;
            } else if (this.automationDone) {
                this.notifyAutomationDone();
                return;
            }

            this.iterateCellStates();

            this.interval = setInterval(function() {
                self.iterateCellStates();
            }, this.intervalTime);
        },

        stopAutomation: function() {

            clearInterval(this.interval);
            this.interval = null;
        },

        resetAutomation: function() {

            this.automationDone = false;
            this.stopAutomation();
            this.initializeData({});
            this.onRender();
        },

        iterateCellStates: function() {

            var cellStates = this.collection.at(this.collection.length - 1).get('cellStates'),
                newCellStates = [],
                newCellStatesModel,
                neighborhoodState;

            this.iterations++;
            if (this.iterations > this.maxIterations) {
                this.automationDone = true;
                this.stopAutomation();

                this.notifyAutomationDone();

                return;
            }

            cellStates.forEach(function(value, index) {

                if (index === 0) {
                    neighborhoodState = Constants.CELL_STATE_OFF + value + cellStates[index + 1];
                } else if (index === cellStates.length - 1) {
                    neighborhoodState = cellStates[index - 1] + value + Constants.CELL_STATE_OFF;
                } else {
                    neighborhoodState = cellStates[index - 1] + value + cellStates[index + 1];
                }

                newCellStates[index] = Rule30.getNewCellState(neighborhoodState);
            });

            newCellStatesModel = new Backbone.Model({
                cellStates: newCellStates,
                cellDimension: this.cellDimension
            });
            this.collection.add(newCellStatesModel);

            // Rerender the view again to display the new states
            this.onRender();
        },

        getNumberOfGridCells: function() {

            var containerWidth = this.getContainerWidth(),
                numCells = Math.floor(containerWidth / this.cellDimension);

            if (numCells % 2 === 0) {
                numCells--;
            }

            return numCells;
        },

        getContainerWidth: function() {

            var viewportWidth = $(window).width(),
                containerWidth = viewportWidth - this.containerPadding;

            return containerWidth;
        },

        notifyAutomationDone: function() {

            $.notify({message: 'Automation Complete'},{
                offset: {y: 120},
                delay: 2000,
                timer: 1000,
                placement: { align: 'center' }
            });
        }
    });
});
