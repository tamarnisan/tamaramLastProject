const express = require("express");
const router = express.Router();
const { con } = require("../con");
/* GET commnets listing. */
router.get("/", function (req, res, next) {
    con.query("SELECT * FROM comment", (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
//get comment by id
router.get("/:id", function (req, res, next) {
    con.query(`SELECT * FROM comment WHERE id=${req.params.id}`, (err, result) => {
        if (err) res.status(400).send("Something went wrong.", err);
        res.status(200).send(result);
    });
})
//delete comment by id
router.delete("/:id", function (req, res, next) {
    con.query(`DELETE  FROM comment WHERE id=${req.params.id}`, (err, result) => {
        if (err) res.status(400).send("Something went wrong.", err);
        res.status(200).send("commnet deleted");
    });
});



module.exports = router;
