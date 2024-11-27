const mysql = require("mysql");
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "z10mz10m",
    database: "deme",
});
// con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
//     con.query("CREATE DATABASE deme", function (err, result) {
//         if (err) throw err;
//         console.log("Database created");

//     });
// })

// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
//   const sql = "CREATE TABLE user (id INT, username VARCHAR(255), password VARCHAR(255), email VARCHAR(255), phone VARCHAR(255), name VARCHAR(255))";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });
// })
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    sql = "INSERT INTO user (id, username, password, email, phone, name) VALUES (1,'tamari','352625732','tamari1234', '0542565623', 'tamarnisan' )";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(" record inserted");
    });
});
