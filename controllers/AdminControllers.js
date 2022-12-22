// // Crud Model
// const admindashbord = require('../models/AdminModel');
// // registerdata model
// const adminregister = require('../models/RegisterModel');
// // Admincategory
// const admincategory = require('../models/CategoryModel');
// // adminsubcategory
// const adminsubcategory = require('../models/SubcategoryModel');
let mysql = require('../config/mysql');

module.exports.dashbord = (res, req) => {
    return req.render('dashbord');
}

module.exports.logout = (req, res) => {
    req.logout((err, data) => {
        if (err) {
            console.log("Something wrong");
            return false;
        }
        return res.redirect('/login/');
    });
}

module.exports.pagenotfound = (req, res) => {
    return req.render('404');
}

module.exports.profilepage = (req, res) => {
    let userdata = res.locals.user;
    return res.render('profile', {
        userdata: userdata
    });
}

module.exports.updateProfileData = (req, res) => {
    let profileid = req.body.profileid;
    console.log(profileid);

    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;


    let updatequery = "UPDATE `registration` SET `name`='" + name + "',`email`='" + email + "',`password`='" + password + "' WHERE id = '" + profileid + "'";
    console.log(updatequery);

    mysql.query(updatequery, (err, data) => {
        if (err) {
            console.log("Something wrong");
            return false;
        }
        console.log(data);
        console.log("Your profile successfully add profileid");
        return res.redirect('/admin/');
    });
}

module.exports.category = (req, res) => {
    res.render('category');
}


module.exports.categoryData = (req, res) => {
    // admincategory.create({

    //     category_name : req.body.category_name

    // },(err,data)=>{
    //     if(err)
    //     {
    //         console.log("category not add");
    //         return false;
    //     }
    //     console.log("category added");
    //     return res.redirect('back');
    // })


    let category_name = req.body.category_name;
    let insertquery = "INSERT INTO `category`(`category_name`) VALUES ('" + category_name + "')";

    mysql.query(insertquery, (err, data) => {
        if (err) {
            console.log(err);
        }
        return res.redirect("back");
    });
}


module.exports.subcategory = (req, res) => {
    // admincategory.find({}, (err, categoryData) => {
    //     if (err) {
    //         console.log("category not fetch");
    //         return false;
    //     }
    //     return res.render('subcategory', {
    //         subcate: categoryData
    //     });
    // })

    let viewquery = "SELECT * FROM `category`";

    mysql.query(viewquery, (err, categoryData) => {
        if (err) {
            console.log("Data Not view");
            return false;
        }

        return res.render('subcategory', {
            subcate: categoryData
        });
    });
}


module.exports.subcategoryData = (req, res) => {

    // adminsubcategory.create({
    //     sub_category_name : req.body.sub_category_name,
    //     category_id: req.body.category_name
    // },(err,data)=>{
    //     if(err)
    //     {
    //         console.log("sub category not add");
    //         return false;
    //     }
    //     console.log("subcategory add");
    //     console.log(data);
    //     return res.redirect('back');
    // })



    let sub_category_name = req.body.sub_category_name;
    let category_id = req.body.category_name;

    let insertquery = "INSERT INTO `subcategory`(`sub_category_name`,`category_id`) VALUES ('" + sub_category_name + "','" + category_id + "')";
    console.log(insertquery);

    mysql.query(insertquery, (err, data) => {
        if (err) {
            console.log(err);
        }
        return res.redirect("back");
    });
}


// // View sub category
// module.exports.viewsubcategory = (req,res)=> {
//     adminsubcategory.find().populate("category_id").then(subcate => {
//         console.log(subcate);
//         return res.render('viewsubcategory',{
//             subcategory : subcate
//         })
//     })
// }