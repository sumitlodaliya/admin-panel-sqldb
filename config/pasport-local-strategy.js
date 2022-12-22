const mysql = require('./mysql');

const passport = require('passport');

const passportLocal = require('passport-local').Strategy;


// passport.use(new passportLocal({},(req, email, password, done) => {


//         mysql.query("SELECT * FROM `registration` WHERE `email` = '" + email + "' and `password` ='"+password+"'", (err, user) => {
//             if (err) 
//             {
//                 return done(err);
//             }
//             if (!user) 
//             {
//                 return done(null, false,); // req.flash is the way to set flashdata using connect-flash
//             }
//             if (user.password != password) 
//             {
//                 return done(null, false);
//             }
//             return done(null, user);
//         });
//     }));
// passport.serializeUser((user, done) => {
//     return done(null, user.id);
// });


passport.use(new passportLocal({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
}, (req,email, password, done) => { // callback with email and password from our form

    mysql.query("SELECT * FROM `registration` WHERE `email` = '" + email + "' and `password` = '" + password + "' ", (err, user) => {
        if (err)
            return done(err);
        if (!user.length || user[0].password != password) {
            console.log('No user found.');
            return done(null, false); // req.flash is the way to set flashdata using connect-flash
        }

        // // if the user is found but the password is wrong
        // if (!(user[0].password == password))
        //     return done(null, false); // create the loginMessage and save it to session as flashdata

        // all is well, return successful user
        console.log(user[0]);
        return done(null, user[0]);

    });
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser((id, done) => {
    mysql.query("select * from `registration` where id = " + id, (err, rows) => {
        done(err, rows[0]);
    });
});

passport.checkUserLogin = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();

    }
    return res.redirect('/admin');
}

passport.setAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;