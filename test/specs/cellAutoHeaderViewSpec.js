define([
    'underscore',
    'jquery',
    'backbone',
    'views/cellAutoHeaderView'
], function(_, $, Backbone, CellAutoHeaderView) {

    return describe('Cellular Automation Header View Spec', function () {

        var view;

        var render = function() {

            window.CellAutoApp = {};
            window.CellAutoApp.vent = _.extend(Backbone.Events);

            view = new CellAutoHeaderView();
            view.render();
        };

        afterEach(function() {
            if (view) {
                view.remove();
                view = null;
            }
        });

        it('Renders the cellular automation header view with title and reset start, and stop buttons', function() {

            render();

            expect(view.$el.find('.title').html()).toEqual('Cellular Automation');
            expect(view.$el.find('.sub-title').html()).toEqual('Using Rule30 Algorithm');
            expect(view.$el.find('.reset-automation').html()).toEqual('Reset');
            expect(view.$el.find('.start-automation').html()).toEqual('Start Automation');
            expect(view.$el.find('.stop-automation').html()).toEqual('Stop Automation');
        });

        it('Calls the appropriate method when the header buttons are pressed', function() {

            spyOn(CellAutoHeaderView.prototype, 'startAutomation').andCallThrough();
            spyOn(CellAutoHeaderView.prototype, 'stopAutomation').andCallThrough();
            spyOn(CellAutoHeaderView.prototype, 'resetAutomation').andCallThrough();

            render();

            view.$el.find('.start-automation').trigger('click');
            expect(view.startAutomation).toHaveBeenCalled();

            view.$el.find('.stop-automation').trigger('click');
            expect(view.stopAutomation).toHaveBeenCalled();

            view.$el.find('.reset-automation').trigger('click');
            expect(view.resetAutomation).toHaveBeenCalled();
        });

    });
});