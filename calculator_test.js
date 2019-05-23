const assert = require('assert');
const AccountingCalculator = require('./calculator.js');

var calculator = new AccountingCalculator();

assert.equal(calculator.calculateNet(1000.00, 1000.00), 0.00);
assert.throws(() => calculator.calculateNet(1000.00, -1000.00));
assert.throws(() => calculator.calculateNet(-1000.00, 1000.00));
