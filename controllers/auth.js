
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

        const user = results.find(user => user.name === name || user.email === name);

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

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
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

exports.updateUser = async (req, res) => {
    const { name, email, password, woonplaats, birthdate } = req.body;
    const userId = req.user.id; // Haal het ingelogde gebruikers-ID op vanuit het verzoek

    try {
        // Controleer of de bewerking wordt uitgevoerd op de gegevens van de ingelogde gebruiker
        if (req.params.userId !== userId) {
            return res.status(403).json({ message: 'Unauthorized: You can only update your own data' });
        }

        // Rest van de code voor het bijwerken van de gebruikersgegevens
        // ...
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while updating user' });
    }
};

exports.Getuserbyid = async (req, res) => {
    const userId = req.params.userId;

    db.query('SELECT * FROM users WHERE id = ?', [userId], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'An error occurred while fetching user' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(results[0]);
    });
}