const express = require('express');
const mysql = require("mysql");

const dotenv = require('dotenv');
const db = require('./db');
const hbs = require('hbs');
require('dotenv').config()
const path = require('path');
const app = express();
const toolsRouter = require('./routes/tools');


const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));


hbs.registerPartials(path.join(__dirname, 'views/partials'));


//zorgt ervoor dat je data van forms kan pakken
app.use(express.urlencoded({ extended: false }));
//zorg ervoor dat data als json komt
app.use(express.json());

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// Define routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
app.use('/tools', toolsRouter);
app.use('/api/images', toolsRouter);

app.listen(5001, () => {
  console.log("Server started on Port 5001");
});

exports.db = db;