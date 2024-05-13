const express = require('express');
const mysql = require("mysql");
const db = require('./db');
require('dotenv').config()
const path = require('path');
const app = express();
const toolsRouter = require('./routes/tools');


const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));


//zorgt ervoor dat je data van forms kan pakken
app.use(express.urlencoded({ extended: false }));
//zorg ervoor dat data als json komt
app.use(express.json());

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
db.connect( (error) => {
    if(error) {
        console.log(error)
    } else {
        console.log("MySQL connected!")
    }
});

//define routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
//app.use('/tools', require('./routes/tools'));
app.use('/tools', toolsRouter);

//app.get('/tools/:id', toolsController.getProductById);

app.listen(5001, () => {
    console.log("Server started on Port 5001")
});

exports.db = db;