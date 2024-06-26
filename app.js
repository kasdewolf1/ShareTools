const express = require('express');
const path = require('path');
const hbs = require('hbs');
const multer = require('multer');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const db = require('./db');

const pagesRouter = require('./routes/pages');
const authRouter = require('./routes/auth');
const toolsRouter = require('./routes/tools');

const app = express();

// Middleware voor sessie
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Middleware voor cookies
app.use(cookieParser());

// Middleware voor het parsen van form data en JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(multer({ dest: './uploads/' }).single('image'));

// Statische bestanden
app.use(express.static(path.join(__dirname, 'public')));

// Instellen van view engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));
hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
});

// Middleware om gebruikersinformatie in te stellen
app.use((req, res, next) => {
  if (req.session && req.session.user) {
    req.user = req.session.user;
  }
  next();
});

// Definieer routes
app.use('/', pagesRouter); // Zorg ervoor dat dit voor '/tools' komt
app.use('/auth', authRouter);
app.use('/tools', toolsRouter);

app.listen(5001, () => {
  console.log("Server started on Port 5001");
});

exports.db = db;
