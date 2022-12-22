const express = require("express");

const routes = express.Router();

const passport = require('passport');

const admincontroller = require('../controllers/AdminControllers');
const crudcontroller = require('../controllers/CrudController');

console.log("admin route is start");

routes.get('/', admincontroller.dashbord);
// routes.get('/404',admincontroller.pagenotfound);
routes.get('/logout',admincontroller.logout);


routes.post('/addData', crudcontroller.addData);
routes.get('/viewData', crudcontroller.viewData);
// // params
routes.get('/deleteData/:id', crudcontroller.deleteData);
routes.get('/editData/:id', crudcontroller.editData);
routes.post('/updateData', crudcontroller.updateData);



routes.get('/profilepage',passport.checkUserLogin,admincontroller.profilepage);
routes.post('/updateProfileData',passport.checkUserLogin,admincontroller.updateProfileData);

// routes.get('/category',admincontroller.category);
// routes.post('/categoryData',admincontroller.categoryData);

// routes.get('/subcategory',admincontroller.subcategory);
// routes.post('/subcategoryData',admincontroller.subcategoryData);
// routes.get('/viewsubcategory',admincontroller.viewsubcategory);

module.exports = routes;