const express = require("express");
const router = express.Router();
const { con } = require("../con");
/* GET posts listing. */
router.get("/", function (req, res, next) {
    const limit = req.query.limit ? req.query.limit : false;
    const offset = req.query.offset ? req.query.offset : false;
    console.log(`SELECT * FROM post ${limit ? "LIMIT " + req.query.limit : ""} ${offset ? "OFFSET " + req.query.offset : ""}`);
    con.query(`SELECT * FROM post ${limit ? "LIMIT " + req.query.limit : ""} ${offset ? "OFFSET " + req.query.offset : ""}`, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

/*Get post by post_id */
router.get("/:id", function (req, res, next) {
    con.query(`SELECT * FROM post WHERE id=${req.params.id}`, (err, result) => {
        if (err) res.status(400).send({ text: "Something went wrong." });
        res.status(200).send(result);
    });
});

/*delete post by post_id*/

router.delete("/:post_id", function (req, res, next) {
    con.query(`DELETE FROM post WHERE id=${req.params.post_id}`, (err, result) => {
        if (err) res.status(400).send({ text: "Something went wrong." });
        else {
            res.status(200).send({ text: "post deleted" });
        }
    });
});
/*get comments by post_id*/
router.get("/:id/comments", function (req, res, next) {
    con.query(`SELECT * FROM comment WHERE post_id=${req.params.id}`, (err, result) => {
        if (err) res.status(400).send({ text: "Something went wrong." });
        res.status(200).send(result);
    });
});
/*get comments by post_id*/
router.delete("/:id/comments", function (req, res, next) {
    con.query(`DELETE FROM comment WHERE post_id=${req.params.id}`, (err, result) => {
        if (err) res.status(400).send({ text: "Something went wrong." });
        res.status(200).send({ text: "comments deleted" });
    });
});
//add comment
router.post("/:id/comments", function (req, res, next) {
    const sql = `INSERT INTO comment (body, post_id, name, email) VALUES ('${req.body.body}', ${req.params.id}, '${req.body.name}', '${req.body.email}')`;
    con.query(sql, function (err, result) {
        console.log("result: ", result);
        if (err) return res.status(400).send({ text: "something went wrong" });
        else {
            console.log("user inserted");
            return res.status(200).send({ text: "comment added" });
        }
    });
});

module.exports = router;
