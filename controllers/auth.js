const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db');

exports.register = async (req, res) => {
    try {
        const { name, email, password, passwordConfirm, woonplaats, birthdate } = req.body;

        // Basic validation
        if (!name || !email || !password || !passwordConfirm || !woonplaats || !birthdate) {
            return res.render('register', { message: 'All fields are required' });
        }

        if (password !== passwordConfirm) {
            return res.render('register', { message: 'Passwords do not match' });
        }

        db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
            if (error) {
                console.error(error);
                return res.render('register', { message: 'An error occurred' });
            }

            if (results.length > 0) {
                return res.render('register', { message: 'This email is already in use' });
            }

            const hashedPassword = await bcrypt.hash(password, 8);

            db.query('INSERT INTO users SET ?', 
                { name, email, password: hashedPassword, birthdate, woonplaats }, 
                (err, result) => {
                    if (err) {
                        console.error(err);
                        return res.render('register', { message: 'An error occurred' });
                    }
                    return res.render('login', { message: 'User registered successfully!' });
                }
            );
        });
    } catch (error) {
        console.error(error);
        res.render('register', { message: 'An error occurred' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Voer één enkele query uit om de gebruiker op te halen
        db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
            if (error) {
                console.error(error);
                return res.render('login', { message: 'An error occurred' });
            }

            if (results.length === 0) {
                return res.render('login', { message: 'Invalid email or password' });
            }

            const user = results[0];
            const isPasswordMatch = await bcrypt.compare(password, user.password);

            if (!isPasswordMatch) {
                return res.render('login', { message: 'Invalid email or password' });
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
            });

            const cookieOptions = {
                expires: new Date(Date.now() + parseInt(process.env.JWT_EXPIRES_IN) * 24 * 60 * 60 * 1000),
                httpOnly: true
            };

        const user = results.find(user => user.name === name || user.email === email);

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

        const token = jwt.sign({ 
            id: user.id, 
            name: user.name, 
            email: user.email,
            woonplaats: user.woonplaats, // Add woonplaats to the token payload
            birthdate: user.birthdate // Add birthdate to the token payload
        }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        const cookieOptions = {
            expires: new Date(Date.now() + parseInt(process.env.JWT_EXPIRES_IN) * 24 * 60 * 60 * 1000),
            httpOnly: true
        };

        res.cookie('jwt', token, cookieOptions);

        // Redirect to the correct path
        return res.redirect('/indexloggedin');
    });
};