const express = require("express");
const router = express.Router();
const { con } = require("../con");
/* GET posts listing. */
router.get("/", function (req, res, next) {
    con.query("SELECT * FROM post LIMIT 10", (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

/*Get post by post_id */
router.get("/:id", function (req, res, next) {
    con.query(`SELECT * FROM post WHERE id=${req.params.id}`, (err, result) => {
        if (err) res.status(400).send("Something went wrong.");
        res.status(200).send(result);
    });
});



/*delete post by post_id*/

router.delete("/:post_id", function (req, res, next) {

    con.query(`DELETE FROM post WHERE id=${req.params.post_id}`, (err, result) => {
        if (err) res.status(400).send("Something went wrong.");
        else { res.status(200).send("post deleted"); }
    });

});
/*get comments by post_id*/
router.get("/:id/comments", function (req, res, next) {
    con.query(`SELECT * FROM comment WHERE post_id=${req.params.id}`, (err, result) => {
        if (err) res.status(400).send("Something went wrong.", err);
        res.status(200).send(result);
    });
});
/*get comments by post_id*/
router.delete("/:id/comments", function (req, res, next) {
    con.query(`DELETE FROM comment WHERE post_id=${req.params.id}`, (err, result) => {
        if (err) res.status(400).send("Something went wrong.", err);
        res.status(200).send("comments deleted");
    });
});
//add comment
router.post("/:id/comments", function (req, res, next) {
    const sql = `INSERT INTO comment (body, post_id, name, email) VALUES ('${req.body.body}', ${req.params.id}, '${req.body.name}', '${req.body.email}')`;
    con.query(sql, function (err, result) {
        console.log('result: ', result);
        if (err) return res.status(400).send("something went wrong");
        else {
            console.log("user inserted");
            return res.status(200).send("comment added");
        }

    })


})


module.exports = router;
