'use strict';

var response = require('./response');
var connection = require('./connection');

exports.users = function(req, res) {
    connection.query("SELECT * FROM `mysql-docker`.`Test Table`", function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.index = function(req, res) {
    response.ok("Hello from the Node JS RESTful side!", res)
};