const gui = require('gui');
const parseCurrency = require('parsecurrency');
const AccountingCalculator = require('./calculator.js');

var titleLabel = gui.Label.create('Profit Calculator');
titleLabel.setFont(gui.Font.default().derive(10, 'normal', 'normal'));
titleLabel.setStyle({width: '100%', marginBottom: '10px'});

var errorLabel = gui.Label.create('There was an error in the calculation.');
errorLabel.setStyle({width: '100%'});
errorLabel.setVisible(false);

var boldFont = gui.Font.default().derive(0, 'bold', 'normal');
var lineItemLabel = gui.Label.create('Line Item');
lineItemLabel.setFont(boldFont);
lineItemLabel.setStyle({width: '25%'});
var amountLabel = gui.Label.create('Amount');
amountLabel.setFont(boldFont);
amountLabel.setStyle({width: '75%'});

var revenueLabel = gui.Label.create('Revenue');
revenueLabel.setStyle({width: '25%'});
var revenueEntry = gui.Entry.create();
revenueEntry.setText('1000.00');
revenueEntry.setStyle({width: '75%'});

var expensesLabel = gui.Label.create('Expenses');
expensesLabel.setStyle({width: '25%'});
var expensesEntry = gui.Entry.create();
expensesEntry.setText('1000.00');
expensesEntry.setStyle({width: '75%'});

var netProfitLabel = gui.Label.create('Net Profit');
netProfitLabel.setStyle({width: '25%'});
var netProfit = gui.Entry.create();
netProfit.setEnabled(false);
netProfit.setStyle({width: '75%'});

var displayTotalsButton = gui.Button.create('Display Totals');
displayTotalsButton.setStyle({margin: '10px'});

const win = gui.Window.create({});
win.onClose = () => gui.MessageLoop.quit();

var container = gui.Container.create();
container.setStyle({justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap'});
container.addChildView(titleLabel);
container.addChildView(errorLabel);
container.addChildView(lineItemLabel);
container.addChildView(amountLabel);
container.addChildView(revenueLabel);
container.addChildView(revenueEntry);
container.addChildView(expensesLabel);
container.addChildView(expensesEntry);
container.addChildView(netProfitLabel);
container.addChildView(netProfit);
container.addChildView(displayTotalsButton);

displayTotalsButton.onClick = function() {
    try {
        var revenue = parseCurrency(revenueEntry.getText());
        var expenses = parseCurrency(expensesEntry.getText());

        var calculator = new AccountingCalculator();
        var net = calculator.calculateNet(revenue.value, expenses.value);

        netProfit.setText(net.toFixed(2));
        errorLabel.setVisible(false);
    } catch (ex) {
        errorLabel.setVisible(true);
    }
};

win.setContentSize({width: 400, height: container.getPreferredHeightForWidth(400)});
win.setContentView(container);

win.center();
win.activate();

if (!process.versions.yode) {
    gui.MessageLoop.run();  // block until gui.MessageLoop.quit() is called
    process.exit(0);
}
