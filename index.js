
const express = require('express');
const bodyParser = require('body-parser');
const moment = require("moment/moment");
const cors = require("cors");
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors({
    origin:"*",
}));

mongoose.connect("mongodb+srv://fabiolr81:xk3fOGtbt9Po7uVE@cluster0.y1dx2y0.mongodb.net/");
const ExpensesModel = require('./models/Expenses');


app.get('/', (req, res) => {
    res.send('Hello from Express!')
})
app.get('/status', (request, response) => {
    const status = {
          Status: 'Running'
    }
    response.send(status);
});

app.get('/sampleData', (req, res) => {
    ExpensesModel.find({}).sort({date:'asc' })
        .then(expenses=>res.json(expenses))
        .catch(err => res.json(err));
    // res.json(data);
})

app.post('/', (request, response) => {
    if(!request.body.nome) response.send(401);
    response.send(request.body);
    console.log(request.body);
});

// expenses.filter(expense => expense.id !== id)
app.delete('/sampleData/:id', (req, res) => {
    
    ExpensesModel.findByIdAndDelete({_id:req.params.id})
        .then(()=>{
            ExpensesModel.find({})
                .then(expenses=>res.json(expenses))
                .catch(err => res.json(err));
        })
        .catch(err=>res.json(err))
});

app.post('/sampleData', (req, res) => {
    // data = [...data, {...req.body}]
    ExpensesModel.create(req.body)
        .then(()=>{
            ExpensesModel.find({})
                .then(expenses=>res.json(expenses))
                .catch(err => res.json(err));
        })
        .catch(err => res.json(err))

});

app.listen(3000, () => {
    console.log('Listening on port 3000')
})