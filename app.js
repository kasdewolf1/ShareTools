const express = require('express');
const path = require('path');
const hbs = require('hbs');
const multer = require('multer');
const db = require('./db');
const app = express();
const session = require('express-session');

const pagesRouter = require('./routes/pages');
const authRouter = require('./routes/auth');
const toolsRouter = require('./routes/tools');


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));





app.use(session({
  secret: process.env.SESSION_SECRET, // Replace with a strong secret string
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using https
}));

app.use((req, res, next) => {
  if (req.session && req.session.user) { // Check if session exists and has a 'user' property
    req.user = req.session.user;
  }
  next(); // Allow request to proceed
});


// Define routes
app.use('/', pagesRouter); // Zorg ervoor dat dit voor '/tools' komt
app.use('/auth', authRouter);
app.use('/tools', toolsRouter);

app.listen(5001, () => {
  console.log("Server started on Port 5001");
});

exports.db = db;