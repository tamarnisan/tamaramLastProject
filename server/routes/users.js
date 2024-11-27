const express = require("express");
const router = express.Router();
const { con } = require("../con");
/* GET users listing. */
router.get("/", function (req, res, next) {
    con.query("SELECT * FROM user LIMIT 10", (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
/*Get todos by user_id*/
router.get("/:id/todos", function (req, res, next) {
    con.query(`SELECT * FROM to_do WHERE user_id=${req.params.id}`, (err, result) => {
        if (err) res.status(400).send("Something went wrong.");
        else { res.status(200).send(result); }
    });

});
/*Get info by user_id*/
router.get("/:id", function (req, res, next) {
    con.query(`SELECT * FROM user WHERE id=${req.params.id}`, (err, result) => {
        if (err) res.status(400).send("Something went wrong.");
        else { res.status(200).send(result); }
    });

});
/*Delete info by user_id*/
router.delete("/:id", function (req, res, next) {
    con.query(`DELETE  FROM user WHERE id=${req.params.id}`, (err, result) => {
        if (err) res.status(400).send("Something went wrong.");
        else { res.status(200).send("user deleted"); }
    });

});


module.exports = router;
