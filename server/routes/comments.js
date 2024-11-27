const express = require("express");
const router = express.Router();
const { con } = require("../con");
/* GET users listing. */
router.get("/", function (req, res, next) {
    con.query("SELECT * FROM comment", (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

router.get("/:id", function (req, res, next) {
    con.query(`SELECT * FROM comment WHERE id=${req.params.id}`, (err, result) => {
        if (err) res.status(400).send("Something went wrong.", err);
        res.status(200).send(result);
    });
});

module.exports = router;
