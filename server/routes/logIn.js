const express = require("express");
const router = express.Router();
const { con } = require("../con");
router.post("/", (req, res) => {
    const sql = `SELECT * FROM password WHERE username='${req.body.username}' AND password='${req.body.password}'`;
    console.log("sql: ", sql);
    con.query(sql, function (err, result) {
        if (err) return res.status(400).send({ text: "something went wrong" });
        console.log("result.length: ", result.length);
        if (result.length === 0) {
            return res.status(401).send({ text: "please register" });
        } else {
            const sql = `SELECT * FROM user WHERE username='${req.body.username}'`;
            con.query(sql, function (err, result) {
                if (err) return res.status(400).send({ text: "something went wrong" });
                else {
                    console.log(result[0]);
                    return res.status(200).send(result[0]);
                }
            });
        }
    });
});

module.exports = router;
