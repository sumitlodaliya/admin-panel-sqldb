const express = require('express');

const port = 9056;

const app = express();

// const mysql = require('mysql');

// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "adminpanel-sql"
//   });

//   con.connect((err)=>{
//         if(err){
//             console.log("db not connected");
//             return false;
//         }
//         console.log("connecet!");
// })

const path = require('path');

// const db = require('./config/mongoose');

const passport = require('passport');

const passportLocal = require('./config/pasport-local-strategy');

const session = require('express-session');

const cookieParser = require('cookie-parser');

app.use(session({
    name: 'sumit',
    secret: " red and white",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded());
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(passport.setAuthentication);

app.use('/public', express.static(path.join(__dirname, 'public')));

const flash = require('connect-flash');
const flashmiddleware = require('./config/flash');

app.use(flash());
app.use(flashmiddleware.setFlash);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', require('./routes'));

app.listen(port, (err) => {
    if (err) {
        console.log("Server not start");
        return false;
    }
    console.log("Server is start on port :- " + port);
})