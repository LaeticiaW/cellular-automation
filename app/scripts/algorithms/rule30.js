/*
 * rule30.js
 *
 * Defines the rule30 algorithm for cellular automation.  
 */
define(function() {

    return {

        getNewCellState: function(neighborhoodState) {

            var newState;

            switch (neighborhoodState) {
                case "111":
                    newState = "0";
                    break;
                case "110":
                    newState = "0";
                    break;
                case "101":
                    newState = "0";
                    break;
                case "100":
                    newState = "1";
                    break;
                case "011":
                    newState = "1";
                    break;
                case "010":
                    newState = "1";
                    break;
                case "001":
                    newState = "1";
                    break;
                case "000":
                    newState = "0";
                    break;
                default:
            }

            return newState;
        }
    };
});

