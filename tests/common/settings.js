/**
 * This file is for setting configuration required in test cases
 */

var settings = function () {
    this.constants = {
        'CHAI': 'chai',
    };
    this.config = {
        'SMALLWAITTIME': 3000,
        'WAITTIME': 5000,
        'STEPTIMEOUT': 60000
    }
}
module.exports = new settings();

