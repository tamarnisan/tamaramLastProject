var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "z10mz10m",
    database: "deme"


});
router.post('/', (req, res) => {
    /////לזכור להביא את הסיסמא מטבלה נפרדת
    const sql = `SELECT * FROM user WHERE username='${req.body.username}' AND password='${req.body.password}'`;
    con.query(sql, function (err, result) {
        if (err) return res.status(400).send("something went wrong");
        console.log('result.length: ', result.length);
        if (result.length === 0) {
            return res.status(400).send("please register");
        }
        else {
            // כשיהיה עוד טבךא פשוט להביא הכל *
            const sql = `SELECT id, username, email, phone, name FROM user WHERE username='${req.body.username}'`;
            con.query(sql, function (err, result) {
                if (err) return res.status(400).send("something went wrong");
                else {
                    console.log(result[0])
                    return res.status(200).send(result[0]);
                }
            }
            )
        }
    });


});

module.exports = router;


