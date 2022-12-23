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

    let sub_category_name = req.body.sub_category_name;
    let category_id = req.body.category_name;

    let insertquery = "INSERT INTO `subcategory`(`sub_category_name`,`category_id`) VALUES ('" + sub_category_name + "','" + category_id + "')";
    console.log(insertquery);

    mysql.query(insertquery, (err, data) => {
        console.log(data);
        if (err) {
            console.log(err);
        }
        return res.redirect("back");
    });
}


// View sub category
module.exports.viewsubcategory = (req,res)=> {

    // let viewstate = "SELECT state.id,state_name,city.city FROM state INNER JOIN city ON state.id = city.state_id";
    let viewstate = "SELECT category.id,category_name,subcategory.id,sub_category_name,category_id FROM category INNER JOIN subcategory ON category.category_name = subcategory.category_id";
    mysql.query(viewstate,(err,subcate)=>{
        console.log(subcate);
        if(err)
        {
            console.log("data not view");
        }
        return res.render('viewsubcategory',{
            subcategory : subcate
        })
    });
}