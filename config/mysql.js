const mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "adminpanel-sql"
});

// Connection Error
con.connect((err) => {
  if (err) {
    console.log("db not connected");
    return false;
  }
  console.log("Mysql Db Connected");
});
module.exports = con;