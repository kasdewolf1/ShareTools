const express = require('express');
const path = require('path');
const hbs = require('hbs');
const multer = require('multer');
const db = require('./db');
const app = express();

const pagesRouter = require('./routes/pages');
const authRouter = require('./routes/auth');
const toolsRouter = require('./routes/tools');


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(multer({ dest: './uploads/' }).single('image'));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));



// Define routes
app.use('/', pagesRouter); // Zorg ervoor dat dit voor '/tools' komt
app.use('/auth', authRouter);
app.use('/tools', toolsRouter);

app.listen(5001, () => {
  console.log("Server started on Port 5001");
});

exports.db = db;