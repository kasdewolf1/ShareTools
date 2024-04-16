const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.addTool = (req, res) => {
    const { title, beschikbaarheid, afmeting, location, category, description } = req.body;

    db.query('INSERT INTO tools SET ?', {afmeting: afmeting, status: beschikbaarheid, tool_title: title, locatie: location, categorie: category, beschrijving: description}, (err, result) => {
        if(err) {
            console.log(err);
        } else {
            return res.render('addTool', {
                message: 'Tool added!'
            });
        }
    });
}


