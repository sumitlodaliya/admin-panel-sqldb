const mysql = require('../config/mysql');

const fs = require('fs');

const multer = require('multer');

const path = require('path');

const AVATAR_PATH = path.join("/uploads/image");


module.exports.addData = (req, res) => {



    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads');
        },
        filename: function (req, file, cb) {
            cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
        }
    });
    
    var upload = multer({ storage: storage });

    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let gender = req.body.gender;
    let contact = req.body.contact;
    let course = req.body.course;
    let fees = req.body.fees;
    
    let insertquery = "INSERT INTO `crud`(`name`, `email`, `password`,`gender`,`contact`,`course`,`fees`) VALUES ('" + name + "','" + email + "','" + password + "','" + gender + "','" + contact + "','" + course + "','" + fees + "')";

    mysql.query(insertquery, (err, data) => {
        if (err) {
            console.log(err);
        }
        return res.redirect("back");
    });



    // if (!req.files)
    //     return res.status(400).send('No files were uploaded.');
    // var file = req.files.image;
    // var img_name = file.name;
    // if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {

    //     file.mv('public/images/uploaded_images/' + file.name, function (err) {

    //         if (err)
    //             return res.status(500).send(err);
    //         var sql = "INSERT INTO `crud`(`name`, `email`, `password`,`gender`,`contact`,`course`,`fees`,`image`) VALUES ('" + name + "','" + email + "','" + password + "','" + gender + "','" + contact + "','" + course + "','" + fees + "','" + img_name + "')";
    //         mysql.query(insertquery, (err, data) => {
    //             if (err) {
    //                 console.log(err);
    //             }
    //             return res.redirect("back");
    //         });

    //     });
    // } else {
    //     message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
    //     res.render('index.ejs', { message: message });
    // }

}

// // View Data

module.exports.viewData = (req, res) => {

    let viewquery = "SELECT * FROM `crud`";

    mysql.query(viewquery, (err, data) => {
        if (err) {
            console.log("Data Not view");
            return false;
        }

        return res.render('view', {
            record: data
        });
    });

}

// // Delete data

module.exports.deleteData = (req, res) => {

    let id = req.params.id;

    let deletequery = "DELETE FROM `crud` WHERE id = '" + id + "' ";

    mysql.query(deletequery, (err, data) => {
        if (err) {
            console.log("Record Not Delete");
            return false;
        }
        console.log("Record Deleted");
        return res.redirect('back');
    });

}

module.exports.editData = (req, res) => {

    let id = req.params.id;
    // console.log(id);

    let editquery = "SELECT * FROM `crud` WHERE id = '" + id + "' ";

    mysql.query(editquery, (err, editRocord) => {
        if (err) {
            console.log("Data Not view");
            return false;
        }
        // console.log(editRocord);
        return res.render('edit', {
            // title : 'user list',
            single: editRocord[0]
        });
    });

}



module.exports.updateData = (req, res) => {

    let updaterecord = req.body.id;

    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let gender = req.body.gender;
    let contact = req.body.contact;
    let course = req.body.course;
    let fees = req.body.fees;
    let image = req.body.image;

    let updatequery = "UPDATE `crud` SET `name`='" + name + "',`email`='" + email + "',`password`='" + password + "',`gender`='" + gender + "',`contact`='" + contact + "',`course`='" + course + "',`fees`='" + fees + "',`image`='" + image + "' WHERE id = ?";

    mysql.query(updatequery, [updaterecord], (err, data) => {
        if (err) {
            console.log("Record Not Delete");
            return false;
        }
        console.log("Record Deleted");
        return res.redirect('/admin/viewData');
    });
};