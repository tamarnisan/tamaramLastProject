const express = require("express");
const router = express.Router();
const { con } = require("../con");
router.post("/", (req, res) => {
    console.log("req.body.username: ", req.body.username);
    const sql = `SELECT * FROM user WHERE username='${req.body.username}' OR email='${req.body.email}'`;
    try {
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("result: ", result);

            if (result.length === 0) {
                console.log("hiii");
                const sql = `INSERT INTO user (username, email, phone, name ) VALUES ('${req.body.username}', '${req.body.email}', '${req.body.phone}', '${req.body.name}')`;
                con.query(sql, function (err, result) {
                    if (err) return res.status(400).send("something went wrong");
                    console.log("user inserted");
                    console.log("before sql2");
                    const sql2 = `INSERT INTO password (username, password) VALUES ('${req.body.username}','${req.body.password}')`;
                    con.query(sql2, function (err, result) {
                        if (err) return res.status(400).send("something went wrong");
                        console.log("user password inserted");

                        const sql3 = `SELECT * FROM user WHERE username='${req.body.username}'`;
                        con.query(sql3, function (err, result) {
                            if (err) return res.status(400).send("something went wrong");
                            else {
                                console.log(result[0]);
                                return res.status(200).send(result[0]);
                            }
                        });
                    });
                });
            } else {
                return res.status(400).send("This username or email is taken");
            }
        });
    } catch (err) {
        return res.status(400).send("something went wrong");
    }
});

module.exports = router;
