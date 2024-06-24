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

            res.cookie('jwt', token, cookieOptions);
            return res.redirect('/indexloggedin');
        });
    } catch (error) {
        console.error(error);
        res.render('login', { message: 'An error occurred' });
    }
};

exports.logout = (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/login');
};

exports.getUserID = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                return next();
            } else {
                const id = decoded.id;
                db.query('SELECT * FROM users WHERE id = ?', [id], (error, results) => {
                    if (error) {
                        console.log(error);
                        res.locals.user = null;
                        return next();
                    } else {
                        res.locals.user = results[0];
                        return next();
                    }
                });
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { name, email, password, passwordConfirm, woonplaats, birthdate } = req.body;

        // Basic validation
        if (!name || !email || !woonplaats || !birthdate) {
            return res.render('mijnaccountbewerken', { message: 'All fields except password are required' });
        }

        if (password && password !== passwordConfirm) {
            return res.render('mijnaccountbewerken', { message: 'Passwords do not match' });
        }

        db.query('SELECT email FROM users WHERE email = ? AND id != ?', [email, req.user.id], async (error, results) => {
            if (error) {
                console.error(error);
                return res.render('mijnaccountbewerken', { message: 'An error occurred' });
            }

            if (results.length > 0) {
                return res.render('mijnaccountbewerken', { message: 'This email is already in use' });
            }

            let updateData = { name, email, woonplaats, birthdate };
            
            if (password) {
                updateData.password = await bcrypt.hash(password, 8);
            }

            db.query('UPDATE users SET ? WHERE id = ?', [updateData, req.user.id], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.render('mijnaccountbewerken', { message: 'An error occurred' });
                }
                return res.render('mijnaccount', { message: 'User updated successfully!' });
            });
        });
    } catch (error) {
        console.error(error);
        res.render('mijnaccountbewerken', { message: 'An error occurred' });
    }
};

exports.verifyToken = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                return res.redirect('/login');
            } else {
                const id = decoded.id;
                db.query('SELECT * FROM users WHERE id = ?', [id], (error, results) => {
                    if (error || results.length === 0) {
                        console.log(error);
                        res.locals.user = null;
                        return res.redirect('/login');
                    } else {
                        res.locals.user = results[0];
                        req.user = results[0]; // Voeg de gebruiker toe aan het request object
                        return next();
                    }
                });
            }
        });
    } else {
        res.locals.user = null;
        return res.redirect('/login');
    }
};
