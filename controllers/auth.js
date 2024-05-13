const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db');

exports.register = async (req, res) => {
    console.log(req.body);

    const { name, email, password, passwordConfirm, woonplaats, birthdate } = req.body;

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if(error){
            console.log(error);
            return res.render('register', {
                message: 'An error occurred'
            });
        }
    
        if(results.length > 0) {
            return res.render('register', {
                message: 'This email is already in use'
            });
        } else if(password !== passwordConfirm) {
            return res.render('register', {
                message: 'Password Didn\'t Match!'
            });
        }


        let hashedPassword = await bcrypt.hash(password, 8);

        console.log(hashedPassword);

        db.query('INSERT INTO users SET ?', {name: name, email: email, password: hashedPassword, birthdate: birthdate, woonplaats: woonplaats}, (err, result) => {
            if(err) {
                console.log(err);
            } else {
                

                return res.render('login', {
                    message: 'User registered!'
                });
            }
        });
    });
};

exports.login = async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;

    db.query('SELECT * FROM users WHERE name = ? OR email = ?', [name, name], async (error, results) => {
        if (error) {
            console.log(error);
            return res.render('login', {
                message: 'An error occurred'
            });
        }

        if (results.length === 0) {
            return res.render('login', {
                message: 'Invalid name or password'
            });
        }

        // Controleer of de gevonden gebruiker het ingevoerde wachtwoord overeenkomt
        const user = results.find(user => user.name === name || user.email === name); // Zoek naar gebruiker met overeenkomende naam of e-mail

        if (!user) {
            return res.render('login', {
                message: 'Invalid name or password'
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.render('login', {
                message: 'Invalid email or password'
            });
        }

        // Genereer JWT-token voor de gebruiker
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        // Configureer cookie-opties
        const cookieOptions = {
            expires: new Date(Date.now() + parseInt(process.env.JWT_EXPIRES_IN) * 24 * 60 * 60 * 1000), // Zorg ervoor dat expiresIn een numerieke waarde is
            httpOnly: true
        };

        // Stel JWT-cookie in
        res.cookie('jwt', token, cookieOptions);

        // Stuur een redirect naar /products na succesvol inloggen
        return res.redirect('/products');
    });
};