var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "beruks!2",
    database: "mysql",
    port:3308
});

con.connect(function (err){
    if(err) throw err;
    console.log('Connected!');
    
});

module.exports = con