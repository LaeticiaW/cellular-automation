
define([
    'jquery',
    'algorithms/rule30'
], function($, Rule30) {

    return describe('Rule30 Algorithm Spec', function () {

        it('Tests the 8 neighborhood combinations of the Rule30 algorithm', function () {
            
            expect(Rule30.getNewCellState('111')).toEqual('0');
            expect(Rule30.getNewCellState('110')).toEqual('0');
            expect(Rule30.getNewCellState('101')).toEqual('0');
            expect(Rule30.getNewCellState('100')).toEqual('1');
            expect(Rule30.getNewCellState('011')).toEqual('1');
            expect(Rule30.getNewCellState('010')).toEqual('1');
            expect(Rule30.getNewCellState('001')).toEqual('1');
            expect(Rule30.getNewCellState('000')).toEqual('0');
        });
    });
});
