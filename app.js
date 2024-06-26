const express = require('express');
const path = require('path');
const hbs = require('hbs');
const multer = require('multer');
const db = require('./db');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');

const pagesRouter = require('./routes/pages');
const authRouter = require('./routes/auth');
const toolsRouter = require('./routes/tools');

// Definieer routes
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/', pagesRouter); // Zorg ervoor dat dit voor '/tools' komt
app.use('/auth', authRouter);
app.use('/tools', toolsRouter); // Zorg ervoor dat dit na '/' komt
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(multer({ dest: './uploads/' }).single('image'));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));
hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
});


// Middleware voor sessie
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Middleware om gebruikersinformatie in te stellen
app.use((req, res, next) => {
  if (req.session && req.session.user) {
    req.user = req.session.user;
  }
  next();
});

// Define routes
app.use('/', pagesRouter); // Zorg ervoor dat dit voor '/tools' komt
app.use('/auth', authRouter);
app.use('/tools', toolsRouter);

app.listen(5001, () => {
console.log("Server started on Port 5001");
});

exports.db = db;