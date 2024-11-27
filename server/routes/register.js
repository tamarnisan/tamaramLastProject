const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "z10mz10m",
    database: "deme",
});
router.post("/", (req, res) => {
    const sql = `SELECT * FROM user WHERE username='${req.body.username}'`;
    con.query(sql, function (err, result) {
        if (err) return res.status(400).send("something went wrong");
        if (result.length === 0) {
            const sql = `INSERT INTO user (username, password, email, phone, name ) VALUES ('${req.body.username}','${req.body.password}', '${req.body.email}', '${req.body.phone}', '${req.body.name}')`;
            con.query(sql, function (err, result) {
                if (err) return res.status(400).send("something went wrong");
                console.log("user inserted");
                return res.status(200).send(`welcome ${req.body.username}`);
            });
        } else {
            return res.status(400).send("this username is already exist");
        }
    });
});

module.exports = router;
