const mysql = require('../config/mysql');

module.exports.register = (res, req) => {
    return req.render('register');
}

module.exports.insertData = (req, res) => {

    let { name, email, password } = req.body;

    let insetquery = "INSERT INTO `registration`(`name`,`email`,`password`) VALUES ('" + name + "','" + email + "','" + password + "')";

    mysql.query(insetquery, (err, data) => {
        if (err) {
            console.log("Record Not Insert");
            return false;
        }
        else {
            console.log("Data Insert Successfuly");
            return res.redirect('/login');
        }
    });

}