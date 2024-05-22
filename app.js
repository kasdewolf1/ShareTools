const express = require('express');
const mysql = require("mysql");
const dotenv = require('dotenv');
const db = require('./db');
require('dotenv').config()
const path = require('path');
const app = express();
const toolsRouter = require('./routes/tools');
const bodyParser = require('body-parser');

const publicDirectory = path.join(__dirname, './public');

app.use(express.static(publicDirectory));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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