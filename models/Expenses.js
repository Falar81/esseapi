
const mongoose = require('mongoose');

const expensesSchema = new mongoose.Schema({
    date: Date,
    type: String,
    category: String,
    description: String,
    amount: Number
});
const ExpensesModel = mongoose.model("expenses",expensesSchema);

module.exports = ExpensesModel;