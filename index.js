const express = require('express');

const port = 9056;

const app = express();

var multer = require('multer')

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

const fileUpload = require("express-fileupload");

const bodyParser = require("body-parser");

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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// let storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads');
//     },
//     filename: function (req, file, cb) {
//         cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
//     }
// });

// var upload = multer({ storage: storage });




app.use(express.static('upload'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(passport.setAuthentication);
app.use(fileUpload());


app.use('/public', express.static(path.join(__dirname, 'public')));

const flash = require('connect-flash');
const flashmiddleware = require('./config/flash');
//const fileUpload = require('express-fileupload');

app.use(flash());
app.use(flashmiddleware.setFlash);


app.use('/', require('./routes'));

app.listen(port, (err) => {
    if (err) {
        console.log("Server not start");
        return false;
    }
    console.log("Server is start on port :- " + port);
})