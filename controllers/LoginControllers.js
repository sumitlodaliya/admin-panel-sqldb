
const nodemailer = require('nodemailer');
const mysql = require('../config/mysql');

module.exports.login = (req, res) => {
    if (!res.locals.user) {
        return res.render('login');
    }
    return res.redirect('/admin/');
}
module.exports.loginData = (req, res) => {
    return res.redirect('/admin/');
}

module.exports.forgotemail = (req, res) => {
    return res.render('forgotemail');
}

module.exports.forgotemaildata = (req, res) => {

    let email = req.body.email;
    let uque = "SELECT * FROM `registration` WHERE `email`='" + email + "'";

    mysql.query(uque, (err, userdata) => {
        if (err) 
        {
            console.log(err);
        }
        for (let i in userdata) 
        {
            if (email != "") 
            {
                if (userdata[i].email == email) 
                {
                    let otp = Math.floor(Math.random() * 100000000);
                    var smtpTransport = nodemailer.createTransport({
                        service: "gmail",
                        auth: {
                            user: "lodaliyasumit@gmail.com",
                            pass: "rujrieleccrmpdvo"

                        }
                    });
                    var mailOptions = {
                        from: "lodaliyasumit@gmail.com",
                        to: email,
                        subject: 'Reset Password',
                        text: 'OTP :- ' + otp
                    }

                    smtpTransport.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Message sent: %s', info.messageId);
                    });
                    res.cookie('userotp', {
                        email: email,
                        otp: otp
                    });
                    return res.redirect('/login/otp');
                }
                else 
                {
                    console.log("Email Id Not Match");
                }
            }
        }
    });


}


module.exports.otp = (req, res) => {
    return res.render('otp');
}
module.exports.otpData = (req, res) => {

    if (req.cookies.userotp.otp == req.body.otp) {
        return res.redirect('/login/newpass');
    } else {
        console.log("Otp not match");
        return res.redirect('back');
    }

}
module.exports.newpass = (req, res) => {
    return res.render('newpass');
}



module.exports.newpassData = (req, res) => {
    console.log(req.body);
    let newpass = req.body.newpass;
    let cpass = req.body.cpass;

    if (newpass == cpass) {
        let email = req.cookies.userotp.email;

        mysql.query("UPDATE `registration` SET `password`='" + newpass + "' WHERE `email` = '" + email + "' ", (err, userdata) => {
            if (err) {
                console.log("Something wromg");
                return false;
            }
            console.log(userdata);
            res.clearCookie('userotp');
            console.log("Password successfully changed!");
            return res.redirect('/login/');

        });
    }
    else {
        console.log("Newpassword and confirm password are not match");
        return res.redirect('back');
    }
}