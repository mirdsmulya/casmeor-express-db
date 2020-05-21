'use strict';

var response = require('../response');
var connection = require('../connection');

exports.account = function(req, res) {
    connection.query("SELECT * FROM `mysql-docker`.account", function (error, rows, fields){
        if(error) {console.log(error)} else{
            response.ok(rows, res)
        }
    });
};

exports.saveAccount = function(req, res) {    
    connection.query("INSERT INTO `mysql-docker`.account (name, username, nip, role, password) VALUES ?",[req.body], function (error, result){
        if(error) {console.log(error)} else{
            response.ok(result, res)
        }
    });
};

exports.deleteAccount = function(req, res) {    
    console.log("Body "+req.body);
    connection.query("DELETE FROM `mysql-docker`.`account` WHERE nip = ?",req.body, function (error, result){
        if(error) {console.log(error)} else{
            response.ok(result, res)
        }
    });
};


exports.index = function(req, res) {
    response.ok("Hello from the Node JS RESTful side!", res)
};