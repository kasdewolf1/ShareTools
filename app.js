const express = require('express');
const path = require('path');
const hbs = require('hbs');
const multer = require('multer');
const db = require('./db');

const app = express();
const port = process.env.PORT || 5001;

const pagesRouter = require('./routes/pages');
const authRouter = require('./routes/auth');
const toolsRouter = require('./routes/tools');

// Middleware configuratie
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(multer({ dest: './uploads/' }).single('image'));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Routes
app.use('/', pagesRouter); // Zorg ervoor dat dit voor '/tools' komt
app.use('/auth', authRouter);
app.use('/tools', toolsRouter);

app.listen(port, () => {
  console.log(`Server started on Port ${port}`);
});

exports.db = db;