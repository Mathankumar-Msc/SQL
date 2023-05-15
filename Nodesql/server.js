const express = require('express')
const bodyParser = require('body-parser')
const mysql = require("mysql");
const server = express();
const cors = require('cors');

server.use(bodyParser.json());
server.use(cors());


 
//Establish the database connection
 
const db = mysql.createConnection({
 
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb",
 
});
 
db.connect(function (error) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      console.log("successfully Connected to DB");
    }
  });

  

 //Establish the Port
 
 server.listen(8000,function check(error) {
    if (error)
    {
    console.log("Error....dddd!!!!");
    }
 
    else
    {
        console.log("Started....!!!! 8000");
 
    }
});

//Create the Records
 
server.post("/api/staff/add", (req, res) => {
    let details = {
     ...req.body,
    };
    let sql = "INSERT INTO staff SET ?";
    db.query(sql, details, (error) => {
      if (error) {
        res.send({ status: false, message: "Staff created Failed" });
      } else {
        res.send({ status: true, message: "Staff created successfully" });
      }
    });
  });

  //view the Records
 
server.get("/api/view", (req, res) => {
    var sql = "SELECT * FROM staff";
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB");
      } else {
        res.send({ status: true, data: result });
      }
    });
  });
 //Update the Records
 
server.put("/api/staff/update/:id", (req, res) => {
  let sql =
    "UPDATE staff SET stname='" +
    req.body.stname +
    "', name='" +
    req.body.course +
    "',email='" +
    req.body.course +
    "',age='" +
    req.body.course +
    "',mobile='" +
    req.body.course +
    "',city='" +
    req.body.fee +
    "'  WHERE id=" +
    req.params.id;

  let a = db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Staff Updated Failed" });
    } else {
      res.send({ status: true, message: "Staff Updated successfully" });
    }
  });
});



//Delete the Records

server.delete("/api/staff/delete/:id", (req, res) => {
  let sql = "DELETE FROM staff WHERE id=" + req.params.id + "";
  let query = db.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: "Staff Deleted Failed" });
    } else {
      res.send({ status: true, message: "Staff Deleted successfully" });
    }
  });
});