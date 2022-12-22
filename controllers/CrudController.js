const mysql = require('../config/mysql');

// // const fs = require('fs');

// const path = require('path');

module.exports.addData = (req, res) => {

    // console.log(req.body);
    // Admincrud.create({
    //     grid: req.body.grid,
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    //     gender: req.body.gender,
    //     contact: req.body.contact,
    //     course: req.body.course,
    //     fees: req.body.fees,
    //     state: req.body.state,
    // }, (err, data) => {
    //     console.log(data); 
    //     if (err) {
    //         console.log("record not insert");
    //         return false;
    //     }
    //     console.log("Record successfully insert");
    //     return res.redirect('back');
    // })


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
}

// // View Data

module.exports.viewData = (req, res) => {
    //     Admincrud.find({},(err,record)=>{
    //         if(err)
    //         {
    //             console.log("Data Not view");
    //             return false;
    //         }

    //         return res.render('view',{
    //                 record:record
    //         });
    //     });

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
    //     console.log(req.params.id);
    //     let id = req.params.id;
    //     Admincrud.findByIdAndDelete(id,(err)=>{
    //             if(err)
    //             {
    //                 console.log("Record Not Delete");
    //                 return false;
    //             }
    //             console.log("Record Deleted");
    //             return res.redirect('back');
    //     });

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
    // let id = req.params.id;
    // try {
    //     let editRocord = await Admincrud.findById((id));
    //     if (editRocord) {
    //         return res.render('edit', {
    //             single: editRocord
    //         })
    //     }
    //     else {
    //         console.log("record not match");
    //         return false;
    //     }
    // }
    // catch (err) {
    //     console.log(err);
    // }


    // Admincrud.findById(id,(err,editRocord)=>{
    //     if(err)
    //     {
    //         console.log("data not edit");
    //         return false;
    //     }
    //     return res.render('edit', {
    //         single: editRocord
    //     })
    // });

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
    //     let id = req.body.id;
    //     console.log(id);
    //     // console.log(req.body);

    //     Admincrud.findByIdAndUpdate(id, {
    //         grid: req.body.grid,
    //         name: req.body.name,
    //         email: req.body.email,
    //         password: req.body.password,
    //         gender: req.body.gender,
    //         contact: req.body.contact,
    //         course: req.body.course,
    //         fees: req.body.fees,
    //         state: req.body.state,
    //     }, (err, editdata) => {
    //         if (err) {
    //             console.log("Record not update");
    //             return false;
    //         }
    //         console.log(editdata);
    //         console.log("Record successfully update");
    //         return res.redirect('/admin/viewData');
    //     })


    let updaterecord = req.body.id;

    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let gender = req.body.gender;
    let contact = req.body.contact;
    let course = req.body.course;
    let fees = req.body.fees;

    let updatequery = "UPDATE `crud` SET `name`='" + name + "',`email`='" + email + "',`password`='" + password + "',`gender`='" + gender + "',`contact`='" + contact + "',`course`='" + course + "',`fees`='" + fees + "' WHERE id = ?";

    mysql.query(updatequery, [updaterecord], (err, data) => {
        if (err) {
            console.log("Record Not Delete");
            return false;
        }
        console.log("Record Deleted");
        return res.redirect('back');
    });
};