const express = require("express");

const routes = express.Router();

const registercontroller = require('../controllers/RegisterControllers');

console.log("admin route is start");

// Register mate
routes.get('/',registercontroller.register);

routes.post('/insertData',registercontroller.insertData);


module.exports = routes;