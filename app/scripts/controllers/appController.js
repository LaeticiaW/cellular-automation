/**
 * appController.js
 *
 * Controller for the cellular automation app.
 */

define([
        'backbone', 'marionette', 'views/masterLayout'
], function (Backbone, Marionette, MasterLayout) {

        return Marionette.Controller.extend({

            initialize: function () {

                this.vent = CellAutoApp.vent;

                this.initializeMasterLayout();

                console.log('AppController initialized');
            },

            initializeMasterLayout: function() {

                var regionManager = new Marionette.RegionManager();

                regionManager.addRegion("masterRegion", "#master-region");

                this.masterRegion = regionManager.get('masterRegion');

                this.masterLayout = new MasterLayout();

                this.masterRegion.show(this.masterLayout);
            },

            showCellularAutomation: function() {

                this.masterLayout.renderCellularAutomation();
            }
        });
    }
);