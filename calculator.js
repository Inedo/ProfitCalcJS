module.exports = function AccountingCalculator() {
    this.calculateNet = function(revenue, expenses) {
        if (revenue < 0)
            throw new Error("revenue cannot be negative");
        if (expenses < 0)
            throw new Error("expenses cannot be negative");

        return revenue - expenses;
    };
};
